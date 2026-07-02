import React, { useCallback, useEffect, useState } from 'react';
import cr1LogoDark from '@/styles/images/cr1-logo-dark.png';
import cr1LoadingLoop from '@/styles/videos/cr1-logo-loading-loop.mp4';

interface LoadingScreenProps {
  onFinished: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = window.setTimeout(() => setShowSkip(true), 700);
    const finishTimer = window.setTimeout(onFinished, 1800);

    return () => {
      window.clearTimeout(skipTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinished]);

  const finishIntro = useCallback(() => {
    onFinished();
  }, [onFinished]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        finishIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finishIntro]);

  return (
    <div className="group fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050505]">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <div className="absolute -left-40 top-20 h-40 w-[34rem] rotate-[-18deg] bg-accent/35" />
      <div className="absolute -right-40 bottom-20 h-40 w-[34rem] rotate-[-28deg] bg-white/10" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <div className="relative w-[min(74vw,420px)] overflow-hidden">
          <video
            src={cr1LoadingLoop}
            className="h-auto w-full object-contain drop-shadow-[0_24px_70px_rgba(139,26,26,0.34)]"
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-label="CR-1 Philippines loading animation"
          />
          <img
            src={cr1LogoDark}
            alt="CR-1 Philippines logo"
            className="sr-only"
          />
        </div>
        <div className="h-px w-56 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <p
          className="text-xs font-black uppercase tracking-[0.34em] text-white/65"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          CR-1 Philippines
        </p>
      </div>

      {/* Skip Button Overlay */}
      {showSkip && (
        <button
          onClick={finishIntro}
          className="absolute bottom-8 right-8 z-[10000] px-5 py-2 
                     bg-black/20 hover:bg-white/10 border border-white/30 
                     backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] 
                     transition-all duration-300 rounded-sm uppercase
                     hover:border-accent"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          Enter Site
        </button>
      )}

      {/* Optional: Subtle Vignette to help the button pop */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}
