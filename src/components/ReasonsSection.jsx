import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Plus, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReasonsSection({ reasonsConfig, girlfriendName }) {
  const { heading, subheading, buttonText, counterLabel, list } = reasonsConfig;

  // Track the history of revealed reason indices
  // Start with the first 3 reasons visible
  const [unlockedIndices, setUnlockedIndices] = useState([0, 1, 2]);

  // Handle "One More Reason" click
  const handleRevealNext = () => {
    if (unlockedIndices.length < list.length) {
      // Find remaining unused indices
      const remaining = list
        .map((_, idx) => idx)
        .filter((idx) => !unlockedIndices.includes(idx));

      if (remaining.length > 0) {
        // Pick the next one
        const nextIdx = remaining[0];
        setUnlockedIndices((prev) => [...prev, nextIdx]);

        // If this unlocked the final reason, celebrate!
        if (unlockedIndices.length + 1 === list.length) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#D98C9A', '#F7DDE3', '#652D42', '#D7B98E'],
          });
        }
      }
    } else {
      // If all have already been revealed, trigger a sweet heart shower
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#D98C9A', '#F7DDE3', '#D7B98E'],
      });
    }
  };

  const isAllUnlocked = unlockedIndices.length >= list.length;

  return (
    <section id="reasons" className="relative py-16 sm:py-24 px-4 max-w-4xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush-100 text-burgundy-700 text-xs font-semibold tracking-wider uppercase border border-blush-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          Infinite Gratitude
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
          className="font-editorial italic text-base sm:text-xl text-burgundy-700 max-w-lg mx-auto"
        >
          {subheading}
        </motion.p>

        {/* Counter Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-blush-200 text-xs font-medium text-burgundy-800 shadow-sm mt-2">
          <Heart className="w-3.5 h-3.5 fill-dustyRose text-dustyRose" />
          <span>
            {unlockedIndices.length} of {list.length} {counterLabel}
          </span>
        </div>
      </div>

      {/* Reasons Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <AnimatePresence>
          {unlockedIndices.map((reasonIdx, i) => (
            <motion.div
              key={reasonIdx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative p-5 sm:p-6 rounded-2xl glass-card border border-blush-200 shadow-sm hover:shadow-polaroid transition-all group flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blush-100 border border-blush-200 flex items-center justify-center text-xs font-semibold text-burgundy-800">
                #{i + 1}
              </div>

              <div className="flex-1">
                <p className="font-serif text-base sm:text-lg text-burgundy-900 leading-snug">
                  {list[reasonIdx]}
                </p>
              </div>

              <Heart className="w-4 h-4 text-dustyRose/40 group-hover:text-dustyRose group-hover:fill-dustyRose transition-colors flex-shrink-0 mt-1" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Button: Reveal One More Reason */}
      <div className="mt-10 flex flex-col items-center justify-center gap-3">
        <motion.button
          onClick={handleRevealNext}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          className="touch-target px-8 py-3.5 rounded-full bg-gradient-to-r from-dustyRose via-burgundy-500 to-burgundy-700 text-white font-serif text-base sm:text-lg tracking-wide shadow-polaroid hover:shadow-polaroid-hover transition-all flex items-center gap-2.5 border border-white/40"
        >
          {isAllUnlocked ? (
            <>
              <Heart className="w-5 h-5 fill-white" />
              <span>And a million more reasons every day ❤️</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 text-gold-champagne" />
              <span>{buttonText}</span>
            </>
          )}
        </motion.button>

        {isAllUnlocked && (
          <p className="font-script text-lg text-dustyRose-dark animate-fade-in">
            Every single reason points right back to you, {girlfriendName}. ✨
          </p>
        )}
      </div>

    </section>
  );
}
