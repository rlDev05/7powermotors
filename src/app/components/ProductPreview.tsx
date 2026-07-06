import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { careProducts } from '@/app/data/products';
import { revealContainer, revealUp } from '@/app/lib/motionPresets';

const featuredProducts = careProducts.slice(0, 6);

export function ProductPreview() {
  return (
    <section id="products-preview" className="racing-section bg-background">
      <div className="absolute left-[-22rem] top-20 h-40 w-[30rem] rotate-[-18deg] bg-accent/75 sm:left-[-14rem] sm:h-44 sm:w-[36rem]" />
      <div className="absolute bottom-16 right-[-24rem] h-40 w-[30rem] rotate-[-34deg] bg-[#c8a96e]/10 sm:right-[-18rem] sm:h-48 sm:w-[38rem]" />

      <div className="racing-container">
        <motion.div
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealContainer}
        >
          <div className="max-w-3xl">
            <motion.span className="racing-kicker" variants={revealUp}>
              Product System
            </motion.span>
            <motion.h2 className="racing-title" variants={revealUp}>
              CR-1 glass coating care for daily riders.
            </motion.h2>
            <motion.p className="racing-copy mt-5" variants={revealUp}>
              Coating, shampoo, cloths, wipes, covers, and maintenance
              essentials that support professional finish care after every ride.
            </motion.p>
          </div>
          <motion.div variants={revealUp}>
          <Link
            to="/products"
            className="racing-button w-full sm:w-auto"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          variants={revealContainer}
        >
          {featuredProducts.map((product, index) => (
            <motion.article
              key={product.id}
              variants={revealUp}
              transition={{ delay: index * 0.06 }}
              className="racing-card group bg-card"
              whileHover={{ y: -6 }}
            >
              <div className="motion-sheen" />
              <Link to="/products" className="block">
                <div className="absolute right-4 top-4 z-10 racing-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="relative flex aspect-[4/3] items-center justify-center bg-white p-5 sm:p-8">
                  <div className="motion-sheen" />
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
        </motion.div>
      </div>
    </section>
  );
}
