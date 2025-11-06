import { useEffect, useRef } from 'react';

interface CosmicBackgroundProps {
  scrollY: number;
}

export default function CosmicBackground({ scrollY }: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;

    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }> = [];

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;

        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(255, 248, 240, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 248, 240, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        star.twinklePhase += star.twinkleSpeed;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #1B0036 0%, #0B0B10 50%, #000000 100%)',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: 0.6,
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />
    </>
  );
}
