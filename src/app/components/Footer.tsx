import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Mail, MapPin, Music2, Phone } from 'lucide-react';
import { Logo } from '@/app/components/Logo';
import { cr1Contact, cr1SocialLinks } from '@/app/data/brand';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    motorcycles: [
      { label: 'All Products', href: '/products' },
      { label: 'Coating', href: '/products?category=Coating' },
      { label: 'Shampoo', href: '/products?category=Shampoo' },
      { label: 'Quick Cloth', href: '/products?category=Quick%20Cloth' },
      { label: 'Maintenance', href: '/products?category=Maintenance' },
    ],
    services: [
      { label: 'CR-1 Coating Care', href: '/services' },
      { label: 'Installer Training', href: '/services' },
      { label: 'Dealer Partnerships', href: '/services' },
      { label: 'Rider Education', href: '/services' },
    ],
    company: [
      { label: 'Why CR-1', href: '/services' },
      { label: 'Model Gallery', href: '/models' },
      { label: 'Become a Dealer', href: '/contact' },
      { label: 'Dealer Locator', href: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: cr1SocialLinks.facebook, label: 'Facebook' },
    { icon: <Instagram size={20} />, href: cr1SocialLinks.instagram, label: 'Instagram' },
    { icon: <Music2 size={20} />, href: cr1SocialLinks.tiktok, label: 'TikTok' },
  ];

  return (
    <footer className="border-t border-black bg-[#0b0b0b] text-white [--border:rgba(255,255,255,0.14)] [--input-background:#151515] [--muted-foreground:#b8b8b8]">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:mb-12 lg:grid-cols-5 lg:gap-12">
          {/* Brand Column */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-2">
            <Logo className="mb-6 [&_span:last-child]:!text-white/70" />
            <p
              className="text-muted-foreground mb-6 max-w-sm"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                lineHeight: 1.7,
              }}
            >
              CR-1 Philippines brings Japan-developed glass coating care to
              riders, helmets, parts, and partner shops across the Philippines.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={cr1Contact.phoneHref}
              className="flex min-w-0 items-center gap-3 break-words text-muted-foreground transition-colors hover:text-accent"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                <Phone size={16} className="text-accent" />
                {cr1Contact.phoneLabel}
              </a>
              <a
                href={`mailto:${cr1Contact.email}`}
              className="flex min-w-0 items-center gap-3 break-words text-muted-foreground transition-colors hover:text-accent"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                <Mail size={16} className="text-accent" />
                {cr1Contact.email}
              </a>
              <div
                className="flex items-start gap-3 text-muted-foreground"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                  <MapPin size={16} className="mt-0.5 text-accent" />
                <span>
                  {cr1Contact.distributor.label}: {cr1Contact.distributor.name}
                  <br />
                  {cr1Contact.distributor.address}
                </span>
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
              Get CR-1 rider care tips, partner updates, and coating program news.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-h-12 flex-1 border border-border bg-input-background px-4 py-3 text-white placeholder:text-white/45 transition-colors focus:border-accent focus:outline-none"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="min-h-12 bg-accent px-6 py-3 text-accent-foreground shadow-[0_12px_28px_rgba(139,26,26,0.28)] transition-all hover:bg-white hover:text-black"
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
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border/50 pt-8 text-center md:flex-row md:text-left">
          {/* Copyright */}
          <p
            className="text-muted-foreground text-center md:text-left"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
            }}
          >
            Copyright {currentYear} CR-1 Philippines. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-accent text-muted-foreground hover:text-accent transition-all"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
