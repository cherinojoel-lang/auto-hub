/**
 * SEO Utility for managing meta tags and structured data
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  robots?: string;
  author?: string;
  twitterCard?: string;
  twitterCreator?: string;
  structuredData?: Record<string, any>;
}

export const DEFAULT_SEO: SEOConfig = {
  title: 'Automobile Quick - Gebrauchtwagen in Iserlohn-Letmathe | Autohaus seit 1982',
  description: 'Automobile Quick: Hochwertige Gebrauchtwagen in Iserlohn-Letmathe. Audi, BMW, Mercedes, VW, Porsche - faire Preise, persönliche Beratung, seit 1982. Jetzt Fahrzeug finden!',
  keywords: 'Gebrauchtwagen Iserlohn, Gebrauchtwagen Letmathe, Autohaus Iserlohn, Automobile Quick, Fahrzeugbestand, Autoankauf Iserlohn, Finanzierung auf Anfrage, Gebrauchtwagen Iserlohn-Letmathe',
  ogType: 'website',
  robots: 'index, follow',
  author: 'Automobile Quick',
  twitterCard: 'summary_large_image',
};

export function updateMetaTags(config: SEOConfig) {
  document.documentElement.lang = 'de';

  // Update title
  document.title = config.title;

  // Update or create meta tags
  updateMetaTag('description', config.description);
  
  if (config.keywords) {
    updateMetaTag('keywords', config.keywords);
  }
  
  if (config.robots) {
    updateMetaTag('robots', config.robots);
  }
  
  if (config.author) {
    updateMetaTag('author', config.author);
  }

  // Open Graph tags
  updateMetaTag('og:title', config.ogTitle || config.title, 'property');
  updateMetaTag('og:description', config.ogDescription || config.description, 'property');
  updateMetaTag('og:site_name', 'Automobile Quick', 'property');
  updateMetaTag('og:type', config.ogType || 'website', 'property');
  
  if (config.ogImage) {
    updateMetaTag('og:image', config.ogImage, 'property');
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', config.twitterCard || 'summary_large_image', 'name');
  updateMetaTag('twitter:title', config.ogTitle || config.title, 'name');
  updateMetaTag('twitter:description', config.ogDescription || config.description, 'name');
  
  if (config.twitterCreator) {
    updateMetaTag('twitter:creator', config.twitterCreator, 'name');
  }

  // Canonical URL
  if (config.canonicalUrl) {
    updateCanonicalLink(config.canonicalUrl);
  }

  // Structured Data (JSON-LD)
  if (config.structuredData) {
    updateStructuredData(config.structuredData);
  }
}

function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  
  link.href = url;
}

function updateStructuredData(data: Record<string, any>) {
  // Remove existing structured data script
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Create and add new structured data script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function getStructuredDataOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'Automobile Quick',
    description: 'Gepflegte Gebrauchtwagen in Iserlohn-Letmathe seit 1982. Persönliche Beratung, Fahrzeugankauf und Finanzierung auf Anfrage.',
    url: 'https://automobilequick.de',
    telephone: '+49-2374-912912',
    email: 'auto-quick@t-online.de',
    priceRange: '€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hagener Str. 126a',
      addressLocality: 'Iserlohn',
      addressRegion: 'NW',
      postalCode: '58642',
      addressCountry: 'DE',
    },
    sameAs: [
      'https://home.mobile.de/AUTOMOBILE-QUICK',
    ],
    foundingDate: '1982',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
  };
}

export function getStructuredDataProduct(vehicle: any) {
  const priceValue = parseInt(vehicle.price?.replace(/[^0-9]/g, '')) || 0;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    'name': vehicle.title,
    'description': `${vehicle.title} gebraucht kaufen in Iserlohn-Letmathe. EZ ${vehicle.firstRegistration}, ${vehicle.mileage}, ${vehicle.power}. Top Zustand bei Automobile Quick.`,
    'image': [
      `https://automobilequick.de${vehicle.mainImage}`,
      ...(vehicle.gallery || []).slice(1, 5).map((img: string) => `https://automobilequick.de${img}`)
    ],
    'brand': {
      '@type': 'Brand',
      'name': vehicle.make
    },
    'model': vehicle.model,
    'vehicleModelDate': vehicle.firstRegistration,
    'mileageFromOdometer': {
      '@type': 'QuantitativeValue',
      'value': vehicle.mileage?.replace(/[^0-9]/g, ''),
      'unitCode': 'KMT'
    },
    'fuelType': vehicle.fuel,
    'offers': {
      '@type': 'Offer',
      'price': priceValue,
      'priceCurrency': 'EUR',
      'availability': 'https://schema.org/InStock',
      'url': `https://automobilequick.de/fahrzeugdetail/${vehicle.id}`,
      'seller': {
        '@type': 'LocalBusiness',
        'name': 'Automobile Quick',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Hagener Str. 126a',
          'addressLocality': 'Iserlohn',
          'postalCode': '58642',
          'addressCountry': 'DE'
        }
      }
    }
  };
}

export function getStructuredDataBreadcrumb(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
