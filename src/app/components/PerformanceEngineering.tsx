import React from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, Megaphone, Route, TrendingUp } from 'lucide-react';

const objectives = [
  {
    icon: <Megaphone className="h-7 w-7" />,
    label: 'Brand Awareness',
    copy: 'Position CR-1 Philippines as a premium motorcycle coating and surface care partner.',
  },
  {
    icon: <Route className="h-7 w-7" />,
    label: 'Distribution',
    copy: 'Train authorized installers around major motorcycle hubs within the first expansion phase.',
  },
  {
    icon: <TrendingUp className="h-7 w-7" />,
    label: 'Revenue',
    copy: 'Establish dealership, detailing shop, and service center partnerships for recurring coating applications.',
  },
  {
    icon: <BadgeCheck className="h-7 w-7" />,
    label: 'Trust',
    copy: 'Build confidence through professional application, visible finish quality, and rider-focused proof.',
  },
];

export function PerformanceEngineering() {
  return (
    <section id="objectives" className="bg-background py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 max-w-3xl"
        >
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Market Focus
          </span>
          <h2 className="font-[Rajdhani] text-[clamp(2.4rem,5vw,4.5rem)] font-black uppercase leading-none text-foreground">
            Awareness, partners, and professional service centers.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {objectives.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group border border-border/50 bg-card p-7 transition hover:border-accent/70"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center bg-accent text-white transition group-hover:scale-105">
                {item.icon}
              </div>
              <h3 className="font-[Rajdhani] text-2xl font-black uppercase text-foreground">
                {item.label}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-16 border-l-4 border-accent bg-secondary/40 p-8"
        >
          <p className="max-w-5xl font-[Rajdhani] text-3xl font-black uppercase leading-tight text-foreground md:text-4xl">
            The long-term vision is to establish CR-1 Philippines as a recognized and
            respected motorcycle coating and surface care name.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
