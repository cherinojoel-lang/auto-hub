import { describe, expect, it } from 'vitest';
import {
  LEAD_STATUSES,
  PUBLIC_REQUIRED_ROUTES,
  VEHICLE_STATUSES,
  canPublishVehicle,
} from './p0-contract';

describe('Automobile Quick P0 contract', () => {
  it('requires every purchase-relevant public route', () => {
    expect(PUBLIC_REQUIRED_ROUTES).toEqual([
      '/',
      '/fahrzeuge/',
      '/fahrzeuge/[slug]',
      '/ankauf',
      '/finanzierung',
      '/ueber-uns',
      '/kontakt',
      '/impressum',
      '/datenschutz',
    ]);
  });

  it('defines the complete lead lifecycle', () => {
    expect(LEAD_STATUSES).toEqual([
      'new',
      'contacted',
      'qualified',
      'appointment',
      'test_drive',
      'offer',
      'sold',
      'lost',
    ]);
  });

  it('defines all website vehicle lifecycle states', () => {
    expect(VEHICLE_STATUSES).toEqual([
      'available',
      'reserved',
      'sold',
      'hidden',
      'deleted',
    ]);
  });

  it('fails closed for preview or unverified inventory', () => {
    expect(
      canPublishVehicle({
        status: 'available',
        sourceAuthority: 'preview',
        parityVerified: true,
      }),
    ).toBe(false);

    expect(
      canPublishVehicle({
        status: 'available',
        sourceAuthority: 'verified',
        parityVerified: false,
      }),
    ).toBe(false);
  });

  it('allows only verified, parity-approved public states', () => {
    expect(
      canPublishVehicle({
        status: 'available',
        sourceAuthority: 'verified',
        parityVerified: true,
      }),
    ).toBe(true);

    expect(
      canPublishVehicle({
        status: 'reserved',
        sourceAuthority: 'verified',
        parityVerified: true,
      }),
    ).toBe(true);

    expect(
      canPublishVehicle({
        status: 'sold',
        sourceAuthority: 'verified',
        parityVerified: true,
      }),
    ).toBe(false);
  });
});
