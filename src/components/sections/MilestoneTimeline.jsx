import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Crown,
  Calendar,
  Edit3,
  Camera,
  Upload,
  Check,
  X,
  RotateCcw,
  Baby,
  Smile,
  Laugh,
  ToyBrick,
  Users,
  Cake,
  Stars
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { fairyAudio } from '../../utils/soundEffects';

const INITIAL_MILESTONES = [
  {
    id: 1,
    title: "Welcome to the World – Savi's birth",
    date: "November 8, 2025",
    description: "Wrapped in a soft blush blanket, our tiny fairy princess arrived under starry skies with ten perfect fingers and a heart full of wonder.",
    icon: "Baby",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=700&q=80",
    badge: "🌸 Little Miracle",
    color: "from-pink-200 to-rose-200",
    border: "border-fairy-pink-300",
  },
  {
    id: 2,
    title: "First Smile",
    date: "December 20, 2025",
    description: "Right after her morning lullaby, Savi looked into Mum & Dad's eyes and gave the sweetest dimpled smile that melted the entire room.",
    icon: "Smile",
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=700&q=80",
    badge: "✨ Pure Sunshine",
    color: "from-purple-200 to-pink-200",
    border: "border-fairy-lavender-300",
  },
  {
    id: 3,
    title: "First Laugh",
    date: "March 15, 2026",
    description: "When Daddy blew playful raspberries on her tummy, Savi burst into the most joyous, infectious belly laughter that filled the whole home.",
    icon: "Laugh",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=700&q=80",
    badge: "💖 Golden Giggles",
    color: "from-blue-200 to-sky-200",
    border: "border-fairy-blue-300",
  },
  {
    id: 4,
    title: "First Toys",
    date: "May 10, 2026",
    description: "Discovered her beloved plush pink rabbit 'Bun-Bun' and a set of musical rattles, clutching them with tiny hands everywhere she crawled.",
    icon: "ToyBrick",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=700&q=80",
    badge: "🧸 Playful Discoveries",
    color: "from-amber-200 to-yellow-200",
    border: "border-fairy-gold-300",
  },
  {
    id: 5,
    title: "First Family Memories",
    date: "August 18, 2026",
    description: "A breezy sunny afternoon picnic with Dadu, Dadi, Nanu, and Nani, sitting on the lush garden grass surrounded by flowers and love.",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=80",
    badge: "🌿 Generations of Love",
    color: "from-emerald-200 to-teal-200",
    border: "border-emerald-300",
  },
  {
    id: 6,
    title: "First Birthday",
    date: "November 8, 2026",
    description: "365 days of unconditional love! Our baby girl turns one year old, dancing to music, clapping hands, and ready for her magical cake smash!",
    icon: "Cake",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80",
    badge: "🎂 1st Birthday Wonder",
    color: "from-pink-300 to-fairy-gold-300",
    border: "border-fairy-gold-400",
  },
];

const iconComponents = {
  Baby,
  Smile,
  Laugh,
  ToyBrick,
  Users,
  Cake,
};

export default function MilestoneTimeline() {
  const [milestones, setMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('savi_magical_year_milestones');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_MILESTONES;
  });

  const [editingMilestone, setEditingMilestone] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    image: '',
    badge: '',
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('savi_magical_year_milestones', JSON.stringify(milestones));
    } catch {
      // Storage error ignored
    }
  }, [milestones]);

  const handleOpenEdit = (m) => {
    fairyAudio.playSparkle(950, 0.25);
    setEditingMilestone(m);
    setFormData({
      title: m.title,
      date: m.date,
      description: m.description,
      image: m.image,
      badge: m.badge,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, image: event.target.result }));
        fairyAudio.playSparkle(1050, 0.2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingMilestone) return;

    fairyAudio.playWandBurst();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ffd0e0', '#cfb7f0', '#f8dc81'],
    });

    setMilestones((prev) =>
      prev.map((m) =>
        m.id === editingMilestone.id
          ? {
              ...m,
              title: formData.title.trim() || m.title,
              date: formData.date.trim() || m.date,
              description: formData.description.trim() || m.description,
              image: formData.image || m.image,
              badge: formData.badge.trim() || m.badge,
            }
          : m
      )
    );

    setEditingMilestone(null);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all milestone cards back to initial defaults?")) {
      setMilestones(INITIAL_MILESTONES);
      localStorage.removeItem('savi_magical_year_milestones');
      fairyAudio.playSparkle(850, 0.25);
    }
  };

  return (
    <section id="milestones" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background Fairytale Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-gradient-to-b from-fairy-pink-100/40 via-fairy-lavender-100/35 to-fairy-gold-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-pink-200 shadow-sm mb-3">
            <Sparkles className="w-4 h-4 text-fairy-pink-500 animate-sparkle" />
            <span className="text-xs font-semibold tracking-wider uppercase text-fairy-pink-500 font-sans">
              Interactive Baby Timeline
            </span>
            <Stars className="w-4 h-4 text-fairy-lavender-400" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
            Savi's First <span className="font-script text-4xl sm:text-6xl md:text-7xl text-fairy-pink-500">Magical Year</span>
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-3 max-w-xl mx-auto">
            "Every step, every giggle, and every heartbeat that made this year unforgettable."
          </p>

          {/* Quick info & Reset option */}
          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-stone-500">
            <span className="flex items-center gap-1 text-fairy-pink-500">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Click any card's edit button to customize photos, dates & memories</span>
            </span>
            <span>•</span>
            <button
              onClick={handleResetDefaults}
              type="button"
              className="text-stone-400 hover:text-stone-700 underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Glowing Center Line for Desktop / Left Line for Mobile */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 -translate-x-1/2 w-1 bg-gradient-to-b from-fairy-pink-300 via-fairy-lavender-300 to-fairy-gold-300 rounded-full shadow-sm" />

          {/* Timeline Milestones */}
          <div className="space-y-12 sm:space-y-16">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const IconComp = iconComponents[milestone.icon] || Sparkles;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Timeline Checkpoint Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.25, rotate: 15 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-tr from-white via-fairy-cream to-fairy-pink-100 border-4 border-white shadow-fairy flex items-center justify-center cursor-pointer group"
                      title={milestone.title}
                    >
                      <IconComp className="w-5 h-5 text-fairy-pink-500 group-hover:scale-110 transition-transform" />
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Milestone Card Content */}
                  <div className="w-full md:w-1/2 pl-14 sm:pl-16 md:pl-0 md:px-8">
                    <div
                      className={`p-6 sm:p-7 rounded-3xl glass-fairy-card bg-white/90 border-2 ${milestone.border} shadow-fairy hover:shadow-fairy-hover transition-all duration-300 relative group overflow-hidden`}
                    >
                      {/* Decorative top badge & Edit Button */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-fairy-pink-100/80">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fairy-pink-50 text-fairy-pink-600 text-xs font-bold">
                          <span>{milestone.badge}</span>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(milestone)}
                            type="button"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-stone-50 border border-fairy-pink-200 text-stone-600 hover:text-stone-900 text-xs font-semibold shadow-xs transition-transform active:scale-95 cursor-pointer"
                            title="Edit this milestone"
                          >
                            <Edit3 className="w-3 h-3 text-fairy-pink-500" />
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>

                      {/* Photo Placeholder / Live Photo */}
                      <div className="relative rounded-2xl overflow-hidden h-52 sm:h-60 mb-4 bg-stone-100 border border-fairy-pink-100 group/img">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                        />
                        {/* Floating date badge overlay */}
                        <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-xs font-bold text-stone-700 shadow-sm flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-fairy-pink-500" />
                          <span>{milestone.date}</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 leading-snug group-hover:text-fairy-pink-600 transition-colors">
                        {milestone.title}
                      </h3>

                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2.5 font-sans">
                        {milestone.description}
                      </p>

                      {/* Corner Fairy Sparkle */}
                      <Sparkles className="w-4 h-4 text-fairy-gold-400 absolute bottom-3 right-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* EDIT MILESTONE MODAL */}
        <AnimatePresence>
          {editingMilestone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm"
              onClick={() => setEditingMilestone(null)}
            >
              <div
                className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-fairy-pink-200 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setEditingMilestone(null)}
                  type="button"
                  className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2.5 pb-3 border-b border-fairy-pink-100 mb-5">
                  <div className="w-9 h-9 rounded-full bg-fairy-pink-100 text-fairy-pink-600 flex items-center justify-center">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-800">
                      Edit Milestone
                    </h3>
                    <p className="text-xs text-stone-500">
                      Personalize the photo, date, title, and memory
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveEdit} className="space-y-4">
                  {/* Image Upload / URL */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                      Milestone Photo
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 border border-fairy-pink-200 shrink-0">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-fairy-pink-200 text-xs font-semibold text-stone-700 flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5 text-fairy-pink-500" />
                          <span>Upload From Device</span>
                        </button>
                        <input
                          type="url"
                          placeholder="Or paste image URL"
                          value={formData.image.startsWith('data:') ? '' : formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl bg-stone-50 border border-fairy-pink-200 text-xs text-stone-700 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                      Milestone Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm font-semibold"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                      Customizable Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. November 8, 2025"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm"
                    />
                  </div>

                  {/* Badge */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                      Badge Accent
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 🌸 Little Miracle"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                      Short Memory Description
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm resize-none"
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingMilestone(null)}
                      className="px-4 py-2.5 rounded-2xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-fairy-pink-400 to-fairy-lavender-400 text-white text-xs font-bold shadow-fairy hover:shadow-fairy-hover transition-all"
                    >
                      Save Changes ✨
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
