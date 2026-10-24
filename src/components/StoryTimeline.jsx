import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageCircleHeart,
  Camera,
  Smile,
  HeartHandshake,
  Compass,
  Heart,
  Calendar,
} from 'lucide-react';

// Icon mapper for dynamic timeline entries
const iconMap = {
  Sparkles: Sparkles,
  MessageCircleHeart: MessageCircleHeart,
  Camera: Camera,
  Smile: Smile,
  HeartHandshake: HeartHandshake,
  Compass: Compass,
};

export default function StoryTimeline({ storyConfig, girlfriendName }) {
  const { heading, subheading, introText, timeline } = storyConfig;

  return (
    <section id="our-story" className="relative py-16 sm:py-24 px-4 max-w-4xl mx-auto overflow-hidden">
      
      {/* Section Title & Subheading */}
      <div className="text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-100 text-burgundy-700 text-xs font-semibold tracking-wider uppercase border border-blush-200"
        >
          <Heart className="w-3.5 h-3.5 fill-dustyRose text-dustyRose" />
          Our Journey
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl text-burgundy-900 font-medium tracking-tight"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-editorial italic text-lg sm:text-xl text-burgundy-700 max-w-xl mx-auto"
        >
          {subheading}
        </motion.p>

        {introText && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-sm sm:text-base text-burgundy-800/80 max-w-2xl mx-auto leading-relaxed pt-2"
          >
            {introText}
          </motion.p>
        )}
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative">
        {/* Central connecting stem on desktop, left aligned on mobile */}
        <div className="absolute top-4 bottom-8 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blush-200 via-dustyRose to-gold-champagne/40 rounded-full" />

        <div className="space-y-12 sm:space-y-16">
          {timeline.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Heart;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-6 md:gap-12 pl-14 md:pl-0`}
              >
                {/* Central Node Badge */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-ivory-50 border-2 border-dustyRose shadow-md z-10">
                  <IconComponent className="w-5 h-5 text-burgundy-700" />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-2.5rem)] rounded-2xl p-6 sm:p-7 glass-card border border-white/80 shadow-polaroid hover:shadow-polaroid-hover transition-all duration-300 relative group`}
                >
                  {/* Subtle top tag & date */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-dustyRose-dark bg-blush-50 px-2.5 py-0.5 rounded-full border border-blush-100">
                      {item.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-burgundy-600/80 font-medium">
                      <Calendar className="w-3 h-3 text-gold-dark" />
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-burgundy-900 mb-2 group-hover:text-burgundy-700 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm sm:text-base text-burgundy-800/85 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Corner aesthetic accent */}
                  <div className="absolute top-3 right-3 text-gold-champagne/40 group-hover:text-gold-champagne transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Spacer for MD screens to keep balanced alternating alignment */}
                <div className="hidden md:block w-[calc(50%-2.5rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom transition divider */}
      <div className="mt-20 flex justify-center items-center gap-3 text-dustyRose">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-blush-300" />
        <Heart className="w-4 h-4 fill-dustyRose" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-blush-300" />
      </div>

    </section>
  );
}
