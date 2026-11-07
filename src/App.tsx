import React, { useState } from 'react';
import { RotateCcw, Share2, Check } from 'lucide-react';
import { TeaserScreen } from './components/TeaserScreen';
import { HeroSection } from './components/HeroSection';
import { BirthdayBoyGallery } from './components/BirthdayBoyGallery';
import { PolaroidGallery } from './components/PolaroidGallery';
import { ScrapbookLetter } from './components/ScrapbookLetter';
import { LoveReasonsGrid } from './components/LoveReasonsGrid';
import { FinaleSection } from './components/FinaleSection';
import { AudioToggle } from './components/AudioToggle';
import { ImageModal } from './components/ImageModal';
import { FloatingHearts } from './components/FloatingHearts';
import { INVITE_TEASER_IMG, NAME } from './data/content';

const NAV = [
  { href: '#boy', label: 'Birthday Boy' },
  { href: '#us', label: 'Us' },
  { href: '#letter', label: 'Letter' },
  { href: '#reasons', label: 'Reasons' },
  { href: '#wish', label: 'Wish' },
];

export default function App() {
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, src: '', title: '', caption: undefined as string | undefined });

  const openModal = (src: string, title: string, caption?: string) => setModal({ isOpen: true, src, title, caption });

  const openSurprise = () => {
    setOpened(true);
    window.scrollTo({ top: 0 });
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7F6] text-stone-800 font-body relative">
      <AudioToggle />

      {!opened ? (
        <TeaserScreen
          onOpenSurprise={openSurprise}
          onViewOriginal={() => openModal(INVITE_TEASER_IMG, 'Your invitation', `A little surprise from far away — for ${NAME} ❤️`)}
        />
      ) : (
        <div className="relative min-h-screen animate-page-in">
          <FloatingHearts className="opacity-60" />

          <header className="sticky top-0 z-40 bg-[#FFF7F6]/85 backdrop-blur-md border-b border-rose-200/60">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-4 py-3 pr-36 sm:pr-44">
              <a href="#top" className="font-script text-3xl text-[#83263E] whitespace-nowrap">
                {NAME} ♡
              </a>
              <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-stone-600">
                {NAV.map((n) => (
                  <a key={n.href} href={n.href} className="hover:text-rose-700 transition-colors">
                    {n.label}
                  </a>
                ))}
              </nav>
            </div>
          </header>

          <main id="top" className="relative z-10">
            <HeroSection onViewImage={openModal} />
            <div id="boy" className="scroll-mt-16">
              <BirthdayBoyGallery onViewImage={openModal} />
            </div>
            <div id="us" className="scroll-mt-16">
              <PolaroidGallery onViewImageModal={openModal} />
            </div>
            <div id="letter" className="scroll-mt-16">
              <ScrapbookLetter onViewImageModal={openModal} />
            </div>
            <div id="reasons" className="scroll-mt-16">
              <LoveReasonsGrid />
            </div>
            <div id="wish" className="scroll-mt-16">
              <FinaleSection />
            </div>
          </main>

          <footer className="relative z-10 py-8 px-4 border-t border-rose-200/60 bg-white/50 flex flex-wrap items-center justify-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => {
                setOpened(false);
                window.scrollTo({ top: 0 });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-rose-700 hover:bg-rose-50"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Open the envelope again
            </button>
            <button
              type="button"
              onClick={share}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-200 text-rose-800 hover:bg-rose-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Link copied!' : 'Copy link'}
            </button>
          </footer>
        </div>
      )}

      <ImageModal
        isOpen={modal.isOpen}
        onClose={() => setModal((m) => ({ ...m, isOpen: false }))}
        imageSrc={modal.src}
        title={modal.title}
        caption={modal.caption}
      />
    </div>
  );
}
