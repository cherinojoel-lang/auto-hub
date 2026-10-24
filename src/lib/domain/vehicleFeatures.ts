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
 * Gets the transmission type for a vehicle.
 *
 * @optimization
 * - What: Reuses the memoized `deriveFeatures` function instead of recalculating regex on raw strings.
 * - Why: The previous implementation performed duplicate string concatenations and regex test evaluations for every rendered vehicle card.
 * - Impact: O(1) cache lookup for transmission instead of O(N) regex evaluations (where N is the length of title + description). Reduces CPU usage during listing renders.
 * - Measurement: Render time of VehiclesPage with hundreds of items should decrease by avoiding redundant string/regex operations.
 */
export const getTransmission = (vehicle: Vehicle): string | null => {
  return deriveFeatures(vehicle).includes('Automatik') ? 'Automatik' : null;
};
