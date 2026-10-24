import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingHearts({ count = 18, isDark = false }) {
  // Generate random positions, sizes, and delays once so they remain stable
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * (100 / count) + Math.random() * 6).toFixed(1)}%`,
      size: Math.floor(Math.random() * 14) + 12, // 12px to 26px
      duration: Math.floor(Math.random() * 10) + 14, // 14s to 24s
      delay: Math.random() * 12,
      opacity: Math.random() * 0.4 + 0.15,
      type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'sparkle' : 'petal',
      rotate: Math.random() * 360,
    }));
  }, [count]);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            bottom: '-40px',
            opacity: p.opacity,
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, (p.id % 2 === 0 ? 25 : -25), 0],
            rotate: [p.rotate, p.rotate + (p.id % 2 === 0 ? 90 : -90)],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.type === 'heart' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={isDark ? '#F7DDE3' : '#D98C9A'}
              className="drop-shadow-sm filter"
              style={{ opacity: isDark ? 0.45 : 0.6 }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {p.type === 'sparkle' && (
            <svg
              width={p.size * 0.8}
              height={p.size * 0.8}
              viewBox="0 0 24 24"
              fill="none"
              stroke={isDark ? '#D7B98E' : '#B89664'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: isDark ? 0.6 : 0.5 }}
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          )}

          {p.type === 'petal' && (
            <div
              style={{
                width: `${p.size * 0.75}px`,
                height: `${p.size * 1.1}px`,
                backgroundColor: isDark ? '#EEBDCA' : '#F7DDE3',
                borderRadius: '50% 0 50% 50%',
                transform: 'rotate(-45deg)',
                opacity: isDark ? 0.35 : 0.55,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
