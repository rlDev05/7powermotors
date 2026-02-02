import React from 'react';

interface LogoProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Minimalist "7" Icon with Power Symbol */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Power symbol outline */}
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#c0c0c0]"
            opacity="0.5"
          />
          {/* Stylized "7" integrated with power icon */}
          <path
            d="M14 12 H26 L18 28 L18 20 L22 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
          />
        </svg>
      </div>
      
      {variant === 'default' && (
        <div className="flex flex-col leading-none">
          <span
            className="tracking-wider"
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
            className="text-[#a3a3a3] tracking-widest"
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
