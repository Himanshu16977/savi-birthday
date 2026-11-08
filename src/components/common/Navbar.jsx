
import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Menu, X, Wand2, Stars } from 'lucide-react';
import { birthdayGirl } from '../../data/birthdayData';
import { fairyAudio } from '../../utils/soundEffects';

export default function Navbar({ onReplayWelcome }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Princess Savi", href: "#hero" },
    { label: "Magical Year", href: "#milestones" },
    { label: "Facts & Favorites", href: "#stats" },
    { label: "Why We Love Her", href: "#reasons" },
    { label: "Blessings", href: "#princess-blessings" },
    { label: "Fairy Garden", href: "#fairy-garden" },
    { label: "Kids' Corner", href: "#kids-corner" },
    { label: "Birthday Cake", href: "#birthday-cake" },
    { label: "Beautiful Moments", href: "#gallery" },
    { label: "Letters of Love", href: "#letters" },
    { label: "Party & Venue", href: "#celebration" },
    { label: "Blessings & Wishes", href: "#wishes" },
    { label: "Surprise Gift 🎁", href: "#surprise-gift" },
  ];

  const handleLinkClick = (e, href) => {
    fairyAudio.playSparkle(980, 0.3);
    setMobileMenuOpen(false);
  };

  const handleReplayClick = () => {
    fairyAudio.playSparkle(1100, 0.3);
    setMobileMenuOpen(false);
    if (onReplayWelcome) onReplayWelcome();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
            ? 'glass-fairy shadow-fairy py-3'
            : 'bg-transparent py-4 sm:py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Title */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-fairy-pink-300 via-fairy-lavender-300 to-fairy-gold-300 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-white animate-sparkle" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg sm:text-2xl text-stone-800 tracking-wide">
                {birthdayGirl.firstName}'s{' '}
                <span className="font-script text-2xl sm:text-3xl text-fairy-pink-500 font-semibold">
                  1st
                </span>
              </span>
              <span className="block text-[10px] uppercase font-sans tracking-widest text-fairy-lavender-500 font-semibold -mt-1 hidden sm:block">
                Magical Fairy Garden
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs xl:text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-fairy-pink-500 transition-colors relative py-1 group/link"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-fairy-pink-400 to-fairy-lavender-400 group-hover/link:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Replay Welcome Experience Pill */}
            {onReplayWelcome && (
              <button
                onClick={handleReplayClick}
                type="button"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-fairy-gold-600 bg-fairy-gold-50 hover:bg-fairy-gold-100 border border-fairy-gold-200 transition-all hover:scale-105 cursor-pointer"
                title="Replay Welcome Intro"
              >
                <Wand2 className="w-3.5 h-3.5 text-fairy-gold-500" />
                <span>Replay Intro</span>
              </button>
            )}

            <a
              href="#celebration"
              onClick={(e) => handleLinkClick(e, '#celebration')}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-stone-700 bg-white/80 hover:bg-white shadow-sm border border-fairy-pink-200 hover:border-fairy-pink-300 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-3.5 h-3.5 text-fairy-pink-400 fill-fairy-pink-300" />
              <span className="hidden xs:inline">RSVP & Details</span>
              <span className="xs:hidden">RSVP</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-xl text-stone-700 bg-white/70 hover:bg-white border border-fairy-pink-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Sheet */}
          <div className="fixed top-18 inset-x-4 max-w-sm mx-auto glass-fairy-card rounded-3xl p-6 shadow-2xl border border-white/90 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-fairy-pink-100">
              <span className="font-serif font-bold text-stone-800 text-base">
                Fairy Garden Directory
              </span>
              <Stars className="w-4 h-4 text-fairy-gold-400" />
            </div>

            <div className="flex flex-col space-y-3 mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-2 rounded-xl text-stone-700 hover:text-fairy-pink-500 hover:bg-white/80 transition-colors text-sm font-medium flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-fairy-pink-400 text-xs">✨</span>
                </a>
              ))}

              {onReplayWelcome && (
                <button
                  onClick={handleReplayClick}
                  type="button"
                  className="w-full mt-2 px-3 py-2 rounded-xl text-xs font-semibold text-fairy-gold-600 bg-fairy-gold-50 border border-fairy-gold-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-fairy-gold-500" />
                    <span>Replay Welcome Intro</span>
                  </span>
                  <span>👑</span>
                </button>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-fairy-pink-100 text-center">
              <p className="text-xs text-stone-500 font-serif italic">
                "{birthdayGirl.tagline}"
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
