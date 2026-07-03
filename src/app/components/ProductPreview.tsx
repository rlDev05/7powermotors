import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { careProducts } from '@/app/data/products';

const featuredProducts = careProducts.slice(0, 6);

export function ProductPreview() {
  return (
    <section id="products-preview" className="racing-section bg-background">
      <div className="absolute left-[-22rem] top-20 h-40 w-[30rem] rotate-[-18deg] bg-accent/75 sm:left-[-14rem] sm:h-44 sm:w-[36rem]" />
      <div className="absolute bottom-16 right-[-24rem] h-40 w-[30rem] rotate-[-34deg] bg-[#c8a96e]/10 sm:right-[-18rem] sm:h-48 sm:w-[38rem]" />

      <div className="racing-container">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="racing-kicker">
              Product System
            </span>
            <h2 className="racing-title">
              CR-1 glass coating care for daily riders.
            </h2>
            <p className="racing-copy mt-5">
              Coating, shampoo, cloths, wipes, covers, and maintenance
              essentials that support professional finish care after every ride.
            </p>
          </div>
          <Link
            to="/products"
            className="racing-button w-full sm:w-auto"
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
              className="racing-card group bg-card"
            >
              <Link to="/products" className="block">
                <div className="absolute right-4 top-4 z-10 racing-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="relative flex aspect-[4/3] items-center justify-center bg-white p-5 sm:p-8">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-black to-transparent opacity-80" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-0 top-0 bg-[#050505] px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-white sm:px-4 sm:text-xs sm:tracking-[0.18em]">
                    {product.category}
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-[Rajdhani] text-[1.7rem] font-black uppercase leading-none tracking-normal text-foreground sm:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-4 min-h-0 text-sm leading-7 text-muted-foreground sm:min-h-20">
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
