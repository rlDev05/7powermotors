import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import NakedImg from '@/styles/images/naked.png';

const points = [
  {
    title: 'Premium Application Standards',
    text: 'Position 7 POWER around careful preparation, controlled application, and consistent finish quality.',
  },
  {
    title: 'Professionally Applied',
    text: 'A controlled service experience that separates 7 POWER from DIY care and ordinary detailing packages.',
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
    <section id="protection" className="relative overflow-hidden bg-secondary/30 py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Why Riders Choose It
          </span>
          <h2 className="font-[Rajdhani] text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-none text-foreground">
            Protection That Makes Sense
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            7 POWER focuses on protection value: careful application, lasting
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
                className="flex gap-5"
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
            href="#contact"
            className="mt-12 inline-flex items-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-accent/90"
          >
            Ask About 7 POWER Coating
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative min-h-[560px] overflow-hidden border border-border/50"
        >
          <ImageWithFallback
            src={NakedImg}
            alt="Motorcycle surface protected by 7 POWER coating"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute -bottom-24 -right-24 h-72 w-96 rotate-[-38deg] bg-accent" />
          <div className="absolute bottom-0 left-0 max-w-lg p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
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
