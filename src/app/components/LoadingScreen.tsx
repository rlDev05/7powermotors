import React, { useCallback, useEffect, useState } from 'react';
import cr1LogoDark from '@/styles/images/cr1-logo-dark.png';

interface LoadingScreenProps {
  onFinished: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = window.setTimeout(() => setShowSkip(true), 1200);
    const finishTimer = window.setTimeout(onFinished, 3200);

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

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <img
          src={cr1LogoDark}
          alt="CR-1 Philippines logo"
          className="h-auto w-[min(72vw,360px)] object-contain drop-shadow-[0_24px_70px_rgba(227,6,19,0.30)]"
        />
        <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
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
          className="absolute bottom-10 right-10 z-[10000] px-6 py-2 
                     bg-black/20 hover:bg-white/10 border border-white/30 
                     backdrop-blur-md text-white text-sm font-bold tracking-[0.2em] 
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
