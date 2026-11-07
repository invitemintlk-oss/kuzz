import React from 'react';
import { motion } from 'motion/react';

interface SectionTitleProps {
  kicker: string;
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ kicker, title, subtitle }) => (
  <motion.div
    className="text-center mb-10 px-4"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6 }}
  >
    <p className="text-[11px] font-semibold tracking-[0.3em] text-[#A25064] uppercase">{kicker}</p>
    <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-[#3B1F28]">{title}</h2>
    <div className="flex items-center justify-center gap-3 mt-3 text-[#D4A373]">
      <span className="h-px w-10 bg-[#E7C7A0]" />
      <span className="text-xs">♥</span>
      <span className="h-px w-10 bg-[#E7C7A0]" />
    </div>
    {subtitle && <p className="mt-3 text-sm text-stone-500 max-w-md mx-auto">{subtitle}</p>}
  </motion.div>
);
