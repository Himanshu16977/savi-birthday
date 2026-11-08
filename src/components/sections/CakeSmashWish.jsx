import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, Flame, Stars, Crown, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fairyAudio } from '../../utils/soundEffects';

export default function CakeSmashWish() {
  const [candleLit, setCandleLit] = useState(true);
  const [celebrated, setCelebrated] = useState(false);
  const [wishCount, setWishCount] = useState(1);

  // Helper function for random numbers
  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  // Trigger grand confetti & magical fireworks sequence
  const launchMagicalCelebration = () => {
    // 1. Audio Fanfare & Sound Effects
    fairyAudio.playWandBurst();
    setTimeout(() => fairyAudio.playBirthdayFanfare(), 400);

    // 2. Initial Center Confetti Blast
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ffd0e0', '#ff94b9', '#cfb7f0', '#f8dc81', '#ffffff'],
      scalar: 1.2,
    });

    // 3. Multi-point Fireworks Simulation across the screen
    const duration = 2.8 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);

      // Left Firework Burst
      confetti({
        particleCount,
        spread: 360,
        startVelocity: 30,
        ticks: 60,
        origin: { x: randomInRange(0.12, 0.32), y: randomInRange(0.2, 0.5) },
        colors: ['#ffd0e0', '#ff7fa7', '#f8dc81', '#ffffff'],
        scalar: 1.1,
      });

      // Right Firework Burst
      confetti({
        particleCount,
        spread: 360,
        startVelocity: 30,
        ticks: 60,
        origin: { x: randomInRange(0.68, 0.88), y: randomInRange(0.2, 0.5) },
        colors: ['#cfb7f0', '#99d2f6', '#f8dc81', '#ffb3c6'],
        scalar: 1.1,
      });

      fairyAudio.playFireworkBurst();
    }, 380);
  };

  // Handle Make a Wish Click
  const handleMakeWish = () => {
    if (!candleLit) return;

    // Extinguish candle flame
    setCandleLit(false);
    setCelebrated(true);
    setWishCount((prev) => prev + 1);

    // Launch Confetti & Magical Fireworks
    launchMagicalCelebration();
  };

  // Handle Replay Celebration
  const handleReplay = () => {
    fairyAudio.playSparkle(1050, 0.3);
    setCandleLit(true);
    setCelebrated(false);
  };

  return (
    <section
      id="birthday-cake"
      className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-pink-50/60 to-transparent overflow-hidden"
    >
      {/* Background Magical Ambient Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] sm:w-[48rem] h-[34rem] sm:h-[48rem] bg-gradient-to-tr from-pink-200/40 via-lavender-200/35 to-amber-200/35 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Ambient Starlight Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-12 text-2xl text-amber-300"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ y: [0, 25, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-28 right-16 text-3xl text-pink-300"
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-20 left-20 text-3xl text-amber-300"
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-24 right-20 text-2xl text-purple-300"
        >
          ✨
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-gold-300/70 shadow-sm mb-3">
          <Crown className="w-4 h-4 text-fairy-gold-500 animate-sparkle" />
          <span className="text-xs font-bold tracking-wider uppercase text-fairy-gold-600 font-sans">
            Savi's 1st Birthday Cake
          </span>
          <Stars className="w-4 h-4 text-pink-400" />
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
          Make a Wish for <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500 font-normal">Savi</span>
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-2 max-w-xl mx-auto">
          "Whisper a sweet prayer into your heart, blow the candle, and fill the skies with stardust!"
        </p>

        {/* ============================================================== */}
        {/* INTERACTIVE ANIMATED LARGE PINK BIRTHDAY CAKE CONTAINER */}
        {/* ============================================================== */}
        <div className="my-10 sm:my-14 relative flex flex-col items-center justify-center min-h-[420px] select-none">
          {/* FLOATING BUTTERFLIES AROUND THE CAKE */}
          {/* Butterfly 1: Upper Left */}
          <motion.div
            animate={{
              x: [-15, 10, -10, -15],
              y: [-10, -25, -12, -10],
              rotate: [-6, 12, -8, -6],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 left-8 sm:left-24 text-2xl sm:text-3xl pointer-events-none z-30 filter drop-shadow-sm"
          >
            🦋
          </motion.div>

          {/* Butterfly 2: Upper Right */}
          <motion.div
            animate={{
              x: [10, -15, 8, 10],
              y: [-12, -28, -6, -12],
              rotate: [8, -14, 6, 8],
            }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute top-12 right-8 sm:right-24 text-2xl sm:text-3xl pointer-events-none z-30 filter drop-shadow-sm"
          >
            🦋
          </motion.div>

          {/* Butterfly 3: Lower Left */}
          <motion.div
            animate={{
              x: [-8, 12, -14, -8],
              y: [6, -16, 8, 6],
              rotate: [-10, 10, -6, -10],
            }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-28 left-6 sm:left-16 text-xl sm:text-2xl pointer-events-none z-30 filter drop-shadow-sm"
          >
            🌸
          </motion.div>

          {/* Butterfly 4: Lower Right */}
          <motion.div
            animate={{
              x: [12, -8, 14, 12],
              y: [10, -12, 10, 10],
              rotate: [10, -8, 12, 10],
            }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
            className="absolute bottom-32 right-6 sm:right-16 text-2xl pointer-events-none z-30 filter drop-shadow-sm"
          >
            🦋
          </motion.div>

          {/* FLOATING GOLDEN STARS AROUND THE CAKE */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
              rotate: [0, 45, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 left-1/3 text-xl text-amber-400 pointer-events-none z-20"
          >
            ✨
          </motion.div>

          <motion.div
            animate={{
              scale: [1.2, 0.9, 1.2],
              opacity: [0.7, 1, 0.7],
              rotate: [0, -35, 0],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            className="absolute top-6 right-1/3 text-2xl text-amber-400 pointer-events-none z-20"
          >
            ⭐
          </motion.div>

          <motion.div
            animate={{
              scale: [0.9, 1.25, 0.9],
              opacity: [0.5, 0.95, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            className="absolute bottom-24 left-1/4 text-lg text-amber-300 pointer-events-none z-20"
          >
            ⭐
          </motion.div>

          <motion.div
            animate={{
              scale: [1.1, 0.85, 1.1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
            className="absolute bottom-20 right-1/4 text-xl text-amber-300 pointer-events-none z-20"
          >
            ✨
          </motion.div>

          {/* Ambient Candle Glow behind top tier */}
          {candleLit && (
            <div className="absolute top-2 w-44 h-44 bg-amber-300/45 rounded-full blur-2xl pointer-events-none animate-pulse" />
          )}

          {/* Gentle Floating & Breathing Animation for the entire Cake */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex flex-col items-center z-10"
          >
            {/* ============================================================== */}
            {/* NUMBER 1 CANDLE & GLOWING FLAME */}
            {/* ============================================================== */}
            <div className="relative z-30 flex flex-col items-center mb-0">
              {/* FLICKERING GLOWING FLAME */}
              <div
                onClick={handleMakeWish}
                className={`cursor-pointer transition-transform duration-300 ${
                  candleLit ? 'hover:scale-125' : ''
                }`}
                title={candleLit ? 'Click to make a wish!' : 'Candle is blown out'}
              >
                <AnimatePresence mode="wait">
                  {candleLit ? (
                    <motion.div
                      key="lit-flame"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [1, 1.22, 0.94, 1.15],
                        rotate: [-2, 3.5, -2, 2.5, 0],
                      }}
                      exit={{
                        opacity: 0,
                        y: -22,
                        scale: 0.1,
                        transition: { duration: 0.35 },
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: 'easeInOut',
                      }}
                      className="relative flex items-center justify-center -mb-0.5"
                    >
                      {/* Outer Radiance Glow */}
                      <div className="w-8 h-12 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-amber-100 blur-[2px] shadow-gold-glow animate-pulse" />
                      {/* Inner Pure White Candle Core */}
                      <div className="w-3.5 h-7 rounded-full bg-white absolute top-1 blur-[0.6px]" />
                      {/* Floating Mini Flame Sparkles */}
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-200 absolute -top-1 -right-1 animate-ping opacity-75" />
                    </motion.div>
                  ) : (
                    /* ANIMATED DELICATE WISPS OF SMOKE ON EXTINGUISH */
                    <motion.div
                      key="smoke-wisp"
                      initial={{ opacity: 0, y: 0, scale: 0.4 }}
                      animate={{
                        opacity: [0, 0.9, 0],
                        y: -42,
                        x: [0, 8, -8, 10],
                        scale: [0.4, 1.3, 1.6],
                      }}
                      transition={{ duration: 2.4, ease: 'easeOut' }}
                      className="py-1 select-none flex items-center justify-center gap-1"
                    >
                      <span className="text-sm">💨</span>
                      <span className="text-[11px] text-pink-500 font-sans font-bold bg-white/80 px-2 py-0.5 rounded-full shadow-xs">
                        ~ Wish released to the stars ~
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CANDLE WICK */}
              <div className="w-1 h-2.5 bg-stone-700 rounded-t-xs -mb-0.5 z-20" />

              {/* 3D SCULPTED NUMBER "1" CANDLE */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                onClick={handleMakeWish}
                className="cursor-pointer relative flex flex-col items-center justify-center filter drop-shadow-md z-20 group"
              >
                {/* Number 1 Graphic Body */}
                <div className="relative">
                  {/* Candle Base & Shaft */}
                  <div className="w-8 sm:w-9 h-14 sm:h-16 rounded-lg bg-gradient-to-b from-amber-200 via-fairy-gold-300 to-amber-400 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                    {/* Pink Swirl Stripes on the "1" */}
                    <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#ff7fa7_0,#ff7fa7_4px,transparent_0,transparent_8px)]" />

                    {/* Prominent Number "1" Emboss */}
                    <span className="font-serif font-black text-xl sm:text-2xl text-amber-950 relative z-10 drop-shadow-xs">
                      1
                    </span>
                  </div>

                  {/* Number 1 Flag Tip (top left hook) */}
                  <div className="absolute -top-1 -left-2.5 w-4 h-5 bg-gradient-to-br from-amber-200 to-fairy-gold-400 rounded-tl-md -rotate-45 border-l-2 border-t-2 border-white" />

                  {/* Number 1 Foot (bottom pedestal) */}
                  <div className="w-12 h-2.5 -mx-2 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 rounded-full border border-white shadow-xs -mt-1" />
                </div>
              </motion.div>
            </div>

            {/* ============================================================== */}
            {/* LARGE ANIMATED 3-TIER PINK BIRTHDAY CAKE */}
            {/* ============================================================== */}
            <div className="relative flex flex-col items-center -mt-1">
              {/* --- TIER 1: TOP TIER (Pastel Strawberry Pink & Floral Pearls) --- */}
              <div className="w-44 sm:w-56 h-16 sm:h-18 rounded-t-3xl bg-gradient-to-b from-pink-300 via-pink-200 to-rose-300 shadow-md border-2 border-white relative flex items-center justify-center overflow-hidden z-20">
                {/* Dripping Frosting Scallops */}
                <div className="absolute top-0 inset-x-0 h-3 bg-white/90 rounded-b-xl shadow-2xs flex justify-around">
                  {[...Array(7)].map((_, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full bg-white/95 -mt-1 shadow-2xs"
                    />
                  ))}
                </div>

                {/* Tier Inscription */}
                <div className="flex items-center gap-1.5 mt-2 z-10">
                  <span className="text-xs">🌸</span>
                  <span className="font-serif font-bold text-xs sm:text-sm text-pink-800 tracking-wider">
                    Princess Savi
                  </span>
                  <span className="text-xs">🌸</span>
                </div>

                {/* Sugar Pearl Border at Bottom */}
                <div className="absolute -bottom-1.5 inset-x-0 flex justify-around z-10">
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full bg-white border border-pink-200 shadow-xs"
                    />
                  ))}
                </div>
              </div>

              {/* --- TIER 2: MIDDLE TIER (Blush Fairy Pink with Golden Rose Pattern) --- */}
              <div className="w-64 sm:w-80 h-20 sm:h-22 rounded-t-3xl bg-gradient-to-b from-pink-200 via-fairy-pink-100 to-rose-200 shadow-lg border-2 border-white relative flex flex-col items-center justify-center overflow-hidden -mt-2 z-10">
                {/* White Cream Icing Wave */}
                <div className="absolute top-0 inset-x-0 h-3.5 bg-white/90 rounded-b-2xl shadow-2xs flex justify-around">
                  {[...Array(10)].map((_, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full bg-white/95 -mt-1 shadow-2xs"
                    />
                  ))}
                </div>

                {/* Script Inscription */}
                <div className="text-center z-10 mt-1">
                  <span className="font-script text-2xl sm:text-3xl text-pink-700 font-semibold drop-shadow-2xs">
                    Sweetest 1st Birthday
                  </span>
                  <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-stone-600 font-serif italic -mt-1">
                    <span>✨ One Year of Pure Love ✨</span>
                  </div>
                </div>

                {/* Golden Pearl Trim along bottom */}
                <div className="absolute -bottom-2 inset-x-0 flex justify-around z-10">
                  {[...Array(12)].map((_, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-200 to-fairy-gold-300 border border-white shadow-xs"
                    />
                  ))}
                </div>
              </div>

              {/* --- TIER 3: BOTTOM TIER (Grand Pink & Cream White Base with Golden Scallops) --- */}
              <div className="w-84 sm:w-[26rem] h-24 sm:h-26 rounded-t-[2.5rem] bg-gradient-to-b from-pink-300 via-rose-200 to-pink-300 shadow-xl border-2 border-white relative flex flex-col items-center justify-center overflow-hidden -mt-2 z-0">
                {/* Top Frosting Drips */}
                <div className="absolute top-0 inset-x-0 h-4 bg-white/90 rounded-b-2xl shadow-2xs flex justify-around">
                  {[...Array(14)].map((_, i) => (
                    <span
                      key={i}
                      className="w-4.5 h-4.5 rounded-full bg-white/95 -mt-1.5 shadow-2xs"
                    />
                  ))}
                </div>

                {/* Decorative Floral & Heart Motifs */}
                <div className="flex items-center gap-3 z-10 mt-2 text-stone-700">
                  <span className="text-base sm:text-lg">💖</span>
                  <span className="font-serif font-bold text-xs sm:text-sm tracking-widest uppercase text-pink-900">
                    Savi Gangwar • 365 Days of Joy
                  </span>
                  <span className="text-base sm:text-lg">💖</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-pink-800 font-sans mt-0.5 z-10">
                  <span>🎂 November 8, 2026</span>
                  <span>•</span>
                  <span>Our Little Fairy 🧚‍♀️</span>
                </div>

                {/* Elegant Bottom Scalloped Border */}
                <div className="absolute -bottom-1.5 inset-x-0 flex justify-around z-10">
                  {[...Array(16)].map((_, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full bg-white border border-pink-200 shadow-2xs"
                    />
                  ))}
                </div>
              </div>

              {/* --- GOLDEN ROYAL CAKE PEDESTAL STAND --- */}
              <div className="w-92 sm:w-[28.5rem] h-4 rounded-full bg-gradient-to-r from-amber-300 via-fairy-gold-200 to-amber-300 shadow-fairy border border-white relative z-10" />
              <div className="w-36 sm:w-44 h-6 rounded-b-2xl bg-gradient-to-b from-fairy-gold-300 to-amber-400 shadow-md border-b border-amber-500/30 -mt-1 z-0" />
              <div className="w-52 sm:w-64 h-3 rounded-full bg-gradient-to-r from-amber-400 via-fairy-gold-200 to-amber-400 shadow-lg -mt-1" />
            </div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE BUTTONS & CELEBRATORY WISH REVEAL */}
        {/* ============================================================== */}
        <div className="max-w-xl mx-auto">
          {candleLit ? (
            /* BUTTON: "Make a Wish, Savi! ✨" (Exact Prompt Requirement) */
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMakeWish}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-pink-400 via-fairy-pink-500 to-fairy-gold-400 text-white font-bold text-base sm:text-lg shadow-fairy hover:shadow-fairy-hover transition-all cursor-pointer group border-2 border-white"
            >
              <Flame className="w-5 h-5 text-amber-200 animate-bounce" />
              <span className="font-serif tracking-wide">Make a Wish, Savi! ✨</span>
              <Sparkles className="w-5 h-5 text-fairy-gold-100 group-hover:rotate-12 transition-transform" />
            </motion.button>
          ) : (
            /* CELEBRATORY CARD DISPLAYING "Happy 1st Birthday, Savi! ❤️" */
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="p-8 sm:p-10 rounded-3xl glass-fairy-card bg-white/95 border-2 border-fairy-gold-300 shadow-fairy space-y-4 text-center relative overflow-hidden"
            >
              {/* Background celebration sparkle tint */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/60 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100/60 rounded-full blur-2xl pointer-events-none" />

              {/* Golden Crown & Sparkle Emblem */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-200 via-fairy-gold-200 to-lavender-200 text-amber-800 flex items-center justify-center mx-auto shadow-inner">
                <Crown className="w-7 h-7 text-amber-700 animate-sparkle" />
              </div>

              {/* Exact Display Requirement: "Happy 1st Birthday, Savi! ❤️" */}
              <div className="space-y-1">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-stone-800 tracking-tight">
                  Happy 1st Birthday, <span className="font-script text-4xl sm:text-5xl md:text-6xl text-fairy-pink-500">Savi!</span> ❤️
                </h3>
                <p className="font-serif italic text-base sm:text-lg text-pink-600 font-medium">
                  "May your life always be blessed with unconditional love, joyous laughter, and stardust dreams."
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-500 font-sans max-w-md mx-auto">
                🌟 The magical fireworks have carried your wish to the sky! Every prayer whispered today watches over baby Savi forever.
              </p>

              {/* REPLAY CELEBRATION BUTTON (Exact Prompt Requirement) */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReplay}
                  type="button"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-fairy-gold-400 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 animate-spin-slow" />
                  <span>Replay Celebration 🔄</span>
                </motion.button>

                <button
                  onClick={launchMagicalCelebration}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white hover:bg-stone-50 border border-pink-200 text-pink-700 text-xs sm:text-sm font-semibold shadow-2xs transition-all hover:scale-105 cursor-pointer"
                >
                  <Wand2 className="w-4 h-4 text-fairy-gold-500" />
                  <span>Launch More Fireworks 🎆</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Cumulative Wishes Counter */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-stone-400 font-sans">
            <span>✨</span>
            <span>
              <strong className="text-stone-600">{wishCount}</strong> heartfelt wishes celebrated on Savi's cake!
            </span>
            <span>✨</span>
          </div>
        </div>
      </div>
    </section>
  );
}