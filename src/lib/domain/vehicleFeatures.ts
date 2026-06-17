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

const imageCountCache = new WeakMap<Vehicle, number>();

export const getVehicleImageCount = (vehicle: Vehicle): number => {
  if (imageCountCache.has(vehicle)) {
    return imageCountCache.get(vehicle)!;
  }
  const images = [vehicle.mainImage, ...(vehicle.gallery || [])].filter(Boolean);
  const count = new Set(images).size;
  imageCountCache.set(vehicle, count);
  return count;
};

const featureCache = new WeakMap<Vehicle, string[]>();

const deriveFeatures = (vehicle: Vehicle): string[] => {
  if (featureCache.has(vehicle)) {
    return featureCache.get(vehicle)!;
  }
  const source = `${vehicle.title} ${vehicle.description || ''}`;
  const fuel = vehicle.fuel?.trim().toLowerCase();

  // Combine filters and map into a single pass loop using logic from previous rules
  const features: string[] = [];
  for (const { label, pattern } of FEATURE_PATTERNS) {
    if (pattern.test(source) && label.toLowerCase() !== fuel) {
      features.push(label);
    }
  }

  featureCache.set(vehicle, features);
  return features;
};

export const getFeatureChips = (vehicle: Vehicle): string[] => deriveFeatures(vehicle).slice(0, 4);

export const getAllFeatures = (vehicle: Vehicle): string[] => deriveFeatures(vehicle);

export const getTransmission = (vehicle: Vehicle): string | null => {
  const source = `${vehicle.title} ${vehicle.description || ''}`;
  const automatik = FEATURE_PATTERNS.find((f) => f.label === 'Automatik');
  return automatik && automatik.pattern.test(source) ? 'Automatik' : null;
};
