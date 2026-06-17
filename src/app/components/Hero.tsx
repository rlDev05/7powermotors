import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import coatingApplicationImg from '@/styles/images/coating/coating-application-web.jpg';

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
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="absolute -top-32 -left-24 h-96 w-[44rem] rotate-[-12deg] bg-accent" />
      <div className="absolute -bottom-32 right-[-18rem] h-96 w-[48rem] rotate-[-42deg] bg-accent/90" />

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
              Premium Finish.
              <br />
              Daily Roads.
              <br />
              <span className="text-accent">Lasting Protection.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
            >
              7 POWER helps riders preserve the look, gloss, and confidence of
              their motorcycles through careful surface preparation and
              professionally applied coating services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-accent/90"
              >
                Partner With 7 POWER
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#protection"
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
              Main Promise
            </p>
            <p className="max-w-md font-[Rajdhani] text-4xl font-black uppercase leading-none text-white">
              Professional coating services for riders, dealerships, and
              service centers that care about finish quality.
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
