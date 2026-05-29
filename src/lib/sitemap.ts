/**
 * Sitemap generator for SEO
 * This generates a sitemap.xml for search engines
 */

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemap(entries: SitemapEntry[]): string {
  const baseUrl = 'https://sldwrd-my-site-wgayakj9-energievergleich.wix-vibe-site.com';
  
  const xmlEntries = entries.map(entry => {
    const url = entry.url.startsWith('http') ? entry.url : `${baseUrl}${entry.url}`;
    return `  <url>
    <loc>${escapeXml(url)}</loc>
    ${entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : ''}${entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>\n` : ''}${entry.priority ? `    <priority>${entry.priority}</priority>\n` : ''}  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const defaultSitemapEntries: SitemapEntry[] = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    url: '/vehicles',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
  },
];
