import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/app/components/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    motorcycles: [
      { label: 'All Products', href: '/products' },
      { label: 'Quick Cloth', href: '/products?category=Quick%20Cloth' },
      { label: 'Maintenance', href: '/products?category=Maintenance' },
      { label: 'Protection', href: '/products?category=Protection' },
    ],
    services: [
      { label: '7 POWER Coating Care', href: '/services' },
      { label: 'Installer Training', href: '/services' },
      { label: 'Dealer Partnerships', href: '/services' },
      { label: 'Rider Education', href: '/services' },
    ],
    company: [
      { label: 'Rider Proof', href: '/partners#proof' },
      { label: 'Model Gallery', href: '/models' },
      { label: 'Partner Program', href: '/partners' },
      { label: 'Coverage Map', href: '/contact' },
      { label: 'Contact', href: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Youtube size={20} />, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="border-t border-black bg-[#0b0b0b] text-white [--border:rgba(255,255,255,0.14)] [--input-background:#151515] [--muted-foreground:#b8b8b8]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo className="mb-6 [&_span:last-child]:!text-white/70" />
            <p
              className="text-muted-foreground mb-6 max-w-sm"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                lineHeight: 1.7,
              }}
            >
              7 POWER helps riders and shops preserve motorcycle finish
              quality through professionally applied coating care.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+63"
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                <Phone size={16} className="text-accent" />
                +63 7POWER
              </a>
              <a
                href="mailto:partners@7powermotors.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                <Mail size={16} className="text-accent" />
                partners@7powermotors.com
              </a>
              <div
                className="flex items-start gap-3 text-muted-foreground"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                  <MapPin size={16} className="mt-0.5 text-accent" />
                Metro Manila<br />Philippines
              </div>
            </div>
          </div>

          {/* Motorcycles Links */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              PRODUCTS
            </h4>
            <ul className="space-y-3">
              {footerLinks.motorcycles.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              SERVICES
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              COMPANY
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-t border-border/50">
          <div className="max-w-2xl">
            <h4
              className="mb-3"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              Stay Updated
            </h4>
            <p
              className="text-muted-foreground mb-6"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                lineHeight: 1.7,
              }}
            >
              Get 7 POWER rider care tips, partner updates, and coating program news.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border border-border bg-input-background px-4 py-3 text-white placeholder:text-white/45 transition-colors focus:border-accent focus:outline-none"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-accent px-6 py-3 text-accent-foreground shadow-[0_12px_28px_rgba(255,90,0,0.2)] transition-all hover:bg-white hover:text-black"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                SUBSCRIBE
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p
            className="text-muted-foreground text-center md:text-left"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
            }}
          >
            Copyright {currentYear} 7 POWER. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-accent text-muted-foreground hover:text-accent transition-all"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
