import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Feather, Quote } from 'lucide-react';
import { loveLetters, birthdayGirl } from '../../data/birthdayData';
import { fairyAudio } from '../../utils/soundEffects';

export default function LettersOfLove() {
  const [activeLetterId, setActiveLetterId] = useState(1);

  const activeLetter = loveLetters.find((l) => l.id === activeLetterId) || loveLetters[0];

  const handleSelectLetter = (id) => {
    setActiveLetterId(id);
    fairyAudio.playSparkle(920, 0.2);
  };

  return (
    <section id="letters" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent via-fairy-pink-50/40 to-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-pink-200 shadow-sm mb-3">
            <Feather className="w-4 h-4 text-fairy-pink-500" />
            <span className="text-xs font-semibold tracking-wider uppercase text-fairy-pink-500 font-sans">
              From the Heart
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-800 tracking-tight">
            Letters of <span className="font-script text-4xl sm:text-6xl text-fairy-pink-500">Love</span> for Savi
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-3">
            "Words written with stardust, to be cherished for all the years to come."
          </p>

          {/* Letter Selectors */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {loveLetters.map((letter) => (
              <button
                key={letter.id}
                onClick={() => handleSelectLetter(letter.id)}
                type="button"
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeLetterId === letter.id
                    ? 'bg-gradient-to-r from-fairy-pink-400 to-fairy-lavender-400 text-white shadow-fairy scale-105'
                    : 'bg-white/80 hover:bg-white text-stone-600 border border-fairy-pink-100 hover:border-fairy-pink-200'
                }`}
              >
                <span>{letter.from}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Parchment Keepsake Letter Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLetter.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl glass-fairy-card bg-gradient-to-br from-white/95 via-fairy-cream/90 to-white/90 p-8 sm:p-12 shadow-fairy border border-fairy-pink-200 max-w-3xl mx-auto"
          >
            {/* Top decorative header */}
            <div className="flex items-center justify-between pb-6 border-b border-fairy-pink-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-fairy-pink-100 flex items-center justify-center text-fairy-pink-500">
                  <Feather className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-fairy-pink-500 block">
                    {activeLetter.badge}
                  </span>
                  <span className="text-xs text-stone-400 font-sans">
                    {activeLetter.role}
                  </span>
                </div>
              </div>

              {/* Heart icon */}
              <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-fairy-pink-100 flex items-center justify-center text-fairy-pink-400">
                <Heart className="w-4 h-4 fill-fairy-pink-300" />
              </div>
            </div>

            {/* Letter Content */}
            <div className="py-8 relative">
              <Quote className="w-12 h-12 text-fairy-pink-200/60 absolute -top-2 -left-3 -z-10" />

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 mb-4">
                {activeLetter.title}
              </h3>

              <p className="font-serif text-stone-700 text-base sm:text-lg leading-relaxed sm:leading-loose">
                {activeLetter.content}
              </p>
            </div>

            {/* Signature */}
            <div className="pt-6 border-t border-fairy-pink-100 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-sans">
                Written with love for Savi's 1st Birthday
              </span>
              <span className="font-script text-2xl sm:text-3xl text-fairy-pink-500 font-semibold">
                {activeLetter.signature}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

