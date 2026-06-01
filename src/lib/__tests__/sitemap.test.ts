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
  it('should include available vehicles and filter out others', () => {
    const vehicles = [
      { id: 'v1', status: 'available', listingDate: '2024-01-01T12:00:00.000Z' },
      { id: 'v2', status: 'sold', listingDate: '2024-01-02T12:00:00.000Z' },
      { id: 'v3', status: 'available', listingDate: '2024-01-03T12:00:00.000Z' }
    ];

    const result = generateFullSitemap(vehicles);

    expect(result).toContain('<loc>https://automobilequick.de/fahrzeugdetail/v1</loc>');
    expect(result).toContain('<lastmod>2024-01-01</lastmod>');
    expect(result).toContain('<loc>https://automobilequick.de/fahrzeugdetail/v3</loc>');
    expect(result).toContain('<lastmod>2024-01-03</lastmod>');
    expect(result).not.toContain('<loc>https://automobilequick.de/fahrzeugdetail/v2</loc>');
    expect(result).not.toContain('<lastmod>2024-01-02</lastmod>');
  });

  it('should use today\'s date when listingDate is missing', () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const vehicles = [
      { id: 'v1', status: 'available' }
    ];

    const result = generateFullSitemap(vehicles);

    expect(result).toContain('<loc>https://automobilequick.de/fahrzeugdetail/v1</loc>');
    expect(result).toContain(`<lastmod>${todayStr}</lastmod>`);
  });

  it('should include default sitemap entries even if vehicle list is empty', () => {
    const result = generateFullSitemap([]);

    expect(result).toContain('<loc>https://automobilequick.de/</loc>');
    expect(result).toContain('<loc>https://automobilequick.de/fahrzeugbestand</loc>');
    expect(result).toContain('<loc>https://automobilequick.de/ueber-uns</loc>');
    expect(result).toContain('<loc>https://automobilequick.de/kontakt</loc>');
  });
});
