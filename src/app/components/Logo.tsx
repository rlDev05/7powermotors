import React from 'react';
import powerMotorLogo from '@/styles/images/powermotorlogo.png';

interface LogoProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      
      <div className="relative w-10 h-10 flex items-center justify-center">
        <img 
          src={powerMotorLogo} 
          alt="Power Motor Logo"
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Text Part */}
      {variant === 'default' && (
        <div className="flex flex-col leading-none">
          <span
            className="text-[#ff6f00] tracking-wider"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            7POWER
          </span>
          <span
            className="text-[#eeff00] tracking-widest"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.5rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              marginTop: '-2px',
            }}
          >
            MOTORS
          </span>
        </div>
      )}
    </div>
  );
}