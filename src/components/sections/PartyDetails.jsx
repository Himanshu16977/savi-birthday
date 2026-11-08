import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Navigation,
  CheckCircle,
  Heart,
  Users,
  Plus,
  Minus,
  GlassWater,
  Crown,
  Film,
  Cake,
  Wand2,
  UtensilsCrossed,
  Shirt,
  Compass,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayGirl, partySchedule, venueDetails } from '../../data/birthdayData';
import { fairyAudio } from '../../utils/soundEffects';

const scheduleIcons = {
  GlassWater,
  Crown,
  Film,
  Cake,
  Wand2,
  UtensilsCrossed,
};

// Dress code colors requested: Pastel Pink, Lavender, Baby Blue, Soft Gold
const DRESS_CODE_PALETTE = [
  { name: "Pastel Pink", hex: "#ffd0e0", border: "#ffacc6", tip: "Blush gowns, shirts & floral dresses" },
  { name: "Lavender", hex: "#e5d7f7", border: "#cfb7f0", tip: "Soft violet coats, skirts & pastels" },
  { name: "Baby Blue", hex: "#c5e5fa", border: "#99d2f6", tip: "Sky blue linens & gentle tones" },
  { name: "Soft Gold", hex: "#dfb76c", border: "#f8dc81", tip: "Champagne, cream & golden accessories" },
];

export default function PartyDetails() {
  const [guestCount, setGuestCount] = useState(2);
  const [rsvpData, setRsvpData] = useState({
    name: '',
    phone: '',
    attendance: 'attending',
    note: '',
  });

  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'schedule' | 'rsvp'

  // Generate and download .ics calendar invite
  const handleAddToCalendar = () => {
    fairyAudio.playSparkle(1050, 0.3);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Savi Birthday//Celebration Venue//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Happy 1st Birthday Savi Gangwar! 🎂`,
      `DESCRIPTION:Celebration of Princess Savi Gangwar\'s 1st Birthday at ${venueDetails.name}. Dress Code: ${venueDetails.dressCode}.`,
      `LOCATION:${venueDetails.name}, ${venueDetails.address}, ${venueDetails.city}`,
      'DTSTART:20261115T113000Z',
      'DTEND:20261115T163000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Savi_1st_Birthday_Celebration.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleIncrement = () => {
    fairyAudio.playSparkle(950, 0.15);
    setGuestCount((prev) => Math.min(10, prev + 1));
  };

  const handleDecrement = () => {
    fairyAudio.playSparkle(800, 0.15);
    setGuestCount((prev) => Math.max(1, prev - 1));
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpData.name.trim()) return;

    fairyAudio.playWandBurst();

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#ffd0e0', '#cfb7f0', '#99d2f6', '#f8dc81', '#ecc449'],
    });

    try {
      const existing = JSON.parse(localStorage.getItem('savi_rsvps') || '[]');
      existing.push({
        ...rsvpData,
        guests: guestCount,
        date: new Date().toLocaleDateString(),
      });
      localStorage.setItem('savi_rsvps', JSON.stringify(existing));
    } catch {
      // Ignored
    }

    setRsvpConfirmed(true);
  };

  return (
    <section id="celebration" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-fairy-pink-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-fairy-lavender-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-gold-300/60 shadow-sm mb-3">
            <Sparkles className="w-4 h-4 text-fairy-gold-500 animate-sparkle" />
            <span className="text-xs font-semibold tracking-wider uppercase text-fairy-gold-600 font-sans">
              Royal Celebration Details
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
            Celebration Venue & <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500">Party Details</span>
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-3 max-w-xl mx-auto">
            "Everything you need to know to join us in celebrating Savi's magical first year."
          </p>
        </div>

        {/* Top Key Info Highlights (Venue, Date & Time, Address) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {/* 1. Venue Name Card */}
          <div className="p-6 sm:p-7 rounded-3xl glass-fairy-card border-2 border-fairy-pink-200/80 shadow-fairy hover:shadow-fairy-hover transition-all text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-fairy-pink-200 to-rose-200 flex items-center justify-center text-fairy-pink-600 mb-3 shadow-inner">
              <Crown className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-fairy-pink-500 mb-1">
              Celebration Venue
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-800">
              {venueDetails.name}
            </h3>
            <span className="text-xs text-stone-500 mt-1">
              {venueDetails.hall}
            </span>
          </div>

          {/* 2. Date & Time Card */}
          <div className="p-6 sm:p-7 rounded-3xl glass-fairy-card border-2 border-fairy-lavender-200/80 shadow-fairy hover:shadow-fairy-hover transition-all text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-fairy-lavender-200 to-purple-200 flex items-center justify-center text-fairy-lavender-600 mb-3 shadow-inner">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-fairy-lavender-500 mb-1">
              Date & Time
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-800">
              {venueDetails.dateTime}
            </h3>
            <span className="text-xs text-stone-500 mt-1">
              Sunday Evening Celebration
            </span>
          </div>

          {/* 3. Address Card */}
          <div className="p-6 sm:p-7 rounded-3xl glass-fairy-card border-2 border-fairy-gold-200/80 shadow-fairy hover:shadow-fairy-hover transition-all text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-200 to-fairy-gold-200 flex items-center justify-center text-amber-700 mb-3 shadow-inner">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-fairy-gold-600 mb-1">
              Location Address
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-800">
              {venueDetails.address}
            </h3>
            <span className="text-xs text-stone-500 mt-1">
              {venueDetails.city}
            </span>
          </div>
        </div>

        {/* Action Buttons: Add to Calendar & Get Directions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={handleAddToCalendar}
            type="button"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-white hover:bg-stone-50 border-2 border-fairy-pink-300 text-stone-800 font-bold text-sm shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-fairy-pink-500" />
            <span>Add to Calendar (.ics)</span>
          </button>

          <a
            href={venueDetails.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-fairy-blue-400 via-sky-400 to-fairy-lavender-400 text-white font-bold text-sm shadow-md hover:shadow-fairy transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* 2-Column Main Section: Left = Dress Code & Map, Right = Interactive RSVP Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Dress Code & Map Placeholder */}
          <div className="lg:col-span-7 space-y-6">
            {/* DRESS CODE GUIDE CARD */}
            <div className="p-6 sm:p-8 rounded-3xl glass-fairy-card bg-white/90 border-2 border-fairy-pink-200/80 shadow-fairy">
              <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-fairy-pink-100">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-fairy-pink-200 to-fairy-lavender-200 flex items-center justify-center text-fairy-pink-600 shadow-inner">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-800">
                    Dress Code Guide
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Fairytale Garden Palette (Pastel Pink, Lavender, Baby Blue & Soft Gold)
                  </p>
                </div>
              </div>

              {/* Color Swatches Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DRESS_CODE_PALETTE.map((color) => (
                  <div
                    key={color.name}
                    className="p-3.5 rounded-2xl bg-white border border-stone-200/70 shadow-xs flex flex-col items-center text-center transition-transform hover:scale-105"
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm mb-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-serif font-bold text-xs text-stone-800 block">
                      {color.name}
                    </span>
                    <span className="text-[10px] text-stone-500 font-sans mt-0.5 leading-snug">
                      {color.tip}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-fairy-pink-100/70 flex items-center justify-between text-xs text-stone-500 font-serif italic">
                <span>"Come dressed in your favorite soft pastel and fairy florals!"</span>
                <Sparkles className="w-4 h-4 text-fairy-gold-400" />
              </div>
            </div>

            {/* MAP PLACEHOLDER WITH "GET DIRECTIONS" */}
            <div className="p-6 sm:p-8 rounded-3xl glass-fairy-card bg-white/90 border-2 border-fairy-blue-200/80 shadow-fairy overflow-hidden relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-fairy-blue-100">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-fairy-blue-500" />
                  <h3 className="font-serif text-lg font-bold text-stone-800">
                    Location & Directions
                  </h3>
                </div>
                <span className="text-xs text-fairy-blue-600 font-semibold">
                  Celebration City
                </span>
              </div>

              {/* Styled Visual Map Placeholder */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 border border-fairy-blue-200 flex flex-col items-center justify-center p-6 text-center group">
                {/* Decorative map grid lines */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Animated Pulsing Pin */}
                <div className="relative z-10 mb-2">
                  <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6 fill-white" />
                  </div>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-stone-900/20 rounded-full blur-[1px]" />
                </div>

                <h4 className="relative z-10 font-serif font-bold text-stone-800 text-lg">
                  {venueDetails.name}
                </h4>
                <p className="relative z-10 text-xs text-stone-600 font-sans mt-0.5">
                  {venueDetails.address}, {venueDetails.city}
                </p>

                <div className="relative z-10 mt-4">
                  <a
                    href={venueDetails.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-stone-800 text-xs font-bold shadow-md hover:bg-stone-50 border border-stone-200 transition-all hover:scale-105"
                  >
                    <Navigation className="w-3.5 h-3.5 text-fairy-blue-500" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: INTERACTIVE RSVP CARD WITH GUEST COUNTER */}
          <div className="lg:col-span-5 glass-fairy-card bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-fairy-pink-200 shadow-fairy">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-fairy-pink-100">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-fairy-pink-200 to-rose-200 flex items-center justify-center text-fairy-pink-600 shadow-inner">
                <Heart className="w-5 h-5 fill-fairy-pink-400 text-fairy-pink-500" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-800">
                  Digital RSVP Card
                </h3>
                <p className="text-xs text-stone-500 font-sans">
                  Please let us know if you can join the magic!
                </p>
              </div>
            </div>

            {rsvpConfirmed ? (
              <div className="p-8 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-stone-800">
                  RSVP Received! ✨
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  Thank you, <span className="font-bold text-stone-800">{rsvpData.name}</span>! We have reserved seats for{' '}
                  <span className="font-bold text-fairy-pink-600">{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>. Can't wait to celebrate with you at The Grand Blossom Pavilion!
                </p>
                <button
                  onClick={() => setRsvpConfirmed(false)}
                  type="button"
                  className="mt-4 px-5 py-2 rounded-full text-xs font-semibold text-stone-600 bg-white border border-stone-200 hover:bg-stone-50 transition-colors"
                >
                  Edit RSVP Details
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                {/* Guest Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma & Family"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm"
                  />
                </div>

                {/* INTERACTIVE GUEST COUNTER */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                    Number of Guests Attending *
                  </label>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-fairy-pink-200">
                    <div className="flex items-center gap-2 text-stone-700">
                      <Users className="w-4 h-4 text-fairy-pink-500" />
                      <span className="text-sm font-semibold">Total Guests:</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={guestCount <= 1}
                        className="w-8 h-8 rounded-full bg-white border border-fairy-pink-200 hover:bg-fairy-pink-50 flex items-center justify-center text-stone-700 font-bold disabled:opacity-40 transition-transform active:scale-90"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="font-serif font-bold text-lg text-fairy-pink-600 w-6 text-center">
                        {guestCount}
                      </span>

                      <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={guestCount >= 10}
                        className="w-8 h-8 rounded-full bg-white border border-fairy-pink-200 hover:bg-fairy-pink-50 flex items-center justify-center text-stone-700 font-bold disabled:opacity-40 transition-transform active:scale-90"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Attendance Status */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                    Will you be joining us? *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpData({ ...rsvpData, attendance: 'attending' })}
                      className={`p-3 rounded-2xl text-xs font-semibold border transition-all text-center ${
                        rsvpData.attendance === 'attending'
                          ? 'bg-gradient-to-r from-fairy-pink-100 to-fairy-lavender-100 border-fairy-pink-300 text-fairy-pink-700 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-white'
                      }`}
                    >
                      ✨ Joyfully Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpData({ ...rsvpData, attendance: 'regret' })}
                      className={`p-3 rounded-2xl text-xs font-semibold border transition-all text-center ${
                        rsvpData.attendance === 'regret'
                          ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-white'
                      }`}
                    >
                      💕 Sending Love
                    </button>
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+91 98765 00000"
                      value={rsvpData.phone}
                      onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm"
                    />
                  </div>
                </div>

                {/* Note / Dietary */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                    Special Message or Dietary Note
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian / Need high chair for toddler"
                    value={rsvpData.note}
                    onChange={(e) => setRsvpData({ ...rsvpData, note: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-fairy-pink-400 via-fairy-lavender-400 to-fairy-gold-400 text-white font-bold text-sm shadow-fairy hover:shadow-fairy-hover transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Confirm My RSVP ✨
                </button>
              </form>
            )}
          </div>
        </div>

        {/* PARTY SCHEDULE TIMELINE */}
        <div className="mt-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-fairy-lavender-500 block mb-1">
              Celebration Itinerary
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-stone-800">
              Party Schedule Timeline
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-stone-500 mt-1">
              Sunday, 15 November 2026 at 5:00 PM onwards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partySchedule.map((item, idx) => {
              const IconComp = scheduleIcons[item.icon] || Sparkles;

              return (
                <div
                  key={item.title}
                  className="p-6 rounded-3xl glass-fairy-card bg-white/90 border-2 border-fairy-pink-100 shadow-sm hover:shadow-fairy transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-fairy-pink-100 to-fairy-lavender-100 text-fairy-pink-600 text-xs font-bold">
                        {item.time}
                      </span>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-stone-800 mb-2 group-hover:text-fairy-pink-600 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
