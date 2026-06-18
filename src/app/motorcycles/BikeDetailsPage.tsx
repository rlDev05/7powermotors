import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative">
      
      <div className="pointer-events-none fixed right-[-14rem] top-28 -z-10 h-44 w-[34rem] rotate-[-24deg] bg-accent/38" />
      <div className="pointer-events-none fixed bottom-24 left-[-18rem] -z-10 h-44 w-[36rem] rotate-[-32deg] bg-accent/25" />

      <div className="max-w-[1400px] mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to={backLink}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-medium font-inter text-sm group uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Models
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* LEFT: IMAGE OR 360 VIEW */}
          <div className="lg:col-span-7 relative">
            <div className="sticky top-32">
              <div className="racing-card relative flex min-h-[500px] items-center justify-center bg-white">
                
                <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-2 bg-gradient-to-r from-accent via-accent to-[#ffc400]" />

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
                    <div className="w-full h-[500px]"> 
                      <Bike360Viewer
                        images={bike.view360}
                        onClose={() => setIs360Mode(false)}
                      />
                    </div>
                  ) : (
                    <div className="p-8">
                        <ImageWithFallback
                        src={currentImage}
                        alt={bike.name}
                        className="w-full h-auto object-contain max-h-[600px] drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
                        key={currentImage}
                        />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                {/* --- ADDED: AVAILABILITY BADGE --- */}
                {bike.availability && (
                  <div className="mb-4 inline-flex items-center gap-2 border border-[#ffc400]/50 bg-[#ffc400]/15 px-3 py-1 text-black">
                    <AlertCircle className="w-3 h-3" />
                    <span className="text-xs font-bold font-rajdhani uppercase tracking-widest">
                      {bike.availability}
                    </span>
                  </div>
                )}
                {/* --------------------------------- */}

                <h2 className="text-accent tracking-[0.2em] text-sm font-bold font-inter mb-3 uppercase flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-accent inline-block"></span>
                  {bike.category}
                </h2>
                <h1 className="text-5xl md:text-6xl font-black font-rajdhani text-foreground leading-tight">
                  {bike.name}
                </h1>
              </div>

              {/* COLORS */}
              {bike.colors && bike.colors.length > 0 && (
                <div className="py-4">
                  <h3 className="text-muted-foreground font-bold font-rajdhani text-sm mb-4 tracking-wider">
                    SELECT FINISH
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {bike.colors.map((color, index) => {
                      const isActive = currentImage === color.image;
                      return (
                        <button
                          key={index}
                          onClick={() => handleColorChange(color.image)}
                          className={`group relative h-20 w-20 overflow-hidden border border-border transition-all duration-300
                            ${isActive 
                              ? 'scale-110 ring-2 ring-accent ring-offset-2 ring-offset-background shadow-lg shadow-accent/20' 
                              : 'opacity-70 hover:opacity-100 hover:scale-105'
                            }
                          `}
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
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-6">
                <button className="racing-button group relative min-w-[240px] overflow-hidden px-8 py-5 font-[Rajdhani] text-xl sm:w-auto">
                  <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="inline-flex items-center gap-3 tracking-wide">
                    ASK ABOUT THIS MODEL
                    <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- SPECS SECTION START --- */}
        {bike.specs && (
          <div className="mt-24 mb-10">
            
            {/* Header */}
            <div className="flex items-end gap-6 mb-12">
              <h3 className="text-4xl font-bold font-rajdhani text-foreground uppercase tracking-wide leading-none">
                Technical <br /> <span className="text-accent">Specifications</span>
              </h3>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-accent/50 to-transparent mb-2" />
              <div className="text-right hidden sm:block">
                 <p className="text-muted-foreground font-inter text-sm">Full breakdown for {bike.name}</p>
                 <p className="text-accent font-bold font-rajdhani">{bike.specs.releaseDate} MODEL</p>
              </div>
            </div>

            {/* Categorized Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {specGroups.map((group) => {
                const hasSpecs = group.fields.some(field => bike.specs && bike.specs[field as keyof BikeSpecs]);
                if (!hasSpecs) return null;

                const GroupIcon = group.icon;

                return (
                  <div 
                    key={group.title}
                  className="racing-card overflow-hidden"
                >
                    <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-6 py-4">
                      <div className="bg-accent p-2 text-white">
                        <GroupIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-rajdhani font-bold text-lg tracking-wide text-foreground">
                        {group.title.toUpperCase()}
                      </h4>
                    </div>

                    <div className="p-6">
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
                                <span className="border-b border-border pb-1 text-right font-rajdhani font-semibold text-foreground sm:border-none sm:pb-0">
                                  {value} {/* Ensure only string values are rendered here */}
                                </span>
                              </div>
                              <div className="mt-1 hidden w-full border-b border-dashed border-border opacity-60 sm:block" />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* --- NEW SECTION: SPECIAL FEATURES LIST --- */}
            {bike.specs.features && bike.specs.features.length > 0 && (
              <div className="racing-card mt-6 overflow-hidden">
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
              </div>
            )}
            {/* ------------------------------------------ */}
          </div>
        )}
        {/* --- SPECS SECTION END --- */}

      </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
