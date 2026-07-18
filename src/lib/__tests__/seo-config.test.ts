import { describe, it, expect } from 'vitest';
import { generateBusinessSchema, generateProductSchema, SITE_CONFIG, OPENING_HOURS } from '../seo-config';

describe('seo-config', () => {
  describe('generateBusinessSchema', () => {
    it('uses the verified public opening hours', () => {
      expect(OPENING_HOURS).toContainEqual({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      });
    });

    it('should generate valid LocalBusiness + AutoDealer schema based on SITE_CONFIG', () => {
      const schema = generateBusinessSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toEqual(['AutoDealer', 'LocalBusiness']);
      expect(schema.name).toBe(SITE_CONFIG.name);
      expect(schema.description).toBe(SITE_CONFIG.description);
      expect(schema.url).toBe(SITE_CONFIG.url);
      expect(schema.telephone).toBe(SITE_CONFIG.telephone);
      expect(schema.email).toBe(SITE_CONFIG.email);
      expect(schema.image).toBe(SITE_CONFIG.image);
      expect(schema.priceRange).toBe('€€');

      expect(schema.address).toEqual({
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address.streetAddress,
        addressLocality: SITE_CONFIG.address.addressLocality,
        postalCode: SITE_CONFIG.address.postalCode,
        addressCountry: SITE_CONFIG.address.addressCountry,
      });

      expect(schema.geo).toEqual({
        '@type': 'GeoCoordinates',
        latitude: SITE_CONFIG.geo.latitude,
        longitude: SITE_CONFIG.geo.longitude,
      });

      expect(schema.openingHoursSpecification).toEqual(OPENING_HOURS);

      expect(schema.areaServed).toEqual({
        '@type': 'City',
        name: SITE_CONFIG.address.addressLocality,
      });

      expect(schema).not.toHaveProperty('review');
      expect(schema).not.toHaveProperty('aggregateRating');
      expect(schema).not.toHaveProperty('reviewCount');
    });
  });

  describe('generateProductSchema', () => {
    it('uses title when provided', () => {
      const vehicle = {
        title: 'VW Golf VII 1.4 TSI',
        make: 'Volkswagen',
        model: 'Golf',
        description: 'Very nice car',
        mainImage: 'https://example.com/golf.jpg',
        priceValue: 12500
      };

      const schema = generateProductSchema(vehicle);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Product');
      expect(schema.name).toBe('VW Golf VII 1.4 TSI');
      expect(schema.description).toBe('Very nice car');
      expect(schema.image).toBe('https://example.com/golf.jpg');
      expect(schema.offers).toEqual({
        '@type': 'Offer',
        price: '12500',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock'
      });
    });

    it('falls back to make and model when title is missing', () => {
      const vehicle = {
        make: 'Volkswagen',
        model: 'Golf',
        priceValue: 12500
      };

      const schema = generateProductSchema(vehicle);
      expect(schema.name).toBe('Volkswagen Golf');
    });

    it('parses price string if priceValue is missing', () => {
      const vehicle = {
        make: 'Volkswagen',
        model: 'Golf',
        price: '12.500 €'
      };

      const schema = generateProductSchema(vehicle);
      expect(schema.offers.price).toBe('12500');
    });

    it('defaults price to 0 if neither priceValue nor price is provided', () => {
      const vehicle = {
        make: 'Volkswagen',
        model: 'Golf',
      };

      const schema = generateProductSchema(vehicle);
      expect(schema.offers.price).toBe('0');
    });
  });

});
