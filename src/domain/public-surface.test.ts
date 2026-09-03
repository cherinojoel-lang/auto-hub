import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const layout = readFileSync(new URL('../layouts/PublicLayout.astro', import.meta.url), 'utf8');
const homepage = readFileSync(new URL('../pages/index.astro', import.meta.url), 'utf8');
const inventory = readFileSync(new URL('../pages/fahrzeuge/index.astro', import.meta.url), 'utf8');

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
    expect(inventory).not.toContain('<span class="btn-premium-secondary">Anfragen</span>');
    expect(inventory).toContain('topic=vehicle');
    expect(inventory).toContain('Anfragen</a>');
  });
});
