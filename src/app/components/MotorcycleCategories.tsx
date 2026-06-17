import React from 'react';
import { motion } from 'motion/react';
import { Building2, Users, Wrench, MapPinned } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import CruiserImg from '@/styles/images/cruiser.png';

const audiences = [
  {
    icon: <Users className="h-7 w-7" />,
    title: 'B2C Riders',
    subtitle: 'Motorcycle owners, enthusiasts, collectors, and communities.',
    details:
      'For riders who see their motorcycle as an extension of identity and want showroom shine that lasts longer than ordinary detailing.',
  },
  {
    icon: <Building2 className="h-7 w-7" />,
    title: 'B2B Partners',
    subtitle: 'Dealerships, distributors, detailing shops, and autocare businesses.',
    details:
      'For shops that need a premium upsell, official application training, and a protection system that strengthens customer trust.',
  },
  {
    icon: <Wrench className="h-7 w-7" />,
    title: 'Service Centers',
    subtitle: 'Authorized 7 POWER application partners across key motorcycle hubs.',
    details:
      'A professional network built around process control, product support, and consistent application quality.',
  },
  {
    icon: <MapPinned className="h-7 w-7" />,
    title: 'Growth Markets',
    subtitle: 'Metro Manila, Cebu, Davao, Iloilo, Clark, and Pampanga.',
    details:
      'Focused expansion in regions where premium motorcycles, rider communities, and service businesses are already active.',
  },
];

export function MotorcycleCategories() {
  return (
    <section id="strategy" className="relative overflow-hidden bg-background py-28">
      <div className="absolute -right-32 top-10 h-72 w-[32rem] rotate-[-38deg] bg-accent/90" />
      <div className="absolute -left-40 bottom-0 h-64 w-[36rem] rotate-[-30deg] bg-accent/20" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative min-h-[520px] overflow-hidden border border-border/50"
        >
          <ImageWithFallback
            src={CruiserImg}
            alt="Premium motorcycle protected by 7 POWER coating care"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Growth Direction
            </p>
            <h2 className="font-[Rajdhani] text-4xl font-black uppercase leading-none text-white sm:text-5xl">
              Build a trusted motorcycle coating and surface care network.
            </h2>
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12 max-w-3xl"
          >
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Growth Plan
            </span>
            <h2 className="font-[Rajdhani] text-[clamp(2.4rem,5vw,4.5rem)] font-black uppercase leading-none text-foreground">
              From awareness to authorized application centers.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              7 POWER aims to become a top-of-mind premium motorcycle surface
              care name for riders and a reliable coating partner for shops
              serving the riding community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {audiences.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="border border-border/50 bg-card p-6 transition hover:border-accent/70"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center bg-accent text-white">
                  {item.icon}
                </div>
                <h3 className="font-[Rajdhani] text-2xl font-black uppercase text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-wide text-accent">
                  {item.subtitle}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
