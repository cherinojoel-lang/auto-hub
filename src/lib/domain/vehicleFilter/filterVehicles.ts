import type { Vehicle } from '@/data/vehiclesData.generated';
import type { FilterCriteria } from './schema';
import {
  matchesManufacturer,
  matchesPriceMax,
  matchesFuel,
  matchesMaxMileage,
  matchesYearFrom,
} from './predicates';

export const filterVehicles = (
  vehicles: ReadonlyArray<Vehicle>,
  criteria: FilterCriteria,
): Vehicle[] =>
  vehicles
    .filter((v) => v.status === 'available')
    .filter((v) => matchesManufacturer(v, criteria.manufacturer))
    .filter((v) => matchesPriceMax(v, criteria.priceMax))
    .filter((v) => matchesFuel(v, criteria.fuel))
    .filter((v) => matchesMaxMileage(v, criteria.maxMileage))
    .filter((v) => matchesYearFrom(v, criteria.yearFrom));
