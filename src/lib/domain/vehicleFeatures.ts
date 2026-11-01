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
 * 💡 What: Cached image count using WeakMap.
 * 🎯 Why: Avoids re-computing set size on every render for grid components.
 * 📊 Impact: O(1) retrieval time after first computation.
 * 🔬 Measurement: Observe React Profiler during scrolling the vehicle list.
 */
const imageCountCache = new WeakMap<Vehicle, number>();

export const getVehicleImageCount = (vehicle: Vehicle): number => {
  const cachedCount = imageCountCache.get(vehicle);
  if (cachedCount !== undefined) {
    return cachedCount;
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
 * 💡 What: Cached transmission parsing using WeakMap.
 * 🎯 Why: Avoids regex tests on long strings for every list item during rendering/sorting.
 * 📊 Impact: O(1) lookup after first computation instead of regex evaluation.
 * 🔬 Measurement: Measure time spent in getTransmission during VehiclesPage rendering.
 */
const transmissionCache = new WeakMap<Vehicle, string | null>();

export const getTransmission = (vehicle: Vehicle): string | null => {
  const cachedTransmission = transmissionCache.get(vehicle);
  if (cachedTransmission !== undefined) {
    return cachedTransmission;
  }
  const source = `${vehicle.title} ${vehicle.description || ''}`;
  const automatik = FEATURE_PATTERNS.find((f) => f.label === 'Automatik');
  const result = automatik && automatik.pattern.test(source) ? 'Automatik' : null;
  transmissionCache.set(vehicle, result);
  return result;
};
