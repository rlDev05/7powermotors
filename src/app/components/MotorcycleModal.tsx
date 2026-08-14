import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Info } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// --- TYPES ---
export interface MotorcycleSpec {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
  stock?: string;
}

export interface MotorcycleData {
  brand: string;
  model: string;
  tagline: string;
  price: string;
  imageUrl?: string;
  videoUrl?: string;
  specs: MotorcycleSpec[];
  featured?: boolean;
  availability?: string;
  details?: {
    features: string[];
    techSpecs: Record<string, string>;
    variants?: ColorVariant[];
  };
}

interface MotorcycleModalProps {
  bike: MotorcycleData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MotorcycleModal({ bike, isOpen, onClose }: MotorcycleModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant | null>(null);

  useEffect(() => {
    if (bike?.details?.variants && bike.details.variants.length > 0) {
      setSelectedVariant(bike.details.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [bike]);

  const displayImage = selectedVariant?.image || bike?.imageUrl || '';

  return (
    <AnimatePresence>
      {isOpen && bike && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Content Wrapper */}
          <motion.div
            layoutId={`card-${bike.model}`}
            // Viewport-safe scrolling on small screens; split-panel scrolling on desktop.
            className="relative z-10 flex max-h-[calc(100dvh-1rem)] w-full max-w-5xl flex-col overflow-y-auto rounded-xl border border-border bg-card shadow-2xl sm:max-h-[calc(100dvh-2rem)] lg:flex-row lg:overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-2 top-2 z-30 flex size-11 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-accent sm:right-3 sm:top-3"
              aria-label="Close motorcycle details"
            >
              <X size={18} />
            </button>

            {/* --- LEFT COLUMN: Visuals (Fixed Height on Mobile, Full Height on Desktop) --- */}
            <div className="relative flex h-[clamp(9rem,30dvh,14rem)] shrink-0 flex-col justify-between overflow-hidden bg-black sm:h-64 lg:h-auto lg:w-[45%]">
              
              {/* Image Container */}
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <ImageWithFallback
                      src={displayImage}
                      alt={`${bike.model} ${selectedVariant?.name || ''}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Gradient for mobile text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Desktop Overlay Features */}
              {bike.details && (
                <div className="hidden lg:block p-6 bg-secondary/10 backdrop-blur-md border-t border-white/10 mt-auto z-10 relative">
                  <h3 className="text-lg font-bold font-[Rajdhani] mb-3 text-accent">KEY FEATURES</h3>
                  <ul className="space-y-2">
                    {bike.details.features.slice(0, 4).map((feature, i) => ( // Limited to 4 to save space
                      <li key={i} className="flex items-start gap-2 text-xs text-white/90">
                        <Check size={14} className="text-accent mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* --- RIGHT COLUMN: Details (Scrollable) --- */}
            <div className="flex min-w-0 flex-1 flex-col bg-card p-4 sm:p-5 lg:overflow-y-auto lg:p-8">
              
              {/* Header */}
              <div className="mb-6">
                <span className="text-accent font-bold tracking-widest text-[10px] lg:text-xs mb-1 block uppercase">{bike.brand}</span>
                <h2 className="text-2xl lg:text-4xl font-bold mb-2 font-[Rajdhani] leading-tight">{bike.model}</h2>
                <p className="text-muted-foreground text-sm lg:text-base">{bike.tagline}</p>
              </div>

              {/* Quick Specs Grid */}
              <div className="mb-6 grid grid-cols-1 gap-2 rounded-lg border border-border/50 bg-secondary/20 p-3 min-[360px]:grid-cols-3">
                {bike.specs.map((spec, i) => (
                  <div key={i} className="text-center">
                    <div className="flex justify-center text-accent mb-1">{spec.icon}</div>
                    <div className="font-bold text-sm lg:text-base">{spec.value}</div>
                    <div className="text-[9px] uppercase text-muted-foreground tracking-wider">{spec.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Specs Table */}
              {bike.details && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold mb-3 uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     Technical Specifications
                     <div className="h-[1px] bg-border flex-grow" />
                  </h4>
                  <div className="grid grid-cols-1 gap-y-2 text-sm">
                    {Object.entries(bike.details.techSpecs).map(([key, value]) => (
                      <div key={key} className="flex min-w-0 flex-col gap-1 border-b border-border/40 pb-2 min-[360px]:flex-row min-[360px]:justify-between">
                        <span className="text-muted-foreground text-xs lg:text-sm">{key}</span>
                        <span className="break-words text-left text-xs font-semibold text-foreground min-[360px]:text-right lg:text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Features List */}
              {bike.details && (
                <div className="lg:hidden mb-6">
                   <h4 className="text-xs font-bold mb-3 uppercase tracking-wider text-muted-foreground">Key Features</h4>
                   <ul className="space-y-2">
                    {bike.details.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-muted-foreground">
                        <Check size={14} className="text-accent mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interactive Color Section */}
              <div className="mb-6 mt-auto pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Color</h4>
                  {selectedVariant?.stock && (
                    <span className="flex items-center gap-1 text-[10px] text-accent font-medium bg-accent/10 px-2 py-1 rounded">
                      <Info size={12} /> {selectedVariant.stock}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {bike.details?.variants ? (
                    bike.details.variants.map((variant, i) => {
                      const isSelected = selectedVariant?.name === variant.name;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedVariant(variant)}
                          className={`
                            group relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300
                            ${isSelected ? 'border-accent bg-accent/5' : 'border-transparent hover:bg-secondary'}
                          `}
                        >
                          <div
                            className={`w-4 h-4 rounded-full shadow-sm ring-2 ring-offset-2 ring-offset-card transition-all ${
                                isSelected ? 'ring-accent' : 'ring-transparent group-hover:ring-border'
                            }`}
                            style={{ backgroundColor: variant.hex }}
                          />
                          <span className={`text-xs font-bold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {variant.name}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-xs text-muted-foreground">Standard Factory Colors</p>
                  )}
                </div>
              </div>

              {/* Footer / CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-end pt-4 border-t border-border/50 gap-4">
                <button className="w-full sm:w-auto px-6 py-3 bg-accent text-accent-foreground text-sm font-bold hover:bg-accent/90 transition-transform active:scale-95 shadow-lg shadow-accent/20 rounded-sm">
                  ASK ABOUT THIS MODEL
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
