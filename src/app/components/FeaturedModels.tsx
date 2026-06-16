import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Gauge, Zap, Weight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// IMPORT THE FIXED MODAL AND TYPES
import { MotorcycleModal, MotorcycleData } from './MotorcycleModal'; 

import mfImgGray from '@/styles/images/featured/variantmf1/gray.png';
import mfImgBlack from '@/styles/images/featured/variantmf1/black.png';

import mfVideo from '@/styles/videos/mf1.mp4'; 
import vsdImg from '@/styles/images/featured/vsd.png';
// --- CARD COMPONENT ---
// This handles the grid item display only
interface MotorcycleCardProps extends MotorcycleData {
  index: number;
  onViewDetails: (bike: MotorcycleData) => void; 
}

function MotorcycleCard({
  brand,
  model,
  tagline,
  price,
  imageUrl,
  videoUrl,
  specs,
  featured,
  availability,
  details, 
  index,
  onViewDetails, 
}: MotorcycleCardProps) {
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay video on card hover/load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch((error) => console.log("Autoplay prevented:", error));
    }
  }, [videoUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative bg-card border transition-all duration-500 ${
        featured ? 'border-accent/50 lg:col-span-2' : 'border-border/50 hover:border-accent/30'
      }`}
    >
      {featured && (
        <div className="absolute top-6 right-6 z-10">
          <span className="px-4 py-1.5 bg-accent text-accent-foreground tracking-[0.15em] text-[0.625rem] font-bold">
            FEATURED
          </span>
        </div>
      )}

      {availability && !featured && (
        <div className="absolute top-6 right-6 z-10">
          <span className="px-3 py-1.5 bg-background/80 backdrop-blur-md border border-accent/40 text-foreground text-xs font-semibold">
            {availability}
          </span>
        </div>
      )}

      <div className={`relative overflow-hidden ${featured ? 'h-96' : 'h-72'}`}>
        {videoUrl ? (
          <video
            ref={videoRef}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <ImageWithFallback
            src={imageUrl || ''}
            alt={`${brand} ${model}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
      </div>

      <div className="p-6 lg:p-8">
        <div className="mb-4">
          <span className="text-accent tracking-[0.15em] block mb-2 text-xs font-semibold font-[Inter]">
            {brand}
          </span>
          <h3 className={`mb-2 font-[Rajdhani] font-bold ${featured ? 'text-4xl' : 'text-3xl'}`}>
            {model}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed font-[Inter]">
            {tagline}
          </p>
        </div>

        <div className={`grid gap-4 mb-6 ${featured ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {specs.map((spec, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="text-accent">{spec.icon}</div>
              <div>
                <div className="text-foreground font-[Rajdhani] text-lg font-bold">{spec.value}</div>
                <div className="text-muted-foreground text-[0.625rem] font-medium font-[Inter]">{spec.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <div>
            <span className="text-muted-foreground block mb-1 text-xs font-medium font-[Inter]">Starting at</span>
            <span className="text-foreground font-[Rajdhani] text-2xl font-bold">{price}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            // Pass the full bike object to the handler
            onClick={() => onViewDetails({ 
              brand, model, tagline, price, imageUrl, videoUrl, specs, featured, availability, details 
            })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-all font-[Inter] text-sm font-semibold cursor-pointer"
          >
            VIEW DETAILS
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// --- PARENT SECTION ---
export function FeaturedModels() {
  const [selectedBike, setSelectedBike] = useState<MotorcycleData | null>(null);

  const models: MotorcycleData[] = [
    {
      brand: 'HONDA',
      model: 'NC750X DCT 2025',
      tagline: 'Smart Power. Effortless Control.',
      price: '$26,499',
      videoUrl: mfVideo, 
      availability: '2 Units Left', 
      specs: [
        { icon: <Gauge size={20} />, label: 'TOP SPEED', value: '170 km/h' },
        { icon: <Zap size={20} />, label: 'HORSEPOWER', value: '57.8 hp' },
        { icon: <Weight size={20} />, label: 'WEIGHT', value: '226 kg' },
      ],
      featured: false,
      details: {
        features: [
          "5.0 Inch TFT Full color LCD Meter",
          "Headlight for wider light Distribution",
          "Honda Roadsync Enables linkage with Smartphone",
          "Intuitive 4-way select switch",
          "2-pot Nissin Axial Calipers front brake",
          "Large Capacity 23L luggage box"
        ],
        techSpecs: {
          "Engine Type": "Water-cooled 4-stroke OHC 4 valve",
          "Displacement": "745 cc",
          "Max Power": "43kW(58PS) @ 6,750rpm",
          "Transmission": "Electronic 6 speed (DCT)",
          "Seat Height": "802MM",
        },
        variants: [
            {
                name: "Matte Deep Mud Grey",
                hex: "#4a4a4a",
                stock: "1 unit",
                image: mfImgGray
            },
            {
                name: "Echo Black R",
                hex: "#000000",
                stock: "1 unit",
                image: mfImgBlack 
            }
        ]
      }
    },
    {
      brand: 'VESPA',
      model: 'Vespa 946 Dragon',
      tagline: 'Crafted Like Art. Ridden Like a Legend.',
      price: '$28,395',
      imageUrl: vsdImg,
      availability: '2 Units Left',
      specs: [
        { icon: <Gauge size={20} />, label: 'MILEAGE', value: '45 kmpl' },
        { icon: <Zap size={20} />, label: 'POWER', value: '10.93 PS' },
        { icon: <Weight size={20} />, label: 'FUEL CAP', value: '8 L' },
      ],
      featured: false,
      details: {
        features: [
          "Single cylinder, 4 stroke, 3 valve engine",
          "Dual Channel ABS Braking System",
          "Full LED Lighting (Headlight, Tail, Turn)",
          "Digital Instrument Console & Odometer",
          "Single arm front suspension with coil spring",
          "Preload adjustable rear hydraulic shock"
        ],
        techSpecs: { 
          "Engine": "150 cc Electronic Injection", 
          "Power": "10.93 PS @ 7100 rpm", 
          "Torque": "11.26 Nm @ 5300 rpm",
          "Brakes": "Dual Disc 220mm",
          "Tyres": "Tubeless 120/70-12 (F) / 130/70-12 (R)"
        },
      }
  },
      {
        brand: 'HARLEY-DAVIDSON',
        model: 'Street Glide',
        tagline: 'American icon with modern performance',
        price: '$22,999',
        imageUrl: 'https://images.unsplash.com/photo-1676246848792-2f8eb33975b6?auto=format&fit=crop&q=80&w=1080',
        specs: [
          { icon: <Gauge size={20} />, label: 'TOP SPEED', value: '110 mph' },
          { icon: <Zap size={20} />, label: 'TORQUE', value: '111 ft-lb' },
          { icon: <Weight size={20} />, label: 'WEIGHT', value: '375 kg' },
        ],
        featured: false,
        details: {
           features: ["Milwaukee-Eight 114 V-Twin", "Boom! Box GTS Infotainment"],
           techSpecs: { "Engine": "V-Twin", "Torque": "118 ft-lb", "Fuel Capacity": "6 Gal" },
        }
      },
  ];

  return (
    <section id="models" className="py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-accent tracking-[0.2em] mb-4 block text-xs font-semibold font-[Inter]">FEATURED MODELS</span>
          <h2 className="mb-6 font-[Rajdhani] text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">Engineered Perfection</h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-[Inter]">
            Handpicked from the world's most prestigious manufacturers.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <MotorcycleCard 
                key={model.model} 
                {...model} 
                index={index} 
                onViewDetails={setSelectedBike} 
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/motorcycles"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-border hover:border-accent text-foreground hover:text-accent transition-all text-sm font-semibold font-[Inter]"
          >
            VIEW ALL MODELS
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>

      {/* Render the standalone Modal */}
      <MotorcycleModal 
        isOpen={!!selectedBike}
        bike={selectedBike} 
        onClose={() => setSelectedBike(null)} 
      />
    </section>
  );
}
