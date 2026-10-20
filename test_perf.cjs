const assert = require('assert');

// Simulate the unoptimized behavior
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'",
};

function unoptimized(iterations) {
  let count = 0;
  for (let i = 0; i < iterations; i++) {
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      count++;
    }
  }
  return count;
}

const SECURITY_HEADERS_ENTRIES = Object.entries(SECURITY_HEADERS);

function optimized(iterations) {
  let count = 0;
  for (let i = 0; i < iterations; i++) {
    for (const [name, value] of SECURITY_HEADERS_ENTRIES) {
      count++;
    }
  }
  return count;
}

const ITERATIONS = 10000000;

console.time('unoptimized');
unoptimized(ITERATIONS);
console.timeEnd('unoptimized');

console.time('optimized');
optimized(ITERATIONS);
console.timeEnd('optimized');
