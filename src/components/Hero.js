'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Globe } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Floating particle dots (pure CSS, no libraries)
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.15 + 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.id % 5 === 0 ? '#818CF8' : p.id % 3 === 0 ? '#2DD4BF' : '#a1a1aa',
            opacity: p.opacity,
            animation: `float-particle-${p.id % 4} ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Geometric wireframe shapes floating in background
function FloatingGeometry() {
  const shapes = [
    { type: 'octagon', size: 60, left: '8%', top: '15%', duration: 20, delay: 0, opacity: 0.04 },
    { type: 'diamond', size: 40, left: '85%', top: '25%', duration: 25, delay: 3, opacity: 0.05 },
    { type: 'hexagon', size: 50, left: '75%', top: '70%', duration: 22, delay: 1, opacity: 0.03 },
    { type: 'circle', size: 35, left: '15%', top: '75%', duration: 18, delay: 2, opacity: 0.04 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {shapes.map((s, i) => (
        <div
          key={i}
          className="absolute border border-zinc-700/30 rounded-lg"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            transform: `rotate(${i * 45}deg)`,
            animation: `geo-float ${s.duration}s ${s.delay}s ease-in-out infinite, geo-spin ${s.duration * 2}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sceneRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;  // -1 to 1
    setMousePos({ x, y });
  }, []);

  // Base rotation + mouse parallax (constrained ±10°)
  const rotateY = 15 + mousePos.x * 8;   // 15° base + ±8° mouse
  const rotateX = -8 + mousePos.y * -6;   // -8° base + ±6° mouse

  // Layer parallax offsets (faster for front layers)
  const layer1X = mousePos.x * 3;
  const layer1Y = mousePos.y * 3;
  const layer2X = mousePos.x * 8;
  const layer2Y = mousePos.y * 6;
  const layer3X = mousePos.x * 14;
  const layer3Y = mousePos.y * 10;

  return (
    <section className="relative overflow-hidden pt-16 pb-24 border-b border-zinc-800/60 bg-transparent">

      <div className="relative mx-auto max-w-7xl px-6 z-10">

        {/* Asymmetrical 12-Column Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

          {/* Left Column (7 Cols): Announcement, Headline, CTAs, SLA Metrics */}
          <div className="lg:col-span-7 space-y-6">

            {/* Announcement Micro Pill Badge */}
            <ScrollReveal direction="down" delay={100}>
              <a
                href="/#features"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-all duration-150 cursor-pointer shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>v1.0 Production Release</span>
                <span className="text-zinc-500 font-normal">→</span>
              </a>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal direction="up" delay={200}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-left leading-[1.1] text-white">
                <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent block">
                  Capture High-Value Leads
                </span>
                <span className="block mt-1">
                  With{' '}
                  <span className="bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">
                    Zero Friction.
                  </span>
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtitle Copy */}
            <ScrollReveal direction="up" delay={300}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed mt-4 mb-8">
                Elevate your agency pipeline. LeadDesk Mini validates inquiries in real-time, isolates data with enterprise-grade encryption, and delivers live analytics to your admin dashboard.
              </p>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal direction="up" delay={400}>
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="/#capture-lead"
                  className="bg-white text-zinc-950 font-semibold hover:bg-zinc-200 px-5 py-2.5 rounded-lg text-sm shadow-md shadow-[0_1px_10px_rgba(255,255,255,0.2)] transition-all duration-150 ease-out active:scale-[0.98] flex items-center gap-2"
                >
                  <span>Submit Lead Inquiry</span>
                  <ArrowRight className="w-4 h-4 text-zinc-950" />
                </a>

                <Link
                  href="/admin"
                  className="bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white hover:bg-zinc-800/80 px-5 py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-zinc-400" />
                  <span>Live Admin Portal</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* SLA Trust Micro-Metrics Bar */}
            <ScrollReveal direction="up" delay={500}>
              <div className="mt-10 pt-6 border-t border-zinc-800/60 flex items-center gap-8 text-xs text-zinc-400">
                <div>
                  <span className="text-zinc-100 font-semibold text-sm block">99.9%</span>
                  <span className="text-zinc-500 font-normal text-xs block">Uptime SLA</span>
                </div>
                <div className="h-8 w-px bg-zinc-800/80" />
                <div>
                  <span className="text-zinc-100 font-semibold text-sm block">&lt; 100ms</span>
                  <span className="text-zinc-500 font-normal text-xs block">API Latency</span>
                </div>
                <div className="h-8 w-px bg-zinc-800/80" />
                <div>
                  <span className="text-zinc-100 font-semibold text-sm block">100%</span>
                  <span className="text-zinc-500 font-normal text-xs block">Data Isolation</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column (5 Cols): 3D Spatial CRM Preview */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={300}>

              {/* 3D Perspective Scene Container */}
              <div
                ref={sceneRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
                className="relative"
                style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
                role="img"
                aria-label="Interactive 3D preview of LeadDesk Mini admin dashboard showing real-time lead pipeline analytics"
              >
                {/* Shadow Plane (Layer 0) - Simulated ground shadow */}
                <div
                  className="absolute inset-x-4 bottom-0 h-16 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(99, 102, 241, 0.08), transparent)',
                    filter: 'blur(20px)',
                    transform: `translateY(30px) translateX(${layer1X * 0.3}px)`,
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                />

                {/* Primary Dashboard Panel (Layer 1) - Main 3D Tilted Card */}
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateX(${layer1X}px) translateY(${layer1Y}px)`,
                    transition: isHovered ? 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    animation: 'spatial-breathe 6s ease-in-out infinite',
                    willChange: 'transform',
                  }}
                >
                  {/* Glass Refraction Border Glow */}
                  <div
                    className="absolute -inset-px rounded-xl pointer-events-none z-10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.3) 0%, rgba(99, 102, 241, 0.05) 30%, rgba(45, 212, 191, 0.1) 70%, rgba(129, 140, 248, 0.2) 100%)',
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  {/* Light Sweep Effect on Hover */}
                  <div
                    className="absolute inset-0 z-20 pointer-events-none rounded-xl overflow-hidden"
                    style={{
                      background: isHovered
                        ? 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 70%)'
                        : 'none',
                      animation: isHovered ? 'light-sweep 1.5s ease-in-out' : 'none',
                    }}
                  />

                  {/* Main Card Surface */}
                  <div
                    className="relative rounded-xl border border-zinc-700/40 overflow-hidden"
                    style={{
                      background: 'linear-gradient(160deg, rgba(24, 24, 27, 0.95) 0%, rgba(9, 9, 11, 0.98) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: `
                        0 25px 60px rgba(0, 0, 0, 0.6),
                        0 10px 25px rgba(0, 0, 0, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.04),
                        0 0 40px rgba(99, 102, 241, 0.04)
                      `,
                    }}
                  >
                    {/* Window Titlebar Header */}
                    <div className="h-10 px-4 bg-zinc-950/90 border-b border-zinc-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] border border-[#E0443E]/50 shadow-[0_0_4px_rgba(255,95,87,0.3)]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] border border-[#DEA123]/50 shadow-[0_0_4px_rgba(254,188,46,0.3)]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] border border-[#1AAB29]/50 shadow-[0_0_4px_rgba(40,200,64,0.3)]" />
                      </div>

                      <Link
                        href="/admin"
                        className="px-3 py-0.5 rounded-md bg-zinc-900/80 border border-zinc-800/60 text-[11px] text-zinc-500 hover:text-zinc-300 font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <Globe className="w-3 h-3 text-zinc-500" />
                        <span>https://leaddesk.agency/admin</span>
                      </Link>

                      <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Pipeline</span>
                      </div>
                    </div>

                    {/* Card Body & Preview Analytics Grid */}
                    <div className="p-4 space-y-4 bg-zinc-950/40">

                      {/* 3 Metric Cards (Layer 2) - Extruded Forward */}
                      <div
                        className="grid grid-cols-3 gap-2.5"
                        style={{
                          transform: `translateZ(30px) translateX(${layer2X}px) translateY(${layer2Y}px)`,
                          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        }}
                      >
                        <div className="p-3 rounded-lg border border-zinc-800/60 relative overflow-hidden group/card" style={{ background: 'linear-gradient(145deg, rgba(24,24,27,0.9), rgba(15,15,18,0.95))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 12px rgba(0,0,0,0.3)' }}>
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Total Leads</span>
                          <span className="text-lg font-semibold text-zinc-100 tracking-tight mt-0.5 block tabular-nums">48</span>
                          <span className="text-[10px] text-teal-400 font-medium block mt-0.5">↑ +14% week</span>
                        </div>

                        <div className="p-3 rounded-lg border border-zinc-800/60 relative overflow-hidden group/card" style={{ background: 'linear-gradient(145deg, rgba(24,24,27,0.9), rgba(15,15,18,0.95))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 12px rgba(0,0,0,0.3)' }}>
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Active New</span>
                          <span className="text-lg font-semibold text-zinc-100 tracking-tight mt-0.5 block tabular-nums">12</span>
                          <span className="text-[10px] text-zinc-400 font-medium block mt-0.5">Action Needed</span>
                        </div>

                        <div className="p-3 rounded-lg border border-zinc-800/60 relative overflow-hidden group/card" style={{ background: 'linear-gradient(145deg, rgba(24,24,27,0.9), rgba(15,15,18,0.95))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 12px rgba(0,0,0,0.3)' }}>
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Pipeline Value</span>
                          <span className="text-lg font-semibold text-zinc-100 tracking-tight mt-0.5 block tabular-nums">$185k</span>
                          <span className="text-[10px] text-emerald-400 font-medium block mt-0.5">Converted Value</span>
                        </div>
                      </div>

                      {/* Live Recent Inquiries Feed List */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 px-1 uppercase tracking-wider">
                          <span>Recent Incoming Inquiries</span>
                          <span className="text-zinc-400 font-mono">Export CSV</span>
                        </div>

                        {/* Feed Item 1 */}
                        <div className="flex items-center justify-between p-2.5 rounded-md border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-800/40 transition-all duration-200 hover:border-zinc-700/60">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-300 font-medium text-xs border border-zinc-700/30">
                              SJ
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-white block">Sarah Jenkins</span>
                              <span className="text-[11px] text-zinc-400 block font-mono">sarah@company.com</span>
                            </div>
                          </div>
                          {/* Status Badge (Layer 3) - Floats independently */}
                          <div
                            className="text-right"
                            style={{
                              transform: `translateZ(50px) translateX(${layer3X}px) translateY(${layer3Y}px)`,
                              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            }}
                          >
                            <span className="inline-flex items-center rounded-md bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 text-[10px] font-medium text-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.1)]">
                              New Inquiry
                            </span>
                            <span className="text-[10px] text-zinc-500 block mt-0.5 font-mono">$5,000 - $10,000</span>
                          </div>
                        </div>

                        {/* Feed Item 2 */}
                        <div className="flex items-center justify-between p-2.5 rounded-md border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-800/40 transition-all duration-200 hover:border-zinc-700/60">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-300 font-medium text-xs border border-zinc-700/30">
                              MV
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-white block">Marcus Vance</span>
                              <span className="text-[11px] text-zinc-400 block font-mono">marcus@techcorp.io</span>
                            </div>
                          </div>
                          <div
                            className="text-right"
                            style={{
                              transform: `translateZ(50px) translateX(${layer3X}px) translateY(${layer3Y}px)`,
                              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            }}
                          >
                            <span className="inline-flex items-center rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.1)]">
                              Contacted
                            </span>
                            <span className="text-[10px] text-zinc-500 block mt-0.5 font-mono">$10,000+</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
