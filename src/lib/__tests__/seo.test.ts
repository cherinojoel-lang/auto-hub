import { describe, it, expect, beforeEach } from 'vitest';
import { updateMetaTags, SEOConfig, getStructuredDataBreadcrumb, getStructuredDataProduct } from '../seo';

describe('seo utility', () => {
  describe('updateMetaTags', () => {
    beforeEach(() => {
      document.head.innerHTML = '';
      document.title = '';
    });

    it('updates document.title and description', () => {
      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
      };

      updateMetaTags(config);

      expect(document.title).toBe('Test Title');

      const descTag = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      expect(descTag).not.toBeNull();
      expect(descTag.content).toBe('Test Description');
    });

    it('conditionally adds keywords, robots, and author', () => {
      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
        keywords: 'test, keywords',
        robots: 'noindex, nofollow',
        author: 'Test Author',
      };

      updateMetaTags(config);

      const keywordsTag = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      expect(keywordsTag.content).toBe('test, keywords');

      const robotsTag = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
      expect(robotsTag.content).toBe('noindex, nofollow');

      const authorTag = document.querySelector('meta[name="author"]') as HTMLMetaElement;
      expect(authorTag.content).toBe('Test Author');
    });

    it('does not add keywords, robots, or author if omitted', () => {
      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
      };

      updateMetaTags(config);

      expect(document.querySelector('meta[name="keywords"]')).toBeNull();
      expect(document.querySelector('meta[name="robots"]')).toBeNull();
      expect(document.querySelector('meta[name="author"]')).toBeNull();
    });

    it('creates Open Graph tags with fallbacks and defaults', () => {
      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
      };

      updateMetaTags(config);

      const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      expect(ogTitle.content).toBe('Test Title'); // fallback to title

      const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      expect(ogDesc.content).toBe('Test Description'); // fallback to desc

      const ogType = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
      expect(ogType.content).toBe('website'); // default
    });

    it('creates Open Graph tags with specific values including image', () => {
      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
        ogTitle: 'OG Title',
        ogDescription: 'OG Description',
        ogType: 'article',
        ogImage: 'https://example.com/image.jpg',
      };

      updateMetaTags(config);

      const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      expect(ogTitle.content).toBe('OG Title');

      const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      expect(ogDesc.content).toBe('OG Description');

      const ogType = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
      expect(ogType.content).toBe('article');

      const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
      expect(ogImage.content).toBe('https://example.com/image.jpg');
    });

    it('creates Twitter tags with defaults', () => {
      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
      };

      updateMetaTags(config);

      const twitterCard = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;
      expect(twitterCard.content).toBe('summary_large_image'); // default
    });

    it('creates Twitter tags with specific values and creator', () => {
      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
        twitterCard: 'summary',
        twitterCreator: '@testcreator',
      };

      updateMetaTags(config);

      const twitterCard = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;
      expect(twitterCard.content).toBe('summary');

      const twitterCreator = document.querySelector('meta[name="twitter:creator"]') as HTMLMetaElement;
      expect(twitterCreator.content).toBe('@testcreator');
    });

    it('updates canonical URL when provided', () => {
      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
        canonicalUrl: 'https://example.com/canonical',
      };

      updateMetaTags(config);

      const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      expect(canonicalLink.href).toBe('https://example.com/canonical');
    });

    it('adds structured data (JSON-LD) when provided', () => {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Test Org',
      };

      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
        structuredData,
      };

      updateMetaTags(config);

      const script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      expect(script).not.toBeNull();
      expect(script.textContent).toBe(JSON.stringify(structuredData));
    });

    it('removes existing structured data before adding new one', () => {
      const initialScript = document.createElement('script');
      initialScript.type = 'application/ld+json';
      initialScript.textContent = JSON.stringify({ old: 'data' });
      document.head.appendChild(initialScript);

      const newStructuredData = { new: 'data' };

      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
        structuredData: newStructuredData,
      };

      updateMetaTags(config);

      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);
      expect(scripts[0].textContent).toBe(JSON.stringify(newStructuredData));
    });

    it('updates existing meta tags instead of appending new ones', () => {
      const initialMeta = document.createElement('meta');
      initialMeta.setAttribute('name', 'description');
      initialMeta.content = 'Old Description';
      document.head.appendChild(initialMeta);

      const config: SEOConfig = {
        title: 'Test Title',
        description: 'New Description',
      };

      updateMetaTags(config);

      const descriptions = document.querySelectorAll('meta[name="description"]');
      expect(descriptions.length).toBe(1);
      expect((descriptions[0] as HTMLMetaElement).content).toBe('New Description');
    });

    it('updates existing canonical link instead of appending new ones', () => {
      const initialLink = document.createElement('link');
      initialLink.rel = 'canonical';
      initialLink.href = 'https://example.com/old';
      document.head.appendChild(initialLink);

      const config: SEOConfig = {
        title: 'Test Title',
        description: 'Test Description',
        canonicalUrl: 'https://example.com/new',
      };

      updateMetaTags(config);

      const links = document.querySelectorAll('link[rel="canonical"]');
      expect(links.length).toBe(1);
      expect((links[0] as HTMLLinkElement).href).toBe('https://example.com/new');
    });
  });

  describe('getStructuredDataBreadcrumb', () => {
    it('returns structured data for empty items', () => {
      const result = getStructuredDataBreadcrumb([]);
      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [],
      });
    });

    it('returns structured data for a single item', () => {
      const items = [{ name: 'Home', url: 'https://example.com' }];
      const result = getStructuredDataBreadcrumb(items);
      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://example.com',
          },
        ],
      });
    });

    it('returns structured data for multiple items', () => {
      const items = [
        { name: 'Home', url: 'https://example.com' },
        { name: 'Category', url: 'https://example.com/category' },
        { name: 'Product', url: 'https://example.com/category/product' },
      ];
      const result = getStructuredDataBreadcrumb(items);
      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://example.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Category',
            item: 'https://example.com/category',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Product',
            item: 'https://example.com/category/product',
          },
        ],
      });
    });
  });

  describe('getStructuredDataProduct', () => {
    it('returns structured data for a fully populated vehicle', () => {
      const vehicle = {
        id: '123',
        title: 'Audi A3 Sportback',
        firstRegistration: '2020-05',
        mileage: '50.000 km',
        power: '150 PS',
        price: '25.000 €',
        mainImage: '/images/audi-main.jpg',
        gallery: [
          '/images/audi-1.jpg',
          '/images/audi-2.jpg',
          '/images/audi-3.jpg',
          '/images/audi-4.jpg',
          '/images/audi-5.jpg'
        ],
        make: 'Audi',
        model: 'A3',
        fuel: 'Diesel',
      };

      const result = getStructuredDataProduct(vehicle);

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'Car',
        'name': 'Audi A3 Sportback',
        'description': 'Audi A3 Sportback gebraucht kaufen in Iserlohn-Letmathe. EZ 2020-05, 50.000 km, 150 PS. Top Zustand bei Automobile Quick.',
        'image': [
          'https://automobilequick.de/images/audi-main.jpg',
          'https://automobilequick.de/images/audi-2.jpg',
          'https://automobilequick.de/images/audi-3.jpg',
          'https://automobilequick.de/images/audi-4.jpg',
          'https://automobilequick.de/images/audi-5.jpg',
        ],
        'brand': {
          '@type': 'Brand',
          'name': 'Audi',
        },
        'model': 'A3',
        'vehicleModelDate': '2020-05',
        'mileageFromOdometer': {
          '@type': 'QuantitativeValue',
          'value': '50000',
          'unitCode': 'KMT',
        },
        'fuelType': 'Diesel',
        'offers': {
          '@type': 'Offer',
          'price': 25000,
          'priceCurrency': 'EUR',
          'availability': 'https://schema.org/InStock',
          'url': 'https://automobilequick.de/fahrzeugdetail/123',
          'seller': {
            '@type': 'LocalBusiness',
            'name': 'Automobile Quick',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Hagener Str. 126a',
              'addressLocality': 'Iserlohn',
              'postalCode': '58642',
              'addressCountry': 'DE',
            },
          },
        },
      });
    });

    it('handles vehicle with missing optional properties like gallery', () => {
      const vehicle = {
        id: '124',
        title: 'BMW 3er',
        firstRegistration: '2019-08',
        mileage: '80.000 km',
        power: '190 PS',
        price: '30.000 €',
        mainImage: '/images/bmw-main.jpg',
        make: 'BMW',
        model: '320d',
        fuel: 'Diesel',
      };

      const result = getStructuredDataProduct(vehicle);

      expect(result.image).toEqual([
        'https://automobilequick.de/images/bmw-main.jpg'
      ]);
    });

    it('correctly parses irregular price and mileage formats', () => {
      const vehicle1 = {
        id: '1',
        title: 'Car',
        price: '19.500', // Missing currency sign
        mileage: '40.000', // Missing unit
      };

      const result1 = getStructuredDataProduct(vehicle1);
      expect(result1.offers.price).toBe(19500);
      expect(result1.mileageFromOdometer.value).toBe('40000');

      const vehicle2 = {
        id: '2',
        title: 'Car',
        price: 'Auf Anfrage', // No numbers
        mileage: 'Neu', // No numbers
      };

      const result2 = getStructuredDataProduct(vehicle2);
      expect(result2.offers.price).toBe(0);
      expect(result2.mileageFromOdometer.value).toBe('');

      const vehicle3 = {
        id: '3',
        title: 'Car',
        // Missing properties entirely
      };

      const result3 = getStructuredDataProduct(vehicle3);
      expect(result3.offers.price).toBe(0);
      expect(result3.mileageFromOdometer.value).toBeUndefined();
    });
  });
});
