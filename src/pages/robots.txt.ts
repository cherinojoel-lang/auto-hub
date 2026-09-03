import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /fahrzeuge/',
    'Disallow: /fahrzeugbestand-ssr',
    'Sitemap: https://www.automobile-quick.de/sitemap.xml',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
