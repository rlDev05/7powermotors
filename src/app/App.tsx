import React, { useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
// Adjust this path if your LoadingScreen file is elsewhere
import { LoadingScreen } from './components/LoadingScreen'; 

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem('cr1-intro-seen') !== 'true';
  });

  const finishLoading = () => {
    sessionStorage.setItem('cr1-intro-seen', 'true');
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onFinished={finishLoading} />
      ) : (
        <div className="animate-in fade-in duration-700">
          <RouterProvider router={router} />
        </div>
      )}
    </>
  );
}
