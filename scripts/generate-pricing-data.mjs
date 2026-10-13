import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { writeGeneratedPricing } from './pricing-data-utils.mjs';

const root = process.cwd();
const snapshot = JSON.parse(await readFile(path.join(root, 'src', 'app', 'data', 'pricing-master.json'), 'utf8'));
const { entries, searchIndex } = await writeGeneratedPricing(root, snapshot);
console.log(`Generated ${entries.length} local pricing chunks and ${searchIndex.length} search records from the committed snapshot.`);
