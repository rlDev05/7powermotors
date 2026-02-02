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
    <section id="contact" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span
            className="text-accent tracking-[0.2em] mb-4 block"
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
              letterSpacing: '-0.01em',
            }}
          >
            Visit Our Dealership
          </h2>
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}
          >
            Schedule a test ride, explore our showroom, or speak with our expert
            team. We're here to help you find your perfect motorcycle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin size={24} />,
                  title: 'Visit Us',
                  content: '7890 Power Drive, Motor City, MC 90210',
                  subContent: 'Mon-Sat: 9AM-7PM | Sun: 10AM-5PM',
                },
                {
                  icon: <Phone size={24} />,
                  title: 'Call Us',
                  content: '+1 (555) 7POWER-7',
                  subContent: 'Available during business hours',
                },
                {
                  icon: <Mail size={24} />,
                  title: 'Email Us',
                  content: 'info@7powermotors.com',
                  subContent: 'We respond within 24 hours',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 bg-card border border-border/50 hover:border-accent/50 transition-all"
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
              className="h-64 bg-card border border-border/50 flex items-center justify-center"
            >
              <div className="text-center text-muted-foreground">
                <MapPin size={48} className="mx-auto mb-4 text-accent" />
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                  }}
                >
                  Interactive Map
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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground focus:border-accent focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 bg-input-background border border-border text-foreground focus:border-accent focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 bg-input-background border border-border text-foreground focus:border-accent focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="purchase">Purchasing a Motorcycle</option>
                  <option value="test-ride">Scheduling a Test Ride</option>
                  <option value="service">Service & Maintenance</option>
                  <option value="parts">Parts & Accessories</option>
                  <option value="financing">Financing Options</option>
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
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground focus:border-accent focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your needs..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
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
