import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Send, MessageCircleHeart, Wand2, Star, Flower2, Crown, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayGirl } from '../../data/birthdayData';
import { fairyAudio } from '../../utils/soundEffects';

// Required Stickers: 🌸 Flower, 👑 Crown, ⭐ Star, 💖 Heart, 🦋 Butterfly
const STICKERS = [
  { emoji: '🌸', name: 'Flower', label: 'Blossom Blessing' },
  { emoji: '👑', name: 'Crown', label: 'Royal Crown' },
  { emoji: '⭐', name: 'Star', label: 'Stardust Wish' },
  { emoji: '💖', name: 'Heart', label: 'Endless Love' },
  { emoji: '🦋', name: 'Butterfly', label: 'Fairytale Grace' },
];

// Required Sample Family Wishes
const SAMPLE_FAMILY_WISHES = [
  {
    id: 1,
    name: "Mom & Dad (Priya & Rishabh)",
    relation: "Mom & Dad",
    message: "To our sweetest darling Savi, you brought heaven into our lives. Watching your tiny dimpled smile every single morning is our greatest joy. May you always dance through life with wonder, courage, and pure magic. Happy 1st Birthday, our little princess!",
    sticker: "👑",
    date: "November 8, 2026",
    color: "from-pink-50 via-rose-50/60 to-white",
    border: "border-fairy-pink-300",
  },
  {
    id: 2,
    name: "Dadu, Dadi, Nanu & Nani",
    relation: "Grandparents",
    message: "Our dearest little Lakshmi Savi! You have filled our ancestral home with golden sunshine and sweet melodies. May the almighty bless you with vibrant health, divine wisdom, kindness, and eternal laughter. All our blessings are forever with you.",
    sticker: "⭐",
    date: "November 8, 2026",
    color: "from-amber-50 via-yellow-50/60 to-white",
    border: "border-fairy-gold-300",
  },
  {
    id: 3,
    name: "Aunt Ananya & Uncle Karan",
    relation: "Aunt & Uncle",
    message: "Happy 1st Birthday to our favorite niece! You are the most adorable fairy in the world. Get ready for lots of cuddles, toys, and sweet treats every time we visit. Love you to the moon and back, little Savi!",
    sticker: "🌸",
    date: "November 8, 2026",
    color: "from-purple-50 via-lavender-50/60 to-white",
    border: "border-fairy-lavender-300",
  },
];

export default function WishesWall() {
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('savi_blessings_wishes_wall');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return SAMPLE_FAMILY_WISHES;
  });

  const [formData, setFormData] = useState({
    name: '',
    relation: 'Aunt',
    message: '',
    sticker: '🌸',
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    try {
      localStorage.setItem('savi_blessings_wishes_wall', JSON.stringify(wishes));
    } catch {
      // Ignore
    }
  }, [wishes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    // Sound effect
    fairyAudio.playWandBurst();

    // Animated celebration confetti explosion
    const count = 120;
    confetti({
      particleCount: Math.floor(count * 0.6),
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#ffd0e0', '#cfb7f0', '#99d2f6', '#f8dc81', '#ecc449', '#ffffff'],
      scalar: 1.15,
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: 0.15, y: 0.65 },
        colors: ['#ffd0e0', '#f8dc81'],
      });
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: 0.85, y: 0.65 },
        colors: ['#cfb7f0', '#99d2f6'],
      });
    }, 250);

    const newWish = {
      id: Date.now(),
      name: formData.name.trim(),
      relation: formData.relation,
      message: formData.message.trim(),
      sticker: formData.sticker,
      date: "Just Now",
      color: "from-pink-50/80 via-white to-fairy-cream",
      border: "border-fairy-pink-200",
    };

    setWishes([newWish, ...wishes]);
    setFormData({
      name: '',
      relation: 'Aunt',
      message: '',
      sticker: '🌸',
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const filteredWishes = activeFilter === 'All'
    ? wishes
    : wishes.filter((w) => w.relation.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="wishes" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Ambient Dreamy Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-fairy-pink-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-fairy-lavender-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title requested: "Blessings & Wishes For Our Little Fairy" */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-pink-200 shadow-sm mb-3">
            <Heart className="w-4 h-4 text-fairy-pink-500 fill-fairy-pink-300 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-fairy-pink-500 font-sans">
              Guestbook & Prayers
            </span>
            <Sparkles className="w-4 h-4 text-fairy-gold-400" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
            Blessings & Wishes <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500">For Our Little Fairy</span>
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-3 max-w-xl mx-auto">
            "Leave your warm prayers, sweetest memories, and love for baby Savi to cherish as she grows."
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {['All', 'Grandparents', 'Aunt', 'Uncle', 'Family Friend', 'Cousin'].map((rel) => (
              <button
                key={rel}
                onClick={() => setActiveFilter(rel)}
                type="button"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === rel
                    ? 'bg-gradient-to-r from-fairy-pink-400 to-fairy-lavender-400 text-white shadow-xs scale-105'
                    : 'bg-white/80 hover:bg-white text-stone-600 border border-fairy-pink-100 hover:border-fairy-pink-200'
                }`}
              >
                {rel === 'All' ? 'All Blessings' : rel}
              </button>
            ))}
          </div>
        </div>

        {/* Content Columns: Form + Wishes Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 1. Guestbook Form Column */}
          <div className="lg:col-span-5 glass-fairy-card rounded-3xl p-6 sm:p-8 border-2 border-white/90 shadow-fairy bg-white/80 relative">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-fairy-pink-100">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-fairy-pink-200 to-fairy-lavender-200 flex items-center justify-center text-fairy-pink-600 shadow-inner">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-800">
                  Write a Birthday Blessing
                </h3>
                <p className="text-xs text-stone-500">
                  Your words will be preserved on Savi's wall
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aunt Meera / Uncle Karan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm text-stone-800 placeholder-stone-400 transition-all"
                />
              </div>

              {/* Relationship Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                  Relationship with Savi *
                </label>
                <select
                  value={formData.relation}
                  onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm text-stone-800 transition-all cursor-pointer"
                >
                  <option value="Grandparents">Grandparents</option>
                  <option value="Aunt">Aunt (Masi / Bua / Chachi)</option>
                  <option value="Uncle">Uncle (Mama / Chacha / Fufa)</option>
                  <option value="Family Friend">Family Friend</option>
                  <option value="Cousin">Cousin</option>
                  <option value="Mom & Dad">Mom & Dad</option>
                </select>
              </div>

              {/* Sticker Selector: 🌸 Flower, 👑 Crown, ⭐ Star, 💖 Heart, 🦋 Butterfly */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                  Choose a Fairy Sticker *
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {STICKERS.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, sticker: s.emoji });
                        fairyAudio.playSparkle(950, 0.2);
                      }}
                      className={`p-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                        formData.sticker === s.emoji
                          ? 'bg-gradient-to-tr from-fairy-pink-200 to-fairy-lavender-200 scale-110 shadow-sm ring-2 ring-fairy-pink-300'
                          : 'bg-stone-50 hover:bg-white border border-fairy-pink-100 hover:scale-105'
                      }`}
                      title={s.label}
                    >
                      <span className="text-xl sm:text-2xl">{s.emoji}</span>
                      <span className="text-[9px] font-semibold text-stone-500 mt-1 truncate max-w-full">
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweet Birthday Message */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                  Your Sweet Birthday Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Dearest little Savi, may your path always be lined with fragrant roses and your laughter brighten every room you enter..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm text-stone-800 placeholder-stone-400 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-fairy-pink-400 via-fairy-lavender-400 to-fairy-gold-400 text-white font-semibold text-sm shadow-fairy hover:shadow-fairy-hover transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-fairy-gold-200 animate-sparkle" />
                <span>Post Birthday Blessing</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>

              {/* Animated confirmation toast */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm text-center font-medium shadow-xs flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>✨ Your blessing has been showered onto Savi's wall!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* 2. Wishes Wall Feed Column */}
          <div className="lg:col-span-7 space-y-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {filteredWishes.map((wish) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`p-6 rounded-3xl bg-gradient-to-br ${wish.color || 'from-white to-fairy-cream'} border ${
                    wish.border || 'border-fairy-pink-200'
                  } shadow-fairy hover:shadow-fairy-hover transition-all duration-300 relative group`}
                >
                  {/* Top Bar with Sticker & Relation Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-fairy-pink-100/60">
                    <div className="flex items-center gap-3">
                      {/* Big Sticker Badge */}
                      <div className="w-12 h-12 rounded-2xl bg-white/90 shadow-sm border border-fairy-pink-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        {wish.sticker}
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-stone-800 text-base sm:text-lg">
                          {wish.name}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-fairy-pink-600 bg-fairy-pink-50 px-2 py-0.5 rounded-full mt-0.5">
                          <span>{wish.relation}</span>
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] text-stone-400 font-sans shrink-0">
                      {wish.date}
                    </span>
                  </div>

                  {/* Message Body */}
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans mt-2">
                    "{wish.message}"
                  </p>

                  {/* Bottom Soft Decorative Accent */}
                  <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="italic font-serif text-fairy-pink-400">
                      Blessed with love for Princess Savi
                    </span>
                    <Heart className="w-3.5 h-3.5 text-fairy-pink-300 fill-fairy-pink-200 group-hover:scale-125 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredWishes.length === 0 && (
              <div className="p-10 text-center rounded-3xl bg-white/70 border border-fairy-pink-100 text-stone-500 font-serif italic">
                No wishes found for this relation filter yet. Be the first to add one!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
