export type ReviewSource = 'mobile.de' | 'autoscout24' | 'google';

export interface Review {
  name: string;
  date: string;
  rating: 5;
  text: string;
  source: ReviewSource;
  sourceUrl: string;
  verified: boolean;
}

export interface AggregateRatingData {
  ratingValue: number;
  reviewCount: number;
  bestRating: 5;
  worstRating: 1;
  bySource: Array<{
    source: ReviewSource;
    rating: number;
    count: number;
    url: string;
  }>;
}

export const aggregateRating: AggregateRatingData = {
  ratingValue: 4.98,
  reviewCount: 204,
  bestRating: 5,
  worstRating: 1,
  bySource: [
    {
      source: 'mobile.de',
      rating: 5.0,
      count: 157,
      url: 'https://www.mobile.de/bewertungen/AUTOMOBILE-QUICK',
    },
    {
      source: 'autoscout24',
      rating: 4.9,
      count: 47,
      url: 'https://www.autoscout24.de/haendler/automobile-quick/bewertungen',
    },
  ],
};

export const featuredReviews: Review[] = [
  {
    name: 'Heike aus Kalkar',
    date: '2026-05-06',
    rating: 5,
    text: 'Alles war vorbildlich und top organisiert!',
    source: 'mobile.de',
    sourceUrl: 'https://www.mobile.de/bewertungen/AUTOMOBILE-QUICK',
    verified: true,
  },
  {
    name: 'Thomas',
    date: '2026-01-18',
    rating: 5,
    text: 'Sehr zuverlässig, ehrlich, freundlich, korrekt, unbedingt zu empfehlen.',
    source: 'mobile.de',
    sourceUrl: 'https://www.mobile.de/bewertungen/AUTOMOBILE-QUICK',
    verified: true,
  },
  {
    name: 'Detlef Wennemann',
    date: '2025-09-04',
    rating: 5,
    text: 'Ich bin sehr zufrieden. Hier stimmt alles! Von Anfrage bis Übergabe wurde ich immer freundlich und kompetent begleitet. Hier macht der Autokauf Spaß.',
    source: 'mobile.de',
    sourceUrl: 'https://www.mobile.de/bewertungen/AUTOMOBILE-QUICK',
    verified: true,
  },
  {
    name: 'Marc',
    date: '2025-08-05',
    rating: 5,
    text: 'Seit Tag 1 hat man ein positives Gefühl. Der Verkäufer ist immer erreichbar, wenn man Fragen hat. Fahrzeug wurde wie besprochen in top Zustand übergeben. Bei dem Händler immer wieder gerne.',
    source: 'mobile.de',
    sourceUrl: 'https://www.mobile.de/bewertungen/AUTOMOBILE-QUICK',
    verified: true,
  },
  {
    name: 'Nikolaos Tsormpatzidis',
    date: '2025-08-02',
    rating: 5,
    text: 'Von Anfang bis Ende, einfach alles top! Telefonat, Beratung und Erklärung. Und vor allem die Ehrlichkeit.',
    source: 'mobile.de',
    sourceUrl: 'https://www.mobile.de/bewertungen/AUTOMOBILE-QUICK',
    verified: true,
  },
  {
    name: 'Steven Pütz',
    date: '2025-07-18',
    rating: 5,
    text: 'Freundlich, kompetent und sehr hilfsbereit. Sehr faire Preise.',
    source: 'mobile.de',
    sourceUrl: 'https://www.mobile.de/bewertungen/AUTOMOBILE-QUICK',
    verified: true,
  },
  {
    name: 'Davide Sarale',
    date: '2025-07-08',
    rating: 5,
    text: 'Er ist fair, aufrichtig, freundlich und kompetent. Der Kauf ist ohne Probleme verlaufen. Wir können Automobile Quick zu 100 % weiterempfehlen.',
    source: 'autoscout24',
    sourceUrl: 'https://www.autoscout24.de/haendler/automobile-quick/bewertungen',
    verified: true,
  },
  {
    name: 'Kevin',
    date: '2024-10-14',
    rating: 5,
    text: 'Super freundlich und hilfsbereit.',
    source: 'mobile.de',
    sourceUrl: 'https://www.mobile.de/bewertungen/AUTOMOBILE-QUICK',
    verified: true,
  },
];

export const trustFacts = {
  founded: 1982,
  yearsOnMobileDe: new Date().getFullYear() - 2000,
  totalReviews: 204,
  recommendationRate: 100,
  vehicleAsDescribedRate: 100,
  ownerName: 'Konstantinos Pappas',
} as const;
