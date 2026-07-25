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
    const NODE_COUNT = 60;
    const CONNECTION_DIST = 150;

    // Flowing gradient orbs
    const orbs = [
      { x: 0.3, y: 0.2, r: 300, color: [99, 102, 241], speed: 0.0003, phase: 0 },      // Indigo
      { x: 0.7, y: 0.6, r: 250, color: [45, 212, 191], speed: 0.0004, phase: 2 },       // Teal
      { x: 0.5, y: 0.8, r: 200, color: [129, 140, 248], speed: 0.00035, phase: 4 },     // Light indigo
      { x: 0.8, y: 0.15, r: 180, color: [52, 211, 153], speed: 0.00025, phase: 1 },     // Emerald
    ];

    function init() {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Initialize constellation nodes
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function drawGradientOrbs(t) {
      for (const orb of orbs) {
        const cx = (orb.x + Math.sin(t * orb.speed * 1000 + orb.phase) * 0.12) * canvas.offsetWidth;
        const cy = (orb.y + Math.cos(t * orb.speed * 800 + orb.phase) * 0.08) * canvas.offsetHeight;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        gradient.addColorStop(0, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.06)`);
        gradient.addColorStop(0.5, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.025)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      }
    }

    function drawGrid(t) {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const spacing = 60;

      ctx.strokeStyle = 'rgba(39, 39, 42, 0.3)';
      ctx.lineWidth = 0.5;

      // Horizontal lines with wave distortion
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 2) {
          const wave = Math.sin(x * 0.005 + t * 0.0008) * 3 + Math.sin(x * 0.01 + t * 0.001) * 1.5;
          const pulseOpacity = 0.15 + Math.sin(y * 0.02 + t * 0.0005) * 0.08;
          ctx.strokeStyle = `rgba(63, 63, 70, ${pulseOpacity})`;
          if (x === 0) {
            ctx.moveTo(x, y + wave);
          } else {
            ctx.lineTo(x, y + wave);
          }
        }
        ctx.stroke();
      }

      // Vertical lines with subtle pulse
      for (let x = 0; x < w; x += spacing) {
        const pulseOpacity = 0.1 + Math.sin(x * 0.015 + t * 0.0006) * 0.06;
        ctx.strokeStyle = `rgba(63, 63, 70, ${pulseOpacity})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
    }

    function drawConstellationNodes(t) {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Update node positions (slow drift)
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
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            const pulse = Math.sin(t * 0.001 + i * 0.5) * 0.03;

            // Gradient line: indigo-tinted connections
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity + pulse})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw node dots
      for (const node of nodes) {
        const pulse = Math.sin(t * 0.002 + node.x * 0.01) * 0.15;
        const dotOpacity = node.opacity + pulse;

        // Outer glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 6);
        glow.addColorStop(0, `rgba(129, 140, 248, ${dotOpacity * 0.3})`);
        glow.addColorStop(1, 'rgba(129, 140, 248, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(node.x - node.radius * 6, node.y - node.radius * 6, node.radius * 12, node.radius * 12);

        // Core dot
        ctx.fillStyle = `rgba(161, 161, 170, ${dotOpacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawScanLine(t) {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Slow-moving horizontal scan line
      const scanY = ((t * 0.02) % (h + 100)) - 50;
      const scanGradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGradient.addColorStop(0, 'rgba(99, 102, 241, 0)');
      scanGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)');
      scanGradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 30, w, 60);
    }

    function drawAuroraWaves(t) {
      const w = canvas.offsetWidth;

      // Top aurora band
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= w; x += 3) {
        const y = 80 + Math.sin(x * 0.003 + t * 0.0005) * 40 + Math.sin(x * 0.007 + t * 0.0008) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, 0);
      ctx.closePath();

      const auroraGrad = ctx.createLinearGradient(0, 0, w, 0);
      auroraGrad.addColorStop(0, 'rgba(99, 102, 241, 0.02)');
      auroraGrad.addColorStop(0.3, 'rgba(129, 140, 248, 0.04)');
      auroraGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.03)');
      auroraGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.04)');
      auroraGrad.addColorStop(1, 'rgba(52, 211, 153, 0.02)');
      ctx.fillStyle = auroraGrad;
      ctx.fill();
    }

    function animate() {
      time++;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Layer 1: Aurora waves at the top
      drawAuroraWaves(time);

      // Layer 2: Flowing gradient orbs
      drawGradientOrbs(time);

      // Layer 3: Animated grid with wave distortion
      drawGrid(time);

      // Layer 4: Constellation nodes & connections
      drawConstellationNodes(time);

      // Layer 5: Scan line sweep
      drawScanLine(time);

      // Vignette overlay (darker edges)
      const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8);
      vignette.addColorStop(0, 'rgba(5, 5, 7, 0)');
      vignette.addColorStop(1, 'rgba(5, 5, 7, 0.4)');
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

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      cancelAnimationFrame(animationId);
      // Draw one static frame
      time = 500;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}
