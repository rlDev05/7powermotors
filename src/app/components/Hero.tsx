import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1588486624469-ad668ac8e1d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydCUyMG1vdG9yY3ljbGUlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAwMDAzMzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="7POWER MOTORS - Premium Imported Motorcycles"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays - Minimalist approach */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl">
          {/* Eyebrow Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span
              className="inline-block px-4 py-1.5 border border-border/50 text-[#c0c0c0] tracking-[0.2em] backdrop-blur-sm"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              World-High Brand Import
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            RIDE THE
            <br />
            <span className="text-accent">POWER</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 text-muted-foreground max-w-xl"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}
          >
            Experience imported excellence. Premium motorcycles engineered for
            those who demand minimal design and maximum performance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#motorcycles"
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground tracking-wider transition-all hover:bg-accent/90"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              EXPLORE MODELS
              <ChevronRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-border bg-background/50 backdrop-blur-sm text-foreground tracking-wider transition-all hover:bg-foreground hover:text-background"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              BOOK TEST RIDE
              <ChevronRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>

          {/* Stats - Minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-20 flex gap-12"
          >
            {[
              { value: '50+', label: 'Premium Models' },
              { value: '15+', label: 'Global Brands' },
              { value: '10K+', label: 'Riders Served' },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span
                  className="text-foreground mb-1"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '2rem',
                    fontWeight: 700,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-muted-foreground tracking-wide"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border border-border/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
