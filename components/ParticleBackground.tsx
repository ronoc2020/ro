'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  particleCount?: number;
  particleSizeRange?: [number, number];
  particleSpeedRange?: [number, number];
  colorTheme?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 150,
  particleSizeRange = [1, 6],
  particleSpeedRange = [-1.5, 1.5],
  colorTheme = 'hsl(0, 50%, 50%)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      colorHue: number; // Added hue property
    }> = [];

    const createParticles = () => {
      particles.length = 0; // Clear existing particles
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * (particleSizeRange[1] - particleSizeRange[0]) + particleSizeRange[0];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          speedX: Math.random() * (particleSpeedRange[1] - particleSpeedRange[0]) + particleSpeedRange[0],
          speedY: Math.random() * (particleSpeedRange[1] - particleSpeedRange[0]) + particleSpeedRange[0],
          color: `hsl(${Math.random() * 360}, 50%, 50%)`,
          colorHue: Math.random() * 360,
        });
      }
    };

    const animateParticles = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Set background color
      particles.forEach((particle) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around the canvas
        if (particle.x > canvas.width) particle.x = 0;
        else if (particle.x < 0) particle.x = canvas.width;

        if (particle.y > canvas.height) particle.y = 0;
        else if (particle.y < 0) particle.y = canvas.height;

        // Calculate mouse distance
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Particle attraction
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= dx * force * 0.03;
          particle.y -= dy * force * 0.03;
        }
      });

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connecting lines
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    handleResize();
    animateParticles();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      particles.length = 0; // Clear particles on unmount
    };
  }, [particleCount, particleSizeRange, particleSpeedRange]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default ParticleBackground;
