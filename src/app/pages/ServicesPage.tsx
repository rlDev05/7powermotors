import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Services } from '@/app/components/Services';
import { FeaturedModels } from '@/app/components/FeaturedModels';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <Services />
        <FeaturedModels />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
