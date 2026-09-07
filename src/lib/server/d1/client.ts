import type {
  D1CustomerReviewRow,
  D1Database,
  D1VehicleImageRow,
  D1VehicleRow,
  LeadInquiryInsert,
  VehicleQueryFilter,
} from './types';

export class D1Client {
  constructor(private db: D1Database) {}

  async listVehicles(filter: VehicleQueryFilter = {}): Promise<D1VehicleRow[]> {
    let sql = 'SELECT * FROM vehicles WHERE 1=1';
    const params: unknown[] = [];

    if (filter.status) {
      sql += ' AND status = ?';
      params.push(filter.status);
    } else {
      sql += ' AND status = ?';
      params.push('AVAILABLE');
    }

    if (filter.make) {
      sql += ' AND make = ?';
      params.push(filter.make);
    }

    if (filter.fuel_type) {
      sql += ' AND fuel_type = ?';
      params.push(filter.fuel_type);
    }

    if (filter.max_price !== undefined) {
      sql += ' AND price_eur <= ?';
      params.push(filter.max_price);
    }

    sql += ' ORDER BY price_eur ASC';

    if (filter.limit !== undefined) {
      sql += ' LIMIT ?';
      params.push(filter.limit);
      if (filter.offset !== undefined) {
        sql += ' OFFSET ?';
        params.push(filter.offset);
      }
    }

    const stmt = this.db.prepare(sql).bind(...params);
    const result = await stmt.all<D1VehicleRow>();
    return result.results ?? [];
  }

  async getVehicleById(id: string): Promise<D1VehicleRow | null> {
    const stmt = this.db.prepare('SELECT * FROM vehicles WHERE id = ?').bind(id);
    const vehicle = await stmt.first<D1VehicleRow>();
    return vehicle ?? null;
  }

  async getVehicleImages(vehicleId: string): Promise<D1VehicleImageRow[]> {
    const stmt = this.db
      .prepare('SELECT * FROM vehicle_images WHERE vehicle_id = ? ORDER BY display_order ASC')
      .bind(vehicleId);
    const result = await stmt.all<D1VehicleImageRow>();
    return result.results ?? [];
  }

  async insertLeadInquiry(lead: LeadInquiryInsert): Promise<string> {
    const id = lead.id ?? crypto.randomUUID();
    const stmt = this.db
      .prepare(
        `INSERT INTO lead_inquiries (
          id, vehicle_id, inquiry_type, customer_name, customer_email, customer_phone, message, turnstile_verified, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id,
        lead.vehicle_id ?? null,
        lead.inquiry_type,
        lead.customer_name,
        lead.customer_email,
        lead.customer_phone ?? null,
        lead.message ?? null,
        lead.turnstile_verified ? 1 : 0,
        'NEW'
      );

    await stmt.run();
    return id;
  }

  async getFeaturedReviews(limit = 10): Promise<D1CustomerReviewRow[]> {
    const stmt = this.db
      .prepare('SELECT * FROM customer_reviews WHERE is_featured = 1 ORDER BY rating DESC LIMIT ?')
      .bind(limit);
    const result = await stmt.all<D1CustomerReviewRow>();
    return result.results ?? [];
  }
}
