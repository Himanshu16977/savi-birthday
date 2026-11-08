import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fairyAudio } from '../../utils/soundEffects';

const INITIAL_BASE_COUNT = 182;

const FLOATING_EMOJIS = ['💖', '🌸', '✨', '💕', '🦋', '💗', '⭐'];

export default function SendLoveFloating() {
  const [loveCount, setLoveCount] = useState(() => {
    try {
      const saved = localStorage.getItem('savi_love_reaction_count');
      if (saved) return parseInt(saved, 10);
    } catch {
      // Ignored
    }
    return INITIAL_BASE_COUNT;
  });

  const [floatingParticles, setFloatingParticles] = useState([]);
  const [isPressing, setIsPressing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('savi_love_reaction_count', loveCount.toString());
    } catch {
      // Ignored
    }
  }, [loveCount]);

  const handleSendLove = () => {
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 300);

    // 1. Increment live counter
    setLoveCount((prev) => prev + 1);

    // 2. Play sweet sound effect (procedural chime with musical progression)
    const pitch = 950 + ((loveCount % 7) * 45);
    fairyAudio.playSparkle(pitch, 0.3);

    // 3. Spawn floating hearts, flowers and sparkles
    const newParticles = [
      {
        id: Math.random(),
        emoji: FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)],
        xOffset: (Math.random() - 0.5) * 80,
        rotate: (Math.random() - 0.5) * 40,
        duration: 1.8 + Math.random() * 0.8,
        scale: 0.8 + Math.random() * 0.6,
      },
      {
        id: Math.random(),
        emoji: '💖',
        xOffset: (Math.random() - 0.5) * 60,
        rotate: (Math.random() - 0.5) * 30,
        duration: 2 + Math.random() * 0.6,
        scale: 1 + Math.random() * 0.4,
      },
    ];

    setFloatingParticles((prev) => [...prev.slice(-12), ...newParticles]);

    // 4. Trigger localized mini confetti shower
    confetti({
      particleCount: 22,
      spread: 50,
      origin: { y: 0.88, x: 0.88 },
      colors: ['#ffd0e0', '#cfb7f0', '#f8dc81', '#ff7fa7', '#ffffff'],
      scalar: 0.9,
      ticks: 120,
    });

    // 5. Random sweet micro-interaction toast every few clicks
    const toasts = [
      "Savi smiles! 🌸",
      "+1 Love Showered! 💕",
      "Stardust blessings sent! ✨",
      "Brother cheers with joy! 👑",
      "Princess Savi feels your love! 💖",
    ];
    setToastMessage(toasts[Math.floor(Math.random() * toasts.length)]);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <aside aria-label="Send love reaction button" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none">
      {/* Floating Animated Emojis (Hearts, Flowers, Sparkles) on Click */}
      <div className="relative w-full pointer-events-none">
        <AnimatePresence>
          {floatingParticles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, x: p.xOffset, scale: 0.6 }}
              animate={{
                opacity: [1, 1, 0],
                y: -140 - Math.random() * 40,
                x: p.xOffset + (Math.random() - 0.5) * 30,
                rotate: p.rotate,
                scale: [0.6, p.scale, p.scale * 0.9],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.duration, ease: 'easeOut' }}
              className="absolute bottom-2 right-6 text-xl sm:text-2xl filter drop-shadow-sm pointer-events-none"
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Micro-interaction Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="mb-2 px-3.5 py-1.5 rounded-full glass-fairy-card bg-white/95 border border-fairy-pink-300 shadow-fairy text-xs font-bold text-stone-800 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-fairy-gold-500" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Reaction Pill Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSendLove}
        type="button"
        className="group relative p-1.5 pr-4 rounded-full bg-gradient-to-r from-fairy-pink-400 via-rose-400 to-fairy-lavender-400 text-white shadow-fairy hover:shadow-fairy-hover border-2 border-white/90 flex items-center gap-2.5 cursor-pointer transition-all duration-300 overflow-hidden"
        title="Tap to send love to Savi!"
      >
        {/* Shimmer sweep effect */}
        <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

        {/* Beating Heart Icon Circle */}
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-rose-500 flex items-center justify-center shadow-sm transition-transform duration-200 ${
            isPressing ? 'scale-125' : 'group-hover:scale-110'
          }`}
        >
          <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
        </div>

        {/* Live Counter & Label */}
        <div className="text-left font-sans">
          <div className="flex items-center gap-1">
            <span className="font-bold text-xs sm:text-sm tracking-wide text-white drop-shadow-xs">
              {loveCount} loves
            </span>
            <span className="text-xs">❤️</span>
          </div>
          <span className="block text-[10px] text-white/90 font-medium -mt-0.5 whitespace-nowrap">
            sent to Savi
          </span>
        </div>
      </motion.button>
    </aside>
  );
}

