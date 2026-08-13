import { localizedPricingCatalog as pricingCatalog } from '@/app/lib/pricingLocalization';

export type IndexedPricingResult = {
  key: string;
  eyebrow: string;
  title: string;
  meta: string;
  slug: string;
  haystack: string;
};

const pricingSearchIndex: IndexedPricingResult[] = [
  ...pricingCatalog.vehiclePages.flatMap((page) =>
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
  ...pricingCatalog.helmet.rows.map((row) => ({
    key: `helmet-${row[0]}`,
    eyebrow: 'Helmets',
    title: row[0],
    meta: row.slice(1).join(' · '),
    slug: 'helmet',
    haystack: ['helmet', 'helmets', ...row].join(' ').toLocaleLowerCase(),
  })),
  ...pricingCatalog.parts.items.map((item) => ({
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

export function searchPricingIndex(query: string) {
  return pricingSearchIndex.filter((entry) => entry.haystack.includes(query)).slice(0, 60);
}
