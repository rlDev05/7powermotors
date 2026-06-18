import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, PackageCheck, Search, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { careProducts } from '@/app/data/products';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const selectedCategory = searchParams.get('category');

  const categories = useMemo(
    () => Array.from(new Set(careProducts.map((product) => product.category))),
    []
  );

  const filteredProducts = careProducts.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.summary.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="racing-card racing-slashed mb-10 border-black/10 bg-[#0b0907] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.72fr]">
              <div className="p-8 md:p-12">
                <span className="brand-chip">
                  <PackageCheck className="h-4 w-4" />
                  7 POWER Products
                </span>
                <h1 className="mt-5 font-[Rajdhani] text-[clamp(2.9rem,6vw,5.75rem)] font-black uppercase leading-[0.88] tracking-normal text-white">
                  Care products for cleaner rides.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                  Browse cloths, wipes, covers, and maintenance products made to
                  support daily motorcycle care and professional surface work.
                </p>
              </div>
              <div className="grid min-h-[320px] grid-cols-2 gap-3 bg-white/7 p-8">
                {careProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="flex items-center justify-center border border-white/15 bg-white p-4 shadow-[0_18px_35px_rgba(0,0,0,0.18)]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-36 w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="racing-card mb-10 bg-white/95 p-4 md:p-5">
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
                  className="form-field py-3 pl-12 pr-4 text-sm"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/products"
                className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                  !selectedCategory
                    ? 'bg-accent text-white shadow-[0_10px_22px_rgba(255,90,0,0.2)]'
                    : 'border border-border bg-white text-muted-foreground hover:border-accent hover:text-accent'
                }`}
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                    selectedCategory === category
                      ? 'bg-accent text-white shadow-[0_10px_22px_rgba(255,90,0,0.2)]'
                      : 'border border-border bg-white text-muted-foreground hover:border-accent hover:text-accent'
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="racing-card group flex flex-col"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center bg-white p-6">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-[#ffc400] to-transparent opacity-80" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                    {product.category}
                  </p>
                  <h3 className="font-[Rajdhani] text-3xl font-black uppercase leading-none text-foreground">
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
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
