import React from 'react';
import { motion } from 'motion/react';
import { HIM_PHOTOS } from '../data/content';
import { SectionTitle } from './SectionTitle';

interface Props {
  onViewImage: (src: string, title: string, caption?: string) => void;
}

export const BirthdayBoyGallery: React.FC<Props> = ({ onViewImage }) => (
  <section className="py-14">
    <SectionTitle
      kicker="Starring"
      title="The Birthday Boy"
      subtitle="A few of my favourite photos of my favourite person. Tap one to see it bigger."
    />

    <div className="max-w-5xl mx-auto px-4 flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar">
      {HIM_PHOTOS.map((p, i) => (
        <motion.button
          type="button"
          key={p.id}
          onClick={() => onViewImage(p.src, p.title, p.caption)}
          className="snap-center shrink-0 w-[68vw] max-w-[260px] lg:w-auto lg:max-w-none text-left group cursor-zoom-in"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <div className="relative rounded-t-full rounded-b-2xl overflow-hidden aspect-[3/4] bg-rose-100 shadow-lg ring-1 ring-[#E7C7A0]/70">
            <img
              src={p.src}
              alt={p.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: p.focus }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
            <span className="absolute bottom-3 left-4 text-white font-handwriting text-2xl drop-shadow">
              {p.title}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
    <p className="lg:hidden text-center text-xs text-stone-400">swipe for more →</p>
  </section>
);
