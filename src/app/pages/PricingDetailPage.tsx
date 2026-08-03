import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUp, ExternalLink, Search, ShieldAlert, X } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Footer } from '@/app/components/Footer';
import { Navbar } from '@/app/components/Navbar';
import { type CourseKey, type VehiclePricingPage } from '@/app/data/pricing';
import {
  JPY_TO_PHP_RATE,
  JPY_TO_PHP_RATE_DATE,
  JPY_TO_PHP_RATE_SOURCE,
  localizedPricingCatalog as pricingCatalog,
} from '@/app/lib/pricingLocalization';

const courseNames: Record<CourseKey, string> = {
  premium: 'Premium Course',
  full: 'Full Course',
  standard: 'Standard Course',
  exterior: 'Exterior Course',
  wheel: 'Wheel Course',
};

const sharedDisclaimer = [
  'CR-1 coating does not guarantee prevention of every scratch or all dirt adhesion.',
  'Incorrect handling or a major impact can still damage a surface after coating application.',
  'Coating performance may vary with the material, texture, condition, and hardness of the underlying surface.',
  'Some products may show a change in color tone or texture after coating application.',
  'Coating durability varies according to use, storage conditions, climate, maintenance, and surface damage.',
];

function PriceValue({ value }: { value: string }) {
  if (!value || value === '-') return <span className="pricing-unavailable">—</span>;
  const [newVehicle, ...usedParts] = value.split(' / ');
  const usedVehicle = usedParts.join(' / ').replace(/[【】]/g, '');

  return (
    <span className="pricing-price-pair">
      <span className="pricing-price-new"><small>New</small>{newVehicle}</span>
      {usedVehicle && <span className="pricing-price-used"><small>Existing</small>{usedVehicle}</span>}
    </span>
  );
}

function DetailSearch({
  query,
  onChange,
  count,
  label,
}: {
  query: string;
  onChange: (value: string) => void;
  count: number;
  label: string;
}) {
  return (
    <div className="pricing-detail-toolbar">
      <div className="pricing-search-field">
        <Search aria-hidden="true" size={20} />
        <label className="pricing-sr-only" htmlFor="pricing-detail-search">{label}</label>
        <input
          id="pricing-detail-search"
          type="search"
          value={query}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Filter models, displacement, prices, or courses…"
          autoComplete="off"
        />
        {query && (
          <button type="button" onClick={() => onChange('')} aria-label="Clear detail search">
            <X aria-hidden="true" size={18} />
          </button>
        )}
      </div>
      <p role="status" aria-live="polite">{count} matching item{count === 1 ? '' : 's'}</p>
    </div>
  );
}

function filterVehicleSections(page: VehiclePricingPage, query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return page.sections.map((section) => {
    if (!normalizedQuery) return section;
    const sectionMatches = [section.section, ...section.courses.map((course) => courseNames[course])]
      .join(' ')
      .toLocaleLowerCase()
      .includes(normalizedQuery);
    return {
      ...section,
      rows: sectionMatches
        ? section.rows
        : section.rows.filter((row) =>
            [row.model, ...row.values].join(' ').toLocaleLowerCase().includes(normalizedQuery),
          ),
    };
  }).filter((section) => section.rows.length > 0);
}

function VehicleTables({ page, query }: { page: VehiclePricingPage; query: string }) {
  const sections = useMemo(() => filterVehicleSections(page, query), [page, query]);

  if (!sections.length) {
    return <div className="pricing-empty-state"><Search aria-hidden="true" /><h2>No matching prices</h2><p>Try a broader model, displacement, course, or price.</p></div>;
  }

  return sections.map((section) => (
    <section className="pricing-table-section" id={section.section.replace(/\s+/g, '-').toLocaleLowerCase()} key={section.section}>
      <div className="pricing-table-heading">
        <div><span>{page.name}</span><h2>{section.section}</h2></div>
        <span>{section.rows.length} item{section.rows.length === 1 ? '' : 's'}</span>
      </div>

      <div className="pricing-table-scroll" tabIndex={0} aria-label={`${section.section} pricing table; scroll horizontally if needed`}>
        <table className="pricing-table">
          <caption>{page.name} — {section.section}</caption>
          <thead>
            <tr>
              <th scope="col">Model / vehicle type</th>
              {section.courses.map((course) => (
                <th scope="col" className={`course-heading course-${course}`} key={course}>{courseNames[course]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, rowIndex) => (
              <tr key={`${row.model}-${rowIndex}`}>
                <th scope="row">{row.model}</th>
                {section.courses.map((course, index) => (
                  <td key={course}><PriceValue value={row.values[index] ?? '-'} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pricing-mobile-list">
        {section.rows.map((row, rowIndex) => (
          <article className="pricing-mobile-card" key={`${row.model}-mobile-${rowIndex}`}>
            <h3>{row.model}</h3>
            <dl>
              {section.courses.map((course, index) => (
                <div key={course}>
                  <dt className={`course-${course}`}>{courseNames[course]}</dt>
                  <dd><PriceValue value={row.values[index] ?? '-'} /></dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  ));
}

export default function PricingDetailPage() {
  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const vehiclePage = pricingCatalog.vehiclePages.find((page) => page.slug === slug);
  const isHelmet = slug === 'helmet';
  const isParts = slug === 'parts';
  const name = vehiclePage?.name ?? (isHelmet ? pricingCatalog.helmet.name : isParts ? pricingCatalog.parts.name : 'Price list');

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredHelmetRows = pricingCatalog.helmet.rows.filter((row) =>
    !normalizedQuery || row.join(' ').toLocaleLowerCase().includes(normalizedQuery),
  );
  const filteredParts = pricingCatalog.parts.items.filter((item) =>
    !normalizedQuery || [item.category, item.name, ...item.details].join(' ').toLocaleLowerCase().includes(normalizedQuery),
  );
  const filteredVehicleSections = vehiclePage ? filterVehicleSections(vehiclePage, query) : [];
  const vehicleCount = filteredVehicleSections.reduce((total, section) => total + section.rows.length, 0);

  const groupedParts = filteredParts.reduce<Record<string, typeof filteredParts>>((groups, item) => {
    (groups[item.category] ??= []).push(item);
    return groups;
  }, {});

  if (!vehiclePage && !isHelmet && !isParts) {
    return (
      <div className="pricing-shell">
        <Navbar />
        <main className="pricing-main"><div className="pricing-container pricing-not-found">
          <span className="pricing-kicker">404 — Price list</span>
          <h1>This pricing category was not found.</h1>
          <Link className="pricing-primary-link" to="/pricing"><ArrowLeft aria-hidden="true" /> Back to Price List</Link>
        </div></main>
        <Footer />
      </div>
    );
  }

  const sourceUrl = vehiclePage?.sourceUrl ?? (isHelmet ? pricingCatalog.helmet.sourceUrl : pricingCatalog.parts.sourceUrl);
  const notes = vehiclePage?.notes ?? (isHelmet ? pricingCatalog.helmet.notes : pricingCatalog.parts.notes);

  return (
    <div className="pricing-shell">
      <Navbar />
      <main id="top" className="pricing-main">
        <div className="pricing-container">
          <nav className="pricing-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/pricing">Price List</Link></li>
              <li aria-current="page">{name}</li>
            </ol>
          </nav>

          <header className="pricing-detail-hero">
            <div>
              <span className="pricing-kicker">CR-1 official pricing</span>
              <h1>{name}</h1>
              <p>
                Philippine-peso estimates are shown as new vehicle first, followed by the existing
                or used vehicle amount. Values are converted from CR-1 Japan&apos;s minimum tax-inclusive
                prices using the {JPY_TO_PHP_RATE_DATE} BSP reference rate of ¥1 = ₱{JPY_TO_PHP_RATE.toFixed(4)}.
              </p>
            </div>
            <div className="pricing-detail-actions">
              <Link className="pricing-secondary-link" to="/pricing"><ArrowLeft aria-hidden="true" /> Back to Price List</Link>
              <a className="pricing-source-link" href={sourceUrl} target="_blank" rel="noreferrer">
                Official source <ExternalLink aria-hidden="true" />
              </a>
            </div>
          </header>

          <DetailSearch
            query={query}
            onChange={setQuery}
            count={vehiclePage ? vehicleCount : isHelmet ? filteredHelmetRows.length : filteredParts.length}
            label={`Filter ${name} pricing`}
          />

          {vehiclePage && <VehicleTables page={vehiclePage} query={query} />}

          {isHelmet && (
            <section className="pricing-table-section">
              <div className="pricing-table-heading">
                <div><span>Helmet coating</span><h2>Shell and shield pricing</h2></div>
                <span>{filteredHelmetRows.length} types</span>
              </div>
              <div className="pricing-table-scroll" tabIndex={0} aria-label="Helmet pricing table; scroll horizontally if needed">
                <table className="pricing-table pricing-helmet-table">
                  <caption>CR-1 helmet coating prices</caption>
                  <thead><tr>{pricingCatalog.helmet.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
                  <tbody>
                    {filteredHelmetRows.map((row) => (
                      <tr key={row[0]}>
                        <th scope="row">{row[0]}</th>
                        {row.slice(1).map((value, index) => <td key={pricingCatalog.helmet.columns[index + 1]}><PriceValue value={value} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pricing-mobile-list">
                {filteredHelmetRows.map((row) => (
                  <article className="pricing-mobile-card" key={`${row[0]}-mobile`}>
                    <h3>{row[0]}</h3>
                    <dl>{row.slice(1).map((value, index) => (
                      <div key={pricingCatalog.helmet.columns[index + 1]}>
                        <dt>{pricingCatalog.helmet.columns[index + 1]}</dt><dd><PriceValue value={value} /></dd>
                      </div>
                    ))}</dl>
                  </article>
                ))}
              </div>
            </section>
          )}

          {isParts && (
            <div className="pricing-parts-groups">
              {Object.entries(groupedParts).map(([category, items]) => (
                <section className="pricing-parts-section" key={category}>
                  <div className="pricing-table-heading"><div><span>Individual parts</span><h2>{category}</h2></div><span>{items.length} items</span></div>
                  <div className="pricing-parts-grid">
                    {items.map((item) => (
                      <article className="pricing-part-card" key={item.name}>
                        <h3>{item.name}</h3>
                        <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          <section className="pricing-legal" aria-labelledby="pricing-notes-title">
            <div className="pricing-legal-heading">
              <ShieldAlert aria-hidden="true" />
              <div><span className="pricing-kicker">Important information</span><h2 id="pricing-notes-title">Pricing conditions and disclaimer</h2></div>
            </div>
            <div className="pricing-legal-summary">
              <p><strong>New vehicle:</strong> An unused motorcycle treated at the time of new-vehicle purchase. Every other motorcycle uses the existing-vehicle amount.</p>
              <p><strong>Currency conversion:</strong> Peso amounts are estimates converted at ¥1 = ₱{JPY_TO_PHP_RATE.toFixed(4)} using the {JPY_TO_PHP_RATE_SOURCE} reference rate dated {JPY_TO_PHP_RATE_DATE}. They are not final Philippine retail quotations.</p>
              <p><strong>Certificate fees:</strong> Reissuance or name changes may require an additional fee. Charges vary by service course and market; confirm the current local fee with your CR-1 Pro Shop.</p>
            </div>
            {notes.length > 0 && (
              <details open>
                <summary>Price conditions for this category</summary>
                <ul>{notes.map((note) => <li key={note}>{note}</li>)}</ul>
              </details>
            )}
            <details>
              <summary>Official CR-1 disclaimer</summary>
              <p className="pricing-legal-intro">Disclaimer — CR-1 technicians take care during application, but customers should understand the following conditions.</p>
              <ul>{sharedDisclaimer.map((note) => <li key={note}>{note}</li>)}</ul>
            </details>
          </section>

          <div className="pricing-bottom-actions">
            <Link className="pricing-primary-link" to="/pricing"><ArrowLeft aria-hidden="true" /> Back to Price List</Link>
            <a className="pricing-secondary-link" href="#top"><ArrowUp aria-hidden="true" /> Back to Top</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
