import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import coatingApplicationImg from '@/styles/images/coating/coating-application-web.jpg';
import heroVideo from '@/styles/videos/motor7power.mp4';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={coatingApplicationImg}
          alt="7 POWER premium motorcycle coating application"
          className="h-full w-full object-cover"
          loading="eager"
          // @ts-expect-error fetchPriority is supported by modern browsers.
          fetchPriority="high"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={coatingApplicationImg}
          aria-label="Cinematic 7 POWER motorcycle lifestyle hero video"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/45 to-background/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="absolute -top-48 -left-40 h-72 w-[42rem] rotate-[-12deg] bg-accent/80" />
      <div className="absolute -bottom-44 right-[-24rem] h-72 w-[42rem] rotate-[-42deg] bg-accent/70" />

      <div className="relative z-10 flex min-h-screen items-center px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur"
            >
              <ShieldCheck className="h-4 w-4 text-accent" />
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

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="hidden border-l border-white/10 pl-10 lg:block"
          >
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.24em] text-accent">
              Key Message
            </p>
            <p className="max-w-md font-[Rajdhani] text-4xl font-black uppercase leading-none text-white">
              Precision surface care for Philippine roads, built around
              professional application and lasting finish confidence.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {[
                ['JP', 'Technology'],
                ['PH', 'Climate Fit'],
                ['B2B', 'Partner Ready'],
              ].map(([value, label]) => (
                <div key={value}>
                  <div className="font-[Rajdhani] text-3xl font-black text-accent">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-white/55">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
