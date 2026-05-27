#!/usr/bin/env node
// Expands gallery[] to include ALL physical files per vehicle folder.
// Reads public/vehicles/<folder>/ (deterministic sort), updates
// src/data/vehiclesData.generated.ts in-place. mainImage stays.
// Safe to re-run; idempotent.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'src/data/vehiclesData.generated.ts');
const VEHICLES_DIR = path.join(ROOT, 'public/vehicles');

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
  // Put mainImage first if it is one of the physical files
  const ordered = mainImage && fullPaths.includes(mainImage)
    ? [mainImage, ...fullPaths.filter((p) => p !== mainImage)]
    : fullPaths;
  return ordered;
}

// Locate each vehicle object block and rewrite the gallery array.
function rewriteDataFile() {
  let src = fs.readFileSync(DATA_FILE, 'utf8');

  // Match: "folder": "<x>", up to "gallery": [...] within the same object.
  const objectRegex = /"folder":\s*"([^"]+)"[\s\S]*?"mainImage":\s*"([^"]*)"[\s\S]*?"gallery":\s*\[([\s\S]*?)\]/g;

  let totalBefore = 0;
  let totalAfter = 0;
  let touched = 0;

  src = src.replace(objectRegex, (match, folder, mainImage, oldArr) => {
    const oldEntries = (oldArr.match(/"[^"]+"/g) || []).length;
    totalBefore += oldEntries;

    const files = readPhysicalFiles(folder);
    if (files.length === 0) {
      // keep as is
      totalAfter += oldEntries;
      return match;
    }
    const ordered = buildGalleryArrayLiteral(folder, mainImage, files);

    if (ordered.length === oldEntries && ordered.every((p, i) => match.includes(`"${p}"`))) {
      // already complete and ordered identically
      totalAfter += oldEntries;
      return match;
    }

    const indent = '      ';
    const newArr = ordered.map((p) => `${indent}"${p}"`).join(',\n');
    totalAfter += ordered.length;
    touched += 1;

    // Reconstruct: keep prefix up to "gallery":, replace bracket content
    return match.replace(/"gallery":\s*\[[\s\S]*?\]/, `"gallery": [\n${newArr}\n    ]`);
  });

  fs.writeFileSync(DATA_FILE, src);
  return { totalBefore, totalAfter, touched };
}

const result = rewriteDataFile();
console.log('=== expand-vehicle-galleries ===');
console.log(`Galerie-Einträge vorher: ${result.totalBefore}`);
console.log(`Galerie-Einträge nachher: ${result.totalAfter}`);
console.log(`Aktualisierte Fahrzeuge: ${result.touched}`);
