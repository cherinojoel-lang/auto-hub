import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const DATA_FILE = path.join(PROJECT_ROOT, 'src/data/vehiclesData.generated.ts');
const VEHICLES_DIR = path.join(PROJECT_ROOT, 'public/vehicles');

// Load page 1 and page 2 markdown outputs from Apify
const p1Path = '/Users/joelcherinodiaz/.gemini/antigravity-cli/brain/ff5ed5a6-e02f-4642-8fd1-b22c987e0363/.system_generated/steps/869/output.txt';
const p2Path = '/Users/joelcherinodiaz/.gemini/antigravity-cli/brain/ff5ed5a6-e02f-4642-8fd1-b22c987e0363/.system_generated/steps/881/output.txt';

const p1 = JSON.parse(fs.readFileSync(p1Path, 'utf8').split('\n')[0]).items[0].markdown;
const p2 = JSON.parse(fs.readFileSync(p2Path, 'utf8').split('\n')[0]).items[0].markdown;
const allMd = p1 + '\n' + p2;

const entries = [];
const blocks = allMd.split(/(?=### )/);

for (const b of blocks) {
  if (!b.includes('adId=')) continue;
  const adIdMatch = b.match(/adId=(\d+)/);
  const titleMatch = b.match(/### (?:NEU)?([^\n]+)/);
  const imgMatch = b.match(/!\[[^\]]*\]\((https:\/\/img\.classistatic\.de\/[^\)]+)\)/);
  const ezMatch = b.match(/EZ (\d{2}\/\d{4})/);
  const kmMatch = b.match(/([\d\.]+)\s*km/);
  const kwMatch = b.match(/(\d+)\s*kW/);
  const psMatch = b.match(/\((\d+)\s*PS\)/);
  const fuelMatch = b.match(/•\s*(Benzin|Diesel|Hybrid[^\n•]*|Elektro)/);
  const priceMatch = b.match(/([\d\.]+)\s*€/);
  const finMatch = b.match(/\[Finanzierung (ab [\d\.]+\s*€ mtl\.)\]/);

  if (adIdMatch && titleMatch) {
    entries.push({
      adId: adIdMatch[1],
      title: titleMatch[1].replace(/\\\*/g, '*').trim(),
      img: imgMatch ? imgMatch[1] : null,
      ez: ezMatch ? ezMatch[1] : null,
      km: kmMatch ? `${kmMatch[1]} km` : null,
      kw: kwMatch ? kwMatch[1] : null,
      ps: psMatch ? psMatch[1] : null,
      fuel: fuelMatch ? fuelMatch[1].trim() : 'Benzin',
      price: priceMatch ? `${priceMatch[1]} €` : null,
      priceValue: priceMatch ? parseInt(priceMatch[1].replace(/\./g, ''), 10) : 0,
      financing: finMatch ? finMatch[1] : undefined
    });
  }
}

// Deduplicate unique ads
const uniqueAdsMap = new Map();
for (const e of entries) {
  uniqueAdsMap.set(e.adId, e);
}
console.log(`Total live mobile.de ads parsed: ${uniqueAdsMap.size}`);

// Matched active ad IDs (the 7 existing)
const matchedAdIds = new Set(['456112138', '455353297', '450213996', '443549804', '454163903', '454564772', '455224640']);

// 13 local IDs that are SOLD_OR_DELISTED
const delistedLocalIds = new Set([
  'renault-scenic-2013',
  'opel-astra-st-2022',
  'opel-corsa-2016',
  'fiat-500-2022',
  'nissan-micra-2017',
  'fiat-500-dolce-vita-2022',
  'opel-corsa-e-2018',
  'opel-corsa-f-2020',
  'opel-mokka-2016',
  'citroen-c3-aircross-2017',
  'opel-mokka-x-2017',
  'bmw-x1-2018',
  'opel-corsa-automatik-2023'
]);

// Read existing vehicles data
const content = fs.readFileSync(DATA_FILE, 'utf8');
const arrayMatch = content.match(/export const vehiclesData: Vehicle\[\] = (\[[\s\S]*?\]);/);
const vehicles = JSON.parse(arrayMatch[1]);

// 1. Update 13 delisted vehicles to status: 'sold'
let soldUpdated = 0;
for (const v of vehicles) {
  if (delistedLocalIds.has(v.id)) {
    v.status = 'sold';
    soldUpdated++;
  }
}
console.log(`Marked ${soldUpdated} delisted vehicles as 'sold'`);

// 2. Identify 24 new ads to import
const newAds = [];
for (const [adId, ad] of uniqueAdsMap.entries()) {
  if (!matchedAdIds.has(adId)) {
    newAds.push(ad);
  }
}
console.log(`Found ${newAds.length} new ads to import`);

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractMakeModel(title) {
  const parts = title.split(' ');
  const make = parts[0] || 'Unbekannt';
  const model = parts[1] || 'Modell';
  return { make, model };
}

// Download and create 24 new vehicle records
let folderIndex = 24;
const importedVehicles = [];

for (const ad of newAds) {
  const { make, model } = extractMakeModel(ad.title);
  const year = ad.ez ? ad.ez.split('/')[1] : '2020';
  const slugBase = slugify(`${make}-${model}-${year}`);
  const id = `${slugBase}-${ad.adId.slice(-4)}`;
  const folderName = `${String(folderIndex++).padStart(2, '0')}_${slugBase}`;
  const folderPath = path.join(VEHICLES_DIR, folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const mainImagePath = `/vehicles/${folderName}/mobile_01.webp`;
  const physicalMainImage = path.join(folderPath, 'mobile_01.webp');

  // Download official image if exists
  if (ad.img && !fs.existsSync(physicalMainImage)) {
    try {
      const resp = await fetch(ad.img);
      if (resp.ok) {
        const rawBuf = Buffer.from(await resp.arrayBuffer());
        await sharp(rawBuf)
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(physicalMainImage);
      }
    } catch (err) {
      console.error(`Failed to download image for ${ad.title}:`, err.message);
    }
  }

  const powerStr = ad.kw && ad.ps ? `${ad.kw} kW / ${ad.ps} PS` : (ad.kw ? `${ad.kw} kW` : 'Leistung n.a.');

  const newVehicle = {
    id,
    folder: folderName,
    make,
    model,
    title: ad.title,
    price: ad.price || 'Preis auf Anfrage',
    priceValue: ad.priceValue,
    financing: ad.financing || `ab ${Math.round(ad.priceValue * 0.01)} € mtl.`,
    firstRegistration: ad.ez || '01/2020',
    mileage: ad.km || '0 km',
    power: powerStr,
    fuel: ad.fuel,
    mainImage: mainImagePath,
    gallery: [mainImagePath],
    alt: `${ad.title} gebraucht bei Automobile Quick in Iserlohn-Letmathe`,
    status: 'available',
    isNew: true
  };

  importedVehicles.push(newVehicle);
}

console.log(`Successfully prepared ${importedVehicles.length} new vehicles.`);

// Combine existing vehicles + newly imported vehicles
const finalVehicles = [...vehicles, ...importedVehicles];

// Rewrite vehiclesData.generated.ts
const newFileContent = `// Auto-generated from portal sync. Do not edit manually.

export type Vehicle = {
  id: string;
  folder: string;
  make: string;
  model: string;
  title: string;
  price: string;
  priceValue: number;
  financing: string;
  firstRegistration: string;
  mileage: string;
  power: string;
  fuel: string;
  mainImage: string;
  gallery: string[];
  alt: string;
  status: 'available' | 'sold' | 'hidden_review';
  isNew?: boolean;
  listingDate?: string;
  description?: string;
  /** EnVKV — Pkw-EnVKV-Pflichtangaben (Werbeverordnung) */
  envkv?: {
    /** Kraftstoffverbrauch kombiniert in l/100km (Verbrenner) oder kWh/100km (E) */
    consumptionCombined?: string;
    consumptionInner?: string;
    consumptionOuter?: string;
    /** CO2-Emissionen kombiniert in g/km */
    co2Combined?: string;
    /** CO2-Effizienzklasse (A bis G nach neuer Skala 2024) */
    co2Class?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    /** Elektrische Reichweite in km (nur BEV/PHEV) */
    electricRange?: string;
    /** WLTP oder NEFZ */
    measurementProcedure?: 'WLTP' | 'NEFZ';
  };
};

export const vehiclesData: Vehicle[] = ${JSON.stringify(finalVehicles, null, 2)};
`;

fs.writeFileSync(DATA_FILE, newFileContent);
console.log(`Rewrote ${DATA_FILE} successfully! Total vehicles: ${finalVehicles.length}`);
const availableCount = finalVehicles.filter(v => v.status === 'available').length;
console.log(`Available vehicles count: ${availableCount}`);
