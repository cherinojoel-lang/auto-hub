/**
 * SEO Configuration for Automobile Quick
 * Centralized meta tags and schema.org markup
 */

export const SITE_CONFIG = {
  name: 'Automobile Quick',
  url: 'https://automobilequick.de',
  description: 'Ihr vertrauensvoller Partner für gepflegte Gebrauchtwagen in Iserlohn-Letmathe seit 1982.',
  telephone: '+49-2374-912912',
  email: 'auto-quick@t-online.de',
  address: {
    streetAddress: 'Hagener Str. 126a',
    addressLocality: 'Iserlohn',
    postalCode: '58642',
    addressCountry: 'DE',
  },
  geo: {
    latitude: '51.4043',
    longitude: '7.6745',
  },
  image: 'https://automobilequick.de/images/logo-og.png',
  foundingYear: 1982,
};

export const PAGE_METADATA = {
  home: {
    title: 'Automobile Quick | Gebrauchtwagen in Iserlohn-Letmathe',
    description: 'Automobile Quick in Iserlohn-Letmathe bietet gepflegte Gebrauchtwagen, persönliche Beratung, Fahrzeugankauf und Finanzierung auf Anfrage. Besichtigung vor Ort in der Hagener Str. 126a, 58642 Iserlohn.',
    path: '/',
  },
  vehicles: {
    title: 'Fahrzeugbestand | Automobile Quick — Gebrauchtwagen Iserlohn',
    description: 'Entdecken Sie unser großes Angebot an gepflegten Gebrauchtwagen. Alle Fahrzeuge gründlich geprüft. Probefahrt vereinbaren & Finanzierung möglich!',
    path: '/fahrzeugbestand',
  },
  vehicleDetail: {
    title: '{title} | Automobile Quick — Gebrauchtwagen Iserlohn',
    description: '{manufacturer} {model} {year} - {price}€. Gepflegtes Fahrzeug mit Finanzierung. Jetzt Probefahrt vereinbaren!',
    path: '/fahrzeugdetail/:id',
  },
  tradeIn: {
    title: 'Autoankauf Iserlohn | Faire Preise für Ihren Gebrauchtwagen',
    description: 'Verkaufen Sie Ihren Gebrauchtwagen zu fairen Preisen. Schnelle Bewertung, unkomplizierte Abwicklung. Jetzt Angebot erhalten!',
    path: '/autoankauf',
  },
  financing: {
    title: 'Finanzierung & Leasing | Automobile Quick — Iserlohn',
    description: 'Flexible Finanzierungslösungen für Ihren Traumwagen. Günstige Konditionen, schnelle Genehmigung. Jetzt informieren!',
    path: '/finanzierung',
  },
  about: {
    title: 'Über uns | Automobile Quick — Seit 1982 in Iserlohn',
    description: 'Lernen Sie Automobile Quick kennen. Seit 1982 Ihr zuverlässiger Partner für Gebrauchtwagen in Iserlohn. Unsere Geschichte & Werte.',
    path: '/ueber-uns',
  },
  contact: {
    title: 'Kontakt & Anfahrt | Automobile Quick — Iserlohn',
    description: 'Besuchen Sie uns in Iserlohn oder kontaktieren Sie uns. Öffnungszeiten, Anfahrt, Telefon & E-Mail. Wir freuen uns auf Sie!',
    path: '/kontakt',
  },
  privacy: {
    title: 'Datenschutz | Automobile Quick',
    description: 'Datenschutzerklärung von Automobile Quick. Informationen zum Schutz Ihrer persönlichen Daten.',
    path: '/datenschutz',
  },
  imprint: {
    title: 'Impressum | Automobile Quick',
    description: 'Impressum und rechtliche Informationen von Automobile Quick in Iserlohn.',
    path: '/impressum',
  },
};

export const OPENING_HOURS = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  {
    dayOfWeek: 'Saturday',
    opens: '10:00',
    closes: '16:00',
  },
];

/**
 * Generate LocalBusiness + AutoDealer Schema.org markup
 */
export function generateBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoDealer', 'LocalBusiness'],
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.telephone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: OPENING_HOURS,
    image: SITE_CONFIG.image,
    priceRange: '€€',
    paymentAccepted: ['Cash', 'Credit Card', 'Financing'],
    areaServed: {
      '@type': 'City',
      name: SITE_CONFIG.address.addressLocality,
    },
  };
}

/**
 * Generate Product Schema for vehicle detail pages
 */
import type { Vehicle } from '@/data/vehiclesData.generated';

export function generateProductSchema(vehicle: Partial<Vehicle>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: vehicle.title || `${vehicle.make} ${vehicle.model}`,
    description: vehicle.description,
    image: vehicle.mainImage,
    offers: {
      '@type': 'Offer',
      price: vehicle.priceValue?.toString() || (vehicle.price ? vehicle.price.replace(/[^\d]/g, '') : '0'),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
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
