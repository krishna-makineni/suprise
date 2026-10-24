import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MailOpen } from 'lucide-react';

export default function EnvelopeIntro({ config, onOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
    // Smooth delay before triggering parent transition so envelope animation plays
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between px-4 py-8 safe-top safe-bottom bg-gradient-to-b from-ivory-50 via-blush-50 to-ivory-100 overflow-hidden text-center select-none">
      
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blush-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold-champagne/15 blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="z-10 pt-2 flex flex-col items-center gap-2"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-burgundy-600 bg-white/70 border border-blush-200 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          {config.welcome.badge}
        </span>
        <h2 className="font-serif italic text-3xl sm:text-4xl text-burgundy-900 tracking-tight">
          {config.girlfriendName}
        </h2>
      </motion.div>

      {/* Centerpiece: Animated Interactive Love Envelope */}
      <div className="z-10 my-auto w-full max-w-sm flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="relative w-72 sm:w-80 h-48 sm:h-52 cursor-pointer group"
          onClick={handleOpenClick}
          role="button"
          tabIndex={0}
          aria-label="Open Love Letter Envelope"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenClick()}
        >
          {/* Envelope Body (Backdrop / Shadow) */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FDF2F4] to-[#F5D7DF] shadow-polaroid border border-white/80 overflow-hidden">
            {/* Interior Pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D98C9A_1px,transparent_1px)] [background-size:12px_12px]" />
          </div>

          {/* Letter Peek Sliding Up */}
          <motion.div
            className="absolute left-4 right-4 h-36 bg-white rounded-t-xl shadow-md border border-blush-200 flex flex-col items-center justify-center p-3 text-center paper-texture"
            initial={{ y: 20 }}
            animate={{ y: isOpen ? -65 : 10 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Heart className="w-6 h-6 text-dustyRose fill-dustyRose mb-1 animate-pulse" />
            <p className="font-serif text-sm font-semibold text-burgundy-900">
              {config.girlfriendName}
            </p>
            <p className="font-script text-base text-dustyRose-dark">
              Forever & always yours
            </p>
          </motion.div>

          {/* Envelope Front Left & Right Folds */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left triangle fold */}
            <div
              className="absolute left-0 bottom-0 top-0 w-1/2 bg-gradient-to-tr from-[#EFC8D4] to-[#F8E3E9]"
              style={{
                clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                opacity: 0.95,
              }}
            />
            {/* Right triangle fold */}
            <div
              className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-tl from-[#E8BCC9] to-[#F8E3E9]"
              style={{
                clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                opacity: 0.95,
              }}
            />
            {/* Bottom triangle fold */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#E4B1C0] to-[#F4D2DD]"
              style={{
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                boxShadow: '0 -4px 12px rgba(101, 45, 66, 0.08)',
              }}
            />
          </div>

          {/* Animated Envelope Top Flap (Flips open) */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 origin-top pointer-events-none z-20"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              backgroundColor: '#F9DCE3',
              boxShadow: '0 4px 10px rgba(101, 45, 66, 0.1)',
            }}
            animate={{
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 0 : 20,
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />

          {/* Gold Wax Seal / Heart Center Button */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-gold-light via-gold-champagne to-gold-dark shadow-lg border-2 border-white/60 cursor-pointer group-hover:scale-105 active:scale-95 transition-transform"
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-10 h-10 rounded-full border border-gold-dark/40 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-burgundy-900 fill-burgundy-900" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tap Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 0.6 }}
          className="mt-5 font-script text-lg text-burgundy-700 tracking-wide"
        >
          {config.welcome.envelopeHint}
        </motion.p>

        {/* Main CTA: Open My Heart Button */}
        <motion.button
          onClick={handleOpenClick}
          disabled={isOpen}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          className="mt-6 touch-target px-7 py-3.5 rounded-full bg-gradient-to-r from-burgundy-700 via-burgundy-600 to-burgundy-700 text-white font-serif text-lg tracking-wide shadow-polaroid hover:shadow-polaroid-hover transition-all flex items-center gap-2.5 border border-gold-champagne/40"
        >
          <MailOpen className="w-5 h-5 text-gold-champagne" />
          <span>{config.welcome.openButtonText}</span>
        </motion.button>
      </div>

      {/* Footer Info & Skip Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="z-10 flex flex-col items-center gap-2"
      >
        <p className="font-sans text-xs text-burgundy-700/80 max-w-xs">
          {config.welcome.subtitle}
        </p>
        <button
          onClick={onOpen}
          className="touch-target text-xs font-medium text-dustyRose-dark underline underline-offset-4 hover:text-burgundy-900 transition-colors py-1 px-3"
        >
          {config.welcome.skipButtonText} →
        </button>
      </motion.div>

    </div>
  );
}
