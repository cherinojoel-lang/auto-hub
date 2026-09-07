export interface D1VehicleRow {
  id: string;
  make: string;
  model: string;
  version: string | null;
  mileage: number;
  first_registration: string;
  fuel_type: string;
  transmission: string;
  power_hp: number;
  price_eur: number;
  vat_deductible: number;
  status: string;
  mobile_de_url: string | null;
  autoscout24_url: string | null;
  description: string | null;
  features: string | null;
  hero_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface D1VehicleImageRow {
  id: string;
  vehicle_id: string;
  image_url: string;
  thumbnail_url: string | null;
  display_order: number;
  is_hero: number;
  alt_text: string | null;
  created_at: string;
}

export interface D1CustomerReviewRow {
  id: string;
  author_name: string;
  source: string;
  rating: number;
  review_text: string;
  review_date: string;
  verified: number;
  is_featured: number;
  created_at: string;
}

export interface D1LeadInquiryRow {
  id: string;
  vehicle_id: string | null;
  inquiry_type: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  message: string | null;
  turnstile_verified: number;
  status: string;
  created_at: string;
}

export interface LeadInquiryInsert {
  id?: string;
  vehicle_id?: string | null;
  inquiry_type: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  message?: string | null;
  turnstile_verified?: boolean;
}

export interface VehicleQueryFilter {
  make?: string;
  fuel_type?: string;
  max_price?: number;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  error?: string;
  meta?: Record<string, unknown>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run<T = unknown>(): Promise<D1Result<T>>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<{ count: number; duration: number }>;
}

