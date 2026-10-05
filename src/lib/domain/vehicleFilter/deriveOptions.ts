import type { Vehicle } from '@/data/vehiclesData.generated';

const available = (v: Vehicle) => v.status === 'available';

const uniqueSortedSet = (set: Set<string>): string[] =>
  Array.from(set).sort((a, b) => a.localeCompare(b, 'de-DE'));

export const deriveManufacturerOptions = (vehicles: ReadonlyArray<Vehicle>): string[] => {
  // ⚡ Bolt: Single-pass collection to Set avoids 3 intermediate array allocations
  // from the previous chained filter().map() and internal uniqueSorted filter()
  const set = new Set<string>();
  for (const v of vehicles) {
    if (available(v) && v.make !== '') set.add(v.make);
  }
  return uniqueSortedSet(set);
};

export const deriveFuelOptions = (vehicles: ReadonlyArray<Vehicle>): string[] => {
  // ⚡ Bolt: Single-pass collection to Set avoids 3 intermediate array allocations
  // from the previous chained filter().map() and internal uniqueSorted filter()
  const set = new Set<string>();
  for (const v of vehicles) {
    if (available(v) && v.fuel !== '') set.add(v.fuel);
  }
  return uniqueSortedSet(set);
};
