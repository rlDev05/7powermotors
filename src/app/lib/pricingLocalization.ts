import {
  pricingCatalog,
  type HelmetPricing,
  type PartsPricing,
  type VehiclePricingPage,
} from '@/app/data/pricing';
export { JPY_TO_PHP_RATE, JPY_TO_PHP_RATE_DATE, JPY_TO_PHP_RATE_SOURCE } from '@/app/lib/pricingMeta';
import { JPY_TO_PHP_RATE } from '@/app/lib/pricingMeta';

const pesoFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
});

const exactTranslations: Record<string, string> = {
  '1000cc以上': '1000cc and above',
  '750cc以上～999cc以下': '750cc–999cc',
  '400cc以上～749cc以下': '400cc–749cc',
  '125cc以上～399cc以下': '125cc–399cc',
  '124cc以下(原付1・2種)': '124cc and below (Class 1 and 2 mopeds)',
  '124cc以下': '124cc and below',
  'ネイキッド／クルーザー': 'Naked / Cruiser',
  'フルカウル': 'Full Fairing',
  'オフロード': 'Off-Road',
  'レジャー・ / ファミリー・ / ビジネス': 'Leisure / Family / Business',
  'スクーター': 'Scooter',
  '特別料金車両': 'Special-price vehicles',
  'HONDA / ゴールドウイング ツアー': 'Honda / Gold Wing Tour',
  'HONDA / ゴールドウイング': 'Honda / Gold Wing',
  'HONDA / ゴールドウイング F6B': 'Honda / Gold Wing F6B',
  'HONDA / ゴールドウイング F6C': 'Honda / Gold Wing F6C',
  'ジャイロキャノピー': 'Honda Gyro Canopy',
  '800シリーズ': '800 Series',
  '1100シリーズ': '1100 Series',
  'R 12(RnineTシリーズ)': 'R 12 (R nineT Series)',

  '表示価格はすべて税込価格です。': 'Published source prices include Japanese consumption tax.',
  '本料金表の価格は下限価格です。': 'All listed amounts are minimum prices.',
  'シート、純正装備のケース類は脱着し施工致します。': 'Seats and factory-installed cases are removed before application when required.',
  '表示価格に脱着料金は含まれておりません。(車種や仕様により、別途脱着工賃が発生する場合がございます）': 'Removal and refitting labor is not included. Additional labor may apply depending on the model and specification.',
  '錆び取り、小キズ消しなど、より高度な施工サービスを行う場合、別途追加料金が発生する場合がございます。': 'Advanced preparation such as rust removal or correction of minor marks may incur additional charges.',
  'スクーターコースはボディ塗装面全面とホイール・エンジン等の施工になります。': 'The scooter course covers painted body surfaces, wheels, the engine, and other approved areas.',
  'パーツ単体やケース類、部分施工をご希望の場合、別途20cm四方あたり2,200円（税込）の追加料金を頂戴致します。': 'Individual parts, cases, or partial applications carry an additional charge of ¥2,200 per 20 cm square area.',
  'パーツ単体やケース類、部分施工をご希望の場合、別途20cm四方あたり2,200円（税込）の追加料金を頂戴致します': 'Individual parts, cases, or partial applications carry an additional charge of ¥2,200 per 20 cm square area.',
  'フルカウル車両で、サイドカウル・アンダーカウルを脱着してエンジン施工をご希望の場合は、別途 16,500円（税込）～の追加料金を頂戴致します。': 'For full-fairing motorcycles, removing the side and lower cowls for engine application carries an additional charge from ¥16,500.',
  'フルカウル車両で、サイドカウル・アンダーカウルを脱着してエンジン施工をご希望の場合は、別途 16,500円（税込）～の追加料金がかかります。': 'For full-fairing motorcycles, removing the side and lower cowls for engine application carries an additional charge from ¥16,500.',
  'フロントカウルを脱着し施工する場合は別途 16,500円（税込）～の追加料金がかかります。': 'Removing the front cowl for application carries an additional charge from ¥16,500.',
  'ホイールコースは前後2本の施工料金を表示しています。前後どちらか1本の場合、新車・既販車共に表示価格の半額となります。': 'Wheel Course prices cover both front and rear wheels. One wheel costs half the listed amount for both new and existing vehicles.',
  '修理の必要な（オイル漏れ等）車両は必ず事前にご相談ください。': 'Contact the shop in advance if the vehicle requires repair, including oil-leak repairs.',
  '修理の必要な（オイル漏れ等）車両は必ず事前にご相談ください': 'Contact the shop in advance if the vehicle requires repair, including oil-leak repairs.',
  '修理の必要な（オイル漏れ等）車両は、事前にご相談ください。': 'Contact the shop in advance if the vehicle requires repair, including oil-leak repairs.',
  'サイドカー付き車両、本料金表に記載のない車種の施工料金は別途お問い合わせください。': 'Request a separate quotation for sidecar-equipped vehicles and models not listed here.',
  '高温になる箇所の焼け・錆を完全に防ぐものではありません。': 'The coating does not completely prevent heat discoloration or rust on high-temperature areas.',
  '施工箇所の腐食・錆が著しい車両は、施工による効果が発揮されない場合があります。': 'Results may be limited when the application area has severe corrosion or rust.',
  '腐食や錆の状態が著しい車両は、施工による効果が得られない場合があります。': 'Results may be limited when the vehicle has severe corrosion or rust.',
  '料金表に掲載のない旧型車は別途ご相談ください。': 'Request a separate quotation for older models not listed here.',
  '新型モデル発売時は料金を変更する場合があります。': 'Prices may change when new models are released.',
  '新型モデル発売時は料金を変更する場合があります': 'Prices may change when new models are released.',
  '製造から数十年以上経過した旧年式モデルの施工はお受けできない場合がございます。事前に施工店へご相談ください': 'Some decades-old models may not be eligible for service. Consult the application shop in advance.',
  'フルカウル車両で、サイドカウル・アンダーカウルを脱着してエンジン施工をご希望の場合は、別途 16,500円（税込）～の追加料金がかかります。 パーツ単体やケース類、部分施工をご希望の場合、別途20cm四方あたり2,200円（税込）の追加料金を頂戴致します。': 'For full-fairing motorcycles, removing the side and lower cowls for engine application carries an additional charge from ¥16,500. Individual parts, cases, or partial applications carry an additional charge of ¥2,200 per 20 cm square area.',

  '種別': 'Helmet type',
  '全体': 'Complete helmet',
  '帽体のみ': 'Shell only',
  'シールドのみ': 'Visor only',
  'ゴーグル': 'Goggles',
  'フルフェイス / ジェット': 'Full-Face / Open-Face',
  'スモールジェット': 'Small Open-Face',
  '半帽・セミジェット': 'Half Helmet / Semi-Jet',
  'フルフェイス・ジェットヘルメット全体の施工と同時に、追加でシールドを施工する場合、1,100円(税込)/1枚となります。': 'When adding an extra visor during a complete full-face or open-face helmet service, the additional charge is ¥1,100 per visor.',
  'お買い上げ時の塗装以外にハンドペイント等をされている場合、施工できない事があります。': 'Application may not be possible on hand-painted or non-original painted surfaces.',
  'シールド表面に撥水剤や塗料等を塗っている場合、施工できない事があります。': 'Application may not be possible when water repellent, paint, or another treatment is present on the visor.',
  'シールドはクリアとスモークのみ可能となります。加工されているものは施工できません。': 'Only clear and smoked visors are eligible. Modified visors cannot be treated.',
  '帽体表面が極端に劣化している場合、施工できない事があります。': 'Application may not be possible when the helmet shell is severely deteriorated.',
  '小キズ消しなど、より高度な施工サービスを行う場合、別途追加料金が発生する場合がございます。': 'Advanced preparation such as correcting minor marks may incur additional charges.',
  '本料金表の使用中価格は下限価格です。': 'Existing-item amounts in this list are minimum prices.',

  'カウル・ヘッドライト等': 'Bodywork, Cowls & Lighting',
  '外装・カウル全般': 'Exterior Panels / General Cowls',
  '20cm四方': '20 cm square area',
  '※スクリーン・ヘッドライトは料金別途': 'Windshield and headlight prices are separate.',
  'ビキニカウル': 'Bikini Cowl',
  '※スクリーンは料金別途': 'Windshield price is separate.',
  'ヘッドライト': 'Headlight',
  '1灯 3,300円～': '1 headlight · from ¥3,300',
  '2灯 5,500円～': '2 headlights · from ¥5,500',
  '燃料タンク': 'Fuel Tank',
  '前後長700㎜以下 16,500円～': 'Overall length 700 mm or less · from ¥16,500',
  '前後長700㎜以上 19,800円～': 'Overall length 700 mm or more · from ¥19,800',
  'サイドミラー': 'Side Mirror',
  '2,200円～ × 個数': 'From ¥2,200 × quantity',
  'ハンドル': 'Handlebar',
  'バーハンドル・セパレートハンドル': 'Tubular or clip-on handlebar',
  'スクリーン': 'Windshield',
  '※1 ミラー加工のものは施工不可': 'Mirror-finish windshields cannot be treated.',
  '※2 表面のみ施工': 'Outer surface only.',
  'フロント足周り': 'Front Suspension & Brake Components',
  'フロントフォーク': 'Front Fork',
  'OHLINS等、キャリパーサポートが付属する場合は同時に施工': 'Caliper supports supplied with Öhlins or similar components are treated at the same time.',
  '※摺動部は施工致しません': 'Sliding surfaces are not treated.',
  'ディスクローター': 'Brake Disc / Rotor',
  '1枚 4,400円～': 'Per disc · from ¥4,400',
  '※アウターローター（摩耗面）は 施工致しません': 'The outer rotor wear surface is not treated.',
  'キャリパー': 'Brake Caliper',
  '1個 5,500円～': 'Per caliper · from ¥5,500',
  '※形状問わず一律上記の料金': 'The listed price applies regardless of shape.',
  'フロントフェンダー': 'Front Fender',
  'リア足周り': 'Rear Suspension & Drivetrain Components',
  'ツインショック': 'Twin Shocks',
  'モノショック（別体タンク無）': 'Monoshock (without remote reservoir)',
  'モノショック（別体タンク有）': 'Monoshock (with remote reservoir)',
  'スプロケット': 'Sprocket',
  '1枚 4,400円': 'Per sprocket · ¥4,400',
  '※摩耗面は施工致しません': 'Wear surfaces are not treated.',
  'スタンド': 'Stand',
  'サイドスタンド 2,200円': 'Side stand · ¥2,200',
  'センタースタンド 3,850円': 'Center stand · ¥3,850',
  'スイングアーム 4ミニ 小排気量車 純正品等': 'Swingarm — Mini / Small-Displacement / Factory Part',
  '※小排気量：150cc未満': 'Small displacement means under 150cc.',
  'スイングアーム 社外品': 'Swingarm — Aftermarket Part',
  '※ウイリー・OVER等、純正でもポリッシュはこちら': 'Use this category for polished parts, including Wheelie, OVER, and polished factory parts.',
  'リアフェンダー': 'Rear Fender',
  'エンジン周り': 'Engine Area',
  '50～124cc 16,500円～': '50cc–124cc · from ¥16,500',
  '125～749cc 27,500円～': '125cc–749cc · from ¥27,500',
  '750cc以上 33,000円～': '750cc and above · from ¥33,000',
  'エキゾーストパイプ': 'Exhaust Pipe / Header',
  '7,700円～ × 本数': 'From ¥7,700 × quantity',
  'サイレンサー': 'Muffler / Silencer',
  '1本 16,500円～': 'Per unit · from ¥16,500',
  'ナンバープレートその他': 'License Plate & Other Components',
  'ナンバープレート': 'License Plate',
  'シーシーバー': 'Sissy Bar',
  'テールランプ': 'Tail Light',
  '※ウィンカーは料金別途': 'Turn-signal prices are separate.',
  'ウィンカー': 'Turn Signal',
  '1,650円 × 個数': '¥1,650 × quantity',
  'ホイール': 'Wheel',
  '1本 12,100円～': 'Per wheel · from ¥12,100',
};

const containsJapanese = (value: string) => /[\u3040-\u30ff\u3400-\u9fff々]/.test(value);

function convertYenAmounts(value: string) {
  return value.replace(/(?:￥|¥)([\d,]+)|([\d,]+)円/g, (match, prefixed, suffixed) => {
    const yenText = prefixed ?? suffixed;
    if (!yenText) return match;
    const yen = Number(yenText.replace(/,/g, ''));
    return pesoFormatter.format(Math.round(yen * JPY_TO_PHP_RATE));
  });
}

export function localizePricingText(value: string) {
  if (!value || value === '-') return value;

  const original = value.trim();
  let localized = exactTranslations[original] ?? original;

  localized = localized
    .replace(/\s*\/\s*\[[^\]]*[\u3040-\u30ff\u3400-\u9fff][^\]]*\]/g, '')
    .replace(/([\d,]+)cc以上～([\d,]+)cc以下/g, '$1cc–$2cc')
    .replace(/([\d,]+)cc以上/g, '$1cc and above')
    .replace(/([\d,]+)cc以下/g, '$1cc and below')
    .replace(/([\d,]+)cc未満/g, 'under $1cc')
    .replace(/シリーズ/g, ' Series')
    .replace(/／/g, ' / ')
    .replace(/・/g, ' / ')
    .replace(/Gｌide/g, 'Glide')
    .replace(/Brakeout/g, 'Breakout')
    .replace(/Night Ster/g, 'Nightster');

  localized = convertYenAmounts(localized)
    .replace(/(₱[\d,]+)～/g, '$1+')
    .replace(/(₱[\d,]+)\+/g, 'from $1')
    .replace(/from from /g, 'from ')
    .replace(/\s+\/\s+/g, ' / ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (containsJapanese(localized)) {
    return localized;
  }

  return localized;
}

function localizeVehiclePage(page: VehiclePricingPage): VehiclePricingPage {
  return {
    ...page,
    sections: page.sections.map((section) => ({
      ...section,
      section: localizePricingText(section.section),
      rows: section.rows.map((row) => ({
        ...row,
        model: localizePricingText(row.model),
        values: row.values.map(localizePricingText),
      })),
    })),
    notes: page.notes.map(localizePricingText),
  };
}

export function getLocalizedVehiclePage(slug: string) {
  const page = pricingCatalog.vehiclePages.find((candidate) => candidate.slug === slug);
  return page ? localizeVehiclePage(page) : undefined;
}

export function getLocalizedHelmet(): HelmetPricing {
  return {
    ...pricingCatalog.helmet,
    columns: pricingCatalog.helmet.columns.map(localizePricingText),
    rows: pricingCatalog.helmet.rows.map((row) => row.map(localizePricingText)),
    notes: pricingCatalog.helmet.notes.map(localizePricingText),
  };
}

export function getLocalizedParts(): PartsPricing {
  return {
    ...pricingCatalog.parts,
    items: pricingCatalog.parts.items.map((item) => ({
      ...item,
      category: localizePricingText(item.category),
      name: localizePricingText(item.name),
      details: item.details.map(localizePricingText),
    })),
    notes: pricingCatalog.parts.notes.map(localizePricingText),
  };
}

/** Build the full dataset only when the overview's cross-catalog search is used. */
export function getLocalizedPricingCatalog() {
  return {
    ...pricingCatalog,
    generatedFrom: 'Official CR-1 Japan price list — English display with PHP estimates',
    vehiclePages: pricingCatalog.vehiclePages.map(localizeVehiclePage),
    helmet: getLocalizedHelmet(),
    parts: getLocalizedParts(),
  };
}
