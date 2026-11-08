import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Crown, Heart, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayGirl } from '../../data/birthdayData';
import { fairyAudio } from '../../utils/soundEffects';

export default function WelcomeExperience({ onEnter }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCelebrationMsg, setShowCelebrationMsg] = useState(false);
  const [butterflies, setButterflies] = useState([]);

  // Lock body scroll while welcome screen is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleEnter = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // 1. Play magical sound chime
    fairyAudio.playWandBurst();

    // 2. Golden Sparkle Explosion via canvas-confetti
    const count = 140;
    const defaults = {
      origin: { y: 0.55 },
      colors: ['#ecc449', '#f8dc81', '#dfb76c', '#ffd0e0', '#cfb7f0', '#ffffff'],
      disableForReducedMotion: true,
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.6),
      spread: 70,
      startVelocity: 45,
      scalar: 1.2,
    });

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.4),
      spread: 120,
      startVelocity: 35,
      scalar: 0.9,
    });

    // 3. Spawn fluttering butterflies flying across screen
    const butterflyData = [
      { id: 1, startX: '-10vw', startY: '80vh', endX: '110vw', endY: '15vh', delay: 0.1, size: 'text-3xl sm:text-4xl', duration: 2.4 },
      { id: 2, startX: '-5vw', startY: '60vh', endX: '105vw', endY: '5vh', delay: 0.3, size: 'text-2xl sm:text-3xl', duration: 2.2 },
      { id: 3, startX: '10vw', startY: '105vh', endX: '115vw', endY: '25vh', delay: 0.5, size: 'text-3xl sm:text-4xl', duration: 2.6 },
      { id: 4, startX: '-15vw', startY: '45vh', endX: '105vw', endY: '-10vh', delay: 0.2, size: 'text-xl sm:text-2xl', duration: 2.5 },
      { id: 5, startX: '30vw', startY: '110vh', endX: '100vw', endY: '35vh', delay: 0.4, size: 'text-2xl sm:text-3xl', duration: 2.3 },
    ];
    setButterflies(butterflyData);

    // 4. Reveal celebration message
    setTimeout(() => {
      setShowCelebrationMsg(true);
    }, 350);

    // 5. Smoothly transition and scroll to the main birthday section
    setTimeout(() => {
      setIsOpen(false);
      if (onEnter) onEnter();

      // Smooth scroll to main birthday section
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="welcome-gate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-gradient-to-br from-fairy-cream via-[#fff3f7] to-[#f4edff]"
      >
        {/* Ambient Dreamy Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-fairy-pink-200/50 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-fairy-lavender-200/50 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[32rem] h-96 sm:h-[32rem] bg-fairy-gold-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Flying Butterflies (Rendered during entry trigger) */}
        {butterflies.map((b) => (
          <motion.div
            key={b.id}
            initial={{ left: b.startX, top: b.startY, opacity: 0, scale: 0.5 }}
            animate={{
              left: b.endX,
              top: b.endY,
              opacity: [0, 1, 1, 0],
              scale: [0.7, 1.2, 1, 0.8],
              rotate: [0, 15, -10, 20, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              ease: 'easeInOut',
            }}
            className={`fixed pointer-events-none z-50 select-none ${b.size} filter drop-shadow-md`}
          >
            🦋
          </motion.div>
        ))}

        {/* Main Welcome Card */}
        <div className="relative z-20 max-w-lg w-full text-center">
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="rounded-3xl glass-fairy-card bg-white/80 p-8 sm:p-12 shadow-2xl border-2 border-white/90 relative overflow-hidden"
          >
            {/* Soft decorative corner sparkles */}
            <Sparkles className="w-5 h-5 text-fairy-gold-400 absolute top-4 left-4 animate-sparkle" />
            <Stars className="w-5 h-5 text-fairy-lavender-400 absolute top-4 right-4 animate-sparkle" />
            <Heart className="w-4 h-4 text-fairy-pink-300 fill-fairy-pink-200 absolute bottom-4 left-4" />
            <Sparkles className="w-5 h-5 text-fairy-gold-400 absolute bottom-4 right-4 animate-sparkle" />

            {/* Baby Royal Monogram */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-fairy-pink-200 via-fairy-gold-200 to-fairy-lavender-200 p-1 mx-auto shadow-fairy mb-5"
            >
              <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center border border-fairy-gold-200 shadow-inner">
                <Crown className="w-6 h-6 text-fairy-gold-500 mb-0.5" />
                <span className="font-serif font-bold text-xs tracking-widest text-stone-700">
                  SAVI
                </span>
              </div>
            </motion.div>

            {/* Heading & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-fairy-lavender-500 block mb-1">
                You Are Cordially Invited
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight leading-tight">
                Welcome to Savi's{' '}
                <span className="font-script text-4xl sm:text-5xl text-fairy-pink-500 block sm:inline">
                  Fairy World
                </span>
              </h1>

              <p className="font-serif italic text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
                "Step inside an enchanted garden where our little princess turns one."
              </p>
            </motion.div>

            {/* Interactive Wand Animation Container */}
            <div className="my-7 relative flex items-center justify-center min-h-[70px]">
              <AnimatePresence mode="wait">
                {isAnimating ? (
                  <motion.div
                    key="animating-wand"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center space-y-2"
                  >
                    {/* Waving Golden Wand */}
                    <motion.div
                      animate={{
                        rotate: [0, -35, 45, -20, 30, 0],
                        scale: [1, 1.3, 1.1, 1.25, 1],
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-200 via-fairy-gold-400 to-yellow-100 flex items-center justify-center shadow-gold-glow text-white"
                    >
                      <Wand2 className="w-7 h-7 text-stone-900" />
                    </motion.div>

                    {/* Reveal Message */}
                    {showCelebrationMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-1"
                      >
                        <p className="font-serif font-bold text-base sm:text-lg text-stone-800 text-fairy-gradient">
                          ✨ A Magical Celebration Begins For Savi! ✨
                        </p>
                        <p className="text-xs text-stone-500 font-sans tracking-wide">
                          Opening the enchanted garden gates...
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  /* Initial Wand Invitation Icon */
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="w-10 h-10 rounded-full bg-fairy-pink-100 text-fairy-pink-500 flex items-center justify-center text-lg shadow-xs">
                      🌸
                    </span>
                    <span className="w-12 h-12 rounded-full bg-fairy-gold-100 text-fairy-gold-600 flex items-center justify-center text-xl shadow-xs">
                      ✨
                    </span>
                    <span className="w-10 h-10 rounded-full bg-fairy-lavender-100 text-fairy-lavender-500 flex items-center justify-center text-lg shadow-xs">
                      🦋
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button: "Enter the Fairy World" */}
            {!isAnimating && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleEnter}
                type="button"
                className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-fairy-pink-400 via-fairy-lavender-400 to-fairy-gold-400 text-white font-semibold text-base sm:text-lg shadow-fairy hover:shadow-fairy-hover transition-all flex items-center justify-center gap-3 cursor-pointer group relative overflow-hidden"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="tracking-wide">Enter the Fairy World</span>
                <Sparkles className="w-4 h-4 text-fairy-gold-100 animate-sparkle" />
              </motion.button>
            )}

            <div className="mt-5 text-[11px] text-stone-400 font-sans">
              Dedicated to baby Savi Gangwar • 1st Birthday Celebration
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

