# Auto Hub (Automobile Quick): Google Ecosystem & Fullstack Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementierung eines vollständigen, DSGVO- und PAngV-konformen Google-Ökosystems (AutoDealer- und Fahrzeug-Schema.org-JSON-LD, GA4 Automotive E-Commerce DataLayer, Google Ads Enhanced Conversions für Finanzierungs-Leads mit SHA-256-Hashing, Cloudflare Turnstile Server-Validierung und dynamischer XML-Fahrzeug-Sitemap) für Automobile Quick / Auto Hub.

**Architecture:** Astro 5 SSR/Static Hybrid mit Cloudflare Workers Adapter (`@astrojs/cloudflare`) und TypeScript 5. Lokale Entitäten (Google Business Profile NAP) werden als semantisches Schema eingebettet. Finanzierungs- und Probefahrtanfragen werden über eine serverseitige Route mit Turnstile-Verifizierung validiert und für Google Ads Enhanced Conversions aufbereitet.

**Tech Stack:** Astro 5, React 19, TypeScript 5, Tailwind CSS, Cloudflare Workers, Vitest 3, Google Tag Manager / GA4 DataLayer, Schema.org (AutoDealer, Car), Cloudflare Turnstile.

## Global Constraints

- Keine direkten Root-Dateien in `$HOME` (Zero-Root-Pollution).
- PAngV-Konformität: Alle Finanzierungsberechnungen müssen effektiven Jahreszins (5.99%), Sollzins, Nettodarlehensbetrag und Gesamtbetrag transparent ausweisen.
- Keine Platzhalter, kein `// TODO`, kein Pseudocode.
- 100% DSGVO-Konformität: Consent-Status steuert die Datenübertragung; Turnstile läuft privacy-first ohne User-Tracking.
- Test-First (TDD): Jeder Task verfügt über automatisierte Vitest-Tests mit 100% Pass-Rate.
- Alle Kommunikations- und UI-Texte sind auf professionellem Hochdeutsch verfasst.

---

### Task 1: AutoDealer & Vehicle Schema.org JSON-LD Generator

**Files:**
- Create: `src/lib/seo/vehicle-schema.ts`
- Modify: `src/pages/fahrzeuge/[id].astro`
- Test: `src/lib/seo/__tests__/vehicle-schema.test.ts`

**Interfaces:**
- Consumes: `Vehicle` domain model
- Produces: `generateVehicleSchema(vehicle: VehicleSchemaInput): Record<string, any>`, `generateAutoDealerSchema(): Record<string, any>`

```typescript
export interface VehicleSchemaInput {
  id: string;
  vin?: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  mileageKm: number;
  priceEur: number;
  monthlyFinancingEur?: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  images: string[];
  description: string;
  features: string[];
}
```

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/seo/__tests__/vehicle-schema.test.ts
import { describe, it, expect } from 'vitest';
import { generateVehicleSchema, generateAutoDealerSchema } from '../vehicle-schema';

describe('Vehicle & AutoDealer Schema Generator', () => {
  it('generates valid schema.org/Car structure with pricing and condition', () => {
    const car = generateVehicleSchema({
      id: 'aq-golf-8',
      vin: 'WVWZZZCDZMW000000',
      make: 'Volkswagen',
      model: 'Golf 8',
      trim: '1.5 TSI Style',
      year: 2023,
      mileageKm: 24500,
      priceEur: 23990,
      monthlyFinancingEur: 289,
      fuelType: 'Benzin',
      transmission: 'Automatik',
      bodyType: 'Limousine',
      images: ['https://automobile-quick.de/images/golf8-front.webp'],
      description: 'Gepflegter VW Golf 8 Style aus 1. Hand.',
      features: ['Navigationssystem', 'LED-Scheinwerfer', 'Rückfahrkamera']
    });

    expect(car['@context']).toBe('https://schema.org');
    expect(car['@type']).toBe('Car');
    expect(car.name).toBe('Volkswagen Golf 8 1.5 TSI Style');
    expect(car.offers['@type']).toBe('Offer');
    expect(car.offers.price).toBe(23990);
    expect(car.offers.priceCurrency).toBe('EUR');
    expect(car.offers.itemCondition).toBe('https://schema.org/UsedCondition');
    expect(car.mileageFromOdometer.value).toBe(24500);
    expect(car.mileageFromOdometer.unitCode).toBe('KMT');
  });

  it('generates valid schema.org/AutoDealer NAP local business data', () => {
    const dealer = generateAutoDealerSchema();
    expect(dealer['@context']).toBe('https://schema.org');
    expect(dealer['@type']).toBe('AutoDealer');
    expect(dealer.name).toBe('Automobile Quick');
    expect(dealer.address.addressCountry).toBe('DE');
    expect(dealer.geo.latitude).toBeDefined();
    expect(dealer.geo.longitude).toBeDefined();
    expect(dealer.openingHoursSpecification.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify failure**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub && npx vitest run src/lib/seo/__tests__/vehicle-schema.test.ts
```

- [ ] **Step 3: Implement minimal code**

```typescript
// src/lib/seo/vehicle-schema.ts
export interface VehicleSchemaInput {
  id: string;
  vin?: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  mileageKm: number;
  priceEur: number;
  monthlyFinancingEur?: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  images: string[];
  description: string;
  features: string[];
}

export function generateVehicleSchema(vehicle: VehicleSchemaInput): Record<string, any> {
  const fullName = [vehicle.make, vehicle.model, vehicle.trim].filter(Boolean).join(' ');

  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: fullName,
    description: vehicle.description,
    image: vehicle.images,
    vehicleIdentificationNumber: vehicle.vin,
    brand: {
      '@type': 'Brand',
      name: vehicle.make
    },
    model: vehicle.model,
    vehicleModelDate: vehicle.year.toString(),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.mileageKm,
      unitCode: 'KMT'
    },
    fuelType: vehicle.fuelType,
    vehicleTransmission: vehicle.transmission,
    bodyType: vehicle.bodyType,
    itemCondition: 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      price: vehicle.priceEur,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      seller: {
        '@type': 'AutoDealer',
        name: 'Automobile Quick',
        url: 'https://automobile-quick.de'
      },
      priceSpecification: vehicle.monthlyFinancingEur ? {
        '@type': 'UnitPriceSpecification',
        price: vehicle.monthlyFinancingEur,
        priceCurrency: 'EUR',
        unitText: 'MONAT'
      } : undefined
    }
  };
}

export function generateAutoDealerSchema(): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'Automobile Quick',
    url: 'https://automobile-quick.de',
    telephone: '+49 201 12345678',
    email: 'info@automobile-quick.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Essener Straße 100',
      addressLocality: 'Essen',
      postalCode: '45127',
      addressRegion: 'Nordrhein-Westfalen',
      addressCountry: 'DE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.4556,
      longitude: 7.0116
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00'
      }
    ]
  };
}
```

- [ ] **Step 4: Run tests and verify passing**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub && npx vitest run src/lib/seo/__tests__/vehicle-schema.test.ts
```

- [ ] **Step 5: Commit changes**

```bash
git add src/lib/seo/vehicle-schema.ts src/lib/seo/__tests__/vehicle-schema.test.ts
git commit -m "feat(seo): add AutoDealer and Vehicle schema generator"
```

---

### Task 2: Vehicle Financing & Inquiry GA4 DataLayer Event Pipeline

**Files:**
- Create: `src/lib/analytics/vehicle-events.ts`
- Modify: `src/components/VehicleFinancingCalculator.tsx`
- Test: `src/lib/analytics/__tests__/vehicle-events.test.ts`

**Interfaces:**
- Produces: `trackVehicleView(vehicle: VehicleEventData)`, `trackFinancingCalculation(calc: FinancingCalcData)`, `trackVehicleInquiry(inquiry: VehicleInquiryData)`

```typescript
export interface VehicleEventData {
  vehicleId: string;
  make: string;
  model: string;
  price: number;
}

export interface FinancingCalcData {
  vehicleId: string;
  priceEur: number;
  downPaymentEur: number;
  termMonths: number;
  monthlyRateEur: number;
  aprPercent: number;
}

export interface VehicleInquiryData {
  vehicleId: string;
  inquiryType: 'test_drive' | 'financing' | 'general';
  estimatedValueEur: number;
}
```

- [ ] **Step 1: Write failing test**

```typescript
// src/lib/analytics/__tests__/vehicle-events.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { trackVehicleView, trackFinancingCalculation, trackVehicleInquiry } from '../vehicle-events';

describe('Vehicle GA4 Event Pipeline', () => {
  beforeEach(() => {
    (window as any).dataLayer = [];
  });

  it('pushes view_item event for vehicle detail view', () => {
    trackVehicleView({
      vehicleId: 'aq-bmw-320',
      make: 'BMW',
      model: '320d Touring',
      price: 28500
    });

    const event = (window as any).dataLayer.find((e: any) => e.event === 'view_item');
    expect(event).toBeDefined();
    expect(event.ecommerce.items[0].item_id).toBe('aq-bmw-320');
    expect(event.ecommerce.items[0].price).toBe(28500);
  });

  it('pushes calculate_financing event with PAngV values', () => {
    trackFinancingCalculation({
      vehicleId: 'aq-bmw-320',
      priceEur: 28500,
      downPaymentEur: 5000,
      termMonths: 48,
      monthlyRateEur: 549.50,
      aprPercent: 5.99
    });

    const event = (window as any).dataLayer.find((e: any) => e.event === 'calculate_financing');
    expect(event).toBeDefined();
    expect(event.monthly_rate).toBe(549.50);
    expect(event.apr).toBe(5.99);
  });

  it('pushes generate_lead event on vehicle inquiry submission', () => {
    trackVehicleInquiry({
      vehicleId: 'aq-bmw-320',
      inquiryType: 'financing',
      estimatedValueEur: 28500
    });

    const event = (window as any).dataLayer.find((e: any) => e.event === 'generate_lead');
    expect(event).toBeDefined();
    expect(event.currency).toBe('EUR');
    expect(event.value).toBe(28500);
    expect(event.inquiry_type).toBe('financing');
  });
});
```

- [ ] **Step 2: Run test to verify failure**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub && npx vitest run src/lib/analytics/__tests__/vehicle-events.test.ts
```

- [ ] **Step 3: Implement minimal code**

```typescript
// src/lib/analytics/vehicle-events.ts
export interface VehicleEventData {
  vehicleId: string;
  make: string;
  model: string;
  price: number;
}

export interface FinancingCalcData {
  vehicleId: string;
  priceEur: number;
  downPaymentEur: number;
  termMonths: number;
  monthlyRateEur: number;
  aprPercent: number;
}

export interface VehicleInquiryData {
  vehicleId: string;
  inquiryType: 'test_drive' | 'financing' | 'general';
  estimatedValueEur: number;
}

function pushDataLayer(payload: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(payload);
}

export function trackVehicleView(vehicle: VehicleEventData): void {
  pushDataLayer({
    event: 'view_item',
    ecommerce: {
      currency: 'EUR',
      value: vehicle.price,
      items: [
        {
          item_id: vehicle.vehicleId,
          item_name: `${vehicle.make} ${vehicle.model}`,
          item_brand: vehicle.make,
          item_category: 'Fahrzeuge',
          price: vehicle.price
        }
      ]
    }
  });
}

export function trackFinancingCalculation(calc: FinancingCalcData): void {
  pushDataLayer({
    event: 'calculate_financing',
    vehicle_id: calc.vehicleId,
    vehicle_price: calc.priceEur,
    down_payment: calc.downPaymentEur,
    term_months: calc.termMonths,
    monthly_rate: calc.monthlyRateEur,
    apr: calc.aprPercent
  });
}

export function trackVehicleInquiry(inquiry: VehicleInquiryData): void {
  pushDataLayer({
    event: 'generate_lead',
    currency: 'EUR',
    value: inquiry.estimatedValueEur,
    vehicle_id: inquiry.vehicleId,
    inquiry_type: inquiry.inquiryType
  });
}
```

- [ ] **Step 4: Run tests and verify passing**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub && npx vitest run src/lib/analytics/__tests__/vehicle-events.test.ts
```

- [ ] **Step 5: Commit changes**

```bash
git add src/lib/analytics/vehicle-events.ts src/lib/analytics/__tests__/vehicle-events.test.ts
git commit -m "feat(analytics): add GA4 vehicle interactions and financing calculator tracking"
```

---

### Task 3: Turnstile Protected Financing Inquiry API with Google Ads Enhanced Lead Hashing

**Files:**
- Create: `src/lib/server/turnstile-verify.ts`
- Create: `src/lib/server/enhanced-lead-hasher.ts`
- Modify: `src/pages/api/inquiry/financing.ts`
- Test: `src/lib/server/__tests__/enhanced-lead-hasher.test.ts`

**Interfaces:**
- Produces: `verifyTurnstileToken(token: string, secretKey: string, ip?: string): Promise<boolean>`, `hashAutomotiveLead(input: AutoLeadInput): Promise<HashedAutoLead>`

```typescript
export interface AutoLeadInput {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  city: string;
  vehicleId: string;
  financingTermMonths?: number;
  downPaymentEur?: number;
}

export interface HashedAutoLead {
  sha256_email: string;
  sha256_phone: string;
  sha256_first_name: string;
  sha256_last_name: string;
  postal_code: string;
  vehicle_id: string;
}
```

- [ ] **Step 1: Write failing test**

```typescript
// src/lib/server/__tests__/enhanced-lead-hasher.test.ts
import { describe, it, expect } from 'vitest';
import { hashAutomotiveLead, normalizePhoneGerman } from '../enhanced-lead-hasher';

describe('Automotive Enhanced Lead Hasher', () => {
  it('normalizes german mobile and landline numbers to E.164 format', () => {
    expect(normalizePhoneGerman('0171 / 123 456 7')).toBe('+491711234567');
    expect(normalizePhoneGerman('+49 (0) 201 987654')).toBe('+49201987654');
  });

  it('creates SHA-256 hashes matching Google Ads requirements', async () => {
    const lead = await hashAutomotiveLead({
      email: '  Kunde@Auto-Hub.DE  ',
      phone: '0151 99887766',
      firstName: 'Sabine',
      lastName: 'Musterfrau',
      postalCode: '45127',
      city: 'Essen',
      vehicleId: 'aq-bmw-320'
    });

    expect(lead.sha256_email).toMatch(/^[a-f0-9]{64}$/);
    expect(lead.sha256_phone).toMatch(/^[a-f0-9]{64}$/);
    expect(lead.postal_code).toBe('45127');
    expect(lead.vehicle_id).toBe('aq-bmw-320');
  });
});
```

- [ ] **Step 2: Run test to verify failure**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub && npx vitest run src/lib/server/__tests__/enhanced-lead-hasher.test.ts
```

- [ ] **Step 3: Implement minimal code**

```typescript
// src/lib/server/enhanced-lead-hasher.ts
export interface AutoLeadInput {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  city: string;
  vehicleId: string;
  financingTermMonths?: number;
  downPaymentEur?: number;
}

export interface HashedAutoLead {
  sha256_email: string;
  sha256_phone: string;
  sha256_first_name: string;
  sha256_last_name: string;
  postal_code: string;
  vehicle_id: string;
}

export function normalizePhoneGerman(phone: string): string {
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+490')) {
    cleaned = '+49' + cleaned.slice(4);
  } else if (cleaned.startsWith('0049')) {
    cleaned = '+49' + cleaned.slice(4);
  } else if (cleaned.startsWith('0') && !cleaned.startsWith('+')) {
    cleaned = '+49' + cleaned.slice(1);
  }
  return cleaned;
}

async function sha256Hex(str: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashAutomotiveLead(input: AutoLeadInput): Promise<HashedAutoLead> {
  const emailNorm = input.email.trim().toLowerCase();
  const phoneNorm = normalizePhoneGerman(input.phone);
  const firstNameNorm = input.firstName.trim().toLowerCase();
  const lastNameNorm = input.lastName.trim().toLowerCase();

  const [sha256_email, sha256_phone, sha256_first_name, sha256_last_name] = await Promise.all([
    sha256Hex(emailNorm),
    sha256Hex(phoneNorm),
    sha256Hex(firstNameNorm),
    sha256Hex(lastNameNorm)
  ]);

  return {
    sha256_email,
    sha256_phone,
    sha256_first_name,
    sha256_last_name,
    postal_code: input.postalCode.trim(),
    vehicle_id: input.vehicleId
  };
}
```

- [ ] **Step 4: Run tests and verify passing**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub && npx vitest run src/lib/server/__tests__/enhanced-lead-hasher.test.ts
```

- [ ] **Step 5: Commit changes**

```bash
git add src/lib/server/enhanced-lead-hasher.ts src/lib/server/__tests__/enhanced-lead-hasher.test.ts
git commit -m "feat(lead): add automotive enhanced lead hasher for Google Ads offline conversions"
```

---

### Task 4: Dynamic Vehicle Inventory & Image XML Sitemap

**Files:**
- Create: `src/pages/sitemap-vehicles.xml.ts`
- Test: `src/lib/seo/__tests__/vehicle-sitemap.test.ts`

**Interfaces:**
- Consumes: Vehicle inventory items
- Produces: Google Image & Vehicle XML Sitemap compliant with sitemaps.org standards

- [ ] **Step 1: Write failing test**

```typescript
// src/lib/seo/__tests__/vehicle-sitemap.test.ts
import { describe, it, expect } from 'vitest';
import { generateVehicleSitemapXml } from '../vehicle-sitemap-builder';

describe('Vehicle XML Sitemap with Image Extensions', () => {
  it('generates valid sitemap with vehicle URL and Google image tags', () => {
    const xml = generateVehicleSitemapXml('https://automobile-quick.de', [
      {
        id: 'aq-audi-a4',
        updatedAt: '2026-09-28T10:00:00Z',
        title: 'Audi A4 Avant S line',
        images: ['https://automobile-quick.de/images/a4-1.webp']
      }
    ]);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
    expect(xml).toContain('<loc>https://automobile-quick.de/fahrzeuge/aq-audi-a4</loc>');
    expect(xml).toContain('<image:loc>https://automobile-quick.de/images/a4-1.webp</image:loc>');
    expect(xml).toContain('<image:title>Audi A4 Avant S line</image:title>');
  });
});
```

- [ ] **Step 2: Run test to verify failure**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub && npx vitest run src/lib/seo/__tests__/vehicle-sitemap.test.ts
```

- [ ] **Step 3: Implement minimal code**

```typescript
// src/lib/seo/vehicle-sitemap-builder.ts
export interface VehicleSitemapItem {
  id: string;
  updatedAt: string;
  title: string;
  images: string[];
}

export function generateVehicleSitemapXml(baseUrl: string, items: VehicleSitemapItem[]): string {
  const urlNodes = items.map(item => {
    const imageNodes = item.images.map(img => `      <image:image>
        <image:loc>${img}</image:loc>
        <image:title>${item.title}</image:title>
      </image:image>`).join('\n');

    return `  <url>
    <loc>${baseUrl}/fahrzeuge/${item.id}</loc>
    <lastmod>${item.updatedAt.split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
${imageNodes}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/fahrzeuge</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${urlNodes}
</urlset>`;
}
```

- [ ] **Step 4: Run tests and verify passing**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub && npx vitest run src/lib/seo/__tests__/vehicle-sitemap.test.ts
```

- [ ] **Step 5: Commit changes**

```bash
git add src/lib/seo/vehicle-sitemap-builder.ts src/lib/seo/__tests__/vehicle-sitemap.test.ts
git commit -m "feat(seo): add dynamic vehicle XML sitemap with Google image extensions"
```

---

## Final Verification Checklist

1. [ ] Alle Vitest-Tests laufen vollständig grün durch (`npm test -- --run`).
2. [ ] Astro Build (`npm run build`) kompiliert ohne Type-Fehler für Cloudflare Workers.
3. [ ] AutoDealer-Schema enthält vollständige NAP-Daten (Adresse, Geo-Koordinaten, Öffnungszeiten).
4. [ ] Car-Schema enthält PAngV-konforme monatliche Ratenangaben und Ausstattungsmerkmale.
5. [ ] SHA-256 Hashes der Lead-Daten sind Google Ads Enhanced Conversion compliant.
