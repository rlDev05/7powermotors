import React from 'react';
import { motion } from 'motion/react';
import { Megaphone, Sparkles, ThumbsUp, Wrench } from 'lucide-react';

const pillars = [
  {
    icon: <Wrench className="h-8 w-8" />,
    title: 'Motocare Maintenance',
    copy: 'Smart hacks and educational content that riders care for their bikes.',
    sample: 'Acid rain risks, wash-and-ride tips, and preservation routines.',
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: 'The CR-1 Advantage',
    copy: 'Highlight professional application, visible gloss, and other USPs.',
    sample: 'Before/after coating results and coated bike stress tests.',
  },
  {
    icon: <ThumbsUp className="h-8 w-8" />,
    title: 'Rider Reviews',
    copy: 'Let local riding communities validate the shine, protection, and experience.',
    sample: 'Shop owner testimonials, endorser reviews, and real bike stories.',
  },
  {
    icon: <Megaphone className="h-8 w-8" />,
    title: 'Promos, News & Trends',
    copy: 'Timely content that creates relevance and encourages action.',
    sample: 'Early booking promos, event coverage, and industry updates.',
  },
];

export function LifestyleGallery() {
  return (
    <section id="content" className="relative overflow-hidden bg-secondary/30 py-28">
      <div className="absolute -right-36 bottom-0 h-72 w-[34rem] rotate-[-38deg] bg-accent" />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Education Themes
          </span>
          <h2 className="font-[Rajdhani] text-[clamp(2.4rem,5vw,4.5rem)] font-black uppercase leading-none text-foreground">
            What CR-1 should talk about.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="border-2 border-accent bg-card"
            >
              <div className="flex min-h-24 items-center gap-4 bg-accent p-5 text-white">
                {pillar.icon}
                <h3 className="font-[Rajdhani] text-2xl font-black uppercase leading-none">
                  {pillar.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-base leading-7 text-foreground">{pillar.copy}</p>
                <p className="mt-6 text-sm font-bold uppercase tracking-wider text-accent">
                  Sample Content
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {pillar.sample}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
