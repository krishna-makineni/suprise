import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, Lock, Unlock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SurpriseReveal({ surpriseConfig, girlfriendName }) {
  const {
    teaserBadge,
    teaserPrompt,
    tapHint,
    title,
    message,
    easterEggHint,
  } = surpriseConfig;

  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    // Burst of romantic hearts & champagne confetti
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#D98C9A', '#652D42', '#D7B98E', '#F7DDE3', '#FFF8F2'],
    });
  };

  return (
    <section id="surprise" className="relative py-16 sm:py-24 px-4 max-w-2xl mx-auto text-center">
      
      {/* Badge Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush-100 text-burgundy-700 text-xs font-semibold tracking-wider uppercase border border-blush-200 mb-4"
      >
        <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
        {teaserBadge}
      </motion.div>

      {/* Teaser Question */}
      <motion.h3
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-2xl sm:text-4xl text-burgundy-900 font-semibold mb-2"
      >
        {teaserPrompt}
      </motion.h3>

      <p className="font-editorial italic text-base sm:text-lg text-burgundy-700 mb-8">
        A secret promise kept just for this moment.
      </p>

      {/* Interactive Gift / Box */}
      <div className="relative flex justify-center items-center">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Sealed Gift Box */
            <motion.div
              key="sealed-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReveal}
              className="cursor-pointer group flex flex-col items-center p-8 rounded-3xl bg-gradient-to-b from-white to-[#FDF4F6] border-2 border-blush-200 shadow-polaroid hover:shadow-polaroid-hover transition-all max-w-sm w-full"
              role="button"
              tabIndex={0}
              aria-label="Tap to open secret gift"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleReveal()}
            >
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blush-200 via-dustyRose to-burgundy-700 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                {/* Lock icon overlay */}
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-gold-champagne text-burgundy-950 shadow-md">
                  <Lock className="w-4 h-4" />
                </div>
              </div>

              <span className="font-serif text-lg text-burgundy-900 font-semibold group-hover:text-dustyRose-dark transition-colors">
                {tapHint}
              </span>

              <span className="font-sans text-xs text-burgundy-600/70 mt-1">
                Tap anywhere on this box
              </span>
            </motion.div>
          ) : (
            /* Unwrapped Revealed Love Promise */
            <motion.div
              key="revealed-note"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative p-7 sm:p-9 rounded-3xl bg-white paper-texture border border-gold-champagne/50 shadow-polaroid-hover max-w-xl w-full text-left"
            >
              {/* Header with unlock icon */}
              <div className="flex items-center justify-between pb-4 border-b border-blush-100 mb-5">
                <div className="flex items-center gap-2">
                  <Unlock className="w-5 h-5 text-gold-dark" />
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-burgundy-900">
                    {title}
                  </h4>
                </div>
                <Heart className="w-5 h-5 fill-dustyRose text-dustyRose animate-pulse" />
              </div>

              {/* Message */}
              <p className="font-editorial text-lg sm:text-xl text-burgundy-900/95 leading-relaxed italic">
                "{message}"
              </p>

              {/* Decorative signature sign */}
              <div className="mt-6 pt-4 border-t border-blush-100 flex items-center justify-between">
                <span className="font-script text-xl text-dustyRose-dark">
                  Always with you, {girlfriendName}
                </span>
                <Sparkles className="w-5 h-5 text-gold-champagne" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
