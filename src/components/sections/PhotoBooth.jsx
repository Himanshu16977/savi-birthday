import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Download, Sparkles, Upload, RotateCcw, Heart, Crown, Frame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayGirl } from '../../data/birthdayData';
import { fairyAudio } from '../../utils/soundEffects';

const SAMPLE_PHOTO = "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=700&q=80";

const FRAMES = [
  {
    id: 'blossom',
    name: '🌸 Fairy Blossom',
    accent: '#ffacc6',
    borderStyle: 'border-fairy-pink-300',
    tag: 'Pink Floral',
    subtitle: 'Surrounded by Fairyland Blooms',
  },
  {
    id: 'royal',
    name: '👑 Royal Golden Crown',
    accent: '#ecc449',
    borderStyle: 'border-fairy-gold-300',
    tag: 'Golden Tiara',
    subtitle: 'Fit for a Little Princess',
  },
  {
    id: 'butterfly',
    name: '🦋 Enchanted Lavender',
    accent: '#b48ee4',
    borderStyle: 'border-fairy-lavender-300',
    tag: 'Stardust Butterfly',
    subtitle: 'Dancing with Fairy Dust',
  },
];

export default function PhotoBooth() {
  const [selectedPhoto, setSelectedPhoto] = useState(SAMPLE_PHOTO);
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  const [isCustomImage, setIsCustomImage] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedPhoto(event.target.result);
        setIsCustomImage(true);
        fairyAudio.playSparkle(1050, 0.25);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    fairyAudio.playWandBurst();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ffd0e0', '#cfb7f0', '#ecc449'],
    });

    // Draw to hidden canvas and trigger download
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = 600;
      canvas.height = 700;

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 600, 700);
      grad.addColorStop(0, '#fffbfd');
      grad.addColorStop(1, '#f9f4ff');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 700);

      // Inner Photo
      const photoSize = 480;
      const x = 60;
      const y = 80;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, photoSize, photoSize, 24);
      ctx.clip();
      ctx.drawImage(img, x, y, photoSize, photoSize);
      ctx.restore();

      // Border outline
      ctx.lineWidth = 10;
      ctx.strokeStyle = selectedFrame.accent;
      ctx.beginPath();
      ctx.roundRect(x - 5, y - 5, photoSize + 10, photoSize + 10, 28);
      ctx.stroke();

      // Header Text
      ctx.fillStyle = '#44403c';
      ctx.font = 'bold 22px serif';
      ctx.textAlign = 'center';
      ctx.fillText("Savi's Magical 1st Birthday", 300, 50);

      // Subtitle Bottom Text
      ctx.fillStyle = selectedFrame.accent;
      ctx.font = 'italic 18px cursive, serif';
      ctx.fillText("One Year of Pure Magic & Smiles • Nov 2026", 300, 610);

      ctx.fillStyle = '#78716c';
      ctx.font = '13px sans-serif';
      ctx.fillText("Keepsake Photo Frame • Gangwar Family", 300, 645);

      // Trigger download
      const link = document.createElement('a');
      link.download = `Savi_1st_Birthday_Keepsake_${selectedFrame.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = selectedPhoto;
  };

  const handleReset = () => {
    setSelectedPhoto(SAMPLE_PHOTO);
    setIsCustomImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent via-fairy-pink-50/40 to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-pink-200 shadow-sm mb-3">
          <Camera className="w-4 h-4 text-fairy-pink-500" />
          <span className="text-xs font-semibold tracking-wider uppercase text-fairy-pink-500 font-sans">
            Interactive Keepsake
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-800 tracking-tight">
          Fairy Floral <span className="font-script text-4xl sm:text-6xl text-fairy-pink-500">Photo Booth</span>
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-2 max-w-xl mx-auto">
          "Upload your favorite photo with baby Savi, choose an enchanted frame, and download your free birthday keepsake!"
        </p>

        {/* Frame Template Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 mb-10">
          {FRAMES.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setSelectedFrame(f);
                fairyAudio.playSparkle(950, 0.2);
              }}
              type="button"
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedFrame.id === f.id
                  ? 'bg-gradient-to-r from-fairy-pink-400 to-fairy-lavender-400 text-white shadow-fairy scale-105'
                  : 'bg-white/80 hover:bg-white text-stone-600 border border-fairy-pink-100 hover:border-fairy-pink-200'
              }`}
            >
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {/* Photo Frame Display Card */}
        <div className="relative max-w-md mx-auto rounded-3xl glass-fairy-card p-6 shadow-fairy border-2 border-white text-center bg-white/90">
          {/* Frame Header Monogram */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-fairy-pink-100 text-xs text-stone-600">
            <span className="font-serif font-bold text-stone-800">
              Savi's 1st Birthday
            </span>
            <span className="font-script text-base text-fairy-pink-500 font-semibold">
              {selectedFrame.tag}
            </span>
          </div>

          {/* Framed Photo Container */}
          <div
            className={`relative w-full h-80 rounded-2xl overflow-hidden border-4 ${selectedFrame.borderStyle} shadow-inner bg-stone-100 group`}
          >
            <img
              src={selectedPhoto}
              alt="Birthday Keepsake"
              className="w-full h-full object-cover object-center"
            />

            {/* Corner Fairytale Accents */}
            <span className="absolute top-2 left-2 text-lg">🌸</span>
            <span className="absolute top-2 right-2 text-lg">✨</span>
            <span className="absolute bottom-2 left-2 text-lg">🦋</span>
            <span className="absolute bottom-2 right-2 text-lg">💖</span>

            {/* Bottom Overlay Label */}
            <div className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-stone-900/60 to-transparent text-white text-[11px] font-serif italic">
              "Forever Cherished in Our Fairyland"
            </div>
          </div>

          {/* Frame Caption */}
          <div className="mt-4 space-y-1">
            <p className="font-script text-2xl text-fairy-pink-500 font-semibold">
              {selectedFrame.subtitle}
            </p>
            <p className="text-xs text-stone-500 font-sans">
              Princess Savi Gangwar • November 8, 2026
            </p>
          </div>

          {/* Controls: Upload & Download */}
          <div className="mt-6 pt-4 border-t border-fairy-pink-100 flex flex-wrap items-center justify-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-fairy-pink-200 text-stone-700 text-xs font-semibold shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-fairy-pink-500" />
              <span>{isCustomImage ? 'Change Photo' : 'Upload Your Photo'}</span>
            </button>

            <button
              onClick={handleDownload}
              type="button"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-fairy-pink-400 to-fairy-lavender-400 text-white text-xs font-semibold shadow-xs hover:shadow-fairy transition-all hover:scale-105 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Keepsake Frame</span>
            </button>

            {isCustomImage && (
              <button
                onClick={handleReset}
                type="button"
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                title="Reset to sample photo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Hidden Canvas for High-Res Composite Generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </section>
  );
}

