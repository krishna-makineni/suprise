import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Feather, RotateCcw, Eye, Heart, Sparkles } from 'lucide-react';

export default function LoveLetter({ letterConfig, girlfriendName }) {
  const { heading, paperHeader, dateStamp, paragraphs, signoff, author } = letterConfig;

  // Flattened text for typing calculation
  const fullText = paragraphs.join('\n\n');
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const typingSpeedRef = useRef(18); // ms per character

  // Start typing when section comes into view
  const handleInView = () => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
    }
  };

  useEffect(() => {
    if (!hasStartedTyping || isTypingComplete) return;

    if (displayedLength < fullText.length) {
      const timer = setTimeout(() => {
        // Step faster by chunks of 2-3 characters to keep smooth and not take too long
        setDisplayedLength((prev) => Math.min(prev + 2, fullText.length));
      }, typingSpeedRef.current);

      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [hasStartedTyping, displayedLength, isTypingComplete, fullText.length]);

  // Reveal full text immediately
  const handleRevealAll = () => {
    setDisplayedLength(fullText.length);
    setIsTypingComplete(true);
  };

  // Replay typing animation
  const handleReplay = () => {
    setDisplayedLength(0);
    setIsTypingComplete(false);
    setHasStartedTyping(true);
  };

  // Split current typed string back into paragraphs
  const currentText = fullText.slice(0, displayedLength);
  const currentParagraphs = currentText.split('\n\n');

  return (
    <section id="love-letter" className="relative py-16 sm:py-24 px-4 max-w-3xl mx-auto">
      
      {/* Section Heading */}
      <div className="text-center mb-12 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush-100 text-burgundy-700 text-xs font-semibold tracking-wider uppercase border border-blush-200"
        >
          <Feather className="w-3.5 h-3.5 text-dustyRose" />
          From My Heart
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

        <p className="font-editorial italic text-base sm:text-lg text-burgundy-700">
          A handwritten note penned just for you, {girlfriendName}.
        </p>
      </div>

      {/* Love Letter Paper Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        onViewportEnter={handleInView}
        transition={{ duration: 0.7 }}
        className="relative bg-[#FFFCF9] paper-texture border border-[#EADBCC] rounded-2xl shadow-polaroid p-6 sm:p-10 md:p-12 overflow-hidden"
      >
        {/* Top Paper Header & Stamp */}
        <div className="flex items-center justify-between border-b border-[#EADBCC] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-champagne inline-block" />
            <span className="font-sans text-[11px] uppercase tracking-widest text-burgundy-700/80 font-semibold">
              {paperHeader}
            </span>
          </div>
          <span className="font-script text-base text-dustyRose-dark">
            {dateStamp}
          </span>
        </div>

        {/* Typed Paragraphs */}
        <div className="space-y-4 font-serif text-base sm:text-lg text-burgundy-950/90 leading-relaxed min-h-[220px]">
          {currentParagraphs.map((para, idx) => (
            <p key={idx} className="relative">
              {para}
              {idx === currentParagraphs.length - 1 && !isTypingComplete && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-dustyRose animate-pulse" />
              )}
            </p>
          ))}
        </div>

        {/* Letter Sign-off & Wax Seal (Visible when typing is done or full text shown) */}
        {(isTypingComplete || displayedLength > fullText.length * 0.9) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 pt-6 border-t border-[#EADBCC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="font-script text-2xl text-dustyRose-dark">
                {signoff}
              </p>
              <p className="font-serif text-lg font-semibold text-burgundy-900 mt-1">
                {author}
              </p>
            </div>

            {/* Aesthetic Wax Stamp */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-light via-gold-champagne to-gold-dark shadow-md flex items-center justify-center border-2 border-white/60">
                <Heart className="w-5 h-5 text-burgundy-900 fill-burgundy-900" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Decorative corner florals/flourish */}
        <div className="absolute top-2 right-2 text-gold-champagne/20 pointer-events-none">
          <Sparkles className="w-8 h-8" />
        </div>
      </motion.div>

      {/* Action Controls: Reveal All / Read Again */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {!isTypingComplete ? (
          <button
            onClick={handleRevealAll}
            className="touch-target px-5 py-2.5 rounded-full bg-blush-100 hover:bg-blush-200 text-burgundy-800 text-sm font-medium border border-blush-200 shadow-sm transition-all flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-dustyRose" />
            <span>Read Instantly</span>
          </button>
        ) : (
          <button
            onClick={handleReplay}
            className="touch-target px-5 py-2.5 rounded-full bg-blush-100 hover:bg-blush-200 text-burgundy-800 text-sm font-medium border border-blush-200 shadow-sm transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-dustyRose" />
            <span>Read This Again</span>
          </button>
        )}
      </div>

    </section>
  );
}
