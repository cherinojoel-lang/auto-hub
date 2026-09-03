import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const layout = read('src/layouts/PublicLayout.astro');
const homepage = read('src/pages/index.astro');
const inventory = read('src/pages/fahrzeuge/index.astro');

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
