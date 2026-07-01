import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Handshake, Shield, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import helmetApplicationImg from '@/styles/images/coating/helmet-application-web.jpg';

const services = [
  {
    icon: <Shield className="h-7 w-7" />,
    title: 'CR-1 Coating Care',
    description:
      'Professional coating application for motorcycles that need long-lasting gloss, easier cleaning, and stronger surface protection.',
    items: ['Paint and surface protection', 'Gloss preservation', 'Road grime resistance'],
  },
  {
    icon: <GraduationCap className="h-7 w-7" />,
    title: 'Authorized Installer Training',
    description:
      'A pathway for service centers and detailing shops to apply CR-1 coating services with consistent technique and quality control.',
    items: ['Application standards', 'Product handling', 'Service process alignment'],
  },
  {
    icon: <Handshake className="h-7 w-7" />,
    title: 'Dealer & Shop Partnerships',
    description:
      'A premium upsell for motorcycle dealerships, distributors, detailing shops, and autocare businesses.',
    items: ['Shop support', 'Partner enablement', 'Customer trust building'],
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: 'Rider Education Content',
    description:
      'Useful motorcycle maintenance content that positions CR-1 as a helpful voice in motorcycle preservation.',
    items: ['Care tips', 'Before/after stories', 'Rider and shop testimonials'],
  },
];

export function Services() {
  return (
    <section id="services" className="racing-section bg-secondary/45">
      <div className="absolute -left-32 top-0 h-80 w-[36rem] rotate-[-36deg] bg-accent/65" />
      <div className="absolute right-[-16rem] top-24 h-48 w-[34rem] rotate-[-20deg] bg-white/75" />

      <div className="racing-container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 max-w-3xl"
        >
          <span className="racing-kicker">
            Service Network
          </span>
          <h2 className="racing-title">
            Product, training, and partner support in one system.
          </h2>
          <p className="racing-copy mt-6">
            CR-1 is not only a coating service. It is a partner-ready program
            for riders, shops, and dealerships that want premium surface
            protection with a stronger business story.
          </p> 
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="racing-card p-7"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[#050505] text-accent shadow-[8px_8px_0_rgba(227,6,19,0.22)]">
                {service.icon}
              </div>
              <h3 className="font-[Rajdhani] text-2xl font-black uppercase leading-none tracking-normal text-foreground">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-6 space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="font-black text-accent">/</span>
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
          className="racing-card mt-16 grid min-h-[430px] grid-cols-1 bg-[#0b0907] text-white lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="p-8 md:p-12">
            <p className="brand-chip">
              Partner Growth
            </p>
            <h3 className="mt-5 font-[Rajdhani] text-4xl font-black uppercase leading-none text-white md:text-5xl">
              Help shops elevate their brand status.
            </h3>
            <p className="mt-6 text-base leading-8 text-white/70">
              CR-1 gives partners a premium service story: application
              support, polished presentation, and a result customers can
              appreciate every time they clean and ride.
            </p>
            <a href="/contact" className="racing-button mt-8">
              Apply as a Partner
            </a>
          </div>
          <div className="relative min-h-[320px]">
            <ImageWithFallback
              src={helmetApplicationImg}
              alt="Motorcycle service and detailing"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0907] via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
