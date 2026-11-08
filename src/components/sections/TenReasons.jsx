import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Smile,
  Laugh,
  Eye,
  Hand,
  Sparkles,
  PartyPopper,
  Volume2,
  Stars,
  Sun,
  Crown
} from 'lucide-react';
import { fairyAudio } from '../../utils/soundEffects';

const REASONS = [
  {
    number: "01",
    title: "Your beautiful smile.",
    description: "A single dimpled grin that lights up our entire universe and melts all worries away.",
    emoji: "🌸",
    icon: Smile,
    gradient: "from-pink-100 via-rose-50 to-white",
    border: "border-pink-200",
    accent: "text-fairy-pink-500",
    badge: "Reason 1",
  },
  {
    number: "02",
    title: "Your cute little laughter.",
    description: "The sweetest, most joyful belly giggles that sound like fairy bells ringing in the morning breeze.",
    emoji: "🎶",
    icon: Laugh,
    gradient: "from-purple-100 via-lavender-50 to-white",
    border: "border-purple-200",
    accent: "text-fairy-lavender-500",
    badge: "Reason 2",
  },
  {
    number: "03",
    title: "Your innocent eyes.",
    description: "Big, sparkling starlit eyes that look at the world with boundless wonder, curiosity, and trust.",
    emoji: "✨",
    icon: Eye,
    gradient: "from-blue-100 via-sky-50 to-white",
    border: "border-blue-200",
    accent: "text-fairy-blue-500",
    badge: "Reason 3",
  },
  {
    number: "04",
    title: "Your tiny little hands.",
    description: "Ten precious fingers that hold onto our thumbs so tightly, reminding us of life's purest blessings.",
    emoji: "💕",
    icon: Hand,
    gradient: "from-amber-100 via-yellow-50 to-white",
    border: "border-amber-200",
    accent: "text-fairy-gold-600",
    badge: "Reason 4",
  },
  {
    number: "05",
    title: "Your adorable expressions.",
    description: "From cheeky pouts and surprised round eyes to the sweetest nose scrunches you make.",
    emoji: "🥰",
    icon: Sparkles,
    gradient: "from-rose-100 via-pink-50 to-white",
    border: "border-rose-200",
    accent: "text-rose-500",
    badge: "Reason 5",
  },
  {
    number: "06",
    title: "Your playful nature.",
    description: "Rolling across nursery rugs, splashing in bath bubbles, and chasing imaginary garden butterflies.",
    emoji: "🦋",
    icon: PartyPopper,
    gradient: "from-emerald-100 via-teal-50 to-white",
    border: "border-emerald-200",
    accent: "text-emerald-600",
    badge: "Reason 6",
  },
  {
    number: "07",
    title: "Your sweet little voice.",
    description: "Gentle morning coos, babbling 'Ba-ba' and 'Ma-ma', humming along to our favorite nursery lullabies.",
    emoji: "🕊️",
    icon: Volume2,
    gradient: "from-sky-100 via-blue-50 to-white",
    border: "border-sky-200",
    accent: "text-sky-600",
    badge: "Reason 7",
  },
  {
    number: "08",
    title: "Your magical presence.",
    description: "Just having you in the room turns an ordinary day into a golden fairytale celebration.",
    emoji: "🪄",
    icon: Stars,
    gradient: "from-indigo-100 via-purple-50 to-white",
    border: "border-indigo-200",
    accent: "text-indigo-500",
    badge: "Reason 8",
  },
  {
    number: "09",
    title: "Your endless happiness.",
    description: "The effortless, radiant sunshine you radiate from sunrise to bedtime, spreading pure unconditional joy.",
    emoji: "☀️",
    icon: Sun,
    gradient: "from-amber-100 via-orange-50 to-white",
    border: "border-amber-200",
    accent: "text-amber-600",
    badge: "Reason 9",
  },
  {
    number: "10",
    title: "Simply because you are Savi!",
    description: "Our one-and-only little princess. You don't have to do anything at all—just being yourself is everything to us.",
    emoji: "👑",
    icon: Crown,
    gradient: "from-pink-200 via-fairy-gold-100 to-purple-100",
    border: "border-fairy-gold-300",
    accent: "text-fairy-pink-600 font-bold",
    badge: "Reason 10 • Greatest Reason",
    featured: true,
  },
];

export default function TenReasons() {
  const handleCardHover = (idx) => {
    fairyAudio.playSparkle(920 + idx * 35, 0.2);
  };

  return (
    <section id="reasons" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Ambient background pastel blurs */}
      <div className="absolute top-1/3 left-1/4 w-[36rem] h-[36rem] bg-fairy-pink-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[36rem] h-[36rem] bg-fairy-lavender-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header requested: "10 Reasons Why We Love Our Little Savi" */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-pink-200 shadow-sm mb-3">
            <Heart className="w-4 h-4 text-fairy-pink-500 fill-fairy-pink-300 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-fairy-pink-600 font-sans">
              From Our Hearts To Yours
            </span>
            <Sparkles className="w-4 h-4 text-fairy-gold-400" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
            10 Reasons Why We Love <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500">Our Little Savi</span>
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-3 max-w-xl mx-auto">
            "A thousand words could never be enough, but here are ten sweet truths about our fairy princess."
          </p>
        </div>

        {/* 10 Animated Fairy Cards Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {REASONS.map((reason, idx) => {
            const Icon = reason.icon;
            const isTenth = reason.featured;

            return (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: (idx % 3) * 0.12 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onMouseEnter={() => handleCardHover(idx)}
                className={`p-7 rounded-3xl bg-gradient-to-br ${reason.gradient} border-2 ${reason.border} shadow-fairy hover:shadow-fairy-hover transition-all duration-300 relative group flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isTenth ? 'sm:col-span-2 lg:col-span-3 sm:py-8' : ''
                }`}
              >
                {/* Decorative floating sparkle aura */}
                <span className="absolute -top-10 -right-10 w-28 h-28 bg-white/70 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar with Number, Badge and Emoji */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-white/90 shadow-xs flex items-center justify-center font-serif font-bold text-xs text-stone-700">
                        {reason.number}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/80 text-stone-600 shadow-2xs">
                        {reason.badge}
                      </span>
                    </div>

                    <span className="text-2xl sm:text-3xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                      {reason.emoji}
                    </span>
                  </div>

                  {/* Title requested by user */}
                  <h3
                    className={`font-serif text-xl sm:text-2xl font-bold text-stone-800 leading-snug group-hover:text-fairy-pink-600 transition-colors ${
                      isTenth ? 'sm:text-3xl' : ''
                    }`}
                  >
                    {reason.title}
                  </h3>

                  {/* Poetic description */}
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2.5 font-sans">
                    {reason.description}
                  </p>
                </div>

                {/* Bottom decorative note */}
                <div className="mt-5 pt-3.5 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-400">
                  <span className="italic font-serif text-fairy-pink-500 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-fairy-pink-400" />
                    <span>Treasured Forever</span>
                  </span>
                  <Sparkles className="w-4 h-4 text-fairy-gold-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Warm Heart Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 rounded-3xl glass-fairy-card bg-white/95 border-2 border-fairy-gold-300 text-center max-w-2xl mx-auto shadow-sm"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-fairy-pink-200 via-fairy-gold-200 to-fairy-lavender-200 flex items-center justify-center mx-auto shadow-sm mb-3 text-xl">
            👑
          </div>
          <p className="font-script text-2xl sm:text-3xl text-fairy-pink-500 font-semibold">
            "To the world you may be one person, but to our family you are the whole world."
          </p>
          <span className="block text-xs uppercase tracking-widest text-stone-400 font-bold mt-2">
            Happy 1st Birthday, Princess Savi! 🌸
          </span>
        </motion.div>
      </div>
    </section>
  );
}

