import React from 'react';
import powerMotorLogo from '@/styles/images/powermotorlogo-cropped.png';

interface LogoProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      
      <div className="relative flex h-14 w-11 shrink-0 items-center justify-center sm:h-16 sm:w-12">
        <img 
          src={powerMotorLogo} 
          alt="7 POWER lightning hand logo"
          className="h-full w-full object-contain"
        />
      </div>
      
      {/* Text Part */}
      {variant === 'default' && (
        <div className="flex translate-y-[1px] flex-col items-start justify-center">
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
