import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { bikes, BikeSpecs } from '@/app/data/bikes'; 
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Bike360Viewer } from '@/app/components/Bike360Viewer';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { 
  ChevronLeft, 
  Rotate3d, 
  CheckCircle2, 
  ArrowUpRight, 
  Cpu, 
  Activity, 
  Scale, 
  Zap,
  Settings,
  AlertCircle, // Added Icon for availability
  Star         // Added Icon for features
} from 'lucide-react'; 
import { mediaReveal, revealContainer, revealRight, revealUp } from '@/app/lib/motionPresets';

const specGroups = [
    {
        title: 'Performance',
        icon: Zap,
        fields: ['maxPower', 'maxTorque', 'displacement', 'ridingModes']
      },
  {
    title: 'Engine & Drivetrain',
    icon: Cpu,
    fields: ['engineType', 'induction', 'ignition', 'boreAndStroke', 'compressionRatio']
  },
  {
    title: 'Transmission',
    icon: Settings,
    fields: ['transmission', 'finalDrive', 'clutch']
  },
  {
    title: 'Chassis & Suspension',
    icon: Zap,
    fields: ['suspensionFront', 'suspensionRear', 'rake', 'trail']
  },
  {
    title: 'Brakes & Tires',
    icon: Activity,
    fields: ['brakesFront', 'brakesRear', 'tiresFront', 'tiresRear']
  },
  {
    title: 'Dimensions & Weight',
    icon: Scale,
    fields: ['wheelbase', 'seatHeight', 'curbWeight', 'fuelCapacity']
  }
];

export default function BikeDetailsPage() {
  const { id } = useParams();
  const bike = bikes.find((b) => b.id === id);

  const [currentImage, setCurrentImage] = useState('');
  const [is360Mode, setIs360Mode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (bike) {
      setCurrentImage(bike.image);
    }
  }, [bike]);

  const handleColorChange = (newImage: string) => {
    if (currentImage === newImage) return;
    setIsAnimating(true);
    setIs360Mode(false);
    setTimeout(() => {
      setCurrentImage(newImage);
      setIsAnimating(false);
    }, 200);
  };

  if (!bike) {
    return (
      <div className="min-h-screen pt-32 text-center bg-background flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold font-rajdhani text-muted-foreground uppercase tracking-widest">
          Bike not found
        </h2>
        <Link
          to="/models"
          className="text-accent hover:text-accent/80 underline mt-4 block font-inter"
        >
          Return to Models
        </Link>
      </div>
    );
  }

  const backLink = `/models?category=${bike.category}`;
  
  const formatLabel = (key: string) =>
    key.replace(/([A-Z])/g, ' $1')
       .replace(/^./, (str) => str.toUpperCase());

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
      
      <div className="pointer-events-none absolute right-[-22rem] top-28 h-40 w-[28rem] rotate-[-24deg] bg-accent/38 sm:right-[-14rem] sm:h-44 sm:w-[34rem]" />
      <div className="pointer-events-none absolute bottom-24 left-[-24rem] h-40 w-[28rem] rotate-[-32deg] bg-accent/25 sm:left-[-18rem] sm:h-44 sm:w-[36rem]" />

      <div className="mx-auto max-w-[1400px]">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <Link
            to={backLink}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-medium font-inter text-sm group uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Models
          </Link>
        </div>

        <motion.div
          className="mb-16 grid grid-cols-1 gap-8 lg:mb-20 lg:grid-cols-12 lg:gap-12"
          initial="hidden"
          animate="visible"
          variants={revealContainer}
        >
          
          {/* LEFT: IMAGE OR 360 VIEW */}
          <motion.div className="relative lg:col-span-7" variants={mediaReveal}>
            <div className="sticky top-32">
              <div className="racing-card relative flex min-h-[330px] items-center justify-center bg-white sm:min-h-[460px] lg:min-h-[500px]">
                <div className="motion-sheen z-20" />
                
                <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-2 bg-gradient-to-r from-accent via-black to-white" />

                {bike.view360 && !is360Mode && (
                  <button
                    onClick={() => setIs360Mode(true)}
                    className="absolute top-6 right-6 z-30 group"
                  >
                    <div className="flex cursor-pointer items-center gap-2 border border-border bg-white px-4 py-2 font-bold font-rajdhani text-foreground shadow-lg transition-all group-hover:border-accent group-hover:shadow-accent/20">
                      <Rotate3d className="w-5 h-5 text-accent group-hover:rotate-180 transition-transform duration-700" />
                      <span className="text-sm tracking-wide">360 deg VIEW</span>
                    </div>
                  </button>
                )}

                <div className={`relative z-10 w-full h-full flex items-center justify-center transition-opacity duration-300 ${isAnimating ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}>
                  {is360Mode && bike.view360 ? (
                    <div className="h-[330px] w-full sm:h-[460px] lg:h-[500px]">
                      <Bike360Viewer
                        images={bike.view360}
                        onClose={() => setIs360Mode(false)}
                      />
                    </div>
                  ) : (
                    <div className="p-5 sm:p-8">
                        <ImageWithFallback
                        src={currentImage}
                        alt={bike.name}
                        className="h-auto max-h-[320px] w-full object-contain drop-shadow-2xl transition-transform duration-500 ease-out hover:scale-105 sm:max-h-[520px] lg:max-h-[600px]"
                        key={currentImage}
                        />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: INFO */}
          <motion.div className="flex flex-col justify-center lg:col-span-5" variants={revealRight}>
            <div className="space-y-6">
              <div>
                {/* --- ADDED: AVAILABILITY BADGE --- */}
                {bike.availability && (
                  <div className="mb-4 inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3 py-1 text-accent">
                    <AlertCircle className="w-3 h-3" />
                    <span className="text-xs font-bold font-rajdhani uppercase tracking-widest">
                      {bike.availability}
                    </span>
                  </div>
                )}
                {/* --------------------------------- */}

                <h2 className="mb-3 flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm sm:tracking-[0.2em]">
                  <span className="w-8 h-[2px] bg-accent inline-block"></span>
                  {bike.category}
                </h2>
                <h1 className="font-rajdhani text-[clamp(2.6rem,12vw,3.75rem)] font-black leading-[0.95] text-foreground md:leading-tight">
                  {bike.name}
                </h1>
              </div>

              {/* COLORS */}
              {bike.colors && bike.colors.length > 0 && (
                <div className="py-4">
                  <h3 className="text-muted-foreground font-bold font-rajdhani text-sm mb-4 tracking-wider">
                    SELECT FINISH
                  </h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {bike.colors.map((color, index) => {
                      const isActive = currentImage === color.image;
                      return (
                        <motion.button
                          key={index}
                          onClick={() => handleColorChange(color.image)}
                          className={`group relative h-16 w-16 overflow-hidden border border-border transition-all duration-300 sm:h-20 sm:w-20
                            ${isActive 
                              ? 'scale-110 ring-2 ring-accent ring-offset-2 ring-offset-background shadow-lg shadow-accent/20' 
                              : 'opacity-70 hover:opacity-100 hover:scale-105'
                            }
                          `}
                          whileHover={{ y: -4, scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <ImageWithFallback src={color.image} alt={color.name} className="w-full h-full object-cover" />
                          {isActive && (
                            <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                              <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />
                            </div>
                          )}
                          <div className="absolute bottom-0 w-full bg-black/60 text-[10px] text-white py-1 text-center font-inter backdrop-blur-sm truncate px-1">
                            {color.name}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-6">
                <motion.button
                  className="racing-button group relative w-full overflow-hidden font-[Rajdhani] text-base sm:w-auto sm:min-w-[240px] sm:px-8 sm:py-5 sm:text-xl"
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="inline-flex items-center gap-3 tracking-wide">
                    ASK ABOUT THIS MODEL
                    <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- SPECS SECTION START --- */}
        {bike.specs && (
          <motion.div
            className="mb-10 mt-16 sm:mt-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealContainer}
          >
            
            {/* Header */}
            <motion.div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:gap-6" variants={revealUp}>
              <h3 className="font-rajdhani text-3xl font-bold uppercase leading-none tracking-wide text-foreground sm:text-4xl">
                Technical <br /> <span className="text-accent">Specifications</span>
              </h3>
              <div className="h-[2px] w-full flex-1 bg-gradient-to-r from-accent/50 to-transparent sm:mb-2" />
              <div className="text-right hidden sm:block">
                 <p className="text-muted-foreground font-inter text-sm">Full breakdown for {bike.name}</p>
                 <p className="text-accent font-bold font-rajdhani">{bike.specs.releaseDate} MODEL</p>
              </div>
            </motion.div>

            {/* Categorized Grid */}
            <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" variants={revealContainer}>
              
              {specGroups.map((group) => {
                const hasSpecs = group.fields.some(field => bike.specs && bike.specs[field as keyof BikeSpecs]);
                if (!hasSpecs) return null;

                const GroupIcon = group.icon;

                return (
                  <motion.div
                    key={group.title}
                    className="racing-card overflow-hidden"
                    variants={revealUp}
                >
                    <div className="motion-sheen" />
                    <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-6 py-4">
                      <div className="bg-accent p-2 text-white">
                        <GroupIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-rajdhani font-bold text-lg tracking-wide text-foreground">
                        {group.title.toUpperCase()}
                      </h4>
                    </div>

                    <div className="p-5 sm:p-6">
                      <ul className="space-y-4">
                        {group.fields.map((key) => {
                          const value = bike.specs ? bike.specs[key as keyof BikeSpecs] : null;
                          if (!value) return null;

                          return (
                            <li key={key} className="group/item">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
                                <span className="text-muted-foreground font-inter text-xs uppercase tracking-wider font-medium shrink-0 group-hover/item:text-accent transition-colors">
                                  {formatLabel(key)}
                                </span>
                                <span className="border-b border-border pb-1 text-left font-rajdhani font-semibold text-foreground sm:border-none sm:pb-0 sm:text-right">
                                  {value} {/* Ensure only string values are rendered here */}
                                </span>
                              </div>
                              <div className="mt-1 hidden w-full border-b border-dashed border-border opacity-60 sm:block" />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* --- NEW SECTION: SPECIAL FEATURES LIST --- */}
            {bike.specs.features && bike.specs.features.length > 0 && (
              <motion.div className="racing-card mt-6 overflow-hidden" variants={revealUp}>
                <div className="motion-sheen" />
                <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-6 py-4">
                  <div className="bg-accent p-2 text-white">
                    <Star className="w-5 h-5" />
                  </div>
                  <h4 className="font-rajdhani font-bold text-lg tracking-wide text-foreground">
                    KEY FEATURES
                  </h4>
                </div>
                <div className="p-6">
                   <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {bike.specs.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm font-inter text-muted-foreground leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                   </ul>
                </div>
              </motion.div>
            )}
            {/* ------------------------------------------ */}
          </motion.div>
        )}
        {/* --- SPECS SECTION END --- */}

      </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
