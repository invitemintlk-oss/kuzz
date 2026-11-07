import React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  caption?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  caption,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full max-h-[92vh] flex flex-col items-center bg-stone-900 rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo preview"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full flex-1 overflow-auto flex items-center justify-center min-h-[300px]">
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full pt-3 px-2 text-center text-white">
          <h4 className="font-display text-xl sm:text-2xl font-bold">{title}</h4>
          {caption && (
            <p className="font-sans text-xs sm:text-sm text-stone-300 mt-0.5">
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
