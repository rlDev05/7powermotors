// 1. Define new interfaces for the detailed specs and colors
export interface BikeSpecs {
  releaseDate?: string;
  engineType: string;
  displacement?: string; 
  maxPower?: string;     
  maxTorque?: string;
  boreAndStroke?: string;
  compressionRatio?: string;
  induction?: string;
  ignition?: string;
  transmission: string;
  finalDrive?: string; 
  clutch?: string; 
  suspensionFront?: string;
  suspensionRear?: string;
  brakesFront?: string;
  brakesRear?: string; 
  tiresFront?: string; 
  tiresRear?: string; 
  rake?: string; 
  trail?: string; 
  wheelbase?: string; 
  seatHeight: string;
  curbWeight?: string; 
  fuelCapacity: string;
  // Added features array to handle extra info like "Apple Carplay", "Cruise Control" etc.
  features?: string[]; 
  dimensions?: string;
  weight?: string;
  engine?: string; 
  maxOutput?: string; 
  brakes?: string; 
  tires?: string; 
}
  
  export interface BikeColor {
    name: string;
    image: string;
  }
  
  // 2. Update the main Bike interface
export interface Bike {
    id: string;
    name: string;
    category: string; 
    price: number;
    image: string;
    specs?: BikeSpecs; 
    colors?: BikeColor[];
    view360?: string[] | { type: 'sketchfab'; src: string };
    availability?: string;
  }

const imageAssets = import.meta.glob('/src/styles/images/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function resolveImage(path: string) {
  return imageAssets[path] ?? path;
}

function resolveBikeAssets(bike: Bike): Bike {
  const view360 = Array.isArray(bike.view360)
    ? bike.view360.map(resolveImage)
    : bike.view360;

  return {
    ...bike,
    image: resolveImage(bike.image),
    view360,
    colors: bike.colors?.map((color) => ({
      ...color,
      image: resolveImage(color.image),
    })),
  };
}
  
  const rawBikes: Bike[] = [
    {
      id: '1',
      name: 'HONDA MONKEY 125',
      category: 'small-bike',
      price: 1500,
      // Default image
      image: '/src/styles/images/featured/variantmonkey/monkeywhitered.png',
      view360: [
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-1.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-2.png', // Just for testing rotation
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-3.png',// Just for testing rotation
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-4.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-5.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-6.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-7.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-8.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-9.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-10.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-12.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-13.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-14.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-15.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-16.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-17.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-18.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-19.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-20.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-21.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-22.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-23.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-24.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-25.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-26.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-27.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-28.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-29.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-30.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-31.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-32.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-33.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-34.png',
        '/src/styles/images/featured/variantmonkey/red360/2025-monkey-abs-red-360-35.png',
     ],
      
      // 3. Attached Color Variants
      colors: [
        {
          name: 'Pearl Nebula Red', 
          image: '/src/styles/images/featured/variantmonkey/monkeywhitered.png'
        },
        {
          name: 'Pearl Shining Black', 
          image: '/src/styles/images/featured/variantmonkey/monkeyblack.png'
        },
        {
          name: 'Pearl Glittering Blue', 
          image: '/src/styles/images/featured/variantmonkey/monkeywhite.png'
        }
      ],
  
      // 4. Attached Full Specifications
      specs: {
        releaseDate: '2025',
        engineType: '124.9cc air-cooled single-cylinder four-stroke',
        boreAndStroke: '52.4mm x 57.9mm',
        compressionRatio: '9.3:1',
        induction: 'PGM-FI with automatic enrichment',
        ignition: 'Fully transistorized',
        transmission: '4 Speed',
        finalDrive: 'Chain',
        clutch: 'Multiplate Wet',
        suspensionFront: '31mm inverted fork; 3.9 inches of travel',
        suspensionRear: 'Twin shock; 4.1 inches of travel',
        brakesFront: 'Single 220mm hydraulic disc, ABS',
        brakesRear: 'Single 190mm hydraulic disc',
        tiresFront: '120/80-12',
        tiresRear: '130/80-12',
        rake: '25 deg',
        trail: '3.2 inches',
        wheelbase: '45.5 inches',
        seatHeight: '30.6 inches',
        curbWeight: '235.9 pounds',
        fuelCapacity: '1.5 gallons'
      }
    },
    {
        id: '2',
        name: 'HONDA SUPER CUB 125',
        category: 'small-bike',
        price: 1600,
        image: '/src/styles/images/featured/variantcub/cubgrey.png',
        view360: {
          type: 'sketchfab',
          src: 'https://sketchfab.com/models/c30761fb6be446bd86b4ecef26e4ce8e/embed'
        },
        colors: [
          {
            name: 'Pearl Gray',
            image: '/src/styles/images/featured/variantcub/cubgrey.png'
          },
          {
            name: 'Pearl Nitava Blue',
            image: '/src/styles/images/featured/variantcub/cubwhite.png'
          }
        ],
        specs: {
            releaseDate: '2025',
            engineType: '124cc air-cooled single-cylinder four-stroke',
            boreAndStroke: '50.0mm x 63.0mm',
            compressionRatio: '10.0:1',
            induction: 'PGM-FI with automatic enrichment',
            ignition: 'Fully transistorized',
            transmission: '4-speed',
            finalDrive: '#420 Chain; 14T/36T',
            clutch: 'Semi-automatic centrifugal',
            suspensionFront: '26mm telescopic fork; 3.9 inches travel',
            suspensionRear: 'Twin shock; 3.6 inches travel',
            brakesFront: 'Single 220mm hydraulic disc; ABS',
            brakesRear: 'Mechanical drum (110mm)',
            tiresFront: '70/90-17',
            tiresRear: '80/90-17',
            rake: '26.0 deg',
            trail: '2.8 inches',
            wheelbase: '48.9 inches',
            seatHeight: '30.7 inches',
            curbWeight: '238 pounds',
            fuelCapacity: '1.0 gallons'
          }
      },
      {
        id: '3',
        name: 'HONDA DAX 125',
        category: 'small-bike',
        price: 5000,
        image: '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-0.png', 
        view360: [ 
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-1.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-2.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-3.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-4.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-5.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-6.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-7.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-8.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-9.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-10.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-11.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-12.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-13.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-14.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-15.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-16.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-17.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-18.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-19.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-20.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-21.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-22.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-23.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-24.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-25.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-26.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-27.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-28.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-29.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-30.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-31.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-32.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-33.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-34.png',
            '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-35.png',

        ],
        colors: [
          {
            name: 'Pearl Gray',
            // Assuming you might have a grey image later, using current image as placeholder or you can update path
            image: '/src/styles/images/featured/variantdaks/2025-dax-125-pearl_glittering_blue-360-1.png', 
          },
        ],
  
        specs: {
          releaseDate: '2025',
          engineType: '124cc air-cooled single-cylinder four-stroke',
          boreAndStroke: '50.0mm x 63.1mm',
          compressionRatio: '10.0:1',
          induction: 'Programmed Fuel-Injection system (PGM-FI); 24mm throttle body',
          ignition: 'Fully transistorized', // Standard for this engine class
          transmission: 'Four-speed semi-automatic',
          finalDrive: '#420 Chain; 15T/34T',
          clutch: 'Automatic centrifugal', // Implied by semi-automatic transmission
          suspensionFront: '31mm inverted fork; 4.3-inch travel',
          suspensionRear: 'Dual shocks; 4.7-inch travel',
          brakesFront: 'Single 220mm hydraulic disc; ABS',
          brakesRear: 'Single 190mm disc',
          tiresFront: '120/70-12',
          tiresRear: '130/70-12',
          rake: '25.0 deg',
          trail: '3.3 inches',
          wheelbase: '47.2 inches',
          seatHeight: '30.6 inches',
          curbWeight: '236 pounds',
          fuelCapacity: '1.0 gallon'
        }
      },
      {
        id: '4',
        name: 'HONDA SUPER CUB 50/110',
        category: 'small-bike',
        price: 5000,
        image: '/src/styles/images/featured/variantkitty/hellokitty50.png',

        colors: [
            {
              name: 'hello kitty 50',
              // Assuming you might have a grey image later, using current image as placeholder or you can update path
              image: '/src/styles/images/featured/variantkitty/hellokitty50.png', 
            },
            {
                name: 'hello kitty 110',
                // Assuming you might have a grey image later, using current image as placeholder or you can update path
                image: '/src/styles/images/featured/variantkitty/hellokitty110.png', 
              },
        ],
        specs: {
          dimensions: '1860 x 695 x 1040 mm',
          wheelbase: '1210mm',
          seatHeight: '735mm',
          weight: '96kg',
          engine: 'Air-cooled 4-stroke SOHC Single-cylinder 49cc',
          maxOutput: '2.7kW (3.7PS)/7500rpm',
          maxTorque: '3.8Nm (0.39kgm)/5500rpm',
          fuelCapacity: '4.3L',
          transmission: '4-speed Return (Rotary when Stopped)',
          brakes: 'F=disc, R=drum',
          tires: 'F=60/100-17, R=60/100-17M/C',
        },
      },
      {
        id: '9',
        name: 'VESPA 946 DRAGON',
        category: 'small-bike',
        price: 12000,
        image: '/src/styles/images/featured/variantvespa/dragon1.png',
  
        // Updated strict specifications based on your input
        specs: {
          releaseDate: '2024',
          engineType: '155cc Single cylinder, 4-stroke, 3-valve, SOHC, Air-cooled',
          // boreAndStroke: '', // Not provided in text
          // compressionRatio: '', // Not provided in text
          induction: 'Injection',
          ignition: 'Electric',
          transmission: 'Automatic CVT',
          finalDrive: 'Belt',
          clutch: 'CVT',
          suspensionFront: 'Single arm with coil spring and single shock absorber',
          suspensionRear: 'Single hydraulic shock absorber (preload adjustable 5 pos)',
          brakesFront: 'Double disc 220 mm, ABS',
          brakesRear: 'Double disc 220 mm, ABS',
          tiresFront: '120/70-12',
          tiresRear: '130/70-12',
          rake: '', // Not provided in text
          trail: '', // Not provided in text
          wheelbase: '', // Not provided in text
          seatHeight: '805 mm (31.7 inches)',
          curbWeight: '', // Not provided in text (Standard is ~150kg)
          fuelCapacity: '8.00 litres (2.11 US gallons)'
        },
  
        colors: [
          {
            name: 'Silver/Green', // Updated based on "Color options" from your text
            image: '/src/styles/images/featured/variantvespa/dragon1.png',
          },
          {
            name: '',
            image: '/src/styles/images/featured/variantvespa/dragon2.png',
          },
          {
            name: '',
            image: '/src/styles/images/featured/variantvespa/dragon3.png',
          },
          {
            name: '',
            image: '/src/styles/images/featured/variantvespa/dragon4.png',
          },
        ],
      },
      {
        id: '6',
        name: 'HONDA CB1000F / CB1000F SE',
        category: 'naked',
        price: 12000,
        image: '/src/styles/images/featured/variantcb1000/honda-cb1000f2.png',
        view360: {
          type: 'sketchfab',
          src: 'https://sketchfab.com/models/55152865777a48589110b731de593089/embed'
        },
        colors: [
          {
            name: 'CB1000F ',
            image: '/src/styles/images/featured/variantcb1000/honda-cb1000f2.png',
          },
          {
            name: 'CB1000F SE Wolf Silver Metallic (Blue Stripe)',
            image: '/src/styles/images/featured/variantcb1000/honda-cb-1000fSE2.png',
          },
          {
            name: 'CB1000F Wolf Silver Metallic (Blue Stripe)',
            image: '/src/styles/images/featured/variantcb1000/honda-cb1000f1.png',
          },
          {
            name: 'Wolf Silver Metallic (Gray Stripe)',
            image: '/src/styles/images/featured/variantcb1000/honda-cb1000f.png',
          },
        ],
        specs: {
          engineType: 'Water-cooled 4-stroke DOHC 4 valve in-line 4 cylinder',
          displacement: '999 cc',
          maxPower: '91kW (124PS) @ 9,000rpm',
          maxTorque: '103N.m [10.5kgf.m] @ 8,000rpm',
          transmission: '6 speed',
          clutch: 'Assist and slipper clutch',
          seatHeight: '795mm', // Corrected from 79.5mm typo
          fuelCapacity: '16L',
          features: [
              'TFT meter 5.0 inches',
              'Honda RoadSync',
              'Honda Smart Key System',
              'All LED lights',
              'Riding modes: standard, sport, rain, user1 and user2',
              'Throttle-by-wire system',
              'Cornering ABS'
          ]
        }
      },
      
      {
        id: '7',
        name: 'HONDA NT1100 DCT',
        category: 'adventure',
        price: 12000,
        availability: 'Available for pre-order only',
        image: '/src/styles/images/featured/variantnt1000/HONDANT1100DCTGRAY.png',
        view360: {
          type: 'sketchfab',
          src: 'https://sketchfab.com/models/2fd7bccab1444630a6fcbdb54b0a9c03/embed'
        },
        colors: [
          {
            name: 'HONDA NT1100 DCT (Matte Warm Ash Metallic) ',
            image: '/src/styles/images/featured/variantnt1000/HONDANT1100DCTGRAY.png',
          },
          {
            name: 'HONDA NT1100 DCT (Gunmetal Black Metallic) ',
            image: '/src/styles/images/featured/variantnt1000/HONDANT1100DCTBLACK.png',
          },
        ],
        // ADDED NEW SPECS HERE
        specs: {
          engineType: 'Water-cooled 4-stroke OHC (unicam) 4-valve in-line 2 cylinder',
          displacement: '1,082cc',
          maxPower: '75kW(102PS) @ 7,500rpm',
          maxTorque: '104N.m [10.6kgf.m] @ 6,250rpm',
          transmission: '6 speed (DCT)',
          seatHeight: '82cm',
          fuelCapacity: '20L',
          features: [
            'One handed adjustable wind screen (5 stages)',
            'Upper and lower deflectors',
            'LCD meter with 6.5 inches touch panel',
            'Screen display modes: Gold, Silver and Bronze',
            'Background color: White, Black, or Auto-change',
            'New Design projector headlights',
            'Electronic Controlled suspension',
            'Apple Carplay',
            'USB socket',
            'All LED lights',
            'Emergency stop signal',
            'Honda Selectable Torque Control (HSTC) - 3 levels',
            'Cruise control',
            'Grip heater',
            'Riding modes: Tour, Urban, Rain, User 1 and User 2'
          ]
        }
      },
      {
        id: '8',
        name: 'HONDA NC750X DCT 2025',
        category: 'adventure',
        price: 12000,
        image: '/src/styles/images/featured/variantnc750x/NC750X1.png',
        view360: {
          type: 'sketchfab',
          src: 'https://sketchfab.com/models/5b1e4f6f959440dfbadb2da759de1e15/embed'
        },
      },
      {
        id: '10',
        name: 'Harley Iron',
        category: 'cruiser',
        price: 12000,
        image: '/harley.jpg'
      },
      {
        id: '11',
        name: 'Harley Iron',
        category: 'cruiser',
        price: 12000,
        image: '/harley.jpg'
      },
      {
        id: '12',
        name: 'Harley Iron',
        category: 'cruiser',
        price: 12000,
        image: '/harley.jpg'
      },
      {
        id: '5',
        name: 'Harley Iron',
        category: 'cruiser',
        price: 12000,
        image: '/harley.jpg'
      },

  ];

export const bikes: Bike[] = rawBikes.map(resolveBikeAssets);
