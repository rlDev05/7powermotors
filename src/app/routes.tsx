// src/app/routes.tsx
import { createBrowserRouter, useRouteError, isRouteErrorResponse } from 'react-router-dom';

// Import your pages
import Home from '@/app/pages/Home';
import ProductsPage from '@/app/pages/ProductsPage';
import ServicesPage from '@/app/pages/ServicesPage';
import ContactPage from '@/app/pages/ContactPage';
import PartnersPage from '@/app/pages/PartnersPage';
import MotorcyclesPage from '@/app/motorcycles/MotorcyclesPage';
import BikeDetailsPage from '@/app/motorcycles/BikeDetailsPage';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-2">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500">
        {isRouteErrorResponse(error) 
          ? `${error.status} ${error.statusText}` 
          : 'Unknown Error'}
      </p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Go back home
      </a>
    </div>
  );
}

// --- ROUTER CONFIGURATION ---
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/motorcycles',
    element: <MotorcyclesPage />,
  },
  {
    path: '/models',
    element: <MotorcyclesPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/motorcycles/:id', // This matches the useParams in BikeDetailsPage
    element: <BikeDetailsPage />,
  },
  {
    path: '/models/:id',
    element: <BikeDetailsPage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/partners',
    element: <PartnersPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  // --- CATCH-ALL ROUTE (404) ---
  {
    path: '*',
    element: (
      <div className="p-10 text-center min-h-screen pt-32">
        <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
        <p className="mt-2">The bike you are looking for has ridden away.</p>
        <a href="/" className="mt-4 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Return Home
        </a>
      </div>
    ),
  },
]);
