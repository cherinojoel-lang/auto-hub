import { describe, it, expect } from 'vitest';
import { generateBusinessSchema, generateProductSchema, generateBreadcrumbSchema, SITE_CONFIG, OPENING_HOURS } from '../seo-config';

describe('seo-config', () => {
  describe('generateProductSchema', () => {
    it('should generate valid Product schema with full vehicle data', () => {
      const mockVehicle = {
        title: 'VW Golf VIII 1.5 TSI',
        make: 'Volkswagen',
        model: 'Golf',
        description: 'Top gepflegter Golf.',
        mainImage: 'https://example.com/golf.jpg',
        priceValue: 25000
      };

      const schema = generateProductSchema(mockVehicle);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Product');
      expect(schema.name).toBe('VW Golf VIII 1.5 TSI');
      expect(schema.description).toBe('Top gepflegter Golf.');
      expect(schema.image).toBe('https://example.com/golf.jpg');
      expect(schema.offers).toEqual({
        '@type': 'Offer',
        price: '25000',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      });
    });

    it('should generate valid Product schema with fallback title when title is not provided', () => {
      const mockVehicle = {
        make: 'Volkswagen',
        model: 'Golf',
        priceValue: 25000
      };

      const schema = generateProductSchema(mockVehicle);

      expect(schema.name).toBe('Volkswagen Golf');
    });

    it('should extract numeric price from string price when priceValue is not provided', () => {
      const mockVehicle = {
        make: 'Volkswagen',
        model: 'Golf',
        price: '25.000 €'
      };

      const schema = generateProductSchema(mockVehicle);

      expect(schema.offers.price).toBe('25000');
    });

    it('should fallback to 0 when price and priceValue are not provided', () => {
      const mockVehicle = {
        make: 'Volkswagen',
        model: 'Golf',
      };

      const schema = generateProductSchema(mockVehicle);

      expect(schema.offers.price).toBe('0');
    });
  });

  describe('generateBreadcrumbSchema', () => {
    it('should generate valid BreadcrumbList schema', () => {
      const items = [
        { name: 'Home', url: 'https://automobilequick.de' },
        { name: 'Fahrzeuge', url: 'https://automobilequick.de/fahrzeugbestand' },
      ];

      const schema = generateBreadcrumbSchema(items);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(2);
      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://automobilequick.de',
      });
      expect(schema.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Fahrzeuge',
        item: 'https://automobilequick.de/fahrzeugbestand',
      });
    });
  });

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

      expect(schema.paymentAccepted).toEqual(['Cash', 'Credit Card', 'Financing']);

      expect(schema).not.toHaveProperty('review');
      expect(schema).not.toHaveProperty('aggregateRating');
      expect(schema).not.toHaveProperty('reviewCount');
    });

    it('should return a stable object structure that matches schema.org specifications', () => {
      const schema = generateBusinessSchema();
      // Ensure specific keys are present
      expect(Object.keys(schema)).toEqual(
        expect.arrayContaining([
          '@context',
          '@type',
          'name',
          'description',
          'url',
          'telephone',
          'email',
          'address',
          'geo',
          'openingHoursSpecification',
          'image',
          'priceRange',
          'paymentAccepted',
          'areaServed'
        ])
      );
    });

    it('should properly format the nested address object', () => {
      const schema = generateBusinessSchema();
      expect(schema.address).toHaveProperty('@type', 'PostalAddress');
      expect(schema.address).toHaveProperty('streetAddress', expect.any(String));
      expect(schema.address).toHaveProperty('addressLocality', expect.any(String));
      expect(schema.address).toHaveProperty('postalCode', expect.any(String));
      expect(schema.address).toHaveProperty('addressCountry', expect.any(String));
    });

    it('should properly format the nested geo object', () => {
      const schema = generateBusinessSchema();
      expect(schema.geo).toHaveProperty('@type', 'GeoCoordinates');
      expect(schema.geo).toHaveProperty('latitude', expect.any(String));
      expect(schema.geo).toHaveProperty('longitude', expect.any(String));
    });
  });
});
