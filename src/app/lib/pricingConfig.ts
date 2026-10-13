export const PRICING_SOURCE_URL = 'https://docs.google.com/spreadsheets/u/1/d/1AFvyYyX8bCpL78iiivYXsRS0Y4IFl7lXketVnciG8yk/htmlview#gid=162625717';
export const PRICING_SOURCE_NAME = 'CR-1 Philippines master price list';
export const PRICING_SNAPSHOT_DATE = '13 October 2026';

export const pricingVehiclePages = [
  { slug: 'domestic', name: 'Domestic motorcycles', group: 'domestic' },
  { slug: 'ducati', name: 'DUCATI', group: 'imported' },
  { slug: 'can-am', name: 'BRP Can-Am', group: 'imported' },
  { slug: 'harley-davidson', name: 'HARLEY-DAVIDSON', group: 'imported' },
  { slug: 'mv-agusta', name: 'MV AGUSTA', group: 'imported' },
  { slug: 'bmw', name: 'BMW', group: 'imported' },
  { slug: 'ktm', name: 'KTM', group: 'imported' },
  { slug: 'triumph', name: 'TRIUMPH', group: 'imported' },
  { slug: 'aprilia', name: 'Aprilia', group: 'imported' },
  { slug: 'vespa', name: 'Vespa', group: 'imported' },
  { slug: 'moto-guzzi', name: 'MOTO GUZZI', group: 'imported' },
  { slug: 'husqvarna', name: 'Husqvarna', group: 'imported' },
  { slug: 'indian', name: 'Indian', group: 'imported' },
  { slug: 'royal-enfield', name: 'Royal Enfield', group: 'imported' },
] as const;

export const PRICING_TOTAL_ROWS = 234;
