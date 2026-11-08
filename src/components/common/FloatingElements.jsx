import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingElements() {
  const petals = [
    { id: 1, left: '4%', duration: 18, delay: 0, size: 22, color: 'bg-fairy-pink-200/50' },
    { id: 2, left: '16%', duration: 24, delay: 4, size: 16, color: 'bg-fairy-lavender-200/60' },
    { id: 3, left: '28%', duration: 20, delay: 2, size: 20, color: 'bg-fairy-blue-200/50' },
    { id: 4, left: '42%', duration: 26, delay: 7, size: 18, color: 'bg-fairy-gold-200/40' },
    { id: 5, left: '58%', duration: 19, delay: 1, size: 24, color: 'bg-fairy-pink-100/70' },
    { id: 6, left: '72%', duration: 23, delay: 5, size: 16, color: 'bg-fairy-lavender-300/45' },
    { id: 7, left: '85%', duration: 22, delay: 3, size: 20, color: 'bg-fairy-blue-100/60' },
    { id: 8, left: '95%', duration: 27, delay: 8, size: 14, color: 'bg-fairy-pink-300/40' },
  ];

  const butterflies = [
    { id: 1, top: '20%', duration: 16, delay: 0, xRange: [0, 80, -40, 0] },
    { id: 2, top: '55%', duration: 20, delay: 3, xRange: [0, -60, 50, 0] },
    { id: 3, top: '78%', duration: 18, delay: 6, xRange: [0, 70, -30, 0] },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {/* Falling blossom petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className={`absolute rounded-full blur-[0.3px] ${petal.color}`}
          style={{
            left: petal.left,
            top: '-25px',
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            borderRadius: '50% 15% 50% 50%',
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: ['0px', '25px', '-20px', '15px'],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Fluttering miniature fairy butterflies */}
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute text-lg select-none opacity-40 hover:opacity-80 transition-opacity"
          style={{ top: b.top, left: '50%' }}
          animate={{
            x: b.xRange,
            y: [0, -25, 15, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
        >
          🦋
        </motion.div>
      ))}
    </div>
  );
}
