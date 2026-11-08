import React from 'react';
import { motion } from 'framer-motion';
import { Gift, BookOpen, Sparkles, Sprout, PiggyBank, Heart } from 'lucide-react';
import { birthdayGirl } from '../../data/birthdayData';

export default function GiftBlessings() {
  const ideas = [
    {
      icon: BookOpen,
      title: "Storybook for Savi's Library",
      description: "Bring your favorite childhood storybook and write a sweet personal blessing on the first page.",
      color: "from-pink-100 to-rose-100/60",
      border: "border-pink-200",
      tag: "Treasured Forever",
    },
    {
      icon: Sprout,
      title: "Plant a Little Tree / Flower",
      description: "Plant a sapling or flower in your garden or local park in honor of Savi's birthday to grow with her.",
      color: "from-emerald-100 to-teal-100/60",
      border: "border-emerald-200",
      tag: "Green Blessing",
    },
    {
      icon: PiggyBank,
      title: "Little Fairy Dream Fund",
      description: "If you wish to send a monetary blessing, it will be placed in Savi's first junior savings deposit.",
      color: "from-amber-100 to-yellow-100/60",
      border: "border-amber-200",
      tag: "Future Dreams",
    },
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-pink-200 shadow-sm mb-4">
          <Gift className="w-4 h-4 text-fairy-pink-500" />
          <span className="text-xs font-semibold tracking-wider uppercase text-fairy-pink-500 font-sans">
            Gifts & Blessings
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          Your Presence is Our <span className="font-script text-4xl sm:text-5xl text-fairy-pink-500">Greatest Gift</span>
        </h2>

        <p className="font-serif italic text-base text-stone-600 mt-3 max-w-2xl mx-auto leading-relaxed">
          "Having your love, prayers, and laughter with us to celebrate Savi's first milestone is all our hearts could ever ask for."
        </p>

        {/* Meaningful Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 text-left">
          {ideas.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`p-6 rounded-3xl glass-fairy-card border ${item.border} shadow-xs hover:shadow-fairy transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center mb-4 shadow-inner`}>
                    <Icon className="w-6 h-6 text-stone-700" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

