import React from 'react';
import { motion } from 'motion/react';
import { HERO_IMG, NAME } from '../data/content';

interface HeroSectionProps {
  onViewImage: (src: string, title: string, caption?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewImage }) => (
  <section className="relative px-4 pt-10 pb-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
    {/* Arch photo */}
    <motion.div
      className="relative mx-auto w-[min(300px,78vw)]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-3 rounded-t-full rounded-b-3xl border border-[#E7C7A0]" />
      <button
        type="button"
        onClick={() => onViewImage(HERO_IMG, 'The Birthday Boy', 'Now in Israel — still my favourite view ❤️')}
        className="block w-full aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(131,38,62,0.45)] cursor-zoom-in"
      >
        <img src={HERO_IMG} alt={`${NAME}, the birthday boy`} className="w-full h-full object-cover object-[50%_25%]" />
      </button>

      {/* stickers */}
      <motion.div
        className="absolute -left-4 top-10 bg-white rounded-full px-3 py-1.5 shadow-md text-xs font-semibold text-[#83263E] -rotate-12"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Birthday Boy 🎂
      </motion.div>
      <motion.div
        className="absolute -right-3 bottom-16 bg-[#FEF6D8] rounded-lg px-3 py-1.5 shadow-md font-handwriting text-xl text-stone-800 rotate-6"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.4, repeat: Infinity }}
      >
        all mine ♡
      </motion.div>
      <span className="absolute -top-5 right-6 text-3xl animate-heartbeat">💖</span>
    </motion.div>

    {/* Words */}
    <motion.div
      className="text-center md:text-left"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <p className="text-[11px] font-semibold tracking-[0.3em] text-[#A25064] uppercase">
        Today is all about you
      </p>
      <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold text-[#3B1F28] leading-[1.02]">
        Happy Birthday,
        <span className="block font-script font-normal text-7xl sm:text-8xl text-[#B03A55] mt-1">{NAME}</span>
      </h1>
      <p className="mt-5 font-display italic text-xl text-stone-600 max-w-md mx-auto md:mx-0">
        To the love of my life — no ocean or border can ever make what I feel for you any smaller.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 border border-rose-200 px-4 py-2 text-sm text-stone-700 shadow-sm">
        <span>🇱🇰</span>
        <span className="text-rose-400 tracking-widest text-xs">· · · ✈ · · ·</span>
        <span>🇮🇱</span>
        <span className="ml-1 font-medium">love has no distance</span>
      </div>
      <p className="mt-8 text-xs text-stone-400 animate-bounce">scroll down, there's more ↓</p>
    </motion.div>
  </section>
);
