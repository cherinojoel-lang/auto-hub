import { describe, it, expect } from 'vitest';
import { generateBusinessSchema, SITE_CONFIG, OPENING_HOURS } from '../seo-config';

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
});
