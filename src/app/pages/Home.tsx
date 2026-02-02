import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Hero } from '@/app/components/Hero';
import { MotorcycleCategories } from '@/app/components/MotorcycleCategories';
import { FeaturedModels } from '@/app/components/FeaturedModels';
import { PerformanceEngineering } from '@/app/components/PerformanceEngineering';
import { Services } from '@/app/components/Services';
import { Testimonials } from '@/app/components/Testimonials';
import { LifestyleGallery } from '@/app/components/LifestyleGallery';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <MotorcycleCategories />
        <FeaturedModels />
        <PerformanceEngineering />
        <Services />
        <Testimonials />
        <LifestyleGallery />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}