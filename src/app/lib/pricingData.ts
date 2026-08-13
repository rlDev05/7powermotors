import type { HelmetPricing, PartsPricing, VehiclePricingPage } from '@/app/data/pricing';

export type LocalizedPricingData = VehiclePricingPage | HelmetPricing | PartsPricing;

const pricingLoaders = import.meta.glob<LocalizedPricingData>(
  '../data/pricing-localized/*.json',
  { import: 'default' },
);

const loaderBySlug = Object.fromEntries(
  Object.entries(pricingLoaders).map(([path, loader]) => [
    path.slice(path.lastIndexOf('/') + 1, -'.json'.length),
    loader,
  ]),
) as Record<string, () => Promise<LocalizedPricingData>>;

const dataPromises = new Map<string, Promise<LocalizedPricingData>>();

export function loadLocalizedPricingData(slug: string) {
  const loader = loaderBySlug[slug];
  if (!loader) return undefined;
  const existing = dataPromises.get(slug);
  if (existing) return existing;
  const promise = loader();
  dataPromises.set(slug, promise);
  return promise;
}
