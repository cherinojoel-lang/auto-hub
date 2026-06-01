import { describe, it, expect } from 'vitest';
import { generateBusinessSchema, generateProductSchema, SITE_CONFIG, OPENING_HOURS } from '../seo-config';

describe('seo-config', () => {
  describe('generateBusinessSchema', () => {
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
    it('should generate product schema using title and priceValue', () => {
      const vehicle = {
        title: 'Audi A4 Avant',
        description: 'Great car',
        mainImage: '/images/audi.jpg',
        priceValue: 25000,
      };
      const schema = generateProductSchema(vehicle);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Product');
      expect(schema.name).toBe('Audi A4 Avant');
      expect(schema.description).toBe('Great car');
      expect(schema.image).toBe('/images/audi.jpg');
      expect(schema.offers['@type']).toBe('Offer');
      expect(schema.offers.price).toBe('25000');
      expect(schema.offers.priceCurrency).toBe('EUR');
      expect(schema.offers.availability).toBe('https://schema.org/InStock');
    });

    it('should fallback to make/model and strip string price', () => {
      const vehicle = {
        make: 'BMW',
        model: 'X5',
        description: 'Nice SUV',
        mainImage: '/images/bmw.jpg',
        price: '30.500 €',
      };
      const schema = generateProductSchema(vehicle);

      expect(schema.name).toBe('BMW X5');
      expect(schema.offers.price).toBe('30500');
    });

    it('should fallback to 0 if neither priceValue nor price is provided', () => {
      const vehicle = {
        make: 'VW',
        model: 'Golf',
      };
      const schema = generateProductSchema(vehicle);

      expect(schema.name).toBe('VW Golf');
      expect(schema.offers.price).toBe('0');
    });
  });
});
