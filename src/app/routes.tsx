// src/app/routes.tsx
import React, { lazy, Suspense, useEffect } from 'react';
import { getPricingTranslations } from '@/app/i18n/pricing';
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Navigate,
  Outlet,
  useLocation,
  useParams,
  useRouteError,
} from 'react-router-dom';

const Home = lazy(() => import('@/app/pages/Home'));
const ProductsPage = lazy(() => import('@/app/pages/ProductsPage'));
const ServicesPage = lazy(() => import('@/app/pages/ServicesPage'));
const ContactPage = lazy(() => import('@/app/pages/ContactPage'));
const PartnersPage = lazy(() => import('@/app/pages/PartnersPage'));
const MotorcyclesPage = lazy(() => import('@/app/motorcycles/MotorcyclesPage'));
const BikeDetailsPage = lazy(() => import('@/app/motorcycles/BikeDetailsPage'));
const PricingPage = lazy(() => import('@/app/pages/PricingPage'));
const PricingDetailPage = lazy(() => import('@/app/pages/PricingDetailPage'));

const legacyPricingSlugs: Record<string, string> = {
  'domestic.html': 'domestic',
  'special.html': 'special',
  'ducati.html': 'ducati',
  'can-am_spyder.html': 'can-am',
  'harley-davidson.html': 'harley-davidson',
  'mv_agusta.html': 'mv-agusta',
  'bmw.html': 'bmw',
  'ktm.html': 'ktm',
  'triumph.html': 'triumph',
  'aprilia.html': 'aprilia',
  'vespa.html': 'vespa',
  'moto_guzzi.html': 'moto-guzzi',
  'husqvarna.html': 'husqvarna',
  'indian.html': 'indian',
  'royal-enfield.html': 'royal-enfield',
  'mutt.html': 'mutt',
  'helmet.html': 'helmet',
  'parts.html': 'parts',
};

function PricingLoader() {
  return <div className="min-h-screen bg-background pt-32 text-center text-muted-foreground">{getPricingTranslations('en').loading.priceList}</div>;
}

function LegacyPricingRedirect() {
  const { legacyFile = '' } = useParams();
  const slug = legacyPricingSlugs[legacyFile];
  return <Navigate to={slug ? `/pricing/${slug}` : '/pricing'} replace />;
}

const withPageLoader = (page: React.ReactNode) => <Suspense fallback={<PricingLoader />}>{page}</Suspense>;

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-2">Sorry, an unexpected error has occurred.</p>
      <p className="text-muted-foreground">
        {isRouteErrorResponse(error) 
          ? `${error.status} ${error.statusText}` 
          : 'Unknown Error'}
      </p>
      <a href="/" className="mt-4 font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
        Go back home
      </a>
    </div>
  );
}

function RouteScrollReset() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search]);

  return <Outlet />;
}

// --- ROUTER CONFIGURATION ---
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteScrollReset />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withPageLoader(<Home />),
      },
      {
        path: 'motorcycles',
        element: withPageLoader(<MotorcyclesPage />),
      },
      {
        path: 'models',
        element: withPageLoader(<MotorcyclesPage />),
      },
      {
        path: 'products',
        element: withPageLoader(<ProductsPage />),
      },
      {
        path: 'motorcycles/:id', // This matches the useParams in BikeDetailsPage
        element: withPageLoader(<BikeDetailsPage />),
      },
      {
        path: 'models/:id',
        element: withPageLoader(<BikeDetailsPage />),
      },
      {
        path: 'services',
        element: withPageLoader(<ServicesPage />),
      },
      {
        path: 'pricing',
        element: withPageLoader(<PricingPage />),
      },
      {
        path: 'pricing/:slug',
        element: withPageLoader(<PricingDetailPage />),
      },
      {
        path: 'service',
        element: <Navigate to="/pricing" replace />,
      },
      {
        path: 'service/index.html',
        element: <Navigate to="/pricing" replace />,
      },
      {
        path: 'service/:legacyFile',
        element: <LegacyPricingRedirect />,
      },
      {
        path: 'partners',
        element: withPageLoader(<PartnersPage />),
      },
      {
        path: 'contact',
        element: withPageLoader(<ContactPage />),
      },
      // --- CATCH-ALL ROUTE (404) ---
      {
        path: '*',
        element: (
          <div className="p-10 text-center min-h-screen pt-32">
            <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
            <p className="mt-2">The bike you are looking for has ridden away.</p>
            <a href="/" className="mt-4 inline-block bg-accent text-white px-4 py-2 rounded hover:bg-[var(--accent-deep)]">
              Return Home
            </a>
          </div>
        ),
      },
    ],
  },
]);
