import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
      <div className="absolute -left-28 top-20 h-52 w-[34rem] rotate-[-24deg] bg-accent/70" />
      <div className="absolute -right-32 bottom-24 h-48 w-[34rem] rotate-[-32deg] bg-accent/30" />
      <div className="racing-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span
            className="racing-kicker"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            GET IN TOUCH
          </span>
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            Start a 7 POWER Conversation
          </h2>
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}
          >
            Talk to us about rider applications, dealership partnerships,
            installer training, or 7 POWER service center opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin size={24} />,
                  title: 'Visit Us',
                  content: 'Metro Manila, Philippines',
                  subContent: 'Partner inquiries and application bookings',
                },
                {
                  icon: <Phone size={24} />,
                  title: 'Call Us',
                  content: '+63 7POWER',
                  subContent: 'Available during business hours',
                },
                {
                  icon: <Mail size={24} />,
                  title: 'Email Us',
                  content: 'partners@7powermotors.com',
                  subContent: 'We respond within 24 hours',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="racing-card flex gap-4 p-6"
                >
                  <div className="text-accent mt-1">{item.icon}</div>
                  <div>
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
                      className="text-foreground mb-1"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem',
                      }}
                    >
                      {item.content}
                    </p>
                    <p
                      className="text-muted-foreground"
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

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="racing-card flex h-64 items-center justify-center bg-[#101010] text-white"
            >
              <div className="text-center text-white/70">
                <MapPin size={48} className="mx-auto mb-4 text-accent" />
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                  }}
                >
                  7 POWER Partner Coverage Map
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="racing-card space-y-6 p-6 md:p-8">
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
                  className="w-full border border-border bg-input-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none"
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
                    className="w-full border border-border bg-input-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none"
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
                    className="w-full border border-border bg-input-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none"
                    placeholder="+1 (555) 000-0000"
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
                  className="w-full border border-border bg-input-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none"
                >
                  <option value="">Select an option</option>
                  <option value="rider-application">7 POWER Coating for My Bike</option>
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
                  className="w-full resize-none border border-border bg-input-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none"
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
