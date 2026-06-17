import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
