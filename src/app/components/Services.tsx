import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Handshake, Shield, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import helmetApplicationImg from '@/styles/images/coating/helmet-application-web.jpg';
import { mediaReveal, revealContainer, revealUp } from '@/app/lib/motionPresets';

const services = [
  {
    icon: <Shield className="h-7 w-7" />,
    title: 'CR-1 Coating Care',
    description:
      'Certified application for motorcycles, helmets, and parts that need a true glass film instead of short-lived wax, polymer, or resin.',
    items: ['100% glass coating', 'Gloss preservation', 'Heat and UV resistance'],
  },
  {
    icon: <GraduationCap className="h-7 w-7" />,
    title: 'Authorized Installer Training',
    description:
      'A pathway for service centers and detailing shops to deliver CR-1 with proper preparation, low-pressure spray technique, and quality control.',
    items: ['Surface prep process', 'Product handling', 'Certificate-ready application'],
  },
  {
    icon: <Handshake className="h-7 w-7" />,
    title: 'Dealer & Shop Partnerships',
    description:
      'A premium, high-trust service program for motorcycle dealerships, distributors, detailing shops, and autocare businesses.',
    items: ['Dealer enablement', 'Training support', 'Premium service positioning'],
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: 'Rider Education Content',
    description:
      'Clear care guidance that helps riders understand coating value before and after professional application.',
    items: ['Care tips', 'Before/after stories', 'Rider and shop proof'],
  },
];

export function Services() {
  return (
    <section id="services" className="racing-section bg-secondary/55">
      <div className="absolute -left-52 top-0 h-60 w-[30rem] rotate-[-36deg] bg-accent/65 sm:-left-32 sm:h-80 sm:w-[36rem]" />
      <div className="absolute right-[-22rem] top-24 h-40 w-[28rem] rotate-[-20deg] bg-[#c8a96e]/10 sm:right-[-16rem] sm:h-48 sm:w-[34rem]" />

      <div className="racing-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealContainer}
          className="mb-10 max-w-3xl sm:mb-14"
        >
          <motion.span className="racing-kicker" variants={revealUp}>
            Service Network
          </motion.span>
          <motion.h2 className="racing-title" variants={revealUp}>
            Certified coating, training, and dealer support in one system.
          </motion.h2>
          <motion.p className="racing-copy mt-6" variants={revealUp}>
            Every CR-1 application begins with preparation, cleaning,
            dehydration, degreasing, and professional coating. The result is a
            premium service that riders can see and shops can stand behind.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={revealContainer}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={revealUp}
              className="racing-card p-5 sm:p-7"
              whileHover={{ y: -6 }}
            >
              <div className="motion-sheen" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[#050505] text-[#c8a96e] shadow-[8px_8px_0_rgba(139,26,26,0.28)]">
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
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={mediaReveal}
          className="racing-card mt-12 grid min-h-[430px] grid-cols-1 bg-[#0b0907] text-white sm:mt-16 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="motion-sheen" />
          <div className="p-5 sm:p-8 md:p-12">
            <p className="brand-chip">
              Partner Growth
            </p>
            <h3 className="mt-5 font-[Rajdhani] text-[2.15rem] font-black uppercase leading-none text-white sm:text-4xl md:text-5xl">
              Help shops elevate their brand status.
            </h3>
            <p className="mt-6 text-base leading-8 text-white/70">
              Join the CR-1 dealer network and offer customers a Japan-grade
              coating service with training, certification, and a product story
              that is easy to demonstrate.
            </p>
            <a href="/contact" className="racing-button mt-8">
              Apply as a Partner
            </a>
          </div>
          <div className="relative min-h-[240px] sm:min-h-[320px]">
            <div className="motion-sheen z-10" />
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
