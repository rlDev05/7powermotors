import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { pricingCatalog } from '../src/app/data/pricing.ts';
import {
  convertJPYToPHP,
  formatJPY,
  formatPHP,
  JPY_TO_PHP_RATE,
  PRICING_TOTAL_ROWS,
  pricingVehiclePages,
} from '../src/app/lib/pricingConfig.ts';
import {
  defaultPricingLanguage,
  getPricingTranslations,
  supportedPricingLanguages,
} from '../src/app/i18n/pricing.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localizedDirectory = path.join(root, 'src', 'app', 'data', 'pricing-localized');
const expectedCourses = ['premium', 'full', 'standard', 'exterior', 'wheel'];

assert.equal(convertJPYToPHP(12_000), Math.round(12_000 * JPY_TO_PHP_RATE));
assert.equal(formatJPY(12_000), '¥12,000');
assert.equal(formatPHP(convertJPYToPHP(12_000)), '₱4,564');
assert.equal(convertJPYToPHP(1), 0, 'Sub-peso estimates should round to the nearest whole peso');
assert.throws(() => convertJPYToPHP(Number.NaN), TypeError);

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

function rowCount(page) {
  return page.sections.reduce((total, section) => total + section.rows.length, 0);
}

function extractAmounts(value, symbol) {
  const pattern = symbol === 'yen' ? /[¥￥]([\d,]+)/g : /₱([\d,]+)/g;
  return [...value.matchAll(pattern)].map((match) => Number(match[1].replaceAll(',', '')));
}

function verifyConvertedPrices(source, localized, trail = []) {
  if (typeof source === 'string') {
    const yenAmounts = extractAmounts(source, 'yen');
    if (yenAmounts.length === 0) return 0;

    assert.equal(typeof localized, 'string', `Missing localized price at ${trail.join('.')}`);
    const pesoAmounts = extractAmounts(localized, 'peso');
    assert.deepEqual(
      pesoAmounts,
      yenAmounts.map(convertJPYToPHP),
      `Incorrect JPY to PHP conversion at ${trail.join('.')}`,
    );
    return yenAmounts.length;
  }

  if (Array.isArray(source)) {
    assert.ok(Array.isArray(localized), `Expected an array at ${trail.join('.')}`);
    assert.equal(localized.length, source.length, `Array length changed at ${trail.join('.')}`);
    return source.reduce(
      (count, value, index) => count + verifyConvertedPrices(value, localized[index], [...trail, index]),
      0,
    );
  }

  if (source && typeof source === 'object') {
    return Object.entries(source).reduce((count, [key, value]) => {
      assert.ok(key in localized, `Missing localized field ${[...trail, key].join('.')}`);
      return count + verifyConvertedPrices(value, localized[key], [...trail, key]);
    }, 0);
  }

  return 0;
}

const sourcePages = new Map(pricingCatalog.vehiclePages.map((page) => [page.slug, page]));
assert.equal(sourcePages.size, pricingVehiclePages.length, 'Route metadata and source page counts differ');

let totalVehicleRows = 0;
let conversionChecks = 0;
const localizedPages = new Map();
const encounteredCourses = new Set();

for (const metadata of pricingVehiclePages) {
  const sourcePage = sourcePages.get(metadata.slug);
  assert.ok(sourcePage, `Missing source data for ${metadata.slug}`);

  const localizedPage = await readJson(path.join(localizedDirectory, `${metadata.slug}.json`));
  localizedPages.set(metadata.slug, localizedPage);

  assert.equal(localizedPage.slug, metadata.slug, `Wrong localized slug for ${metadata.slug}`);
  assert.equal(localizedPage.group, metadata.group, `Wrong group for ${metadata.slug}`);
  assert.equal(localizedPage.sections.length, sourcePage.sections.length, `Section count changed for ${metadata.slug}`);

  for (let sectionIndex = 0; sectionIndex < localizedPage.sections.length; sectionIndex += 1) {
    const section = localizedPage.sections[sectionIndex];
    assert.deepEqual(
      section.courses,
      sourcePage.sections[sectionIndex].courses,
      `Course order changed in ${metadata.slug}/${section.section}`,
    );
    assert.ok(
      section.courses.every((course) => expectedCourses.includes(course)),
      `Unknown course in ${metadata.slug}/${section.section}`,
    );
    section.courses.forEach((course) => encounteredCourses.add(course));
    for (const row of section.rows) {
      assert.equal(row.values.length, section.courses.length, `Course value count changed for ${metadata.slug}/${row.model}`);
    }
  }

  totalVehicleRows += rowCount(localizedPage);
  conversionChecks += verifyConvertedPrices(sourcePage, localizedPage, [metadata.slug]);
}

assert.equal(totalVehicleRows, 339, 'The vehicle catalog must retain all 339 rows');
assert.equal(totalVehicleRows, PRICING_TOTAL_ROWS, 'PRICING_TOTAL_ROWS metadata is stale');
assert.deepEqual([...encounteredCourses].sort(), [...expectedCourses].sort(), 'The catalog must retain all five course types');

const localizedHelmet = await readJson(path.join(localizedDirectory, 'helmet.json'));
const localizedParts = await readJson(path.join(localizedDirectory, 'parts.json'));
conversionChecks += verifyConvertedPrices(pricingCatalog.helmet, localizedHelmet, ['helmet']);
conversionChecks += verifyConvertedPrices(pricingCatalog.parts, localizedParts, ['parts']);
assert.ok(conversionChecks >= 1_600, `Expected broad conversion coverage, checked only ${conversionChecks} amounts`);

const searchIndex = await readJson(path.join(root, 'src', 'app', 'data', 'pricing-search-index.json'));
const expectedSearchRows = totalVehicleRows + localizedHelmet.rows.length + localizedParts.items.length;
assert.equal(searchIndex.length, expectedSearchRows, 'Search index does not cover the complete catalog');
assert.equal(new Set(searchIndex.map((entry) => entry.key)).size, searchIndex.length, 'Search index keys must be unique');

for (const metadata of pricingVehiclePages) {
  const expected = rowCount(localizedPages.get(metadata.slug));
  const indexed = searchIndex.filter((entry) => entry.slug === metadata.slug).length;
  assert.equal(indexed, expected, `Search index row count differs for ${metadata.slug}`);
}

assert.deepEqual(supportedPricingLanguages, ['en'], 'Pricing should remain a single local English bundle');
assert.equal(defaultPricingLanguage, 'en');
assert.deepEqual(
  getPricingTranslations('unsupported-language'),
  getPricingTranslations('en'),
  'Unsupported languages must fall back locally to English',
);

console.log(
  `Pricing regression checks passed: ${totalVehicleRows} vehicle rows, ` +
    `${searchIndex.length} search records, ${conversionChecks} converted amounts, ` +
    `${expectedCourses.length} courses.`,
);
