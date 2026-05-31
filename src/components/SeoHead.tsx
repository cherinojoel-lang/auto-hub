import { useEffect } from 'react';
import { SITE_CONFIG } from '@/lib/seo-config';

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  schema?: Record<string, any>;
  schemas?: Record<string, any>[]; // Support multiple schemas
}

export default function SeoHead({ title, description, image, url, schema, schemas }: SeoHeadProps) {
  useEffect(() => {
    const resolvedTitle = title || 'Automobile Quick';
    const resolvedDescription = description || SITE_CONFIG.description;
    const resolvedImage = image || SITE_CONFIG.image;

    document
      .querySelectorAll('[wix-seo-tags="true"]')
      .forEach((element) => element.remove());

    // Set title
    if (title) {
      document.title = title;
    }

    // Set meta tags
    const setMetaTag = (name: string, content: string, isProperty?: boolean) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('description', resolvedDescription);
    setMetaTag('og:title', resolvedTitle, true);
    setMetaTag('og:description', resolvedDescription, true);
    setMetaTag('og:site_name', SITE_CONFIG.name, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:locale', 'de_DE', true);
    setMetaTag('og:image', resolvedImage, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', resolvedTitle);
    setMetaTag('twitter:description', resolvedDescription);
    setMetaTag('twitter:image', resolvedImage);

    if (url) {
      setMetaTag('og:url', url, true);
    }

    // Set canonical URL
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    }

    // Set schema.org markup
    const allSchemas = schemas ? schemas : schema ? [schema] : [];
    
    if (allSchemas.length > 0) {
      // Remove existing schema scripts
      const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
      existingSchemas.forEach((script) => {
        if (script.getAttribute('data-seo-schema') === 'true') {
          script.remove();
        }
      });

      // Add new schemas
      allSchemas.forEach((schemaData) => {
        const schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('data-seo-schema', 'true');
        schemaScript.textContent = JSON.stringify(schemaData);
        document.head.appendChild(schemaScript);
      });
    }
  }, [title, description, image, url, schema, schemas]);

  return null;
}
