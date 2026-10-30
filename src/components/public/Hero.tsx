import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MolecularMotionCanvas } from '../motion/MolecularMotionCanvas';

interface HeroProps {
  onOpenRfq?: () => void;
  onExploreCatalog?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog }) => {
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

  return (
    <section className="pt-2 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full relative">
      
      {/* 
        Main Editorial Canvas Card
        - Desktop: Expansive canvas with full-bleed vials on travertine on right and editorial mask on left
        - Mobile: Dedicated clean visual layout featuring crisp typography, single explore button, and framed vials showcase
      */}
      <div className="relative z-10 editorial-canvas-card bg-[#FBF9F4] sm:min-h-[560px] lg:min-h-[620px] p-5 sm:p-10 lg:p-14 overflow-hidden shadow-lg border border-[#DFDCD4] rounded-[28px] sm:rounded-[44px] flex flex-col justify-center">
        
        {/* Desktop / Tablet Background Image: Pharma Vials on Travertine Pedestal */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden sm:block">
          <img
            src="/images/hero-aesthetic.jpg"
            alt="Adivari Pharmaceuticals Sterile Injectable Formulations"
            className="w-full h-full object-cover object-[78%_center] lg:object-right"
          />
          {/* Editorial gradient mask: solid stone off-white on left, fading into image on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF9F4] via-[#FBF9F4]/95 sm:via-[#FBF9F4]/85 to-transparent sm:w-[75%] lg:w-[60%]" />
          
          {/* Subtle molecular motion particles */}
          <div className="absolute inset-0 opacity-25">
            <MolecularMotionCanvas />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          
          {/* Left / Main Column: Typography & Single Primary Action */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* Top Monospace Tag with glowing dot */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E3DFD5] text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#666256] uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40] animate-pulse" />
              <span>WHO-GMP CERTIFIED INJECTABLE MANUFACTURER</span>
            </div>

            {/* Natural Human Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.3rem] font-bold text-[#141414] tracking-tight leading-[1.14] sm:leading-[1.1] font-['Plus_Jakarta_Sans']">
              Trusted sterile <br className="hidden sm:inline" />
              injectables for hospitals <br className="hidden sm:inline" />
              &amp; global healthcare
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#5D594F] max-w-lg font-normal leading-relaxed">
              We manufacture hospital-grade antibiotics, emergency anticoagulants, and critical care parenterals with complete registration dossiers for overseas distributors and health systems.
            </p>

            {/* Mobile Visual Showcase Plate (Displays on phones where background image is hidden) */}
            <div className="relative sm:hidden w-full h-52 rounded-2xl overflow-hidden border border-[#E5DFD4] shadow-sm bg-white my-1">
              <img
                src="/images/hero-aesthetic.jpg"
                alt="Adivari Sterile Injectable Vials"
                className="w-full h-full object-cover object-[78%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/65 via-[#141414]/15 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-white font-mono font-semibold">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                  Cleanroom Facility
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#D96B43]/90 backdrop-blur-md text-white border border-white/20 font-bold">
                  WHO-GMP Certified
                </span>
              </div>
            </div>

            {/* Single Primary Action Button: Explore Products */}
            <div className="pt-1 sm:pt-2">
              <button
                onClick={handleExplore}
                className="w-full sm:w-auto btn-sensiq-black px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-all group"
              >
                <span>Explore Products Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 3 Capabilities Row - Clear, Human & Real */}
            <div className="pt-4 sm:pt-6 border-t border-[#E5E1D7] grid grid-cols-3 gap-2 sm:gap-4 text-left max-w-md">
              <div className="bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-[#ECE8DE] sm:border-0 shadow-2xs sm:shadow-none">
                <p className="font-bold text-[#141414] text-[11px] sm:text-xs font-mono">WHO-GMP</p>
                <p className="text-[10px] sm:text-[11px] text-[#7A7569] leading-tight mt-0.5">Certified Plant</p>
              </div>

              <div className="bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-[#ECE8DE] sm:border-0 shadow-2xs sm:shadow-none">
                <p className="font-bold text-[#141414] text-[11px] sm:text-xs font-mono">EXPORT READY</p>
                <p className="text-[10px] sm:text-[11px] text-[#7A7569] leading-tight mt-0.5">CTD Dossiers</p>
              </div>

              <div className="bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-[#ECE8DE] sm:border-0 shadow-2xs sm:shadow-none">
                <p className="font-bold text-[#141414] text-[11px] sm:text-xs font-mono">GLOBAL SUPPLY</p>
                <p className="text-[10px] sm:text-[11px] text-[#7A7569] leading-tight mt-0.5">Air &amp; Sea Freight</p>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Open Area on Desktop showcasing the vials */}
          <div className="lg:col-span-5 hidden lg:block" aria-hidden="true">
            {/* Open space for the background vials on travertine stone */}
          </div>

        </div>

      </div>
    </section>
  );
};
