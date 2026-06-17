import React from 'react';
import powerMotorLogo from '@/styles/images/powermotorlogo.png';

interface LogoProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      
      <div className="relative flex h-14 w-9 shrink-0 items-center justify-start overflow-visible sm:h-16 sm:w-10">
        <img 
          src={powerMotorLogo} 
          alt="7 POWER lightning hand logo"
          className="h-full w-[6.25rem] max-w-none object-contain sm:w-[3.75rem]"
        />
      </div>
      
      {/* Text Part */}
      {variant === 'default' && (
        <div className="-ml-1.5 flex translate-y-[1px] flex-col items-start justify-center sm:-ml-2">
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
            POWER
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
            MOTORS
          </span>
        </div>
      )}
    </div>
  );
}
