
import React from 'react';

interface LogoProps {
  className?: string;
  accentColor?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-auto h-10", accentColor = "#0070f3" }) => {
  return (
    <svg viewBox="0 0 380 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="triangle-cutout">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <path d="M 20 55 L 40 55 L 50 40 M 40 55 L 40 75 L 65 75" stroke="black" strokeWidth="10" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="20" cy="55" r="9" fill="black" />
          <circle cx="50" cy="40" r="9" fill="black" />
          <circle cx="65" cy="75" r="9" fill="black" />
        </mask>
      </defs>

      <g>
        {/* Blue Triangle */}
        <path d="M 50 20 L 15 80 L 85 80 Z" fill={accentColor} stroke={accentColor} strokeWidth="10" strokeLinejoin="round" mask="url(#triangle-cutout)" />
        
        {/* The path */}
        <path d="M 20 55 L 40 55 L 50 40 M 40 55 L 40 75 L 65 75" stroke="currentColor" strokeWidth="5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="20" cy="55" r="5" fill="currentColor" />
        <circle cx="50" cy="40" r="5" fill="currentColor" />
        <circle cx="65" cy="75" r="5" fill="currentColor" />
        
        {/* Inner dots */}
        <circle cx="20" cy="55" r="2" fill="#0B0F19" />
        <circle cx="50" cy="40" r="2" fill="#0B0F19" />
        <circle cx="65" cy="75" r="2" fill="#0B0F19" />
      </g>
      
      {/* Text */}
      <text x="110" y="55" fontFamily="sans-serif" fontWeight="900" fontSize="42" fill="currentColor" letterSpacing="-1">TRISMART</text>
      <text x="114" y="80" fontFamily="sans-serif" fontWeight="700" fontSize="18" fill={accentColor} letterSpacing="1.5">AUTOMATIONS</text>
    </svg>
  );
};
