import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Changed from next/link & next/navigation
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { bikes } from '@/app/data/bikes';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback'; 
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';

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
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Back to Home Link */}
        <div className="mb-8">
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

        <section className="racing-card racing-slashed mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.75fr]">
            <div className="p-8 md:p-12">
              <span className="racing-kicker">
                7 POWER Models
              </span>
              <h1 className="racing-title">
                Motorcycle models for finish inspiration.
              </h1>
              <p className="racing-copy mt-6 max-w-3xl">
                Browse model references and featured motorcycles that pair
                naturally with 7 POWER surface care.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="border border-border px-4 py-3">{bikes.length} models</span>
                <span className="border border-border px-4 py-3">{categories.length} categories</span>
                <span className="border border-border px-4 py-3">Detail pages ready</span>
              </div>
            </div>
            <div className="relative min-h-[320px] bg-secondary/50">
              <ImageWithFallback
                src={bikes[0]?.image || ''}
                alt="Featured 7 POWER motorcycle model"
                className="h-full w-full object-contain p-10"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/40" />
            </div>
          </div>
        </section>

        <div className="racing-card mb-10 bg-white p-4 md:p-5">
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

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/models"
              className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
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
                className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'border border-border text-muted-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {category.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => (
              <div 
                key={bike.id} 
                className="racing-card group flex flex-col"
              >
                {/* Image Area */}
                <Link to={`/models/${bike.id}`} className="h-72 overflow-hidden relative bg-secondary/40 block">
                   <ImageWithFallback 
                     src={bike.image || ''} 
                     alt={bike.name}
                     className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105" 
                   />
                   {bike.availability && (
                    <span className="absolute left-4 top-4 bg-amber-500 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-black">
                      Pre-order
                    </span>
                   )}
                </Link>
                
                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-black uppercase font-rajdhani leading-none">{bike.name}</h2>
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
              </div>
            ))
          ) : (
            <div className="col-span-full border border-dashed border-border bg-card py-20 text-center">
              <p className="text-xl text-muted-foreground font-inter">No models found in this category.</p>
              <Link to="/models" className="text-accent mt-4 inline-block font-bold hover:underline">
                View all models
              </Link>
            </div>
          )}
        </div>
      </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
