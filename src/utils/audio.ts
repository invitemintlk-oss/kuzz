/**
 * Web Audio API based sweet music-box synthesizer for birthday surprise.
 * Zero external audio files needed; plays crisp, gentle crystal chime notes.
 */

let audioCtx: AudioContext | null = null;
let isMelodyPlaying = false;
let loopTimeoutId: number | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a single bell/music-box chime tone
export function playChimeNote(frequency: number, duration = 1.2, volume = 0.15) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Harmonic for authentic music box shimmer
    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(frequency * 2, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gainNode);
    oscHarmonic.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime);
    oscHarmonic.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
    oscHarmonic.stop(ctx.currentTime + duration);
  } catch (err) {
    console.debug('Audio not enabled yet', err);
  }
}

// Sweet little pop sound when clicking hearts or surprises
export function playPop() {
  playChimeNote(587.33, 0.4, 0.12); // D5
}

// Celebration sparkle sweep
export function playCelebrationSound() {
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playChimeNote(freq, 0.9, 0.14);
    }, idx * 90);
  });
}

// Candle blow whoosh + gentle chime
export function playBlowCandleSound() {
  try {
    const ctx = getAudioContext();
    // Soft noise burst for gentle breath
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.4);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch {
    // fallback
  }

  setTimeout(() => {
    playCelebrationSound();
  }, 250);
}

// Happy Birthday melody notes (Frequencies in Hz)
// C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25, D5=587.33, E5=659.25, F5=698.46
const G4 = 392.00;
const A4 = 440.00;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const F5 = 698.46;
const G5 = 783.99;

interface MelodyNote {
  freq: number;
  durationMs: number;
  pauseMs: number;
}

const HAPPY_BIRTHDAY_MELODY: MelodyNote[] = [
  // Happy Birthday to you
  { freq: G4, durationMs: 250, pauseMs: 300 },
  { freq: G4, durationMs: 250, pauseMs: 300 },
  { freq: A4, durationMs: 500, pauseMs: 550 },
  { freq: G4, durationMs: 500, pauseMs: 550 },
  { freq: C5, durationMs: 500, pauseMs: 550 },
  { freq: B4, durationMs: 900, pauseMs: 1000 },

  // Happy Birthday to you
  { freq: G4, durationMs: 250, pauseMs: 300 },
  { freq: G4, durationMs: 250, pauseMs: 300 },
  { freq: A4, durationMs: 500, pauseMs: 550 },
  { freq: G4, durationMs: 500, pauseMs: 550 },
  { freq: D5, durationMs: 500, pauseMs: 550 },
  { freq: C5, durationMs: 900, pauseMs: 1000 },

  // Happy Birthday dear Kuzz
  { freq: G4, durationMs: 250, pauseMs: 300 },
  { freq: G4, durationMs: 250, pauseMs: 300 },
  { freq: G5, durationMs: 500, pauseMs: 550 },
  { freq: E5, durationMs: 500, pauseMs: 550 },
  { freq: C5, durationMs: 500, pauseMs: 550 },
  { freq: B4, durationMs: 500, pauseMs: 550 },
  { freq: A4, durationMs: 800, pauseMs: 900 },

  // Happy Birthday to you
  { freq: F5, durationMs: 250, pauseMs: 300 },
  { freq: F5, durationMs: 250, pauseMs: 300 },
  { freq: E5, durationMs: 500, pauseMs: 550 },
  { freq: C5, durationMs: 500, pauseMs: 550 },
  { freq: D5, durationMs: 500, pauseMs: 550 },
  { freq: C5, durationMs: 1100, pauseMs: 1600 },
];

export function startMusicBoxMelody(onEnd?: () => void) {
  isMelodyPlaying = true;
  let currentDelay = 0;

  HAPPY_BIRTHDAY_MELODY.forEach((note) => {
    const timeout = window.setTimeout(() => {
      if (isMelodyPlaying) {
        playChimeNote(note.freq, note.durationMs / 1000 + 0.5, 0.11);
      }
    }, currentDelay);
    currentDelay += note.pauseMs;
    loopTimeoutId = timeout;
  });

  // Loop softly after a gentle pause
  const totalDuration = currentDelay + 1000;
  loopTimeoutId = window.setTimeout(() => {
    if (isMelodyPlaying) {
      startMusicBoxMelody(onEnd);
    } else if (onEnd) {
      onEnd();
    }
  }, totalDuration);
}

export function stopMusicBoxMelody() {
  isMelodyPlaying = false;
  if (loopTimeoutId !== null) {
    clearTimeout(loopTimeoutId);
    loopTimeoutId = null;
  }
}

export function isMusicPlaying(): boolean {
  return isMelodyPlaying;
}
