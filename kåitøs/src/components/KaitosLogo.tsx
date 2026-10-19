import React from 'react';

interface KaitosLogoProps {
  className?: string;
  size?: number; // size in px for icon
  variant?: 'full' | 'icon' | 'badge';
  showDomain?: boolean;
  withWhiteBg?: boolean;
}

/**
 * Standard stylized wordmark for kÅiTøS with user specifications:
 * - 'k': Red
 * - 'Å': Lime green
 * - 'i': Half green color, half black (180deg split)
 * - 'T': Jet black color
 * - 'ø': Cyan
 * - 'S': Blue
 */
export const KaitosWordmark: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl sm:text-4xl',
  }[size];

  return (
    <span
      className={`inline-flex items-baseline font-black tracking-tight leading-none ${sizeClasses} ${className}`}
    >
      <span className="text-red-500 font-extrabold">k</span>
      <span className="text-lime-500 font-extrabold">Å</span>
      <span
        className="font-extrabold inline-block"
        style={{
          background: 'linear-gradient(90deg, #10B981 0%, #10B981 50%, #000000 50%, #000000 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        i
      </span>
      <span className="text-black font-extrabold">T</span>
      <span className="text-cyan-500 font-extrabold">ø</span>
      <span
        className="font-extrabold inline-block"
        style={{
          background: 'linear-gradient(90deg, #06B6D4 0%, #06B6D4 50%, #EF4444 50%, #EF4444 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        S
      </span>
    </span>
  );
};

export const KaitosLogo: React.FC<KaitosLogoProps> = ({
  className = '',
  size = 40,
  variant = 'full',
  showDomain = true,
  withWhiteBg = false,
}) => {
  // Ultra-stylish, high-precision SVG rendition of the kÅiTøS emblem:
  // 1. Globe with latitude/longitude glowing grid at top
  // 2. Beveled Crimson & Vermilion architectural portal beam
  // 3. Diagonal rafter legs with vibrant Lime Green inner neon contour
  // 4. Smooth dynamic Royal Cobalt Blue telemetry sine wave
  // 5. Rising Emerald Green acceleration/growth arrow on right
  // 6. Center brand monogram with 'i' as half-green half-black, and 'T' as black
  const emblem = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="kaitos-glow-blue" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="kaitos-glow-green" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="kaitos-glow-red" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Linear Gradients */}
        {/* Top Horizontal Beam Gradient */}
        <linearGradient id="redBeamGrad" x1="20" y1="36" x2="135" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="60%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>

        {/* Left Diagonal Pillar Gradient */}
        <linearGradient id="leftLegGrad" x1="30" y1="110" x2="80" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>

        {/* Right Diagonal Pillar Gradient */}
        <linearGradient id="rightLegGrad" x1="125" y1="110" x2="80" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>

        {/* Neon Lime Inner Border Gradient */}
        <linearGradient id="limeAccentGrad" x1="30" y1="115" x2="125" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="50%" stopColor="#A3E635" />
          <stop offset="100%" stopColor="#84CC16" />
        </linearGradient>

        {/* Globe Radial Gradient */}
        <radialGradient id="globeGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="45%" stopColor="#06B6D4" />
          <stop offset="85%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>

        {/* Cobalt Wave Gradient */}
        <linearGradient id="waveGrad" x1="32" y1="120" x2="124" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        {/* Growth Arrow Gradient */}
        <linearGradient id="arrowGrad" x1="122" y1="116" x2="148" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="60%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>

        {/* Horizontal Split (Left 50% Green, Right 50% Black) Gradient for letter 'i' in SVG */}
        <linearGradient id="iHalfGreenBlack" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#000000" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>

        {/* Horizontal Split (Left 50% Cyan 'ø' color, Right 50% Red 'k' color) Gradient for letter 'S' in SVG */}
        <linearGradient id="sHalfCyanRed" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      {/* 1. TOP GLOBE (Sphere with continents & orbital glow) */}
      <g id="globe-element" className="transition-transform duration-500 hover:scale-110 origin-[80px_22px]">
        {/* Subtle Globe Atmosphere Aura */}
        <circle cx="80" cy="22" r="17" fill="#06B6D4" opacity="0.15" />
        
        {/* Globe Base Sphere */}
        <circle cx="80" cy="22" r="14" fill="url(#globeGrad)" stroke="#38BDF8" strokeWidth="1" />

        {/* Globe Landmasses / Continents (Lime Green) */}
        <path
          d="M74 15C76 13 81 14 83 17C84 19 82 22 80 23C77 24 74 21 73 18C72 16 73 15 74 15Z"
          fill="#4ADE80"
          opacity="0.9"
        />
        <path
          d="M83 20C85 19 89 21 89 24C88 27 85 28 82 27C80 26 81 22 83 20Z"
          fill="#86EFAC"
          opacity="0.9"
        />
        <path
          d="M75 26C78 27 80 30 78 33C76 34 74 32 74 29C74 27 74 26 75 26Z"
          fill="#22C55E"
          opacity="0.85"
        />

        {/* Subtle Lat/Long Grid Curves */}
        <ellipse cx="80" cy="22" rx="13.5" ry="5.5" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.4" />
        <line x1="80" y1="8" x2="80" y2="36" stroke="#FFFFFF" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.3" />
      </g>

      {/* 2. THE STRUCTURAL TRUSS / ARCHITECTURAL PORTAL */}
      <g id="architectural-truss">
        {/* Bottom Shadow Lintel */}
        <polygon
          points="32,45 130,45 128,49 35,49"
          fill="#0B0F19"
          opacity="0.85"
        />
        {/* Main Crimson Beam */}
        <polygon
          points="24,42 128,42 128,34 32,34"
          fill="url(#redBeamGrad)"
          stroke="#EF4444"
          strokeWidth="0.75"
          filter="url(#kaitos-glow-red)"
        />
        {/* Highlight sheen on top beam */}
        <line x1="33" y1="35.5" x2="127" y2="35.5" stroke="#FCA5A5" strokeWidth="0.75" opacity="0.8" />

        {/* Left Diagonal Leg (Red outer, lime inner) */}
        <polygon
          points="73,42 80,42 36,116 28,116"
          fill="url(#leftLegGrad)"
        />
        {/* Left Leg Inner Lime Neon Border */}
        <polygon
          points="78,42 80,42 38,116 35,116"
          fill="#84CC16"
          opacity="0.95"
        />

        {/* Right Diagonal Leg (Red outer with precision dark bevel) */}
        <polygon
          points="80,42 87,42 127,116 119,116"
          fill="url(#rightLegGrad)"
        />
        {/* Right Leg Inner Lime Neon Border */}
        <polygon
          points="80,42 82,42 121,116 119,116"
          fill="#84CC16"
          opacity="0.95"
        />
        {/* Right Leg Dark Exterior Rim Accent */}
        <polygon
          points="86,42 88,42 128,116 126,116"
          fill="#090D16"
          opacity="0.9"
        />

        {/* Middle Structural Crossbar in Lime Accent */}
        <rect
          x="53"
          y="79"
          width="54"
          height="3"
          rx="1"
          fill="url(#limeAccentGrad)"
          opacity="0.9"
        />
      </g>

      {/* 3. CENTER BRAND EMBLEM / TEXT SYMBOL (Inside the truss triangle) */}
      {/* With 'i' as half-green half-black, and 'T' as black */}
      <g id="center-monogram">
        <text
          x="80"
          y="81.5"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          letterSpacing="0.5"
        >
          <tspan fill="#EF4444">k</tspan>
          <tspan fill="#84CC16">Å</tspan>
          <tspan fill="url(#iHalfGreenBlack)">i</tspan>
          <tspan fill="#000000">T</tspan>
          <tspan fill="#06B6D4">ø</tspan>
          <tspan fill="url(#sHalfCyanRed)">S</tspan>
        </text>
      </g>

      {/* 4. THE WAVEFORM (Smooth Dynamic Sine Wave in Radiant Cobalt Blue) */}
      <g id="telemetry-wave">
        {/* Glow halo behind wave */}
        <path
          d="M 33 116 C 40 142, 60 142, 78 116 C 96 90, 114 96, 123 116"
          fill="none"
          stroke="#2563EB"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.25"
          filter="url(#kaitos-glow-blue)"
        />
        {/* Core Electric Cobalt Wave */}
        <path
          d="M 33 116 C 40 142, 60 142, 78 116 C 96 90, 114 96, 123 116"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* High-speed wave highlight */}
        <path
          d="M 33 116 C 40 142, 60 142, 78 116 C 96 90, 114 96, 123 116"
          fill="none"
          stroke="#93C5FD"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.75"
        />
      </g>

      {/* 5. THE UPWARD GROWTH ARROW (Vibrant Emerald Green) */}
      <g id="growth-arrow" filter="url(#kaitos-glow-green)">
        {/* Arrow Shaft */}
        <line
          x1="123"
          y1="116"
          x2="145"
          y2="76"
          stroke="url(#arrowGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Arrow Head (Upward Triangle) */}
        <polygon
          points="137,70 154,74 147,90"
          fill="#10B981"
          stroke="#34D399"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div
        className={`inline-flex items-center justify-center ${
          withWhiteBg ? 'bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm' : ''
        } ${className}`}
      >
        {emblem}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-3 px-3 py-2 rounded-2xl bg-white border border-slate-200 shadow-md backdrop-blur-sm ${className}`}
      >
        {emblem}
        <div className="flex flex-col text-left">
          <KaitosWordmark size="md" />
          {showDomain && (
            <span className="text-[10px] font-mono text-slate-800 font-semibold -mt-0.5 tracking-wider">
              kaitos.in
            </span>
          )}
        </div>
      </div>
    );
  }

  // variant === 'full' (default):
  // User Requirement: "also give background color for logo and company name area as white"
  // "i use half green color half black use T as black color"
  return (
    <div
      className={`inline-flex items-center gap-3 select-none group bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all ${className}`}
    >
      {emblem}
      <div className="flex flex-col text-left">
        <KaitosWordmark size="lg" />
        {showDomain && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] font-mono text-slate-800 font-semibold tracking-wide">
              kaitos.in
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};
