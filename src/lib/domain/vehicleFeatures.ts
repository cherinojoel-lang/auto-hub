import type { Vehicle } from '@/data/vehiclesData.generated';

export const FEATURE_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: 'Navi', pattern: /\bnavi|navigation/i },
  { label: 'Kamera', pattern: /kamera|rueckfahr|rückfahr/i },
  { label: 'LED', pattern: /\bled\b/i },
  { label: 'PDC', pattern: /\bpdc\b|parktronic|parksensor/i },
  { label: '1. Hand', pattern: /1\.\s*hd|1\.\s*hand|erste hand/i },
  { label: 'Alu', pattern: /\balu\b|alufelgen/i },
  { label: 'Automatik', pattern: /automatik|dsg|steptronic/i },
  { label: 'Klima', pattern: /klima|climatronic/i },
  { label: 'Hybrid', pattern: /hybrid/i },
];

export const getVehicleImageCount = (vehicle: Vehicle): number => {
  const images = [vehicle.mainImage, ...(vehicle.gallery || [])].filter(Boolean);
  return new Set(images).size;
};

export const getFeatureChips = (vehicle: Vehicle): string[] => {
  const source = `${vehicle.title} ${vehicle.description || ''}`;
  const fuel = vehicle.fuel?.trim().toLowerCase();
  return FEATURE_PATTERNS
    .filter(({ pattern }) => pattern.test(source))
    .map(({ label }) => label)
    .filter((label) => label.toLowerCase() !== fuel)
    .slice(0, 4);
};
