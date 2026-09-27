import type { APIRoute } from 'astro';
import { generateFullSitemap } from '@/lib/sitemap';
import { vehiclesData } from '@/data/vehiclesData.generated';

export const GET: APIRoute = () => {
  return new Response(generateFullSitemap(vehiclesData), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
