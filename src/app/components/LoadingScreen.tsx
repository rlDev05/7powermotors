import React, { useCallback, useEffect, useRef, useState } from 'react';
import cr1LoadingVideo from '@/styles/videos/cr1-loading-clean.mp4';

interface LoadingScreenProps {
  onFinished: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [showSkip, setShowSkip] = useState(false);
  const hasFinished = useRef(false);

  const finishIntro = useCallback(() => {
    if (hasFinished.current) return;

    hasFinished.current = true;
    onFinished();
  }, [onFinished]);

  useEffect(() => {
    const skipTimer = window.setTimeout(() => setShowSkip(true), 350);
    const finishTimer = window.setTimeout(finishIntro, 1800);

    return () => {
      window.clearTimeout(skipTimer);
      window.clearTimeout(finishTimer);
    };
  }, [finishIntro]);

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
    <div
      className="group fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
      role="status"
      aria-live="polite"
      aria-label="Loading CR-1 Philippines"
    >
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center sm:gap-3 sm:px-6">
        <div className="relative w-[min(88vw,520px)] overflow-hidden">
          <video
            src={cr1LoadingVideo}
            className="h-auto w-full select-none object-contain"
            autoPlay
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
            onEnded={finishIntro}
            aria-label="CR-1 motorcycle and helmet coating loading animation"
          />
        </div>
        <p
          className="text-xs font-black uppercase tracking-[0.3em] text-foreground/70"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          CR-1 Philippines
        </p>
        <p className="sr-only">Applying premium protection. Please wait.</p>
      </div>

      {/* Skip Button Overlay */}
      {showSkip && (
        <button
          onClick={finishIntro}
          className="absolute bottom-5 right-5 z-[10000] px-5 py-2 sm:bottom-8 sm:right-8
                     bg-white/85 hover:bg-accent border border-black/15
                     backdrop-blur-md text-foreground hover:text-white text-xs font-bold tracking-[0.2em]
                     transition-all duration-300 rounded-sm uppercase
                     hover:border-accent focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-[0.98]"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          Enter Site
        </button>
      )}

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/[0.025] to-transparent" />
    </div>
  );
}
