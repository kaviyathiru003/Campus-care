import React from 'react';

interface VelsBuildingLogoProps {
  variant?: 'white' | 'blue' | 'navy';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const VelsBuildingLogo: React.FC<VelsBuildingLogoProps> = ({
  variant = 'white',
  size = 'md',
  showText = true,
  showTagline = true,
  className = '',
  onClick,
}) => {
  const iconDimensions = {
    sm: { width: 28, height: 34 },
    md: { width: 38, height: 46 },
    lg: { width: 50, height: 60 },
    xl: { width: 68, height: 82 },
  }[size];

  const strokeColor =
    variant === 'white'
      ? '#ffffff'
      : variant === 'navy'
      ? '#0f172a'
      : '#2563eb';

  const accentColor =
    variant === 'white'
      ? '#60a5fa'
      : variant === 'navy'
      ? '#3b82f6'
      : '#1d4ed8';

  const fillColor =
    variant === 'white'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(37, 99, 235, 0.08)';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''} ${className}`}
    >
      {/* Precision Line-Art Architectural Icon of the VELS Building */}
      <svg
        width={iconDimensions.width}
        height={iconDimensions.height}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Sky antenna / spire */}
        <line x1="42" y1="4" x2="42" y2="16" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="42" cy="4" r="2" fill={accentColor} />

        {/* Tall Main Tower (Curved Arched Glass Facade) */}
        <path
          d="M 24 114 V 30 C 24 16, 60 16, 60 30 V 114 Z"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinejoin="round"
          fill={fillColor}
        />

        {/* Vertical Glass Mullion Lines */}
        <line x1="33" y1="22" x2="33" y2="114" stroke={accentColor} strokeWidth="1.8" strokeDasharray="6 2.5" />
        <line x1="42" y1="17" x2="42" y2="114" stroke={strokeColor} strokeWidth="2" />
        <line x1="51" y1="22" x2="51" y2="114" stroke={accentColor} strokeWidth="1.8" strokeDasharray="6 2.5" />

        {/* Floor slabs */}
        <line x1="24" y1="40" x2="60" y2="40" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="24" y1="58" x2="60" y2="58" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="24" y1="76" x2="60" y2="76" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="24" y1="94" x2="60" y2="94" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.7" />

        {/* Attached Right Academic Wing */}
        <path
          d="M 60 52 H 84 V 114 H 60"
          stroke={strokeColor}
          strokeWidth="2.8"
          strokeLinejoin="round"
          fill={fillColor}
        />
        <line x1="72" y1="52" x2="72" y2="114" stroke={accentColor} strokeWidth="1.5" />
        <line x1="60" y1="72" x2="84" y2="72" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="60" y1="92" x2="84" y2="92" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.7" />

        {/* Left Entrance Wing / Podium */}
        <path
          d="M 12 80 H 24 V 114 H 12 Z"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill={fillColor}
        />
        <line x1="12" y1="96" x2="24" y2="96" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.7" />

        {/* Base foundation line */}
        <line x1="6" y1="114" x2="94" y2="114" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-widest text-lg leading-none ${
                variant === 'white' ? 'text-white' : 'text-slate-900'
              }`}
            >
              VELS
            </span>
          </div>
          <span
            className={`font-semibold text-xs tracking-wider uppercase mt-0.5 ${
              variant === 'white' ? 'text-blue-300' : 'text-blue-600'
            }`}
          >
            Campus Care
          </span>
          {showTagline && (
            <span
              className={`text-[10px] leading-tight font-medium mt-0.5 tracking-tight ${
                variant === 'white' ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              A Cleaner Campus. A Better Tomorrow.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
