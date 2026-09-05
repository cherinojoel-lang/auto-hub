const LOCAL_PREVIEW_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);
const TRUE_LIKE_VALUES = new Set(['1', 'true', 'yes', 'on']);

export function isPreviewHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().replace(/\.$/, '');
  if (!host) return false;
  if (LOCAL_PREVIEW_HOSTS.has(host)) return true;
  return host === 'workers.dev' || host.endsWith('.workers.dev');
}

export function shouldNoindexPreview(hostname: string): boolean {
  return isPreviewHost(hostname);
}

export function isPreviewModeEnabled(value: string | undefined | null): boolean {
  if (typeof value !== 'string') return false;
  return TRUE_LIKE_VALUES.has(value.trim().toLowerCase());
}
