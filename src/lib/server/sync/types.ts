import type { D1VehicleRow } from '../d1/types';

export interface ExternalVehicleSyncPayload {
  externalId: string;
  platform: 'mobile_de' | 'autoscout24';
  make: string;
  model: string;
  price: number;
  mileage: number;
  firstRegistration: string;
  fuelType: string;
  powerHp: number;
  deepLink: string;
  lastSyncedAt: string;
}

export function mapD1ToExternalSync(vehicle: D1VehicleRow, platform: 'mobile_de' | 'autoscout24'): ExternalVehicleSyncPayload {
  const deepLink = platform === 'mobile_de' 
    ? (vehicle.mobile_de_url ?? `https://home.mobile.de/AUTOMOBILEQUICK#des_${vehicle.id}`)
    : (vehicle.autoscout24_url ?? `https://www.autoscout24.de/haendler/automobile-quick/fahrzeuge/${vehicle.id}`);

  return {
    externalId: vehicle.id,
    platform,
    make: vehicle.make,
    model: vehicle.model,
    price: vehicle.price_eur,
    mileage: vehicle.mileage,
    firstRegistration: vehicle.first_registration,
    fuelType: vehicle.fuel_type,
    powerHp: vehicle.power_hp,
    deepLink,
    lastSyncedAt: new Date().toISOString(),
  };
}
