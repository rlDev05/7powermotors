import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/app/components/Logo';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'PRODUCTS', href: '/products' },
    { label: 'SERVICES', href: '/services' },
    { label: 'PARTNERS', href: '/#strategy' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" aria-label="7 POWER home">
              <Logo />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                className="text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors relative group"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={item.href}>{item.label}</Link>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-accent text-accent-foreground tracking-wider transition-all hover:bg-accent/90"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              <Link to="/contact">PARTNER WITH US</Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-card border-t border-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors py-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="w-full px-6 py-3 bg-accent text-accent-foreground tracking-wider transition-all hover:bg-accent/90"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                PARTNER WITH US
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
