import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const urls = [
  "https://img.classistatic.de/api/v1/mo-prod/images/08/087a133c-1977-47de-b00e-9ee177373c26?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/06/0645f254-d6d8-472f-ae93-590d835c0d65?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/12/127b518c-627a-43c5-ac9f-4e1cee47b0d5?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/14/14541512-5729-4ea3-ba8b-0286e1a37ff8?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/1c/1c69317d-3a69-484b-a85f-01d85803f9cd?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/1e/1e5b42ab-02fd-4b2f-9e4d-c619f2ded8ea?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/24/240eb3f2-5fea-4108-a9d3-8e8e813808cc?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/2e/2ed59d7c-62d4-41fa-b957-055b126188a1?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/31/31a6e82a-af84-4bea-8ce2-0f848f493857?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/3d/3d5f03d7-7951-4d44-b725-6f82515f172f?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/3f/3fb38c32-aa7a-408b-9798-a45110729cea?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/42/4232e1ed-694e-4e8b-9096-c111bf0439f0?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/57/57476e82-85f9-452d-b453-b9aac7abea5b?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/67/672ed366-1efb-4aa8-98fa-1b8affa4c127?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/7f/7fa34b76-bc82-411e-aa74-fd296ed72aac?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/82/8240da22-428a-4df5-ab23-1ba136e47a8a?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/83/837fc2df-5300-4c12-9e98-21708129477b?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/84/84e296c0-3f86-4303-96d1-63cb428a8344?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/93/93d94117-1e21-4bc0-86de-7f396421a182?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/a4/a4172800-de2d-4b80-a1d5-236651d01b34?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/b0/b00cd49c-b83c-4244-8bc9-0dd84d4127d3?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/bd/bd73668e-c562-4525-9759-211930aad44b?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/bd/bd7da2fb-457d-41f7-9baa-32bd0577db08?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/c1/c14dcf2b-cc30-4a04-8e99-7b4ed31ae651?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/c8/c887b6d0-6f7f-45a6-8eac-7a1717ad5eaf?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/ce/ce2aa09a-ec00-42d7-b69c-827c94417db9?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/d0/d077a7a8-3940-47c3-b8e8-c045f9ac29ed?rule=mo-1600",
  "https://img.classistatic.de/api/v1/mo-prod/images/d1/d1fd70ac-bdb2-4a5b-bcbb-4f094ae95d73?rule=mo-1600"
];

const targetDir = path.join(process.cwd(), 'public/vehicles/18_opel-astra-2024');

async function run() {
  console.log(`Starting download and conversion of ${urls.length} official images for Opel Astra 2024...`);
  let count = 0;
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const outName = `mobile_${String(i + 1).padStart(2, '0')}.webp`;
    const outPath = path.join(targetDir, outName);
    
    const resp = await fetch(url);
    if (!resp.ok) {
      console.error(`Failed to fetch ${url}: ${resp.status}`);
      continue;
    }
    const rawBuffer = Buffer.from(await resp.arrayBuffer());
    // Convert to webp with sharp
    await sharp(rawBuffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outPath);
      
    const stat = fs.statSync(outPath);
    count++;
    console.log(`[${count}/${urls.length}] Saved ${outName} (${stat.size} bytes)`);
  }
  console.log(`Finished: ${count} images converted and saved!`);
}

run().catch(console.error);
