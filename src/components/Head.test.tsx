import { render } from '@testing-library/react';
import { Head } from './Head';

describe('Head component', () => {
  it('renders standard SEO meta tags', () => {
    const { container } = render(<Head />);

    // Title
    const title = container.querySelector('title');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe('Automobile Quick - Gebrauchtwagen in Iserlohn-Letmathe');

    // Charset and Viewport
    expect(container.querySelector('meta[charSet="UTF-8"]')).toBeInTheDocument();
    expect(container.querySelector('meta[name="viewport"]')).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');

    // Description & Keywords
    expect(container.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Hochwertige Gebrauchtwagen mit persönlicher Beratung. Automobile Quick - Ihr Autohaus seit 1982 in Iserlohn-Letmathe.'
    );
    expect(container.querySelector('meta[name="keywords"]')).toHaveAttribute(
      'content',
      'Gebrauchtwagen, Autohaus, Iserlohn, Letmathe, Automobile Quick, Fahrzeuge, Audi, BMW, Mercedes, VW'
    );
    expect(container.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
  });

  it('renders Open Graph (OG) tags', () => {
    const { container } = render(<Head />);

    expect(container.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Automobile Quick - Gebrauchtwagen in Iserlohn-Letmathe'
    );
    expect(container.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    expect(container.querySelector('meta[property="og:image"]')).toHaveAttribute('content', 'https://automobilequick.de/images/logo-og.png');
    expect(container.querySelector('meta[property="og:locale"]')).toHaveAttribute('content', 'de_DE');
  });

  it('renders Twitter Card tags', () => {
    const { container } = render(<Head />);

    expect(container.querySelector('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    expect(container.querySelector('meta[name="twitter:title"]')).toHaveAttribute('content', 'Automobile Quick - Gebrauchtwagen in Iserlohn-Letmathe');
    expect(container.querySelector('meta[name="twitter:image"]')).toHaveAttribute('content', 'https://automobilequick.de/images/logo-og.png');
  });

  it('renders canonical and alternate links', () => {
    const { container } = render(<Head />);

    expect(container.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://automobilequick.de/');
    expect(container.querySelector('link[rel="alternate"][hrefLang="de"]')).toHaveAttribute('href', 'https://automobilequick.de/');
    expect(container.querySelector('link[rel="alternate"][hrefLang="x-default"]')).toHaveAttribute('href', 'https://automobilequick.de/');
    expect(container.querySelector('link[rel="preconnect"]')).toHaveAttribute('href', 'https://fonts.googleapis.com');
  });
});
