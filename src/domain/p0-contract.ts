export const PUBLIC_REQUIRED_ROUTES = [
  '/',
  '/fahrzeuge/',
  '/fahrzeuge/[slug]',
  '/ankauf',
  '/finanzierung',
  '/ueber-uns',
  '/kontakt',
  '/impressum',
  '/datenschutz',
] as const;

export const LEAD_STATUSES = [
  'new',
  'contacted',
  'qualified',
  'appointment',
  'test_drive',
  'offer',
  'sold',
  'lost',
] as const;

export const VEHICLE_STATUSES = [
  'available',
  'reserved',
  'sold',
  'hidden',
  'deleted',
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type VehicleStatus = (typeof VEHICLE_STATUSES)[number];
export type SourceAuthority = 'preview' | 'verified';

export type PublishableVehicleGate = {
  status: VehicleStatus;
  sourceAuthority: SourceAuthority;
  parityVerified: boolean;
};

export function canPublishVehicle(vehicle: PublishableVehicleGate): boolean {
  if (vehicle.sourceAuthority !== 'verified' || !vehicle.parityVerified) {
    return false;
  }

  return vehicle.status === 'available' || vehicle.status === 'reserved';
}
