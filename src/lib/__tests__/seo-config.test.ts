import { describe, it, expect } from 'vitest';
import { generateBusinessSchema, generateBreadcrumbSchema, SITE_CONFIG, OPENING_HOURS } from '../seo-config';

describe('seo-config', () => {
  describe('generateBreadcrumbSchema', () => {
    it('should handle an empty array', () => {
      const schema = generateBreadcrumbSchema([]);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toEqual([]);
    });

    it('should generate schema for a single item', () => {
      const schema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://example.com' }
      ]);

      expect(schema.itemListElement).toHaveLength(1);
      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://example.com'
      });
    });

    it('should generate schema for multiple items', () => {
      const schema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://example.com' },
        { name: 'Category', url: 'https://example.com/category' },
        { name: 'Product', url: 'https://example.com/category/product' }
      ]);

      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://example.com'
      });
      expect(schema.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Category',
        item: 'https://example.com/category'
      });
      expect(schema.itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'Product',
        item: 'https://example.com/category/product'
      });
    });
  });

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
});
