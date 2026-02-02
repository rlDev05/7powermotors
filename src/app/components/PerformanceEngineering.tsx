import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Award, TrendingUp } from 'lucide-react';

interface PerformanceStatProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function PerformanceStat({ icon, title, description, index }: PerformanceStatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-8 bg-card border border-border/50 hover:border-accent/50 transition-all duration-500"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
        className="w-14 h-14 mb-6 flex items-center justify-center bg-accent/10 border border-accent/30 text-accent"
      >
        {icon}
      </motion.div>

      {/* Content */}
      <h3
        className="mb-3"
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 700,
        }}
      >
        {title}
      </h3>
      <p
        className="text-muted-foreground"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.875rem',
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}

export function PerformanceEngineering() {
  const stats = [
    {
      icon: <Shield size={28} />,
      title: 'Premium Safety',
      description:
        'Advanced ABS, traction control, and rider assistance systems. Safety without compromise.',
    },
    {
      icon: <Zap size={28} />,
      title: 'Peak Performance',
      description:
        'Cutting-edge engines, aerodynamics, and suspension engineering for ultimate control.',
    },
    {
      icon: <Award size={28} />,
      title: 'World-Class Brands',
      description:
        'Imported directly from legendary manufacturers. Authentic excellence, guaranteed.',
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Proven Reliability',
      description:
        'Rigorous testing and quality control. Built to perform for thousands of miles.',
    },
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span
            className="text-accent tracking-[0.2em] mb-4 block"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            ENGINEERING EXCELLENCE
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
            Performance Meets Precision
          </h2>
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}
          >
            Every motorcycle in our collection represents decades of engineering
            innovation, refined to deliver the perfect balance of power, control,
            and reliability.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <PerformanceStat key={stat.title} {...stat} index={index} />
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '200+', label: 'HP Average' },
            { value: '186', label: 'MPH Top Speed' },
            { value: '2.9s', label: '0-60 MPH' },
            { value: '99%', label: 'Customer Rating' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div
                className="text-accent mb-2"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-muted-foreground tracking-wide"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
