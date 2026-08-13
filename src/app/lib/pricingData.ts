import type { HelmetPricing, PartsPricing, VehiclePricingPage } from '@/app/data/pricing';

export type LocalizedPricingData = VehiclePricingPage | HelmetPricing | PartsPricing;

const loaderBySlug: Record<string, () => Promise<LocalizedPricingData>> = {
  domestic: () => import('../data/pricing-localized/domestic.json').then((module) => module.default),
  special: () => import('../data/pricing-localized/special.json').then((module) => module.default),
  ducati: () => import('../data/pricing-localized/ducati.json').then((module) => module.default),
  'can-am': () => import('../data/pricing-localized/can-am.json').then((module) => module.default),
  'harley-davidson': () => import('../data/pricing-localized/harley-davidson.json').then((module) => module.default),
  'mv-agusta': () => import('../data/pricing-localized/mv-agusta.json').then((module) => module.default),
  bmw: () => import('../data/pricing-localized/bmw.json').then((module) => module.default),
  ktm: () => import('../data/pricing-localized/ktm.json').then((module) => module.default),
  triumph: () => import('../data/pricing-localized/triumph.json').then((module) => module.default),
  aprilia: () => import('../data/pricing-localized/aprilia.json').then((module) => module.default),
  vespa: () => import('../data/pricing-localized/vespa.json').then((module) => module.default),
  'moto-guzzi': () => import('../data/pricing-localized/moto-guzzi.json').then((module) => module.default),
  husqvarna: () => import('../data/pricing-localized/husqvarna.json').then((module) => module.default),
  indian: () => import('../data/pricing-localized/indian.json').then((module) => module.default),
  'royal-enfield': () => import('../data/pricing-localized/royal-enfield.json').then((module) => module.default),
  mutt: () => import('../data/pricing-localized/mutt.json').then((module) => module.default),
  helmet: () => import('../data/pricing-localized/helmet.json').then((module) => module.default),
  parts: () => import('../data/pricing-localized/parts.json').then((module) => module.default),
};

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
