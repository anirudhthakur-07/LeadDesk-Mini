'use client';

import { useEffect, useRef } from 'react';

export default function SpatialBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let width, height;
    let time = 0;

    // Grid nodes for constellation effect
    const nodes = [];
    const NODE_COUNT = 70;
    const CONNECTION_DIST = 160;

    // Flowing gradient orbs
    const orbs = [
      { x: 0.25, y: 0.2, r: 350, color: [99, 102, 241], speed: 0.0002, phase: 0 },      // Indigo
      { x: 0.75, y: 0.5, r: 300, color: [45, 212, 191], speed: 0.00025, phase: 2 },     // Teal
      { x: 0.45, y: 0.8, r: 280, color: [129, 140, 248], speed: 0.00022, phase: 4 },    // Light indigo
      { x: 0.85, y: 0.15, r: 220, color: [52, 211, 153], speed: 0.00018, phase: 1 },    // Emerald
    ];

    function init() {
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Initialize constellation nodes
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.6 + 0.6,
          baseOpacity: Math.random() * 0.35 + 0.15,
        });
      }
    }

    function drawGradientOrbs(t) {
      const w = window.innerWidth;
      const h = window.innerHeight;

      for (const orb of orbs) {
        const cx = (orb.x + Math.sin(t * orb.speed * 1000 + orb.phase) * 0.1) * w;
        const cy = (orb.y + Math.cos(t * orb.speed * 800 + orb.phase) * 0.07) * h;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        gradient.addColorStop(0, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.055)`);
        gradient.addColorStop(0.5, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.02)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }
    }

    function drawGrid(t) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const spacing = 64;

      ctx.lineWidth = 0.5;

      // Horizontal lines with continuous wave motion
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 4) {
          const wave = Math.sin(x * 0.004 + t * 0.0006) * 2.5 + Math.sin(x * 0.008 + t * 0.0008) * 1.2;
          const lineOpacity = 0.12 + Math.sin(y * 0.015 + t * 0.0004) * 0.05;
          ctx.strokeStyle = `rgba(63, 63, 70, ${lineOpacity})`;
          if (x === 0) {
            ctx.moveTo(x, y + wave);
          } else {
            ctx.lineTo(x, y + wave);
          }
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let x = 0; x < w; x += spacing) {
        const lineOpacity = 0.08 + Math.sin(x * 0.01 + t * 0.0005) * 0.04;
        ctx.strokeStyle = `rgba(63, 63, 70, ${lineOpacity})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
    }

    function drawConstellationNodes(t) {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Update node positions (smooth drift)
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges
        if (node.x < -10) node.x = w + 10;
        if (node.x > w + 10) node.x = -10;
        if (node.y < -10) node.y = h + 10;
        if (node.y > h + 10) node.y = -10;
      }

      // Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.14;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw node dots & soft glow
      for (const node of nodes) {
        const dotOpacity = node.baseOpacity;

        // Outer soft ambient glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 5);
        glow.addColorStop(0, `rgba(129, 140, 248, ${dotOpacity * 0.25})`);
        glow.addColorStop(1, 'rgba(129, 140, 248, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(node.x - node.radius * 5, node.y - node.radius * 5, node.radius * 10, node.radius * 10);

        // Core star dot
        ctx.fillStyle = `rgba(197, 203, 255, ${dotOpacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawAuroraWaves(t) {
      const w = window.innerWidth;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= w; x += 4) {
        const y = 70 + Math.sin(x * 0.002 + t * 0.0004) * 35 + Math.sin(x * 0.005 + t * 0.0006) * 18;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, 0);
      ctx.closePath();

      const auroraGrad = ctx.createLinearGradient(0, 0, w, 0);
      auroraGrad.addColorStop(0, 'rgba(99, 102, 241, 0.025)');
      auroraGrad.addColorStop(0.35, 'rgba(129, 140, 248, 0.035)');
      auroraGrad.addColorStop(0.65, 'rgba(45, 212, 191, 0.03)');
      auroraGrad.addColorStop(1, 'rgba(52, 211, 153, 0.02)');
      ctx.fillStyle = auroraGrad;
      ctx.fill();
    }

    function animate() {
      time++;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Layer 1: Aurora waves
      drawAuroraWaves(time);

      // Layer 2: Flowing gradient orbs
      drawGradientOrbs(time);

      // Layer 3: Animated grid with smooth wave distortion
      drawGrid(time);

      // Layer 4: Constellation nodes & connections (stars & moving diagram)
      drawConstellationNodes(time);

      // Vignette overlay
      const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.85);
      vignette.addColorStop(0, 'rgba(5, 5, 7, 0)');
      vignette.addColorStop(1, 'rgba(5, 5, 7, 0.45)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      cancelAnimationFrame(animationId);
      time = 500;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      drawGradientOrbs(time);
      drawGrid(time);
      drawConstellationNodes(time);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
}
