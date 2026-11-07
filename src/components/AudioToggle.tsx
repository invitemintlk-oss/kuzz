import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { startMusicBoxMelody, stopMusicBoxMelody, isMusicPlaying } from '../utils/audio';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      stopMusicBoxMelody();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusicBoxMelody();
      setIsPlaying(false);
    } else {
      startMusicBoxMelody(() => {
        setIsPlaying(isMusicPlaying());
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute birthday music box' : 'Play birthday music box'}
        className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 shadow-sm hover:shadow-md hover:bg-rose-50/80 transition-all duration-200 text-stone-700"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-rose-600 animate-pulse" />
            <span className="text-xs font-medium text-rose-800 flex items-center gap-1">
              <Music className="w-3 h-3 text-rose-500 animate-bounce" />
              Music Box On
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-stone-400 group-hover:text-rose-500 transition-colors" />
            <span className="text-xs font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
              Play Music Box 🎵
            </span>
          </>
        )}
      </button>
    </div>
  );
};
