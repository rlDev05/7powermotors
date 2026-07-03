import React from 'react';
import cr1LogoDark from '@/styles/images/cr1-logo-dark.png';

interface LogoProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex min-w-0 items-center gap-2 sm:gap-2.5 ${className}`}>
      <div className="relative flex h-9 w-[86px] shrink-0 items-center justify-center sm:h-12 sm:w-[116px]">
        <img 
          src={cr1LogoDark} 
          alt="CR-1 logo"
          className="h-full w-full object-contain drop-shadow-[0_10px_24px_rgba(139,26,26,0.28)]"
        />
      </div>

      {variant === 'default' && (
        <div className="flex translate-y-[1px] flex-col items-start justify-center">
          <span
            className="block text-[1.45rem] text-accent sm:text-[1.9rem]"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.08em',
              lineHeight: 0.85,
            }}
          >
            CR-1
          </span>
          <span
            className="mt-1 block pl-[2px] text-[0.46rem] text-foreground/70 sm:text-[0.56rem]"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.18em',
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
