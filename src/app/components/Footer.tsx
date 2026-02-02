import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/app/components/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    motorcycles: [
      { label: 'Sport Bikes', href: '#motorcycles' },
      { label: 'Cruisers', href: '#motorcycles' },
      { label: 'Electric', href: '#motorcycles' },
      { label: 'All Models', href: '#models' },
    ],
    services: [
      { label: 'Sales & Financing', href: '#services' },
      { label: 'Maintenance', href: '#services' },
      { label: 'Custom Mods', href: '#services' },
      { label: 'Parts Store', href: '#services' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Community', href: '#about' },
      { label: 'Testimonials', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Youtube size={20} />, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo className="mb-6" />
            <p
              className="text-muted-foreground mb-6 max-w-sm"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                lineHeight: 1.7,
              }}
            >
              Premium imported motorcycles. World-class service. Unmatched
              expertise. Join the 7POWER family today.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+15557POWER7"
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                <Phone size={16} className="text-accent" />
                +1 (555) 7POWER-7
              </a>
              <a
                href="mailto:info@7powermotors.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                <Mail size={16} className="text-accent" />
                info@7powermotors.com
              </a>
              <div
                className="flex items-start gap-3 text-muted-foreground"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                <MapPin size={16} className="text-accent mt-0.5" />
                7890 Power Drive<br />Motor City, MC 90210
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
              MOTORCYCLES
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
              Get the latest news on new models, exclusive offers, and upcoming events.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-input-background border border-border text-foreground focus:border-accent focus:outline-none transition-colors"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
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
            © {currentYear} 7POWER MOTORS. All rights reserved.
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
