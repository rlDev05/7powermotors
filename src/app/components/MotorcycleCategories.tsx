import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
}

function CategoryCard({ title, description, imageUrl, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden bg-card border border-border/50 hover:border-accent/50 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-8">
        <h3
          className="mb-3"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
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
        <motion.a
          href="#models"
          className="inline-flex items-center gap-2 text-accent group-hover:gap-3 transition-all"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
          whileHover={{ x: 5 }}
        >
          EXPLORE
          <ChevronRight size={16} />
        </motion.a>
      </div>
    </motion.div>
  );
}

export function MotorcycleCategories() {
  const categories = [
    {
      title: 'SPORT',
      description:
        'Precision-engineered performance machines. Built for speed, agility, and pure adrenaline.',
      imageUrl:
        'https://images.unsplash.com/photo-1640237039271-46cc45fb3dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydCUyMGJpa2UlMjByYWNpbmclMjBtb3RvcmN5Y2xlfGVufDF8fHx8MTc3MDAwMDM2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'CRUISER',
      description:
        'Classic comfort meets modern engineering. Long-distance freedom with timeless style.',
      imageUrl:
        'https://images.unsplash.com/photo-1675868934032-0607db7734dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2VyJTIwbW90b3JjeWNsZSUyMGhpZ2h3YXl8ZW58MXx8fHwxNzcwMDAwMzYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'ELECTRIC',
      description:
        'The future of riding. Zero emissions, instant torque, and cutting-edge innovation.',
      imageUrl:
        'https://images.unsplash.com/photo-1701666469257-319f272914c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMG1vdG9yY3ljbGUlMjBtb2Rlcm58ZW58MXx8fHwxNzcwMDAwMzYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section id="motorcycles" className="py-32 bg-background">
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
            CATEGORIES
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
            Find Your Perfect Ride
          </h2>
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}
          >
            From race-ready sport bikes to classic cruisers and cutting-edge
            electric models. Every 7POWER motorcycle is imported from world-renowned
            brands, representing the pinnacle of engineering excellence.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.title} {...category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
