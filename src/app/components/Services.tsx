import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Handshake, Shield, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import helmetApplicationImg from '@/styles/images/coating/helmet-application-web.jpg';
import { mediaReveal, revealContainer, revealUp } from '@/app/lib/motionPresets';

const services = [
  {
    icon: <Shield className="h-7 w-7" />,
    title: 'CR-1 Professional Protection',
    description:
      'Give motorcycles, helmets, and approved parts protection with substance—not another short-lived wax, polymer, or resin shine.',
    items: ['100% pure glass coating', 'Scratch-resistant finish', 'Helps slow UV-related fading'],
  },
  {
    icon: <GraduationCap className="h-7 w-7" />,
    title: 'Authorized Installer Training',
    description:
      'Turn correct preparation, controlled spray technique, and quality checks into a repeatable premium service your team can stand behind.',
    items: ['Surface prep process', 'Product handling', 'Certificate-ready application'],
  },
  {
    icon: <Handshake className="h-7 w-7" />,
    title: 'Dealer & Shop Partnerships',
    description:
      'Add a high-trust service that helps dealerships, detailers, distributors, and autocare businesses stand apart in a crowded market.',
    items: ['Dealer enablement', 'Training support', 'Premium service positioning'],
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: 'Rider Education Content',
    description:
      'Give customers the confidence to say yes—and the guidance to care for their finish after professional application.',
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
            One System. Two Ways Forward.
          </motion.span>
          <motion.h2 className="racing-title" variants={revealUp}>
            Protection riders want. A premium service businesses can grow.
          </motion.h2>
          <motion.p className="racing-copy mt-6" variants={revealUp}>
            From certified rider applications to installer training and partner support, CR-1
            connects a better ownership experience with a stronger business opportunity—all
            through one professional system.
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
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-border bg-secondary text-[#86672f] shadow-[8px_8px_0_rgba(225,6,0,0.16)]">
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
          className="racing-card mt-12 grid min-h-[430px] grid-cols-1 bg-card text-foreground sm:mt-16 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="motion-sheen" />
          <div className="p-5 sm:p-8 md:p-12">
            <p className="brand-chip">
              Your Next Premium Advantage
            </p>
            <h3 className="mt-5 font-[Rajdhani] text-[2.15rem] font-black uppercase leading-none text-foreground sm:text-4xl md:text-5xl">
              Differentiate your shop. Elevate every customer handover.
            </h3>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Bring customers a Japan-developed protection service with professional training,
              recognizable value, and a finish they can immediately appreciate. CR-1 gives your
              business another reason to be chosen—and remembered.
            </p>
            <a href="/contact?intent=partner" className="racing-button mt-8">
              Start Your CR-1 Partnership
            </a>
          </div>
          <div className="relative min-h-[240px] sm:min-h-[320px]">
            <div className="motion-sheen z-10" />
            <ImageWithFallback
              src={helmetApplicationImg}
              alt="Motorcycle service and detailing"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
