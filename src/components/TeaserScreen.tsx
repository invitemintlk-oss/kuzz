import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Image as ImageIcon } from 'lucide-react';
import { FloatingHearts } from './FloatingHearts';
import { playCelebrationSound, playPop } from '../utils/audio';
import { NAME } from '../data/content';

interface TeaserScreenProps {
  onOpenSurprise: () => void;
  onViewOriginal: () => void;
}

type Stage = 'sealed' | 'opening' | 'card';

export const TeaserScreen: React.FC<TeaserScreenProps> = ({ onOpenSurprise, onViewOriginal }) => {
  const [stage, setStage] = useState<Stage>('sealed');

  const breakSeal = () => {
    if (stage !== 'sealed') return;
    playPop();
    setStage('opening');
    window.setTimeout(() => {
      setStage('card');
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#E11D48', '#FB7185', '#FDA4AF', '#FCD34D', '#FFFFFF'],
          shapes: ['circle'],
        });
      } catch {
        /* ignore */
      }
    }, 1300);
  };

  const handleOpen = () => {
    playCelebrationSound();
    try {
      const burst = (x: number) =>
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { x, y: 0.7 },
          colors: ['#E11D48', '#FB7185', '#F472B6', '#FBBF24', '#FFFFFF'],
        });
      burst(0.2);
      burst(0.8);
    } catch {
      /* ignore */
    }
    onOpenSurprise();
  };

  return (
    <div className="min-h-[100svh] w-full flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#FFE4E9_0%,#FFF5F6_45%,#FBE7EA_100%)]">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {stage !== 'card' ? (
          /* ---------------- ENVELOPE ---------------- */
          <motion.div
            key="envelope"
            className="relative z-10 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60, scale: 0.9, transition: { duration: 0.5 } }}
          >
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-[#A25064] uppercase mb-3">
              A little surprise from far away
            </p>
            <h1 className="font-script text-5xl sm:text-6xl text-[#83263E] mb-10">
              For {NAME}
            </h1>

            <div
              className="envelope relative w-[min(330px,86vw)] aspect-[3/2] cursor-pointer select-none"
              onClick={breakSeal}
              role="button"
              aria-label="Open the envelope"
            >
              {/* back */}
              <div className="absolute inset-0 rounded-md bg-[#E9A3B0] shadow-[0_25px_50px_-12px_rgba(131,38,62,0.35)]" />

              {/* letter peeking out */}
              <motion.div
                className="absolute left-[7%] right-[7%] top-[8%] bottom-[6%] rounded bg-[#FFFDF9] border border-rose-100 flex flex-col items-center justify-start pt-4"
                style={{ zIndex: stage === 'opening' ? 2 : 1 }}
                animate={stage === 'opening' ? { y: '-46%' } : { y: 0 }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-script text-2xl text-[#83263E]">Happy Birthday</span>
                <span className="text-rose-400 text-sm">♥ ♥ ♥</span>
              </motion.div>

              {/* front pocket with V cut */}
              <div
                className="absolute inset-0 rounded-md bg-[#F4BCC6] z-[3]"
                style={{ clipPath: 'polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)' }}
              />
              <div
                className="absolute inset-0 z-[3] pointer-events-none"
                style={{
                  clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)',
                  background: 'linear-gradient(to top, #F1AEBB, #F6C6CF)',
                }}
              />

              {/* flap */}
              <motion.div
                className="absolute left-0 right-0 top-0 h-[56%] origin-top"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: 'linear-gradient(to bottom, #E58FA0, #EDA6B4)',
                  zIndex: stage === 'opening' ? 0 : 4,
                  transformPerspective: 800,
                }}
                animate={{ rotateX: stage === 'opening' ? 180 : 0 }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
              />

              {/* wax seal */}
              <AnimatePresence>
                {stage === 'sealed' && (
                  <motion.div
                    className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 z-[5]"
                    exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.3 } }}
                  >
                    <div className="seal-pulse w-16 h-16 rounded-full bg-[radial-gradient(circle_at_35%_30%,#D9465F,#9B1C36_70%)] shadow-[0_4px_10px_rgba(0,0,0,0.25),inset_0_-3px_6px_rgba(0,0,0,0.25)] flex items-center justify-center border-2 border-[#B8283F]">
                      <span className="text-[#FBD5DB] text-2xl leading-none">♥</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.p
              className="mt-10 font-handwriting text-2xl text-[#83263E]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              {stage === 'sealed' ? 'tap the heart seal to open 💌' : 'opening…'}
            </motion.p>
          </motion.div>
        ) : (
          /* ---------------- INVITATION CARD ---------------- */
          <motion.main
            key="card"
            className="relative z-10 w-full max-w-sm"
            initial={{ opacity: 0, y: 80, rotate: -3, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 110, damping: 14 }}
          >
            <div className="relative rounded-[28px] bg-[#FFFDF9] p-2.5 shadow-[0_30px_60px_-15px_rgba(131,38,62,0.35)]">
              <div className="rounded-[22px] border border-[#E7C7A0] px-6 pt-8 pb-7 text-center relative overflow-hidden">
                {/* corner flourishes */}
                <span className="absolute top-3 left-4 text-[#D4A373] text-lg">❦</span>
                <span className="absolute top-3 right-4 text-[#D4A373] text-lg -scale-x-100">❦</span>

                <p className="text-[10px] font-semibold tracking-[0.32em] text-[#A25064] uppercase">
                  A little surprise from far away
                </p>

                {/* heart-framed couple photo */}
                <div className="relative mx-auto mt-6 mb-5 w-36 h-36">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-200 via-amber-100 to-rose-200 animate-spin-slow" />
                  <img
                    src="/photos/us-white-shirt.jpeg"
                    alt="Us"
                    className="absolute inset-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-full object-cover object-[45%_45%] border-4 border-[#FFFDF9]"
                  />
                  <span className="absolute -bottom-1 -right-1 text-3xl animate-heartbeat">❤️</span>
                </div>

                <h1 className="font-display text-[2.6rem] leading-[1.05] font-bold text-[#83263E]">
                  Happy Birthday,
                </h1>
                <p className="font-script text-6xl text-[#B03A55] -mt-1">{NAME}</p>

                <div className="flex items-center justify-center gap-3 my-4 text-[#D4A373]">
                  <span className="h-px w-12 bg-[#E7C7A0]" />
                  <span className="text-sm">♥</span>
                  <span className="h-px w-12 bg-[#E7C7A0]" />
                </div>

                <p className="font-display italic text-xl text-[#523B44]">
                  Someone who loves you
                  <br />
                  has a surprise…
                </p>

                <button
                  type="button"
                  onClick={handleOpen}
                  className="shine mt-7 w-full relative overflow-hidden py-3.5 px-6 rounded-full bg-[#99334D] hover:bg-[#83263E] text-white font-medium text-lg shadow-lg shadow-rose-900/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open your surprise</span>
                  <span className="text-xl">💌</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onViewOriginal}
              className="mx-auto mt-5 text-xs text-[#9B5B6D] hover:text-[#83263E] underline underline-offset-4 flex items-center gap-1.5 transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>View the original invitation card</span>
            </button>
          </motion.main>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-3 z-10 text-center text-[11px] text-stone-400">
        Made with love · Sri Lanka 🇱🇰 ✈ Israel 🇮🇱
      </footer>
    </div>
  );
};
