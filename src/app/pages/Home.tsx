import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Hero } from '@/app/components/Hero';
import { AboutCR1 } from '@/app/components/AboutCR1';
import { ApplicationShowcase } from '@/app/components/ApplicationShowcase';
import { ProductPreview } from '@/app/components/ProductPreview';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <AboutCR1 />
        <ApplicationShowcase />
        <ProductPreview />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
