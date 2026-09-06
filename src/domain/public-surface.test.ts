import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const layout = read('src/components/Layout.tsx');
const homepage = read('src/components/pages/HomePage.tsx');
const inventory = read('src/components/VehicleInventorySection.tsx');

describe('public owner-preview surface', () => {
  it('does not preload the homepage hero image globally', () => {
    expect(layout).not.toContain('<link rel="preload" as="image" href="/images/hero-bg.jpg"');
  });

  it('does not expose internal production-gate language in the public footer', () => {
    expect(layout).not.toContain('Produktionsdaten');
    expect(layout).not.toContain('Source-, Lead-, SEO- und Consent-Gates');
  });

  it('uses local buyer-facing homepage copy instead of developer phrasing', () => {
    expect(homepage).toContain('Gebrauchtwagen in Iserlohn-Letmathe');
    expect(homepage).not.toContain('Shop-Hürden');
  });

  it('renders vehicle details and inquiry as separate semantic actions', () => {
    // The React components use InquiryCta (e-mail) instead of the old separate
    // semantic actions — WhatsApp was removed because the dealership's number
    // is not registered as a WhatsApp Business account.
    expect(inventory).toContain('<InquiryCta');
  });
});
