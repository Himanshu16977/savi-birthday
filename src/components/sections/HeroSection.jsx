import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Heart, Stars, Calendar, Clock, MapPin, Wand2, Flower2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayGirl, venueDetails } from '../../data/birthdayData';
import { fairyAudio } from '../../utils/soundEffects';

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [celebrateClicked, setCelebrateClicked] = useState(false);

  useEffect(() => {
    const targetDate = new Date(birthdayGirl.celebrationDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCelebrate = () => {
    setCelebrateClicked(true);
    fairyAudio.playWandBurst();

    // Multi-stage golden and pastel confetti burst
    confetti({
      particleCount: 100,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#ffd0e0', '#cfb7f0', '#99d2f6', '#f8dc81', '#ecc449', '#ffffff'],
      scalar: 1.15,
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#ffd0e0', '#f8dc81'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#cfb7f0', '#ecc449'],
      });
    }, 300);

    // Smoothly scroll to the celebration party details
    setTimeout(() => {
      const partySec = document.getElementById('celebration');
      if (partySec) {
        partySec.scrollIntoView({ behavior: 'smooth' });
      }
      setCelebrateClicked(false);
    }, 1200);
  };

  // Sparkle stars for the golden background
  const goldenSparkles = [
    { top: '12%', left: '8%', size: 14, delay: 0 },
    { top: '24%', left: '88%', size: 18, delay: 1.2 },
    { top: '48%', left: '4%', size: 12, delay: 2.1 },
    { top: '65%', left: '92%', size: 16, delay: 0.8 },
    { top: '80%', left: '14%', size: 15, delay: 1.7 },
    { top: '18%', left: '46%', size: 13, delay: 2.5 },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fffcf7] via-[#fff5f9] to-[#fcf6ff]"
    >
      {/* 1. GOLDEN SPARKLING BACKGROUND & RADIANT AURA */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Golden Shimmer Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[34rem] sm:w-[50rem] h-[34rem] sm:h-[50rem] bg-gradient-to-tr from-fairy-gold-200/35 via-fairy-pink-200/40 to-fairy-lavender-200/35 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-amber-200/25 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-fairy-lavender-200/35 rounded-full blur-3xl animate-float-reverse" />

        {/* Ambient Golden Stars */}
        {goldenSparkles.map((s, idx) => (
          <motion.div
            key={idx}
            className="absolute text-fairy-gold-400 select-none"
            style={{ top: s.top, left: s.left, fontSize: `${s.size}px` }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.25, 0.8],
              rotate: [0, 45, 90],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: s.delay,
              ease: 'easeInOut',
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* 2. PINK AND LAVENDER BALLOONS (Left and Right Clusters) */}
      {/* Left Balloon Cluster */}
      <div className="absolute left-2 sm:left-8 top-28 sm:top-36 pointer-events-none z-10 hidden md:block">
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [-2, 3, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Pink Balloon */}
          <div className="w-14 sm:w-18 h-18 sm:h-24 rounded-full bg-gradient-to-br from-fairy-pink-200 via-fairy-pink-300 to-rose-400 shadow-md relative opacity-90 border border-white/60">
            <span className="w-2.5 h-6 rounded-full bg-white/50 absolute top-3 left-3 -rotate-45" />
            {/* Knot & String */}
            <div className="w-2 h-2 bg-fairy-pink-400 rounded-full mx-auto absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <div className="w-0.5 h-20 bg-stone-300/80 mx-auto absolute top-full left-1/2 -translate-x-1/2 origin-top" />
          </div>

          {/* Lavender Balloon (Offset Behind) */}
          <div className="w-12 sm:w-16 h-16 sm:h-22 rounded-full bg-gradient-to-br from-fairy-lavender-200 via-fairy-lavender-300 to-purple-400 shadow-md relative -mt-10 ml-6 opacity-85 border border-white/60">
            <span className="w-2 h-5 rounded-full bg-white/50 absolute top-2.5 left-2.5 -rotate-45" />
            <div className="w-2 h-2 bg-fairy-lavender-400 rounded-full mx-auto absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <div className="w-0.5 h-24 bg-stone-300/80 mx-auto absolute top-full left-1/2 -translate-x-1/2 origin-top" />
          </div>
        </motion.div>
      </div>

      {/* Right Balloon Cluster */}
      <div className="absolute right-2 sm:right-8 top-32 sm:top-40 pointer-events-none z-10 hidden md:block">
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [2, -3, 2] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="relative"
        >
          {/* Lavender Balloon */}
          <div className="w-14 sm:w-18 h-18 sm:h-24 rounded-full bg-gradient-to-br from-fairy-lavender-200 via-fairy-lavender-300 to-purple-400 shadow-md relative opacity-90 border border-white/60">
            <span className="w-2.5 h-6 rounded-full bg-white/50 absolute top-3 left-3 -rotate-45" />
            <div className="w-2 h-2 bg-fairy-lavender-400 rounded-full mx-auto absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <div className="w-0.5 h-22 bg-stone-300/80 mx-auto absolute top-full left-1/2 -translate-x-1/2 origin-top" />
          </div>

          {/* Pink Balloon (Offset) */}
          <div className="w-12 sm:w-16 h-16 sm:h-22 rounded-full bg-gradient-to-br from-fairy-pink-200 via-fairy-pink-300 to-rose-400 shadow-md relative -mt-10 -ml-4 opacity-85 border border-white/60">
            <span className="w-2 h-5 rounded-full bg-white/50 absolute top-2.5 left-2.5 -rotate-45" />
            <div className="w-2 h-2 bg-fairy-pink-400 rounded-full mx-auto absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <div className="w-0.5 h-24 bg-stone-300/80 mx-auto absolute top-full left-1/2 -translate-x-1/2 origin-top" />
          </div>
        </motion.div>
      </div>

      {/* 3. FLOATING HEARTS AND BUTTERFLIES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Floating Hearts */}
        <motion.span
          className="absolute text-fairy-pink-400/70 text-lg sm:text-xl"
          style={{ left: '12%', top: '40%' }}
          animate={{ y: [0, -40, 0], x: [0, 15, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          💖
        </motion.span>
        <motion.span
          className="absolute text-fairy-lavender-400/70 text-base sm:text-lg"
          style={{ right: '15%', top: '55%' }}
          animate={{ y: [0, -45, 0], x: [0, -12, 0], opacity: [0.3, 0.85, 0.3] }}
          transition={{ duration: 6.5, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
        >
          💕
        </motion.span>

        {/* Floating Fairy Butterflies */}
        <motion.span
          className="absolute text-xl sm:text-2xl filter drop-shadow-sm select-none"
          style={{ left: '20%', top: '22%' }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 10, 0],
            rotate: [0, 12, -8, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          🦋
        </motion.span>
        <motion.span
          className="absolute text-xl sm:text-2xl filter drop-shadow-sm select-none"
          style={{ right: '22%', top: '26%' }}
          animate={{
            x: [0, -25, 20, 0],
            y: [0, -20, 15, 0],
            rotate: [0, -10, 15, 0],
          }}
          transition={{ duration: 7.5, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
        >
          🦋
        </motion.span>
      </div>

      {/* 4. MAIN INVITATION CARD CONTAINER */}
      <div className="relative z-20 max-w-5xl mx-auto text-center">
        {/* Royal Princess Ribbon Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-fairy border border-fairy-gold-300/60 shadow-sm mb-6"
        >
          <Crown className="w-4 h-4 text-fairy-gold-500 animate-sparkle" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-fairy-gold-600 font-sans">
            Royal Invitation • Princess Savi Turns One
          </span>
          <Stars className="w-4 h-4 text-fairy-lavender-400" />
        </motion.div>

        {/* 5. PRINCESS-STYLE MAIN HEADING & SUPPORTING TEXT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {/* Main Heading requested by user: "Happy 1st Birthday, Savi Gangwar! 🎂" */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-stone-800 leading-[1.15]">
            Happy <span className="font-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-fairy-pink-500 font-normal">1st</span> Birthday,
            <br />
            <span className="text-fairy-gradient">Savi Gangwar!</span> 🎂
          </h1>

          {/* Supporting text requested by user: "One year of smiles, one year of happiness, and a lifetime of love." */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-stone-600 mt-5 max-w-3xl mx-auto leading-relaxed">
            "One year of smiles, one year of happiness, and a lifetime of love."
          </p>
        </motion.div>

        {/* 6. ANIMATED BIRTHDAY CAKE ILLUSTRATION (Centerpiece) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="my-10 relative inline-flex flex-col items-center justify-center"
        >
          {/* Ambient Candle Glow Behind */}
          <div className="absolute top-2 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none animate-pulse" />

          {/* Flickering Candle Flame */}
          <motion.div
            animate={{
              scale: [1, 1.18, 0.95, 1.12],
              rotate: [-2, 3, -1, 2, 0],
            }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-30 flex flex-col items-center cursor-pointer"
            onClick={handleCelebrate}
            title="Click to celebrate with Savi!"
          >
            {/* Flame Glow */}
            <div className="w-6 h-9 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-amber-100 blur-[1px] shadow-gold-glow" />
            <div className="w-2.5 h-5 rounded-full bg-white absolute top-1 blur-[0.5px]" />
          </motion.div>

          {/* Golden Candle Stick with '1' topper */}
          <div className="w-3.5 h-10 rounded-t-sm bg-gradient-to-b from-amber-200 via-fairy-gold-300 to-amber-300 border border-amber-400/50 shadow-sm relative z-20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-amber-900 font-serif">1</span>
          </div>

          {/* Tier 1 (Top Tier - Pastel Pink with Cream Frosting Drips) */}
          <div className="w-36 sm:w-44 h-12 rounded-t-2xl bg-gradient-to-r from-fairy-pink-200 via-fairy-pink-300 to-fairy-pink-200 shadow-sm border-2 border-white flex items-center justify-center relative -mt-1 z-10">
            <span className="text-xs font-bold text-fairy-pink-700 tracking-wider">
              🌸 Princess Savi 🌸
            </span>
            {/* Scalloped pearls */}
            <div className="absolute -bottom-1 inset-x-0 flex justify-around">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
              ))}
            </div>
          </div>

          {/* Tier 2 (Middle Tier - Dreamy Lavender with Golden Sugar Pearls) */}
          <div className="w-52 sm:w-64 h-14 rounded-t-2xl bg-gradient-to-r from-fairy-lavender-200 via-fairy-lavender-300 to-fairy-lavender-200 shadow-md border-2 border-white flex items-center justify-center relative -mt-1 z-0">
            <span className="font-script text-xl sm:text-2xl text-stone-700 font-semibold">
              Sweetest First Year
            </span>
            <div className="absolute -bottom-1 inset-x-0 flex justify-around">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="w-3 h-3 rounded-full bg-fairy-gold-200 shadow-xs" />
              ))}
            </div>
          </div>

          {/* Tier 3 (Bottom Tier - Cream White & Baby Blue Garden Base) */}
          <div className="w-68 sm:w-84 h-16 rounded-t-3xl bg-gradient-to-r from-fairy-blue-200 via-[#fffaf3] to-fairy-pink-200 shadow-lg border-2 border-white flex items-center justify-center relative -mt-1">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-serif italic text-stone-600">
              <span>✨ 365 Days of Pure Magic</span>
              <span>•</span>
              <span>Nov 8, 2026 ✨</span>
            </div>
          </div>

          {/* Golden Royal Cake Stand */}
          <div className="w-76 sm:w-92 h-3.5 rounded-full bg-gradient-to-r from-fairy-gold-300 via-amber-200 to-fairy-gold-300 shadow-fairy border border-white" />
          <div className="w-28 h-5 rounded-b-xl bg-gradient-to-b from-fairy-gold-200 to-fairy-gold-300 shadow-md" />
        </motion.div>

        {/* 7. CELEBRATION BUTTON: "Celebrate With Savi ❤️" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCelebrate}
            type="button"
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-fairy-pink-400 via-fairy-lavender-400 to-fairy-gold-400 text-white font-bold text-base sm:text-lg shadow-fairy hover:shadow-fairy-hover transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Shimmer line */}
            <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <Sparkles className="w-5 h-5 text-fairy-gold-200 animate-sparkle" />
            <span>Celebrate With Savi ❤️</span>
            <Heart className="w-5 h-5 text-rose-200 fill-white" />
          </motion.button>

          {/* Secondary Action: Explore Milestones */}
          <a
            href="#milestones"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-4 rounded-full bg-white/80 hover:bg-white text-stone-700 font-semibold text-sm sm:text-base border border-fairy-pink-200 hover:border-fairy-pink-300 shadow-sm transition-all transform hover:-translate-y-0.5"
          >
            <Flower2 className="w-4 h-4 text-fairy-pink-400" />
            <span>Read 12-Month Story</span>
          </a>
        </motion.div>

        {/* 8. LIVE COUNTDOWN & INVITATION SUMMARY BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 max-w-2xl mx-auto rounded-3xl glass-fairy-card border border-white/90 p-5 sm:p-6 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-fairy-gold-600 uppercase tracking-widest mb-1">
                <Calendar className="w-3.5 h-3.5 text-fairy-gold-500" />
                <span>The Big Celebration</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-800">
                {birthdayGirl.celebrationDateFormatted}
              </h4>
              <p className="text-xs text-stone-500 font-sans">
                {venueDetails.hall}, {venueDetails.city}
              </p>
            </div>

            {/* Countdown Compact Digits */}
            <div className="flex items-center gap-2">
              {[
                { label: 'D', val: timeLeft.days },
                { label: 'H', val: timeLeft.hours },
                { label: 'M', val: timeLeft.minutes },
                { label: 'S', val: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="px-2.5 py-1.5 rounded-xl bg-white/90 border border-fairy-pink-100 shadow-xs flex flex-col items-center">
                  <span className="font-serif font-bold text-base text-stone-800">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-stone-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
