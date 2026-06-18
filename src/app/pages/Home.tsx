import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Hero } from '@/app/components/Hero';
import { ApplicationShowcase } from '@/app/components/ApplicationShowcase';
import { Z900RSShowcase } from '@/app/components/Z900RSShowcase';
import { ProductPreview } from '@/app/components/ProductPreview';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ApplicationShowcase />
        <Z900RSShowcase />
        <ProductPreview />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
