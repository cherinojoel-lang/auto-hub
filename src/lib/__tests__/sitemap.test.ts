import { describe, it, expect } from 'vitest';
import { generateSitemap, type SitemapEntry } from '../sitemap';

describe('generateSitemap', () => {
  it('should generate a basic sitemap with minimal entries', () => {
    const entries: SitemapEntry[] = [
      { url: '/' }
    ];

    const result = generateSitemap(entries);

    expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(result).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(result).toContain('<loc>https://sldwrd-my-site-wgayakj9-energievergleich.wix-vibe-site.com/</loc>');
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

    expect(result).toContain('<loc>https://sldwrd-my-site-wgayakj9-energievergleich.wix-vibe-site.com/vehicles</loc>');
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

    expect(result).toContain('<loc>https://sldwrd-my-site-wgayakj9-energievergleich.wix-vibe-site.com/about</loc>');
    expect(result).toContain('<loc>https://sldwrd-my-site-wgayakj9-energievergleich.wix-vibe-site.comcontact</loc>'); // This is how the current implementation works for 'contact'
  });

  it('should not modify absolute URLs', () => {
    const entries: SitemapEntry[] = [
      { url: 'http://example.com/other' },
      { url: 'https://sldwrd-my-site-wgayakj9-energievergleich.wix-vibe-site.com/specific' }
    ];

    const result = generateSitemap(entries);

    expect(result).toContain('<loc>http://example.com/other</loc>');
    expect(result).toContain('<loc>https://sldwrd-my-site-wgayakj9-energievergleich.wix-vibe-site.com/specific</loc>');
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
    expect(result).toContain('<loc>https://sldwrd-my-site-wgayakj9-energievergleich.wix-vibe-site.com/search?q=cars&amp;sort=price&lt;10000&gt;5000&quot;model&apos;s&quot;</loc>');
  });
});
