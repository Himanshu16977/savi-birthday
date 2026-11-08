// Web Audio API procedural synthesizer for Fairy Garden soundscapes
class FairyAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicInterval = null;
    this.volume = 0.25;
    this.isMuted = false;
    this.currentTrack = 'lullaby'; // 'lullaby' or 'celebration'
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a gentle fairy sparkle note (high bell / chime)
  playSparkle(freq = 880, duration = 0.5) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration * 0.4);

      gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  // Play an enchanted wand arpeggio
  playWandBurst() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playSparkle(freq, 0.6);
      }, idx * 75);
    });
  }

  // 1. Baby Coo & Giggles
  playBabyCoo() {
    if (this.isMuted) return;
    const pitches = [587.33, 739.99, 880.00, 1174.66, 987.77, 1318.51];
    pitches.forEach((freq, idx) => {
      setTimeout(() => {
        this.playSparkle(freq, 0.35);
      }, idx * 110);
    });
  }

  // 2. Birthday Fanfare Chime
  playBirthdayFanfare() {
    if (this.isMuted) return;
    const fanfare = [
      { f: 523.25, d: 200 },
      { f: 523.25, d: 200 },
      { f: 587.33, d: 350 },
      { f: 523.25, d: 350 },
      { f: 698.46, d: 350 },
      { f: 659.25, d: 600 },
    ];
    let time = 0;
    fanfare.forEach((note) => {
      setTimeout(() => {
        this.playSparkle(note.f, note.d / 1000);
      }, time);
      time += note.d + 60;
    });
  }

  // 3. Heartbeat Rhythm
  playHeartbeat() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const playThump = (timeOffset) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, this.ctx.currentTime + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(55, this.ctx.currentTime + timeOffset + 0.15);

        gain.gain.setValueAtTime(this.volume * 0.5, this.ctx.currentTime + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + timeOffset + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + timeOffset);
        osc.stop(this.ctx.currentTime + timeOffset + 0.25);
      };

      playThump(0);
      playThump(0.22);
      playThump(0.75);
      playThump(0.97);
    } catch {
      // Ignored
    }
  }

  // 4. Blossom Wind Chimes
  playWindChimes() {
    if (this.isMuted) return;
    const chimeFreqs = [1046.5, 1174.66, 1318.51, 1567.98, 1760.0, 2093.0];
    chimeFreqs.forEach((f, idx) => {
      setTimeout(() => {
        this.playSparkle(f, 0.8);
      }, idx * 130);
    });
  }

  // 5. Balloon Pop Sound Effect
  playBalloonPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(75, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(this.volume * 0.75, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Ignored
    }
  }

  // 5b. Magical Fireworks Sparkle Pop
  playFireworkBurst() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      this.playBalloonPop();
      setTimeout(() => this.playSparkle(1200 + Math.random() * 600, 0.4), 80);
      setTimeout(() => this.playSparkle(900 + Math.random() * 400, 0.4), 160);
    } catch {
      // Ignored
    }
  }

  // 6. Xylophone Bar Strike
  playXylophoneNote(freq) {
    if (!freq || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, t);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 3.02, t);

      gain.gain.setValueAtTime(this.volume * 0.45, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.6);
      osc2.stop(t + 0.6);
    } catch {
      // Ignored
    }
  }

  // Soft Music Box Melody Engine
  playMusicBoxNote(freq, decay = 1.0) {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, t);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.76, t);

      gain.gain.setValueAtTime(this.volume * 0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + decay);
      osc2.stop(t + decay);
    } catch {
      // Ignored
    }
  }

  // Melody 1: Gentle Music Box Lullaby ("Twinkle Twinkle Little Star")
  getLullabyMelody() {
    return [
      { note: 523.25, duration: 420 },
      { note: 523.25, duration: 420 },
      { note: 783.99, duration: 420 },
      { note: 783.99, duration: 420 },
      { note: 880.00, duration: 420 },
      { note: 880.00, duration: 420 },
      { note: 783.99, duration: 840 },
      { note: 698.46, duration: 420 },
      { note: 698.46, duration: 420 },
      { note: 659.25, duration: 420 },
      { note: 659.25, duration: 420 },
      { note: 587.33, duration: 420 },
      { note: 587.33, duration: 420 },
      { note: 523.25, duration: 840 },
      { note: 783.99, duration: 420 },
      { note: 783.99, duration: 420 },
      { note: 698.46, duration: 420 },
      { note: 698.46, duration: 420 },
      { note: 659.25, duration: 420 },
      { note: 659.25, duration: 420 },
      { note: 587.33, duration: 840 },
    ];
  }

  // Melody 2: Celebration Instrumental Music ("Happy Birthday Princess Waltz")
  getCelebrationMelody() {
    return [
      // Happy Birthday to you
      { note: 523.25, duration: 320 },
      { note: 523.25, duration: 320 },
      { note: 587.33, duration: 500 },
      { note: 523.25, duration: 500 },
      { note: 698.46, duration: 500 },
      { note: 659.25, duration: 900 },
      // Happy Birthday to you
      { note: 523.25, duration: 320 },
      { note: 523.25, duration: 320 },
      { note: 587.33, duration: 500 },
      { note: 523.25, duration: 500 },
      { note: 783.99, duration: 500 },
      { note: 698.46, duration: 900 },
      // Happy Birthday dear Savi
      { note: 523.25, duration: 320 },
      { note: 523.25, duration: 320 },
      { note: 1046.5, duration: 500 },
      { note: 880.00, duration: 500 },
      { note: 698.46, duration: 500 },
      { note: 659.25, duration: 500 },
      { note: 587.33, duration: 800 },
      // Happy Birthday to you
      { note: 932.33, duration: 320 },
      { note: 932.33, duration: 320 },
      { note: 880.00, duration: 500 },
      { note: 698.46, duration: 500 },
      { note: 783.99, duration: 500 },
      { note: 698.46, duration: 1100 },
    ];
  }

  startMusic(trackType = 'lullaby', onStateChange) {
    this.initContext();
    this.stopMusic();

    this.isPlayingMusic = true;
    this.currentTrack = trackType;
    if (onStateChange) onStateChange(true, this.currentTrack);

    const melody = trackType === 'celebration'
      ? this.getCelebrationMelody()
      : this.getLullabyMelody();

    let index = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;

      const item = melody[index];
      if (!this.isMuted) {
        this.playMusicBoxNote(item.note, 1.3);
      }

      index = (index + 1) % melody.length;
      this.musicInterval = setTimeout(playNext, item.duration + 120);
    };

    playNext();
  }

  stopMusic(onStateChange) {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
    if (onStateChange) onStateChange(false, this.currentTrack);
  }

  togglePlay(trackType = 'lullaby', onStateChange) {
    if (this.isPlayingMusic) {
      this.stopMusic(onStateChange);
    } else {
      this.startMusic(trackType, onStateChange);
    }
  }

  switchTrack(trackType, onStateChange) {
    this.currentTrack = trackType;
    if (this.isPlayingMusic) {
      this.startMusic(trackType, onStateChange);
    } else {
      if (onStateChange) onStateChange(false, this.currentTrack);
    }
  }

  toggleLullaby(onStateChange) {
    this.togglePlay('lullaby', onStateChange);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  setMute(muted) {
    this.isMuted = Boolean(muted);
    return this.isMuted;
  }

  setVolume(newVolume) {
    this.volume = Math.max(0, Math.min(1, newVolume));
    return this.volume;
  }
}

export const fairyAudio = new FairyAudioEngine();
