import type { APIRoute } from 'astro';
import { generateSitemap } from '@/lib/sitemap';

const publicEntries = [
  { url: '/', changefreq: 'weekly' as const, priority: 1 },
  { url: '/ankauf', changefreq: 'monthly' as const, priority: 0.8 },
  { url: '/finanzierung', changefreq: 'monthly' as const, priority: 0.8 },
  { url: '/ueber-uns', changefreq: 'monthly' as const, priority: 0.7 },
  { url: '/kontakt', changefreq: 'monthly' as const, priority: 0.8 },
];

export const GET: APIRoute = () => {
  return new Response(generateSitemap(publicEntries), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
