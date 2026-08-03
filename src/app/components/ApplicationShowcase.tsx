import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { sprayerImages } from '@/app/data/sprayerImages';
import { z900rsImages } from '@/app/data/z900rsImages';
import { mediaReveal, revealContainer, revealUp } from '@/app/lib/motionPresets';

const storySteps = [
  { number: '01', title: 'Prepare', detail: 'Build the foundation for a premium finish' },
  { number: '02', title: 'Apply', detail: 'Deliver precise, controlled coverage' },
  { number: '03', title: 'Inspect', detail: 'Check every approved surface and detail' },
  { number: '04', title: 'Reveal', detail: 'Let the finished Z900RS speak for itself' },
];

const stepBorders = [
  '',
  'border-t border-border sm:border-l sm:border-t-0',
  'border-t border-border sm:border-t lg:border-l lg:border-t-0',
  'border-t border-border sm:border-l sm:border-t lg:border-t-0',
];

const finishDetails = [
  {
    ...z900rsImages[2],
    label: 'Paint Depth',
    alt: 'Deep red paint finish on the CR-1-treated Kawasaki Z900RS',
  },
  {
    ...z900rsImages[12],
    label: 'Chrome Highlights',
    alt: 'Chrome headlight detail on the CR-1-treated Kawasaki Z900RS',
  },
  {
    ...z900rsImages[6],
    label: 'Engine Texture',
    alt: 'Preserved engine-fin texture on the CR-1-treated Kawasaki Z900RS',
  },
];

const allMedia = [
  ...sprayerImages.map((image) => ({ ...image, group: 'Application' })),
  ...z900rsImages.map((image) => ({ ...image, group: 'Finished Z900RS' })),
];

export function ApplicationShowcase() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const current = sprayerImages[active];
  const completedBike = z900rsImages[0];

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % sprayerImages.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  const previous = () => {
    setActive((index) => (index - 1 + sprayerImages.length) % sprayerImages.length);
  };

  const next = () => {
    setActive((index) => (index + 1) % sprayerImages.length);
  };

  return (
    <section id="z900rs" className="racing-section bg-card">
      <div className="absolute right-[-16rem] top-12 h-44 w-[34rem] rotate-[-24deg] bg-accent/20" />
      <div className="absolute bottom-14 left-[-18rem] h-40 w-[34rem] rotate-[-22deg] bg-black/[0.04]" />

      <div className="racing-container">
        <motion.div
          className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealContainer}
        >
          <div>
            <motion.p className="brand-chip w-fit" variants={revealUp}>
              From Preparation to Presence
            </motion.p>
            <motion.h2 className="racing-title max-w-3xl" variants={revealUp}>
              Precision in every pass.
              <br />
              <span className="text-accent">Presence in every finish.</span>
            </motion.h2>
          </div>

          <motion.div className="max-w-2xl lg:justify-self-end" variants={revealUp}>
            <p className="racing-copy font-semibold text-foreground">
              Premium results begin long before the final reveal.
            </p>
            <p className="racing-copy mt-3">
              Follow the CR-1 journey from disciplined preparation and controlled spray application
              to the richer paint depth, chrome highlights, and detailed engine finish of the
              Kawasaki Z900RS.
            </p>
            <p className="racing-copy mt-3">
              The result is protection that respects the motorcycle&apos;s authentic texture and
              character—while giving every surface stronger visual presence.
            </p>
          </motion.div>
        </motion.div>

        <motion.ol
          className="mt-9 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealContainer}
          aria-label="CR-1 application process"
        >
          {storySteps.map((step, index) => (
            <motion.li
              key={step.number}
              className={`relative flex min-h-24 gap-4 py-5 sm:px-5 lg:min-h-28 lg:px-6 ${stepBorders[index]}`}
              variants={revealUp}
            >
              <span className="font-[Rajdhani] text-sm font-black text-accent">{step.number}</span>
              <span>
                <span className="block font-[Rajdhani] text-xl font-black uppercase tracking-[0.08em] text-foreground">
                  {step.title}
                </span>
                <span className="mt-1 block text-sm leading-5 text-muted-foreground">{step.detail}</span>
              </span>
              <span className="absolute bottom-0 left-0 h-0.5 w-14 bg-accent" aria-hidden="true" />
            </motion.li>
          ))}
        </motion.ol>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            className="racing-media h-[34rem] sm:h-[42rem] lg:h-[47rem]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={mediaReveal}
          >
            <div className="motion-sheen z-10" />
            <AnimatePresence mode="wait">
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.alt}
                className="h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/15" />

            <div className="absolute left-5 top-5 border-l-2 border-accent bg-black/55 px-4 py-3 text-white backdrop-blur-sm sm:left-7 sm:top-7">
              <span className="block text-[0.65rem] font-black uppercase tracking-[0.22em] text-white/70">
                02 / Controlled application
              </span>
              <span className="mt-1 block font-[Rajdhani] text-2xl font-black uppercase">
                Professional workmanship
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-white/65">
                    Application view {active + 1} of {sprayerImages.length}
                  </p>
                  <h3 className="mt-1 font-[Rajdhani] text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                    {current.label}
                  </h3>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous application photo"
                    className="flex h-11 w-11 items-center justify-center border border-white/30 bg-black/45 text-white backdrop-blur transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next application photo"
                    className="flex h-11 w-11 items-center justify-center bg-accent text-white transition hover:bg-[var(--accent-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex gap-2" role="group" aria-label="Choose application photo">
                {sprayerImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show ${image.label}`}
                    aria-pressed={index === active}
                    className="flex h-8 flex-1 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <span
                      className={`h-1.5 w-full transition-colors ${
                        index === active ? 'bg-accent' : 'bg-white/35 hover:bg-white/70'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid content-start gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={revealContainer}
          >
            <motion.figure className="racing-media aspect-[16/10]" variants={mediaReveal}>
              <img
                src={completedBike.src}
                alt="Completed CR-1-treated Kawasaki Z900RS presented in the studio"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-white/65">
                  04 / Final reveal
                </span>
                <span className="mt-1 block font-[Rajdhani] text-3xl font-black uppercase text-white sm:text-4xl">
                  Completed Z900RS
                </span>
              </figcaption>
            </motion.figure>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {finishDetails.map((image, index) => (
                <motion.figure
                  key={image.src}
                  className={`racing-media aspect-[4/5] ${index === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
                  variants={mediaReveal}
                >
                  <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/5 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <span className="font-[Rajdhani] text-lg font-black uppercase tracking-[0.06em] text-white sm:text-xl">
                      {image.label}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>

            <motion.div
              className="border-l-2 border-accent bg-background px-5 py-5 sm:px-6"
              variants={revealUp}
            >
              <p className="font-[Rajdhani] text-xl font-black uppercase tracking-[0.06em] text-foreground">
                The process creates the finish.
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                One disciplined workflow, visible in every surface that matters—from application
                control to the character of the finished motorcycle.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <details className="group mt-8 border-y border-border">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-[Rajdhani] text-base font-black uppercase tracking-[0.1em] text-foreground transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
            <span>
              Complete visual study
              <span className="ml-3 font-sans text-[0.65rem] font-bold tracking-[0.16em] text-muted-foreground">
                {allMedia.length} views
              </span>
            </span>
            <Plus className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <div className="grid grid-cols-3 gap-2 border-t border-border py-5 sm:grid-cols-6 lg:grid-cols-9">
            {allMedia.map((image) => (
              <figure key={image.src} className="group/media relative aspect-square overflow-hidden bg-muted">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover/media:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pb-2 pt-6 text-[0.55rem] font-black uppercase tracking-[0.12em] text-white opacity-0 transition group-hover/media:opacity-100 group-focus-within/media:opacity-100">
                  {image.group}
                </figcaption>
              </figure>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
