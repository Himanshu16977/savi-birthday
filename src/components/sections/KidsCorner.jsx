import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PartyPopper,
  Sparkles,
  Music,
  RotateCcw,
  Trophy,
  Play,
  Volume2,
  Heart,
  Smile,
  Stars,
  Wand2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { fairyAudio } from '../../utils/soundEffects';

// Pastel rainbow xylophone keys with exact musical notes
const XYLOPHONE_KEYS = [
  { note: 'C', name: 'Do', freq: 523.25, color: 'bg-rose-300 hover:bg-rose-400 text-rose-900 border-rose-400', height: 'h-48' },
  { note: 'D', name: 'Re', freq: 587.33, color: 'bg-amber-300 hover:bg-amber-400 text-amber-900 border-amber-400', height: 'h-44' },
  { note: 'E', name: 'Mi', freq: 659.25, color: 'bg-yellow-300 hover:bg-yellow-400 text-yellow-900 border-yellow-400', height: 'h-40' },
  { note: 'F', name: 'Fa', freq: 698.46, color: 'bg-emerald-300 hover:bg-emerald-400 text-emerald-900 border-emerald-400', height: 'h-36' },
  { note: 'G', name: 'Sol', freq: 783.99, color: 'bg-sky-300 hover:bg-sky-400 text-sky-900 border-sky-400', height: 'h-32' },
  { note: 'A', name: 'La', freq: 880.00, color: 'bg-indigo-300 hover:bg-indigo-400 text-indigo-900 border-indigo-400', height: 'h-28' },
  { note: 'B', name: 'Ti', freq: 987.77, color: 'bg-purple-300 hover:bg-purple-400 text-purple-900 border-purple-400', height: 'h-24' },
  { note: 'C²', name: 'Do', freq: 1046.5, color: 'bg-pink-300 hover:bg-pink-400 text-pink-900 border-pink-400', height: 'h-20' },
];

// Nursery Rhymes melody notes for auto-play
const NURSERY_RHYMES = [
  {
    name: '🌟 Twinkle Twinkle',
    notes: [523.25, 523.25, 783.99, 783.99, 880.0, 880.0, 783.99, 698.46, 698.46, 659.25, 659.25, 587.33, 587.33, 523.25],
  },
  {
    name: '🐑 Mary Had a Little Lamb',
    notes: [659.25, 587.33, 523.25, 587.33, 659.25, 659.25, 659.25, 587.33, 587.33, 587.33, 659.25, 783.99, 783.99],
  },
  {
    name: '🎂 Happy Birthday',
    notes: [523.25, 523.25, 587.33, 523.25, 698.46, 659.25, 523.25, 523.25, 587.33, 523.25, 783.99, 698.46],
  },
];

// Balloon colors for the game
const BALLOON_PALETTES = [
  { bg: 'from-pink-300 to-rose-400', border: 'border-pink-200', text: '🌸' },
  { bg: 'from-purple-300 to-indigo-400', border: 'border-purple-200', text: '🪻' },
  { bg: 'from-sky-300 to-blue-400', border: 'border-sky-200', text: '🩵' },
  { bg: 'from-amber-200 to-yellow-400', border: 'border-yellow-200', text: '✨' },
  { bg: 'from-emerald-300 to-teal-400', border: 'border-emerald-200', text: '🌿' },
  { bg: 'from-rose-300 to-pink-400', border: 'border-rose-200', text: '💖' },
];

function generateBalloons(count = 8) {
  return Array.from({ length: count }, (_, i) => {
    const palette = BALLOON_PALETTES[i % BALLOON_PALETTES.length];
    return {
      id: Math.random(),
      palette,
      left: 8 + (i * 11) + (Math.random() * 4),
      floatDuration: 4.5 + Math.random() * 3,
      delay: Math.random() * 2,
      scale: 0.9 + Math.random() * 0.3,
    };
  });
}

export default function KidsCorner() {
  // Balloon Game State
  const [balloons, setBalloons] = useState(() => generateBalloons(8));
  const [popScore, setPopScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('savi_balloon_pop_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });

  // Xylophone State
  const [activeKey, setActiveKey] = useState(null);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);

  // Pop a balloon
  const handlePopBalloon = (e, balloonId) => {
    e.stopPropagation();

    // Sound effect
    fairyAudio.playBalloonPop();

    // Trigger local mini confetti burst at cursor
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#ffd0e0', '#cfb7f0', '#99d2f6', '#f8dc81'],
      scalar: 0.8,
    });

    // Update score
    setPopScore((prev) => {
      const newScore = prev + 1;
      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem('savi_balloon_pop_highscore', newScore.toString());
        } catch {
          // Ignored
        }
      }
      return newScore;
    });

    // Remove popped balloon and respawn a new one shortly
    setBalloons((prev) => prev.filter((b) => b.id !== balloonId));

    setTimeout(() => {
      const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];
      const newBalloon = {
        id: Math.random(),
        palette,
        left: 5 + Math.random() * 85,
        floatDuration: 4.5 + Math.random() * 3,
        delay: 0,
        scale: 0.9 + Math.random() * 0.3,
      };
      setBalloons((prev) => [...prev, newBalloon]);
    }, 600);
  };

  const handleResetBalloons = () => {
    fairyAudio.playSparkle(1050, 0.2);
    setBalloons(generateBalloons(8));
    setPopScore(0);
  };

  // Play a single xylophone key
  const handlePlayKey = (key) => {
    setActiveKey(key.note);
    fairyAudio.playXylophoneNote(key.freq);
    setTimeout(() => setActiveKey(null), 300);
  };

  // Auto-play a nursery rhyme
  const handlePlayMelody = (melody) => {
    if (isPlayingMelody) return;
    setIsPlayingMelody(true);

    melody.notes.forEach((freq, idx) => {
      setTimeout(() => {
        const matchingKey = XYLOPHONE_KEYS.find((k) => Math.abs(k.freq - freq) < 5);
        if (matchingKey) setActiveKey(matchingKey.note);
        fairyAudio.playXylophoneNote(freq);

        setTimeout(() => setActiveKey(null), 250);

        if (idx === melody.notes.length - 1) {
          setTimeout(() => setIsPlayingMelody(false), 500);
        }
      }, idx * 420);
    });
  };

  return (
    <section id="kids-corner" className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-transparent via-amber-50/40 to-transparent">
      {/* Playful Floating Cloud Background Elements */}
      <div className="absolute top-12 left-10 text-4xl opacity-40 animate-float-slow pointer-events-none">☁️</div>
      <div className="absolute top-28 right-12 text-3xl opacity-40 animate-float-reverse pointer-events-none">☁️</div>
      <div className="absolute bottom-20 left-16 text-3xl opacity-40 animate-float-slow pointer-events-none">⭐</div>
      <div className="absolute bottom-24 right-20 text-4xl opacity-40 animate-float-reverse pointer-events-none">🌈</div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-200 via-amber-200 to-sky-200 border border-white shadow-xs mb-3">
            <span className="text-sm">🎈</span>
            <span className="text-xs font-bold tracking-wider uppercase text-stone-800 font-sans">
              Play Zone For Kids & Toddlers
            </span>
            <span className="text-sm">🎶</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
            Little Kids' <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500">Magical Corner</span>
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-3 max-w-xl mx-auto">
            "Pop cheerful birthday balloons, strike the rainbow xylophone, and play sweet nursery songs!"
          </p>
        </div>

        {/* 1. POP THE BIRTHDAY BALLOONS 🎈 MINIGAME */}
        <div className="mb-20">
          <div className="p-6 sm:p-10 rounded-3xl glass-fairy-card bg-white/95 border-2 border-fairy-pink-300 shadow-fairy relative overflow-hidden">
            {/* Game Header Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-6 border-b border-fairy-pink-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-200 via-amber-200 to-rose-200 flex items-center justify-center text-2xl shadow-inner">
                  🎈
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-2xl font-bold text-stone-800">
                    Pop the Birthday Balloons!
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Tap or click floating balloons to pop them with confetti!
                  </p>
                </div>
              </div>

              {/* Score Badges & Reset Button */}
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-2xl bg-fairy-pink-50 border border-fairy-pink-200 flex items-center gap-2 shadow-xs">
                  <span className="text-xs uppercase font-bold text-fairy-pink-600">Popped:</span>
                  <span className="font-serif font-bold text-xl text-fairy-pink-600">{popScore} 🎈</span>
                </div>

                <div className="px-4 py-2 rounded-2xl bg-fairy-gold-50 border border-fairy-gold-200 flex items-center gap-2 shadow-xs">
                  <Trophy className="w-4 h-4 text-fairy-gold-600" />
                  <span className="font-serif font-bold text-base text-stone-700">{highScore}</span>
                </div>

                <button
                  onClick={handleResetBalloons}
                  type="button"
                  className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                  title="Respawn all balloons"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Balloon Arena (Sky View) */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-sky-100/60 via-purple-50/50 to-pink-100/50 border border-sky-200/70 overflow-hidden select-none cursor-pointer">
              {/* Subtle background clouds */}
              <div className="absolute top-4 left-6 text-2xl opacity-40 pointer-events-none">☁️</div>
              <div className="absolute top-16 right-10 text-2xl opacity-40 pointer-events-none">☁️</div>
              <div className="absolute bottom-6 left-1/3 text-2xl opacity-30 pointer-events-none">☁️</div>

              {/* Animated Floating Balloons */}
              <AnimatePresence>
                {balloons.map((b) => (
                  <motion.div
                    key={b.id}
                    onClick={(e) => handlePopBalloon(e, b.id)}
                    initial={{ y: 350, opacity: 0, scale: b.scale }}
                    animate={{
                      y: [350, -60],
                      x: [0, 15, -15, 10, 0],
                      opacity: [0, 1, 1, 0.9],
                    }}
                    exit={{
                      scale: 1.4,
                      opacity: 0,
                      filter: 'blur(4px)',
                      transition: { duration: 0.15 },
                    }}
                    transition={{
                      duration: b.floatDuration,
                      repeat: Infinity,
                      delay: b.delay,
                      ease: 'easeInOut',
                    }}
                    style={{ left: `${b.left}%` }}
                    className="absolute bottom-0 cursor-pointer group"
                  >
                    {/* Balloon Body */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.8 }}
                      className={`w-14 sm:w-16 h-18 sm:h-20 rounded-full bg-gradient-to-b ${b.palette.bg} border-2 ${b.palette.border} shadow-md flex items-center justify-center relative`}
                    >
                      {/* Shine Highlight */}
                      <span className="w-2.5 h-6 rounded-full bg-white/60 absolute top-2.5 left-2.5 -rotate-45" />

                      <span className="text-base select-none">{b.palette.text}</span>

                      {/* Balloon Knot & Ribbon */}
                      <div className="w-2.5 h-2 bg-stone-700/30 rounded-full absolute -bottom-1 left-1/2 -translate-x-1/2" />
                      <div className="w-0.5 h-10 bg-stone-400/70 absolute top-full left-1/2 -translate-x-1/2 origin-top" />
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Floating Arena Hint */}
              <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                <span className="text-xs font-semibold text-stone-500 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full shadow-2xs">
                  Tap any balloon to POP it! 💥
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PLAY BABY MUSIC 🎵 (Pastel Rainbow Xylophone & Nursery Songs) */}
        <div>
          <div className="p-6 sm:p-10 rounded-3xl glass-fairy-card bg-white/95 border-2 border-fairy-lavender-300 shadow-fairy">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-6 border-b border-fairy-lavender-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-200 via-sky-200 to-pink-200 flex items-center justify-center text-2xl shadow-inner">
                  🎵
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-2xl font-bold text-stone-800">
                    Play Baby Music
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Strike the rainbow xylophone keys or play nursery songs!
                  </p>
                </div>
              </div>

              {/* Melody Song Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-stone-500 hidden sm:inline">
                  Autoplay Songs:
                </span>
                {NURSERY_RHYMES.map((song) => (
                  <button
                    key={song.name}
                    disabled={isPlayingMelody}
                    onClick={() => handlePlayMelody(song)}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-fairy-lavender-200 text-stone-700 text-xs font-semibold shadow-2xs transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-fairy-lavender-500 fill-fairy-lavender-400" />
                    <span>{song.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rainbow Xylophone Instrument */}
            <div className="py-6 px-2 flex items-end justify-center gap-2 sm:gap-3 bg-gradient-to-b from-stone-50 to-fairy-cream rounded-2xl border border-stone-200/80 shadow-inner">
              {XYLOPHONE_KEYS.map((k) => {
                const isActive = activeKey === k.note;

                return (
                  <motion.button
                    key={k.note}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handlePlayKey(k)}
                    type="button"
                    className={`w-10 sm:w-16 ${k.height} ${k.color} rounded-2xl border-b-4 shadow-md flex flex-col items-center justify-between py-3 cursor-pointer transition-all ${
                      isActive ? 'brightness-125 ring-4 ring-white scale-105' : ''
                    }`}
                  >
                    {/* Metal Screw Head Graphic Top & Bottom */}
                    <div className="w-2.5 h-2.5 rounded-full bg-stone-700/30 shadow-inner" />

                    <div className="text-center select-none">
                      <span className="block font-bold text-base sm:text-lg">{k.name}</span>
                      <span className="block text-[10px] font-sans opacity-70 font-bold">{k.note}</span>
                    </div>

                    <div className="w-2.5 h-2.5 rounded-full bg-stone-700/30 shadow-inner" />
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Musical Mallet Hint */}
            <div className="mt-4 text-center">
              <span className="text-xs text-stone-400 font-sans">
                🎶 Strike each colorful bar to compose your own melody for baby Savi!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

