import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { Logo } from '@/app/components/Logo';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'PRODUCTS', href: '/products' },
    { label: 'SERVICES', href: '/services' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#050505]/92 text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl [--foreground:#ffffff] [--muted-foreground:rgba(255,255,255,0.62)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" aria-label="CR-1 Philippines home">
              <Logo className="[&_span:last-child]:!text-white/68" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                className="relative"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <NavLink to={item.href}>
                  {({ isActive }) => (
                    <span
                      className={`group relative block px-4 py-3 text-xs font-black uppercase tracking-[0.16em] transition ${
                        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute bottom-1 left-4 right-4 h-[2px] origin-left bg-gradient-to-r from-accent to-white transition ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </span>
                  )}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 bg-accent px-6 py-3 text-accent-foreground shadow-[0_12px_28px_rgba(139,26,26,0.32)] tracking-wider transition-all hover:bg-white hover:text-black"
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
            className="border-t border-white/10 bg-[#050505] md:hidden"
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
                className="block w-full bg-accent px-6 py-3 text-center text-accent-foreground tracking-wider transition-all hover:bg-white hover:text-black"
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
