import React from 'react';

// Deterministic positions so the layout is stable between renders
const HEARTS = [
  { left: '6%', size: 14, delay: 0, dur: 11, char: '♥' },
  { left: '14%', size: 22, delay: 3, dur: 14, char: '♡' },
  { left: '23%', size: 12, delay: 6, dur: 10, char: '♥' },
  { left: '34%', size: 18, delay: 1.5, dur: 13, char: '✿' },
  { left: '45%', size: 10, delay: 8, dur: 12, char: '♥' },
  { left: '56%', size: 20, delay: 4, dur: 15, char: '♡' },
  { left: '66%', size: 13, delay: 9, dur: 11, char: '♥' },
  { left: '75%', size: 24, delay: 2, dur: 16, char: '♡' },
  { left: '84%', size: 12, delay: 7, dur: 10, char: '✿' },
  { left: '92%', size: 17, delay: 5, dur: 13, char: '♥' },
];

export const FloatingHearts: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div aria-hidden className={`pointer-events-none fixed inset-0 overflow-hidden z-0 ${className}`}>
    {HEARTS.map((h, i) => (
      <span
        key={i}
        className="rise-heart absolute bottom-[-40px] text-rose-300/50"
        style={{
          left: h.left,
          fontSize: h.size,
          animationDelay: `${h.delay}s`,
          animationDuration: `${h.dur}s`,
        }}
      >
        {h.char}
      </span>
    ))}
  </div>
);
