import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Disc3,
  Minimize2,
  Maximize2,
} from 'lucide-react';

export default function MusicPlayer({ musicConfig }) {
  const { trackTitle, artist, audioSrc } = musicConfig;
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsAvailable(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      // Gracefully handle missing audio without erroring or breaking page
      console.warn('Audio file not found or could not load:', audioSrc);
      setIsAvailable(false);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current || !isAvailable) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsCollapsed(false);
        })
        .catch((err) => {
          console.warn('Playback prevented by browser policy:', err);
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // If audio fails completely or doesn't exist, we don't render or show an unobtrusive fallback
  if (!isAvailable) {
    return null;
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Floating Audio Player Widget */}
      <div className="fixed bottom-4 right-4 z-40 safe-bottom">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            /* Mini Floating Capsule / Disc */
            <motion.button
              key="mini-btn"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => {
                if (!isPlaying) togglePlay();
                setIsCollapsed(false);
              }}
              whileTap={{ scale: 0.94 }}
              className="touch-target group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-burgundy-900/90 hover:bg-burgundy-900 text-white backdrop-blur-lg shadow-polaroid border border-gold-champagne/30"
              aria-label="Open Music Player"
            >
              <Disc3
                className={`w-5 h-5 text-gold-champagne ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              />
              <span className="font-serif text-xs font-medium tracking-wide pr-1">
                {isPlaying ? 'Playing Our Song...' : 'Play Our Song 🎵'}
              </span>
            </motion.button>
          ) : (
            /* Expanded Romantic Music Bar */
            <motion.div
              key="expanded-bar"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl bg-white/95 backdrop-blur-xl shadow-polaroid-hover border border-blush-200 p-4 safe-bottom"
            >
              {/* Header: Track details & minimize */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0">
                    <Music className="w-4 h-4 text-dustyRose" />
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="font-serif text-sm font-semibold text-burgundy-900 truncate">
                      {trackTitle}
                    </h5>
                    <p className="text-[11px] text-burgundy-700/80 truncate">
                      {artist}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCollapsed(true)}
                  className="touch-target p-1 text-burgundy-500 hover:text-burgundy-800 transition-colors"
                  aria-label="Minimize Player"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1 my-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isNaN(progressPercent) ? 0 : progressPercent}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-blush-200 rounded-lg appearance-none cursor-pointer accent-dustyRose"
                  aria-label="Seek track"
                />
                <div className="flex justify-between text-[10px] text-burgundy-600 font-sans">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-between pt-1">
                {/* Mute toggle */}
                <button
                  onClick={toggleMute}
                  className="touch-target p-2 text-burgundy-700 hover:text-burgundy-950 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-dustyRose-dark" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                {/* Central Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="touch-target w-11 h-11 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-white shadow-md flex items-center justify-center border border-gold-champagne/40"
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>

                {/* Disc visual */}
                <div className="p-2 text-burgundy-400">
                  <Disc3
                    className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`}
                    style={{ animationDuration: '3s' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
