import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { galleryPhotos, birthdayGirl } from '../../data/birthdayData';
import { fairyAudio } from '../../utils/soundEffects';
import { getStoredPhotos, savePhotoToStorage, deletePhotoFromStorage } from '../../utils/photoStorage';

export default function MemoryGallery() {
  const [photos, setPhotos] = useState(galleryPhotos);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [photoLikes, setPhotoLikes] = useState(() => {
    const initial = {};
    galleryPhotos.forEach((p) => {
      initial[p.id] = p.likes || 85;
    });
    return initial;
  });

  // Upload Form State
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Moments');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);
  const fileInputRef = useRef(null);

  // Load persistently stored photos on mount
  useEffect(() => {
    async function loadPersistedPhotos() {
      try {
        const stored = await getStoredPhotos();
        if (stored && stored.length > 0) {
          // Merge stored custom photos at the beginning of the list
          setPhotos([...stored, ...galleryPhotos]);
          // Sync likes
          setPhotoLikes((prev) => {
            const updated = { ...prev };
            stored.forEach((p) => {
              updated[p.id] = p.likes || 12;
            });
            return updated;
          });
        }
      } catch (err) {
        console.warn("Could not load photos from storage:", err);
      }
    }
    loadPersistedPhotos();
  }, []);

  const categories = ['All', 'Moments', 'Smiles', 'Milestones', 'Adventures', 'Family'];

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter((p) => (p.category || 'Moments') === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const handleLike = (e, id) => {
    e.stopPropagation();
    fairyAudio.playSparkle(1100, 0.25);
    setPhotoLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const openLightbox = (photo) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
      fairyAudio.playSparkle(900, 0.2);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevLightbox = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Handle file select for uploading
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type: JPG, JPEG, PNG, WebP
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type.toLowerCase())) {
        alert("Please upload a valid image file (JPG, JPEG, PNG, or WebP).");
        return;
      }

      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      fairyAudio.playSparkle(980, 0.2);
    }
  };

  // Save uploaded photo to state and persistent storage
  const handleSavePhoto = async (e) => {
    e.preventDefault();
    if (!uploadPreview) return;

    setIsSaving(true);
    const newId = `user_photo_${Date.now()}`;
    const newPhoto = {
      id: newId,
      isUserUploaded: true,
      category: uploadCategory || 'Moments',
      title: uploadTitle.trim() || "Savi's Sweet Moment",
      caption: uploadCaption.trim() || "Captured with endless love in our fairyland garden.",
      url: uploadPreview,
      date: "Uploaded by Family",
      likes: 1,
      aspect: "tall",
    };

    try {
      await savePhotoToStorage(newPhoto);
    } catch (err) {
      console.warn("Storage warning, saving to active state:", err);
    }

    setPhotos([newPhoto, ...photos]);
    setPhotoLikes((prev) => ({ ...prev, [newId]: 1 }));
    setIsSaving(false);
    setIsUploadModalOpen(false);

    // Reset fields
    setUploadFile(null);
    setUploadPreview('');
    setUploadTitle('');
    setUploadCaption('');

    // Confetti celebration
    fairyAudio.playWandBurst();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd0e0', '#cfb7f0', '#ecc449'],
    });

    setUploadSuccessToast(true);
    setTimeout(() => setUploadSuccessToast(false), 3500);
  };

  const handleDeleteUploadedPhoto = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Do you want to remove this uploaded photo from your gallery?")) {
      await deletePhotoFromStorage(id);
      setPhotos(photos.filter((p) => p.id !== id));
      if (lightboxIndex !== null) setLightboxIndex(null);
    }
  };

  // Subtle tilted angles for realistic Polaroid look
  const polaroidTilts = ['-rotate-1', 'rotate-1.5', '-rotate-2', 'rotate-1', '-rotate-1.5', 'rotate-2'];

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading requested: "Our Little Fairy's Beautiful Moments" */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-pink-200 shadow-sm mb-3">
            <Camera className="w-4 h-4 text-fairy-pink-500" />
            <span className="text-xs font-semibold tracking-wider uppercase text-fairy-pink-500 font-sans">
              Photo Memory Lane
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-800 tracking-tight">
            Our Little Fairy's <span className="font-script text-4xl sm:text-6xl text-fairy-pink-500">Beautiful Moments</span>
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-2">
            "A collection of golden polaroids, baby laughter, and cherished first-year memories."
          </p>

          {/* Action Row: Category Filters & Upload Button */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-fairy-pink-400 to-fairy-lavender-400 text-white shadow-fairy scale-105'
                      : 'bg-white/80 hover:bg-white text-stone-600 border border-fairy-pink-100 hover:border-fairy-pink-200'
                  }`}
                >
                  {cat === 'All' ? 'All Moments' : cat}
                </button>
              ))}
            </div>

            {/* Upload Button */}
            <button
              onClick={() => {
                setIsUploadModalOpen(true);
                fairyAudio.playSparkle(1050, 0.25);
              }}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-fairy-gold-400 to-amber-400 text-stone-900 font-bold text-xs sm:text-sm shadow-sm hover:shadow-fairy transition-all hover:scale-105 active:scale-95 cursor-pointer ml-1"
            >
              <Upload className="w-4 h-4 text-stone-900" />
              <span>Upload Savi's Photo</span>
            </button>
          </div>

          {/* Persistent storage note */}
          <p className="text-[11px] text-stone-400 mt-3 font-sans flex items-center justify-center gap-1">
            <Info className="w-3.5 h-3.5 text-stone-400" />
            <span>Uploaded photos are securely saved to this device's browser database (IndexedDB).</span>
          </p>
        </div>

        {/* Upload Success Toast */}
        <AnimatePresence>
          {uploadSuccessToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm text-center font-medium max-w-md mx-auto shadow-sm flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Photo successfully added to Savi's Polaroid Gallery!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Responsive Grid with Beautiful Polaroid-Style Photo Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, idx) => {
              const tiltClass = polaroidTilts[idx % polaroidTilts.length];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  key={photo.id}
                  onClick={() => openLightbox(photo)}
                  className={`group relative bg-white p-3.5 pb-6 rounded-2xl shadow-fairy hover:shadow-fairy-hover transition-all duration-500 cursor-pointer border border-fairy-pink-200/80 hover:rotate-0 hover:-translate-y-2 transform ${tiltClass}`}
                >
                  {/* Decorative Washi Tape Accent */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-fairy-pink-200/60 backdrop-blur-xs rounded-sm -rotate-2 border border-white/80 shadow-xs pointer-events-none group-hover:rotate-0 transition-transform" />

                  {/* Decorative Fairy Border around photo */}
                  <div className="relative rounded-xl overflow-hidden bg-stone-100 p-1 border border-fairy-pink-100">
                    <div className="w-full h-64 rounded-lg overflow-hidden relative">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                      />

                      {/* Tag pill */}
                      <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-stone-700 shadow-xs">
                        {photo.category || 'Moments'}
                      </span>

                      {/* Delete button for user uploaded photos */}
                      {photo.isUserUploaded && (
                        <button
                          onClick={(e) => handleDeleteUploadedPhoto(e, photo.id)}
                          type="button"
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-rose-50 text-rose-500 shadow-xs transition-colors"
                          title="Delete uploaded photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Polaroid Handwritten Caption Section */}
                  <div className="pt-3 px-1 text-center">
                    <h4 className="font-serif font-bold text-stone-800 text-sm group-hover:text-fairy-pink-600 transition-colors truncate">
                      {photo.title}
                    </h4>

                    {/* Optional Caption */}
                    {photo.caption && (
                      <p className="font-script text-base text-stone-600 line-clamp-1 mt-0.5">
                        "{photo.caption}"
                      </p>
                    )}

                    {/* Footer Row: Date & Heart Likes */}
                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-sans">
                      <span className="truncate max-w-[100px]">
                        {photo.date || 'Savi’s 1st Year'}
                      </span>

                      <button
                        onClick={(e) => handleLike(e, photo.id)}
                        type="button"
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-fairy-pink-50 hover:bg-fairy-pink-100 text-fairy-pink-600 transition-transform active:scale-125"
                      >
                        <Heart className="w-3.5 h-3.5 fill-fairy-pink-400 text-fairy-pink-500" />
                        <span className="text-[10px] font-bold">
                          {photoLikes[photo.id] || 0}
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* FULL-SCREEN LIGHTBOX MODAL */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md"
              onClick={closeLightbox}
            >
              <div
                className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-7 border border-fairy-pink-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  type="button"
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Lightbox Main Image */}
                <div className="max-h-[68vh] w-full rounded-2xl overflow-hidden relative bg-stone-100 flex items-center justify-center">
                  <img
                    src={filteredPhotos[lightboxIndex].url}
                    alt={filteredPhotos[lightboxIndex].title}
                    className="max-h-[68vh] w-auto max-w-full object-contain mx-auto"
                  />
                </div>

                {/* Details Bar */}
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase font-bold text-fairy-pink-500 tracking-wider">
                      {filteredPhotos[lightboxIndex].category || 'Moments'} • Photo {lightboxIndex + 1} of {filteredPhotos.length}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-800">
                      {filteredPhotos[lightboxIndex].title}
                    </h3>
                    {filteredPhotos[lightboxIndex].caption && (
                      <p className="font-script text-lg text-stone-600">
                        "{filteredPhotos[lightboxIndex].caption}"
                      </p>
                    )}
                  </div>

                  {/* Actions: Heart + Navigation Buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={(e) => handleLike(e, filteredPhotos[lightboxIndex].id)}
                      type="button"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-fairy-pink-100 text-fairy-pink-600 text-xs font-bold hover:bg-fairy-pink-200 transition-all"
                    >
                      <Heart className="w-4 h-4 fill-fairy-pink-500 text-fairy-pink-500" />
                      <span>{photoLikes[filteredPhotos[lightboxIndex].id] || 0} Loves</span>
                    </button>

                    <button
                      onClick={prevLightbox}
                      type="button"
                      className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                      title="Previous Photo (Left Arrow)"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextLightbox}
                      type="button"
                      className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                      title="Next Photo (Right Arrow)"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHOTO UPLOAD MODAL */}
        <AnimatePresence>
          {isUploadModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm"
              onClick={() => setIsUploadModalOpen(false)}
            >
              <div
                className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-fairy-pink-200 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  type="button"
                  className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2.5 pb-3 border-b border-fairy-pink-100 mb-5">
                  <div className="w-9 h-9 rounded-full bg-fairy-pink-100 text-fairy-pink-600 flex items-center justify-center">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-800">
                      Add a Real Photo of Savi
                    </h3>
                    <p className="text-xs text-stone-500">
                      Supports JPG, JPEG, PNG, and WebP
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSavePhoto} className="space-y-4">
                  {/* File Upload Drop Area */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                      Choose Photo File
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/jpeg, image/jpg, image/png, image/webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {uploadPreview ? (
                      <div className="relative rounded-2xl overflow-hidden h-48 border-2 border-fairy-pink-200 bg-stone-50 flex items-center justify-center">
                        <img
                          src={uploadPreview}
                          alt="Upload preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-white/90 text-stone-700 text-xs font-bold shadow-xs hover:bg-white"
                        >
                          Change Photo
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-fairy-pink-200 hover:border-fairy-pink-400 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-fairy-pink-50/40 hover:bg-fairy-pink-50/70"
                      >
                        <Upload className="w-8 h-8 text-fairy-pink-400 mx-auto mb-2" />
                        <span className="text-xs font-bold text-stone-700 block">
                          Click to select a photo of Savi
                        </span>
                        <span className="text-[11px] text-stone-500 mt-1 block">
                          JPG, JPEG, PNG, or WebP up to 15MB
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                      Photo Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Savi's First Giggles in the Garden"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm"
                    />
                  </div>

                  {/* Optional Caption */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                      Handwritten Caption (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. She loved the fragrant morning roses..."
                      value={uploadCaption}
                      onChange={(e) => setUploadCaption(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300 text-sm font-script text-base text-stone-700"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                      Category Tag
                    </label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-fairy-pink-200 text-sm cursor-pointer"
                    >
                      <option value="Moments">Moments</option>
                      <option value="Smiles">Smiles</option>
                      <option value="Milestones">Milestones</option>
                      <option value="Adventures">Adventures</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>

                  {/* Persistence Disclosure */}
                  <div className="p-3 rounded-2xl bg-fairy-gold-50/60 border border-fairy-gold-200 text-[11px] text-stone-600 leading-relaxed">
                    <span className="font-bold text-fairy-gold-700 block mb-0.5">Device Storage Notice:</span>
                    Photos are securely stored in your browser's persistent IndexedDB storage on this device, so they stay saved when you return.
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!uploadPreview || isSaving}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-fairy-pink-400 via-fairy-lavender-400 to-fairy-gold-400 text-white font-semibold text-sm shadow-fairy hover:shadow-fairy-hover transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSaving ? "Saving to Fairyland..." : "Add to Polaroid Gallery ✨"}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
