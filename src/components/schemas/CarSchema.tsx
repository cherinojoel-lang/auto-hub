import { useEffect } from 'react';

interface CarSchemaVehicle {
  id: string | number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission?: string;
  color?: string;
  description?: string;
  imageUrl?: string;
}

interface CarSchemaProps {
  vehicle: CarSchemaVehicle;
}

export default function CarSchema({ vehicle }: CarSchemaProps) {
  useEffect(() => {
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Car',
      name: `${vehicle.brand} ${vehicle.model}`,
      brand: {
        '@type': 'Brand',
        name: vehicle.brand,
      },
      model: vehicle.model,
      vehicleModelDate: String(vehicle.year),
      mileageFromOdometer: {
        '@type': 'QuantitativeValue',
        value: vehicle.mileage,
        unitCode: 'KMT',
      },
      fuelType: vehicle.fuel,
      offers: {
        '@type': 'Offer',
        price: vehicle.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'AutoDealer',
          name: 'Automobile Quick',
          telephone: '+49-2374-912912',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Hagener Str. 126a',
            addressLocality: 'Iserlohn',
            postalCode: '58642',
            addressCountry: 'DE',
          },
        },
      },
    };

    if (vehicle.transmission) schema.vehicleTransmission = vehicle.transmission;
    if (vehicle.color) schema.color = vehicle.color;
    if (vehicle.imageUrl) schema.image = vehicle.imageUrl;
    if (vehicle.description) schema.description = vehicle.description;

    const scriptId = `car-schema-${vehicle.id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

    return () => {
      script?.remove();
    };
  }, [vehicle]);

  return null;
}
