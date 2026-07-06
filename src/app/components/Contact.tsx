import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Facebook, Instagram, Mail, MapPin, MessageCircle, Music2, Phone, Send } from 'lucide-react';
import { cr1Contact, cr1SocialLinks } from '@/app/data/brand';
import { mediaReveal, revealContainer, revealLeft, revealRight, revealUp } from '@/app/lib/motionPresets';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="racing-section bg-background">
      <div className="absolute -left-52 top-20 h-40 w-[28rem] rotate-[-24deg] bg-accent/45 sm:-left-28 sm:h-52 sm:w-[34rem]" />
      <div className="absolute -right-56 bottom-24 h-40 w-[28rem] rotate-[-32deg] bg-[#c8a96e]/15 sm:-right-32 sm:h-48 sm:w-[34rem]" />
      <div className="racing-container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealContainer}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-16"
        >
          <motion.span
            className="brand-chip mx-auto w-fit"
            variants={revealUp}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            CONTACT / DEALER INQUIRY
          </motion.span>
          <motion.h2 className="racing-title mx-auto mb-6 max-w-3xl" variants={revealUp}>
            Let's talk. We're here to help.
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            variants={revealUp}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}
          >
            Whether you need coating for a motorcycle, helmet, or parts, or you
            want to become an authorized dealer, send us a message and we will
            guide the next step.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealContainer}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin size={24} />,
                  title: cr1Contact.distributor.label,
                  content: cr1Contact.distributor.name,
                  subContent: cr1Contact.distributor.address,
                },
                {
                  icon: <MapPin size={24} />,
                  title: cr1Contact.flagshipDealer.label,
                  content: cr1Contact.flagshipDealer.name,
                  subContent: cr1Contact.flagshipDealer.address,
                },
                {
                  icon: <Phone size={24} />,
                  title: 'Call Us',
                  content: cr1Contact.phoneLabel,
                  subContent: 'Available during business hours',
                },
                {
                  icon: <Mail size={24} />,
                  title: 'Email Us',
                  content: cr1Contact.email,
                  subContent: 'We respond within 24 hours',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={revealLeft}
                  className="racing-card flex min-w-0 gap-4 bg-card p-5 sm:p-6"
                  whileHover={{ x: 5 }}
                >
                  <div className="motion-sheen" />
                  <div className="text-accent mt-1">{item.icon}</div>
                  <div className="min-w-0">
                    <h4
                      className="mb-2"
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="mb-1 break-words text-foreground"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem',
                      }}
                    >
                      {item.content}
                    </p>
                    <p
                      className="break-words text-muted-foreground"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.75rem',
                      }}
                    >
                      {item.subContent}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={revealUp}
              className="racing-card bg-card p-6"
            >
              <div className="motion-sheen" />
              <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#c8a96e]">
                Social Channels
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: 'Facebook', href: cr1SocialLinks.facebook, icon: <Facebook className="h-4 w-4" /> },
                  { label: 'Instagram', href: cr1SocialLinks.instagram, icon: <Instagram className="h-4 w-4" /> },
                  { label: 'TikTok', href: cr1SocialLinks.tiktok, icon: <Music2 className="h-4 w-4" /> },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 border border-border bg-[#111] px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-muted-foreground transition hover:border-accent hover:text-white"
                  >
                    {social.icon}
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Location Map */}
            <motion.div
              variants={mediaReveal}
              className="racing-card h-[30rem] bg-[#101010] text-white sm:h-80 md:h-[25rem]"
            >
              <div className="motion-sheen z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.026670450718!2d121.01207957589632!3d14.540467178544509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c93eed13070f%3A0x3dae00e35dcc62ca!2s7%20Power%20Motors!5e0!3m2!1sen!2sph!4v1781764487073!5m2!1sen!2sph"
                title="CR-1 Philippines location map"
                className="h-full w-full border-0 grayscale-[15%] contrast-[1.04] saturate-[0.92]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute left-3 right-3 top-3 border border-white/15 bg-black/70 px-3 py-3 backdrop-blur sm:left-4 sm:right-auto sm:top-4 sm:px-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-accent" />
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-white">
                    Distributor: {cr1Contact.distributor.name}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-2">
                {[
                  cr1Contact.distributor,
                  cr1Contact.flagshipDealer,
                ].map((location) => (
                  <a
                    key={location.label}
                    href={location.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-w-0 items-center justify-between gap-3 border border-white/15 bg-black/72 px-3 py-3 text-left backdrop-blur transition hover:border-accent sm:px-4"
                  >
                    <span>
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#c8a96e]">
                        {location.label}
                      </span>
                      <span className="block truncate text-sm font-bold text-white">
                        {location.name}
                      </span>
                    </span>
                    <ExternalLink className="h-4 w-4 text-accent" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealRight}
          >
            <form onSubmit={handleSubmit} className="racing-card space-y-5 bg-card p-5 sm:space-y-6 sm:p-6 md:p-8">
              <div className="motion-sheen" />
              <div className="border-l-2 border-[#c8a96e] bg-[#c8a96e]/8 p-5">
                <div className="mb-2 flex items-center gap-2 text-[#c8a96e]">
                  <MessageCircle className="h-5 w-5" />
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c8a96e]">
                    Dealer Priority
                  </p>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Ready to become a CR-1 dealer? Tell us about your shop,
                  service area, and current detailing or motorcycle care setup.
                </p>
              </div>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-foreground mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  FULL NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-field"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-foreground mb-2"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-foreground mb-2"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    PHONE
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-field"
                    placeholder="+63 900 000 0000"
                  />
                </div>
              </div>

              {/* Interest */}
              <div>
                <label
                  htmlFor="interest"
                  className="block text-foreground mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  I'M INTERESTED IN
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className="form-field"
                >
                  <option value="">Select an option</option>
                  <option value="rider-application">CR-1 Coating for My Bike</option>
                  <option value="helmet-parts">Helmet or Parts Coating</option>
                  <option value="dealer">Dealership Partnership</option>
                  <option value="installer">Authorized Installer Training</option>
                  <option value="service-center">Service Center Opportunity</option>
                  <option value="distribution">Distribution Inquiry</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-foreground mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-field resize-none"
                  placeholder="Tell us about your needs..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="racing-button w-full"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                SEND MESSAGE
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
