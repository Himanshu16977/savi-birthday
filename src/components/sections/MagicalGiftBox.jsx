import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Stars, Crown, RotateCcw, Wand2, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fairyAudio } from '../../utils/soundEffects';

export default function MagicalGiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCount, setOpenCount] = useState(0);

  // Particles for the burst animation (stars & butterflies)
  const particles = [
    { id: 1, symbol: '🦋', x: -80, y: -160, delay: 0.05, duration: 1.8, rotate: -20 },
    { id: 2, symbol: '⭐', x: 70, y: -180, delay: 0.1, duration: 1.6, rotate: 25 },
    { id: 3, symbol: '✨', x: -120, y: -130, delay: 0.15, duration: 1.7, rotate: 15 },
    { id: 4, symbol: '🧚‍♀️', x: 0, y: -210, delay: 0.2, duration: 2.1, rotate: 0 },
    { id: 5, symbol: '🌸', x: 110, y: -140, delay: 0.18, duration: 1.9, rotate: 30 },
    { id: 6, symbol: '💖', x: -40, y: -190, delay: 0.12, duration: 1.8, rotate: -15 },
    { id: 7, symbol: '🦋', x: 80, y: -150, delay: 0.22, duration: 2.0, rotate: 18 },
    { id: 8, symbol: '✨', x: 30, y: -200, delay: 0.25, duration: 1.7, rotate: -10 },
  ];

  const handleOpenBox = () => {
    if (isOpen) return;

    setIsOpen(true);
    setOpenCount((prev) => prev + 1);

    // Audio effects
    fairyAudio.playWandBurst();
    setTimeout(() => fairyAudio.playSparkle(1200, 0.5), 250);
    setTimeout(() => fairyAudio.playFireworkBurst(), 450);

    // Confetti celebration burst
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.62 },
      colors: ['#ffd0e0', '#cfb7f0', '#f8dc81', '#ffffff', '#ff7fa7', '#c5e5fa'],
      scalar: 1.15,
    });

    // Secondary delayed starlight shower
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 60,
        origin: { x: 0.2, y: 0.65 },
        colors: ['#ffd0e0', '#f8dc81'],
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 60,
        origin: { x: 0.8, y: 0.65 },
        colors: ['#cfb7f0', '#c5e5fa'],
      });
    }, 280);
  };

  const handleResetBox = () => {
    fairyAudio.playSparkle(960, 0.25);
    setIsOpen(false);
  };

  return (
    <section
      id="surprise-gift"
      className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-purple-50/50 to-transparent overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] sm:w-[46rem] h-[32rem] sm:h-[46rem] bg-gradient-to-tr from-pink-200/35 via-purple-200/40 to-amber-200/35 rounded-full blur-3xl pointer-events-none" />

      {/* Ambient Floating Fairy Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-12 left-10 text-2xl opacity-40 animate-float-slow">✨</span>
        <span className="absolute top-20 right-14 text-3xl opacity-40 animate-float-reverse">⭐</span>
        <span className="absolute bottom-16 left-16 text-3xl opacity-40 animate-float-slow">🦋</span>
        <span className="absolute bottom-20 right-20 text-2xl opacity-40 animate-float-reverse">🌸</span>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-purple-200 shadow-sm mb-3">
          <Gift className="w-4 h-4 text-purple-500 animate-bounce" />
          <span className="text-xs font-bold tracking-wider uppercase text-purple-600 font-sans">
            Magical Surprise Box
          </span>
          <Stars className="w-4 h-4 text-fairy-gold-400" />
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
          A Magical Gift for <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500">Savi</span>
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-2 max-w-xl mx-auto">
          "Wrapped with pastel petals, tied with golden dreams, and sealed with endless family love."
        </p>

        {/* ============================================================== */}
        {/* INTERACTIVE GIFT BOX CONTAINER */}
        {/* ============================================================== */}
        <div className="my-12 sm:my-16 relative flex flex-col items-center justify-center min-h-[380px]">
          {/* Animated Particles released upon opening (Glowing Stars & Butterflies) */}
          <AnimatePresence>
            {isOpen && (
              <div className="absolute z-40 pointer-events-none">
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                    animate={{
                      x: p.x,
                      y: p.y,
                      opacity: [0, 1, 1, 0],
                      scale: [0.3, 1.4, 1.1, 0.7],
                      rotate: [0, p.rotate * 1.5, p.rotate],
                    }}
                    transition={{
                      duration: p.duration,
                      delay: p.delay,
                      ease: 'easeOut',
                    }}
                    className="absolute text-3xl sm:text-4xl filter drop-shadow-md select-none"
                  >
                    {p.symbol}
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Glowing Light Beam Shooting out of Open Box */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute -top-32 w-48 sm:w-64 h-64 bg-gradient-to-t from-fairy-gold-300/60 via-pink-300/40 to-transparent blur-xl pointer-events-none z-10 origin-bottom"
              />
            )}
          </AnimatePresence>

          {/* Interactive Gift Box Graphic */}
          <div
            onClick={!isOpen ? handleOpenBox : undefined}
            className={`relative flex flex-col items-center select-none ${
              !isOpen ? 'cursor-pointer group' : ''
            }`}
          >
            {/* --- GIFT BOX LID WITH GOLDEN RIBBON & BOW --- */}
            <motion.div
              animate={
                isOpen
                  ? {
                      y: -100,
                      rotate: -18,
                      x: -35,
                      opacity: 0.85,
                      scale: 1.05,
                    }
                  : {
                      y: [0, -6, 0],
                      rotate: [0, -1, 1, 0],
                    }
              }
              transition={
                isOpen
                  ? { type: 'spring', stiffness: 180, damping: 14 }
                  : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
              }
              className="relative z-30 flex flex-col items-center filter drop-shadow-lg"
            >
              {/* Golden Ribbon Bow on Top */}
              <div className="relative mb-0 flex items-center justify-center">
                {/* Left Bow Loop */}
                <div className="w-9 sm:w-11 h-7 sm:h-9 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 border-2 border-white shadow-md -rotate-30 -mr-2 flex items-center justify-center">
                  <div className="w-4 h-3 rounded-full bg-amber-500/20" />
                </div>

                {/* Bow Center Knot */}
                <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-100 border-2 border-white shadow-md z-10 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-amber-500/30" />
                </div>

                {/* Right Bow Loop */}
                <div className="w-9 sm:w-11 h-7 sm:h-9 rounded-full bg-gradient-to-tl from-amber-300 via-yellow-200 to-amber-400 border-2 border-white shadow-md rotate-30 -ml-2 flex items-center justify-center">
                  <div className="w-4 h-3 rounded-full bg-amber-500/20" />
                </div>

                {/* Floating Wand Hint Sparkle */}
                <Sparkles className="w-4 h-4 text-fairy-gold-200 absolute -top-2 -right-3 animate-pulse" />
              </div>

              {/* Lid Slab (Pink & Lavender Striped with Golden Trim) */}
              <div className="w-56 sm:w-68 h-9 sm:h-11 rounded-2xl bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 border-2 border-white shadow-md flex items-center justify-center relative overflow-hidden -mt-1">
                {/* Subtle pastel sheen */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />

                {/* Golden Ribbon along the Lid */}
                <div className="w-8 sm:w-10 h-full bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300 border-x border-white/80 shadow-xs z-10" />

                {/* Pearl Dots along lid bottom */}
                <div className="absolute bottom-0 inset-x-0 flex justify-around">
                  {[...Array(12)].map((_, i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* --- GIFT BOX BASE (Pink & Lavender with Golden Ribbon) --- */}
            <motion.div
              whileHover={!isOpen ? { scale: 1.04 } : {}}
              whileTap={!isOpen ? { scale: 0.96 } : {}}
              className="w-48 sm:w-60 h-44 sm:h-52 rounded-b-3xl bg-gradient-to-b from-pink-200 via-purple-200 to-pink-300 border-2 border-white shadow-xl relative overflow-hidden -mt-2 z-20 flex items-center justify-center"
            >
              {/* Inner ambient glow inside open box */}
              {isOpen && (
                <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-amber-200/90 to-transparent z-10 animate-pulse" />
              )}

              {/* Vertical Golden Ribbon */}
              <div className="w-8 sm:w-10 h-full bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300 border-x border-white/80 shadow-sm flex flex-col justify-around items-center z-10">
                <span className="text-[10px] text-amber-900 font-bold opacity-60">✨</span>
                <span className="text-[10px] text-amber-900 font-bold opacity-60">💖</span>
                <span className="text-[10px] text-amber-900 font-bold opacity-60">✨</span>
              </div>

              {/* Horizontal Golden Ribbon */}
              <div className="absolute inset-x-0 h-7 sm:h-8 bg-gradient-to-b from-amber-300 via-yellow-100 to-amber-300 border-y border-white/80 shadow-xs z-0" />

              {/* Box Corner Floral Stamps */}
              <span className="absolute top-2 left-2 text-xs opacity-75">🌸</span>
              <span className="absolute top-2 right-2 text-xs opacity-75">🌸</span>
              <span className="absolute bottom-2 left-2 text-xs opacity-75">🪻</span>
              <span className="absolute bottom-2 right-2 text-xs opacity-75">🪻</span>

              {/* Unopened "Tap to Open" Hint Overlay */}
              {!isOpen && (
                <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center">
                  <span className="text-[11px] sm:text-xs font-bold text-purple-900 bg-white/85 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs border border-purple-200 animate-pulse">
                    ✨ Click to Open! ✨
                  </span>
                </div>
              )}
            </motion.div>

            {/* Gift Box Shadow on Ground */}
            <div className="w-48 sm:w-60 h-4 bg-stone-800/10 rounded-full blur-md mt-2" />
          </div>

          {/* ============================================================== */}
          {/* REVEALED SURPRISE MESSAGE: "You Are Our Little Fairy, Savi! 🧚‍♀️" */}
          {/* ============================================================== */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                className="mt-8 max-w-xl mx-auto p-8 sm:p-10 rounded-3xl glass-fairy-card bg-white/95 border-2 border-fairy-gold-300 shadow-fairy text-center relative overflow-hidden"
              >
                {/* Decorative background glows */}
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-pink-100/70 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-purple-100/70 rounded-full blur-2xl pointer-events-none" />

                {/* Fairy Wand & Crown Icon */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-200 via-purple-200 to-amber-200 text-purple-700 flex items-center justify-center mx-auto shadow-inner mb-3">
                  <span className="text-2xl animate-sparkle">🧚‍♀️</span>
                </div>

                {/* EXACT REVEAL REQUIREMENT: "You Are Our Little Fairy, Savi! 🧚‍♀️" */}
                <h3 className="font-serif text-2xl sm:text-4xl font-black text-stone-800 tracking-tight leading-snug">
                  You Are Our Little Fairy,{' '}
                  <span className="font-script text-3xl sm:text-5xl text-fairy-pink-500 font-bold block sm:inline">
                    Savi! 🧚‍♀️
                  </span>
                </h3>

                {/* Beautiful Surprise Message */}
                <blockquote className="font-serif italic text-base sm:text-lg text-stone-700 mt-3 leading-relaxed">
                  "You entered our world with the softest giggles and transformed our lives into a garden of endless joy, wonder, and stardust dreams."
                </blockquote>

                {/* 3 Sweet Fairytale Badges */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 my-5 pt-2 border-t border-b border-pink-100">
                  <div className="p-2 sm:p-3 rounded-2xl bg-pink-50 border border-pink-200 flex flex-col items-center">
                    <span className="text-base sm:text-lg">🌸</span>
                    <span className="text-[10px] sm:text-xs font-bold text-pink-700 mt-1">Purest Joy</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col items-center">
                    <span className="text-base sm:text-lg">✨</span>
                    <span className="text-[10px] sm:text-xs font-bold text-purple-700 mt-1">Stardust Soul</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center">
                    <span className="text-base sm:text-lg">👑</span>
                    <span className="text-[10px] sm:text-xs font-bold text-amber-700 mt-1">Family Treasure</span>
                  </div>
                </div>

                <p className="text-xs text-stone-500 font-sans">
                  May your wings always carry you to beautiful adventures, sweet little princess! ❤️
                </p>

                {/* Interactive Replay / Close Button */}
                <div className="mt-5 flex items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetBox}
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-fairy-gold-400 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Close & Open Again 🎁</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Unopened Button Trigger for easy accessibility */}
        {!isOpen && (
          <div className="mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenBox}
              type="button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-fairy-gold-400 text-white font-bold text-sm sm:text-base shadow-fairy hover:shadow-fairy-hover transition-all cursor-pointer"
            >
              <Gift className="w-4 h-4 text-white animate-bounce" />
              <span>Open Savi's Surprise Box ✨</span>
              <Sparkles className="w-4 h-4 text-amber-200" />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
