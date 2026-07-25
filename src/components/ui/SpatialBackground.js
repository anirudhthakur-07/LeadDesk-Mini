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

    // Constellation node parameters
    const nodes = [];
    const NODE_COUNT = 85;
    const CONNECTION_DIST = 160;

    function init() {
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 0.8,
          opacity: Math.random() * 0.4 + 0.2,
        });
      }
    }

    function drawConstellationNodes() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Update positions (continuous smooth drift)
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap seamlessly around screen boundaries
        if (node.x < -20) node.x = w + 20;
        if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20;
        if (node.y > h + 20) node.y = -20;
      }

      // Draw connection lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const lineOpacity = (1 - dist / CONNECTION_DIST) * 0.22;
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineOpacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw star node points (crisp, zero flickering)
      for (const node of nodes) {
        ctx.fillStyle = `rgba(165, 180, 252, ${node.opacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function animate() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Clear frame completely
      ctx.clearRect(0, 0, w, h);

      // Render only the infinite moving constellation diagram
      drawConstellationNodes();

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
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawConstellationNodes();
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
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}
