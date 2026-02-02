import React, { useEffect, useState } from 'react';
import loadingVid from '../../styles/videos/motor7power.mp4';

interface LoadingScreenProps {
  onFinished: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show the skip button after 2 seconds of playback
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black group">
      <video
        src={loadingVid}
        autoPlay
        muted
        playsInline
        onEnded={onFinished}
        className="w-full h-full object-cover"
      />

      {/* Skip Button Overlay */}
      {showSkip && (
        <button
          onClick={onFinished}
          className="absolute bottom-10 right-10 z-[10000] px-6 py-2 
                     bg-black/20 hover:bg-white/10 border border-white/30 
                     backdrop-blur-md text-white text-sm font-bold tracking-[0.2em] 
                     transition-all duration-300 rounded-sm uppercase
                     hover:border-accent"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          Skip Intro
        </button>
      )}

      {/* Optional: Subtle Vignette to help the button pop */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}