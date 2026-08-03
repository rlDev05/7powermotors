import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  FileCheck2,
  MapPin,
  MessageCircleQuestion,
  ShieldCheck,
} from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { cr1OfficialLinks, cr1ProcessSteps } from '@/app/data/applicationProcess';
import { mediaReveal, revealContainer, revealUp } from '@/app/lib/motionPresets';
import certificateBackground from '@/styles/images/certificate/cr1-application-certificate.png';

const applicationStandards = [
  'CR-1 product and chemical knowledge',
  'Surface preparation and equipment handling',
  'Controlled application technique',
  'Ongoing skills development and refresher training',
];

export function ApplicationProcess() {
  return (
    <section
      id="application-process"
      className="racing-section bg-background"
      aria-labelledby="application-process-title"
    >
      <div className="absolute -right-44 top-20 h-44 w-[30rem] rotate-[-24deg] bg-accent/[0.07]" />
      <div className="absolute -left-56 bottom-24 h-32 w-[30rem] rotate-[-20deg] bg-[#c8a96e]/10" />

      <div className="racing-container">
        <motion.header
          className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealContainer}
        >
          <div>
            <motion.span className="racing-kicker" variants={revealUp}>
              Professional Coating Process
            </motion.span>
            <motion.h1 id="application-process-title" className="racing-title" variants={revealUp}>
              The CR-1
              <br />
              <span className="text-accent">Application Process</span>
            </motion.h1>
          </div>
          <motion.div className="max-w-2xl lg:justify-self-end" variants={revealUp}>
            <p className="racing-copy font-semibold text-foreground">
              Every CR-1 application follows a careful, standardized process—from initial surface
              inspection and preparation to final coating and documentation.
            </p>
            <p className="racing-copy mt-3">
              Each stage is carried out by trained CR-1 technicians to support consistent coverage,
              a refined appearance, and dependable protection for everyday riding conditions.
            </p>
          </motion.div>
        </motion.header>

        <motion.ol
          className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={revealContainer}
          aria-label="Six stages of the CR-1 application process"
        >
          {cr1ProcessSteps.map((step) => (
            <motion.li
              key={step.number}
              variants={revealUp}
              className="group relative overflow-hidden border border-border bg-card transition duration-300 hover:border-accent/55"
            >
              <motion.div className="relative aspect-[511/272] overflow-hidden bg-muted" variants={mediaReveal}>
                <ImageWithFallback
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 flex h-14 min-w-14 items-center justify-center bg-accent px-3 font-[Rajdhani] text-2xl font-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
                  {step.number}
                </span>
              </motion.div>

              <div className="p-5 sm:p-6">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-accent">
                  Process step {step.number}
                </p>
                <h2 className="mt-2 font-[Rajdhani] text-2xl font-black uppercase leading-[1.05] tracking-normal text-foreground">
                  {step.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{step.description}</p>
                {step.note && (
                  <p className="mt-4 border-l-2 border-[#c8a96e] pl-3 text-xs leading-5 text-muted-foreground">
                    {step.note}
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ol>

        <motion.section
          className="mt-16 grid overflow-hidden border border-border bg-card shadow-[0_24px_70px_rgba(16,16,16,0.12)] lg:grid-cols-[0.82fr_1.18fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={revealContainer}
          aria-labelledby="certificate-title"
        >
          <motion.div
            className="relative min-h-[26rem] overflow-hidden border-b border-border bg-[#f3efe3] sm:min-h-[31rem] lg:min-h-full lg:border-b-0 lg:border-r"
            variants={mediaReveal}
          >
            <img
              src={certificateBackground}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-white via-white/45 to-white/[0.04]"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center border border-accent/25 bg-white/90 text-accent shadow-[0_12px_30px_rgba(16,16,16,0.12)] backdrop-blur-sm">
                <FileCheck2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-accent">
                Service documentation
              </p>
              <h2 id="certificate-title" className="mt-2 max-w-md font-[Rajdhani] text-3xl font-black uppercase leading-none text-foreground sm:text-4xl">
                CR-1 Application Certificate
              </h2>
            </div>
          </motion.div>

          <motion.div className="relative flex flex-col justify-center bg-white p-6 sm:p-9 lg:p-12" variants={revealUp}>
            <span className="absolute right-0 top-0 h-1 w-28 bg-accent" aria-hidden="true" />
            <p className="text-base leading-7 text-foreground">
              After service is completed, the CR-1 Pro Shop issues an official certificate recording
              the application work performed on the motorcycle. Collect it when receiving the completed
              motorcycle and keep it in a safe place.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              The certificate may be submitted when an insurance provider requires documentation of
              the coating application. It is a service record and is not insurance coverage.
            </p>
            <aside className="mt-6 border-l-2 border-[#c8a96e] bg-background px-4 py-3 text-xs leading-5 text-muted-foreground">
              Certificate reissuance or name changes may require an additional fee. Charges can differ
              by service course and market; confirm the current local fee with your CR-1 Pro Shop.
            </aside>
            <a
              href={cr1OfficialLinks.certificate}
              target="_blank"
              rel="noreferrer"
              aria-label="Open the translated CR-1 certificate system (opens in a new tab)"
              className="racing-button mt-7 w-fit"
            >
              Learn More About the Certificate
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.section>

        <motion.section
          className="mt-16 grid gap-9 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={revealContainer}
          aria-labelledby="standards-title"
        >
          <motion.div variants={revealUp}>
            <span className="brand-chip">
              <Award className="h-4 w-4" aria-hidden="true" />
              Professional Application Expertise
            </span>
            <h2 id="standards-title" className="mt-5 font-[Rajdhani] text-4xl font-black uppercase leading-[0.95] text-foreground sm:text-5xl">
              Certified Application Standards
            </h2>
            <h3 className="mt-5 font-[Rajdhani] text-xl font-black uppercase tracking-[0.08em] text-accent">
              Trained Technicians. Standardized Process.
            </h3>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              CR-1 Pro Shop technicians must complete dedicated application training before providing
              CR-1 services. Training covers CR-1 products, preparation methods, chemical handling,
              equipment, and application technique.
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Technicians who complete the required instruction and receive CR-1 technical certification
              are authorized to perform the service. Refresher training supports consistent procedures
              and continued skills development across participating Pro Shops.
            </p>
          </motion.div>

          <motion.ul className="grid gap-px border border-border bg-border sm:grid-cols-2" variants={revealContainer}>
            {applicationStandards.map((standard) => (
              <motion.li
                key={standard}
                className="flex min-h-32 items-start gap-4 bg-card p-5 sm:p-6"
                variants={revealUp}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="font-[Rajdhani] text-lg font-black uppercase leading-6 tracking-[0.04em] text-foreground">
                  {standard}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section
          className="relative mt-16 overflow-hidden bg-accent p-6 text-white sm:p-9 lg:mt-20 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealContainer}
          aria-labelledby="process-inquiry-title"
        >
          <ShieldCheck className="absolute -right-10 -top-12 h-52 w-52 text-white/[0.08]" aria-hidden="true" />
          <motion.div className="relative max-w-3xl" variants={revealUp}>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/75">
              <MessageCircleQuestion className="h-4 w-4" aria-hidden="true" />
              Process support
            </div>
            <h2 id="process-inquiry-title" className="mt-3 font-[Rajdhani] text-3xl font-black uppercase leading-none text-white sm:text-4xl">
              Have Questions About the CR-1 Process?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
              Ask about preparation, application coverage, service availability, certificates, or
              motorcycle eligibility through an authorized CR-1 Pro Shop or our contact page.
            </p>
          </motion.div>

          <motion.div className="relative mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0" variants={revealUp}>
            <a
              href={cr1OfficialLinks.shops}
              target="_blank"
              rel="noreferrer"
              aria-label="Find a CR-1 Pro Shop in the official CR-1 shop directory (opens in a new tab)"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-white px-5 py-3 text-center text-xs font-black uppercase tracking-[0.1em] text-accent transition hover:bg-[#f5f5f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Official CR-1 Shop Directory
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center border border-white/65 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.1em] text-white transition hover:border-white hover:bg-white hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
            >
              Contact CR-1
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
