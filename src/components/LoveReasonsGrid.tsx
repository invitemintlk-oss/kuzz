import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { LOVE_REASONS } from '../data/content';
import { playPop } from '../utils/audio';
import { SectionTitle } from './SectionTitle';

export const LoveReasonsGrid: React.FC = () => {
  const [opened, setOpened] = useState<Record<number, boolean>>({});
  const count = Object.values(opened).filter(Boolean).length;

  const open = (id: number) => {
    if (opened[id]) return;
    playPop();
    const next = { ...opened, [id]: true };
    setOpened(next);
    if (Object.values(next).filter(Boolean).length === LOVE_REASONS.length) {
      try {
        confetti({ particleCount: 90, spread: 100, origin: { y: 0.6 }, colors: ['#E11D48', '#FB7185', '#FDA4AF', '#FCD34D'] });
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <section className="py-14">
      <SectionTitle
        kicker="Six little envelopes"
        title="Why I Love You"
        subtitle={`Open them all ♡  (${count}/${LOVE_REASONS.length} opened)`}
      />

      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {LOVE_REASONS.map((r, i) => {
          const isOpen = !!opened[r.id];
          return (
            <motion.button
              type="button"
              key={r.id}
              onClick={() => open(r.id)}
              className={`relative text-left rounded-2xl p-4 sm:p-6 min-h-[170px] border transition-colors duration-300 overflow-hidden ${
                isOpen ? 'bg-white border-rose-200 shadow-lg' : 'bg-[#F7C9D1] border-[#EFB3BF] shadow-md hover:bg-[#F4BCC6]'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileTap={{ scale: 0.97 }}
            >
              {!isOpen ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  {/* mini envelope flap */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1/2 bg-[#EDA6B4]"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                  />
                  <span className="relative z-10 w-11 h-11 rounded-full bg-[radial-gradient(circle_at_35%_30%,#D9465F,#9B1C36_70%)] text-[#FBD5DB] flex items-center justify-center shadow mt-6">
                    ♥
                  </span>
                  <span className="relative z-10 mt-3 text-[11px] font-semibold tracking-widest uppercase text-[#83263E]">
                    Reason #{r.id}
                  </span>
                  <span className="relative z-10 text-[11px] text-[#83263E]/70">tap to open</span>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="text-3xl">{r.emoji}</span>
                  <h3 className="mt-2 font-display text-lg sm:text-xl font-bold text-[#3B1F28] leading-tight">{r.title}</h3>
                  <p className="mt-1 font-handwriting text-lg sm:text-xl text-stone-700 leading-snug">{r.note}</p>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
