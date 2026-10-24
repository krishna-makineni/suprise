import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Check, MessageSquareHeart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalMoment({
  finalConfig,
  girlfriendName,
  partnerName,
  easterEggMessage,
  onReplay,
}) {
  const {
    quoteLines,
    highlight,
    question,
    button1,
    button2,
    affirmationTitle,
    affirmationText,
    footerSignoff,
    replayButton,
  } = finalConfig;

  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [footerHeartTaps, setFooterHeartTaps] = useState(0);
  const [showEasterEggToast, setShowEasterEggToast] = useState(false);

  // Trigger grand celebration fireworks of hearts and gold
  const handleAnswerClick = (buttonText) => {
    setSelectedAnswer(buttonText);
    setHasAnswered(true);

    const end = Date.now() + 2 * 1000;
    const colors = ['#D98C9A', '#D7B98E', '#F7DDE3', '#FFF8F2', '#8C3D5A'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Footer secret heart Easter egg handler (3 taps)
  const handleFooterHeartTap = () => {
    const nextCount = footerHeartTaps + 1;
    setFooterHeartTaps(nextCount);

    if (nextCount === 3) {
      setShowEasterEggToast(true);
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.9 },
        colors: ['#D7B98E', '#F7DDE3'],
      });
      setTimeout(() => setShowEasterEggToast(false), 5500);
      setFooterHeartTaps(0);
    }
  };

  return (
    <section
      id="final-moment"
      className="relative min-h-[100dvh] w-full bg-gradient-to-b from-burgundy-900 via-burgundy-950 to-[#16060E] text-white py-20 px-4 flex flex-col justify-between items-center text-center overflow-hidden safe-top safe-pb-with-player"
    >
      {/* Background Cinematic Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-dustyRose/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gold-champagne/15 blur-[90px] pointer-events-none" />

      {/* Decorative Star/Sparkle Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pt-6"
      >
        <Sparkles className="w-6 h-6 text-gold-champagne mx-auto animate-pulse" />
      </motion.div>

      {/* Cinematic Main Section */}
      <div className="max-w-2xl mx-auto my-auto py-10 space-y-8 z-10">
        
        {/* Poetic Quote Lines */}
        <div className="space-y-3 font-serif text-xl sm:text-3xl text-ivory-100 font-normal leading-relaxed tracking-wide">
          {quoteLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.18 }}
              className="drop-shadow-sm"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Highlight Banner */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-serif italic text-3xl sm:text-5xl text-gold-champagne font-bold tracking-tight drop-shadow-md pt-2"
        >
          {highlight}
        </motion.h2>

        {/* Customizable Question & Romantic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1 }}
          className="pt-6"
        >
          <p className="font-editorial text-lg sm:text-2xl text-blush-100 mb-6 italic">
            "{question}"
          </p>

          {!hasAnswered ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={() => handleAnswerClick(button1)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="touch-target w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-dustyRose via-rose-400 to-dustyRose text-white font-serif text-lg font-medium shadow-polaroid hover:shadow-romantic border border-white/30 transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>{button1}</span>
              </motion.button>

              <motion.button
                onClick={() => handleAnswerClick(button2)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="touch-target w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-serif text-lg font-medium shadow-polaroid border border-gold-champagne/40 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <span>{button2}</span>
              </motion.button>
            </div>
          ) : (
            /* Affirmation Banner on Click */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl glass-card-dark border border-gold-champagne/50 shadow-glow max-w-lg mx-auto"
            >
              <h3 className="font-serif text-2xl text-gold-champagne font-bold mb-2">
                {affirmationTitle}
              </h3>
              <p className="font-editorial text-lg text-blush-100 italic">
                {affirmationText}
              </p>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-dustyRose-light font-sans font-medium">
                <Check className="w-4 h-4 text-gold-champagne" />
                <span>Chosen answer: {selectedAnswer}</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Replay Experience Button */}
        <div className="pt-8">
          <motion.button
            onClick={onReplay}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="touch-target px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-sm font-sans tracking-wide border border-white/20 backdrop-blur-sm transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-gold-champagne" />
            <span>{replayButton}</span>
          </motion.button>
        </div>

      </div>

      {/* Footer Sign-off & Secret Easter Egg Heart */}
      <footer className="w-full max-w-md mx-auto pt-8 pb-4 border-t border-white/10 flex flex-col items-center gap-2 z-10 text-white/70">
        <p className="font-script text-xl text-dustyRose-light tracking-wide">
          {footerSignoff}
        </p>
        <p className="font-serif text-sm font-semibold tracking-wider text-ivory-100 uppercase">
          — {partnerName}
        </p>

        {/* Tiny Easter Egg Heart (Tap 3 times) */}
        <div className="pt-2">
          <button
            onClick={handleFooterHeartTap}
            className="touch-target p-2 text-white/40 hover:text-dustyRose active:scale-125 transition-all"
            aria-label="Secret Easter Egg Heart"
            title="A secret little touch"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Toast for Easter Egg */}
        <AnimatePresence>
          {showEasterEggToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-white text-burgundy-900 shadow-2xl border border-blush-200 text-sm font-medium text-center max-w-xs"
            >
              <p className="font-script text-lg text-dustyRose-dark leading-snug">
                {easterEggMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>

    </section>
  );
}
