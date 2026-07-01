import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import NakedImg from '@/styles/images/naked.png';

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
    text: 'Designed for heat, UV exposure, rain, daily dust, and road grime across demanding riding conditions.',
  },
  {
    title: 'Longer-Lasting Durability',
    text: "Built to help preserve gloss, reduce cleaning fatigue, and protect a motorcycle's premium appearance over time.",
  },
];

export function FeaturedModels() {
  return (
    <section id="protection" className="racing-section bg-background">
      <div className="absolute right-[-14rem] top-16 h-44 w-[34rem] rotate-[-22deg] bg-accent/40" />
      <div className="absolute left-[-18rem] bottom-10 h-40 w-[34rem] rotate-[-28deg] bg-black/10" />
      <div className="racing-container grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="racing-kicker">
            Why Riders Choose It
          </span>
          <h2 className="racing-title">
            Protection That Makes Sense
          </h2>
          <p className="racing-copy mt-6 max-w-2xl">
            CR-1 focuses on protection value: careful application, lasting
            gloss, and a motorcycle finish that stays easier to maintain.
          </p>

          <div className="mt-12 space-y-6">
            {points.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="racing-card flex gap-5 bg-white/95 p-5"
              >
                <CheckCircle2 className="mt-1 h-8 w-8 shrink-0 fill-accent text-white" />
                <div>
                  <h3 className="font-[Rajdhani] text-2xl font-black uppercase text-foreground">
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
            className="racing-button mt-12"
          >
            Ask About CR-1 Coating
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="racing-media min-h-[560px]"
        >
          <ImageWithFallback
            src={NakedImg}
            alt="Motorcycle surface protected by CR-1 coating"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute -bottom-24 -right-24 h-72 w-96 rotate-[-38deg] bg-accent/85" />
          <div className="absolute bottom-0 left-0 max-w-lg p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white">
              Brand Role
            </p>
            <p className="font-[Rajdhani] text-4xl font-black uppercase leading-none text-white">
              Invisible armor for motorcycles that need to stay showroom-sharp.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
