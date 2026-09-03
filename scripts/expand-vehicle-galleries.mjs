import fs from 'fs';
import path from 'path';

/**
 * expand-vehicle-galleries.mjs
 *
 * Scans `public/vehicles/<folder>/` for all physical image files and synchronises
 * the `gallery` array (and `mainImage`) in `src/data/vehiclesData.generated.ts`.
 *
 * Rules:
 *  1. Only existing physical files (.webp, .jpg, .jpeg, .png) are included.
 *  2. Sort order is deterministic (natural numeric sort: 01, 02, 10, ...).
 *  3. `mainImage` is placed first in the gallery.
 *  4. If `mainImage` does not exist on disk, it is updated to the first physical file.
 *  5. No duplicate entries.
 */

const PROJECT_ROOT = process.cwd();
const DATA_FILE = path.join(PROJECT_ROOT, 'src/data/vehiclesData.generated.ts');
const VEHICLES_DIR = path.join(PROJECT_ROOT, 'public/vehicles');

const IMAGE_EXT = /\.(webp|jpe?g|png)$/i;

function sortFiles(files) {
  return files
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, 'de', { numeric: true, sensitivity: 'base' }));
}

function readPhysicalFiles(folder) {
  const abs = path.join(VEHICLES_DIR, folder);
  if (!fs.existsSync(abs)) return [];
  return sortFiles(fs.readdirSync(abs));
}

function buildGalleryArrayLiteral(folder, mainImage, files) {
  const fullPaths = files.map((f) => `/vehicles/${folder}/${f}`);
  const ordered = mainImage && fullPaths.includes(mainImage)
    ? [mainImage, ...fullPaths.filter((p) => p !== mainImage)]
    : fullPaths;
  return ordered;
}

function rewriteDataFile() {
  let src = fs.readFileSync(DATA_FILE, 'utf8');

  const objectRegex = /"folder":\s*"([^"]+)"[\s\S]*?"mainImage":\s*"([^"]*)"[\s\S]*?"gallery":\s*\[([\s\S]*?)\]/g;

  let totalBefore = 0;
  let totalAfter = 0;
  let touched = 0;

  src = src.replace(objectRegex, (match, folder, mainImage, oldArr) => {
    const oldEntries = (oldArr.match(/"[^"]+"/g) || []).length;
    totalBefore += oldEntries;

    const files = readPhysicalFiles(folder);
    if (files.length === 0) {
      totalAfter += oldEntries;
      return match;
    }
    const fullPaths = files.map((f) => `/vehicles/${folder}/${f}`);
    const resolvedMain = (mainImage && fullPaths.includes(mainImage)) ? mainImage : fullPaths[0];
    const ordered = buildGalleryArrayLiteral(folder, resolvedMain, files);

    if (ordered.length === oldEntries && resolvedMain === mainImage && ordered.every((p, i) => match.includes(`"${p}"`))) {
      totalAfter += oldEntries;
      return match;
    }

    const indent = '      ';
    const newArr = ordered.map((p) => `${indent}"${p}"`).join(',\n');
    totalAfter += ordered.length;
    touched += 1;

    let updated = match;
    if (resolvedMain !== mainImage) {
      updated = updated.replace(/"mainImage":\s*"[^"]*"/, `"mainImage": "${resolvedMain}"`);
    }
    return updated.replace(/"gallery":\s*\[[\s\S]*?\]/, `"gallery": [\n${newArr}\n    ]`);
  });

  fs.writeFileSync(DATA_FILE, src);
  return { totalBefore, totalAfter, touched };
}

const result = rewriteDataFile();
console.log('=== expand-vehicle-galleries ===');
console.log(`Galerie-Einträge vorher: ${result.totalBefore}`);
console.log(`Galerie-Einträge nachher: ${result.totalAfter}`);
console.log(`Aktualisierte Fahrzeuge: ${result.touched}`);
