import { describe, it, expect } from 'vitest';
import { getStructuredDataOrganization } from '../seo';

describe('SEO Utilities', () => {
  describe('getStructuredDataOrganization', () => {
    it('should return a valid Schema.org LocalBusiness object', () => {
      const data = getStructuredDataOrganization();

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('LocalBusiness');
      expect(data.name).toBe('Automobile Quick');
      expect(data.url).toBe('https://automobilequick.de');
      expect(data.email).toBe('info@automobilequick.de');
      expect(data.telephone).toBe('+49 (0) 2331 123456');
    });

    it('should include correct postal address', () => {
      const data = getStructuredDataOrganization();

      expect(data.address).toEqual({
        '@type': 'PostalAddress',
        streetAddress: 'Hagener Str. 126a',
        addressLocality: 'Iserlohn',
        postalCode: '58642',
        addressCountry: 'DE',
      });
    });

    it('should include opening hours specification', () => {
      const data = getStructuredDataOrganization();

      expect(data.openingHoursSpecification).toBeDefined();
      expect(data.openingHoursSpecification).toHaveLength(2);

      const weekdays = data.openingHoursSpecification.find(
        (spec: any) => Array.isArray(spec.dayOfWeek)
      );
      expect(weekdays).toEqual({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      });

      const weekend = data.openingHoursSpecification.find(
        (spec: any) => !Array.isArray(spec.dayOfWeek)
      );
      expect(weekend).toEqual({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      });
    });

    it('should include rating information', () => {
      const data = getStructuredDataOrganization();

      expect(data.aggregateRating).toEqual({
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '157',
      });
    });
  });
});
