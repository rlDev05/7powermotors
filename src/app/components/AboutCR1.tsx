import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  Check,
  Clock3,
  GraduationCap,
  Layers3,
  ShieldCheck,
  Thermometer,
} from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { z900rsImages } from '@/app/data/z900rsImages';
import { mediaReveal, revealUp } from '@/app/lib/motionPresets';
import coatingApplicationImg from '@/styles/images/coating/coating-application-web.jpg';
import helmetApplicationImg from '@/styles/images/coating/helmet-application-web.jpg';

type TechnologySpecification = {
  icon: ReactNode;
  value: string;
  title: string;
  evidence: string;
  description: string;
  benefit: string;
};

type ApplicationStep = {
  number: string;
  title: string;
  description: string;
};

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
};

type AudiencePath = {
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
  to: string;
  icon: ReactNode;
  featured?: boolean;
};

const introductionBenefits = [
  'Easier routine cleaning',
  'Lasting clarity across approved surfaces',
  'Preserved matte, texture, and authentic detail',
];

const specifications: TechnologySpecification[] = [
  {
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
    value: '9H',
    title: 'Surface Hardness',
    evidence: '3.2 GPa · JIS K5600-5-4',
    description: 'Helps reduce fine washing marks during normal motorcycle care.',
    benefit: 'More confidence during routine cleaning.',
  },
  {
    icon: <Thermometer className="h-6 w-6" aria-hidden="true" />,
    value: '1,300°C',
    title: 'Heat Resistance',
    evidence: 'Approved heat-exposed areas',
    description:
      'Supports professional application on approved engine, exhaust, and metal components.',
    benefit: 'Protection beyond painted panels.',
  },
  {
    icon: <Clock3 className="h-6 w-6" aria-hidden="true" />,
    value: 'About 10 Years',
    title: 'Durability',
    evidence: '100% pure glass coating',
    description:
      'Designed to remain on professionally prepared surfaces longer than wax or temporary treatments.',
    benefit: 'Less frequent reapplication. More lasting value.',
  },
  {
    icon: <Layers3 className="h-6 w-6" aria-hidden="true" />,
    value: '0.1 μm',
    title: 'Ultra-Thin Layer',
    evidence: 'Approximately one-thousandth of a hair',
    description:
      'Protects without creating a thick artificial appearance or hiding approved matte and detailed textures.',
    benefit: 'Protection without changing the motorcycle’s character.',
  },
  {
    icon: <Bike className="h-6 w-6" aria-hidden="true" />,
    value: 'Non-Slip',
    title: 'Rider Contact Surfaces',
    evidence: 'Designed not to hinder knee grip',
    description:
      'The ultra-thin glass layer maintains a non-slip surface on approved rider contact areas.',
    benefit: 'Protection that respects vehicle handling.',
  },
];

const applicationSteps: ApplicationStep[] = [
  {
    number: '01',
    title: 'Assess and Prepare',
    description:
      'Inspect the surface, confirm approved treatment areas, then clean, dry, polish where appropriate, and degrease.',
  },
  {
    number: '02',
    title: 'Apply',
    description: 'Deliver controlled low-pressure spray coverage using trained techniques.',
  },
  {
    number: '03',
    title: 'Treat and Inspect',
    description:
      'Adjust the process for each approved paint, metal, texture, helmet, or component, then complete the final inspection.',
  },
  {
    number: '04',
    title: 'Reveal',
    description:
      'Present the completed motorcycle and provide the applicable customer documentation.',
  },
];

const finishGallery: GalleryItem[] = [
  {
    src: z900rsImages[0].src,
    alt: 'Completed CR-1-treated Kawasaki Z900RS presented in the studio',
    caption: 'Final Reveal',
    className: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    src: z900rsImages[2].src,
    alt: 'Deep paint clarity and visual depth on a CR-1-treated Kawasaki Z900RS',
    caption: 'Paint Depth',
  },
  {
    src: z900rsImages[4].src,
    alt: 'Chrome headlight detail on a CR-1-treated Kawasaki Z900RS',
    caption: 'Chrome Detail',
  },
  {
    src: z900rsImages[6].src,
    alt: 'Preserved engine-fin texture on a CR-1-treated Kawasaki Z900RS',
    caption: 'Engine Texture',
    className: 'lg:col-span-2',
  },
];

const audiencePaths: AudiencePath[] = [
  {
    eyebrow: 'For motorcycle owners',
    title: 'Protect the motorcycle you value.',
    description:
      'Professional CR-1 protection for your motorcycle, helmet, and approved components.',
    linkLabel: 'Get CR-1 Protection',
    to: '/contact?intent=service',
    icon: <Bike className="h-6 w-6" aria-hidden="true" />,
  },
  {
    eyebrow: 'For business partners',
    title: 'Bring CR-1 to your customers.',
    description:
      'Offer a specialized Japanese glass-coating service supported by professional training and application standards.',
    linkLabel: 'Partner With CR-1',
    to: '/contact?intent=partner',
    icon: <GraduationCap className="h-6 w-6" aria-hidden="true" />,
    featured: true,
  },
];

function revealProps(reducedMotion: boolean, amount = 0.12) {
  if (reducedMotion) {
    return { initial: false as const };
  }

  return {
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: { once: true, amount },
  };
}

function CR1Introduction({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.header
      className="border-b border-border pb-12 lg:pb-16"
      variants={revealUp}
      {...revealProps(reducedMotion)}
    >
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
        <div>
          <span className="brand-chip">What is CR-1?</span>
          <h2
            id="what-is-cr1-title"
            className="mt-5 font-[Rajdhani] text-[clamp(2.65rem,7vw,5rem)] font-black uppercase leading-[0.9] text-foreground"
          >
            Real glass protection for motorcycles.
          </h2>
        </div>

        <div>
          <p className="text-lg font-semibold leading-8 text-foreground">
            CR-1 is a glass coating brand made exclusively for motorcycles. Certified technicians
            spray it on and chemically cure it into a 100% pure glass layer.
          </p>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Its 0.1 μm layer provides scratch resistance, withstands heat up to 1,300°C, and helps
            slow paint fading, plastic yellowing, and rust without changing the motorcycle&apos;s character.
          </p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            CR-1 is trusted by premium wheel brands Marchesini of Italy and GALE SPEED of Japan.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <ul className="grid gap-3 text-sm text-foreground sm:grid-cols-3">
          {introductionBenefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <aside className="border-l-2 border-accent bg-white/70 px-5 py-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
            Not wax. Not polymer.
          </p>
          <h3 className="mt-2 font-[Rajdhani] text-2xl font-black uppercase leading-none text-foreground">
            100% pure glass technology.
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Unlike temporary surface treatments, CR-1 is delivered through controlled professional
            preparation and application for longer-lasting protection on approved surfaces.
          </p>
        </aside>
      </div>
    </motion.header>
  );
}

function CR1Technology({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.section
      className="mt-16 lg:mt-24"
      aria-labelledby="cr1-technology-title"
      variants={revealUp}
      {...revealProps(reducedMotion, 0.08)}
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <span className="racing-kicker">Technology with a practical purpose</span>
          <h2
            id="cr1-technology-title"
            className="font-[Rajdhani] text-4xl font-black uppercase leading-[0.95] text-foreground sm:text-5xl"
          >
            Serious technology.
            <br />
            <span className="text-accent">Everyday value.</span>
          </h2>
        </div>
        <p className="racing-copy max-w-2xl lg:justify-self-end">
          Four core specifications explain how CR-1 supports easier care, broader approved surface
          coverage, and protection that respects the motorcycle&apos;s authentic finish.
        </p>
      </div>

      <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-5">
        {specifications.map((specification) => (
          <article key={specification.title} className="relative flex h-full flex-col bg-card p-5 sm:p-7">
            <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" aria-hidden="true" />
            <div className="flex h-12 w-12 items-center justify-center bg-secondary text-[#86672f]">
              {specification.icon}
            </div>
            <p className="mt-7 font-[Rajdhani] text-4xl font-black uppercase leading-none text-accent">
              {specification.value}
            </p>
            <h3 className="mt-3 font-[Rajdhani] text-xl font-black uppercase leading-6 text-foreground">
              {specification.title}
            </h3>
            <p className="mt-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#86672f]">
              {specification.evidence}
            </p>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              {specification.description}
            </p>
            <p className="mt-auto border-t border-border pt-5 text-xs font-black uppercase tracking-[0.1em] text-foreground">
              {specification.benefit}
            </p>
          </article>
        ))}
      </div>

      <aside className="mt-6 border-l-2 border-[#c8a96e] bg-white/70 px-4 py-4 text-xs leading-5 text-muted-foreground">
        Technical values describe the coating under controlled conditions. CR-1 is scratch-resistant,
        but scratches and other damage remain possible. It slows fading, yellowing, and rust rather
        than completely preventing them. Surface suitability and durability depend on material, preparation, use, climate, storage,
        maintenance, and physical or chemical damage. Confirm approved application coverage with an
        authorized CR-1 Pro Shop.
      </aside>
    </motion.section>
  );
}

function CR1ApplicationAndFinish({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.section
      className="mt-16 border-t border-border pt-14 lg:mt-24 lg:pt-20"
      aria-labelledby="cr1-application-title"
      variants={revealUp}
      {...revealProps(reducedMotion, 0.08)}
    >
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <span className="racing-kicker">Certified professional application</span>
          <h2
            id="cr1-application-title"
            className="font-[Rajdhani] text-4xl font-black uppercase leading-[0.95] text-foreground sm:text-5xl"
          >
            From preparation
            <br />
            <span className="text-accent">to finished detail.</span>
          </h2>
        </div>
        <p className="racing-copy max-w-2xl lg:justify-self-end">
          Premium results begin with careful surface assessment, disciplined preparation,
          controlled application, and final inspection.
        </p>
      </div>

      <motion.div
        className="mt-10 grid overflow-hidden border border-border bg-white lg:grid-cols-[0.96fr_1.04fr]"
        variants={mediaReveal}
      >
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-1">
          <figure className="racing-media aspect-[4/3] sm:aspect-[4/5] lg:min-h-[31rem] lg:aspect-auto">
            <ImageWithFallback
              src={coatingApplicationImg}
              alt="Trained CR-1 technician performing controlled coating application on motorcycle bodywork"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-16 font-[Rajdhani] text-xl font-black uppercase text-white">
              Controlled Motorcycle Application
            </figcaption>
          </figure>

          <figure className="racing-media aspect-[4/3] sm:aspect-[4/5] lg:aspect-[16/8]">
            <ImageWithFallback
              src={helmetApplicationImg}
              alt="Professional CR-1 application on an approved motorcycle helmet surface"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-14 font-[Rajdhani] text-lg font-black uppercase text-white">
              Approved Helmet Care
            </figcaption>
          </figure>
        </div>

        <div className="p-6 sm:p-9 lg:p-12">
          <span className="brand-chip">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Defined professional process
          </span>
          <h3 className="mt-5 font-[Rajdhani] text-3xl font-black uppercase leading-none text-foreground sm:text-4xl">
            Professional hands make premium chemistry count.
          </h3>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Authorized technicians complete dedicated CR-1 instruction in surface preparation,
            chemical handling, equipment use, and controlled application before providing the
            service.
          </p>

          <ol className="mt-8 divide-y divide-border border-y border-border">
            {applicationSteps.map((step) => (
              <li key={step.number} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4">
                <span className="font-[Rajdhani] text-sm font-black uppercase tracking-[0.15em] text-accent">
                  {step.number}
                </span>
                <div>
                  <h4 className="font-[Rajdhani] text-lg font-black uppercase tracking-[0.04em] text-foreground">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link to="/services" className="racing-button mt-8 w-full sm:w-auto">
            Explore the Application Process
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>

      <div className="mt-14 border-t border-border pt-12 lg:mt-20 lg:pt-16">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <span className="racing-kicker">Finished motorcycle result</span>
            <h3
              id="cr1-finish-title"
              className="font-[Rajdhani] text-4xl font-black uppercase leading-[0.95] text-foreground sm:text-5xl"
            >
              The finish speaks for itself.
            </h3>
          </div>
          <p className="racing-copy max-w-2xl lg:justify-self-end">
            From paint depth and chrome clarity to preserved engine texture, every detail reflects
            the quality of the preparation and application process.
          </p>
        </div>

        <motion.div
          className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
          variants={mediaReveal}
        >
          {finishGallery.map((item, index) => (
            <figure
              key={item.caption}
              className={`racing-media ${
                index === 0 ? 'aspect-[16/10] lg:aspect-auto' : 'aspect-[16/10]'
              } ${item.className ?? ''}`}
            >
              <ImageWithFallback
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-14 font-[Rajdhani] text-lg font-black uppercase text-white">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function CR1AudienceCTA({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.section
      className="mt-16 border-t border-border pt-14 lg:mt-24 lg:pt-20"
      aria-labelledby="cr1-actions-title"
      variants={revealUp}
      {...revealProps(reducedMotion)}
    >
      <div className="text-center">
        <span className="racing-kicker">Choose your CR-1 journey</span>
        <h2
          id="cr1-actions-title"
          className="mx-auto mt-2 max-w-4xl font-[Rajdhani] text-4xl font-black uppercase leading-[0.95] text-foreground sm:text-5xl"
        >
          Protection for your motorcycle. Growth for your business.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {audiencePaths.map((path) => (
          <article
            key={path.eyebrow}
            className={`relative overflow-hidden border p-6 sm:p-9 lg:p-10 ${
              path.featured
                ? 'border-accent bg-accent text-white'
                : 'border-border bg-white text-foreground'
            }`}
          >
            {path.featured && (
              <GraduationCap
                className="absolute -right-10 -top-12 h-52 w-52 text-white/[0.08]"
                aria-hidden="true"
              />
            )}

            <div className="relative">
              <span
                className={`flex h-12 w-12 items-center justify-center ${
                  path.featured ? 'bg-white/15 text-white' : 'bg-secondary text-accent'
                }`}
              >
                {path.icon}
              </span>
              <p
                className={`mt-6 text-xs font-black uppercase tracking-[0.2em] ${
                  path.featured ? 'text-white/70' : 'text-accent'
                }`}
              >
                {path.eyebrow}
              </p>
              <h3
                className={`mt-3 font-[Rajdhani] text-3xl font-black uppercase leading-none sm:text-4xl ${
                  path.featured ? 'text-white' : 'text-foreground'
                }`}
              >
                {path.title}
              </h3>
              <p
                className={`mt-4 max-w-xl text-sm leading-6 sm:text-base ${
                  path.featured ? 'text-white/80' : 'text-muted-foreground'
                }`}
              >
                {path.description}
              </p>
              <Link
                to={path.to}
                className={`mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 py-3 text-center text-xs font-black uppercase tracking-[0.1em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto ${
                  path.featured
                    ? 'bg-white text-accent hover:bg-[#f5f5f2] focus-visible:ring-white focus-visible:ring-offset-accent'
                    : 'bg-accent text-white hover:bg-accent/90 focus-visible:ring-accent focus-visible:ring-offset-white'
                }`}
              >
                {path.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}

export function AboutCR1() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section
      id="what-is-cr1"
      className="racing-section overflow-hidden bg-secondary/70"
      aria-labelledby="what-is-cr1-title"
    >
      <div
        className="pointer-events-none absolute -left-52 top-10 h-36 w-[26rem] rotate-[-18deg] bg-accent/20 sm:-left-32 sm:h-40 sm:w-[30rem]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-52 top-[38rem] h-40 w-[34rem] rotate-[-28deg] bg-[#c8a96e]/12"
        aria-hidden="true"
      />

      <div className="racing-container">
        <CR1Introduction reducedMotion={reducedMotion} />
        <CR1Technology reducedMotion={reducedMotion} />
        <CR1ApplicationAndFinish reducedMotion={reducedMotion} />
        <CR1AudienceCTA reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
