const LOCAL_PREVIEW_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);
const TRUE_LIKE_VALUES = new Set(['1', 'true', 'yes', 'on']);

export function resolveEffectiveHost(
  headers?: Headers | Record<string, string | undefined> | null,
  urlHostname?: string
): string {
  let forwarded: string | undefined | null;
  if (headers) {
    if (typeof (headers as Headers).get === 'function') {
      forwarded = (headers as Headers).get('x-forwarded-host');
    } else {
      forwarded =
        (headers as Record<string, string | undefined>)['x-forwarded-host'] ||
        (headers as Record<string, string | undefined>)['X-Forwarded-Host'];
    }
  }
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) {
      return first.split(':')[0].toLowerCase();
    }
  }
  return (urlHostname || '').trim().toLowerCase().replace(/\.$/, '');
}

export function isPreviewHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().replace(/\.$/, '');
  if (!host) return false;
  if (LOCAL_PREVIEW_HOSTS.has(host)) return true;
  return host === 'workers.dev' || host.endsWith('.workers.dev');
}

export function shouldNoindexPreview(
  hostname: string,
  headers?: Headers | Record<string, string | undefined> | null
): boolean {
  const effectiveHost = headers ? resolveEffectiveHost(headers, hostname) : hostname;
  return isPreviewHost(effectiveHost);
}

export function isPreviewModeEnabled(value: string | undefined | null): boolean {
  if (typeof value !== 'string') return false;
  return TRUE_LIKE_VALUES.has(value.trim().toLowerCase());
}
