import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { BirthdayCake } from './BirthdayCake';
import { SectionTitle } from './SectionTitle';
import { playCelebrationSound } from '../utils/audio';
import { NAME, WHATSAPP_REPLY_TEXT } from '../data/content';

export const FinaleSection: React.FC = () => {
  const [hugs, setHugs] = useState(0);

  const sendHug = () => {
    setHugs((h) => h + 1);
    playCelebrationSound();
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.75 }, colors: ['#E11D48', '#FB7185', '#FDF2F8'] });
    } catch {
      /* ignore */
    }
  };

  const whatsappHref = `https://wa.me/94782737113?text=${encodeURIComponent(WHATSAPP_REPLY_TEXT)}`;

  return (
    <section className="py-14 px-4">
      <SectionTitle kicker="Last but not least" title="Make a Wish" subtitle="Close your eyes, make a wish, and blow out the candles 🕯️" />

      <motion.div
        className="max-w-xl mx-auto rounded-[32px] bg-white/80 backdrop-blur border border-rose-200 shadow-[0_30px_60px_-25px_rgba(131,38,62,0.35)] px-6 py-10 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="absolute top-4 right-4 text-[10px] font-mono text-rose-300 border border-dashed border-rose-300 rounded px-2 py-0.5 rotate-6">
          AIR MAIL · LK ✈ IL
        </span>

        <BirthdayCake />

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />

        <h3 className="font-display text-3xl font-bold text-[#3B1F28]">Send some love back</h3>
        <p className="mt-2 text-sm text-stone-600 max-w-sm mx-auto">
          5,000+ km is nothing for a hug. Tap to send one all the way to Sri Lanka — or reply to me right now.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={sendHug}
            className="px-6 py-3 rounded-full bg-[#99334D] hover:bg-[#83263E] text-white font-medium shadow-md active:scale-95 transition"
          >
            🤗 Send a hug {hugs > 0 && <span className="ml-1 text-xs bg-white/20 rounded-full px-2 py-0.5">{hugs}</span>}
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-medium shadow-md active:scale-95 transition"
          >
            💬 Reply on WhatsApp
          </a>
        </div>

        {hugs > 0 && (
          <motion.p
            key={hugs}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-handwriting text-2xl text-rose-700"
          >
            Hug received in Sri Lanka! Squeezing you back 💞
          </motion.p>
        )}
      </motion.div>

      <div className="text-center mt-14">
        <p className="font-script text-5xl text-[#B03A55]">Forever & always, my {NAME}</p>
        <p className="mt-3 text-xs text-stone-500">Sri Lanka 🇱🇰 ✈ Israel 🇮🇱 · distance means nothing when someone means everything</p>
      </div>
    </section>
  );
};
