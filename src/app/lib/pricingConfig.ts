export const JPY_TO_PHP_RATE = 0.3803;
export const JPY_TO_PHP_RATE_DATE = '16 July 2026';
export const JPY_TO_PHP_RATE_SOURCE = 'Bangko Sentral ng Pilipinas';

const jpyFormatter = new Intl.NumberFormat('en-JP', {
  style: 'currency',
  currency: 'JPY',
  maximumFractionDigits: 0,
});

const phpFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
});

function requireFiniteAmount(amount: number) {
  if (!Number.isFinite(amount)) {
    throw new TypeError('Currency amount must be a finite number.');
  }
}

/** Convert a JPY amount to a whole-peso estimate using the single configured rate. */
export function convertJPYToPHP(jpyAmount: number) {
  requireFiniteAmount(jpyAmount);
  return Math.round(jpyAmount * JPY_TO_PHP_RATE);
}

/** Format a JPY amount with a yen symbol and no fractional unit. */
export function formatJPY(jpyAmount: number) {
  requireFiniteAmount(jpyAmount);
  return jpyFormatter.format(Math.round(jpyAmount));
}

/** Format a PHP amount with a peso symbol and no centavos. */
export function formatPHP(phpAmount: number) {
  requireFiniteAmount(phpAmount);
  return phpFormatter.format(Math.round(phpAmount));
}

export const pricingVehiclePages = [
  { slug: 'domestic', name: 'Domestic motorcycles', group: 'domestic' },
  { slug: 'special', name: 'Special vehicles', group: 'special' },
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
  { slug: 'mutt', name: 'MUTT', group: 'imported' },
] as const;

export const PRICING_TOTAL_ROWS = 339;
