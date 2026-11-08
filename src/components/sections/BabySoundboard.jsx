import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Heart, Bell, Baby, Wand2, Cake, Wind, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fairyAudio } from '../../utils/soundEffects';

export default function BabySoundboard() {
  const [activePad, setActivePad] = useState(null);

  const soundPads = [
    {
      id: 'coo',
      title: 'Baby Coo & Giggles',
      emoji: '🍼',
      subtext: 'Sweet musical baby laughter',
      color: 'from-pink-100 via-rose-100 to-white',
      border: 'border-pink-200',
      action: () => fairyAudio.playBabyCoo(),
    },
    {
      id: 'fanfare',
      title: 'Birthday Fanfare',
      emoji: '🎂',
      subtext: 'Joyful celebration chimes',
      color: 'from-amber-100 via-yellow-100 to-white',
      border: 'border-amber-200',
      action: () => {
        fairyAudio.playBirthdayFanfare();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ffd0e0', '#f8dc81'],
        });
      },
    },
    {
      id: 'wand',
      title: 'Fairy Wand Cascade',
      emoji: '🪄',
      subtext: 'Sparkling magical stardust',
      color: 'from-purple-100 via-lavender-100 to-white',
      border: 'border-purple-200',
      action: () => fairyAudio.playWandBurst(),
    },
    {
      id: 'heartbeat',
      title: 'Warm Heartbeat',
      emoji: '💖',
      subtext: 'Gentle, comforting baby rhythm',
      color: 'from-rose-100 via-pink-100 to-white',
      border: 'border-rose-200',
      action: () => fairyAudio.playHeartbeat(),
    },
    {
      id: 'chimes',
      title: 'Blossom Wind Chimes',
      emoji: '🌸',
      subtext: 'Ethereal garden breeze bells',
      color: 'from-emerald-100 via-teal-100 to-white',
      border: 'border-emerald-200',
      action: () => fairyAudio.playWindChimes(),
    },
    {
      id: 'lullaby',
      title: 'Music Box Lullaby',
      emoji: '🎶',
      subtext: 'Twinkle Twinkle Little Star',
      color: 'from-blue-100 via-sky-100 to-white',
      border: 'border-blue-200',
      action: () => {
        fairyAudio.toggleLullaby();
      },
    },
  ];

  const handlePlayPad = (pad) => {
    setActivePad(pad.id);
    pad.action();
    setTimeout(() => setActivePad(null), 1200);
  };

  return (
    <section className="relative py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-lavender-200 shadow-sm mb-3">
          <Music className="w-4 h-4 text-fairy-lavender-500" />
          <span className="text-xs font-semibold tracking-wider uppercase text-fairy-lavender-500 font-sans">
            Interactive Sound Garden
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          Savi's Fairyland <span className="font-script text-4xl sm:text-5xl text-fairy-pink-500">Melody Garden</span>
        </h2>
        <p className="font-serif italic text-sm sm:text-base text-stone-600 mt-2 max-w-lg mx-auto">
          "Tap on any enchanted sound pad to play soft baby chimes, laughter, and fairy lullabies."
        </p>

        {/* Sound Pads Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 mt-10">
          {soundPads.map((pad) => {
            const isActive = activePad === pad.id;

            return (
              <motion.button
                key={pad.id}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handlePlayPad(pad)}
                type="button"
                className={`p-4 rounded-3xl bg-gradient-to-br ${pad.color} border-2 ${pad.border} shadow-sm hover:shadow-fairy transition-all flex flex-col items-center justify-between min-h-[140px] cursor-pointer group relative overflow-hidden ${
                  isActive ? 'ring-2 ring-fairy-pink-400 scale-105' : ''
                }`}
              >
                {/* Active ripple wave */}
                {isActive && (
                  <span className="absolute inset-0 bg-white/40 animate-ping rounded-3xl pointer-events-none" />
                )}

                <span className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300">
                  {pad.emoji}
                </span>

                <div className="text-center w-full">
                  <span className="font-serif font-bold text-xs sm:text-sm text-stone-800 block truncate">
                    {pad.title}
                  </span>
                  <span className="text-[10px] text-stone-500 font-sans block mt-0.5 line-clamp-1">
                    {pad.subtext}
                  </span>
                </div>

                <div className="mt-2 text-[10px] text-stone-400 flex items-center gap-1 font-sans">
                  <Volume2 className="w-3 h-3 text-stone-400" />
                  <span>Tap to Play</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

