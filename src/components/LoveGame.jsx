import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Coffee,
  Flower2,
  Camera,
  Crown,
  RotateCcw,
  Trophy,
  Timer,
  CheckCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Icon components mapping
const ICON_COMPONENTS = {
  Heart: Heart,
  Coffee: Coffee,
  Sparkles: Sparkles,
  Flower2: Flower2,
  Camera: Camera,
  Crown: Crown,
};

// Simple Web Audio API Synthesizer for delicate romantic chimes
function playChime(type = 'flip') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'flip') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'match') {
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } else if (type === 'win') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.15, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.5);
      });
    }
  } catch (e) {
    // Audio autoplay restrictions ignored silently
  }
}

export default function LoveGame({ gameConfig, girlfriendName, partnerName }) {
  const {
    heading,
    subheading,
    completionTitle,
    loveYouMessage,
    signoff,
    cardPairs,
  } = gameConfig;

  // Deck generation: 6 pairs = 12 cards shuffled
  const createDeck = () => {
    const deck = [];
    cardPairs.forEach((item) => {
      deck.push({ ...item, uniqueKey: `${item.id}-a` });
      deck.push({ ...item, uniqueKey: `${item.id}-b` });
    });
    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const [cards, setCards] = useState(createDeck);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer states
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive && !isCompleted) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isCompleted]);

  // Restart game
  const restartGame = () => {
    setCards(createDeck());
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setScore(0);
    setIsLocked(false);
    setIsCompleted(false);
    setSecondsElapsed(0);
    setTimerActive(false);
  };

  // Card click handler
  const handleCardClick = (index) => {
    if (isLocked) return;
    if (flippedIndices.includes(index)) return;
    if (matchedIds.includes(cards[index].id)) return;

    if (!timerActive) {
      setTimerActive(true);
    }

    if (soundEnabled) playChime('flip');

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // If two cards are flipped, check for match
    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((prev) => prev + 1);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.id === secondCard.id) {
        // Matched!
        setTimeout(() => {
          if (soundEnabled) playChime('match');
          setMatchedIds((prev) => {
            const next = [...prev, firstCard.id];
            // Check if game is completed
            if (next.length === cardPairs.length) {
              setIsCompleted(true);
              setTimerActive(false);
              if (soundEnabled) playChime('win');
              confetti({
                particleCount: 80,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#D98C9A', '#D7B98E', '#F7DDE3', '#652D42'],
              });
            }
            return next;
          });
          // Bonus calculation: 250 base points + bonus for efficiency
          setScore((prev) => prev + 250 + Math.max(10, 50 - moves * 2));
          setFlippedIndices([]);
          setIsLocked(false);
        }, 500);
      } else {
        // No match, flip back
        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  // Format seconds mm:ss
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <section id="love-game" className="relative py-16 sm:py-24 px-4 max-w-4xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-10 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush-100 text-burgundy-700 text-xs font-semibold tracking-wider uppercase border border-blush-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          Interactive Mini Game
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
      </div>

      {/* Game Stats Bar */}
      <div className="max-w-md mx-auto mb-6 px-4 py-3 rounded-2xl glass-card border border-blush-200 shadow-sm flex items-center justify-between text-xs sm:text-sm font-medium text-burgundy-900">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-gold-dark" />
          <span>Score: <strong className="text-burgundy-700">{score}</strong></span>
        </div>

        <div className="flex items-center gap-1.5">
          <Timer className="w-4 h-4 text-dustyRose" />
          <span>Time: <strong>{formatTime(secondsElapsed)}</strong></span>
        </div>

        <div>
          <span>Moves: <strong>{moves}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 rounded-full text-burgundy-500 hover:text-burgundy-900 transition-colors"
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            title={soundEnabled ? 'Sound Enabled' : 'Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-dustyRose" />}
          </button>

          <button
            onClick={restartGame}
            className="p-1 rounded-full text-burgundy-600 hover:text-burgundy-950 transition-colors"
            aria-label="Restart game"
            title="Restart Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Memory Cards Grid: 3 columns on mobile, 4 columns on tablet/desktop */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx);
          const isMatched = matchedIds.includes(card.id);
          const IconComponent = ICON_COMPONENTS[card.icon] || Heart;

          return (
            <motion.div
              key={card.uniqueKey}
              onClick={() => handleCardClick(idx)}
              whileHover={{ scale: isMatched ? 1 : 1.04 }}
              whileTap={{ scale: isMatched ? 1 : 0.96 }}
              className="relative aspect-[3/3.8] sm:aspect-[3/3.6] cursor-pointer select-none perspective-1000"
              role="button"
              tabIndex={0}
              aria-label={`Card ${idx + 1}`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick(idx)}
            >
              {/* Animated Card Body */}
              <motion.div
                className="w-full h-full rounded-2xl relative shadow-polaroid transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {/* Back Face (Cover pattern with heart seal) */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFF5F7] via-[#FCE4EC] to-[#F8D2DD] border-2 border-white shadow-sm flex flex-col items-center justify-center p-2"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-10 h-10 rounded-full bg-white/80 border border-blush-200 flex items-center justify-center shadow-sm">
                    <Heart className="w-5 h-5 text-dustyRose fill-dustyRose/30" />
                  </div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-burgundy-700/70 mt-2 font-sans">
                    Match
                  </span>
                </div>

                {/* Front Face (Revealed Icon & Note) */}
                <div
                  className={`absolute inset-0 rounded-2xl p-2 flex flex-col items-center justify-between text-center border-2 ${
                    isMatched
                      ? 'bg-gradient-to-b from-[#FFFDF9] to-[#FFF0F4] border-dustyRose shadow-md'
                      : 'bg-white border-blush-200'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Top mini match badge */}
                  <div className="w-full flex justify-end">
                    {isMatched ? (
                      <CheckCircle className="w-3.5 h-3.5 text-dustyRose fill-blush-100" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-gold-champagne inline-block" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className={`p-2.5 rounded-full ${isMatched ? 'bg-blush-100 text-burgundy-700' : 'bg-ivory text-burgundy-600'}`}>
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  {/* Caption & Name */}
                  <div className="w-full px-0.5">
                    <p className="font-serif text-[11px] sm:text-xs font-bold text-burgundy-900 leading-tight truncate">
                      {card.name}
                    </p>
                    <p className="font-script text-[11px] sm:text-xs text-dustyRose-dark truncate">
                      {card.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Game Completed Victory Modal with Score & Love Message */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy-950/85 backdrop-blur-md safe-top safe-bottom"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative max-w-lg w-full bg-[#FFFDFB] paper-texture rounded-3xl p-6 sm:p-9 shadow-2xl border-2 border-gold-champagne/60 text-center"
            >
              {/* Trophy Header */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-light via-gold-champagne to-gold-dark mx-auto flex items-center justify-center shadow-lg border-2 border-white mb-4 animate-bounce">
                <Trophy className="w-8 h-8 text-burgundy-950" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl text-burgundy-900 font-bold mb-1">
                {completionTitle}
              </h3>
              <p className="font-script text-xl text-dustyRose-dark mb-4">
                You and I are the ultimate match, {girlfriendName}!
              </p>

              {/* Scorecard Box */}
              <div className="bg-blush-50/80 rounded-2xl p-4 border border-blush-200 mb-6 flex items-center justify-around">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-burgundy-700 font-medium">
                    Final Score
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-burgundy-900">
                    {score} <span className="text-sm font-normal text-dustyRose">pts</span>
                  </span>
                </div>

                <div className="h-8 w-px bg-blush-200" />

                <div>
                  <span className="block text-xs uppercase tracking-wider text-burgundy-700 font-medium">
                    Moves
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-burgundy-900">
                    {moves}
                  </span>
                </div>

                <div className="h-8 w-px bg-blush-200" />

                <div>
                  <span className="block text-xs uppercase tracking-wider text-burgundy-700 font-medium">
                    Time
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-burgundy-900">
                    {formatTime(secondsElapsed)}
                  </span>
                </div>
              </div>

              {/* Heartfelt Love You Message */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gold-champagne/40 shadow-sm text-left mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-dustyRose fill-dustyRose animate-pulse" />
                  <span className="font-serif font-bold text-sm text-burgundy-900">
                    A Message From My Heart
                  </span>
                </div>
                <p className="font-editorial italic text-base sm:text-lg text-burgundy-950 leading-relaxed">
                  "{loveYouMessage}"
                </p>
                <div className="mt-3 text-right">
                  <p className="font-script text-lg text-dustyRose-dark">
                    {signoff}
                  </p>
                  <p className="font-serif text-xs font-semibold text-burgundy-900 uppercase tracking-wider">
                    — {partnerName}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={restartGame}
                  className="touch-target w-full sm:w-auto px-6 py-3 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-white font-serif text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-gold-champagne" />
                  <span>Play Again &amp; Beat Score 🎮</span>
                </button>

                <button
                  onClick={() => setIsCompleted(false)}
                  className="touch-target w-full sm:w-auto px-6 py-3 rounded-full bg-blush-100 hover:bg-blush-200 text-burgundy-800 font-sans text-sm font-medium transition-all"
                >
                  <span>Close &amp; Keep Exploring ✨</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
