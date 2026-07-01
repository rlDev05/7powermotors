import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { careProducts } from '@/app/data/products';

const featuredProducts = careProducts.slice(0, 6);

export function ProductPreview() {
  return (
    <section id="products-preview" className="racing-section bg-background">
      <div className="absolute left-[-14rem] top-20 h-44 w-[36rem] rotate-[-18deg] bg-accent/75" />
      <div className="absolute bottom-16 right-[-18rem] h-48 w-[38rem] rotate-[-34deg] bg-black/10" />

      <div className="racing-container">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="racing-kicker">
              Product System
            </span>
            <h2 className="racing-title">
              Cleaner care products, ready for daily riders.
            </h2>
            <p className="racing-copy mt-5">
              A fast-scanning catalog preview for wipes, cloths, covers, and
              maintenance essentials that support professional finish care.
            </p>
          </div>
          <Link
            to="/products"
            className="racing-button"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="racing-card group bg-white/95"
            >
              <Link to="/products" className="block">
                <div className="absolute right-4 top-4 z-10 racing-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="relative flex aspect-[4/3] items-center justify-center bg-white p-8">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-black to-transparent opacity-80" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-0 top-0 bg-[#050505] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-[Rajdhani] text-3xl font-black uppercase leading-none tracking-normal text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-4 min-h-20 text-sm leading-7 text-muted-foreground">
                    {product.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 border-t border-border/50 pt-5 text-sm font-black uppercase tracking-[0.12em] text-foreground">
                    <Sparkles className="h-4 w-4 text-accent" />
                    Explore Product
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
