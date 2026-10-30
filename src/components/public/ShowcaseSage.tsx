import React from 'react';
import { 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface ShowcaseSageProps {
  onOpenRfq: () => void;
}

export const ShowcaseSage: React.FC<ShowcaseSageProps> = ({ onOpenRfq }) => {
  return (
    <section id="showcase" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Deep Earthy Olive Taupe Container */}
      <div className="container-taupe-dark relative overflow-hidden shadow-xl rounded-[36px] sm:rounded-[44px]">
        
        {/* Top Segmented Progress Line */}
        <div className="grid grid-cols-4 w-full h-[3px]">
          <div className="bg-[#E2CA40]" />
          <div className="bg-white/15" />
          <div className="bg-white/15" />
          <div className="bg-white/15" />
        </div>

        {/* Subtle Watermark in background */}
        <div className="absolute right-0 bottom-0 text-[10rem] font-black text-white/5 pointer-events-none select-none tracking-tighter leading-none -mb-8 -mr-6 font-['Plus_Jakarta_Sans']">
          adivari
        </div>

        <div className="p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column: Human, Confident Pharmaceutical Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#D4CFBE] uppercase block">
                STERILE MANUFACTURING FACILITY
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.08] font-['Plus_Jakarta_Sans']">
                Modern manufacturing, <br />
                trusted by hospitals
              </h2>

              <p className="text-xs sm:text-sm text-[#D8D4C8] max-w-lg leading-relaxed">
                Our manufacturing plant in Maharashtra is purpose-built for sterile injectables and freeze-dried vials. Operating under strict WHO-GMP protocols, our automated filling suites and dedicated cleanrooms ensure uncompromised quality and safety for global healthcare providers.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenRfq}
                  className="btn-sensiq-white px-7 py-3.5 text-xs font-semibold shadow-md"
                >
                  <span>Request Facility &amp; Dossier Details</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

              {/* 3 Practical Metrics Row */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-[#E5E1D5]">
                <div>
                  <p className="font-bold text-white text-xs font-mono">WHO-GMP</p>
                  <p className="text-[11px] text-[#C4BFB0] mt-0.5">Certified Plant</p>
                </div>

                <div>
                  <p className="font-bold text-white text-xs font-mono">ASEPTIC</p>
                  <p className="text-[11px] text-[#C4BFB0] mt-0.5">Automated Lines</p>
                </div>

                <div>
                  <p className="font-bold text-white text-xs font-mono">GLOBAL</p>
                  <p className="text-[11px] text-[#C4BFB0] mt-0.5">Exporting Worldwide</p>
                </div>
              </div>

            </div>

            {/* Right Column: Clean Facility Photo with Minimal Frame & Overlaid Card */}
            <div className="lg:col-span-5 relative">
              <div className="overflow-hidden rounded-[28px] border border-white/15 shadow-2xl relative">
                <img
                  src="/images/facility-showcase.jpg"
                  alt="Adivari Pharmaceuticals Sterile Cleanroom Facility"
                  className="w-full h-72 sm:h-92 object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />
                
                {/* Floating Credential Badge */}
                <div className="absolute top-4 left-4 bg-[#141414]/80 backdrop-blur-md rounded-full text-xs flex items-center gap-2 py-1.5 px-3.5 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#E2CA40]" />
                  <span className="text-[11px] text-white font-medium">WHO-GMP Compliant Suites</span>
                </div>

                {/* Overlaid Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#141414]/90 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xl flex items-center justify-between gap-3">
                  <div>
                    <p className="text-white text-xs font-medium leading-snug">
                      Automated freeze-drying &amp; high-precision visual inspection
                    </p>
                  </div>
                  <button
                    onClick={onOpenRfq}
                    className="bg-white text-[#141414] hover:bg-[#F3F0EA] rounded-full px-3.5 py-1.5 text-[11px] font-semibold shrink-0 flex items-center gap-1 transition-all"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
