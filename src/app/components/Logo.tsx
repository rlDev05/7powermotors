import React from 'react';
import powerMotorLogo from '@/styles/images/powermotorlogo.png';

interface LogoProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      
      <div className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
        <img 
          src={powerMotorLogo} 
          alt="7 POWER lightning hand logo"
          className="h-full w-full object-contain"
        />
      </div>
      
      {/* Text Part */}
      {variant === 'default' && (
        <div className="flex flex-col leading-none">
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
