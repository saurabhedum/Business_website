import React, { useEffect, useRef } from 'react';

export const HeroMotionBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Create colorful orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.3, vx: 0.5, vy: 0.3, radius: width * 0.4, color: 'rgba(245, 158, 11, 0.15)' }, // Amber
      { x: width * 0.8, y: height * 0.2, vx: -0.4, vy: 0.6, radius: width * 0.35, color: 'rgba(217, 70, 239, 0.15)' }, // Fuchsia
      { x: width * 0.5, y: height * 0.8, vx: 0.6, vy: -0.4, radius: width * 0.45, color: 'rgba(124, 58, 237, 0.15)' }, // Violet
      { x: width * 0.1, y: height * 0.9, vx: -0.3, vy: -0.5, radius: width * 0.3, color: 'rgba(6, 182, 212, 0.15)' }, // Cyan
    ];

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw orbs
      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x - orb.radius > width) orb.vx *= -1;
        if (orb.x + orb.radius < 0) orb.vx *= -1;
        if (orb.y - orb.radius > height) orb.vy *= -1;
        if (orb.y + orb.radius < 0) orb.vy *= -1;

        // Draw orb with radial gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-dark">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(60px)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-dark/50 to-dark/80"></div>
    </div>
  );
};
