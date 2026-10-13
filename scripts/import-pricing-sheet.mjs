import { writeFile } from 'node:fs/promises';
import path from 'node:path';

import { createSnapshot, PRICING_CSV_URL, writeGeneratedPricing } from './pricing-data-utils.mjs';

const root = process.cwd();
const response = await fetch(PRICING_CSV_URL, { signal: AbortSignal.timeout(30_000) });
if (!response.ok) throw new Error(`Pricing sheet download failed with HTTP ${response.status}.`);
const snapshot = createSnapshot(await response.text());
await writeFile(path.join(root, 'src', 'app', 'data', 'pricing-master.json'), `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
const { entries, searchIndex } = await writeGeneratedPricing(root, snapshot);
console.log(`Imported ${snapshot.rows.length} master rows from Google Sheets.`);
console.log(`Generated ${entries.length} local pricing chunks and ${searchIndex.length} search records.`);
