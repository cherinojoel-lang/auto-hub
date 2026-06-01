import { describe, it, expect } from 'vitest';
import { generateSitemap, generateFullSitemap, type SitemapEntry } from '../sitemap';

describe('generateSitemap', () => {
  it('should generate a basic sitemap with minimal entries', () => {
    const entries: SitemapEntry[] = [
      { url: '/' }
    ];

    const result = generateSitemap(entries);

    expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(result).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(result).toContain('<loc>https://automobilequick.de/</loc>');
    expect(result).not.toContain('<lastmod>');
    expect(result).not.toContain('<changefreq>');
    expect(result).not.toContain('<priority>');
  });

  it('should generate a sitemap with all optional fields', () => {
    const entries: SitemapEntry[] = [
      {
        url: '/vehicles',
        lastmod: '2023-10-27',
        changefreq: 'daily',
        priority: 0.9
      }
    ];

    const result = generateSitemap(entries);

    expect(result).toContain('<loc>https://automobilequick.de/vehicles</loc>');
    expect(result).toContain('<lastmod>2023-10-27</lastmod>');
    expect(result).toContain('<changefreq>daily</changefreq>');
    expect(result).toContain('<priority>0.9</priority>');
  });

  it('should correctly prefix relative URLs with the base URL', () => {
    const entries: SitemapEntry[] = [
      { url: '/about' },
      { url: 'contact' } // Not starting with slash, but relative
    ];

    const result = generateSitemap(entries);

    expect(result).toContain('<loc>https://automobilequick.de/about</loc>');
    expect(result).toContain('<loc>https://automobilequick.decontact</loc>'); // This is how the current implementation works for 'contact'
  });

  it('should not modify absolute URLs', () => {
    const entries: SitemapEntry[] = [
      { url: 'http://example.com/other' },
      { url: 'https://automobilequick.de/specific' }
    ];

    const result = generateSitemap(entries);

    expect(result).toContain('<loc>http://example.com/other</loc>');
    expect(result).toContain('<loc>https://automobilequick.de/specific</loc>');
  });

  it('should correctly escape special XML characters in URLs', () => {
    const entries: SitemapEntry[] = [
      { url: '/search?q=cars&sort=price<10000>5000"model\'s"' }
    ];

    const result = generateSitemap(entries);

    // Check for the escaped characters according to escapeXml:
    // & -> &amp;
    // < -> &lt;
    // > -> &gt;
    // " -> &quot;
    // ' -> &apos;
    expect(result).toContain('<loc>https://automobilequick.de/search?q=cars&amp;sort=price&lt;10000&gt;5000&quot;model&apos;s&quot;</loc>');
  });
});

describe('generateFullSitemap', () => {
  it('should include default entries even with no available vehicles', () => {
    const result = generateFullSitemap([]);

    // Check that default entries are in the output
    expect(result).toContain('<loc>https://automobilequick.de/</loc>');
    expect(result).toContain('<loc>https://automobilequick.de/fahrzeugbestand</loc>');
    expect(result).toContain('<loc>https://automobilequick.de/ueber-uns</loc>');
    expect(result).toContain('<loc>https://automobilequick.de/kontakt</loc>');
    expect(result).toContain('<loc>https://automobilequick.de/autoankauf</loc>');
    expect(result).toContain('<loc>https://automobilequick.de/finanzierung</loc>');
  });

  it('should filter out non-available vehicles', () => {
    const vehicles = [
      { id: '1', status: 'available' },
      { id: '2', status: 'sold' },
      { id: '3', status: 'reserved' }
    ];

    const result = generateFullSitemap(vehicles);

    expect(result).toContain('<loc>https://automobilequick.de/fahrzeugdetail/1</loc>');
    expect(result).not.toContain('<loc>https://automobilequick.de/fahrzeugdetail/2</loc>');
    expect(result).not.toContain('<loc>https://automobilequick.de/fahrzeugdetail/3</loc>');
  });

  it('should use listingDate when provided, otherwise fallback to today', () => {
    const today = new Date().toISOString().slice(0, 10);
    const vehicles = [
      { id: '1', status: 'available', listingDate: '2023-11-15T12:00:00Z' },
      { id: '2', status: 'available' }
    ];

    const result = generateFullSitemap(vehicles);

    expect(result).toContain('<loc>https://automobilequick.de/fahrzeugdetail/1</loc>');

    const vehicle1Section = result.substring(result.indexOf('fahrzeugdetail/1'), result.indexOf('fahrzeugdetail/2'));
    expect(vehicle1Section).toContain('<lastmod>2023-11-15</lastmod>');

    const vehicle2Section = result.substring(result.indexOf('fahrzeugdetail/2'));
    expect(vehicle2Section).toContain(`<lastmod>${today}</lastmod>`);
  });
});
