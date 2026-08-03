export const cr1SocialLinks = {
  instagram:
    'https://www.instagram.com/cr1.philippines?igsh=aXJlM2VybGxlMjhh&utm_source=qr',
  facebook:
    'https://www.facebook.com/profile.php?id=61591317940529&mibextid=wwXIfr',
  tiktok: 'https://www.tiktok.com/@cr1.philippines?_r=1&_t=ZS-97fBddCaWdV',
};

export type Cr1Location = {
  id: string;
  label: 'Distributor' | 'Flagship Dealer';
  name: string;
  address: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  mapUrl: string;
  mapEmbedUrl: string;
  websiteUrl?: string;
};

const distributorLocation: Cr1Location = {
  id: '7power-motors-makati',
  label: 'Distributor',
  name: '7Power Motors',
  address: '9 J. Cimaco Street, Makati City, Metro Manila',
  city: 'Makati City',
  region: 'Metro Manila',
  latitude: 14.5404672,
  longitude: 121.0120796,
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=7%20Power%20Motors%209%20J.%20Cimaco%20Makati%20City',
  mapEmbedUrl:
    'https://www.google.com/maps?q=7%20Power%20Motors%209%20J.%20Cimaco%20Makati%20City&output=embed',
};

const flagshipDealerLocation: Cr1Location = {
  id: 'import-hauz-makati',
  label: 'Flagship Dealer',
  name: 'Import Hauz',
  address: '4487 Calhoun Street, Makati City, Metro Manila',
  city: 'Makati City',
  region: 'Metro Manila',
  latitude: 14.5489294,
  longitude: 121.0106341,
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Import%20Hauz%204487%20Calhoun%20Street%20Makati',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Import%20Hauz%204487%20Calhoun%20Street%20Makati&output=embed',
  websiteUrl: 'https://importhauz.com/pages/contact',
};

export const cr1Locations: Cr1Location[] = [
  distributorLocation,
  flagshipDealerLocation,
];

export const cr1Contact = {
  phoneLabel: '+63 7POWER',
  phoneHref: 'tel:+63',
  email: 'cr1.philippines@gmail.com',
  distributor: distributorLocation,
  flagshipDealer: flagshipDealerLocation,
};
