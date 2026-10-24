import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Heart,
  Calendar,
  ZoomIn,
  Play,
  Film,
} from 'lucide-react';

export default function MemoryGallery({ memoriesConfig, girlfriendName }) {
  const { heading, subheading, items } = memoriesConfig;
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight' && activePhotoIndex !== null) handleNext();
      if (e.key === 'ArrowLeft' && activePhotoIndex !== null) handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  // Touch Swipe for mobile (iPhone 16 Pro gesture support)
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleNext = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev + 1) % items.length);
    }
  };

  const handlePrev = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const isVideo = (url) => {
    return url && (url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.webm'));
  };

  return (
    <section id="memories" className="relative py-16 sm:py-24 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-14 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush-100 text-burgundy-700 text-xs font-semibold tracking-wider uppercase border border-blush-200"
        >
          <Camera className="w-3.5 h-3.5 text-dustyRose" />
          Our Real Memories
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-5xl text-burgundy-900 tracking-tight"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-editorial italic text-base sm:text-xl text-burgundy-700 max-w-lg mx-auto"
        >
          {subheading}
        </motion.p>
      </div>

      {/* Scrapbook Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {items.map((item, idx) => {
          const itemIsVideo = isVideo(item.image);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: parseFloat(item.rotation || '0'),
              }}
              whileHover={{
                scale: 1.03,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.25 },
              }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActivePhotoIndex(idx)}
              className="cursor-pointer group relative bg-white p-3.5 sm:p-4 rounded-xl shadow-polaroid hover:shadow-polaroid-hover border border-blush-100 transition-all"
              role="button"
              tabIndex={0}
              aria-label={`View memory: ${item.title}`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActivePhotoIndex(idx)}
            >
              {/* Washi Tape / Pin Decor on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-gold-champagne/40 backdrop-blur-sm border border-gold-champagne/60 rotate-2 z-10 opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Photo / Video Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-blush-50 flex items-center justify-center">
                {itemIsVideo ? (
                  <video
                    src={item.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23F7DDE3" width="400" height="300"/><text fill="%23652D42" font-family="serif" font-size="20" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">Our Sweet Memory ❤️</text></svg>';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-burgundy-950/10 group-hover:bg-transparent transition-colors" />

                {/* Video / Zoom Badge Indicator */}
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/85 backdrop-blur-sm text-burgundy-800 shadow-sm flex items-center gap-1 text-[10px] font-medium px-2">
                  {itemIsVideo ? (
                    <>
                      <Play className="w-3 h-3 text-dustyRose fill-dustyRose" />
                      <span>Video</span>
                    </>
                  ) : (
                    <ZoomIn className="w-3.5 h-3.5" />
                  )}
                </div>
              </div>

              {/* Polaroid Bottom Note */}
              <div className="pt-3.5 pb-1 px-1">
                <div className="flex items-center justify-between gap-1 text-[11px] text-dustyRose-dark font-medium mb-1">
                  <span className="font-sans flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gold-dark" />
                    {item.date}
                  </span>
                  <Heart className="w-3.5 h-3.5 fill-dustyRose/30 text-dustyRose group-hover:fill-dustyRose transition-colors" />
                </div>
                <h3 className="font-serif text-lg text-burgundy-900 font-semibold group-hover:text-burgundy-700 transition-colors">
                  {item.title}
                </h3>
                <p className="font-script text-base text-burgundy-800/90 leading-snug line-clamp-2 mt-0.5">
                  "{item.caption}"
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-burgundy-950/90 backdrop-blur-md p-4 safe-top safe-bottom"
            onClick={() => setActivePhotoIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="touch-target absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="touch-target absolute left-3 sm:left-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all"
              aria-label="Previous Memory"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="touch-target absolute right-3 sm:right-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all"
              aria-label="Next Memory"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              key={activePhotoIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
                {isVideo(items[activePhotoIndex].image) ? (
                  <video
                    src={items[activePhotoIndex].image}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full max-h-[65vh] object-contain"
                  />
                ) : (
                  <img
                    src={items[activePhotoIndex].image}
                    alt={items[activePhotoIndex].title}
                    className="w-full h-full max-h-[65vh] object-contain"
                  />
                )}
              </div>

              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-1.5 text-xs text-dustyRose-dark font-medium mb-1">
                  <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                  {items[activePhotoIndex].date}
                </div>
                <h4 className="font-serif text-2xl text-burgundy-900 font-bold">
                  {items[activePhotoIndex].title}
                </h4>
                <p className="font-script text-xl text-burgundy-800 mt-2 max-w-md mx-auto">
                  "{items[activePhotoIndex].caption}"
                </p>

                <p className="text-[11px] text-burgundy-500/70 mt-3 font-sans">
                  Memory {activePhotoIndex + 1} of {items.length} • Swipe or use arrows
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
