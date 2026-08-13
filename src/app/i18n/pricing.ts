export const pricingTranslations = {
  en: {
    actions: {
      backToPriceList: 'Back to Price List',
      backToTop: 'Back to Top',
      clearSearch: 'Clear pricing search',
      clearDetailSearch: 'Clear detail search',
      officialSource: 'Official source',
    },
    labels: {
      category: 'Category',
      existingVehicle: 'Existing',
      modelOrVehicleType: 'Model / vehicle type',
      newVehicle: 'New',
      noExactMatch: 'No exact match yet',
      noMatchingPrices: 'No matching prices',
      priceList: 'Price List',
      pricing: 'pricing',
      unavailable: '—',
    },
    courses: {
      premium: 'Premium Course',
      full: 'Full Course',
      standard: 'Standard Course',
      exterior: 'Exterior Course',
      wheel: 'Wheel Course',
    },
    search: {
      overviewLabel: 'Search CR-1 pricing',
      overviewPlaceholder: 'Search brand, model, displacement, course…',
      detailPlaceholder: 'Filter models, displacement, prices, or courses…',
      pending: 'Searching price lists…',
      emptyHint: 'Check the spelling or try a broader brand, model family, displacement, or course name.',
      detailEmptyHint: 'Try a broader model, displacement, course, or price.',
    },
    loading: {
      priceList: 'Loading price list…',
      categoryPrefix: 'Loading',
      categorySuffix: 'prices…',
    },
  },
} as const;

export type PricingLanguage = keyof typeof pricingTranslations;
export const supportedPricingLanguages = Object.keys(pricingTranslations) as PricingLanguage[];
export const defaultPricingLanguage: PricingLanguage = 'en';

export function getPricingTranslations(language?: string) {
  return pricingTranslations[language as PricingLanguage] ?? pricingTranslations[defaultPricingLanguage];
}
