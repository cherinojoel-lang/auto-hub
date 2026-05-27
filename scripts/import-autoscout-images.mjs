import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = process.cwd();
const AUTOSCOUT_HTML = '/private/tmp/autoscout-automobile-quick.html';
const DATA_FILE = path.join(PROJECT_ROOT, 'src/data/vehiclesData.generated.ts');
const VEHICLES_DIR = path.join(PROJECT_ROOT, 'public/vehicles');

function extractVehicles(content) {
  const arrayMatch = content.match(/export const vehiclesData: Vehicle\[\] = (\[[\s\S]*?\]);/);
  if (!arrayMatch) throw new Error('Could not find vehiclesData array');
  return JSON.parse(arrayMatch[1]);
}

function extractAutoScoutListings(html) {
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!nextDataMatch) throw new Error('Could not find AutoScout __NEXT_DATA__ payload');
  const data = JSON.parse(nextDataMatch[1]);
  const listings = data?.props?.pageProps?.listings;
  if (!Array.isArray(listings)) throw new Error('Could not find AutoScout listings array');
  return listings;
}

function compact(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function vehicleTitleFromListing(listing) {
  const vehicle = listing.vehicle || {};
  return [vehicle.make, vehicle.model, vehicle.modelVersionInput].filter(Boolean).join(' ');
}

function imageUrlAtSize(url) {
  return url.replace(/\/250x188\.webp$/, '/1280x960.webp');
}

function filePathFor(folder, index) {
  return path.join(VEHICLES_DIR, folder, `autoscout_${String(index + 1).padStart(2, '0')}.webp`);
}

function publicPathFor(folder, index) {
  return `/vehicles/${folder}/autoscout_${String(index + 1).padStart(2, '0')}.webp`;
}

function existingFilesFor(folder) {
  const folderPath = path.join(VEHICLES_DIR, folder);
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath)
    .filter((file) => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((file) => `/vehicles/${folder}/${file}`);
}

function isExactMatch(vehicle, listing) {
  const listingVehicle = listing.vehicle || {};
  const listingTitle = compact(vehicleTitleFromListing(listing));
  const localTitle = compact(vehicle.title);
  const sameTitle = listingTitle.includes(localTitle) || localTitle.includes(listingTitle);
  const samePrice = listing.prices?.public?.priceRaw === vehicle.priceValue;
  const sameRegistration = listingVehicle.firstRegistrationDate?.formatted === vehicle.firstRegistration;
  const sameMileage = listingVehicle.mileageInKm?.formatted === vehicle.mileage;
  const samePower = listingVehicle.powerInKw?.formatted === (vehicle.power || '').split('/')[0].trim();
  return sameTitle && samePrice && sameRegistration && sameMileage && samePower;
}

async function download(url, target) {
  if (fs.existsSync(target)) return 'skipped';
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed ${response.status}: ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 1024) throw new Error(`Downloaded file is suspiciously small: ${url}`);
  fs.writeFileSync(target, buffer);
  return 'downloaded';
}

async function main() {
  const html = fs.readFileSync(AUTOSCOUT_HTML, 'utf8');
  const content = fs.readFileSync(DATA_FILE, 'utf8');
  const vehicles = extractVehicles(content);
  const listings = extractAutoScoutListings(html);

  const importReport = [];
  let changed = false;

  for (const vehicle of vehicles) {
    if (vehicle.status !== 'available') continue;

    const listing = listings.find((candidate) => isExactMatch(vehicle, candidate));
    if (!listing) {
      importReport.push({ id: vehicle.id, status: 'no-exact-match', downloaded: 0, total: vehicle.gallery.length });
      continue;
    }

    const folderPath = path.join(VEHICLES_DIR, vehicle.folder);
    fs.mkdirSync(folderPath, { recursive: true });

    const urls = [...new Set((listing.images || []).map(imageUrlAtSize))];
    let downloaded = 0;

    for (let index = 0; index < urls.length; index += 1) {
      const result = await download(urls[index], filePathFor(vehicle.folder, index));
      if (result === 'downloaded') downloaded += 1;
    }

    const gallery = urls.map((_, index) => publicPathFor(vehicle.folder, index));
    vehicle.mainImage = gallery[0] || vehicle.mainImage;
    vehicle.gallery = gallery;
    changed = true;

    importReport.push({
      id: vehicle.id,
      status: 'matched',
      downloaded,
      total: vehicle.gallery.length,
      sourceImages: urls.length,
    });
  }

  if (changed) {
    const newContent = content.replace(
      /export const vehiclesData: Vehicle\[\] = \[[\s\S]*?\];/,
      `export const vehiclesData: Vehicle[] = ${JSON.stringify(vehicles, null, 2)};`
    );
    fs.writeFileSync(DATA_FILE, newContent);
  }

  console.log(JSON.stringify(importReport, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
