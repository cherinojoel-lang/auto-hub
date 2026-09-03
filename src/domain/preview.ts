const LOCAL_PREVIEW_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

export function isPreviewHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().replace(/\.$/, '');
  if (!host) return false;
  if (LOCAL_PREVIEW_HOSTS.has(host)) return true;
  return host === 'workers.dev' || host.endsWith('.workers.dev');
}

export function shouldNoindexPreview(hostname: string): boolean {
  return isPreviewHost(hostname);
}
