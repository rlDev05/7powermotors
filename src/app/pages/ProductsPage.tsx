import React, { useDeferredValue, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, PackageCheck, Search, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { careProducts } from '@/app/data/products';
import { mediaReveal, revealContainer, revealUp } from '@/app/lib/motionPresets';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const selectedCategory = searchParams.get('category');

  const categories = useMemo(
    () => Array.from(new Set(careProducts.map((product) => product.category))),
    []
  );

  const filteredProducts = useMemo(() => careProducts.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const query = deferredSearchTerm.trim().toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.summary.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  }), [deferredSearchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.section
            className="racing-card racing-slashed mb-10 border-border bg-[#f4f1ec] text-foreground"
            initial="hidden"
            animate="visible"
            variants={revealContainer}
          >
            <div className="motion-sheen" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.72fr]">
              <motion.div className="p-5 sm:p-8 md:p-12" variants={revealUp}>
                <span className="brand-chip">
                  <PackageCheck className="h-4 w-4" />
                  CR-1 Product Line
                </span>
                <h1 className="mt-5 font-[Rajdhani] text-[clamp(2.35rem,11vw,5.75rem)] font-black uppercase leading-[0.9] tracking-normal text-foreground sm:leading-[0.88]">
                  Glass coating and care products.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Explore CR-1 coating, shampoo, quick cloth, microfiber, and
                  maintenance products for motorcycles, helmets, parts, and
                  professional after-care.
                </p>
              </motion.div>
              <motion.div
                className="grid min-h-[240px] grid-cols-2 gap-3 bg-secondary/70 p-4 sm:min-h-[320px] sm:p-8"
                variants={mediaReveal}
              >
                {careProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="flex items-center justify-center border border-border bg-white p-4 shadow-[0_18px_35px_rgba(25,25,25,0.09)]"
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.58, delay: 0.38 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    className="max-h-28 w-full object-contain sm:max-h-36"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          <motion.div
            className="racing-card mb-8 bg-card p-4 md:mb-10 md:p-5"
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  <SlidersHorizontal className="h-4 w-4" />
                  Browse Products
                </span>
                <h2 className="font-[Rajdhani] text-3xl font-black uppercase text-foreground">
                  {selectedCategory || 'All Care Products'}
                </h2>
              </div>
              <label className="relative block w-full lg:w-[360px]">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search care products"
                  aria-label="Search care products"
                  className="form-field py-3 pl-12 pr-4 text-sm"
                />
              </label>
            </div>

            <div className="mt-5 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0">
              <Link
                to="/products"
                className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                  !selectedCategory
                    ? 'bg-accent text-white shadow-[0_10px_22px_rgba(214,0,0,0.26)]'
                    : 'border border-border bg-white text-muted-foreground hover:border-[#86672f] hover:text-[#86672f]'
                }`}
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                    selectedCategory === category
                      ? 'bg-accent text-white shadow-[0_10px_22px_rgba(214,0,0,0.26)]'
                      : 'border border-border bg-white text-muted-foreground hover:border-[#86672f] hover:text-[#86672f]'
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={revealContainer}
          >
            {filteredProducts.map((product) => (
              <motion.article
                key={product.id}
                className="racing-card group flex flex-col"
                variants={revealUp}
                whileHover={{ y: -6 }}
              >
                <div className="relative flex aspect-[4/3] items-center justify-center bg-white p-6">
                  <div className="motion-sheen" />
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-black to-transparent opacity-80" />
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                    {product.category}
                  </p>
                  <h3 className="font-[Rajdhani] text-[1.7rem] font-black uppercase leading-none text-foreground sm:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                    {product.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.uses.map((use) => (
                      <span
                        key={use}
                        className="border border-border/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="racing-button-outline mt-6"
                  >
                    Inquire Product
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full border border-dashed border-border bg-card px-5 py-14 text-center">
                <p className="text-lg font-semibold text-foreground">No care products match those filters.</p>
                <button type="button" onClick={() => setSearchTerm('')} className="mt-3 font-bold text-accent hover:underline">
                  Clear search
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
