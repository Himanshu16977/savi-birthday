import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Stars, Crown, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fairyAudio } from '../../utils/soundEffects';

const BLESSINGS_DATA = [
  {
    id: 1,
    title: 'May you always stay happy.',
    meaning: 'Eternal Joy & Giggles',
    description: 'May your heart always be light, carefree, and filled with the brightest giggles that make the whole world smile with you.',
    bgGradient: 'from-pink-100/90 via-pink-50/80 to-rose-100/70',
    borderColor: 'border-fairy-gold-300 hover:border-fairy-gold-400',
    heartColor: 'text-rose-500 fill-rose-300',
    accentBadge: 'bg-rose-100/80 text-rose-700',
    number: '01',
    symbol: '🌸',
  },
  {
    id: 2,
    title: 'May your dreams come true.',
    meaning: 'Stardust Dreams',
    description: 'May every sweet prayer whispered to the nighttime stars take flight on gentle fairy wings and blossom into reality.',
    bgGradient: 'from-purple-100/90 via-purple-50/80 to-indigo-100/70',
    borderColor: 'border-fairy-gold-300 hover:border-fairy-gold-400',
    heartColor: 'text-purple-500 fill-purple-300',
    accentBadge: 'bg-purple-100/80 text-purple-700',
    number: '02',
    symbol: '✨',
  },
  {
    id: 3,
    title: 'May your smile never fade.',
    meaning: 'Pure Radiance',
    description: 'Your innocent grin is the sweetest melody in our home. May life always give you endless reasons to smile warmly.',
    bgGradient: 'from-sky-100/90 via-sky-50/80 to-cyan-100/70',
    borderColor: 'border-fairy-gold-300 hover:border-fairy-gold-400',
    heartColor: 'text-sky-500 fill-sky-300',
    accentBadge: 'bg-sky-100/80 text-sky-700',
    number: '03',
    symbol: '☀️',
  },
  {
    id: 4,
    title: 'May your life be filled with love.',
    meaning: 'Infinite Warmth',
    description: 'May you be forever embraced by deep family affection, loyal friendships, and genuine kindness everywhere your journey leads.',
    bgGradient: 'from-rose-100/90 via-rose-50/80 to-amber-100/70',
    borderColor: 'border-fairy-gold-300 hover:border-fairy-gold-400',
    heartColor: 'text-pink-600 fill-pink-400',
    accentBadge: 'bg-rose-100/80 text-rose-700',
    number: '04',
    symbol: '💖',
  },
  {
    id: 5,
    title: 'May you always shine like a star.',
    meaning: 'Little Guiding Light',
    description: 'May your gentle spirit, bravery, and innocence illuminate the lives of everyone blessed to know our precious little princess.',
    bgGradient: 'from-amber-100/90 via-amber-50/80 to-yellow-100/70',
    borderColor: 'border-fairy-gold-300 hover:border-fairy-gold-400',
    heartColor: 'text-amber-500 fill-amber-300',
    accentBadge: 'bg-amber-100/80 text-amber-800',
    number: '05',
    symbol: '⭐',
  },
];

export default function PrincessBlessings() {
  const [blessedCardId, setBlessedCardId] = useState(null);

  const handleCardClick = (e, item) => {
    setBlessedCardId(item.id);
    fairyAudio.playSparkle(1120, 0.3);

    // Mini heart sparkle burst
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 55,
      origin: { x, y },
      colors: ['#ffd0e0', '#cfb7f0', '#f8dc81', '#ff7fa7'],
      scalar: 0.85,
    });

    setTimeout(() => {
      setBlessedCardId(null);
    }, 1800);
  };

  return (
    <section
      id="princess-blessings"
      className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-fairy-pink-50/40 to-transparent overflow-hidden"
    >
      {/* Background Ambient Glows & Stars */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] sm:w-[48rem] h-[34rem] sm:h-[48rem] bg-gradient-to-tr from-pink-200/35 via-purple-200/30 to-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-16 left-12 text-2xl text-amber-300 opacity-50 animate-float-slow">✨</span>
        <span className="absolute top-24 right-16 text-3xl text-pink-300 opacity-40 animate-float-reverse">⭐</span>
        <span className="absolute bottom-20 left-20 text-3xl text-purple-300 opacity-40 animate-float-slow">💖</span>
        <span className="absolute bottom-24 right-24 text-2xl text-amber-300 opacity-50 animate-float-reverse">✨</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-gold-300 shadow-xs mb-3">
            <Crown className="w-4 h-4 text-fairy-gold-500 animate-sparkle" />
            <span className="text-xs font-bold tracking-wider uppercase text-fairy-gold-600 font-sans">
              Everlasting Prayers & Love
            </span>
            <Heart className="w-3.5 h-3.5 text-fairy-pink-500 fill-fairy-pink-400" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
            Blessings for Our <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500">Little Princess</span>
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-2 max-w-xl mx-auto">
            "Five golden blessings whispered from the depths of our hearts, to guide Savi through a lifetime of wonder."
          </p>
        </div>

        {/* 5 Heartfelt Blessing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {BLESSINGS_DATA.map((item, index) => {
            const isBlessed = blessedCardId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={(e) => handleCardClick(e, item)}
                className={`p-7 sm:p-8 rounded-3xl bg-gradient-to-br ${item.bgGradient} border-2 ${item.borderColor} shadow-fairy hover:shadow-fairy-hover transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between group`}
              >
                {/* Corner Golden Flourish Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-fairy-gold-200/60 to-transparent rounded-bl-3xl pointer-events-none" />

                <div>
                  {/* Card Top Row: Heart Icon & Serial Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-white/90 border border-fairy-gold-300/80 shadow-sm flex items-center justify-center relative group-hover:scale-110 transition-transform">
                      <Heart className={`w-7 h-7 ${item.heartColor} animate-pulse`} />
                      <span className="absolute -top-1.5 -right-1.5 text-xs">{item.symbol}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${item.accentBadge}`}>
                        {item.meaning}
                      </span>
                      <span className="font-serif font-black text-xl text-stone-300/80">
                        {item.number}
                      </span>
                    </div>
                  </div>

                  {/* Main Blessing Title (Exact Prompt Text) */}
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-800 leading-snug mb-3">
                    "{item.title}"
                  </h3>

                  {/* Loving Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Row: Click Blessing Confirmation */}
                <div className="mt-6 pt-4 border-t border-fairy-gold-200/60 flex items-center justify-between text-xs font-semibold text-stone-500">
                  <span className="font-serif italic text-pink-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-fairy-gold-500" />
                    <span>For Baby Savi</span>
                  </span>

                  <span className="text-[11px] text-stone-400 group-hover:text-pink-600 transition-colors">
                    {isBlessed ? '✨ Blessed with Love! ✨' : 'Tap to Bless 💖'}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* 6th Card: Grand Family Dedication Card to complete the balanced grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white/95 via-fairy-gold-50/70 to-pink-50/80 border-2 border-fairy-gold-300 shadow-fairy flex flex-col justify-between text-center relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-radial from-fairy-gold-100/50 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-200 via-fairy-gold-200 to-purple-200 flex items-center justify-center shadow-inner mb-3">
                <Crown className="w-7 h-7 text-fairy-gold-600 animate-sparkle" />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest text-fairy-gold-600 mb-1">
                From All of Us
              </span>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-800 leading-snug">
                "Forever Cherished, Little Savi"
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-serif italic leading-relaxed">
                "One year ago you brought heaven closer to earth. May the angels always dance beside you."
              </p>
            </div>

            <div className="relative z-10 mt-5 pt-4 border-t border-fairy-gold-200/60">
              <span className="text-xs font-bold text-pink-600 font-sans">
                Happy 1st Birthday, Savi Gangwar! 🎂
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
