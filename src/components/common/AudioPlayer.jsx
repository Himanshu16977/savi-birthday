import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  Music,
  ChevronUp,
  Sliders,
  Check,
  Disc,
  Heart
} from 'lucide-react';
import { fairyAudio } from '../../utils/soundEffects';
import { backgroundMusicConfig } from '../../data/birthdayData';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [currentTrack, setCurrentTrack] = useState(backgroundMusicConfig.defaultTrack || 'celebration');
  const [showMenu, setShowMenu] = useState(false);
  const [isCustomAudioActive, setIsCustomAudioActive] = useState(false);

  const customAudioRef = useRef(null);

  // Synchronize custom HTML5 audio volume & mute if configured
  useEffect(() => {
    if (customAudioRef.current) {
      customAudioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      fairyAudio.stopMusic();
      if (customAudioRef.current) {
        customAudioRef.current.pause();
      }
    };
  }, []);

  // Handle Play/Pause Toggle (strictly initiated on user gesture)
  const handleTogglePlay = () => {
    fairyAudio.playSparkle(1050, 0.2);

    if (backgroundMusicConfig.audioFileUrl && customAudioRef.current) {
      // If a custom royalty-free audio file is configured
      if (isPlaying) {
        customAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        customAudioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsCustomAudioActive(true);
          })
          .catch(() => {
            // Fallback to procedural music box if file cannot be loaded
            fairyAudio.togglePlay(currentTrack, (playing, track) => {
              setIsPlaying(playing);
              if (track) setCurrentTrack(track);
            });
          });
      }
    } else {
      // Use built-in royalty-free procedural music box
      fairyAudio.togglePlay(currentTrack, (playing, track) => {
        setIsPlaying(playing);
        if (track) setCurrentTrack(track);
      });
    }
  };

  // Toggle Mute
  const handleToggleMute = (e) => {
    e.stopPropagation();
    fairyAudio.playSparkle(920, 0.15);

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    fairyAudio.setMute(nextMuted);

    if (customAudioRef.current) {
      customAudioRef.current.muted = nextMuted;
    }
  };

  // Change Volume Slider
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    fairyAudio.setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
      fairyAudio.setMute(false);
    }
  };

  // Select a specific melody track
  const handleSelectTrack = (trackId) => {
    fairyAudio.playSparkle(1150, 0.2);
    setCurrentTrack(trackId);
    setShowMenu(false);

    if (backgroundMusicConfig.audioFileUrl && customAudioRef.current) {
      customAudioRef.current.pause();
    }

    fairyAudio.startMusic(trackId, (playing, track) => {
      setIsPlaying(playing);
      if (track) setCurrentTrack(track);
    });
  };

  const activeTrackInfo =
    backgroundMusicConfig.tracks.find((t) => t.id === currentTrack) ||
    backgroundMusicConfig.tracks[0];

  return (
    <aside
      aria-label="Floating Background Music Player"
      role="region"
      className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-50 select-none"
    >
      {/* Optional HTML5 Audio Element for custom configured royalty-free file */}
      {backgroundMusicConfig.audioFileUrl && (
        <audio
          ref={customAudioRef}
          src={backgroundMusicConfig.audioFileUrl}
          loop
          preload="none"
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Floating Animated Musical Notes when playing */}
      <AnimatePresence>
        {isPlaying && !isMuted && (
          <div className="absolute -top-12 left-5 pointer-events-none">
            {['♪', '♫', '♬'].map((note, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 0, x: idx * 10, scale: 0.6 }}
                animate={{
                  opacity: [0, 0.95, 0],
                  y: -36,
                  x: [idx * 10, idx * 10 + (idx % 2 === 0 ? 12 : -12)],
                  scale: [0.6, 1.25, 0.8],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: idx * 0.65,
                  ease: 'easeOut',
                }}
                className="absolute text-pink-500 font-bold text-sm filter drop-shadow-xs"
              >
                {note}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Expandable Track Settings Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="mb-3 p-4 rounded-3xl glass-fairy-card bg-white/95 border-2 border-pink-200 shadow-fairy w-72 text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-pink-100">
              <div className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-pink-500" />
                <span className="text-xs font-bold text-stone-800">
                  Fairy Melodies (Royalty-Free)
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Safe & Legal
              </span>
            </div>

            {/* Track Choices */}
            <div className="space-y-1.5 mt-2.5">
              {backgroundMusicConfig.tracks.map((track) => {
                const isSelected = currentTrack === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => handleSelectTrack(track.id)}
                    className={`w-full p-2.5 rounded-2xl text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 border border-pink-200 shadow-xs'
                        : 'hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{track.icon}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold">{track.title}</span>
                          {isSelected && isPlaying && (
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400 block font-sans">
                          {track.subtitle}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-pink-600" />}
                  </button>
                );
              })}
            </div>

            {/* Volume Slider Section */}
            <div className="mt-3.5 pt-3 border-t border-pink-100">
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans mb-1.5">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-stone-400" />
                  Volume: {Math.round(volume * 100)}%
                </span>
                <span>{isMuted ? 'Muted' : 'Audible'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Public Domain & Royalty Free Assurance */}
            <div className="mt-3 text-[10px] text-stone-400 text-center font-serif italic">
              ✨ Traditional Music Box arrangement (100% Royalty-Free)
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Audio Pill Bar */}
      <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full glass-fairy-card bg-white/95 shadow-fairy hover:shadow-fairy-hover border-2 border-white transition-all duration-300">
        {/* 1. PLAY / PAUSE BUTTON */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleTogglePlay}
          type="button"
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer relative overflow-hidden ${
            isPlaying
              ? 'bg-gradient-to-tr from-pink-400 via-purple-400 to-amber-300 text-white shadow-md'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title={isPlaying ? 'Pause Melody' : 'Play Background Music'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white text-white" />
          ) : (
            <Play className="w-4 h-4 ml-0.5 fill-stone-700 text-stone-700" />
          )}
        </motion.button>

        {/* 2. MUSIC TITLE & ANIMATED SOUND INDICATOR */}
        <div
          onClick={handleTogglePlay}
          className="cursor-pointer px-1.5 sm:px-2.5 text-left select-none"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-stone-800 tracking-wide">
              {activeTrackInfo.title}
            </span>
            <Sparkles className="w-3 h-3 text-fairy-gold-400 animate-sparkle" />
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-stone-500 font-serif italic">
              {isPlaying
                ? isMuted
                  ? 'Melody Muted'
                  : 'Playing Music Box...'
                : 'Click to play melody 🎵'}
            </span>

            {/* SMALL ANIMATED MUSIC INDICATOR (4 jumping frequency bars) */}
            {isPlaying && !isMuted && (
              <div
                className="flex items-end gap-0.5 h-3"
                title="Sound active"
                aria-label="Sound active indicator"
              >
                <motion.span
                  animate={{ height: ['4px', '12px', '6px', '14px', '4px'] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-0.5 bg-pink-400 rounded-full"
                />
                <motion.span
                  animate={{ height: ['10px', '4px', '14px', '8px', '10px'] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                  className="w-0.5 bg-purple-400 rounded-full"
                />
                <motion.span
                  animate={{ height: ['6px', '14px', '8px', '4px', '6px'] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  className="w-0.5 bg-sky-400 rounded-full"
                />
                <motion.span
                  animate={{ height: ['12px', '6px', '10px', '14px', '12px'] }}
                  transition={{ duration: 0.95, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                  className="w-0.5 bg-amber-400 rounded-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* 3. EXPAND MENU BUTTON */}
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          title="Choose track & adjust volume"
          aria-label="Open track menu"
        >
          <ChevronUp
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              showMenu ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* 4. MUTE / UNMUTE BUTTON */}
        <button
          onClick={handleToggleMute}
          type="button"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-stone-600" />
          )}
        </button>
      </div>
    </aside>
  );
}