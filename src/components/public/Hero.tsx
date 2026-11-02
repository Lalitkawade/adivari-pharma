import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MolecularMotionCanvas } from '../motion/MolecularMotionCanvas';

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
        Main Editorial Canvas Card
        - Desktop: Expansive canvas with full-bleed aesthetic visual on right and editorial mask on left
        - Mobile: Dedicated clean visual layout featuring crisp typography, dual action buttons, and framed showcase
      */}
      <div className="relative z-10 editorial-canvas-card bg-[#FBF9F4] sm:min-h-[580px] lg:min-h-[640px] p-5 sm:p-10 lg:p-14 overflow-hidden shadow-lg border border-[#DFDCD4] rounded-[28px] sm:rounded-[44px] flex flex-col justify-center">
        
        {/* Desktop / Tablet Background Image: Pharma Formulations Showcase */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden sm:block">
          <img
            src="/images/hero-aesthetic.jpg"
            alt="Adivari Pharmaceuticals Quality Healthcare Solutions"
            className="w-full h-full object-cover object-[78%_center] lg:object-right"
          />
          {/* Editorial gradient mask: solid stone off-white on left, fading into image on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF9F4] via-[#FBF9F4]/95 sm:via-[#FBF9F4]/90 to-transparent sm:w-[80%] lg:w-[68%]" />
          
          {/* Subtle molecular motion particles */}
          <div className="absolute inset-0 opacity-25">
            <MolecularMotionCanvas />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          
          {/* Left / Main Column: Editorial Content & Dual CTAs */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5 text-left">
            
            {/* Top Monospace Tag with glowing dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E3DFD5] text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#5C5749] uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40] animate-pulse shrink-0" />
              <span>QUALITY PHARMACEUTICALS FOR BETTER HEALTHCARE, WORLDWIDE</span>
            </div>

            {/* Natural Human Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-[#141414] tracking-tight leading-[1.16] sm:leading-[1.12] font-['Plus_Jakarta_Sans']">
              Trusted Pharmaceutical Solutions for Global Healthcare
            </h1>

            {/* Subtitle / Company Commitment & Portfolio Description */}
            <div className="space-y-2.5 max-w-2xl text-xs sm:text-[13.5px] text-[#4E4A3F] font-normal leading-relaxed">
              <p>
                At <strong className="font-semibold text-[#141414]">ADIVARI PHARMACEUTICALS PRIVATE LIMITED</strong>, we are committed to delivering quality pharmaceutical products that support diverse healthcare needs across global markets.
              </p>
              <p className="text-[#5E594D]">
                Our growing pharmaceutical portfolio includes a wide range of products across multiple therapeutic categories, including tablets, capsules, injectables, critical care medicines, anti-infectives, specialty pharmaceuticals, and other healthcare solutions.
              </p>
              <p className="text-[#696356] text-[11px] sm:text-xs">
                With a strong focus on quality, regulatory compliance, reliable sourcing, and international business standards, we work to build trusted partnerships with distributors, healthcare organizations, and business partners worldwide.
              </p>
            </div>

            {/* Trust Highlights Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-[#E0DCD2] text-[#1F1E1A] font-medium shadow-2xs">
                <span>🌍</span>
                <span>Global Reach</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-[#E0DCD2] text-[#1F1E1A] font-medium shadow-2xs">
                <span>💊</span>
                <span>Quality Pharmaceuticals</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-[#E0DCD2] text-[#1F1E1A] font-medium shadow-2xs">
                <span>🤝</span>
                <span>Trusted Partnerships</span>
              </span>
            </div>

            {/* Mobile Visual Showcase Plate (Displays on phones where background image is hidden) */}
            <div className="relative sm:hidden w-full h-44 rounded-2xl overflow-hidden border border-[#E5DFD4] shadow-sm bg-white my-2">
              <img
                src="/images/hero-aesthetic.jpg"
                alt="Adivari Pharmaceuticals Quality Formulations"
                className="w-full h-full object-cover object-[78%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/75 via-[#141414]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white font-mono font-semibold">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                  Global Healthcare
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#1A6B54]/90 backdrop-blur-md text-white border border-white/20 font-bold">
                  Quality Compliant
                </span>
              </div>
            </div>

            {/* Action Buttons: Dual CTA (Portfolio & Quote) */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={handleExplore}
                className="btn-sensiq-black px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-all group"
              >
                <span>Explore Our Pharmaceutical Portfolio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleRequestQuote}
                className="btn-sensiq-white px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.98] transition-all group border-[#D3CFC4] hover:border-[#141414] hover:bg-white"
              >
                <span>Request a Business Enquiry / Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 3 Capabilities Row - Clear, Human & Real */}
            <div className="pt-4 sm:pt-6 border-t border-[#E5E1D7] grid grid-cols-3 gap-2 sm:gap-4 text-left max-w-lg">
              <div className="bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-[#ECE8DE] sm:border-0 shadow-2xs sm:shadow-none">
                <p className="font-bold text-[#141414] text-[11px] sm:text-xs font-mono">QUALITY ASSURED</p>
                <p className="text-[10px] sm:text-[11px] text-[#7A7569] leading-tight mt-0.5">Qualified Manufacturing Partners</p>
              </div>

              <div className="bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-[#ECE8DE] sm:border-0 shadow-2xs sm:shadow-none">
                <p className="font-bold text-[#141414] text-[11px] sm:text-xs font-mono">EXPORT READY</p>
                <p className="text-[10px] sm:text-[11px] text-[#7A7569] leading-tight mt-0.5">Documentation &amp; Regulatory Support</p>
              </div>

              <div className="bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-[#ECE8DE] sm:border-0 shadow-2xs sm:shadow-none">
                <p className="font-bold text-[#141414] text-[11px] sm:text-xs font-mono">GLOBAL REACH</p>
                <p className="text-[10px] sm:text-[11px] text-[#7A7569] leading-tight mt-0.5">International Supply Solutions</p>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Open Area on Desktop showcasing the background visual */}
          <div className="lg:col-span-4 hidden lg:block" aria-hidden="true">
            {/* Open space for the background visual on travertine stone */}
          </div>

        </div>

      </div>
    </section>
  );
};
