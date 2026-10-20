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

// ⚡ Bolt: Cache image count computation to prevent redundant array/Set allocations in render loops
const imageCountCache = new WeakMap<Vehicle, number>();

export const getVehicleImageCount = (vehicle: Vehicle): number => {
  if (imageCountCache.has(vehicle)) {
    return imageCountCache.get(vehicle)!;
  }
  const images = [vehicle.mainImage, ...(vehicle.gallery || [])].filter(Boolean);
  const result = new Set(images).size;
  imageCountCache.set(vehicle, result);
  return result;
};

const featuresCache = new WeakMap<Vehicle, string[]>();

const deriveFeatures = (vehicle: Vehicle): string[] => {
  if (featuresCache.has(vehicle)) {
    return featuresCache.get(vehicle)!;
  }
  const source = `${vehicle.title} ${vehicle.description || ''}`;
  const fuel = vehicle.fuel?.trim().toLowerCase();
  const features = FEATURE_PATTERNS
    .filter(({ pattern }) => pattern.test(source))
    .map(({ label }) => label)
    .filter((label) => label.toLowerCase() !== fuel);

  featuresCache.set(vehicle, features);
  return features;
};

export const getFeatureChips = (vehicle: Vehicle): string[] => deriveFeatures(vehicle).slice(0, 4);

export const getAllFeatures = (vehicle: Vehicle): string[] => deriveFeatures(vehicle);

// ⚡ Bolt: Cache regex execution to prevent unnecessary CPU cycles during component list iterations
const transmissionCache = new WeakMap<Vehicle, string | null>();

export const getTransmission = (vehicle: Vehicle): string | null => {
  if (transmissionCache.has(vehicle)) {
    return transmissionCache.get(vehicle) as string | null;
  }
  const source = `${vehicle.title} ${vehicle.description || ''}`;
  const automatik = FEATURE_PATTERNS.find((f) => f.label === 'Automatik');
  const result = automatik && automatik.pattern.test(source) ? 'Automatik' : null;
  transmissionCache.set(vehicle, result);
  return result;
};
