
import React, { useEffect } from 'react';
import { GalleryImage } from '../types';
import CloseIcon from './icons/CloseIcon';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (currentIndex < 0 || currentIndex >= images.length) return null;

  const image = images[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.caption} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
        <p className="text-white text-center mt-2 text-sm italic">{image.caption}</p>
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 md:top-2 md:right-2 bg-white rounded-full p-2 text-text-dark hover:bg-gray-200 transition"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      </div>
      <button
        onClick={onPrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-3 text-text-dark transition"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={onNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-3 text-text-dark transition"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default Lightbox;
