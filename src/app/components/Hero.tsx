import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gauge, ShieldCheck, Sparkles } from 'lucide-react';
import cr1HeroVideo from '@/styles/videos/cr1-hero-web.mp4';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0b0907]">
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={cr1HeroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/54 to-black/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-transparent to-black/22" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="absolute -top-48 -left-40 h-72 w-[42rem] rotate-[-12deg] bg-accent/70" />
      <div className="absolute -bottom-44 right-[-24rem] h-72 w-[42rem] rotate-[-42deg] bg-accent/50" />
      <div className="absolute left-0 top-20 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 flex min-h-screen items-center px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.42fr]">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur"
            >
              <ShieldCheck className="h-4 w-4 text-white" />
              Japan Technology · Exclusive PH Distributor
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12 }}
              className="font-[Rajdhani] text-[clamp(3.15rem,8.2vw,7rem)] font-black uppercase leading-[0.86] tracking-normal text-white"
            >
              100% Pure Glass Coating
              <br />
              <span className="text-accent">For Philippine Roads.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 max-w-2xl text-base leading-8 text-white/78 sm:text-lg"
            >
              Not wax, polymer, or resin. CR-1 forms a real glass film for
              motorcycles, helmets, and parts that need lasting gloss, heat
              resistance, and professional-grade protection.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="/contact"
                className="racing-button px-8 py-4"
              >
                Partner With CR-1
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/8 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur transition hover:border-white hover:bg-white hover:text-black"
              >
                Explore Coating Services
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.48 }}
            className="hidden border border-white/15 bg-white/10 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-md lg:block"
          >
            <div className="racing-rule mb-6" />
            {[
              { icon: <ShieldCheck className="h-5 w-5" />, label: 'Hardness', value: '9H' },
              { icon: <Gauge className="h-5 w-5" />, label: 'Heat Resistance', value: '1300°C' },
              { icon: <Sparkles className="h-5 w-5" />, label: 'Durability', value: '10 Years' },
            ].map((item) => (
              <div key={item.label} className="border-b border-white/10 py-5 last:border-b-0">
                <div className="mb-2 flex items-center gap-2 text-white">
                  {item.icon}
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">
                    {item.label}
                  </span>
                </div>
                <p className="font-[Rajdhani] text-3xl font-black uppercase leading-none text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
