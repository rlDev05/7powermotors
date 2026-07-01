import React from 'react';
import cr1Logo from '@/styles/images/cr1-logo.png';

interface LogoProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex h-11 w-[104px] shrink-0 items-center justify-center border border-white/20 bg-white px-3 py-2 shadow-[0_12px_28px_rgba(227,6,19,0.14),inset_0_0_0_1px_rgba(5,5,5,0.06)] sm:h-12 sm:w-[116px]">
        <span className="pointer-events-none absolute inset-y-1 left-1 w-1 bg-accent" />
        <img 
          src={cr1Logo} 
          alt="CR-1 logo"
          className="relative h-full w-full object-contain"
        />
      </div>

      {variant === 'default' && (
        <div className="flex translate-y-[1px] flex-col items-start justify-center">
          <span
            className="block text-accent"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1.9rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              lineHeight: 0.85,
            }}
          >
            CR-1
          </span>
          <span
            className="mt-1 block pl-[2px] text-foreground/70"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.56rem',
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
