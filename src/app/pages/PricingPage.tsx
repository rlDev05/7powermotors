import React, { useDeferredValue, useEffect, useState } from 'react';
import {
  ArrowRight,
  Bike,
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
import { getPricingTranslations } from '@/app/i18n/pricing';
import {
  PRICING_TOTAL_ROWS,
  PRICING_SNAPSHOT_DATE,
  pricingVehiclePages,
} from '@/app/lib/pricingConfig';

const pricingText = getPricingTranslations('en');

const courseDetails: Array<{
  key: CourseKey;
  name: string;
  eyebrow: string;
  description: string;
}> = [
  {
    key: 'premium',
    name: pricingText.courses.premium,
    eyebrow: 'Meister Proshop',
    description: 'Full Course coverage plus a low-friction, water-repellent top coat on exterior surfaces.',
  },
  {
    key: 'full',
    name: pricingText.courses.full,
    eyebrow: 'Comprehensive coverage',
    description: 'Bodywork, engine, exhaust, forks, swingarm, controls, frame, and wheels.',
  },
  {
    key: 'standard',
    name: pricingText.courses.standard,
    eyebrow: 'Core coverage',
    description: 'Tank, fenders, cowls, engine, and exhaust for balanced whole-bike care.',
  },
  {
    key: 'exterior',
    name: pricingText.courses.exterior,
    eyebrow: 'Painted surfaces',
    description: 'Tank, front fender, cowls, and seat cowl—the most visible exterior panels.',
  },
  {
    key: 'wheel',
    name: pricingText.courses.wheel,
    eyebrow: 'Focused protection',
    description: 'Front and rear wheels only. Removal and nearby-part work may cost extra.',
  },
];

type SearchResult = {
  key: string;
  eyebrow: string;
  title: string;
  context: string;
  href: string;
};

const importedBrands = pricingVehiclePages.filter((page) => page.group === 'imported');

export default function PricingPage() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchPending, setSearchPending] = useState(false);
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

  useEffect(() => {
    if (!normalizedQuery) {
      setSearchResults([]);
      setSearchPending(false);
      return;
    }

    let cancelled = false;
    setSearchPending(true);
    import('@/app/lib/pricingSearchIndex').then(({ searchPricingIndex }) => {
      if (cancelled) return;
      const results: SearchResult[] = searchPricingIndex(normalizedQuery).map(({ haystack: _haystack, slug, ...entry }) => ({
        ...entry,
        href: `/pricing/${slug}?q=${encodeURIComponent(deferredQuery.trim())}`,
      }));

      if ('helmet helmets'.includes(normalizedQuery)) {
        results.unshift({ key: 'helmet-category', eyebrow: pricingText.labels.category, title: 'Helmets', context: 'Shell and shield coating prices', href: '/pricing/helmet' });
      }
      if ('parts individual parts components other items'.includes(normalizedQuery)) {
        results.unshift({ key: 'parts-category', eyebrow: pricingText.labels.category, title: 'Other items', context: 'Small, medium, and large item prices', href: '/pricing/parts' });
      }

      setSearchResults(results.slice(0, 60));
      setSearchPending(false);
    });

    return () => { cancelled = true; };
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

          <header className="pricing-hero rounded-2xl">
            <div className="pricing-hero-copy">
              <span className="pricing-kicker">CR-1 service pricing</span>
              <h1>Find the right protection for your ride.</h1>
              <p>
                Explore CR-1 Philippines pricing for domestic and imported motorcycles, helmets,
                and other items. Search
                by brand, model, displacement, price, or service course.
              </p>
              <p>
                Philippine-peso prices are loaded locally from the CR-1 master price list snapshot dated {PRICING_SNAPSHOT_DATE}.
                Final shop quotations may differ when extra preparation or service is required.
              </p>
            </div>
            <dl className="pricing-stats" aria-label="Price list coverage">
              <div><dt>{pricingVehiclePages.length}</dt><dd>Vehicle lists</dd></div>
              <div><dt>{PRICING_TOTAL_ROWS}</dt><dd>Pricing rows</dd></div>
              <div><dt>5</dt><dd>Service courses</dd></div>
            </dl>
          </header>

          <section className="pricing-search-panel rounded-2xl" aria-labelledby="pricing-search-title">
            <div>
              <span className="pricing-section-index">01</span>
              <h2 id="pricing-search-title">Search every price list</h2>
              <p>Try “Ducati,” “1000cc,” “Panigale,” or “helmet”.</p>
            </div>
            <div className="pricing-search-field rounded-xl">
              <Search aria-hidden="true" size={20} />
              <label className="pricing-sr-only" htmlFor="pricing-search">{pricingText.search.overviewLabel}</label>
              <input
                id="pricing-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={pricingText.search.overviewPlaceholder}
                autoComplete="off"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label={pricingText.actions.clearSearch}>
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
                  {searchPending ? pricingText.search.pending : `${matchedCourses.length + searchResults.length} result${matchedCourses.length + searchResults.length === 1 ? '' : 's'}`}
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
                      <span className="pricing-result-context">{result.context}</span>
                      <ArrowRight aria-hidden="true" size={18} />
                    </Link>
                  ))}
                </div>
              ) : matchedCourses.length === 0 && !searchPending ? (
                <div className="pricing-empty-state">
                  <Search aria-hidden="true" size={26} />
                  <h3>{pricingText.labels.noExactMatch}</h3>
                  <p>{pricingText.search.emptyHint}</p>
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
                    <article className={`pricing-course-card rounded-2xl cursor-pointer course-${course.key}`} key={course.key}>
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
                  <Link className="pricing-category-card pricing-category-card-large rounded-2xl" to="/pricing/domestic">
                    <span className="pricing-card-icon rounded-xl"><Bike aria-hidden="true" /></span>
                    <span className="pricing-card-copy">
                      <small>By engine displacement</small>
                      <strong>Japanese Brands</strong>
                      <span>Displacement and vehicle-type price groups</span>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <Link className="pricing-category-card rounded-2xl" to="/pricing/helmet">
                    <span className="pricing-card-icon rounded-xl"><HardHat aria-hidden="true" /></span>
                    <span className="pricing-card-copy"><small>Shell and shield options</small><strong>Helmets</strong></span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <Link className="pricing-category-card rounded-2xl" to="/pricing/parts">
                    <span className="pricing-card-icon rounded-xl"><Wrench aria-hidden="true" /></span>
                    <span className="pricing-card-copy"><small>Additional coating sizes</small><strong>Other items</strong></span>
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
                <h2 id="brands-title">Other Brands</h2>
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

          <section className="pricing-notice-summary rounded-2xl" aria-labelledby="price-reading-title">
            <div className="pricing-notice-icon rounded-xl"><ShieldCheck aria-hidden="true" /></div>
            <div>
              <span className="pricing-kicker">Before you compare</span>
              <h2 id="price-reading-title">How to read CR-1 pricing</h2>
              <div className="pricing-legend">
                <span><i className="pricing-dot pricing-dot-new" /> <strong>New vehicle</strong> — untraveled vehicle coated at purchase</span>
                <span><i className="pricing-dot pricing-dot-used" /> <strong>Existing / used vehicle</strong> — shown in brackets in the official list</span>
              </div>
              <p>
                Prices are shown in Philippine pesos for new and existing vehicles.
                Removal, polishing, repairs, or additional preparation may add cost. Certificate
                reissuance or name changes may require an additional fee. Charges vary by
                service course and market, so confirm this with your authorized CR-1 dealer.
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
