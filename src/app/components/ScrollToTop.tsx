import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const toggleVisibility = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 500);
        frame = 0;
      });
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
      isVisible ? (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center border border-accent bg-accent text-accent-foreground shadow-[0_12px_28px_rgba(214,0,0,0.25)] transition-transform hover:scale-110 hover:bg-[var(--accent-deep)] active:scale-90 sm:bottom-8 sm:right-8 sm:h-12 sm:w-12"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      ) : null
  );
}
