import { describe, it, expect } from 'vitest';
import {
  generateBusinessSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
  OPENING_HOURS,
  REVIEWS,
} from '../seo-config';

describe('seo-config generators', () => {
  describe('generateBusinessSchema', () => {
    it('should generate valid LocalBusiness and AutoDealer schema', () => {
      const schema = generateBusinessSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toEqual(['AutoDealer', 'LocalBusiness']);
      expect(schema.name).toBe(SITE_CONFIG.name);
      expect(schema.description).toBe(SITE_CONFIG.description);
      expect(schema.url).toBe(SITE_CONFIG.url);
      expect(schema.telephone).toBe(SITE_CONFIG.telephone);
      expect(schema.email).toBe(SITE_CONFIG.email);

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
      expect(schema.image).toBe(SITE_CONFIG.image);
      expect(schema.priceRange).toBe('€€');
      expect(schema.paymentAccepted).toEqual(['Cash', 'Credit Card', 'Financing']);

      expect(schema.areaServed).toEqual({
        '@type': 'City',
        name: SITE_CONFIG.address.addressLocality,
      });

      expect(schema.aggregateRating).toEqual({
        '@type': 'AggregateRating',
        ratingValue: SITE_CONFIG.rating.toString(),
        reviewCount: SITE_CONFIG.reviewCount.toString(),
        bestRating: '5',
        worstRating: '1',
      });

      expect(schema.review).toHaveLength(REVIEWS.length);
      expect(schema.review[0]).toEqual({
        '@type': 'Review',
        author: { '@type': 'Person', name: REVIEWS[0].author },
        reviewRating: { '@type': 'Rating', ratingValue: REVIEWS[0].rating.toString() },
        reviewBody: REVIEWS[0].text,
      });
    });
  });

  describe('generateProductSchema', () => {
    it('should generate Product schema with full vehicle details', () => {
      const vehicle = {
        title: 'Audi A4',
        manufacturer: 'Audi',
        model: 'A4',
        firstRegistrationYear: 2020,
        price: 25000,
        mileage: 50000,
        mainImage: 'audi-a4.jpg',
        description: 'Great condition Audi A4',
      };

      const schema = generateProductSchema(vehicle);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Product');
      expect(schema.name).toBe('Audi A4');
      expect(schema.description).toBe('Great condition Audi A4');
      expect(schema.image).toBe('audi-a4.jpg');

      expect(schema.offers).toEqual({
        '@type': 'Offer',
        price: '25000',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      });

      expect(schema.aggregateRating).toEqual({
        '@type': 'AggregateRating',
        ratingValue: SITE_CONFIG.rating.toString(),
        reviewCount: SITE_CONFIG.reviewCount.toString(),
      });
    });

    it('should handle missing optional fields', () => {
      const vehicle = {
        manufacturer: 'BMW',
        model: '320i',
      };

      const schema = generateProductSchema(vehicle);

      expect(schema.name).toBe('BMW 320i');
      expect(schema.description).toBeUndefined();
      expect(schema.image).toBeUndefined();

      expect(schema.offers).toEqual({
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      });
    });
  });

  describe('generateBreadcrumbSchema', () => {
    it('should generate BreadcrumbList schema with multiple items', () => {
      const items = [
        { name: 'Home', url: 'https://example.com' },
        { name: 'Vehicles', url: 'https://example.com/vehicles' },
      ];

      const schema = generateBreadcrumbSchema(items);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(2);

      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://example.com',
      });

      expect(schema.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Vehicles',
        item: 'https://example.com/vehicles',
      });
    });

    it('should generate BreadcrumbList schema with empty items array', () => {
      const items: Array<{ name: string; url: string }> = [];

      const schema = generateBreadcrumbSchema(items);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(0);
    });
  });
});
