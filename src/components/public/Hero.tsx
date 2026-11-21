import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenRfq?: () => void;
  onExploreCatalog?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRfq, onExploreCatalog }) => {
  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreCatalog) {
      onExploreCatalog();
    } else {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenRfq) {
      onOpenRfq();
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="pt-2 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full relative">
      
      {/* 
        Main Editorial Canvas Card - Centered, Sober & Dignified
      */}
      <div className="relative z-10 editorial-canvas-card bg-[#FBF9F4] min-h-[500px] sm:min-h-[540px] lg:min-h-[580px] p-6 sm:p-12 lg:p-16 overflow-hidden shadow-lg border border-[#DFDCD4] rounded-[28px] sm:rounded-[44px] flex flex-col items-center justify-center text-center">
        
        {/* Ambient Pharmaceutical Editorial Background - Left and Right Sides Fully Visible */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/images/hero-centered-bg.jpg"
            alt="ADIVARI PHARMACEUTICALS PRIVATE LIMITED Formulations Laboratory"
            className="w-full h-full object-cover object-center opacity-100"
          />
          {/* Center-only soft vignette: 100% transparent on left and right sides so vials & laboratory are clearly visible */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_56%_80%_at_50%_50%,_rgba(251,249,244,0.92)_0%,_rgba(251,249,244,0.65)_48%,_transparent_72%)]" />
        </div>

        {/* Centered Content Container */}
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-5 sm:space-y-6">
          
          {/* Top Monospace Tag with glowing dot */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E3DFD5] text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#5C5749] uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40] animate-pulse shrink-0" />
            <span>WHO-GMP &amp; INTERNATIONAL PHARMACEUTICAL SUPPLY</span>
          </div>

          {/* Simple, Sober & Dignified Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.75rem] font-bold text-[#141414] tracking-tight leading-[1.12] sm:leading-[1.08] font-['Plus_Jakarta_Sans'] max-w-2xl">
            Quality Pharmaceuticals Worldwide
          </h1>

          {/* Streamlined Editorial Description */}
          <p className="max-w-xl text-sm sm:text-base text-[#4E4A3F] font-normal leading-relaxed">
            At <strong className="font-semibold text-[#141414]">ADIVARI PHARMACEUTICALS PRIVATE LIMITED</strong>, we are committed to delivering quality pharmaceutical products that support diverse healthcare needs across global markets.
          </p>
          
          {/* Refined Therapeutic Scope Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#5E594D] font-medium pt-0.5">
            <span className="inline-flex items-center gap-1.5 bg-white/85 px-3.5 py-1.5 rounded-full border border-[#E5DFD4] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B5244]" />
              Tablets &amp; Capsules
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/85 px-3.5 py-1.5 rounded-full border border-[#E5DFD4] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B5244]" />
              Sterile Injectables
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/85 px-3.5 py-1.5 rounded-full border border-[#E5DFD4] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B5244]" />
              Critical Care &amp; Anti-Infectives
            </span>
          </div>

          {/* Action Buttons: Centered Dual CTA */}
          <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleExplore}
              className="btn-sensiq-black px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-all group"
            >
              <span>Explore Formulations Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleRequestQuote}
              className="btn-sensiq-white px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.98] transition-all group border-[#D3CFC4] hover:border-[#141414] hover:bg-white"
            >
              <span>Request a Quotation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
