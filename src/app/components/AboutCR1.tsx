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
    <section className="racing-section bg-[#0b0b0b] py-18 sm:py-20">
      <div className="absolute -left-32 top-10 h-40 w-[30rem] rotate-[-18deg] bg-accent/35" />
      <div className="absolute right-[-16rem] bottom-0 h-36 w-[34rem] rotate-[-30deg] bg-[#c8a96e]/10" />

      <div className="racing-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid gap-8 border border-white/10 bg-white/[0.035] p-6 backdrop-blur md:grid-cols-[0.85fr_1.15fr] md:p-8 lg:p-10"
        >
          <div>
            <span className="brand-chip">What is CR-1?</span>
            <h2 className="mt-5 font-[Rajdhani] text-[clamp(2.4rem,5vw,4.4rem)] font-black uppercase leading-[0.9] text-white">
              Glass armor for your ride.
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p className="max-w-3xl text-lg leading-8 text-white/74">
              CR-1 is a Japan-developed glass coating for motorcycles, helmets,
              and parts. It helps protect the finish, keep the shine, and make
              cleaning easier.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 border border-white/10 bg-black/35 px-4 py-4 text-white"
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
