import { describe, it, expect } from 'vitest';
import { generateSitemap, type SitemapEntry } from './sitemap';

describe('generateSitemap', () => {
  it('generates correct basic XML structure for relative URLs', () => {
    const entries: SitemapEntry[] = [{ url: '/about' }];
    const result = generateSitemap(entries);

    expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(result).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(result).toContain('<loc>https://automobilequick.de/about</loc>');
    expect(result).not.toContain('<lastmod>');
    expect(result).not.toContain('<changefreq>');
    expect(result).not.toContain('<priority>');
  });

  it('keeps absolute URLs intact', () => {
    const entries: SitemapEntry[] = [{ url: 'https://external.com/page' }];
    const result = generateSitemap(entries);

    expect(result).toContain('<loc>https://external.com/page</loc>');
  });

  it('handles optional fields correctly', () => {
    const entries: SitemapEntry[] = [{
      url: '/contact',
      lastmod: '2023-10-27',
      changefreq: 'monthly',
      priority: 0.8
    }];
    const result = generateSitemap(entries);

    expect(result).toContain('<loc>https://automobilequick.de/contact</loc>');
    expect(result).toContain('<lastmod>2023-10-27</lastmod>');
    expect(result).toContain('<changefreq>monthly</changefreq>');
    expect(result).toContain('<priority>0.8</priority>');
  });

  it('correctly escapes XML special characters in URLs', () => {
    const entries: SitemapEntry[] = [{ url: '/search?q=cars&sort=desc<>"\'' }];
    const result = generateSitemap(entries);

    expect(result).toContain('<loc>https://automobilequick.de/search?q=cars&amp;sort=desc&lt;&gt;&quot;&apos;</loc>');
  });

  it('generates multiple url entries correctly', () => {
    const entries: SitemapEntry[] = [
      { url: '/' },
      { url: '/about' }
    ];
    const result = generateSitemap(entries);

    expect(result).toContain('<loc>https://automobilequick.de/</loc>');
    expect(result).toContain('<loc>https://automobilequick.de/about</loc>');
    const urlMatches = result.match(/<url>/g);
    expect(urlMatches?.length).toBe(2);
  });
});
