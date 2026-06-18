import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { z900rsHeroSlides } from '@/app/data/z900rsImages';

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % z900rsHeroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = z900rsHeroSlides[activeSlide];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide.src}
            src={currentSlide.src}
            alt={currentSlide.alt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1.12 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.15, ease: 'easeOut' },
              scale: { duration: 6.4, ease: 'easeOut' },
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-8 right-8 z-10 hidden items-center gap-2 lg:flex">
          {z900rsHeroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show ${slide.label}`}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeSlide ? 'w-10 bg-accent' : 'w-5 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute -top-48 -left-40 h-72 w-[42rem] rotate-[-12deg] bg-accent/90" />
      <div className="absolute -bottom-44 right-[-24rem] h-72 w-[42rem] rotate-[-42deg] bg-[#ff5a00]/75" />

      <div className="relative z-10 flex min-h-screen items-center px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur"
            >
              <ShieldCheck className="h-4 w-4 text-[#ffc400]" />
              7 POWER Premium Surface Care
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12 }}
              className="font-[Rajdhani] text-[clamp(3rem,8vw,6.7rem)] font-black uppercase leading-[0.88] tracking-normal text-white"
            >
              Japanese Precision.
              <br />
              Philippine Roads.
              <br />
              <span className="text-accent">Absolute Protection.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
            >
              7 POWER brings a premium surface-care standard to riders who want
              their motorcycles prepared for heat, rain, road grime, and daily
              Philippine riding conditions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-accent/90"
              >
                Partner With 7 POWER
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:border-accent hover:text-accent"
              >
                Explore Coating Services
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
