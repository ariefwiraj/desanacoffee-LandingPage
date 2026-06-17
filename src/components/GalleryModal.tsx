import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGalleryStore } from '@/store/galleryStore';

export function GalleryModal() {
  const { isOpen, closeModal, images, selectedIndex, next, prev } = useGalleryStore();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal, next, prev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[selectedIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      >
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-white/20 rounded-full transition-all z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 md:left-10 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-white/20 rounded-full transition-all z-10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 md:right-10 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-white/20 rounded-full transition-all z-10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div 
          className="relative w-full max-w-5xl max-h-[85vh] px-4 md:px-24 flex flex-col items-center justify-center"
          onClick={closeModal}
        >
          <motion.img
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={currentImage.url}
            alt={currentImage.caption}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
          />
          {currentImage.caption && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-white text-lg md:text-xl font-medium text-center"
            >
              {currentImage.caption}
            </motion.p>
          )}
          <div className="absolute bottom-[-40px] text-white/50 text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
