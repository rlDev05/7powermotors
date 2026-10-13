export type CourseKey = 'premium' | 'full' | 'standard' | 'exterior' | 'wheel';

export interface VehiclePricingRow {
  model: string;
  values: string[];
}

export interface VehiclePricingSection {
  section: string;
  courses: CourseKey[];
  rows: VehiclePricingRow[];
}

export interface VehiclePricingPage {
  slug: string;
  name: string;
  group: 'domestic' | 'imported';
  sourceUrl: string;
  legacyPath: string;
  sections: VehiclePricingSection[];
  notes: string[];
}

export interface HelmetPricing {
  slug: 'helmet';
  name: string;
  sourceUrl: string;
  legacyPath: string;
  columns: string[];
  rows: string[][];
  notes: string[];
}

export interface PartPricingItem {
  category: string;
  name: string;
  details: string[];
}

export interface PartsPricing {
  slug: 'parts';
  name: string;
  sourceUrl: string;
  legacyPath: string;
  items: PartPricingItem[];
  notes: string[];
}
