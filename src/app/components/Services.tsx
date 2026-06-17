import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Handshake, Shield, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import ScootDragImg from '@/styles/images/scootdrag.png';

const services = [
  {
    icon: <Shield className="h-7 w-7" />,
    title: 'CR-1 Glass Coating',
    description:
      'Professional coating application for motorcycles that need long-lasting gloss, easier cleaning, and stronger surface protection.',
    items: ['Paint and surface protection', 'Gloss preservation', 'Road grime resistance'],
  },
  {
    icon: <GraduationCap className="h-7 w-7" />,
    title: 'Authorized Installer Training',
    description:
      'A pathway for service centers and detailing shops to apply CR-1 with consistent technique and quality control.',
    items: ['Application standards', 'Product handling', 'Service process alignment'],
  },
  {
    icon: <Handshake className="h-7 w-7" />,
    title: 'Dealer & Shop Partnerships',
    description:
      'A premium upsell for motorcycle dealerships, distributors, detailing shops, and autocare businesses.',
    items: ['B2B support', 'Partner enablement', 'Customer trust building'],
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: 'Rider Education Content',
    description:
      'Useful motormaintenance content that positions CR-1 as the expert in motorcycle preservation.',
    items: ['Care tips', 'Before/after stories', 'Rider and shop testimonials'],
  },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-secondary/30 py-28">
      <div className="absolute -left-32 top-0 h-80 w-[36rem] rotate-[-36deg] bg-accent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 max-w-3xl"
        >
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Service Network
          </span>
          <h2 className="font-[Rajdhani] text-[clamp(2.4rem,5vw,4.5rem)] font-black uppercase leading-none text-foreground">
            Product, training, and partner support in one system.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            CR-1 is not only a coating product. It is a partner-ready program
            for riders, shops, and dealerships that want premium surface
            protection with a stronger business story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="border border-border/50 bg-card p-7 transition hover:border-accent/70"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center bg-accent text-white">
                {service.icon}
              </div>
              <h3 className="font-[Rajdhani] text-2xl font-black uppercase text-foreground">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-6 space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-accent">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mt-16 grid min-h-[430px] grid-cols-1 overflow-hidden border border-border/50 bg-card lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="p-8 md:p-12">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-accent">
              B2B Lead Generation
            </p>
            <h3 className="font-[Rajdhani] text-4xl font-black uppercase leading-none text-foreground md:text-5xl">
              Help shops elevate their brand status.
            </h3>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              CR-1 gives partners a premium service story: official Japanese
              certification, application support, and a durable result that
              helps customers feel the difference after every wash-and-ride.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex bg-accent px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-accent/90"
            >
              Apply as a Partner
            </a>
          </div>
          <div className="relative min-h-[320px]">
            <ImageWithFallback
              src={ScootDragImg}
              alt="Motorcycle service and detailing"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
