'use client';

import Link from 'next/link';

export default function Logo({ size = 'md', href = '/', showText = true }) {
  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  };

  const logoGraphic = (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Brand Icon Graphic: Interlocking Geometric "LD" Shield & Core */}
      <div className={`relative flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-700/80 shadow-md transition-all duration-300 group-hover:border-indigo-500/80 group-hover:bg-zinc-800 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Shield Geometry */}
          <path
            d="M16 3L27 8.5V17.5C27 23.3 22.3 28.1 16 30C9.7 28.1 5 23.3 5 17.5V8.5L16 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-400 group-hover:text-indigo-400 transition-colors"
          />
          {/* Inner Abstract "L" & "D" Core Lines */}
          <path
            d="M11 11V21H16C18.8 21 21 18.8 21 16C21 13.2 18.8 11 16 11H11Z"
            stroke="url(#ld-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Energy Core Lightning */}
          <path
            d="M16 11L14 16H18L16 21"
            stroke="#2DD4BF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="ld-grad" x1="11" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8" />
              <stop offset="1" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
            LeadDesk{' '}
            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700/80 text-indigo-300 uppercase tracking-widest">
              PRO
            </span>
          </span>
          <span className="text-[10px] text-zinc-500 font-medium tracking-wide mt-1">
            Digital Agency Engine
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{logoGraphic}</Link>;
  }

  return logoGraphic;
}
