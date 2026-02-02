import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Gauge, Zap, Weight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface MotorcycleSpec {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface MotorcycleCardProps {
  model: string;
  brand: string;
  tagline: string;
  price: string;
  imageUrl: string;
  specs: MotorcycleSpec[];
  featured?: boolean;
  index: number;
}

function MotorcycleCard({
  model,
  brand,
  tagline,
  price,
  imageUrl,
  specs,
  featured,
  index,
}: MotorcycleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative bg-card border transition-all duration-500 ${
        featured
          ? 'border-accent/50 lg:col-span-2'
          : 'border-border/50 hover:border-accent/30'
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-6 right-6 z-10">
          <span
            className="px-4 py-1.5 bg-accent text-accent-foreground tracking-[0.15em]"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.625rem',
              fontWeight: 700,
            }}
          >
            FEATURED
          </span>
        </div>
      )}

      {/* Image Section */}
      <div className={`relative overflow-hidden ${featured ? 'h-96' : 'h-72'}`}>
        <ImageWithFallback
          src={imageUrl}
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Brand & Model */}
        <div className="mb-4">
          <span
            className="text-accent tracking-[0.15em] block mb-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            {brand}
          </span>
          <h3
            className="mb-2"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: featured ? '2.25rem' : '1.875rem',
              fontWeight: 700,
            }}
          >
            {model}
          </h3>
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              lineHeight: 1.6,
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Specs Grid */}
        <div className={`grid gap-4 mb-6 ${featured ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {specs.map((spec, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="text-accent">{spec.icon}</div>
              <div>
                <div
                  className="text-foreground"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                  }}
                >
                  {spec.value}
                </div>
                <div
                  className="text-muted-foreground"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.625rem',
                    fontWeight: 500,
                  }}
                >
                  {spec.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <div>
            <span
              className="text-muted-foreground block mb-1"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              Starting at
            </span>
            <span
              className="text-foreground"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1.75rem',
                fontWeight: 700,
              }}
            >
              {price}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            VIEW DETAILS
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedModels() {
  const models = [
    {
      brand: 'YAMAHA',
      model: 'YZF-R1M',
      tagline: 'MotoGP-inspired superbike with race-proven technology',
      price: '$26,499',
      imageUrl:
        'https://images.unsplash.com/photo-1710894981210-7a6814b7b740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW1haGElMjByMSUyMG1vdG9yY3ljbGV8ZW58MXx8fHwxNzcwMDAwMzYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      specs: [
        { icon: <Gauge size={20} />, label: 'TOP SPEED', value: '186 mph' },
        { icon: <Zap size={20} />, label: 'HORSEPOWER', value: '200 hp' },
        { icon: <Weight size={20} />, label: 'WEIGHT', value: '201 kg' },
      ],
      featured: true,
    },
    {
      brand: 'DUCATI',
      model: 'Panigale V4',
      tagline: 'Italian excellence with unmatched performance',
      price: '$28,395',
      imageUrl:
        'https://images.unsplash.com/photo-1646292712825-9fa921189da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWNhdGklMjBzdXBlcmJpa2UlMjBtb3RvcmN5Y2xlfGVufDF8fHx8MTc3MDAwMDM2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      specs: [
        { icon: <Gauge size={20} />, label: 'TOP SPEED', value: '199 mph' },
        { icon: <Zap size={20} />, label: 'HORSEPOWER', value: '214 hp' },
      ],
      featured: false,
    },
    {
      brand: 'HARLEY-DAVIDSON',
      model: 'Street Glide',
      tagline: 'American icon with modern performance',
      price: '$22,999',
      imageUrl:
        'https://images.unsplash.com/photo-1676246848792-2f8eb33975b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJsZXklMjBkYXZpZHNvbiUyMG1vdG9yY3ljbGV8ZW58MXx8fHwxNzcwMDAwMzYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      specs: [
        { icon: <Gauge size={20} />, label: 'TOP SPEED', value: '110 mph' },
        { icon: <Zap size={20} />, label: 'TORQUE', value: '111 ft-lb' },
      ],
      featured: false,
    },
  ];

  return (
    <section id="models" className="py-32 bg-secondary/30">
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
            FEATURED MODELS
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
            Engineered Perfection
          </h2>
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}
          >
            Handpicked from the world's most prestigious manufacturers. Each model
            represents the ultimate expression of its category.
          </p>
        </motion.div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <MotorcycleCard key={model.model} {...model} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-border hover:border-accent text-foreground hover:text-accent transition-all"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            VIEW ALL 50+ MODELS
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
