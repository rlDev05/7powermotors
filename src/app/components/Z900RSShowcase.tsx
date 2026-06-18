import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { z900rsImages } from '@/app/data/z900rsImages';

export function Z900RSShowcase() {
  const [active, setActive] = useState(0);
  const current = z900rsImages[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % z900rsImages.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, []);

  const previous = () => {
    setActive((index) => (index - 1 + z900rsImages.length) % z900rsImages.length);
  };

  const next = () => {
    setActive((index) => (index + 1) % z900rsImages.length);
  };

  return (
    <section id="z900rs" className="relative overflow-hidden bg-background py-20 sm:py-24">
      <div className="absolute left-[-12rem] top-16 h-40 w-[32rem] rotate-[-16deg] bg-accent/75" />
      <div className="absolute bottom-10 right-[-18rem] h-44 w-[34rem] rotate-[-37deg] bg-accent/70" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-accent">
              Z900RS Visual Covers
            </p>
            <h2 className="font-[Rajdhani] text-[clamp(2.5rem,6vw,5.4rem)] font-black uppercase leading-[0.9] tracking-normal text-foreground">
              Detail shots.
              <br />
              Real finish.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
              Close-up Z900RS visuals for paint depth, chrome highlights,
              engine texture, and the premium riding mood of the brand.
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-black">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.alt}
                className="h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5">
              <div>
                <h3 className="font-[Rajdhani] text-4xl font-black uppercase leading-none text-white">
                  {current.label}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous Z900RS photo"
                  className="flex h-11 w-11 items-center justify-center border border-white/20 bg-black/45 text-white backdrop-blur transition hover:border-accent hover:text-accent"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next Z900RS photo"
                  className="flex h-11 w-11 items-center justify-center bg-accent text-white transition hover:bg-accent/90"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-7">
            {z900rsImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Select ${image.label}`}
                className={`group relative aspect-[4/3] overflow-hidden border transition ${
                  index === active ? 'border-accent' : 'border-white/10 hover:border-white/45'
                }`}
              >
                <img
                  src={image.src}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-1 ${
                    index === active ? 'bg-accent' : 'bg-transparent'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
