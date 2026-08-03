// src/app/routes.tsx
import React, { lazy, Suspense, useEffect } from 'react';
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Navigate,
  Outlet,
  useLocation,
  useParams,
  useRouteError,
} from 'react-router-dom';

// Import your pages
import Home from '@/app/pages/Home';
import ProductsPage from '@/app/pages/ProductsPage';
import ServicesPage from '@/app/pages/ServicesPage';
import ContactPage from '@/app/pages/ContactPage';
import PartnersPage from '@/app/pages/PartnersPage';
import MotorcyclesPage from '@/app/motorcycles/MotorcyclesPage';
import BikeDetailsPage from '@/app/motorcycles/BikeDetailsPage';

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
  return <div className="min-h-screen bg-background pt-32 text-center text-muted-foreground">Loading price list…</div>;
}

function LegacyPricingRedirect() {
  const { legacyFile = '' } = useParams();
  const slug = legacyPricingSlugs[legacyFile];
  return <Navigate to={slug ? `/pricing/${slug}` : '/pricing'} replace />;
}

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
        element: <Home />,
      },
      {
        path: 'motorcycles',
        element: <MotorcyclesPage />,
      },
      {
        path: 'models',
        element: <MotorcyclesPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'motorcycles/:id', // This matches the useParams in BikeDetailsPage
        element: <BikeDetailsPage />,
      },
      {
        path: 'models/:id',
        element: <BikeDetailsPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'pricing',
        element: <Suspense fallback={<PricingLoader />}><PricingPage /></Suspense>,
      },
      {
        path: 'pricing/:slug',
        element: <Suspense fallback={<PricingLoader />}><PricingDetailPage /></Suspense>,
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
        element: <PartnersPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
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
