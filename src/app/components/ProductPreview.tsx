import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Gauge, ShieldCheck } from 'lucide-react';
import { bikes } from '@/app/data/bikes';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const featuredBikeIds = ['1', '6', '7'];

export function ProductPreview() {
  const featuredBikes = featuredBikeIds
    .map((id) => bikes.find((bike) => bike.id === id))
    .filter(Boolean)
    .map((bike) => bike!);

  return (
    <section id="products-preview" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Motorcycles & Products
            </span>
            <h2 className="font-[Rajdhani] text-[clamp(2.4rem,5vw,4.75rem)] font-black uppercase leading-none text-foreground">
              Shop the bikes, then protect the finish.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              7 POWER carries standout motorcycles and supports riders with
              coating care that keeps every machine looking prepared for the road.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-accent px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-accent/90"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featuredBikes.map((bike, index) => (
            <motion.article
              key={bike.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group overflow-hidden border border-border/50 bg-card transition hover:border-accent/70"
            >
              <Link to={`/motorcycles/${bike.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
                  <ImageWithFallback
                    src={bike.image}
                    alt={bike.name}
                    className="h-full w-full object-contain p-6 transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-5 top-5 bg-background/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent backdrop-blur">
                    {bike.category.replace(/-/g, ' ')}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-[Rajdhani] text-3xl font-black uppercase leading-none text-foreground">
                    {bike.name}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {bike.view360 && (
                      <span className="inline-flex items-center gap-2 border border-border/70 px-3 py-2">
                        <Gauge className="h-4 w-4 text-accent" />
                        360 View
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 border border-border/70 px-3 py-2">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                      Coating Ready
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-5">
                    <span className="font-[Rajdhani] text-2xl font-black text-accent">
                      ${bike.price.toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                      Details
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
