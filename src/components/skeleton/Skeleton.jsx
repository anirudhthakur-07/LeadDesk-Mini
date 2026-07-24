'use client';

export default function Skeleton({ className = '', style = {} }) {
  return (
    <div
      aria-hidden="true"
      style={style}
      className={`animate-pulse rounded-xl bg-slate-800/60 backdrop-blur-md ${className}`}
    />
  );
}
