import type { MiddlewareHandler } from 'astro';

const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://www.google-analytics.com https://api.cloudflare.com",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; '),
};

// ⚡ Bolt Optimization: Hoist static object entries calculation outside the request handler
// to prevent unnecessary memory allocation and re-evaluation on every incoming edge request.
const SECURITY_HEADERS_ENTRIES = Object.entries(SECURITY_HEADERS);

const IMMUTABLE_ASSET_PATTERN = /^\/(?:_astro\/|.*\.(?:avif|webp|jpe?g|png|svg|gif|ico|woff2?)(?:$|\?))/i;

export const onRequest: MiddlewareHandler = async ({ url }, next) => {
  const response = await next();

  for (const [name, value] of SECURITY_HEADERS_ENTRIES) {
    response.headers.set(name, value);
  }

  if (IMMUTABLE_ASSET_PATTERN.test(url.pathname)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
};
