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

/**
 * ⚡ Bolt Optimization: Cached Image Count
 * 💡 What: Replaced inline Set creation with WeakMap caching for `getVehicleImageCount`.
 * 🎯 Why: `getVehicleImageCount` was creating a new array and Set on every render for every visible vehicle.
 * 📊 Impact: Eliminates redundant array allocation and Set operations during React re-renders.
 * 🔬 Measurement: React Profiler will show reduced list rendering time in VehiclesPage.
 */
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

/**
 * ⚡ Bolt Optimization: Cached Transmission Parsing
 * 💡 What: Added WeakMap caching for `getTransmission`.
 * 🎯 Why: Regular expression execution via `pattern.test` was occurring repeatedly for the same vehicle across renders.
 * 📊 Impact: Prevents redundant regex evaluation for previously processed vehicle objects.
 * 🔬 Measurement: React Profiler will show reduced list rendering time in VehiclesPage.
 */
const transmissionCache = new WeakMap<Vehicle, string | null>();

export const getTransmission = (vehicle: Vehicle): string | null => {
  if (transmissionCache.has(vehicle)) {
    return transmissionCache.get(vehicle)!;
  }
  const source = `${vehicle.title} ${vehicle.description || ''}`;
  const automatik = FEATURE_PATTERNS.find((f) => f.label === 'Automatik');
  const result = automatik && automatik.pattern.test(source) ? 'Automatik' : null;
  transmissionCache.set(vehicle, result);
  return result;
};
