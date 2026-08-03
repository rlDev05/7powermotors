import React from 'react';
import { motion } from 'motion/react';
import { Building2, Users, Wrench, MapPinned } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import CruiserImg from '@/styles/images/cruiser.png';

const audiences = [
  {
    icon: <Users className="h-7 w-7" />,
    title: 'Riders',
    subtitle: 'For owners who ride with pride and care with purpose.',
    details:
      'Connect with riders who see every motorcycle as personal and want protection that goes beyond a short-lived showroom shine.',
  },
  {
    icon: <Building2 className="h-7 w-7" />,
    title: 'Shop Partners',
    subtitle: 'For businesses ready to offer more than ordinary detailing.',
    details:
      'Give dealerships, distributors, detailers, and autocare businesses a premium service backed by training and a stronger customer story.',
  },
  {
    icon: <Wrench className="h-7 w-7" />,
    title: 'Service Centers',
    subtitle: 'Professional standards customers can recognize and trust.',
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
    <section id="strategy" className="racing-section bg-background">
      <div className="absolute -right-32 top-10 h-72 w-[32rem] rotate-[-38deg] bg-accent/48" />
      <div className="absolute -left-40 bottom-0 h-64 w-[36rem] rotate-[-30deg] bg-[#c8a96e]/10" />

      <div className="racing-container grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="racing-media min-h-[520px]"
        >
          <ImageWithFallback
            src={CruiserImg}
            alt="Premium motorcycle protected by CR-1 coating care"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
              The Opportunity
            </p>
            <h2 className="font-[Rajdhani] text-4xl font-black uppercase leading-none text-white sm:text-5xl">
              Build the network riders seek—and businesses trust.
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
            <span className="brand-chip">
              CR-1 Partnership Growth
            </span>
            <h2 className="racing-title">
              Turn market interest into authorized growth.
            </h2>
            <p className="racing-copy mt-6">
              CR-1 Philippines brings riders, trained installers, and ambitious partner shops
              into one trusted network—creating clearer customer value and more places to
              experience professional glass-coating protection.
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
                className="racing-card bg-card p-6"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center border border-border bg-secondary text-accent">
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
