import type { Vehicle } from '@/data/vehiclesData.generated';

const available = (v: Vehicle) => v.status === 'available';

const uniqueSorted = (values: ReadonlyArray<string>): string[] =>
  Array.from(new Set(values.filter((v) => v !== ''))).sort((a, b) => a.localeCompare(b, 'de-DE'));

export const deriveManufacturerOptions = (vehicles: ReadonlyArray<Vehicle>): string[] =>
  uniqueSorted(vehicles.filter(available).map((v) => v.make));

export const deriveFuelOptions = (vehicles: ReadonlyArray<Vehicle>): string[] =>
  uniqueSorted(vehicles.filter(available).map((v) => v.fuel));
