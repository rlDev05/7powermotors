import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers3, ShieldCheck, Thermometer } from 'lucide-react';
import cr1HeroVideo from '@/styles/videos/cr1-hero-web.mp4';

const heroLines = ['100% Pure Glass', 'Motorcycle Exclusive'];

const heroProofPoints = [
  {
    icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
    label: 'Surface Hardness',
    value: '9H',
    detail: 'Helps resist fine care marks',
  },
  {
    icon: <Thermometer className="h-5 w-5" aria-hidden="true" />,
    label: 'Heat Resistance',
    value: '1,300°C',
    detail: 'For approved heat-exposed areas',
  },
  {
    icon: <Layers3 className="h-5 w-5" aria-hidden="true" />,
    label: 'Ultra-Thin Glass',
    value: '0.1 μm',
    detail: 'Preserves texture and character',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function Hero() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#171717]">
      <div className="absolute inset-0">
        <motion.video
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.92] contrast-[1.12] saturate-[1.12]"
          src={cr1HeroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          initial={reducedMotion ? false : { scale: 1.04, opacity: 0 }}
          animate={reducedMotion ? undefined : { scale: 1.01, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/58 via-black/24 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-black/12" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.08)_44%,transparent_58%)]"
          initial={reducedMotion ? false : { x: '-120%' }}
          animate={reducedMotion ? undefined : { x: '120%' }}
          transition={{
            duration: 5.5,
            delay: 0.8,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/28 to-transparent" />
      </div>

      <div
        className="absolute -left-52 -top-52 h-60 w-[32rem] rotate-[-12deg] bg-[#e10600]/85 sm:-left-40 sm:-top-48 sm:h-72 sm:w-[42rem]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-44 right-[-28rem] h-60 w-[32rem] rotate-[-42deg] bg-[#e10600]/68 sm:right-[-24rem] sm:h-72 sm:w-[42rem]"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-20 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen items-center px-4 pb-12 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.42fr]">
            <motion.div
              className="max-w-4xl"
              initial={reducedMotion ? false : 'hidden'}
              animate={reducedMotion ? undefined : 'visible'}
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="mb-5 inline-flex max-w-full items-center gap-2 overflow-hidden border border-black/10 bg-white/78 px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-foreground/85 shadow-[0_18px_45px_rgba(25,25,25,0.1)] backdrop-blur sm:mb-6 sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.22em]"
              >
                <motion.span
                  className="flex h-7 w-7 items-center justify-center bg-accent"
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          boxShadow: [
                            '0 0 0 rgba(225,6,0,0)',
                            '0 0 28px rgba(225,6,0,0.58)',
                            '0 0 0 rgba(225,6,0,0)',
                          ],
                        }
                  }
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ShieldCheck className="h-4 w-4 text-white" aria-hidden="true" />
                </motion.span>
                Japanese Technology &middot; Professional Motorcycle Protection
              </motion.div>

              <h1 className="font-[Rajdhani] text-[clamp(2.35rem,12vw,5.4rem)] font-black uppercase leading-[0.9] tracking-normal text-white [text-shadow:0_3px_24px_rgba(0,0,0,0.34)] sm:leading-[0.88]">
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
                    Ride Protected.
                    <motion.span
                      className="absolute inset-y-0 left-[-35%] w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent"
                      animate={reducedMotion ? undefined : { x: ['0%', '410%'] }}
                      transition={{
                        duration: 2.8,
                        delay: 1.4,
                        repeat: Infinity,
                        repeatDelay: 3.8,
                        ease: 'easeInOut',
                      }}
                      aria-hidden="true"
                    />
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.72, ease: 'easeOut' }}
                className="mt-5 max-w-2xl text-sm leading-7 text-white/82 [text-shadow:0_2px_14px_rgba(0,0,0,0.45)] sm:mt-6 sm:text-lg sm:leading-8"
              >
                CR-1 is a glass coating brand made exclusively for motorcycles. Sprayed on by
                certified technicians and chemically cured into a 100% pure glass layer, it offers
                9H scratch resistance, 1,300°C heat resistance, and about 10 years of durability.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.72, ease: 'easeOut' }}
                className="mt-7 grid max-w-2xl gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4"
              >
                <motion.div
                  className="flex flex-col"
                  whileHover={reducedMotion ? undefined : { y: -3, scale: 1.015 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                >
                  <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/70">
                    For Motorcycle Owners
                  </p>
                  <Link
                    to="/contact?intent=service"
                    className="racing-button w-full flex-1 sm:px-8 sm:py-4"
                  >
                    Get CR-1 Protection
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  whileHover={reducedMotion ? undefined : { y: -3, scale: 1.015 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                >
                  <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/70">
                    For Business Partners
                  </p>
                  <Link
                    to="/contact?intent=partner"
                    className="inline-flex min-h-12 w-full flex-1 items-center justify-center gap-2 border border-white/35 bg-white/92 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.1em] text-foreground shadow-lg backdrop-blur transition hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.12em]"
                  >
                    Partner With CR-1
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.ul
                variants={fadeUp}
                transition={{ duration: 0.72, ease: 'easeOut' }}
                className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/80 lg:hidden"
                aria-label="CR-1 technical proof"
              >
                {heroProofPoints.map((item) => (
                  <li key={item.label}>
                    <span className="text-white">{item.value}</span> {item.label}
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.aside
              initial={reducedMotion ? false : { opacity: 0, x: 34, filter: 'blur(12px)' }}
              animate={reducedMotion ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden overflow-hidden border border-black/10 bg-white/80 p-5 shadow-[0_24px_70px_rgba(25,25,25,0.13)] backdrop-blur-md lg:block"
              aria-label="CR-1 technical proof"
            >
              <motion.div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a96e] to-transparent"
                animate={reducedMotion ? undefined : { opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rotate-45 bg-accent/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="racing-rule mb-4" aria-hidden="true" />

              {heroProofPoints.map((item) => (
                <div key={item.label} className="relative border-b border-black/10 py-4 last:border-b-0">
                  <span className="absolute inset-y-2 left-0 w-1 bg-accent" aria-hidden="true" />
                  <div className="mb-2 flex items-center gap-2 pl-4 text-foreground">
                    <span className="text-[#86672f]">{item.icon}</span>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <p className="pl-4 font-[Rajdhani] text-[1.85rem] font-black uppercase leading-none text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-2 pl-4 text-xs leading-5 text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
