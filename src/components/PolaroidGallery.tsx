import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';
import { US_PHOTOS, Photo } from '../data/content';
import { playPop } from '../utils/audio';
import { SectionTitle } from './SectionTitle';

interface Props {
  onViewImageModal: (src: string, title: string, caption?: string) => void;
}

const Polaroid: React.FC<{ item: Photo; index: number; onView: Props['onViewImageModal'] }> = ({
  item,
  index,
  onView,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: item.rotationDeg }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
    >
      {/* washi tape */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 washi-tape z-30 pointer-events-none"
        style={{ rotate: `${-item.rotationDeg * 1.5}deg` }}
      />

      <motion.div
        className="relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => {
          playPop();
          setFlipped((f) => !f);
        }}
      >
        {/* FRONT */}
        <div className="bg-white p-3 pb-4 rounded-sm shadow-[0_12px_30px_-10px_rgba(60,30,40,0.35)] [backface-visibility:hidden]">
          <div className="relative aspect-square overflow-hidden bg-stone-100">
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ objectPosition: item.focus }}
            />
            <button
              type="button"
              aria-label="View full photo"
              onClick={(e) => {
                e.stopPropagation();
                onView(item.src, item.title, item.caption);
              }}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <h3 className="mt-3 font-handwriting text-2xl font-bold text-stone-900 leading-tight text-center">
            {item.title}
          </h3>
          <p className="font-handwriting text-lg text-stone-500 leading-snug text-center">{item.caption}</p>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-rose-400 text-center">tap to flip ↻</p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-[#FFF9EE] p-5 rounded-sm shadow-[0_12px_30px_-10px_rgba(60,30,40,0.35)] [backface-visibility:hidden] flex flex-col"
          style={{ transform: 'rotateY(180deg)', backgroundImage: 'repeating-linear-gradient(#FFF9EE 0 31px, #F3D9DE 31px 32px)' }}
        >
          <p className="font-handwriting text-lg text-rose-700">Dear {`Kuzz`} ♡</p>
          <p className="mt-2 font-handwriting text-xl sm:text-2xl text-stone-800 leading-[32px] flex-1 overflow-hidden">{item.backNote}</p>
          <p className="text-right font-handwriting text-xl text-rose-700 font-bold">— forever yours</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const PolaroidGallery: React.FC<Props> = ({ onViewImageModal }) => (
  <section className="py-14 bg-[linear-gradient(180deg,transparent,#FCEBEE_20%,#FCEBEE_80%,transparent)]">
    <SectionTitle
      kicker="Our little album"
      title="You & Me"
      subtitle="Every photo has a secret note on the back — tap a polaroid to flip it ♡"
    />
    <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {US_PHOTOS.map((item, i) => (
        <Polaroid key={item.id} item={item} index={i} onView={onViewImageModal} />
      ))}
    </div>
  </section>
);
