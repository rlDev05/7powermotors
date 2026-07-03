import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Thermometer } from 'lucide-react';

const highlights = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    label: 'Real Glass Protection',
  },
  {
    icon: <Thermometer className="h-5 w-5" />,
    label: 'Heat, Rain, Road Grime',
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    label: 'Gloss That Lasts',
  },
];

export function AboutCR1() {
  return (
    <section className="racing-section bg-[#0b0b0b] py-16 sm:py-20">
      <div className="absolute -left-52 top-10 h-36 w-[26rem] rotate-[-18deg] bg-accent/35 sm:-left-32 sm:h-40 sm:w-[30rem]" />
      <div className="absolute right-[-24rem] bottom-0 h-32 w-[28rem] rotate-[-30deg] bg-[#c8a96e]/10 sm:right-[-16rem] sm:h-36 sm:w-[34rem]" />

      <div className="racing-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid gap-7 border border-white/10 bg-white/[0.035] p-5 backdrop-blur sm:p-6 md:grid-cols-[0.85fr_1.15fr] md:p-8 lg:p-10"
        >
          <div>
            <span className="brand-chip">What is CR-1?</span>
            <h2 className="mt-5 font-[Rajdhani] text-[clamp(2.4rem,5vw,4.4rem)] font-black uppercase leading-[0.9] text-white">
              Glass armor for your ride.
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p className="max-w-3xl text-base leading-8 text-white/74 sm:text-lg">
              CR-1 is a Japan-developed glass coating for motorcycles, helmets,
              and parts. It helps protect the finish, keep the shine, and make
              cleaning easier.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                className="flex items-center gap-3 border border-white/10 bg-black/35 px-4 py-4 text-white sm:flex-col sm:items-start"
                >
                  <div className="text-[#c8a96e]">{item.icon}</div>
                  <p className="text-sm font-black uppercase leading-5 tracking-[0.08em] text-white">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
