import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowUp, MapPin, Phone, Plane, Ship, Globe2 } from 'lucide-react';

interface FooterProps {
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRfq }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-[#4A463B] text-white pt-14 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Top 4-Column Directory Grid (Direct match to reference footer structure!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10 text-xs">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans'] lowercase">
                adivari<span className="text-[#E2CA40] text-xs font-semibold uppercase tracking-wider ml-1">pharma</span>
              </span>
            </div>

            <p className="text-[12px] text-[#CBC7BB] leading-relaxed max-w-sm">
              WHO-GMP compliant manufacturer and international exporter of sterile lyophilized injectables, antibiotics, and critical care parenterals based in Mumbai, India.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold">
                WHO-GMP
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold">
                ISO 9001:2015
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold">
                CTD READY
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="font-bold text-white font-mono text-[11px] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-[11px] text-[#CBC7BB]">
              <li>
                <a href="#core-products" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#recommended" className="hover:text-white transition-colors">
                  Formulations
                </a>
              </li>
              <li>
                <a href="#export" className="hover:text-white transition-colors">
                  Global Exports
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors">
                  Standards
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Trade FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Formulation Monograph (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="font-bold text-white font-mono text-[11px] uppercase tracking-wider">
              Formulations (USP/IP)
            </h4>
            <ul className="space-y-1.5 text-[11px] text-[#CBC7BB]">
              <li>
                <a href="#core-products" className="hover:text-white transition-colors">
                  • Tigecycline for Injection 50mg
                </a>
              </li>
              <li>
                <a href="#core-products" className="hover:text-white transition-colors">
                  • Meropenem for Injection 1000mg
                </a>
              </li>
              <li>
                <a href="#core-products" className="hover:text-white transition-colors">
                  • Heparin Sodium Injection 5000 IU
                </a>
              </li>
              <li>
                <a href="#core-products" className="hover:text-white transition-colors">
                  • Esomeprazole for Injection 40mg
                </a>
              </li>
              <li>
                <a href="#core-products" className="hover:text-white transition-colors">
                  • Contract Manufacturing (OEM)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & IncoTerms (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="font-bold text-white font-mono text-[11px] uppercase tracking-wider">
              Export Desk
            </h4>
            <div className="space-y-2 text-[11px] text-[#CBC7BB]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E2CA40] shrink-0 mt-0.5" />
                <span>MIDC Zone, Andheri East, Mumbai, MH - 400093, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="w-3.5 h-3.5 text-[#E2CA40] shrink-0" />
                <span>Port: JNPT Nhava Sheva (Seaport)</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-3.5 h-3.5 text-[#E2CA40] shrink-0" />
                <span>Air Hub: BOM (Mumbai Airport)</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenRfq}
                  className="btn-sensiq-white py-2 px-4 text-xs font-bold"
                >
                  <span>Request RFQ (CIF/FOB)</span>
                  <ArrowUp className="w-3.5 h-3.5 rotate-45" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Watermark Anchor */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A8A498] pt-2">
          <div>
            © {new Date().getFullYear()} Adivari Pharmaceuticals Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-1 text-[#E2CA40] hover:underline font-semibold"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all ml-2"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Giant Typography Watermark Spanning Across Footer (Direct match to 'sensiq' reference!) */}
      <div className="w-full overflow-hidden flex justify-center items-center pointer-events-none select-none mt-4 -mb-4">
        <div className="footer-watermark tracking-tighter">
          adivari
        </div>
      </div>
    </footer>
  );
};
