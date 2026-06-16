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

// ⚡ Bolt Optimization:
// WeakMap caches expensive Regex evaluations for vehicle features.
// Eliminates redundant string concatenations and O(M) regex tests per render.
// Memory safe as it auto-garbage collects when the vehicle object is discarded.
const featureCache = new WeakMap<Vehicle, string[]>();

const deriveFeatures = (vehicle: Vehicle): string[] => {
  if (featureCache.has(vehicle)) {
    return featureCache.get(vehicle)!;
  }
  const source = `${vehicle.title} ${vehicle.description || ''}`;
  const fuel = vehicle.fuel?.trim().toLowerCase();
  const features = FEATURE_PATTERNS
    .filter(({ pattern }) => pattern.test(source))
    .map(({ label }) => label)
    .filter((label) => label.toLowerCase() !== fuel);
  featureCache.set(vehicle, features);
  return features;
};

export const getFeatureChips = (vehicle: Vehicle): string[] => deriveFeatures(vehicle).slice(0, 4);

export const getAllFeatures = (vehicle: Vehicle): string[] => deriveFeatures(vehicle);

const transmissionCache = new WeakMap<Vehicle, string | null>();

export const getTransmission = (vehicle: Vehicle): string | null => {
  if (transmissionCache.has(vehicle)) {
    return transmissionCache.get(vehicle)!;
  }
  const source = `${vehicle.title} ${vehicle.description || ''}`;
  const automatik = FEATURE_PATTERNS.find((f) => f.label === 'Automatik');
  const transmission = automatik && automatik.pattern.test(source) ? 'Automatik' : null;
  transmissionCache.set(vehicle, transmission);
  return transmission;
};
