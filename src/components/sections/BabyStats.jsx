import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Music,
  Crown,
  Smile,
  Sparkles,
  BookOpen,
  Moon,
  Stars,
  Footprints,
  Baby,
  Utensils
} from 'lucide-react';
import { birthdayGirl } from '../../data/birthdayData';
import { fairyAudio } from '../../utils/soundEffects';

const PRINCESS_FAVORITES = [
  {
    id: 'food',
    title: 'Favorite Food',
    value: 'Sweet Banana Mash & Baby Porridge',
    subtext: 'Claps her hands excitedly the moment her little feeding bowl appears!',
    icon: Utensils,
    emoji: '🍌',
    badge: 'Yummy Bites',
    color: 'from-pink-100 via-rose-50 to-white',
    border: 'border-pink-200',
    accentColor: 'text-fairy-pink-500',
    bgBadge: 'bg-fairy-pink-50 text-fairy-pink-600',
  },
  {
    id: 'song',
    title: 'Favorite Song',
    value: 'Twinkle Twinkle Little Star',
    subtext: 'Sways side to side and tries to sing along whenever the music box plays.',
    icon: Music,
    emoji: '🎶',
    badge: 'Bedtime Melody',
    color: 'from-purple-100 via-lavender-50 to-white',
    border: 'border-purple-200',
    accentColor: 'text-fairy-lavender-500',
    bgBadge: 'bg-fairy-lavender-50 text-fairy-lavender-600',
  },
  {
    id: 'nickname',
    title: 'Current Nicknames',
    value: 'Chhoti Pari & Savi Doll',
    subtext: 'Our little fairytale angel who answers with the brightest dimpled grin.',
    icon: Crown,
    emoji: '👑',
    badge: 'Sweet Pet Names',
    color: 'from-amber-100 via-yellow-50 to-white',
    border: 'border-amber-200',
    accentColor: 'text-fairy-gold-500',
    bgBadge: 'bg-fairy-gold-50 text-amber-700',
  },
  {
    id: 'skills',
    title: 'New Skills',
    value: 'Clapping, Standing & Smiling',
    subtext: 'Proudly pulling up on cushions, standing tall, and giving royal waves!',
    icon: Smile,
    emoji: '👏',
    badge: 'Growing Fast',
    color: 'from-blue-100 via-sky-50 to-white',
    border: 'border-blue-200',
    accentColor: 'text-fairy-blue-500',
    bgBadge: 'bg-fairy-blue-50 text-sky-700',
  },
  {
    id: 'toy',
    title: 'Favorite Toy',
    value: 'Soft Bunny (Bun-Bun)',
    subtext: 'Her fluffy plush rabbit that accompanies her on every nap and nursery adventure.',
    icon: Heart,
    emoji: '🧸',
    badge: 'Cuddle Buddy',
    color: 'from-rose-100 via-pink-50 to-white',
    border: 'border-rose-200',
    accentColor: 'text-rose-500',
    bgBadge: 'bg-rose-50 text-rose-600',
  },
  {
    id: 'routine',
    title: 'Bedtime Routine',
    value: 'Fairy Stories & Lullabies',
    subtext: 'Gentle lavender oil massages, cozy swaddles, and soft fairytale book readings.',
    icon: Moon,
    emoji: '🌙',
    badge: 'Sweet Dreams',
    color: 'from-indigo-100 via-purple-50 to-white',
    border: 'border-indigo-200',
    accentColor: 'text-indigo-500',
    bgBadge: 'bg-indigo-50 text-indigo-600',
  },
];

export default function BabyStats() {
  const [tappedCard, setTappedCard] = useState(null);

  const handleCardClick = (idx, id) => {
    setTappedCard(id);
    fairyAudio.playSparkle(950 + idx * 40, 0.25);
    setTimeout(() => setTappedCard(null), 1000);
  };

  return (
    <section id="stats" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-gradient-to-tr from-fairy-pink-100/40 via-fairy-lavender-100/35 to-fairy-gold-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading requested: "Little Princess Facts & Favorites" */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-lavender-200 shadow-sm mb-3">
            <Crown className="w-4 h-4 text-fairy-gold-500 animate-sparkle" />
            <span className="text-xs font-semibold tracking-wider uppercase text-fairy-lavender-600 font-sans">
              At One Year Old
            </span>
            <Stars className="w-4 h-4 text-fairy-pink-400" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
            Little Princess <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500">Facts & Favorites</span>
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-3 max-w-xl mx-auto">
            "A peek into baby Savi's sweet, innocent world—her favorite snacks, songs, and adorable baby habits."
          </p>
        </div>

        {/* 6 Cute Pastel Cards in Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {PRINCESS_FAVORITES.map((item, idx) => {
            const Icon = item.icon;
            const isTapped = tappedCard === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCardClick(idx, item.id)}
                className={`p-7 rounded-3xl bg-gradient-to-br ${item.color} border-2 ${item.border} shadow-fairy hover:shadow-fairy-hover transition-all duration-300 cursor-pointer relative group flex flex-col justify-between overflow-hidden ${
                  isTapped ? 'ring-2 ring-fairy-pink-400' : ''
                }`}
              >
                {/* Floating ambient glow on hover */}
                <span className="absolute -top-10 -right-10 w-24 h-24 bg-white/60 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar with Badge & Emoji */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.bgBadge} shadow-xs flex items-center gap-1`}>
                      <span>{item.badge}</span>
                    </span>

                    <span className="text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                      {item.emoji}
                    </span>
                  </div>

                  {/* Card Label */}
                  <span className="text-xs uppercase font-bold tracking-wider text-stone-400 block mb-1">
                    {item.title}
                  </span>

                  {/* Value */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 leading-snug group-hover:text-fairy-pink-600 transition-colors">
                    {item.value}
                  </h3>
                </div>

                {/* Subtext description */}
                <div className="mt-5 pt-3.5 border-t border-stone-200/60">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {item.subtext}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="italic font-serif text-fairy-pink-400">
                      Savi's Special Charm
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-fairy-gold-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sweet Heartfelt Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-fairy-card bg-white/90 border-2 border-fairy-pink-200 text-center max-w-2xl mx-auto shadow-sm">
          <p className="font-script text-2xl sm:text-3xl text-fairy-pink-500 font-semibold">
            "Before you were born, we dreamed of you; now that you are here, you are our greatest fairytale come true."
          </p>
          <span className="block text-xs uppercase tracking-widest text-stone-400 font-bold mt-2">
            — With All Our Love, The Gangwars
          </span>
        </div>
      </div>
    </section>
  );
}
