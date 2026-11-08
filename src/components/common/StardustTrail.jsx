import React, { useEffect, useState } from 'react';

export default function StardustTrail() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let lastTime = 0;
    const colors = ['#ffd0e0', '#cfb7f0', '#99d2f6', '#f8dc81', '#ffffff'];

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 50) return; // Throttle for high performance
      lastTime = now;

      const newParticle = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setParticles((prev) => [...prev.slice(-18), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-ping pointer-events-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
            transform: 'translate(-50%, -50%)',
            animationDuration: '0.8s',
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

