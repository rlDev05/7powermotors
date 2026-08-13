import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '@/app/components/Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setMobileMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'PRODUCTS', href: '/products' },
    { label: 'SERVICES', href: '/services' },
    { label: 'PRICING', href: '/pricing' },
  ];

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-white text-foreground shadow-[0_8px_24px_rgba(25,25,25,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <div className="min-w-0 transition-transform hover:scale-[1.02]">
            <Link to="/" aria-label="CR-1 Philippines home">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative transition-transform hover:scale-105"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
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
                        className={`absolute bottom-1 left-4 right-4 h-[2px] origin-left bg-gradient-to-r from-accent to-[#c8a96e] transition ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </span>
                  )}
                </NavLink>
              </div>
            ))}
            <div
              className="ml-4 bg-accent px-6 py-3 text-accent-foreground shadow-[0_12px_28px_rgba(214,0,0,0.24)] tracking-wider transition-transform hover:scale-105 hover:bg-[var(--accent-deep)] active:scale-95"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              <Link to="/contact?intent=partner">PARTNER WITH US</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center text-foreground md:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-white md:hidden"
          >
            <div className="space-y-3 px-4 py-5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block border-b border-border py-3 text-sm tracking-wider text-muted-foreground transition-colors hover:text-accent"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact?intent=partner"
                className="block w-full bg-accent px-6 py-3 text-center text-accent-foreground tracking-wider transition-all hover:bg-[var(--accent-deep)]"
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
          </div>
        )}
    </nav>
  );
}
