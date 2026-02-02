import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// 1. Imports
import advRedImg from '@/styles/images/advred.png';
import ScootDragImg from '@/styles/images/scootdrag.png';
import Naked from '@/styles/images/naked.png';
import CruiserImg from '@/styles/images/cruiser.png'; // Add your cruiser image import here

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
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

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
        'Precision-engineered performance machines. Built for speed, agility, and pure adrenaline on the track or street.',
      imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1080&auto=format&fit=crop',
    },
    {
      title: 'NAKED',
      description:
        'Stripped-down styling meets raw power. An upright riding position perfect for urban aggression and canyon carving.',
      imageUrl: Naked,
    },
    {
      title: 'SCOOTER',
      description:
        'The ultimate in urban mobility. Sophisticated style, convenient storage, and efficiency for the modern commuter.',
      imageUrl: ScootDragImg,
    },
    {
      title: 'ADVENTURE',
      description:
        'Go anywhere, do anything. Robust engineering designed for long-distance touring and off-road exploration.',
      imageUrl: advRedImg,
    },
    {
      title: 'CRUISER', // 2. New Category Added
      description:
        'Low-slung style and effortless torque. Designed for those who appreciate the journey as much as the destination.',
      imageUrl: CruiserImg,
    },
  
  ];

  return (
    <section id="motorcycles" className="py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
            From track-ready sport bikes to versatile adventure tourers. 
            Every 7POWER motorcycle represents the pinnacle of engineering excellence.
          </p>
        </motion.div>

        {/* 3. Updated Grid Layout: Changed from lg:grid-cols-4 to lg:grid-cols-3 and xl:grid-cols-5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.title} {...category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}