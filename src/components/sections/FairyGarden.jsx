import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flower2, Heart, Stars, Crown, Wand2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fairyAudio } from '../../utils/soundEffects';

// Secret Birthday Wishes hidden inside each enchanted flower
const ENCHANTED_FLOWERS = [
  {
    id: 'rose',
    name: 'Blushing Rose',
    symbol: '🌹',
    accentColor: 'from-pink-400 to-rose-500',
    petalColor: 'text-rose-500',
    bgColor: 'bg-rose-50 border-rose-200',
    wish: 'May your life blossom with unending beauty, love, and sweet fragrance, darling Savi!',
    meaning: 'Symbol of Pure Love',
  },
  {
    id: 'blossom',
    name: 'Cherry Blossom',
    symbol: '🌸',
    accentColor: 'from-pink-300 to-pink-400',
    petalColor: 'text-pink-400',
    bgColor: 'bg-pink-50 border-pink-200',
    wish: 'May your days be as joyful and delicate as spring cherry blossoms dancing in the breeze!',
    meaning: 'Symbol of Sweet Grace',
  },
  {
    id: 'lavender',
    name: 'Stardust Lavender',
    symbol: '🪻',
    accentColor: 'from-purple-400 to-indigo-500',
    petalColor: 'text-purple-500',
    bgColor: 'bg-purple-50 border-purple-200',
    wish: 'May peaceful dreams and soothing lullabies cradle your heart every starry night!',
    meaning: 'Symbol of Calm & Peace',
  },
  {
    id: 'sunflower',
    name: 'Golden Blossom',
    symbol: '🌻',
    accentColor: 'from-amber-400 to-yellow-500',
    petalColor: 'text-amber-500',
    bgColor: 'bg-amber-50 border-amber-200',
    wish: 'May your bright smile always light up every room like warm sunshine on morning grass!',
    meaning: 'Symbol of Radiant Happiness',
  },
  {
    id: 'tulip',
    name: 'Fairy Queen Tulip',
    symbol: '🌷',
    accentColor: 'from-rose-300 to-pink-500',
    petalColor: 'text-pink-600',
    bgColor: 'bg-pink-50 border-pink-200',
    wish: 'May you always walk with confidence and innocence, our precious little royal princess!',
    meaning: 'Symbol of Royalty & Wonder',
  },
  {
    id: 'lotus',
    name: 'Moonlight Lotus',
    symbol: '🪷',
    accentColor: 'from-sky-300 to-teal-400',
    petalColor: 'text-sky-500',
    bgColor: 'bg-sky-50 border-sky-200',
    wish: 'May wisdom, health, and infinite blessings surround our sweet baby Savi forever!',
    meaning: 'Symbol of Sacred Purity',
  },
];

export default function FairyGarden() {
  const [activeFlower, setActiveFlower] = useState(null);
  const [bloomedIds, setBloomedIds] = useState(new Set());

  // Handle Flower Click
  const handleFlowerClick = (e, flower) => {
    e.stopPropagation();

    // Sound effect
    fairyAudio.playWindChimes();
    setTimeout(() => fairyAudio.playSparkle(1180, 0.3), 150);

    setActiveFlower(flower);

    // Track bloomed flowers
    setBloomedIds((prev) => {
      const next = new Set(prev);
      next.add(flower.id);

      // Grand celebration when all flowers are discovered
      if (next.size === ENCHANTED_FLOWERS.length && !prev.has(flower.id)) {
        setTimeout(() => {
          fairyAudio.playWandBurst();
          confetti({
            particleCount: 110,
            spread: 90,
            origin: { y: 0.65 },
            colors: ['#ffd0e0', '#cfb7f0', '#99d2f6', '#f8dc81'],
          });
        }, 400);
      }
      return next;
    });

    // Gentle mini sparkle burst at cursor position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 22,
      spread: 45,
      origin: { x, y },
      colors: ['#ffd0e0', '#cfb7f0', '#f8dc81'],
      scalar: 0.8,
    });
  };

  return (
    <section
      id="fairy-garden"
      className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-stone-50 via-emerald-50/40 to-stone-50 overflow-hidden"
    >
      {/* ============================================================== */}
      {/* 1. AMBIENT GLOWS, FIREFLIES & MAGICAL SPARKLING PARTICLES */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft magical forest canopy glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/25 rounded-full blur-3xl" />

        {/* FIREFLIES (Luminous glowing points drifting smoothly) */}
        {[
          { top: '15%', left: '10%', duration: 6, delay: 0 },
          { top: '35%', right: '12%', duration: 7, delay: 1.5 },
          { top: '60%', left: '8%', duration: 6.5, delay: 0.8 },
          { top: '75%', right: '15%', duration: 5.5, delay: 2.2 },
          { top: '25%', left: '45%', duration: 8, delay: 1.2 },
          { top: '80%', left: '50%', duration: 7.2, delay: 0.5 },
        ].map((f, i) => (
          <motion.div
            key={`firefly-${i}`}
            animate={{
              x: [0, 25, -20, 15, 0],
              y: [0, -30, 20, -15, 0],
              opacity: [0.3, 1, 0.4, 0.9, 0.3],
              scale: [0.8, 1.4, 0.9, 1.3, 0.8],
            }}
            transition={{
              duration: f.duration,
              repeat: Infinity,
              delay: f.delay,
              ease: 'easeInOut',
            }}
            style={{ top: f.top, left: f.left, right: f.right }}
            className="absolute w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#fde047]"
          />
        ))}

        {/* FLOATING STARS (Golden & Diamond twinkles) */}
        <motion.span
          animate={{ y: [0, -22, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-20 text-2xl text-amber-300"
        >
          ⭐
        </motion.span>
        <motion.span
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.85, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-28 right-24 text-3xl text-amber-400"
        >
          ✨
        </motion.span>
        <motion.span
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-20 left-1/4 text-2xl text-pink-300"
        >
          ⭐
        </motion.span>

        {/* ANIMATED FLUTTERING BUTTERFLIES */}
        <motion.div
          animate={{
            x: [0, 60, 20, 90, 0],
            y: [0, -40, 10, -50, 0],
            rotate: [-12, 14, -8, 10, -12],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-12 text-3xl filter drop-shadow-xs"
        >
          🦋
        </motion.div>
        <motion.div
          animate={{
            x: [0, -70, -20, -80, 0],
            y: [0, -35, 15, -45, 0],
            rotate: [12, -10, 14, -8, 12],
          }}
          transition={{ duration: 12.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-36 right-16 text-3xl filter drop-shadow-xs"
        >
          🦋
        </motion.div>
        <motion.div
          animate={{
            x: [0, 45, -30, 20, 0],
            y: [0, -25, 25, -20, 0],
            rotate: [-8, 12, -10, 8, -8],
          }}
          transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-36 left-1/3 text-2xl filter drop-shadow-xs"
        >
          🦋
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ============================================================== */}
        {/* SECTION HEADER */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-emerald-300/60 shadow-xs mb-3">
            <span className="text-base">🧚‍♀️</span>
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 font-sans">
              Interactive Fairy Realm
            </span>
            <Sparkles className="w-4 h-4 text-fairy-gold-500 animate-sparkle" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
            Savi's Enchanted <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500">Fairy Garden</span>
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-2 max-w-xl mx-auto">
            "Wander through glowing mushrooms, peek into small fairy houses, and click the flowers to unlock sweet birthday blessings for Savi!"
          </p>

          {/* Discovery Progress Tracker */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-emerald-200 shadow-2xs text-xs font-semibold text-emerald-800">
            <Flower2 className="w-3.5 h-3.5 text-pink-500" />
            <span>
              Flowers Bloomed: <strong className="text-pink-600">{bloomedIds.size}</strong> of {ENCHANTED_FLOWERS.length}
            </span>
            {bloomedIds.size === ENCHANTED_FLOWERS.length && (
              <span className="text-xs">✨ (Garden Full of Love!)</span>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. THE MAGICAL FAIRY GARDEN SCENERY */}
        {/* ============================================================== */}
        <div className="relative rounded-3xl p-6 sm:p-10 glass-fairy-card bg-gradient-to-b from-white/95 via-emerald-50/30 to-white/95 border-2 border-emerald-200 shadow-fairy mb-12 overflow-hidden">
          {/* Top Scenery Bar: Whimsical Fairy Houses & Glowing Mushrooms */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pb-8 border-b border-emerald-100/80">
            {/* Fairy House 1: Rosebud Cottage */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-pink-50 to-white border border-pink-200/80 shadow-2xs flex flex-col items-center text-center relative group hover:shadow-md transition-all">
              <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-2 right-2 animate-ping" />
              {/* Fairy House Illustration */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-200 via-rose-200 to-amber-100 flex items-center justify-center text-3xl shadow-inner mb-2 group-hover:scale-110 transition-transform">
                🏡
              </div>
              <span className="text-xs font-bold text-stone-800 font-serif">Rosebud Cottage</span>
              <span className="text-[10px] text-pink-600 font-sans">Chimney puffs & fairy beds</span>
            </div>

            {/* Glowing Mushroom 1: Neon Lavender Mushroom */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-50 to-white border border-purple-200/80 shadow-2xs flex flex-col items-center text-center relative group hover:shadow-md transition-all">
              {/* Animated Mushroom Cap with Glow */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], filter: ['brightness(1)', 'brightness(1.15)', 'brightness(1)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-300 via-pink-200 to-amber-200 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(216,180,254,0.6)] mb-2 group-hover:scale-110 transition-transform"
              >
                🍄
              </motion.div>
              <span className="text-xs font-bold text-stone-800 font-serif">Moonlight Shroom</span>
              <span className="text-[10px] text-purple-600 font-sans">Emits lavender stardust</span>
            </div>

            {/* Fairy House 2: Acorn Bell Tower */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-white border border-amber-200/80 shadow-2xs flex flex-col items-center text-center relative group hover:shadow-md transition-all">
              <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-2 right-2 animate-ping" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-200 via-yellow-100 to-orange-200 flex items-center justify-center text-3xl shadow-inner mb-2 group-hover:scale-110 transition-transform">
                🏰
              </div>
              <span className="text-xs font-bold text-stone-800 font-serif">Acorn Castle</span>
              <span className="text-[10px] text-amber-700 font-sans">Where fairy bells ring</span>
            </div>

            {/* Glowing Mushroom 2: Golden Chantrelle */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-200/80 shadow-2xs flex flex-col items-center text-center relative group hover:shadow-md transition-all">
              <motion.div
                animate={{ scale: [1, 1.08, 1], filter: ['brightness(1)', 'brightness(1.18)', 'brightness(1)'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-200 via-teal-200 to-amber-100 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(110,231,183,0.6)] mb-2 group-hover:scale-110 transition-transform"
              >
                🍄
              </motion.div>
              <span className="text-xs font-bold text-stone-800 font-serif">Sunfire Shroom</span>
              <span className="text-[10px] text-emerald-700 font-sans">Gentle warm nightlight</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3. INTERACTIVE FLOWERS GRID */}
          {/* ============================================================== */}
          <div className="mt-8">
            <div className="text-center mb-6">
              <span className="text-xs font-bold tracking-wider uppercase text-stone-500 font-sans">
                🌸 Click Any Flower Below to Reveal Its Secret Blessing for Savi 🌸
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {ENCHANTED_FLOWERS.map((flower) => {
                const isBloomed = bloomedIds.has(flower.id);
                const isSelected = activeFlower?.id === flower.id;

                return (
                  <motion.button
                    key={flower.id}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={(e) => handleFlowerClick(e, flower)}
                    type="button"
                    className={`p-4 rounded-3xl flex flex-col items-center justify-between text-center transition-all cursor-pointer relative overflow-hidden border-2 ${
                      isSelected
                        ? 'bg-white border-pink-400 shadow-fairy ring-2 ring-pink-300'
                        : `${flower.bgColor} hover:bg-white shadow-xs`
                    }`}
                  >
                    {/* Flower Badge Tag */}
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-bold text-stone-400 font-sans">
                        {flower.meaning.split(' ')[2] || 'Flower'}
                      </span>
                      {isBloomed && (
                        <span className="text-xs text-pink-500 animate-sparkle">✨</span>
                      )}
                    </div>

                    {/* Flower Icon / Bloom Graphic */}
                    <div className="my-2 relative flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl select-none filter drop-shadow-sm transition-transform duration-300 hover:rotate-12">
                        {flower.symbol}
                      </span>
                      {/* Luminous Glow behind bloomed flowers */}
                      {isBloomed && (
                        <div className="w-12 h-12 bg-pink-300/40 rounded-full blur-md absolute -z-10 animate-pulse" />
                      )}
                    </div>

                    {/* Flower Name */}
                    <span className="text-xs font-bold text-stone-800 font-serif leading-tight">
                      {flower.name}
                    </span>

                    {/* Bloom Status */}
                    <span
                      className={`text-[9px] font-bold tracking-wider uppercase mt-1 px-2 py-0.5 rounded-full ${
                        isBloomed
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-stone-200/70 text-stone-500'
                      }`}
                    >
                      {isBloomed ? 'Bloomed 💖' : 'Click Me!'}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ============================================================== */}
          {/* 4. REVEALED FLOWER BIRTHDAY WISH CARD */}
          {/* ============================================================== */}
          <AnimatePresence mode="wait">
            {activeFlower && (
              <motion.div
                key={activeFlower.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border-2 border-pink-200 shadow-fairy text-center max-w-2xl mx-auto relative overflow-hidden"
              >
                {/* Background pastel accent circles */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-pink-100/50 rounded-full blur-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-purple-100/50 rounded-full blur-xl pointer-events-none" />

                {/* Header with Flower Icon */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl">{activeFlower.symbol}</span>
                  <div className="text-left">
                    <span className="font-serif font-bold text-lg text-stone-800 block">
                      {activeFlower.name}'s Birthday Wish
                    </span>
                    <span className="text-[11px] text-pink-600 font-sans font-semibold">
                      {activeFlower.meaning}
                    </span>
                  </div>
                </div>

                {/* The Emotional Flower Wish */}
                <blockquote className="font-serif italic text-base sm:text-xl text-stone-800 mt-3 leading-relaxed font-medium">
                  "{activeFlower.wish}"
                </blockquote>

                {/* Footer Tag */}
                <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs text-stone-400 font-sans">
                  <span>🌸 Blessed for Savi's 1st Birthday</span>
                  <span className="text-pink-500 font-semibold">With Endless Fairy Love ❤️</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
