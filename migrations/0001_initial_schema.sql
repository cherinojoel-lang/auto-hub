-- D1 Migration: 0001_initial_schema.sql
-- Project: Automobile Quick Edge Data Foundation

CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  version TEXT,
  mileage INTEGER NOT NULL,
  first_registration TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  transmission TEXT NOT NULL,
  power_hp INTEGER NOT NULL,
  price_eur INTEGER NOT NULL,
  vat_deductible INTEGER DEFAULT 0,
  status TEXT DEFAULT 'AVAILABLE',
  mobile_de_url TEXT,
  autoscout24_url TEXT,
  description TEXT,
  features TEXT,
  hero_image_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(price_eur);

CREATE TABLE IF NOT EXISTS vehicle_images (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_hero INTEGER DEFAULT 0,
  alt_text TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle_id ON vehicle_images(vehicle_id);

CREATE TABLE IF NOT EXISTS customer_reviews (
  id TEXT PRIMARY KEY,
  author_name TEXT NOT NULL,
  source TEXT NOT NULL,
  rating REAL NOT NULL,
  review_text TEXT NOT NULL,
  review_date TEXT NOT NULL,
  verified INTEGER DEFAULT 1,
  is_featured INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_customer_reviews_featured ON customer_reviews(is_featured);

CREATE TABLE IF NOT EXISTS lead_inquiries (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT REFERENCES vehicles(id),
  inquiry_type TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  message TEXT,
  turnstile_verified INTEGER DEFAULT 0,
  status TEXT DEFAULT 'NEW',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lead_inquiries_status ON lead_inquiries(status);
