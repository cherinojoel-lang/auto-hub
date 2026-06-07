import { useEffect } from 'react';
import { aggregateRating, featuredReviews } from '@/data/reviewsData';

export default function ReviewsSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'AutoDealer',
      name: 'Automobile Quick',
      url: 'https://automobilequick.de',
      telephone: '+49-2374-912912',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hagener Str. 126a',
        addressLocality: 'Iserlohn',
        postalCode: '58642',
        addressCountry: 'DE',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue.toFixed(2),
        reviewCount: aggregateRating.reviewCount,
        bestRating: aggregateRating.bestRating,
        worstRating: aggregateRating.worstRating,
      },
      review: featuredReviews.slice(0, 6).map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.name },
        datePublished: r.date,
        reviewBody: r.text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    };

    const existing = document.querySelector('script[data-schema="reviews"]');
    if (existing) existing.remove();
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.dataset.schema = 'reviews';
    tag.textContent = JSON.stringify(schema).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
    document.head.appendChild(tag);

    return () => {
      const el = document.querySelector('script[data-schema="reviews"]');
      if (el) el.remove();
    };
  }, []);

  return null;
}
