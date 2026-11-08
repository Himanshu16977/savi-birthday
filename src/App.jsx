import React, { useState } from 'react';
import WelcomeExperience from './components/common/WelcomeExperience';
import Navbar from './components/common/Navbar';
import FloatingElements from './components/common/FloatingElements';
import StardustTrail from './components/common/StardustTrail';
import AudioPlayer from './components/common/AudioPlayer';
import SendLoveFloating from './components/common/SendLoveFloating';
import HeroSection from './components/sections/HeroSection';
import MilestoneTimeline from './components/sections/MilestoneTimeline';
import BabyStats from './components/sections/BabyStats';
import TenReasons from './components/sections/TenReasons';
import PrincessBlessings from './components/sections/PrincessBlessings';
import FairyGarden from './components/sections/FairyGarden';
import BabySoundboard from './components/sections/BabySoundboard';
import SaviQuiz from './components/sections/SaviQuiz';
import KidsCorner from './components/sections/KidsCorner';
import CakeSmashWish from './components/sections/CakeSmashWish';
import MemoryGallery from './components/sections/MemoryGallery';
import PhotoBooth from './components/sections/PhotoBooth';
import LettersOfLove from './components/sections/LettersOfLove';
import BrotherLetter from './components/sections/BrotherLetter';
import PartyDetails from './components/sections/PartyDetails';
import KeepsakePass from './components/sections/KeepsakePass';
import WishesWall from './components/sections/WishesWall';
import MagicalGiftBox from './components/sections/MagicalGiftBox';
import GiftBlessings from './components/sections/GiftBlessings';
import Footer from './components/common/Footer';

export default function App() {
  const [welcomeActive, setWelcomeActive] = useState(true);

  return (
    <div className="relative min-h-screen text-stone-700 bg-fairy-cream selection:bg-fairy-pink-200 selection:text-fairy-pink-600 antialiased font-sans">
      {/* Interactive Welcome Experience Gate */}
      {welcomeActive && (
        <WelcomeExperience onEnter={() => setWelcomeActive(false)} />
      )}

      {/* Interactive Cursor Stardust Trail */}
      <StardustTrail />

      {/* Ambient Fairy Garden Floating Petals & Butterflies */}
      <FloatingElements />

      {/* Floating Audio Lullaby Controller */}
      <AudioPlayer />

      {/* Floating Send Love to Savi Reaction Button with Live Counter */}
      <SendLoveFloating />

      {/* Top Navigation Bar with Replay Intro Option */}
      <Navbar onReplayWelcome={() => setWelcomeActive(true)} />

      {/* Main Experience Flow */}
      <main>
        {/* 1. Hero Section with Live Countdown, Animated Cake & Balloons */}
        <HeroSection />

        {/* 2. Savi's First Magical Year: Interactive Vertical Timeline */}
        <MilestoneTimeline />

        {/* 3. Baby World: 1-Year Facts & Superpowers */}
        <BabyStats />

        {/* 4. 10 Reasons Why We Love Our Little Savi */}
        <TenReasons />

        {/* 5. Blessings for Our Little Princess */}
        <PrincessBlessings />

        {/* 6. Savi's Enchanted Fairy Garden: Glowing Mushrooms, Fairy Cottages & Flower Wishes */}
        <FairyGarden />

        {/* 6. Interactive Baby Soundboard & Melody Garden */}
        <BabySoundboard />

        {/* 6. Playful Baby Trivia Quiz */}
        <SaviQuiz />

        {/* 7. Little Kids' Magical Corner: Pop the Balloons & Rainbow Xylophone */}
        <KidsCorner />

        {/* 8. Interactive Make a Wish & Blow the 1st Candle Minigame */}
        <CakeSmashWish />

        {/* 8. Our Little Fairy's Beautiful Moments: Polaroid Gallery with Upload */}
        <MemoryGallery />

        {/* 8. Fairy Floral Photo Booth: Custom Keepsake Frame Generator */}
        <PhotoBooth />

        {/* 9. Letters of Love: Keepsake Letters from Mom, Dad & Grandparents */}
        <LettersOfLove />

        {/* 10. A Letter From Your Brother: Interactive Envelope with Golden Heart Seal */}
        <BrotherLetter />

        {/* 11. Party Details: Venue, Schedule, Dress Code & Digital RSVP */}
        <PartyDetails />

        {/* 12. Personalized Keepsake VIP Fairyland Pass */}
        <KeepsakePass />

        {/* 13. Blessings & Wishes For Our Little Fairy: Wall with Stickers */}
        <WishesWall />

        {/* 14. Magical Gift Box: Interactive Surprise with Glowing Stars & Butterflies */}
        <MagicalGiftBox />

        {/* 15. Thoughtful Gifts & Blessings Registry Note */}
        <GiftBlessings />
      </main>

      {/* Fairytale Footer with Replay Intro Button */}
      <Footer onReplayWelcome={() => setWelcomeActive(true)} />
    </div>
  );
}
