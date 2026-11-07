import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw } from 'lucide-react';
import { playBlowCandleSound, playChimeNote } from '../utils/audio';

interface BirthdayCakeProps {
  onCandlesBlown?: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onCandlesBlown }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setWishMade(true);
    playBlowCandleSound();

    // Heart and sparkle confetti burst
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#F43F5E', '#FB7185', '#FDA4AF', '#FCD34D', '#FFFBEB'],
      });
    } catch {
      // fallback
    }

    if (onCandlesBlown) {
      onCandlesBlown();
    }
  };

  const handleRelight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCandlesLit(true);
    setWishMade(false);
    playChimeNote(659.25, 0.4, 0.15); // E5
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Cake graphic container */}
      <div 
        onClick={handleBlowCandles}
        className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
        title={candlesLit ? "Click to blow out the candles!" : "Candles are blown! Click relight below"}
      >
        {/* SVG Cake matching attachment 1 illustration */}
        <div className="w-36 h-36 relative flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="cakeBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F9FAFB" />
                <stop offset="100%" stopColor="#E5E7EB" />
              </linearGradient>
              <linearGradient id="cakeShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E5E7EB" />
                <stop offset="100%" stopColor="#D1D5DB" />
              </linearGradient>
              <radialGradient id="strawberry" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="50%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#991B1B" />
              </radialGradient>
              <radialGradient id="candleFlame" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="60%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EA580C" />
              </radialGradient>
            </defs>

            {/* Cake Base Plate Shadow */}
            <ellipse cx="80" cy="142" rx="64" ry="12" fill="#E2E8F0" opacity="0.6" />

            {/* Lower Cake Tier */}
            <path
              d="M 28,102 C 28,92 132,92 132,102 L 132,130 C 132,142 28,142 28,130 Z"
              fill="url(#cakeBody)"
            />
            {/* Top surface of lower tier */}
            <ellipse cx="80" cy="102" rx="52" ry="16" fill="#F8FAFC" />

            {/* Strawberries & Red Berries around cake rim */}
            <circle cx="36" cy="106" r="6.5" fill="url(#strawberry)" />
            <circle cx="56" cy="113" r="7" fill="url(#strawberry)" />
            <circle cx="80" cy="115" r="7.5" fill="url(#strawberry)" />
            <circle cx="104" cy="113" r="7" fill="url(#strawberry)" />
            <circle cx="124" cy="106" r="6.5" fill="url(#strawberry)" />

            {/* Whipped Cream dollops */}
            <circle cx="46" cy="103" r="5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="68" cy="107" r="5.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="92" cy="107" r="5.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="114" cy="103" r="5" fill="#FFFFFF" opacity="0.9" />

            {/* Candle 1 (Left) */}
            <rect x="52" y="72" width="6" height="24" rx="2" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="0.5" />
            <line x1="55" y1="72" x2="55" y2="67" stroke="#78716C" strokeWidth="1" />
            {candlesLit ? (
              <g className="flame-flicker" style={{ transformOrigin: '55px 67px' }}>
                <path d="M 55,54 C 58,60 58,66 55,68 C 52,66 52,60 55,54 Z" fill="url(#candleFlame)" />
                <circle cx="55" cy="63" r="2" fill="#FFFFFF" opacity="0.8" />
              </g>
            ) : (
              <g className="opacity-60 transition-opacity">
                {/* Thin smoke wisps */}
                <path d="M 55,67 Q 53,60 57,55 Q 54,50 56,45" fill="none" stroke="#A8A29E" strokeWidth="1" strokeDasharray="2,2" />
              </g>
            )}

            {/* Candle 2 (Center) */}
            <rect x="77" y="68" width="6" height="28" rx="2" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="0.5" />
            <line x1="80" y1="68" x2="80" y2="63" stroke="#78716C" strokeWidth="1" />
            {candlesLit ? (
              <g className="flame-flicker" style={{ transformOrigin: '80px 63px', animationDelay: '0.3s' }}>
                <path d="M 80,48 C 83.5,55 83.5,62 80,64 C 76.5,62 76.5,55 80,48 Z" fill="url(#candleFlame)" />
                <circle cx="80" cy="59" r="2" fill="#FFFFFF" opacity="0.8" />
              </g>
            ) : (
              <g className="opacity-60 transition-opacity">
                <path d="M 80,63 Q 83,57 79,52 Q 82,47 80,42" fill="none" stroke="#A8A29E" strokeWidth="1" strokeDasharray="2,2" />
              </g>
            )}

            {/* Candle 3 (Right) */}
            <rect x="102" y="72" width="6" height="24" rx="2" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="0.5" />
            <line x1="105" y1="72" x2="105" y2="67" stroke="#78716C" strokeWidth="1" />
            {candlesLit ? (
              <g className="flame-flicker" style={{ transformOrigin: '105px 67px', animationDelay: '0.6s' }}>
                <path d="M 105,54 C 108,60 108,66 105,68 C 102,66 102,60 105,54 Z" fill="url(#candleFlame)" />
                <circle cx="105" cy="63" r="2" fill="#FFFFFF" opacity="0.8" />
              </g>
            ) : (
              <g className="opacity-60 transition-opacity">
                <path d="M 105,67 Q 107,61 103,56 Q 106,51 104,46" fill="none" stroke="#A8A29E" strokeWidth="1" strokeDasharray="2,2" />
              </g>
            )}
          </svg>
        </div>

        {/* Floating tap hint */}
        {candlesLit && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xs pointer-events-none">
            Tap cake to blow candles 💨
          </div>
        )}
      </div>

      {/* Interaction button below cake */}
      <div className="mt-2 flex items-center gap-2">
        {candlesLit ? (
          <button
            type="button"
            onClick={handleBlowCandles}
            className="text-xs text-rose-700/80 hover:text-rose-900 font-medium py-1 px-3 rounded-full hover:bg-rose-100/60 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Make a wish & blow candles</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              ✨ Wish made!
            </span>
            <button
              type="button"
              onClick={handleRelight}
              className="text-xs text-stone-500 hover:text-stone-800 py-1 px-2.5 rounded-full hover:bg-stone-100 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Relight</span>
            </button>
          </div>
        )}
      </div>

      {wishMade && (
        <p className="mt-1 text-xs text-rose-600/90 font-medium text-center animate-fade-in max-w-xs">
          May all your biggest dreams and secret birthday wishes come true, Kuzz! ❤️
        </p>
      )}
    </div>
  );
};
