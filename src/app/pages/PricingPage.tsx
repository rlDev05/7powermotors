import React, { useDeferredValue, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bike,
  Gauge,
  HardHat,
  Search,
  ShieldCheck,
  Wrench,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '@/app/components/Footer';
import { Navbar } from '@/app/components/Navbar';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { type CourseKey } from '@/app/data/pricing';
import {
  JPY_TO_PHP_RATE,
  JPY_TO_PHP_RATE_DATE,
  localizedPricingCatalog as pricingCatalog,
} from '@/app/lib/pricingLocalization';

const courseDetails: Array<{
  key: CourseKey;
  name: string;
  eyebrow: string;
  description: string;
}> = [
  {
    key: 'premium',
    name: 'Premium Course',
    eyebrow: 'Meister Proshop',
    description: 'Full Course coverage plus a low-friction, water-repellent top coat on exterior surfaces.',
  },
  {
    key: 'full',
    name: 'Full Course',
    eyebrow: 'Complete protection',
    description: 'Bodywork, engine, exhaust, forks, swingarm, controls, frame, and wheels.',
  },
  {
    key: 'standard',
    name: 'Standard Course',
    eyebrow: 'Core coverage',
    description: 'Tank, fenders, cowls, engine, and exhaust for balanced whole-bike care.',
  },
  {
    key: 'exterior',
    name: 'Exterior Course',
    eyebrow: 'Painted surfaces',
    description: 'Tank, front fender, cowls, and seat cowl—the most visible exterior panels.',
  },
  {
    key: 'wheel',
    name: 'Wheel Course',
    eyebrow: 'Focused protection',
    description: 'Front and rear wheels only. Removal and nearby-part work may cost extra.',
  },
];

type SearchResult = {
  key: string;
  eyebrow: string;
  title: string;
  meta: string;
  href: string;
};

const importedBrands = pricingCatalog.vehiclePages.filter((page) => page.group === 'imported');
const domestic = pricingCatalog.vehiclePages.find((page) => page.slug === 'domestic')!;
const special = pricingCatalog.vehiclePages.find((page) => page.slug === 'special')!;
const totalRows = pricingCatalog.vehiclePages.reduce(
  (total, page) => total + page.sections.reduce((subtotal, section) => subtotal + section.rows.length, 0),
  0,
);

export default function PricingPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLocaleLowerCase();

  const matchedCourses = normalizedQuery
    ? courseDetails.filter((course) =>
        [course.name, course.eyebrow, course.description, course.key]
          .join(' ')
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      )
    : [];

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!normalizedQuery) return [];

    const results: SearchResult[] = [];
    for (const page of pricingCatalog.vehiclePages) {
      for (const section of page.sections) {
        const contextMatches = [page.name, page.group, section.section, ...section.courses]
          .join(' ')
          .toLocaleLowerCase()
          .includes(normalizedQuery);

        for (const row of section.rows) {
          if (
            contextMatches ||
            row.model.toLocaleLowerCase().includes(normalizedQuery) ||
            row.values.join(' ').toLocaleLowerCase().includes(normalizedQuery)
          ) {
            results.push({
              key: `${page.slug}-${section.section}-${row.model}`,
              eyebrow: page.name,
              title: row.model,
              meta: section.section,
              href: `/pricing/${page.slug}?q=${encodeURIComponent(deferredQuery.trim())}`,
            });
          }
          if (results.length >= 60) return results;
        }
      }
    }

    if ('helmet helmets'.includes(normalizedQuery)) {
      results.push({
        key: 'helmet-category',
        eyebrow: 'Category',
        title: 'Helmets',
        meta: 'Shell and shield coating prices',
        href: '/pricing/helmet',
      });
    }

    for (const row of pricingCatalog.helmet.rows) {
      if (row.join(' ').toLocaleLowerCase().includes(normalizedQuery)) {
        results.push({
          key: `helmet-${row[0]}`,
          eyebrow: 'Helmets',
          title: row[0],
          meta: row.slice(1).join(' · '),
          href: `/pricing/helmet?q=${encodeURIComponent(deferredQuery.trim())}`,
        });
      }
    }

    if ('parts individual parts components'.includes(normalizedQuery)) {
      results.push({
        key: 'parts-category',
        eyebrow: 'Category',
        title: 'Individual parts',
        meta: 'Component-by-component prices',
        href: '/pricing/parts',
      });
    }

    for (const item of pricingCatalog.parts.items) {
      if ([item.category, item.name, ...item.details].join(' ').toLocaleLowerCase().includes(normalizedQuery)) {
        results.push({
          key: `parts-${item.category}-${item.name}`,
          eyebrow: 'Individual parts',
          title: item.name,
          meta: item.category,
          href: `/pricing/parts?q=${encodeURIComponent(deferredQuery.trim())}`,
        });
      }
    }

    return results.slice(0, 60);
  }, [normalizedQuery, deferredQuery]);

  const filteredBrands = normalizedQuery
    ? importedBrands.filter((brand) => brand.name.toLocaleLowerCase().includes(normalizedQuery))
    : importedBrands;

  return (
    <div className="pricing-shell">
      <Navbar />
      <main id="top" className="pricing-main">
        <div className="pricing-container">
          <nav className="pricing-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li aria-current="page">Price List</li>
            </ol>
          </nav>

          <header className="pricing-hero">
            <div className="pricing-hero-copy">
              <span className="pricing-kicker">CR-1 service pricing</span>
              <h1>Find the right protection for your ride.</h1>
              <p>
                Explore CR-1 Japan pricing in English with Philippine-peso estimates for domestic
                and imported motorcycles, special vehicles, helmets, and individual parts. Search
                by brand, model, displacement, price, or service course.
              </p>
              <p>
                Estimates use the {JPY_TO_PHP_RATE_DATE} BSP reference rate of ¥1 = ₱{JPY_TO_PHP_RATE.toFixed(4)}.
                Final Philippine shop quotations may differ.
              </p>
            </div>
            <dl className="pricing-stats" aria-label="Price list coverage">
              <div><dt>{pricingCatalog.vehiclePages.length}</dt><dd>Vehicle lists</dd></div>
              <div><dt>{totalRows}</dt><dd>Pricing rows</dd></div>
              <div><dt>5</dt><dd>Service courses</dd></div>
            </dl>
          </header>

          <section className="pricing-search-panel" aria-labelledby="pricing-search-title">
            <div>
              <span className="pricing-section-index">01</span>
              <h2 id="pricing-search-title">Search every price list</h2>
              <p>Try “Ducati,” “1000cc,” “Panigale,” “helmet,” or “Premium Course.”</p>
            </div>
            <div className="pricing-search-field">
              <Search aria-hidden="true" size={20} />
              <label className="pricing-sr-only" htmlFor="pricing-search">Search CR-1 pricing</label>
              <input
                id="pricing-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search brand, model, displacement, course…"
                autoComplete="off"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear pricing search">
                  <X aria-hidden="true" size={18} />
                </button>
              )}
            </div>
          </section>

          {normalizedQuery && (
            <section className="pricing-results" aria-labelledby="pricing-results-title">
              <div className="pricing-section-heading">
                <div>
                  <span className="pricing-section-index">Results</span>
                  <h2 id="pricing-results-title">Matches for “{query.trim()}”</h2>
                </div>
                <p role="status" aria-live="polite">
                  {matchedCourses.length + searchResults.length} result{matchedCourses.length + searchResults.length === 1 ? '' : 's'}
                  {searchResults.length === 60 ? ' — refine your search to narrow the list' : ''}
                </p>
              </div>

              {matchedCourses.length > 0 && (
                <div className="pricing-course-grid pricing-course-grid-compact">
                  {matchedCourses.map((course) => (
                    <article className={`pricing-course-card course-${course.key}`} key={course.key}>
                      <span>{course.eyebrow}</span>
                      <h3>{course.name}</h3>
                      <p>{course.description}</p>
                    </article>
                  ))}
                </div>
              )}

              {searchResults.length > 0 ? (
                <div className="pricing-result-list">
                  {searchResults.map((result) => (
                    <Link className="pricing-result-row" to={result.href} key={result.key}>
                      <span className="pricing-result-type">{result.eyebrow}</span>
                      <span className="pricing-result-name">{result.title}</span>
                      <span className="pricing-result-meta">{result.meta}</span>
                      <ArrowRight aria-hidden="true" size={18} />
                    </Link>
                  ))}
                </div>
              ) : matchedCourses.length === 0 ? (
                <div className="pricing-empty-state">
                  <Search aria-hidden="true" size={26} />
                  <h3>No exact match yet</h3>
                  <p>Check the spelling or try a broader brand, model family, displacement, or course name.</p>
                </div>
              ) : null}
            </section>
          )}

          {!normalizedQuery && (
            <>
              <section className="pricing-section" aria-labelledby="course-guide-title">
                <div className="pricing-section-heading">
                  <div>
                    <span className="pricing-section-index">02</span>
                    <h2 id="course-guide-title">Choose your level of coverage</h2>
                  </div>
                  <p>Each course protects a different set of motorcycle surfaces and components.</p>
                </div>
                <div className="pricing-course-grid">
                  {courseDetails.map((course) => (
                    <article className={`pricing-course-card course-${course.key}`} key={course.key}>
                      <span>{course.eyebrow}</span>
                      <h3>{course.name}</h3>
                      <p>{course.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="pricing-section" aria-labelledby="category-title">
                <div className="pricing-section-heading">
                  <div>
                    <span className="pricing-section-index">03</span>
                    <h2 id="category-title">Browse by category</h2>
                  </div>
                  <p>Start with the vehicle or item you want CR-1 to protect.</p>
                </div>
                <div className="pricing-category-grid">
                  <Link className="pricing-category-card pricing-category-card-large" to="/pricing/domestic">
                    <span className="pricing-card-icon"><Bike aria-hidden="true" /></span>
                    <span className="pricing-card-copy">
                      <small>By engine displacement</small>
                      <strong>Domestic motorcycles</strong>
                      <span>{domestic.sections.length} displacement and vehicle-type groups</span>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <Link className="pricing-category-card pricing-category-card-large" to="/pricing/special">
                    <span className="pricing-card-icon"><Gauge aria-hidden="true" /></span>
                    <span className="pricing-card-copy">
                      <small>Model-specific rates</small>
                      <strong>Special vehicles</strong>
                      <span>{special.sections.reduce((count, section) => count + section.rows.length, 0)} special vehicle entries</span>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <Link className="pricing-category-card" to="/pricing/helmet">
                    <span className="pricing-card-icon"><HardHat aria-hidden="true" /></span>
                    <span className="pricing-card-copy"><small>Shell and shield options</small><strong>Helmets</strong></span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <Link className="pricing-category-card" to="/pricing/parts">
                    <span className="pricing-card-icon"><Wrench aria-hidden="true" /></span>
                    <span className="pricing-card-copy"><small>Component-by-component</small><strong>Individual parts</strong></span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </section>
            </>
          )}

          <section className="pricing-section" aria-labelledby="brands-title">
            <div className="pricing-section-heading">
              <div>
                <span className="pricing-section-index">{normalizedQuery ? 'Brands' : '04'}</span>
                <h2 id="brands-title">Imported motorcycle brands</h2>
              </div>
              <p>{filteredBrands.length} brand{filteredBrands.length === 1 ? '' : 's'} available</p>
            </div>
            <div className="pricing-brand-grid">
              {filteredBrands.map((brand) => (
                <Link to={`/pricing/${brand.slug}`} className="pricing-brand-card" key={brand.slug}>
                  <span>{brand.name}</span>
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              ))}
            </div>
          </section>

          <section className="pricing-notice-summary" aria-labelledby="price-reading-title">
            <div className="pricing-notice-icon"><ShieldCheck aria-hidden="true" /></div>
            <div>
              <span className="pricing-kicker">Before you compare</span>
              <h2 id="price-reading-title">How to read CR-1 pricing</h2>
              <div className="pricing-legend">
                <span><i className="pricing-dot pricing-dot-new" /> <strong>New vehicle</strong> — untraveled vehicle coated at purchase</span>
                <span><i className="pricing-dot pricing-dot-used" /> <strong>Existing / used vehicle</strong> — shown in brackets in the official list</span>
              </div>
              <p>
                All displayed prices include Japanese consumption tax and are minimum prices.
                Removal, polishing, repairs, or additional preparation may add cost. Certificate
                reissuance or name changes may require an additional fee. Charges vary by
                service course and market, so confirm the current local fee with your CR-1 Pro Shop.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
