import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, MailOpen, Crown, Stars, Feather, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fairyAudio } from '../../utils/soundEffects';

export default function BrotherLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    fairyAudio.playWandBurst();

    // Multi-color heart & stardust confetti shower
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#ffd0e0', '#cfb7f0', '#f8dc81', '#ff7fa7', '#ffffff'],
      shapes: ['circle'],
      scalar: 1.1,
    });
  };

  const handleCloseEnvelope = () => {
    setIsOpen(false);
    fairyAudio.playSparkle(850, 0.2);
  };

  return (
    <section id="brother-letter" className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-transparent via-fairy-pink-50/50 to-transparent">
      {/* Ambient Dreamy Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] sm:w-[48rem] h-[36rem] sm:h-[48rem] bg-gradient-to-tr from-fairy-lavender-200/40 via-fairy-pink-200/45 to-fairy-gold-100/35 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Animated Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[
          { id: 1, left: '10%', top: '35%', delay: 0, duration: 6, emoji: '💖' },
          { id: 2, left: '85%', top: '25%', delay: 1.5, duration: 7, emoji: '💕' },
          { id: 3, left: '18%', top: '75%', delay: 2.2, duration: 6.5, emoji: '💗' },
          { id: 4, left: '80%', top: '70%', delay: 0.8, duration: 7.5, emoji: '✨' },
          { id: 5, left: '50%', top: '15%', delay: 3, duration: 8, emoji: '🌸' },
        ].map((item) => (
          <motion.div
            key={item.id}
            className="absolute text-xl sm:text-2xl select-none opacity-60"
            style={{ left: item.left, top: item.top }}
            animate={{
              y: [0, -35, 0],
              x: [0, 15, -15, 0],
              scale: [0.9, 1.2, 0.9],
              opacity: [0.4, 0.85, 0.4],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-20">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-pink-200 shadow-sm mb-3">
          <Heart className="w-4 h-4 text-fairy-pink-500 fill-fairy-pink-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-fairy-pink-600 font-sans">
            A Keepsake From The Heart
          </span>
          <Sparkles className="w-4 h-4 text-fairy-gold-400" />
        </div>

        {/* Main Heading requested by user: "A Letter From Your Brother ❤️" */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
          A Letter From <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500 font-normal">Your Brother</span> ❤️
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-3 max-w-lg mx-auto">
          "A special brotherly bond sealed with endless love and golden stardust."
        </p>

        {/* Envelope & Letter Container */}
        <div className="my-12 relative flex flex-col items-center justify-center min-h-[460px]">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED ENVELOPE (Lavender & Pink with Golden Heart Seal) */
              <motion.div
                key="closed-envelope"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                onClick={handleOpenEnvelope}
                className="relative w-80 sm:w-96 h-56 sm:h-64 rounded-3xl cursor-pointer group shadow-fairy hover:shadow-fairy-hover transition-all duration-300"
              >
                {/* Envelope Body (Lavender & Pink Gradient) */}
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#f5ebfc] via-[#ffe6ef] to-[#ebdcf8] border-2 border-white p-5 flex flex-col justify-between relative overflow-hidden">
                  {/* Decorative background fold lines */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                  {/* To & From Ribbon */}
                  <div className="flex items-center justify-between text-xs text-stone-500 font-sans">
                    <span className="font-semibold text-fairy-lavender-500 flex items-center gap-1">
                      <Stars className="w-3.5 h-3.5" />
                      <span>For Princess Savi</span>
                    </span>
                    <span className="font-serif italic text-fairy-pink-500">
                      With Brother's Love
                    </span>
                  </div>

                  {/* Center Hint Label */}
                  <div className="text-center space-y-1">
                    <p className="font-script text-3xl sm:text-4xl text-stone-700 font-semibold group-hover:text-fairy-pink-600 transition-colors">
                      Tap to Open Letter
                    </p>
                    <p className="text-[11px] text-stone-400 font-sans tracking-wide uppercase">
                      Sealed with a Golden Heart
                    </p>
                  </div>

                  {/* Bottom postage stamp accent */}
                  <div className="flex items-center justify-between text-[11px] text-stone-400 border-t border-fairy-pink-200/50 pt-2">
                    <span>1st Birthday Keepsake</span>
                    <span>✨ Stardust Post</span>
                  </div>

                  {/* Top Envelope Flap Triangle Graphic */}
                  <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-white/60 via-fairy-pink-100/50 to-transparent rounded-t-3xl border-b border-fairy-pink-200/60 pointer-events-none" />
                </div>

                {/* Golden Heart Wax Seal (Center Click Target) */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-fairy-gold-400 border-2 border-white shadow-gold-glow flex flex-col items-center justify-center cursor-pointer group/seal z-30"
                >
                  <Heart className="w-6 sm:w-7 h-6 sm:h-7 text-amber-900 fill-amber-700/80 animate-pulse" />
                  <span className="text-[8px] font-bold text-amber-950 uppercase tracking-tighter -mt-0.5">
                    LOVE
                  </span>
                </motion.div>

                {/* Pulsing Hint Badge below */}
                <div className="absolute -bottom-10 inset-x-0 text-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-fairy-pink-200 text-xs font-semibold text-stone-600 shadow-xs animate-bounce">
                    <Sparkles className="w-3.5 h-3.5 text-fairy-gold-500" />
                    <span>Click the Golden Heart to Read</span>
                  </span>
                </div>
              </motion.div>
            ) : (
              /* REVEALED EMOTIONAL LETTER (Parchment Paper with Handwritten Font) */
              <motion.div
                key="revealed-letter"
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative max-w-2xl w-full rounded-3xl bg-gradient-to-br from-[#fffdfa] via-[#fffaf3] to-[#fff7fa] p-8 sm:p-12 shadow-fairy border-2 border-fairy-pink-200/90 text-left"
              >
                {/* Decorative Floral Corner Accents */}
                <span className="absolute top-3 left-4 text-fairy-pink-400 text-sm">🌸</span>
                <span className="absolute top-3 right-4 text-fairy-gold-400 text-sm">✨</span>
                <span className="absolute bottom-3 left-4 text-fairy-lavender-400 text-sm">🦋</span>
                <span className="absolute bottom-3 right-4 text-fairy-pink-400 text-sm">💖</span>

                {/* Letter Header Bar */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-fairy-pink-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-fairy-pink-100 flex items-center justify-center text-fairy-pink-500 shadow-inner">
                      <Feather className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold tracking-widest text-fairy-pink-500 block">
                        Brother's Heart
                      </span>
                      <span className="text-[11px] text-stone-400 font-sans">
                        Savi's 1st Birthday • November 8, 2026
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseEnvelope}
                    type="button"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-fairy-pink-200 text-stone-500 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    title="Fold Letter Back"
                  >
                    <RotateCcw className="w-3 h-3 text-fairy-pink-400" />
                    <span>Fold Back</span>
                  </button>
                </div>

                {/* Exact Letter Body requested by user */}
                <div className="space-y-4 font-serif text-stone-800 text-base sm:text-lg leading-relaxed sm:leading-loose">
                  {/* Salutation in prominent handwritten style */}
                  <p className="font-script text-3xl sm:text-4xl text-fairy-pink-600 font-semibold mb-2">
                    Dear Savi,
                  </p>

                  <p>
                    You are the sweetest blessing in our family. One year ago, you entered our world and filled every corner with happiness.
                  </p>

                  <p>
                    Your little smile makes our days brighter. May your life always be filled with love, laughter, beautiful dreams and endless blessings.
                  </p>

                  <p className="font-medium text-stone-800">
                    Keep smiling, our little princess. Your brother will always love you and cheer for you.
                  </p>

                  {/* Birthday Cheer in handwriting */}
                  <p className="font-script text-2xl sm:text-3xl text-fairy-pink-600 font-bold pt-2">
                    Happy First Birthday, Savi! ❤️
                  </p>
                </div>

                {/* Sign-off */}
                <div className="mt-8 pt-5 border-t border-fairy-pink-100/80 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-stone-400 font-sans block">
                      Written with all my heart
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-fairy-gold-600 font-semibold mt-1">
                      <Sparkles className="w-3.5 h-3.5 text-fairy-gold-500" />
                      <span>Always by your side</span>
                    </span>
                  </div>

                  {/* Handwritten Brother Signature */}
                  <div className="text-right">
                    <p className="font-script text-2xl sm:text-3xl text-stone-700 font-bold">
                      Lots of love,
                    </p>
                    <p className="font-script text-3xl sm:text-4xl text-fairy-pink-600 font-bold">
                      Your Brother.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

