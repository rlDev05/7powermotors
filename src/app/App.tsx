import React, { useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
// Adjust this path if your LoadingScreen file is elsewhere
import { LoadingScreen } from './components/LoadingScreen'; 

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onFinished={() => setIsLoading(false)} />
      ) : (
        <div className="animate-in fade-in duration-700">
          <RouterProvider router={router} />
        </div>
      )}
    </>
  );
}