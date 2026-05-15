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
  title: 'Automobile Quick - Gebrauchtwagen in Iserlohn-Letmathe',
  description: 'Hochwertige Gebrauchtwagen mit persönlicher Beratung. Automobile Quick - Ihr Autohaus seit 1982 in Iserlohn-Letmathe.',
  keywords: 'Gebrauchtwagen, Autohaus, Iserlohn, Letmathe, Automobile Quick, Fahrzeuge',
  ogType: 'website',
  robots: 'index, follow',
  author: 'Automobile Quick',
  twitterCard: 'summary_large_image',
};

export function updateMetaTags(config: SEOConfig) {
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
  updateMetaTag('og:type', config.ogType || 'website', 'property');
  
  if (config.ogImage) {
    updateMetaTag('og:image', config.ogImage, 'property');
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', config.twitterCard || 'summary_large_image', 'name');
  
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
    '@type': 'LocalBusiness',
    name: 'Automobile Quick',
    description: 'Hochwertige Gebrauchtwagen mit persönlicher Beratung',
    url: 'https://automobilequick.de',
    telephone: '+49 (0) 2331 123456',
    email: 'info@automobilequick.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Delsterner Str. 92',
      addressLocality: 'Hagen',
      postalCode: '58091',
      addressCountry: 'DE',
    },
    sameAs: [
      'https://www.google.com/maps/place/Automobile+Quick',
    ],
    image: 'https://static.wixstatic.com/media/32e7c0_d28732f69d9643a7ada1b1be4890a422~mv2.png',
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1690',
    },
  };
}

export function getStructuredDataProduct(vehicle: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${vehicle.manufacturer} ${vehicle.model}`,
    description: vehicle.description || `${vehicle.manufacturer} ${vehicle.model} Gebrauchtwagen`,
    image: vehicle.mainImage,
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1690',
    },
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
