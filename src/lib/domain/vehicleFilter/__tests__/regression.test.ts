import { describe, it, expect } from 'vitest';
import { vehiclesData } from '@/data/vehiclesData.generated';
import { filterVehicles } from '../filterVehicles';
import { FilterCriteriaSchema } from '../schema';
import baseline from './baseline-snapshot.json';

type SnapshotCase = {
  case: string;
  criteria: {
    manufacturer: string;
    priceMax: string;
    driveType: string;
    maxMileage: string;
    yearFrom: string;
  };
  ids: string[];
};

const snapshot = baseline.snapshot as SnapshotCase[];

describe('Regression vs. baseline snapshot', () => {
  for (const c of snapshot) {
    it(`case "${c.case}"`, () => {
      const criteria = FilterCriteriaSchema.parse({
        manufacturer: c.criteria.manufacturer,
        priceMax: c.criteria.priceMax,
        fuel: c.criteria.driveType,
        maxMileage: c.criteria.maxMileage,
        yearFrom: c.criteria.yearFrom,
      });
      const ids = filterVehicles(vehiclesData, criteria).map((v) => v.id);
      expect(ids.sort()).toEqual([...c.ids].sort());
    });
  }
});
