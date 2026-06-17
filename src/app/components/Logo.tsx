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
          className="h-full w-14 max-w-none object-contain sm:w-16"
        />
      </div>
      
      {/* Text Part */}
      {variant === 'default' && (
        <div className="-ml-1 flex flex-col leading-none sm:-ml-1.5">
          <span
            className="text-accent tracking-wider"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            POWER
          </span>
          <span
            className="text-foreground/70 tracking-widest"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.58rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              marginTop: '-4px',
            }}
          >
            MOTORS
          </span>
        </div>
      )}
    </div>
  );
}
