import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const outputDirectory = path.join(root, 'src', 'app', 'data', 'pricing-localized');
const server = await createServer({ root, server: { middlewareMode: true }, appType: 'custom' });

try {
  const { getLocalizedPricingCatalog } = await server.ssrLoadModule('/src/app/lib/pricingLocalization.ts');
  const catalog = getLocalizedPricingCatalog();

  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });

  const entries = [
    ...catalog.vehiclePages.map((page) => [page.slug, page]),
    ['helmet', catalog.helmet],
    ['parts', catalog.parts],
  ];

  await Promise.all(entries.map(([slug, data]) =>
    writeFile(path.join(outputDirectory, `${slug}.json`), `${JSON.stringify(data)}\n`, 'utf8'),
  ));

  const searchIndex = [
    ...catalog.vehiclePages.flatMap((page) =>
      page.sections.flatMap((section) =>
        section.rows.map((row) => ({
          key: `${page.slug}-${section.section}-${row.model}`,
          eyebrow: page.name,
          title: row.model,
          meta: section.section,
          slug: page.slug,
          haystack: [page.name, page.group, section.section, ...section.courses, row.model, ...row.values]
            .join(' ')
            .toLocaleLowerCase(),
        })),
      ),
    ),
    ...catalog.helmet.rows.map((row) => ({
      key: `helmet-${row[0]}`,
      eyebrow: 'Helmets',
      title: row[0],
      meta: row.slice(1).join(' · '),
      slug: 'helmet',
      haystack: ['helmet', 'helmets', ...row].join(' ').toLocaleLowerCase(),
    })),
    ...catalog.parts.items.map((item) => ({
      key: `parts-${item.category}-${item.name}`,
      eyebrow: 'Individual parts',
      title: item.name,
      meta: item.category,
      slug: 'parts',
      haystack: ['parts', 'individual parts', 'components', item.category, item.name, ...item.details]
        .join(' ')
        .toLocaleLowerCase(),
    })),
  ];

  await writeFile(
    path.join(root, 'src', 'app', 'data', 'pricing-search-index.json'),
    `${JSON.stringify(searchIndex)}\n`,
    'utf8',
  );

  console.log(`Generated ${entries.length} localized pricing chunks and ${searchIndex.length} search records.`);
} finally {
  await server.close();
}
