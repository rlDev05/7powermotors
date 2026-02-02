import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  motorcycle: string;
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: 'Marcus Chen',
      role: 'Professional Rider',
      content:
        'The level of expertise at 7POWER is unmatched. They helped me find the perfect sport bike and the service has been exceptional. Every detail matters to them.',
      rating: 5,
      motorcycle: 'Yamaha YZF-R1M',
    },
    {
      name: 'Sarah Williams',
      role: 'Weekend Enthusiast',
      content:
        'I was nervous about buying my first motorcycle, but the team made the entire process smooth and educational. Two years later, I still get the best service.',
      rating: 5,
      motorcycle: 'Ducati Panigale V2',
    },
    {
      name: 'David Rodriguez',
      role: 'Long-Distance Cruiser',
      content:
        'Premium quality, premium service. The maintenance team keeps my bike running like new. These guys understand what it means to ride with passion.',
      rating: 5,
      motorcycle: 'Harley-Davidson Street Glide',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-accent tracking-[0.2em] mb-4 block"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            TESTIMONIALS
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
            Trusted by Riders Worldwide
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 flex items-center justify-center border border-accent/30 bg-accent/10">
                  <Quote className="text-accent" size={32} />
                </div>
              </div>

              {/* Content */}
              <blockquote
                className="text-center mb-8"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.25rem',
                  lineHeight: 1.8,
                  color: 'var(--foreground)',
                }}
              >
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-accent text-accent" />
                ))}
              </div>

              {/* Author Info */}
              <div className="text-center">
                <div
                  className="mb-1"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                  }}
                >
                  {testimonials[currentIndex].name}
                </div>
                <div
                  className="text-muted-foreground mb-1"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {testimonials[currentIndex].role}
                </div>
                <div
                  className="text-accent"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  {testimonials[currentIndex].motorcycle}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 flex items-center justify-center border border-border hover:border-accent text-foreground hover:text-accent transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-accent'
                      : 'w-2 h-2 bg-border hover:bg-accent/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 flex items-center justify-center border border-border hover:border-accent text-foreground hover:text-accent transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
    </section>
  );
}
