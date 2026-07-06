import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Changed from next/link & next/navigation
import { motion } from 'motion/react';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { bikes } from '@/app/data/bikes';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback'; 
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { mediaReveal, revealContainer, revealUp } from '@/app/lib/motionPresets';

export default function MotorcyclesPage() {
  // React Router hook for query params (?category=sport)
  const [searchParams] = useSearchParams(); 
  const [searchTerm, setSearchTerm] = useState('');
  const selectedCategory = searchParams.get('category');

  const categories = useMemo(
    () => Array.from(new Set(bikes.map((bike) => bike.category))),
    []
  );

  const filteredBikes = bikes.filter((bike) => {
    const matchesCategory = selectedCategory
      ? bike.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Dynamic Title
  const pageTitle = selectedCategory 
    ? selectedCategory.replace(/-/g, ' ').toUpperCase() 
    : 'ALL MODELS';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Back to Home Link */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/" // Changed href to to
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-medium font-inter text-sm group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" height="20" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Home
          </Link>
        </div>

        <motion.section
          className="racing-card racing-slashed mb-10"
          initial="hidden"
          animate="visible"
          variants={revealContainer}
        >
          <div className="motion-sheen" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.75fr]">
            <motion.div className="p-5 sm:p-8 md:p-12" variants={revealUp}>
              <span className="racing-kicker">
                CR-1 Models
              </span>
              <h1 className="racing-title">
                Motorcycle models for finish inspiration.
              </h1>
              <p className="racing-copy mt-6 max-w-3xl">
                Browse model references and featured motorcycles that pair
                naturally with CR-1 surface care.
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-muted-foreground sm:mt-8 sm:gap-3 sm:text-xs sm:tracking-[0.16em]">
                <span className="border border-border px-3 py-2 sm:px-4 sm:py-3">{bikes.length} models</span>
                <span className="border border-border px-3 py-2 sm:px-4 sm:py-3">{categories.length} categories</span>
                <span className="border border-border px-3 py-2 sm:px-4 sm:py-3">Detail pages ready</span>
              </div>
            </motion.div>
            <motion.div className="relative min-h-[240px] bg-secondary/50 sm:min-h-[320px]" variants={mediaReveal}>
              <div className="motion-sheen z-10" />
              <ImageWithFallback
                src={bikes[0]?.image || ''}
                alt="Featured CR-1 motorcycle model"
                className="h-full w-full object-contain p-6 sm:p-10"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/40" />
            </motion.div>
          </div>
        </motion.section>

        <motion.div
          className="racing-card mb-8 bg-white p-4 md:mb-10 md:p-5"
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <SlidersHorizontal className="h-4 w-4" />
                Browse Models
              </span>
              <h2 className="font-[Rajdhani] text-3xl font-black uppercase text-foreground">
                {pageTitle}
              </h2>
            </div>
            <label className="relative block w-full lg:w-[360px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search models"
                className="w-full border border-border bg-input-background py-3 pl-12 pr-4 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </label>
          </div>

          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0">
            <Link
              to="/models"
              className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                !selectedCategory
                  ? 'bg-accent text-white'
                  : 'border border-border text-muted-foreground hover:border-accent hover:text-accent'
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/models?category=${category}`}
                className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'border border-border text-muted-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {category.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Grid Display */}
        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={revealContainer}
        >
          {filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => (
              <motion.div
                key={bike.id} 
                className="racing-card group flex flex-col"
                variants={revealUp}
                whileHover={{ y: -6 }}
              >
                <div className="motion-sheen" />
                {/* Image Area */}
                <Link to={`/models/${bike.id}`} className="relative block h-60 overflow-hidden bg-secondary/40 sm:h-72">
                   <div className="motion-sheen z-10" />
                   <ImageWithFallback 
                     src={bike.image || ''} 
                     alt={bike.name}
                     className="h-full w-full object-contain p-5 transition-transform duration-700 group-hover:scale-105 sm:p-6"
                   />
                   {bike.availability && (
                    <span className="absolute left-4 top-4 bg-amber-500 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-black">
                      Pre-order
                    </span>
                   )}
                </Link>
                
                {/* Content Area */}
                <div className="flex flex-grow flex-col p-5 sm:p-6">
                    <div className="mb-2 flex items-start justify-between">
                        <h2 className="font-rajdhani text-xl font-black uppercase leading-none sm:text-2xl">{bike.name}</h2>
                    </div>
                    <p className="text-muted-foreground text-sm font-inter capitalize mb-4 flex-grow">
                        {bike.category.replace(/-/g, ' ')}
                    </p>
                    
                    {/* THIS IS THE CRITICAL FIX: Link to the specific ID */}
                    <Link 
                        to={`/models/${bike.id}`}
                        className="racing-button-outline mt-auto w-full py-3"
                    >
                        VIEW MODEL
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full border border-dashed border-border bg-card py-20 text-center">
              <p className="text-xl text-muted-foreground font-inter">No models found in this category.</p>
              <Link to="/models" className="text-accent mt-4 inline-block font-bold hover:underline">
                View all models
              </Link>
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
