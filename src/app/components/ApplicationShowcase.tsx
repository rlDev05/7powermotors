import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { sprayerImages } from '@/app/data/sprayerImages';

export function ApplicationShowcase() {
  const [active, setActive] = useState(0);
  const current = sprayerImages[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % sprayerImages.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const previous = () => {
    setActive((index) => (index - 1 + sprayerImages.length) % sprayerImages.length);
  };

  const next = () => {
    setActive((index) => (index + 1) % sprayerImages.length);
  };

  return (
    <section className="racing-section bg-card">
      <div className="absolute right-[-16rem] top-12 h-44 w-[34rem] rotate-[-24deg] bg-[#ff5a00]/70" />

      <div className="racing-container grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="racing-media aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5">
            <h3 className="font-[Rajdhani] text-4xl font-black uppercase leading-none text-white">
              {current.label}
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous application photo"
                className="flex h-11 w-11 items-center justify-center border border-white/20 bg-black/45 text-white backdrop-blur transition hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next application photo"
                className="flex h-11 w-11 items-center justify-center bg-accent text-white transition hover:bg-black"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="racing-kicker">
            Professional Application
          </p>
          <h2 className="racing-title">
            Applied with control.
            <br />
            Finished with care.
          </h2>
          <p className="racing-copy mt-6 max-w-lg">
            A cleaner look at the service side of 7 POWER: precise spray work,
            focused preparation, and a finish made for daily riding conditions.
          </p>

          <div className="mt-8 grid grid-cols-5 gap-2">
            {sprayerImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Select ${image.label}`}
                className={`aspect-square overflow-hidden border transition ${
                  index === active ? 'border-accent' : 'border-border hover:border-foreground/45'
                }`}
              >
                <img src={image.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
