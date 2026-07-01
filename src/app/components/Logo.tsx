import React from 'react';
import cr1Logo from '@/styles/images/cr1-logo.png';

interface LogoProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex h-12 w-24 shrink-0 items-center justify-start bg-white px-2 py-1 shadow-[0_10px_22px_rgba(0,0,0,0.22)] sm:h-14 sm:w-28">
        <img 
          src={cr1Logo} 
          alt="CR-1 logo"
          className="h-full w-full object-contain"
        />
      </div>

      {variant === 'default' && (
        <div className="flex flex-col items-start justify-center">
          <span
            className="block text-accent"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              lineHeight: 0.85,
            }}
          >
            CR-1
          </span>
          <span
            className="mt-1 block pl-[2px] text-foreground/70"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              lineHeight: 1,
            }}
          >
            PHILIPPINES
          </span>
        </div>
      )}
    </div>
  );
}
