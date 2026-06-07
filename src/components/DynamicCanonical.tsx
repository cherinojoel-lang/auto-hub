import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.automobile-quick.de';

export function DynamicCanonical() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath =
      pathname === '/' || pathname === '/index'
        ? '/'
        : pathname.replace(/\/+$/, '');

    const canonicalUrl = `${SITE_URL}${normalizedPath}`;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);
  }, [pathname]);

  return null;
}
