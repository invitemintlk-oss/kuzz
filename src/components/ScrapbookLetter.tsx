import React from 'react';
import { motion } from 'motion/react';
import { INVITE_LOVE_NOTE_IMG } from '../data/content';
import { SectionTitle } from './SectionTitle';

interface ScrapbookLetterProps {
  onViewImageModal: (imgSrc: string, title: string, caption?: string) => void;
}

export const ScrapbookLetter: React.FC<ScrapbookLetterProps> = ({ onViewImageModal }) => (
  <section className="py-14 px-4">
    <SectionTitle kicker="A letter for you" title="From My Heart" subtitle="Tap the card to see it bigger ♡" />

    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={() => onViewImageModal(INVITE_LOVE_NOTE_IMG, 'My birthday letter for you', 'Made with love ♡')}
        className="relative cursor-zoom-in"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape -rotate-2 z-10" />
        <img
          src={INVITE_LOVE_NOTE_IMG}
          alt="Birthday letter for Kuzz"
          className="w-full max-w-md rounded-2xl shadow-[0_30px_60px_-20px_rgba(90,60,30,0.45)]"
        />
      </button>
    </motion.div>
  </section>
);
