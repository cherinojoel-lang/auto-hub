import type { Vehicle } from '@/data/vehiclesData.generated';

const MAX_ITEMS = 20;

const PROVIDER = {
  '@type': 'AutoDealer' as const,
  name: 'Automobile Quick',
  url: 'https://automobilequick.de',
  telephone: '+49-2374-912912',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hagener Str. 126a',
    addressLocality: 'Iserlohn',
    postalCode: '58642',
    addressCountry: 'DE',
  },
};

const vehicleToProduct = (vehicle: Vehicle, origin: string) => ({
  '@type': 'Product',
  '@id': `${origin}/fahrzeugdetail/${vehicle.id}`,
  name: vehicle.title,
  image: `${origin}${vehicle.mainImage}`,
  brand: { '@type': 'Brand', name: vehicle.make },
  offers: {
    '@type': 'Offer',
    price: vehicle.priceValue,
    priceCurrency: 'EUR',
    availability: vehicle.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    url: `${origin}/fahrzeugdetail/${vehicle.id}`,
    seller: PROVIDER,
  },
});

export const buildItemListJsonLd = (
  vehicles: ReadonlyArray<Vehicle>,
  pageUrl: string,
): string => {
  const origin = new URL(pageUrl).origin;
  const items = vehicles.slice(0, MAX_ITEMS).map((vehicle, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: vehicleToProduct(vehicle, origin),
  }));

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: pageUrl,
    numberOfItems: vehicles.length,
    itemListElement: items,
  };

  return JSON.stringify(itemList);
};
