import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Menu, X, BookOpen, Camera, Gamepad2, Gift, Music } from 'lucide-react';

export default function Navbar({ girlfriendName, partnerName, startDate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', href: '#our-story', icon: BookOpen },
    { label: 'Memories', href: '#memories', icon: Camera },
    { label: 'Love Game', href: '#love-game', icon: Gamepad2 },
    { label: 'Reasons', href: '#reasons', icon: Sparkles },
    { label: 'Surprise', href: '#surprise', icon: Gift },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 safe-top ${
        isScrolled
          ? 'bg-ivory-100/90 backdrop-blur-md shadow-sm border-b border-blush-200/60 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Brand / Couple Name */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className="flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded-full bg-blush-100 border border-blush-200 flex items-center justify-center text-dustyRose group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 fill-dustyRose" />
          </span>
          <div className="text-left">
            <span className="font-serif font-bold text-base sm:text-lg text-burgundy-900 tracking-tight block">
              {girlfriendName} &amp; {partnerName.split(' ')[0]}
            </span>
          </div>
        </a>

        {/* Desktop Chapter Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-burgundy-800/80 hover:text-burgundy-950 hover:bg-blush-100/70 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle (iPhone 16 Pro friendly) */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="touch-target p-2 rounded-xl bg-white/80 border border-blush-200 text-burgundy-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-blush-200 px-4 py-4 space-y-2 shadow-lg animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="touch-target w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-burgundy-900 hover:bg-blush-50"
              >
                <Icon className="w-4 h-4 text-dustyRose" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
