import React from 'react';
import { motion } from 'motion/react';
import { Wrench, ShoppingBag, Settings, Package } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  index: number;
}

function ServiceCard({ icon, title, description, features, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group p-8 bg-card border border-border/50 hover:border-accent/50 transition-all duration-500"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-16 h-16 mb-6 flex items-center justify-center bg-accent/10 border border-accent/30 text-accent"
      >
        {icon}
      </motion.div>

      {/* Title & Description */}
      <h3
        className="mb-3"
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '1.75rem',
          fontWeight: 700,
        }}
      >
        {title}
      </h3>
      <p
        className="text-muted-foreground mb-6"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.875rem',
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>

      {/* Features List */}
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-muted-foreground"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
            }}
          >
            <span className="text-accent mt-1">•</span>
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Services() {
  const services = [
    {
      icon: <ShoppingBag size={32} />,
      title: 'Sales & Financing',
      description:
        'Premium imported motorcycles with flexible financing options. Your dream ride, made accessible.',
      features: [
        'Competitive pricing on all models',
        'Flexible financing & leasing',
        'Trade-in programs available',
        'Expert consultation & guidance',
      ],
    },
    {
      icon: <Wrench size={32} />,
      title: 'Maintenance & Repair',
      description:
        'Factory-trained technicians and genuine parts. Keep your motorcycle running at peak performance.',
      features: [
        'Certified mechanics & technicians',
        'Genuine OEM parts only',
        'Comprehensive service packages',
        'Quick turnaround times',
      ],
    },
    {
      icon: <Settings size={32} />,
      title: 'Custom Modifications',
      description:
        'Personalize your ride with professional customization services. Performance upgrades and aesthetic enhancements.',
      features: [
        'Performance tuning & upgrades',
        'Custom paint & graphics',
        'Exhaust & suspension mods',
        'Accessory installation',
      ],
    },
    {
      icon: <Package size={32} />,
      title: 'Parts & Accessories',
      description:
        'Comprehensive inventory of parts and accessories from premium brands. Everything you need in one place.',
      features: [
        'OEM & aftermarket parts',
        'Riding gear & apparel',
        'Safety equipment',
        'Fast delivery & shipping',
      ],
    },
  ];

  return (
    <section id="services" className="py-32 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span
            className="text-accent tracking-[0.2em] mb-4 block"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            SERVICES
          </span>
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            Complete Care, Unmatched Service
          </h2>
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}
          >
            From purchase to maintenance, customization to parts—we're your
            complete motorcycle partner. Premium service at every touchpoint.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>

        {/* Image Banner with CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-96 overflow-hidden border border-border/50"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1636761358783-209512dccd98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwbWVjaGFuaWMlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NzAwMDA0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="7POWER MOTORS Service Center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-8 md:px-16">
              <h3
                className="mb-4"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                Schedule Your Service
              </h3>
              <p
                className="text-muted-foreground mb-8"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.125rem',
                  lineHeight: 1.7,
                }}
              >
                Our certified technicians are ready to keep your motorcycle in
                perfect condition. Book online or call us today.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                BOOK APPOINTMENT
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
