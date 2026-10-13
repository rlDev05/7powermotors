import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const PRICING_SHEET_ID = '1AFvyYyX8bCpL78iiivYXsRS0Y4IFl7lXketVnciG8yk';
export const PRICING_SHEET_GID = '162625717';
export const PRICING_SOURCE_URL = `https://docs.google.com/spreadsheets/u/1/d/${PRICING_SHEET_ID}/htmlview#gid=${PRICING_SHEET_GID}`;
export const PRICING_CSV_URL = `https://docs.google.com/spreadsheets/d/${PRICING_SHEET_ID}/export?format=csv&gid=${PRICING_SHEET_GID}`;

const courseColumns = {
  premium: { jpy: [4, 5], php: [16, 17] },
  full: { jpy: [6, 7], php: [18, 19] },
  standard: { jpy: [8, 9], php: [20, 21] },
  exterior: { jpy: [10, 11], php: [22, 23] },
  wheel: { jpy: [12, 13], php: [24, 25] },
  other: { jpy: [14, 15], php: [26, 27] },
};

const vehiclePageDefinitions = [
  { slug: 'domestic', name: 'Domestic motorcycles', group: 'domestic', brands: ['Honda', 'Kawasaki', 'Suzuki', 'Yamaha'] },
  { slug: 'ducati', name: 'DUCATI', group: 'imported', brands: ['DUCATI'] },
  { slug: 'can-am', name: 'BRP Can-Am', group: 'imported', brands: ['BRP Can-Am'] },
  { slug: 'harley-davidson', name: 'HARLEY-DAVIDSON', group: 'imported', brands: ['Harley-Davidson'] },
  { slug: 'mv-agusta', name: 'MV AGUSTA', group: 'imported', brands: ['MV AGUSTA'] },
  { slug: 'bmw', name: 'BMW', group: 'imported', brands: ['BMW'] },
  { slug: 'ktm', name: 'KTM', group: 'imported', brands: ['KTM'] },
  { slug: 'triumph', name: 'TRIUMPH', group: 'imported', brands: ['TRIUMPH'] },
  { slug: 'aprilia', name: 'Aprilia', group: 'imported', brands: ['Aprilia'] },
  { slug: 'vespa', name: 'Vespa', group: 'imported', brands: ['Vespa'] },
  { slug: 'moto-guzzi', name: 'MOTO GUZZI', group: 'imported', brands: ['MOTO GUZZI'] },
  { slug: 'husqvarna', name: 'Husqvarna', group: 'imported', brands: ['Husqvarna'] },
  { slug: 'indian', name: 'Indian', group: 'imported', brands: ['Indian'] },
  { slug: 'royal-enfield', name: 'Royal Enfield', group: 'imported', brands: ['Royal Enfield'] },
];

function cleanCell(value = '') {
  return value.replace(/^\uFEFF/, '').trim();
}

export function parseCsv(csv) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    if (quoted) {
      if (character === '"' && csv[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else value += character;
    } else if (character === '"') quoted = true;
    else if (character === ',') {
      row.push(cleanCell(value));
      value = '';
    } else if (character === '\n') {
      row.push(cleanCell(value));
      rows.push(row);
      row = [];
      value = '';
    } else if (character !== '\r') value += character;
  }
  if (value || row.length) {
    row.push(cleanCell(value));
    rows.push(row);
  }
  return rows;
}

function pricePair(row, [newIndex, existingIndex]) {
  return { new: cleanCell(row[newIndex]) || '-', existing: cleanCell(row[existingIndex]) || '-' };
}

export function createSnapshot(csv, importedOn = new Date().toISOString().slice(0, 10)) {
  const rows = parseCsv(csv);
  if (rows.length < 4 || rows[1]?.[0] !== 'Brand' || rows[1]?.length !== 28) {
    throw new Error('The pricing sheet layout changed: expected the 28-column CR-1 master price list.');
  }
  const normalizedRows = rows.slice(3).filter((row) => row.some(Boolean)).map((row, index) => {
    if (row.length !== 28) throw new Error(`Pricing row ${index + 4} has ${row.length} columns; expected 28.`);
    const brand = cleanCell(row[0]);
    const series = cleanCell(row[1]);
    const model = cleanCell(row[2]);
    const lookupKey = cleanCell(row[3]);
    if (!brand || !lookupKey) throw new Error(`Pricing row ${index + 4} is missing its brand or lookup key.`);
    return {
      brand,
      series,
      model,
      lookupKey,
      prices: Object.fromEntries(Object.entries(courseColumns).map(([course, columns]) => [course, {
        jpy: pricePair(row, columns.jpy),
        php: pricePair(row, columns.php),
      }])),
    };
  });
  if (new Set(normalizedRows.map((row) => row.lookupKey)).size !== normalizedRows.length) {
    throw new Error('The pricing sheet contains duplicate lookup keys.');
  }
  return {
    title: cleanCell(rows[0][0]),
    sourceUrl: PRICING_SOURCE_URL,
    sheetId: PRICING_SHEET_ID,
    gid: PRICING_SHEET_GID,
    importedOn,
    rows: normalizedRows,
  };
}

function displayPair(pair) {
  const newPrice = pair.new || '-';
  const existingPrice = pair.existing || '-';
  if (newPrice === '-' && existingPrice === '-') return '-';
  if (existingPrice === '-') return newPrice;
  return `${newPrice} / 【${existingPrice}】`;
}

function buildVehiclePage(snapshot, definition) {
  const pageRows = snapshot.rows.filter((row) => definition.brands.includes(row.brand));
  const sections = new Map();
  for (const row of pageRows) {
    const sectionName = definition.group === 'domestic' ? row.brand : (row.series || row.brand);
    const section = sections.get(sectionName) ?? { section: sectionName, courses: [], rows: [] };
    const courses = Object.keys(courseColumns).filter((course) => course !== 'other' && displayPair(row.prices[course].php) !== '-');
    if (!section.courses.length) section.courses = courses;
    if (section.courses.join('|') !== courses.join('|')) throw new Error(`Course columns are inconsistent in ${definition.slug}/${sectionName}.`);
    section.rows.push({
      model: row.model || row.series || row.lookupKey,
      values: courses.map((course) => displayPair(row.prices[course].php)),
    });
    sections.set(sectionName, section);
  }
  if (!pageRows.length) throw new Error(`No rows found for pricing page ${definition.slug}.`);
  return {
    slug: definition.slug,
    name: definition.name,
    group: definition.group,
    sourceUrl: snapshot.sourceUrl,
    legacyPath: '',
    sections: [...sections.values()],
    notes: [],
  };
}

export function buildPricingCatalog(snapshot) {
  const vehiclePages = vehiclePageDefinitions.map((definition) => buildVehiclePage(snapshot, definition));
  const helmetRows = snapshot.rows.filter((row) => row.brand === 'Helmet');
  const otherRows = snapshot.rows.filter((row) => row.brand === 'Others');
  const recognizedBrands = new Set([...vehiclePageDefinitions.flatMap((definition) => definition.brands), 'Helmet', 'Others']);
  const unknownBrands = [...new Set(snapshot.rows.filter((row) => !recognizedBrands.has(row.brand)).map((row) => row.brand))];
  if (unknownBrands.length) throw new Error(`Unmapped pricing brands: ${unknownBrands.join(', ')}`);
  return {
    generatedFrom: snapshot.title,
    capturedOn: snapshot.importedOn,
    sourceUrl: snapshot.sourceUrl,
    vehiclePages,
    helmet: {
      slug: 'helmet', name: 'Helmets', sourceUrl: snapshot.sourceUrl, legacyPath: '',
      columns: ['Helmet type', 'Whole helmet'],
      rows: helmetRows.map((row) => [row.model || row.series, displayPair(row.prices.other.php)]),
      notes: [],
    },
    parts: {
      slug: 'parts', name: 'Other items', sourceUrl: snapshot.sourceUrl, legacyPath: '',
      items: otherRows.map((row) => ({
        category: row.series || 'Item',
        name: row.model,
        details: [`New ${row.prices.other.php.new} / Existing ${row.prices.other.php.existing}`],
      })),
      notes: [],
    },
  };
}

export async function writeGeneratedPricing(root, snapshot) {
  const catalog = buildPricingCatalog(snapshot);
  const outputDirectory = path.join(root, 'src', 'app', 'data', 'pricing-localized');
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });
  const entries = [...catalog.vehiclePages.map((page) => [page.slug, page]), ['helmet', catalog.helmet], ['parts', catalog.parts]];
  await Promise.all(entries.map(([slug, data]) => writeFile(path.join(outputDirectory, `${slug}.json`), `${JSON.stringify(data)}\n`, 'utf8')));
  const searchIndex = [
    ...catalog.vehiclePages.flatMap((page) => page.sections.flatMap((section) => section.rows.map((row) => ({
      key: `${page.slug}-${section.section}-${row.model}`,
      eyebrow: page.name,
      title: row.model,
      context: section.section,
      slug: page.slug,
      haystack: [page.name, page.group, section.section, ...section.courses, row.model, ...row.values].join(' ').toLocaleLowerCase(),
    })))),
    ...catalog.helmet.rows.map((row) => ({
      key: `helmet-${row[0]}`, eyebrow: 'Helmets', title: row[0], context: row.slice(1).join(' · '), slug: 'helmet',
      haystack: ['helmet', 'helmets', ...row].join(' ').toLocaleLowerCase(),
    })),
    ...catalog.parts.items.map((item) => ({
      key: `parts-${item.category}-${item.name}`, eyebrow: 'Other items', title: item.name, context: item.category, slug: 'parts',
      haystack: ['parts', 'other items', item.category, item.name, ...item.details].join(' ').toLocaleLowerCase(),
    })),
  ];
  await writeFile(path.join(root, 'src', 'app', 'data', 'pricing-search-index.json'), `${JSON.stringify(searchIndex)}\n`, 'utf8');
  return { catalog, entries, searchIndex };
}
