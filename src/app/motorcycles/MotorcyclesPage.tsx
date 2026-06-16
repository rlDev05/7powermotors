// src/app/motorcycles/MotorcyclesPage.tsx
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Changed from next/link & next/navigation
import { bikes } from '@/app/data/bikes';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback'; 
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';

export default function MotorcyclesPage() {
  // React Router hook for query params (?category=sport)
  const [searchParams] = useSearchParams(); 
  const selectedCategory = searchParams.get('category');

  // Filter Logic
  const filteredBikes = selectedCategory
    ? bikes.filter((bike) => 
        bike.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : bikes;

  // Dynamic Title
  const pageTitle = selectedCategory 
    ? selectedCategory.replace(/-/g, ' ').toUpperCase() 
    : 'ALL MOTORCYCLES';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Back to Home Link */}
        <div className="mb-6">
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
            Back to Main Page
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 border-b border-border/40 pb-6">
          <div>
             <span className="text-accent tracking-widest text-xs font-bold font-inter mb-2 block">INVENTORY</span>
             <h1 className="text-4xl font-bold font-rajdhani text-foreground">{pageTitle}</h1>
          </div>
          
          {selectedCategory && (
            <Link 
              to="/motorcycles" 
              className="text-sm font-semibold text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
            >
              x Clear Filters
            </Link>
          )}
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => (
              <div 
                key={bike.id} 
                className="group bg-card border border-border/50 overflow-hidden hover:border-accent/50 transition-all duration-300 flex flex-col"
              >
                {/* Image Area */}
                <div className="h-64 overflow-hidden relative">
                   <ImageWithFallback 
                     src={bike.image || ''} 
                     alt={bike.name}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                   />
                </div>
                
                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-bold font-rajdhani">{bike.name}</h2>
                        <span className="text-accent font-bold font-rajdhani text-xl">
                            ${bike.price.toLocaleString()}
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm font-inter capitalize mb-4 flex-grow">
                        {bike.category.replace(/-/g, ' ')}
                    </p>
                    
                    {/* THIS IS THE CRITICAL FIX: Link to the specific ID */}
                    <Link 
                        to={`/motorcycles/${bike.id}`}
                        className="w-full block text-center py-3 border border-input text-foreground font-semibold font-rajdhani hover:bg-accent hover:text-white hover:border-accent transition-colors"
                    >
                        VIEW DETAILS
                    </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-card border border-dashed border-border rounded-lg">
              <p className="text-xl text-muted-foreground font-inter">No motorcycles found in this category.</p>
              <Link to="/motorcycles" className="text-accent mt-4 inline-block font-bold hover:underline">
                View all motorcycles
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
