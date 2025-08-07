import React from 'react';

interface OdoremoverLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const OdoremoverLogo: React.FC<OdoremoverLogoProps> = ({ 
  size = 40, 
  className = "", 
  showText = true,
  textSize = 'lg'
}) => {
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* ODOREMOVER Logo SVG - Extracted from provided image */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          stroke="currentColor" 
          strokeWidth="6" 
          fill="none"
          className="text-white"
        />
        
        {/* Audio waveform bars at top */}
        <g className="text-white">
          <rect x="38" y="15" width="3" height="12" fill="currentColor" rx="1.5"/>
          <rect x="43" y="10" width="3" height="22" fill="currentColor" rx="1.5"/>
          <rect x="48" y="8" width="3" height="26" fill="currentColor" rx="1.5"/>
          <rect x="53" y="10" width="3" height="22" fill="currentColor" rx="1.5"/>
          <rect x="58" y="15" width="3" height="12" fill="currentColor" rx="1.5"/>
        </g>
        
        {/* Main circular body - bottom portion */}
        <path 
          d="M 15 50 A 35 35 0 0 1 85 50 L 85 65 A 35 35 0 0 1 15 65 Z" 
          fill="currentColor"
          className="text-white"
        />
        
        {/* Central microphone/audio element */}
        <g className="text-black">
          {/* Left segment */}
          <rect x="20" y="45" width="15" height="25" fill="currentColor" rx="2"/>
          {/* Center segment with rounded top */}
          <path 
            d="M 40 45 L 55 45 L 55 65 A 7.5 7.5 0 0 1 40 65 Z" 
            fill="currentColor"
          />
          {/* Right segment */}
          <rect x="60" y="45" width="15" height="25" fill="currentColor" rx="2"/>
        </g>
        
        {/* Inner microphone detail */}
        <ellipse 
          cx="47.5" 
          cy="57" 
          rx="6" 
          ry="8" 
          fill="white"
          className="text-white"
        />
      </svg>
      
      {/* ODOREMOVER Text */}
      {showText && (
        <span className={`font-bold text-white tracking-wider ${textSizeClasses[textSize]}`}>
          ODOREMOVER
        </span>
      )}
    </div>
  );
};

export default OdoremoverLogo;