import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe2, 
  Menu, 
  X, 
  Lock, 
  PhoneCall, 
  FileText,
  Home,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenRfq: (productId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRfq }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#ECEAE4]/90 backdrop-blur-md transition-all border-b border-[#DFDCD4]/60">
      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-3">
        
        {/* Left: Brand Identity (Modernist lowercase/clean Grotesque matching 'sensiq' reference) */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 text-decoration-none group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white p-1 border border-[#DFDCD4] flex items-center justify-center overflow-hidden shadow-xs group-hover:border-[#141414] transition-all">
            <img 
              src="/images/Adivari Pharmaceutical Logo with Leaf and Capsule.png" 
              alt="Adivari Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#141414] font-['Plus_Jakarta_Sans'] lowercase">
              adivari<span className="text-[#8E897D] text-[10px] sm:text-xs font-semibold uppercase tracking-wider ml-1">pharma</span>
            </span>
          </div>
        </Link>

        {/* Center: White Segmented Pill Nav Bar (Strictly hidden on mobile, visible on desktop >= 1024px) */}
        <nav className="hidden lg:inline-flex items-center nav-segmented-bar">
          <a
            href="#"
            className="w-8 h-8 rounded-full bg-[#141414] text-white flex items-center justify-center transition-transform hover:scale-105"
            title="Home"
          >
            <Home className="w-3.5 h-3.5 text-white" />
          </a>
          
          <a href="#catalog" className="nav-segment-link flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
            <span>Formulations</span>
          </a>
          <a href="#export" className="nav-segment-link">
            Global Export
          </a>
          <a href="#showcase" className="nav-segment-link">
            WHO-GMP Specs
          </a>
          <a href="#faq" className="nav-segment-link">
            Trade FAQ
          </a>
          <a href="#contact" className="nav-segment-link">
            Contact
          </a>
        </nav>

        {/* Right Desktop: Black Pill Action CTA Button + Admin Link */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => onOpenRfq()}
            className="btn-sensiq-black"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <Link
            to="/admin"
            className="w-9 h-9 rounded-full bg-white border border-[#DFDCD4] flex items-center justify-center text-[#58554D] hover:text-[#141414] hover:border-[#141414] transition-all"
            title="Admin Portal"
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Right Mobile Actions: Compact Quote Pill + Rounded Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenRfq()}
            className="btn-sensiq-black py-1.5 px-3 text-xs font-semibold flex items-center gap-1 shadow-xs"
          >
            <span>Quote</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-full bg-white border border-[#DFDCD4] flex items-center justify-center text-[#141414] hover:bg-[#F3F0EA] active:scale-95 transition-all shadow-xs"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-x border-[#DFDCD4] rounded-b-[28px] mx-2 px-5 pt-4 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 border-b border-[#EFECE5] pb-3">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EAE6DC] text-xs font-bold text-[#141414] hover:bg-[#F0ECE2] transition-colors flex items-center justify-between col-span-2"
            >
              <span>Formulations Portfolio &amp; Catalog</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
            </a>
            <a
              href="#export"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EAE6DC] text-xs font-bold text-[#141414] hover:bg-[#F0ECE2] transition-colors"
            >
              Global Export
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EAE6DC] text-xs font-bold text-[#141414] hover:bg-[#F0ECE2] transition-colors"
            >
              WHO-GMP Specs
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EAE6DC] text-xs font-bold text-[#141414] hover:bg-[#F0ECE2] transition-colors"
            >
              Trade FAQ
            </a>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="btn-sensiq-black w-full justify-center py-3 text-xs"
            >
              <span>Request Commercial Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center justify-between pt-1 text-[11px] text-[#7A7569]">
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 hover:text-[#141414] font-medium"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </Link>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#141414] font-medium"
              >
                Direct Contacts →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
