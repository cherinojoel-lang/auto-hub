import React from "react";
import { Star, Quote, ExternalLink } from 'lucide-react';
import { featuredReviews, aggregateRating, trustFacts, type Review } from '@/data/reviewsData';

function formatGermanDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

function StarRating({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <div className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(value) ? 'fill-secondary text-secondary' : 'fill-none text-text-secondary/30'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

const SOURCE_LABELS: Record<Review['source'], string> = {
  'mobile.de': 'mobile.de',
  autoscout24: 'AutoScout24',
  google: 'Google',
};

function SourceBadge({ source }: { source: Review['source'] }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
      {SOURCE_LABELS[source]}
    </span>
  );
}

export default function TestimonialsSection() {
  const topReviews = React.useMemo(() => featuredReviews.slice(0, 6), []);
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-16 sm:py-20 md:py-24 bg-surface-muted"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">
            Geprüfte Qualität seit 1982
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary mb-6 max-w-3xl mx-auto"
          >
            {aggregateRating.reviewCount} öffentlich einsehbare Bewertungen.{' '}
            <span className="text-secondary">
              {aggregateRating.ratingValue.toFixed(2).replace('.', ',')} von 5 Sternen.
            </span>
          </h2>

          <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-4">
            <div className="flex items-center gap-2">
              <StarRating value={aggregateRating.ratingValue} size={22} />
              <span className="text-2xl font-bold text-foreground">
                {aggregateRating.ratingValue.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="text-sm text-text-secondary">
              Aus mobile.de und AutoScout24 zusammengeführt
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm bg-surface-elevated/50 p-4 rounded-full border border-border-line/50 inline-flex mx-auto">
            <span className="text-text-secondary font-medium mr-2">Profile einsehen:</span>
            {aggregateRating.bySource.map((s) => (
              <a
                key={s.source}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group"
                title={`Bewertungen auf ${SOURCE_LABELS[s.source]} ansehen`}
              >
                <SourceBadge source={s.source} />
                <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {s.rating.toFixed(1).replace('.', ',')}
                </span>
                <span className="opacity-70">({s.count})</span>
                <ExternalLink size={12} aria-hidden="true" className="opacity-50 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {[
            { value: '100 %', label: 'Weiterempfehlung' },
            { value: `${trustFacts.totalReviews}`, label: 'Bewertungen gesamt' },
            { value: `${trustFacts.yearsOnMobileDe}+ Jahre`, label: 'auf mobile.de' },
            { value: 'seit 1982', label: 'Inhabergeführt' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 bg-surface-elevated rounded-lg border border-border-line transition-all hover:border-secondary/30"
            >
              <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-text-secondary leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {topReviews.map((review) => (
            <article
              key={`${review.name}-${review.date}`}
              className="group relative bg-surface-elevated rounded-lg border border-border-line p-6 sm:p-7 card-premium"
            >
              <Quote
                size={28}
                className="absolute top-5 right-5 text-secondary/15 group-hover:text-secondary/30 transition-colors"
                aria-hidden="true"
              />
              <StarRating value={review.rating} size={14} />
              <blockquote className="mt-3 mb-5 text-foreground/90 leading-relaxed text-[15px]">
                „{review.text}"
              </blockquote>
              <div className="flex items-end justify-between pt-4 border-t border-border-line">
                <div>
                  <p className="font-bold text-foreground text-sm">{review.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {formatGermanDate(review.date)}
                    {review.verified && (
                      <span className="ml-2 text-success font-medium">· Verifizierter Kauf</span>
                    )}
                  </p>
                </div>
                <SourceBadge source={review.source} />
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-14">
          <a
            href={aggregateRating.bySource[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium-primary"
          >
            Bewertungen auf mobile.de lesen
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
