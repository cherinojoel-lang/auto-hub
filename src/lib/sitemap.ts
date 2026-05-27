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
  const baseUrl = 'https://automobilequick.de';
  
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
    url: '/fahrzeugbestand',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    url: '/ueber-uns',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    url: '/kontakt',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    url: '/autoankauf',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    url: '/finanzierung',
    changefreq: 'monthly',
    priority: 0.7,
  },
];

interface VehicleSitemapItem {
  id: string;
  status: string;
  listingDate?: string;
}

export function generateFullSitemap(vehicles: VehicleSitemapItem[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const vehicleEntries: SitemapEntry[] = vehicles
    .filter((v) => v.status === 'available')
    .map((v) => ({
      url: `/fahrzeugdetail/${v.id}`,
      lastmod: (v.listingDate || today).slice(0, 10),
      changefreq: 'weekly' as const,
      priority: 0.8,
    }));

  return generateSitemap([...defaultSitemapEntries, ...vehicleEntries]);
}
