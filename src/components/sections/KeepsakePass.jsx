import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Sparkles, Printer, Crown, Heart, Check, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayGirl, venueDetails } from '../../data/birthdayData';
import { fairyAudio } from '../../utils/soundEffects';

export default function KeepsakePass() {
  const [guestName, setGuestName] = useState('Honored Guest');
  const [passNumber, setPassNumber] = useState('SAVI-001');

  const handleNameChange = (e) => {
    setGuestName(e.target.value || 'Honored Guest');
  };

  const handlePrint = () => {
    fairyAudio.playWandBurst();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ecc449', '#ffd0e0', '#cfb7f0'],
    });
    window.print();
  };

  return (
    <section className="relative py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-gold-200 shadow-sm mb-3">
          <Ticket className="w-4 h-4 text-fairy-gold-500" />
          <span className="text-xs font-semibold tracking-wider uppercase text-fairy-gold-500 font-sans">
            Personalized Keepsake
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          Your Royal <span className="font-script text-4xl sm:text-5xl text-fairy-pink-500">Fairyland Pass</span>
        </h2>
        <p className="font-serif italic text-sm sm:text-base text-stone-600 mt-2 max-w-lg mx-auto">
          "Type your name below to personalize your keepsake invitation pass to take home or screenshot!"
        </p>

        {/* Input Name field */}
        <div className="max-w-sm mx-auto mt-6 mb-8">
          <input
            type="text"
            placeholder="Type your name (e.g. Aunt Meera & Family)"
            onChange={handleNameChange}
            className="w-full px-5 py-3 rounded-full bg-white/90 border border-fairy-gold-300 text-center text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-fairy-gold-300 shadow-xs"
          />
        </div>

        {/* The Golden Keepsake Pass Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-xl mx-auto rounded-3xl bg-gradient-to-br from-[#fffdfa] via-[#fff8fa] to-[#fbf7ff] p-6 sm:p-8 shadow-fairy border-2 border-fairy-gold-300/80 text-left overflow-hidden print:m-0 print:border-stone-800"
        >
          {/* Decorative Gold Filigree corner borders */}
          <span className="absolute top-2 left-2 text-fairy-gold-400 text-xs">✨</span>
          <span className="absolute top-2 right-2 text-fairy-gold-400 text-xs">✨</span>
          <span className="absolute bottom-2 left-2 text-fairy-gold-400 text-xs">✨</span>
          <span className="absolute bottom-2 right-2 text-fairy-gold-400 text-xs">✨</span>

          {/* Header Row */}
          <div className="flex items-center justify-between pb-4 border-b border-fairy-gold-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-fairy-pink-300 to-fairy-gold-300 flex items-center justify-center text-white shadow-xs">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm sm:text-base text-stone-800 block">
                  Savi's 1st Birthday
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-fairy-gold-500">
                  VIP Fairyland Pass
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-stone-400 block">PASS NO.</span>
              <span className="text-xs font-mono font-bold text-fairy-pink-500">{passNumber}</span>
            </div>
          </div>

          {/* Guest Name Section */}
          <div className="py-5 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
              Guest of Honor
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 text-fairy-gradient capitalize truncate">
              {guestName}
            </h3>
            <p className="font-serif italic text-xs text-stone-500 mt-1">
              "Warmly welcomed to celebrate one year of wonder & pure stardust."
            </p>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-fairy-gold-200 text-xs text-stone-600">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase block">When</span>
              <span className="font-semibold text-stone-800">{birthdayGirl.celebrationDateFormatted}</span>
              <span className="block text-[11px] text-stone-500">5:00 PM IST onwards</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase block">Where</span>
              <span className="font-semibold text-stone-800 truncate block">{venueDetails.hall}</span>
              <span className="text-[11px] text-stone-500 block truncate">{venueDetails.city}</span>
            </div>
          </div>

          {/* Footer of the pass */}
          <div className="mt-5 pt-4 border-t border-dashed border-fairy-gold-200 flex items-center justify-between text-[11px] text-stone-400">
            <span className="flex items-center gap-1 text-fairy-pink-500 font-semibold">
              <Heart className="w-3.5 h-3.5 fill-fairy-pink-400" />
              <span>With Love, The Gangwars</span>
            </span>
            <span className="font-mono text-[10px]">ADMIT WITH JOY</span>
          </div>
        </motion.div>

        {/* Print / Save Button */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-fairy-gold-300 text-stone-700 text-xs font-semibold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-fairy-gold-500" />
            <span>Print / Save Keepsake Pass</span>
          </button>
        </div>
      </div>
    </section>
  );
}

