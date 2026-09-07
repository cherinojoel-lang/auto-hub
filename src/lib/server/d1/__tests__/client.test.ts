import { describe, it, expect, vi } from 'vitest';
import { D1Client } from '../client';
import type { D1Database } from '../types';

describe('D1Client', () => {
  const createMockDb = (results: unknown[] = [], firstResult: unknown = null) => {
    const mockStmt = {
      bind: vi.fn().mockReturnThis(),
      all: vi.fn().mockResolvedValue({ results, success: true }),
      first: vi.fn().mockResolvedValue(firstResult),
      run: vi.fn().mockResolvedValue({ success: true, meta: { changes: 1 } }),
    };

    const mockDb = {
      prepare: vi.fn().mockReturnValue(mockStmt),
      dump: vi.fn(),
      batch: vi.fn(),
      exec: vi.fn(),
    } as unknown as D1Database;

    return { mockDb, mockStmt };
  };

  it('queries vehicles with default AVAILABLE filter and sorting', async () => {
    const mockVehicles = [
      { id: 'v1', make: 'Audi', model: 'A4', price_eur: 15000, status: 'AVAILABLE' },
    ];
    const { mockDb, mockStmt } = createMockDb(mockVehicles);
    const client = new D1Client(mockDb);

    const vehicles = await client.listVehicles();

    expect(mockDb.prepare).toHaveBeenCalledWith(
      expect.stringContaining('SELECT * FROM vehicles WHERE 1=1 AND status = ? ORDER BY price_eur ASC')
    );
    expect(mockStmt.bind).toHaveBeenCalledWith('AVAILABLE');
    expect(vehicles).toEqual(mockVehicles);
  });

  it('applies make, fuel_type, and max_price filters when provided', async () => {
    const { mockDb, mockStmt } = createMockDb([]);
    const client = new D1Client(mockDb);

    await client.listVehicles({
      make: 'Volkswagen',
      fuel_type: 'Benzin',
      max_price: 20000,
      limit: 10,
      offset: 0,
    });

    expect(mockDb.prepare).toHaveBeenCalledWith(
      expect.stringContaining('AND make = ? AND fuel_type = ? AND price_eur <= ?')
    );
    expect(mockStmt.bind).toHaveBeenCalledWith(
      'AVAILABLE',
      'Volkswagen',
      'Benzin',
      20000,
      10,
      0
    );
  });

  it('fetches single vehicle by id', async () => {
    const mockVehicle = { id: 'v-123', make: 'BMW', model: '320d' };
    const { mockDb, mockStmt } = createMockDb([], mockVehicle);
    const client = new D1Client(mockDb);

    const result = await client.getVehicleById('v-123');

    expect(mockDb.prepare).toHaveBeenCalledWith('SELECT * FROM vehicles WHERE id = ?');
    expect(mockStmt.bind).toHaveBeenCalledWith('v-123');
    expect(result).toEqual(mockVehicle);
  });

  it('inserts lead inquiry and returns the generated UUID', async () => {
    const { mockDb, mockStmt } = createMockDb();
    const client = new D1Client(mockDb);

    const leadId = await client.insertLeadInquiry({
      inquiry_type: 'GENERAL',
      customer_name: 'Max Mustermann',
      customer_email: 'max@example.de',
      message: 'Interesse an Probefahrt',
      turnstile_verified: true,
    });

    expect(typeof leadId).toBe('string');
    expect(mockDb.prepare).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO lead_inquiries')
    );
    expect(mockStmt.bind).toHaveBeenCalledWith(
      leadId,
      null,
      'GENERAL',
      'Max Mustermann',
      'max@example.de',
      null,
      'Interesse an Probefahrt',
      1,
      'NEW'
    );
    expect(mockStmt.run).toHaveBeenCalled();
  });
});
