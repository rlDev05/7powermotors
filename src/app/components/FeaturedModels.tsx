import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import NakedImg from '@/styles/images/naked.png';
import { mediaReveal, revealContainer, revealLeft, revealRight, revealUp } from '@/app/lib/motionPresets';

const points = [
  {
    title: 'Premium Application Standards',
    text: 'Position CR-1 around careful preparation, controlled application, and consistent finish quality.',
  },
  {
    title: 'Professionally Applied',
    text: 'A controlled service experience that separates CR-1 from DIY care and ordinary detailing packages.',
  },
  {
    title: 'Built for Daily Riding Conditions',
    text: 'Helps slow UV-related fading while supporting easier care against rain, daily dust, and road grime.',
  },
  {
    title: 'Longer-Lasting Durability',
    text: "Built to help preserve gloss, reduce cleaning fatigue, and protect a motorcycle's premium appearance over time.",
  },
];

export function FeaturedModels() {
  return (
    <section id="protection" className="racing-section bg-background">
      <div className="absolute right-[-22rem] top-16 h-40 w-[28rem] rotate-[-22deg] bg-accent/40 sm:right-[-14rem] sm:h-44 sm:w-[34rem]" />
      <div className="absolute left-[-24rem] bottom-10 h-36 w-[28rem] rotate-[-28deg] bg-[#c8a96e]/10 sm:left-[-18rem] sm:h-40 sm:w-[34rem]" />
      <div className="racing-container grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealContainer}
        >
          <motion.span className="racing-kicker" variants={revealUp}>
            Why Riders Choose It
          </motion.span>
          <motion.h2 className="racing-title" variants={revealUp}>
            Why CR-1 is different.
          </motion.h2>
          <motion.p className="racing-copy mt-6 max-w-2xl" variants={revealUp}>
            Most coatings are resin or polymer-based and need frequent
            reapplication. CR-1 is inorganic glass, professionally applied for
            durable gloss, easier washing, and stronger surface confidence.
          </motion.p>

          <div className="mt-8 space-y-4 sm:mt-12 sm:space-y-6">
            {points.map((point, index) => (
              <motion.div
                key={point.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealLeft}
                transition={{ delay: index * 0.08 }}
                className="racing-card flex gap-4 bg-card p-4 sm:gap-5 sm:p-5"
                whileHover={{ x: 6 }}
              >
                <div className="motion-sheen" />
                <CheckCircle2 className="mt-1 h-8 w-8 shrink-0 fill-accent text-white" />
                <div>
                  <h3 className="font-[Rajdhani] text-xl font-black uppercase text-foreground sm:text-2xl">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-base leading-7 text-muted-foreground">
                    {point.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <a
            href="/contact"
            className="racing-button mt-8 w-full sm:mt-12 sm:w-auto"
          >
            Ask About CR-1 Coating
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealRight}
          className="racing-media min-h-[420px] sm:min-h-[560px]"
        >
          <div className="motion-sheen z-10" />
          <ImageWithFallback
            src={NakedImg}
            alt="Motorcycle surface protected by CR-1 coating"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute -bottom-28 -right-32 h-60 w-80 rotate-[-38deg] bg-accent/85 sm:-bottom-24 sm:-right-24 sm:h-72 sm:w-96" />
          <motion.div
            className="absolute bottom-0 left-0 max-w-lg p-5 sm:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={mediaReveal}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white">
              Brand Role
            </p>
            <p className="font-[Rajdhani] text-3xl font-black uppercase leading-none text-white sm:text-4xl">
              Invisible armor for motorcycles that need to stay showroom-sharp.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
