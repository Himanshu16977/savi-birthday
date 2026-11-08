import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowUp, Wand2, Stars, Crown } from 'lucide-react';
import { fairyAudio } from '../../utils/soundEffects';

export default function Footer({ onReplayWelcome }) {
  const scrollToTop = () => {
    fairyAudio.playSparkle(1200, 0.3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    fairyAudio.playWandBurst();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onReplayWelcome) {
      setTimeout(() => onReplayWelcome(), 300);
    }
  };

  return (
    <footer className="relative pt-20 pb-12 px-4 sm:px-6 overflow-hidden border-t-2 border-fairy-pink-200/70 bg-gradient-to-b from-white/70 via-pink-50/50 to-fairy-cream/90 backdrop-blur-md select-none">
      {/* ============================================================== */}
      {/* 1. FLORAL DECORATIVE TOP BORDER & AMBIENT GLOW */}
      {/* ============================================================== */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-300 via-fairy-gold-300 to-purple-300 shadow-xs" />

      {/* Decorative Floral Garland across the top */}
      <div className="absolute -top-3.5 inset-x-0 flex justify-around pointer-events-none opacity-85 text-base sm:text-lg">
        {['🌸', '✨', '🪻', '⭐', '🌷', '✨', '🌸', '⭐', '🪻', '✨', '🌷'].map((item, idx) => (
          <span key={idx} className="filter drop-shadow-2xs">
            {item}
          </span>
        ))}
      </div>

      {/* Soft Ambient Radial Fairy Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-pink-200/30 via-purple-200/25 to-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* ============================================================== */}
      {/* 2. SMALL ANIMATED BUTTERFLIES & GOLDEN STARS */}
      {/* ============================================================== */}
      {/* Butterfly 1: Left */}
      <motion.div
        animate={{
          x: [-10, 20, -5, -10],
          y: [-5, -25, 5, -5],
          rotate: [-14, 12, -8, -14],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-14 left-6 sm:left-16 text-2xl sm:text-3xl pointer-events-none filter drop-shadow-xs"
      >
        🦋
      </motion.div>

      {/* Butterfly 2: Right */}
      <motion.div
        animate={{
          x: [10, -25, 8, 10],
          y: [-8, -22, 6, -8],
          rotate: [12, -14, 8, 12],
        }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-16 right-6 sm:right-16 text-2xl sm:text-3xl pointer-events-none filter drop-shadow-xs"
      >
        🦋
      </motion.div>

      {/* Butterfly 3: Floating Lower Center-Right */}
      <motion.div
        animate={{
          x: [-8, 15, -12, -8],
          y: [0, -18, 4, 0],
          rotate: [-10, 8, -6, -10],
        }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 right-1/4 text-xl sm:text-2xl pointer-events-none filter drop-shadow-xs"
      >
        🦋
      </motion.div>

      {/* Golden Stars Floating */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.95, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-1/4 text-2xl text-amber-400 pointer-events-none"
      >
        ⭐
      </motion.div>
      <motion.div
        animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-12 right-1/3 text-xl text-amber-300 pointer-events-none"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ scale: [0.95, 1.3, 0.95], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-16 left-1/5 text-xl text-amber-400 pointer-events-none"
      >
        ⭐
      </motion.div>

      {/* ============================================================== */}
      {/* 3. MAIN FOOTER CONTENT */}
      {/* ============================================================== */}
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        {/* Crown & Flower Centerpiece */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-xl">🌸</span>
          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-pink-300 via-purple-300 to-amber-300 flex items-center justify-center shadow-fairy border-2 border-white">
            <Crown className="w-6 h-6 text-white animate-sparkle" />
          </div>
          <span className="text-xl">🌸</span>
        </div>

        {/* REQUIRED HEADINGS */}
        <div className="space-y-3">
          {/* Primary Text: "Made With Endless Love For Savi Gangwar ❤️" */}
          <h3 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-stone-800 tracking-tight">
            Made With Endless Love For{' '}
            <span className="font-script text-3xl sm:text-4xl md:text-5xl text-fairy-pink-500 font-bold block sm:inline">
              Savi Gangwar ❤️
            </span>
          </h3>

          {/* Celebration Text: "Happy First Birthday, Our Little Princess!" */}
          <p className="font-script text-3xl sm:text-4xl md:text-5xl text-pink-600 font-semibold drop-shadow-2xs">
            "Happy First Birthday, Our Little Princess!"
          </p>

          <p className="font-serif italic text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            "One full year of sweet smiles, joyful giggles, and stardust dreams. Blessed forever by family & friends."
          </p>
        </div>

        {/* Floral Decorative Divider */}
        <div className="flex items-center justify-center gap-3 py-1 text-stone-300">
          <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-pink-200" />
          <span className="text-sm">🌸 ✨ 🌷</span>
          <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-pink-200" />
        </div>

        {/* ============================================================== */}
        {/* 4. SMOOTH BACK-TO-TOP & REPLAY INTRO BUTTONS */}
        {/* ============================================================== */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
          {/* Smooth Back to Top Button */}
          <motion.button
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.94 }}
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-stone-50 border-2 border-pink-200 hover:border-pink-300 text-stone-700 text-xs sm:text-sm font-bold shadow-xs hover:shadow-fairy transition-all cursor-pointer"
            title="Smoothly fly back to the top of the celebration"
          >
            <ArrowUp className="w-4 h-4 text-pink-500 animate-bounce" />
            <span>Fly Back to Top 🌸</span>
          </motion.button>

          {/* Replay Fairy World Intro */}
          {onReplayWelcome && (
            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleReplay}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 hover:from-amber-200 hover:to-yellow-200 border-2 border-fairy-gold-300 text-amber-900 text-xs sm:text-sm font-bold shadow-xs hover:shadow-fairy transition-all cursor-pointer"
              title="Replay the fairy world entrance experience"
            >
              <Wand2 className="w-4 h-4 text-amber-600" />
              <span>Replay Fairy Intro ✨</span>
            </motion.button>
          )}
        </div>

        {/* ============================================================== */}
        {/* 5. COPYRIGHT-FREE DESIGN & DEDICATION */}
        {/* ============================================================== */}
        <div className="pt-8 border-t border-pink-100/90 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2 font-sans">
          <span>
            🧚‍♀️ Savi Gangwar's 1st Birthday Keepsake • A Fairytale Celebration
          </span>
          <span className="flex items-center gap-1.5 text-stone-500 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400" />
            <span>& Stardust Forever</span>
          </span>
        </div>
      </div>
    </footer>
  );
}