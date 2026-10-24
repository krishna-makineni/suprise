import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveStoryConfig } from './data/loveStory';

import FloatingHearts from './components/FloatingHearts';
import EnvelopeIntro from './components/EnvelopeIntro';
import Navbar from './components/Navbar';
import StoryTimeline from './components/StoryTimeline';
import MemoryGallery from './components/MemoryGallery';
import LoveGame from './components/LoveGame';
import ReasonsSection from './components/ReasonsSection';
import MusicPlayer from './components/MusicPlayer';
import SurpriseReveal from './components/SurpriseReveal';
import FinalMoment from './components/FinalMoment';
import { QrCode, X, ExternalLink, Printer } from 'lucide-react';

export default function App() {
  const [hasOpenedIntro, setHasOpenedIntro] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [liveQrDataUrl, setLiveQrDataUrl] = useState('/assets/qr-code.png');
  const [activeUrl, setActiveUrl] = useState(loveStoryConfig.productionUrl);

  useEffect(() => {
    const currentOrigin =
      typeof window !== 'undefined' && window.location.origin.startsWith('http') && !window.location.origin.includes('localhost')
        ? window.location.origin
        : loveStoryConfig.productionUrl;

    setActiveUrl(currentOrigin);

    import('qrcode').then((QRCodeModule) => {
      const qrcode = QRCodeModule.default || QRCodeModule;
      qrcode
        .toDataURL(currentOrigin, {
          errorCorrectionLevel: 'H',
          margin: 3,
          width: 800,
          color: {
            dark: '#652D42',
            light: '#FFFFFF',
          },
        })
        .then((url) => {
          setLiveQrDataUrl(url);
        })
        .catch(() => {});
    }).catch(() => {});
  }, []);

  // Scroll to top when opening or replaying
  const handleOpenIntro = () => {
    setHasOpenedIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayExperience = () => {
    setHasOpenedIntro(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-ivory text-burgundy-900 selection:bg-blush-200 selection:text-burgundy-950 font-sans">
      
      {/* Background Floating Hearts / Sparkles Ambient Particles */}
      <FloatingHearts count={16} isDark={false} />

      {/* Screen 1: Sealed Love Letter & Envelope Opening Experience */}
      <AnimatePresence mode="wait">
        {!hasOpenedIntro ? (
          <motion.div
            key="envelope-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.7 } }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <EnvelopeIntro
              config={loveStoryConfig}
              onOpen={handleOpenIntro}
            />
          </motion.div>
        ) : (
          /* Main Continuous Romantic Journey */
          <motion.div
            key="main-story"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative z-10 w-full"
          >
            {/* Top Navigation Bar */}
            <div id="top" />
            <Navbar
              girlfriendName={loveStoryConfig.girlfriendName}
              partnerName={loveStoryConfig.partnerName}
              startDate={loveStoryConfig.relationshipStartDate}
            />

            {/* Screen 2: Our Story (Relationship Timeline) */}
            <main className="pt-16 sm:pt-20">
              <StoryTimeline
                storyConfig={loveStoryConfig.story}
                girlfriendName={loveStoryConfig.girlfriendName}
              />

              {/* Screen 3: Our Memories (Scrapbook Polaroids & Lightbox) */}
              <MemoryGallery
                memoriesConfig={loveStoryConfig.memories}
                girlfriendName={loveStoryConfig.girlfriendName}
              />

              {/* Screen 4: Romantic Love Game ("The Perfect Match") */}
              <LoveGame
                gameConfig={loveStoryConfig.game}
                girlfriendName={loveStoryConfig.girlfriendName}
                partnerName={loveStoryConfig.partnerName}
              />

              {/* Screen 5: Reasons I Love You (Interactive Unlock Cards) */}
              <ReasonsSection
                reasonsConfig={loveStoryConfig.reasons}
                girlfriendName={loveStoryConfig.girlfriendName}
              />

              {/* Screen 7: The Hidden Surprise (Sealed Gift Box & Love Promise) */}
              <SurpriseReveal
                surpriseConfig={loveStoryConfig.surprise}
                girlfriendName={loveStoryConfig.girlfriendName}
              />

              {/* Screen 8: The Final Moment (Cinematic Soft Burgundy Ending & Proposal) */}
              <FinalMoment
                finalConfig={loveStoryConfig.finalMoment}
                girlfriendName={loveStoryConfig.girlfriendName}
                partnerName={loveStoryConfig.partnerName}
                easterEggMessage={loveStoryConfig.surprise.easterEggMessage}
                onReplay={handleReplayExperience}
              />
            </main>

            {/* Screen 6: Music & Atmosphere Floating Player */}
            <MusicPlayer musicConfig={loveStoryConfig.music} />

            {/* Floating QR Code Card Utility Button (Discreet in Bottom Left) */}
            <div className="fixed bottom-4 left-4 z-40 safe-bottom">
              <button
                onClick={() => setShowQrModal(true)}
                className="touch-target p-2.5 rounded-full bg-white/90 hover:bg-white text-burgundy-800 shadow-polaroid border border-blush-200 backdrop-blur-md transition-all hover:scale-105"
                title="View QR Code & Printable Card"
                aria-label="View QR Code and Printable Card"
              >
                <QrCode className="w-5 h-5 text-dustyRose-dark" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code & Printable Card Modal */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy-950/80 backdrop-blur-md safe-top safe-bottom"
            onClick={() => setShowQrModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-white rounded-3xl p-6 sm:p-7 shadow-2xl text-center border border-blush-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowQrModal(false)}
                className="touch-target absolute top-4 right-4 p-2 text-burgundy-400 hover:text-burgundy-800 transition-colors"
                aria-label="Close QR Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="font-serif text-xl font-bold text-burgundy-900 mb-1">
                Scan to Open My Heart ❤️
              </h4>
              <p className="font-script text-base text-dustyRose-dark mb-4">
                A little world, made just for {loveStoryConfig.girlfriendName}
              </p>

              {/* QR Image */}
              <div className="p-3 bg-white rounded-2xl border border-blush-100 shadow-sm inline-block mb-3">
                <img
                  src={liveQrDataUrl}
                  alt="QR Code"
                  className="w-48 h-48 object-contain mx-auto"
                />
              </div>

              <p className="text-[11px] font-mono text-dustyRose-dark truncate max-w-xs mx-auto mb-2">
                {activeUrl}
              </p>

              <p className="text-xs text-burgundy-700/80 mb-4 px-2">
                Point your iPhone Camera at this code to open the site directly in Safari.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <a
                  href="/printable-qr-card.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target w-full py-2.5 px-4 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Printer className="w-4 h-4 text-gold-champagne" />
                  <span>Open Printable Gift Card (PDF)</span>
                </a>

                <a
                  href={liveQrDataUrl}
                  download="Amrutha-Love-QR-Code.png"
                  className="touch-target w-full py-2.5 px-4 rounded-xl bg-blush-100 hover:bg-blush-200 text-burgundy-800 text-xs font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <span>Download High-Res PNG</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
