import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gauge, ShieldCheck, Sparkles } from 'lucide-react';
import cr1HeroVideo from '@/styles/videos/cr1-hero-web.mp4';

const heroLines = ['100% Pure', 'Glass Coating'];

const heroStats = [
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Hardness', value: '9H' },
  { icon: <Gauge className="h-5 w-5" />, label: 'Heat Resistance', value: '1300°C' },
  { icon: <Sparkles className="h-5 w-5" />, label: 'Durability', value: '10 Years' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0b0907]">
      <div className="absolute inset-0">
        <motion.video
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={cr1HeroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1.01, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/54 to-black/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-transparent to-black/22" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.08)_44%,transparent_58%)]"
          initial={{ x: '-120%' }}
          animate={{ x: '120%' }}
          transition={{ duration: 5.5, delay: 0.8, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="absolute -left-52 -top-52 h-60 w-[32rem] rotate-[-12deg] bg-accent/70 sm:-left-40 sm:-top-48 sm:h-72 sm:w-[42rem]" />
      <div className="absolute -bottom-44 right-[-28rem] h-60 w-[32rem] rotate-[-42deg] bg-accent/50 sm:right-[-24rem] sm:h-72 sm:w-[42rem]" />
      <div className="absolute left-0 top-20 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 flex min-h-screen items-center px-4 pb-12 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.42fr]">
            <motion.div
              className="max-w-4xl"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="mb-5 inline-flex max-w-full items-center gap-2 overflow-hidden border border-white/15 bg-white/5 px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-white/80 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur sm:mb-6 sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.22em]"
              >
                <motion.span
                  className="flex h-7 w-7 items-center justify-center bg-accent"
                  animate={{
                    boxShadow: [
                      '0 0 0 rgba(139,26,26,0)',
                      '0 0 28px rgba(139,26,26,0.65)',
                      '0 0 0 rgba(139,26,26,0)',
                    ],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ShieldCheck className="h-4 w-4 text-white" />
                </motion.span>
                Japan Technology &middot; Exclusive PH Distributor
              </motion.div>

              <h1 className="font-[Rajdhani] text-[clamp(2.75rem,15vw,6.25rem)] font-black uppercase leading-[0.88] tracking-normal text-white sm:leading-[0.86]">
                {heroLines.map((line) => (
                  <span key={line} className="block overflow-hidden pb-1">
                    <motion.span
                      className="block"
                      variants={fadeUp}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
                <span className="relative mt-2 block overflow-hidden pb-2">
                  <motion.span
                    className="relative block text-accent"
                    variants={fadeUp}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  >
                    For Philippine Roads.
                    <motion.span
                      className="absolute inset-y-0 left-[-35%] w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent"
                      animate={{ x: ['0%', '410%'] }}
                      transition={{ duration: 2.8, delay: 1.4, repeat: Infinity, repeatDelay: 3.8, ease: 'easeInOut' }}
                    />
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.72, ease: 'easeOut' }}
                className="mt-5 max-w-2xl text-sm leading-7 text-white/78 sm:mt-6 sm:text-lg sm:leading-8"
              >
                Not wax, polymer, or resin. CR-1 forms a real glass film for
                motorcycles, helmets, and parts that need lasting gloss, heat
                resistance, and professional-grade protection.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.72, ease: 'easeOut' }}
                className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
              >
                <motion.a
                  href="/contact"
                  className="racing-button w-full sm:w-auto sm:px-8 sm:py-4"
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Partner With CR-1
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="/services"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-white/20 bg-white/8 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.1em] text-white backdrop-blur transition hover:border-white hover:bg-white hover:text-black sm:w-auto sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.12em]"
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Coating Services
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 34, filter: 'blur(12px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden overflow-hidden border border-white/15 bg-white/10 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-md lg:block"
            >
              <motion.div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a96e] to-transparent"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rotate-45 bg-accent/20 blur-3xl" />
              <div className="racing-rule mb-4" />
              {heroStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="group relative border-b border-white/10 py-4 last:border-b-0"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.52, delay: 0.82 + index * 0.12, ease: 'easeOut' }}
                >
                  <motion.div
                    className="absolute inset-y-2 left-0 w-1 bg-accent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.48, delay: 1 + index * 0.12, ease: 'easeOut' }}
                  />
                  <div className="mb-2 flex items-center gap-2 pl-4 text-white">
                    <span className="text-[#c8a96e]">{item.icon}</span>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">
                      {item.label}
                    </span>
                  </div>
                  <motion.p
                    className="pl-4 font-[Rajdhani] text-[1.85rem] font-black uppercase leading-none text-white"
                    animate={{ color: ['#ffffff', '#c8a96e', '#ffffff'] }}
                    transition={{ duration: 3.8, delay: 1.4 + index * 0.25, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {item.value}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
