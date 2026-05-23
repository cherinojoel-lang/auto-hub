import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  updateMetaTags,
  getStructuredDataOrganization,
  getStructuredDataProduct,
  getStructuredDataBreadcrumb,

} from '../seo';

describe('SEO Utilities', () => {
  describe('updateMetaTags', () => {
    beforeEach(() => {
      // Clear document head before each test
      document.head.innerHTML = '';
      document.title = '';
    });

    it('updates basic meta tags (title, description)', () => {
      updateMetaTags({
        title: 'Test Title',
        description: 'Test Description',
      });

      expect(document.title).toBe('Test Title');
      const descTag = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      expect(descTag).not.toBeNull();
      expect(descTag.content).toBe('Test Description');
    });

    it('creates optional meta tags when provided', () => {
      updateMetaTags({
        title: 'Title',
        description: 'Desc',
        keywords: 'test, seo',
        robots: 'noindex, nofollow',
        author: 'John Doe',
      });

      expect((document.querySelector('meta[name="keywords"]') as HTMLMetaElement).content).toBe('test, seo');
      expect((document.querySelector('meta[name="robots"]') as HTMLMetaElement).content).toBe('noindex, nofollow');
      expect((document.querySelector('meta[name="author"]') as HTMLMetaElement).content).toBe('John Doe');
    });

    it('handles Open Graph tags with defaults', () => {
      updateMetaTags({
        title: 'OG Title Default',
        description: 'OG Desc Default',
      });

      expect((document.querySelector('meta[property="og:title"]') as HTMLMetaElement).content).toBe('OG Title Default');
      expect((document.querySelector('meta[property="og:description"]') as HTMLMetaElement).content).toBe('OG Desc Default');
      expect((document.querySelector('meta[property="og:type"]') as HTMLMetaElement).content).toBe('website');
      expect(document.querySelector('meta[property="og:image"]')).toBeNull(); // No default image
    });

    it('handles Open Graph tags with explicit values', () => {
      updateMetaTags({
        title: 'Title',
        description: 'Desc',
        ogTitle: 'Custom OG Title',
        ogDescription: 'Custom OG Desc',
        ogType: 'article',
        ogImage: 'https://example.com/image.jpg',
      });

      expect((document.querySelector('meta[property="og:title"]') as HTMLMetaElement).content).toBe('Custom OG Title');
      expect((document.querySelector('meta[property="og:description"]') as HTMLMetaElement).content).toBe('Custom OG Desc');
      expect((document.querySelector('meta[property="og:type"]') as HTMLMetaElement).content).toBe('article');
      expect((document.querySelector('meta[property="og:image"]') as HTMLMetaElement).content).toBe('https://example.com/image.jpg');
    });

    it('handles Twitter Card tags', () => {
      updateMetaTags({
        title: 'Title',
        description: 'Desc',
        twitterCard: 'summary',
        twitterCreator: '@testuser',
      });

      expect((document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement).content).toBe('summary');
      expect((document.querySelector('meta[name="twitter:creator"]') as HTMLMetaElement).content).toBe('@testuser');
    });

    it('updates default Twitter Card to summary_large_image', () => {
      updateMetaTags({
        title: 'Title',
        description: 'Desc',
      });

      expect((document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement).content).toBe('summary_large_image');
      expect(document.querySelector('meta[name="twitter:creator"]')).toBeNull();
    });

    it('creates canonical link when provided', () => {
      updateMetaTags({
        title: 'Title',
        description: 'Desc',
        canonicalUrl: 'https://example.com/canonical',
      });

      const linkTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      expect(linkTag).not.toBeNull();
      expect(linkTag.href).toBe('https://example.com/canonical');
    });

    it('creates structured data script when provided', () => {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Test Site',
      };

      updateMetaTags({
        title: 'Title',
        description: 'Desc',
        structuredData,
      });

      const scriptTag = document.querySelector('script[type="application/ld+json"]');
      expect(scriptTag).not.toBeNull();
      expect(JSON.parse(scriptTag!.textContent!)).toEqual(structuredData);
    });

    it('removes old structured data script before adding a new one', () => {
      // First call
      updateMetaTags({
        title: 'Title 1',
        description: 'Desc 1',
        structuredData: { '@type': 'WebSite', name: 'Site 1' },
      });

      // Second call
      updateMetaTags({
        title: 'Title 2',
        description: 'Desc 2',
        structuredData: { '@type': 'WebSite', name: 'Site 2' },
      });

      const scriptTags = document.querySelectorAll('script[type="application/ld+json"]');
      expect(scriptTags.length).toBe(1);
      expect(JSON.parse(scriptTags[0].textContent!).name).toBe('Site 2');
    });
  });

  describe('getStructuredDataOrganization', () => {
    it('returns the correct organization structured data', () => {
      const result = getStructuredDataOrganization();
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('LocalBusiness');
      expect(result.name).toBe('Automobile Quick');
      expect(result.address.addressLocality).toBe('Iserlohn');
      expect(result.priceRange).toBe('€€');
      expect(result.openingHoursSpecification.length).toBeGreaterThan(0);
    });
  });

  describe('getStructuredDataProduct', () => {
    const mockVehicle = {
      manufacturer: 'Volkswagen',
      model: 'Golf',
      mainImage: 'https://example.com/golf.jpg',
      price: 15000,
      firstRegistrationYear: '2019',
      mileage: 50000,
    };

    it('returns the correct product structured data with fallback description', () => {
      const result = getStructuredDataProduct(mockVehicle);

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('Product');
      expect(result.name).toBe('Volkswagen Golf');
      expect(result.description).toBe('Volkswagen Golf - Hochwertiger Gebrauchtwagen bei Automobile Quick in Iserlohn-Letmathe');
      expect(result.image).toBe('https://example.com/golf.jpg');

      expect(result.offers.price).toBe(15000);
      expect(result.offers.priceCurrency).toBe('EUR');
      expect(result.offers.seller.name).toBe('Automobile Quick');

      expect(result.vehicleSpecializations.manufacturer).toBe('Volkswagen');
      expect(result.vehicleSpecializations.model).toBe('Golf');
      expect(result.vehicleSpecializations.productionDate).toBe('2019');
      expect(result.vehicleSpecializations.mileageFromOdometer.value).toBe(50000);
    });

    it('uses provided description if available', () => {
      const vehicleWithDesc = {
        ...mockVehicle,
        description: 'Ein sehr schöner Golf.',
      };
      const result = getStructuredDataProduct(vehicleWithDesc);

      expect(result.description).toBe('Ein sehr schöner Golf.');
    });
  });

  describe('getStructuredDataBreadcrumb', () => {
    it('transforms items into correct breadcrumb structured data', () => {
      const items = [
        { name: 'Home', url: 'https://example.com' },
        { name: 'Vehicles', url: 'https://example.com/vehicles' },
      ];

      const result = getStructuredDataBreadcrumb(items);

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('BreadcrumbList');
      expect(result.itemListElement.length).toBe(2);

      expect(result.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://example.com',
      });

      expect(result.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Vehicles',
        item: 'https://example.com/vehicles',
      });
    });
  });
});
