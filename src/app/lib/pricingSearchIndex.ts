import pricingSearchIndex from '@/app/data/pricing-search-index.json';

export type IndexedPricingResult = {
  key: string;
  eyebrow: string;
  title: string;
  context: string;
  slug: string;
  haystack: string;
};

export function searchPricingIndex(query: string) {
  return (pricingSearchIndex as IndexedPricingResult[])
    .filter((entry) => entry.haystack.includes(query))
    .slice(0, 60);
}
