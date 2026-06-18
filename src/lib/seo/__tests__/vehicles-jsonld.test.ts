import { describe, it, expect } from 'vitest';
import type { Vehicle } from '@/data/vehiclesData.generated';
import { buildItemListJsonLd } from '../vehicles-jsonld';

const v = (id: string, overrides: Partial<Vehicle> = {}): Vehicle => ({
  id, folder: id, make: 'BMW', model: 'M3', title: `BMW M3 ${id}`,
  price: '15.000 €', priceValue: 15000, financing: '',
  firstRegistration: '01/2020', mileage: '50.000 km', power: '300 kW', fuel: 'Benzin',
  mainImage: `/vehicles/${id}/main.webp`, gallery: [], alt: '', status: 'available',
  ...overrides,
});

describe('buildItemListJsonLd', () => {
  it('liefert gültiges JSON', () => {
    const json = buildItemListJsonLd([v('a')], 'https://www.automobile-quick.de/fahrzeugbestand');
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it('enthält @context und @type ItemList', () => {
    const parsed = JSON.parse(
      buildItemListJsonLd([v('a')], 'https://www.automobile-quick.de/fahrzeugbestand'),
    );
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@type']).toBe('ItemList');
  });

  it('numberOfItems reflektiert Gesamtzahl, nicht abgeschnittene Liste', () => {
    const many = Array.from({ length: 30 }, (_, i) => v(String(i)));
    const parsed = JSON.parse(buildItemListJsonLd(many, 'https://www.automobile-quick.de/fahrzeugbestand'));
    expect(parsed.numberOfItems).toBe(30);
    expect(parsed.itemListElement).toHaveLength(20);
  });

  it('jedes Item hat position, Product mit Brand und Offer', () => {
    const parsed = JSON.parse(
      buildItemListJsonLd([v('a', { make: 'BMW' })], 'https://www.automobile-quick.de/fahrzeugbestand'),
    );
    const first = parsed.itemListElement[0];
    expect(first.position).toBe(1);
    expect(first.item['@type']).toBe('Product');
    expect(first.item.brand.name).toBe('BMW');
    expect(first.item.offers.price).toBe(15000);
    expect(first.item.offers.priceCurrency).toBe('EUR');
    expect(first.item.offers.availability).toBe('https://schema.org/InStock');
  });

  it('sold vehicles → OutOfStock availability', () => {
    const parsed = JSON.parse(
      buildItemListJsonLd([v('a', { status: 'sold' })], 'https://www.automobile-quick.de/fahrzeugbestand'),
    );
    expect(parsed.itemListElement[0].item.offers.availability).toBe('https://schema.org/OutOfStock');
  });

  it('verwendet origin aus pageUrl für absolute Image-URLs', () => {
    const parsed = JSON.parse(
      buildItemListJsonLd([v('a', { mainImage: '/foo.webp' })], 'https://example.test/x'),
    );
    expect(parsed.itemListElement[0].item.image).toBe('https://example.test/foo.webp');
  });

  it('escapes < and > to prevent XSS vulnerabilities', () => {
    const maliciousTitle = 'BMW M3 </script><script>alert("xss")</script>';
    const result = buildItemListJsonLd([v('xss', { title: maliciousTitle })], 'https://example.test/x');

    // Check that there are no unescaped < or > characters
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');

    // Check that it can still be parsed as valid JSON and contains the unescaped string
    const parsed = JSON.parse(result);
    expect(parsed.itemListElement[0].item.name).toBe(maliciousTitle);
  });
});
