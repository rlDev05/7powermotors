import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildPricingCatalog, PRICING_SOURCE_URL } from './pricing-data-utils.mjs';
import { PRICING_TOTAL_ROWS, pricingVehiclePages } from '../src/app/lib/pricingConfig.ts';
import { defaultPricingLanguage, getPricingTranslations, supportedPricingLanguages } from '../src/app/i18n/pricing.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localizedDirectory = path.join(root, 'src', 'app', 'data', 'pricing-localized');
const snapshot = JSON.parse(await readFile(path.join(root, 'src', 'app', 'data', 'pricing-master.json'), 'utf8'));
const catalog = buildPricingCatalog(snapshot);
const expectedCourses = ['premium', 'full', 'standard', 'exterior', 'wheel'];

assert.equal(snapshot.sourceUrl, PRICING_SOURCE_URL);
assert.equal(snapshot.rows.length, 240, 'The committed Google Sheet snapshot must retain all 240 rows');
assert.equal(new Set(snapshot.rows.map((row) => row.lookupKey)).size, snapshot.rows.length, 'Lookup keys must be unique');
assert.ok(snapshot.rows.every((row) => row.prices && row.prices.other), 'Every snapshot row must retain JPY and PHP source columns');

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

function rowCount(page) {
  return page.sections.reduce((total, section) => total + section.rows.length, 0);
}

assert.equal(catalog.vehiclePages.length, pricingVehiclePages.length, 'Route metadata and generated pages differ');
let totalVehicleRows = 0;
const encounteredCourses = new Set();

for (const metadata of pricingVehiclePages) {
  const expectedPage = catalog.vehiclePages.find((page) => page.slug === metadata.slug);
  assert.ok(expectedPage, `Missing sheet-backed page for ${metadata.slug}`);
  const generatedPage = await readJson(path.join(localizedDirectory, `${metadata.slug}.json`));
  assert.deepEqual(generatedPage, expectedPage, `Generated pricing chunk is stale for ${metadata.slug}`);
  assert.equal(generatedPage.group, metadata.group);
  assert.equal(generatedPage.sourceUrl, PRICING_SOURCE_URL);
  for (const section of generatedPage.sections) {
    assert.ok(section.courses.every((course) => expectedCourses.includes(course)), `Unknown course in ${metadata.slug}/${section.section}`);
    section.courses.forEach((course) => encounteredCourses.add(course));
    for (const row of section.rows) {
      assert.equal(row.values.length, section.courses.length, `Course value count changed for ${metadata.slug}/${row.model}`);
      assert.ok(row.values.every((value) => value === '-' || value.includes('₱')), `Non-PHP display value in ${metadata.slug}/${row.model}`);
    }
  }
  totalVehicleRows += rowCount(generatedPage);
}

assert.equal(totalVehicleRows, 234, 'The sheet must provide 234 motorcycle pricing rows');
assert.equal(totalVehicleRows, PRICING_TOTAL_ROWS, 'PRICING_TOTAL_ROWS metadata is stale');
assert.deepEqual([...encounteredCourses].sort(), [...expectedCourses].sort(), 'All five motorcycle courses must remain available');

const helmet = await readJson(path.join(localizedDirectory, 'helmet.json'));
const parts = await readJson(path.join(localizedDirectory, 'parts.json'));
assert.deepEqual(helmet, catalog.helmet, 'Helmet chunk is stale');
assert.deepEqual(parts, catalog.parts, 'Other-items chunk is stale');
assert.equal(helmet.rows.length, 3);
assert.equal(parts.items.length, 3);

const searchIndex = await readJson(path.join(root, 'src', 'app', 'data', 'pricing-search-index.json'));
assert.equal(searchIndex.length, snapshot.rows.length, 'Search index must cover every sheet row');
assert.equal(new Set(searchIndex.map((entry) => entry.key)).size, searchIndex.length, 'Search index keys must be unique');

const pricingSource = await readFile(path.join(root, 'src', 'app', 'lib', 'pricingConfig.ts'), 'utf8');
const pricingPageSource = await readFile(path.join(root, 'src', 'app', 'pages', 'PricingPage.tsx'), 'utf8');
const detailPageSource = await readFile(path.join(root, 'src', 'app', 'pages', 'PricingDetailPage.tsx'), 'utf8');
for (const source of [pricingSource, pricingPageSource, detailPageSource]) {
  assert.doesNotMatch(source, /JPY_TO_PHP|currencyapi|exchangerate|fetch\s*\(/i, 'Runtime pricing conversion/API code remains');
}

assert.deepEqual(supportedPricingLanguages, ['en']);
assert.equal(defaultPricingLanguage, 'en');
assert.deepEqual(getPricingTranslations('unsupported-language'), getPricingTranslations('en'));

console.log(`Pricing regression checks passed: ${snapshot.rows.length} sheet rows, ${totalVehicleRows} motorcycle rows, ${searchIndex.length} search records, zero runtime conversion calls.`);
