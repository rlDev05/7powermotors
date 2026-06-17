import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Hero } from '@/app/components/Hero';
import { ProductPreview } from '@/app/components/ProductPreview';
import { MotorcycleCategories } from '@/app/components/MotorcycleCategories';
import { PerformanceEngineering } from '@/app/components/PerformanceEngineering';
import { Services } from '@/app/components/Services';
import { Testimonials } from '@/app/components/Testimonials';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ProductPreview />
        <MotorcycleCategories />
        <PerformanceEngineering />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
