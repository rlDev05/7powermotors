import React, { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Navigation,
  Phone,
  Send,
} from 'lucide-react';
import { cr1Contact, cr1Locations, cr1SocialLinks } from '@/app/data/brand';
import { revealContainer, revealLeft, revealRight, revealUp } from '@/app/lib/motionPresets';

const NetworkMap = lazy(() =>
  import('@/app/components/NetworkMap').then((module) => ({ default: module.NetworkMap }))
);

export function Contact() {
  const [searchParams] = useSearchParams();
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const intent = searchParams.get('intent');
  const isServiceIntent = intent === 'service';
  const isPartnerIntent = intent === 'partner';
  const selectedInterest = isServiceIntent ? 'rider-application' : isPartnerIntent ? 'dealer' : '';
  const activeLocation =
    cr1Locations.find((location) => location.id === activeLocationId) ?? null;
  const regions = Array.from(new Set(cr1Locations.map((location) => location.region)));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  useEffect(() => {
    if (!selectedInterest) return;
    setFormData((current) => ({ ...current, interest: selectedInterest }));
  }, [selectedInterest]);

  const inquiryContext = isServiceIntent
    ? {
        eyebrow: 'RIDER SERVICE INQUIRY',
        title: 'Your ride deserves more than temporary shine.',
        description:
          'Tell us what you ride and what you want to protect. We will help you find the right CR-1 service for your motorcycle, helmet, or approved components.',
        priority: 'Start Your Protection Journey',
        guidance:
          'Share your motorcycle model, location, preferred treatment area, and any questions about coverage or availability.',
        placeholder: 'Tell us about your motorcycle, helmet, or approved parts...',
        submitLabel: 'START MY SERVICE INQUIRY',
      }
    : isPartnerIntent
      ? {
          eyebrow: 'BUSINESS PARTNERSHIP INQUIRY',
          title: 'Make CR-1 your next premium advantage.',
          description:
            'Tell us where your business is today and where you want it to grow. We will explore how CR-1 training, standards, and service positioning can fit your operation.',
          priority: 'Build With CR-1',
          guidance:
            'Share your business type, service area, current motorcycle-care capabilities, and the CR-1 opportunity you want to discuss.',
          placeholder: 'Tell us about your business, service area, and partnership goals...',
          submitLabel: 'START A PARTNERSHIP CONVERSATION',
        }
      : {
          eyebrow: 'CONTACT / DEALER INQUIRY',
          title: 'One brand. Two ways forward.',
          description:
            'Protect the ride you value or bring a premium protection service to your business. Choose your path and we will help make the next step clear.',
          priority: 'Choose Your Inquiry',
          guidance:
            'Select the service or partnership option that best matches what you need, then tell us how we can help.',
          placeholder: 'Tell us about your needs...',
          submitLabel: 'SEND MESSAGE',
        };

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
            {inquiryContext.eyebrow}
          </motion.span>
          <motion.h2 className="racing-title mx-auto mb-6 max-w-3xl" variants={revealUp}>
            {inquiryContext.title}
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
            {inquiryContext.description}
          </motion.p>
        </motion.div>

        {/* CR-1 Philippines Network Locator */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealContainer}
          aria-labelledby="network-locator-title"
          className="mb-12 sm:mb-16"
        >
          <div className="grid items-end gap-6 border-b border-border pb-7 lg:grid-cols-[1fr_auto] lg:gap-10">
            <motion.div variants={revealUp} className="max-w-3xl">
              <span className="brand-chip mb-5 w-fit">CR-1 Philippines Network</span>
              <h3 id="network-locator-title" className="racing-title mb-4">
                Find your nearest CR-1 location.
              </h3>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Select a listed distributor or flagship dealer to preview its location, get directions,
                or ask about CR-1 service availability in your area.
              </p>
            </motion.div>

            <motion.dl
              variants={revealUp}
              className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:min-w-[30rem]"
            >
              <div className="bg-card px-4 py-4 sm:px-5">
                <dt className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                  Locations
                </dt>
                <dd className="mt-1 font-['Rajdhani'] text-3xl font-black text-foreground">
                  {cr1Locations.length}
                </dd>
              </div>
              <div className="bg-card px-4 py-4 sm:px-5">
                <dt className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                  Regions
                </dt>
                <dd className="mt-1 font-['Rajdhani'] text-3xl font-black text-foreground">
                  {regions.length}
                </dd>
              </div>
              <div className="col-span-2 bg-card px-4 py-4 sm:col-span-1 sm:px-5">
                <dt className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-accent">
                  Expanding
                </dd>
              </div>
            </motion.dl>
          </div>

          <motion.div variants={revealUp} className="racing-card mt-8 overflow-hidden bg-secondary">
            <div className="relative h-[26rem] sm:h-[32rem] lg:h-[36rem]">
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center bg-secondary text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">
                    Loading Network Map
                  </div>
                }
              >
                <NetworkMap
                  locations={cr1Locations}
                  activeLocationId={activeLocationId}
                  onSelectLocation={setActiveLocationId}
                />
              </Suspense>

              <div
                aria-live="polite"
                className="pointer-events-none absolute left-3 right-3 top-3 border border-black/10 bg-white/95 p-4 shadow-lg backdrop-blur sm:left-5 sm:right-auto sm:top-5 sm:max-w-md sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-accent text-white">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                      {activeLocation ? activeLocation.label : 'All Network Locations'}
                    </p>
                    <p className="mt-1 font-['Rajdhani'] text-xl font-black text-foreground sm:text-2xl">
                      {activeLocation ? activeLocation.name : 'CR-1 Philippines Network'}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                      {activeLocation
                        ? activeLocation.address
                        : `${cr1Locations.length} published locations are visible. Select any pin or location card for details.`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-3 right-3 flex flex-col justify-end gap-2 sm:bottom-5 sm:left-auto sm:right-5 sm:flex-row">
                {activeLocation ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveLocationId(null)}
                      className="flex min-h-11 items-center justify-center border border-black/15 bg-white/95 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-foreground shadow-lg backdrop-blur transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      Show All Locations
                    </button>
                    <a
                      href={activeLocation.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-11 items-center justify-center gap-2 bg-accent px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      <Navigation className="h-4 w-4" aria-hidden="true" />
                      Get Directions
                    </a>
                  </>
                ) : (
                  <a
                    href="#network-directory"
                    className="flex min-h-11 items-center justify-center gap-2 border border-black/15 bg-white/95 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-foreground shadow-lg backdrop-blur transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                    Browse All Locations
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <div id="network-directory" className="mt-8 scroll-mt-28 space-y-8">
            {regions.map((region, regionIndex) => {
              const regionLocations = cr1Locations.filter((location) => location.region === region);

              return (
                <motion.section
                  key={region}
                  variants={revealUp}
                  aria-labelledby={`network-region-${regionIndex}`}
                >
                  <div className="mb-4 flex flex-col justify-between gap-2 border-l-4 border-accent bg-secondary px-4 py-3 sm:flex-row sm:items-center sm:px-5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                        Regional Directory
                      </p>
                      <h4
                        id={`network-region-${regionIndex}`}
                        className="mt-1 font-['Rajdhani'] text-2xl font-black uppercase tracking-[0.04em] text-foreground"
                      >
                        {region}
                      </h4>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {regionLocations.length} listed {regionLocations.length === 1 ? 'location' : 'locations'}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {regionLocations.map((location) => {
                      const isActive = activeLocation?.id === location.id;

                      return (
                        <article
                          key={location.id}
                          className={`overflow-hidden border bg-card transition-all duration-300 ${
                            isActive
                              ? 'border-accent shadow-[0_14px_36px_rgba(214,0,0,0.12)]'
                              : 'border-border hover:border-accent/55 hover:shadow-lg'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveLocationId(location.id)}
                            aria-pressed={isActive}
                            className="group flex min-h-36 w-full items-start gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:p-6"
                          >
                            <span
                              className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-colors ${
                                isActive
                                  ? 'border-accent bg-accent text-white'
                                  : 'border-border bg-secondary text-accent group-hover:border-accent'
                              }`}
                            >
                              <MapPin className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                                  {location.label}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                                  {location.city}
                                </span>
                              </span>
                              <span className="mt-2 block font-['Rajdhani'] text-2xl font-black text-foreground">
                                {location.name}
                              </span>
                              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                                {location.address}
                              </span>
                              <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-accent">
                                {isActive ? 'Showing on map' : 'Show on map'}
                                <span aria-hidden="true">→</span>
                              </span>
                            </span>
                          </button>

                          <div className="grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-2">
                            <a
                              href={location.mapUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex min-h-12 items-center justify-between gap-3 bg-card px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-foreground transition hover:bg-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                            >
                              Google Maps
                              <ExternalLink className="h-4 w-4 text-accent" aria-hidden="true" />
                            </a>
                            {location.websiteUrl ? (
                              <a
                                href={location.websiteUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex min-h-12 items-center justify-between gap-3 bg-card px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-foreground transition hover:bg-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                              >
                                Location Details
                                <ExternalLink className="h-4 w-4 text-accent" aria-hidden="true" />
                              </a>
                            ) : (
                              <a
                                href="#contact-form"
                                className="flex min-h-12 items-center justify-between gap-3 bg-card px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-foreground transition hover:bg-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                              >
                                Contact Location
                                <MessageCircle className="h-4 w-4 text-accent" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </motion.section>
              );
            })}
          </div>

          <motion.aside
            variants={revealUp}
            className="mt-8 grid gap-5 border border-border bg-secondary p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                CR-1 Network Expansion
              </p>
              <h4 className="mt-2 font-['Rajdhani'] text-2xl font-black text-foreground sm:text-3xl">
                Looking for CR-1 outside Metro Manila?
              </h4>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                Only currently listed CR-1 Philippines locations appear here. Ask us about service
                availability in your area, or inquire about bringing CR-1 to your motorcycle business.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#contact-form" className="racing-button justify-center">
                Ask About Coverage
              </a>
              <Link
                to="/contact?intent=partner#contact-form"
                className="flex min-h-12 items-center justify-center border border-foreground px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-foreground transition hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Expand With CR-1
              </Link>
            </div>
          </motion.aside>
        </motion.section>

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
              <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#86672f]">
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
                    className="flex items-center justify-center gap-2 border border-border bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-muted-foreground transition hover:border-accent hover:text-accent"
                  >
                    {social.icon}
                    {social.label}
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
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="racing-card scroll-mt-28 space-y-5 bg-card p-5 sm:space-y-6 sm:p-6 md:p-8"
            >
              <div className="motion-sheen" />
              <div className="border-l-2 border-[#86672f] bg-[#c8a96e]/10 p-5">
                <div className="mb-2 flex items-center gap-2 text-[#86672f]">
                  <MessageCircle className="h-5 w-5" />
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#86672f]">
                    {inquiryContext.priority}
                  </p>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  {inquiryContext.guidance}
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
                  placeholder={inquiryContext.placeholder}
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
                {inquiryContext.submitLabel}
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
