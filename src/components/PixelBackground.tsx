'use client';

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const lines: { x: number; y: number; speed: number }[] = [];
    const lineCount = 50;

    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 2
      });
    }

    let animationFrameId: number;

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = theme === 'dark' ? '#030711' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const lineColor = theme === 'dark' ? '#ffffff08' : '#f0f0f0';
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + 50, line.y);
        ctx.stroke();

        line.x -= line.speed;
        if (line.x < -50) {
          line.x = canvas.width;
          line.y = Math.random() * canvas.height;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
} 