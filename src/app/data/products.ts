import disinfectionWipes from '@/styles/images/products/disinfection-wipes.webp';
import wheelWipes from '@/styles/images/products/wheel-wipes.webp';
import bodyHelmetWipes from '@/styles/images/products/body-helmet-wipes.webp';
import handOilRemover from '@/styles/images/products/hand-oil-remover.webp';
import leatherWipes from '@/styles/images/products/leather-wipes.webp';
import wipeupMitten from '@/styles/images/products/wipeup-mitten.webp';
import amazingCloth from '@/styles/images/products/amazing-cloth.webp';
import chainDegreaser from '@/styles/images/products/chain-degreaser.webp';
import bikeCoverHalf from '@/styles/images/products/bike-cover-half.webp';
import bikeCoverFull from '@/styles/images/products/bike-cover-full.webp';

export interface CareProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  summary: string;
  uses: string[];
}

export const careProducts: CareProduct[] = [
  {
    id: 'disinfection-wipes',
    name: 'Motorcycle Disinfection Wipes',
    category: 'Quick Cloth',
    image: disinfectionWipes,
    summary: 'Quick-use wipes for everyday rider touch points and light cleaning.',
    uses: ['Hands-on areas', 'Seat and controls', 'Daily ride reset'],
  },
  {
    id: 'wheel-wipes',
    name: 'Wheel & Foot-Bar Wipes',
    category: 'Quick Cloth',
    image: wheelWipes,
    summary: 'Convenient cloths for oily, dusty, and high-contact lower sections.',
    uses: ['Wheels', 'Foot controls', 'Road grime'],
  },
  {
    id: 'body-helmet-wipes',
    name: 'Body & Helmet Wipes',
    category: 'Quick Cloth',
    image: bodyHelmetWipes,
    summary: 'A fast wipe-down option for painted bodywork and helmet surfaces.',
    uses: ['Body panels', 'Helmet shell', 'Gloss refresh'],
  },
  {
    id: 'hand-oil-remover',
    name: 'Hand Oil Remover Wipes',
    category: 'Rider Care',
    image: handOilRemover,
    summary: 'Cleaning wipes made for stubborn oil and work residue after maintenance.',
    uses: ['Hands', 'Oil marks', 'Tool work'],
  },
  {
    id: 'leather-wipes',
    name: 'Leather Care Wipes',
    category: 'Rider Care',
    image: leatherWipes,
    summary: 'Care wipes for jackets, boots, and riding leather accessories.',
    uses: ['Jackets', 'Boots', 'Leather gear'],
  },
  {
    id: 'wipeup-mitten',
    name: 'WipeUp Mitten',
    category: 'Microfiber',
    image: wipeupMitten,
    summary: 'Soft mitten cloth for quick surface touch-ups and gentle wipe-downs.',
    uses: ['Paintwork', 'Tank area', 'Soft wiping'],
  },
  {
    id: 'amazing-cloth',
    name: 'Amazing Cloth',
    category: 'Microfiber',
    image: amazingCloth,
    summary: 'Plush cloth for finish care, drying, and delicate surface work.',
    uses: ['Drying', 'Polishing', 'Finish care'],
  },
  {
    id: 'chain-degreaser',
    name: 'Chain Degreaser',
    category: 'Maintenance',
    image: chainDegreaser,
    summary: 'Spray cleaner for chain and drivetrain maintenance routines.',
    uses: ['Chain care', 'Degreasing', 'Maintenance prep'],
  },
  {
    id: 'bike-cover-half',
    name: 'Half Motorcycle Cover',
    category: 'Protection',
    image: bikeCoverHalf,
    summary: 'Compact cover option for quick protection during storage or parking.',
    uses: ['Seat cover', 'Tank cover', 'Parking protection'],
  },
  {
    id: 'bike-cover-full',
    name: 'Full Motorcycle Cover',
    category: 'Protection',
    image: bikeCoverFull,
    summary: 'Full-coverage motorcycle cover for stronger storage protection.',
    uses: ['Full bike cover', 'Garage storage', 'Weather shield'],
  },
];
