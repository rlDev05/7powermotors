import React from 'react';
import powerMotorLogo from '@/styles/images/powermotorlogo-cropped.png';

interface LogoProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      
      <div className="relative flex h-12 w-8 shrink-0 translate-y-[-2px] items-center justify-end sm:h-14 sm:w-9">
        <img 
          src={powerMotorLogo} 
          alt="7 POWER lightning hand logo"
          className="h-full w-full object-contain"
        />
      </div>
      
      {/* Text Part */}
      {variant === 'default' && (
        <div className="flex flex-col items-start justify-center">
          <span
            className="block text-[#ff5a00]"
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
