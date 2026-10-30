import React from 'react';
import { 
  ArrowRight
} from 'lucide-react';
import { MolecularMotionCanvas } from '../motion/MolecularMotionCanvas';

interface HeroProps {
  onOpenRfq: () => void;
  onExploreCatalog?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRfq, onExploreCatalog }) => {
  return (
    <section className="pt-2 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full relative">
      
      {/* 
        Main Large Editorial Canvas Card
        Background is the Pharma Vials on Travertine Pedestal (/images/hero-aesthetic.jpg)
        - Reference woman image completely removed
        - Pharma vials image is the full background of this card
        - No inner box or frame
        - No sticky HUD badges
      */}
      <div className="relative z-10 editorial-canvas-card min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-xl border border-[#DFDCD4] rounded-[36px] sm:rounded-[44px] flex items-center">
        
        {/* Background Image: Pharma Vials on Travertine Pedestal */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/images/hero-aesthetic.jpg"
            alt="Adivari Pharmaceuticals Sterile Injectable Formulations"
            className="w-full h-full object-cover object-[78%_center] lg:object-right"
          />
          {/* 
            Editorial gradient mask:
            Solid editorial stone off-white on the left for crisp typography,
            gracefully fading to transparent towards the right so the sterile vials on travertine stone 
            stand out in full view with zero awkward borders or boxes.
          */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF9F4] via-[#FBF9F4]/95 sm:via-[#FBF9F4]/85 to-transparent sm:w-[75%] lg:w-[62%]" />
          
          {/* Mobile wash to ensure AAA contrast across phone screens */}
          <div className="absolute inset-0 bg-[#FBF9F4]/75 sm:hidden" />
          
          {/* Subtle molecular motion particles in canvas background */}
          <div className="absolute inset-0 opacity-25">
            <MolecularMotionCanvas />
          </div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Typography & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Monospace Micro Tag */}
            <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#7A7569]">
              WHO-GMP STERILE INJECTABLE FORMULATIONS
            </div>

            {/* Modernist Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#141414] tracking-tight leading-[1.08] font-['Plus_Jakarta_Sans']">
              Precision sterile <br />
              formulations built for <br />
              critical care
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#615D52] max-w-lg font-normal leading-relaxed">
              Pharmaceutical manufacturing of lyophilized antibiotics, emergency anticoagulants, and intensive care parenterals with verified CTD dossier compliance.
            </p>

            {/* Action Buttons: Solid Black Pill Button with Arrow & White Pill Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onOpenRfq()}
                className="btn-sensiq-black px-7 py-3.5 text-xs font-semibold"
              >
                <span>Start exploring</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <a
                href="#catalog"
                onClick={(e) => {
                  if (onExploreCatalog) {
                    e.preventDefault();
                    onExploreCatalog();
                  }
                }}
                className="btn-sensiq-white px-6 py-3.5 text-xs font-semibold text-center"
              >
                <span>Explore Product Catalogue</span>
              </a>
            </div>

            {/* 3 Capabilities Row */}
            <div className="pt-6 border-t border-[#E3DFD5] grid grid-cols-3 gap-4 text-xs max-w-md">
              <div>
                <p className="font-bold text-[#141414] text-xs font-mono">GRADE A</p>
                <p className="text-[11px] text-[#7A7569] mt-0.5">Aseptic Cleanrooms</p>
              </div>

              <div>
                <p className="font-bold text-[#141414] text-xs font-mono">CTD READY</p>
                <p className="text-[11px] text-[#7A7569] mt-0.5">Modules 1 to 5</p>
              </div>

              <div>
                <p className="font-bold text-[#141414] text-xs font-mono">ZONE IVb</p>
                <p className="text-[11px] text-[#7A7569] mt-0.5">Stability Validated</p>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Open Area allowing the background vials to be appreciated */}
          <div className="lg:col-span-5 hidden lg:block" aria-hidden="true">
            {/* Open space for the background vials on travertine stone */}
          </div>

        </div>

      </div>
    </section>
  );
};
