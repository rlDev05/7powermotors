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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
            // CHANGED: Uses Flex on desktop for better height control. max-h-[90vh] ensures it fits.
            className="relative w-full max-w-5xl bg-card border border-border shadow-2xl z-10 
                       flex flex-col lg:flex-row 
                       max-h-[90vh] rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 p-2 bg-black/50 hover:bg-accent text-white rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            {/* --- LEFT COLUMN: Visuals (Fixed Height on Mobile, Full Height on Desktop) --- */}
            <div className="relative h-56 shrink-0 lg:h-auto lg:w-[45%] bg-black overflow-hidden flex flex-col justify-between">
              
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
            <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar bg-card p-5 lg:p-8">
              
              {/* Header */}
              <div className="mb-6">
                <span className="text-accent font-bold tracking-widest text-[10px] lg:text-xs mb-1 block uppercase">{bike.brand}</span>
                <h2 className="text-2xl lg:text-4xl font-bold mb-2 font-[Rajdhani] leading-tight">{bike.model}</h2>
                <p className="text-muted-foreground text-sm lg:text-base">{bike.tagline}</p>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-3 gap-2 mb-6 p-3 bg-secondary/20 rounded-lg border border-border/50">
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
                      <div key={key} className="flex justify-between border-b border-border/40 pb-1">
                        <span className="text-muted-foreground text-xs lg:text-sm">{key}</span>
                        <span className="font-semibold text-foreground text-right text-xs lg:text-sm">{value}</span>
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
              <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-border/50 gap-4">
                <div className="text-center sm:text-left">
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">Total Price</span>
                  <span className="text-2xl font-bold font-[Rajdhani]">{bike.price}</span>
                </div>
                <button className="w-full sm:w-auto px-6 py-3 bg-accent text-accent-foreground text-sm font-bold hover:bg-accent/90 transition-transform active:scale-95 shadow-lg shadow-accent/20 rounded-sm">
                  PRE-ORDER
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}