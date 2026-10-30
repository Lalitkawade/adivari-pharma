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
            Facility
          </a>
          <a href="#faq" className="nav-segment-link">
            FAQ
          </a>
          <a href="#contact" className="nav-segment-link">
            Contact
          </a>
        </nav>

        {/* Right Desktop: WhatsApp Direct + Black Pill Action CTA Button + Admin Link */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="https://wa.me/919922868727?text=Hello%20Adivari%20Pharma%2C%20I%20am%20interested%20in%20inquiring%20about%20your%20pharmaceutical%20formulations."
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-full bg-white border border-[#DFDCD4] flex items-center gap-1.5 text-xs font-semibold text-[#141414] hover:border-[#25D366] hover:text-[#25D366] transition-all shadow-xs"
            title="Chat on WhatsApp (+91 99228 68727)"
          >
            <span className="w-4 h-4 text-[#25D366] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.83C9.36 7.83 9.09 7.89 8.87 8.13C8.65 8.38 8.02 8.97 8.02 10.17C8.02 11.38 8.9 12.54 9.02 12.71C9.15 12.87 10.74 15.33 13.18 16.38C13.76 16.63 14.21 16.78 14.57 16.89C15.15 17.08 15.68 17.05 16.1 16.99C16.57 16.92 17.54 16.4 17.74 15.83C17.95 15.26 17.95 14.77 17.89 14.67C17.82 14.57 17.66 14.51 17.41 14.39C17.16 14.26 15.94 13.66 15.71 13.58C15.49 13.49 15.32 13.45 15.16 13.7C15 13.94 14.53 14.51 14.39 14.67C14.24 14.83 14.1 14.85 13.85 14.72C13.6 14.6 12.79 14.33 11.84 13.49C11.1 12.83 10.6 12.02 10.46 11.77C10.31 11.53 10.44 11.39 10.57 11.27C10.68 11.16 10.81 10.98 10.94 10.83C11.06 10.69 11.11 10.58 11.19 10.42C11.27 10.25 11.23 10.11 11.17 9.99C11.11 9.86 10.64 8.71 10.44 8.24C10.25 7.78 10.06 7.84 9.91 7.83C9.77 7.83 9.62 7.83 9.53 7.83Z"/>
              </svg>
            </span>
            <span className="hidden md:inline font-mono text-[11px]">WhatsApp</span>
          </a>

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

        {/* Right Mobile Actions: Compact WhatsApp Icon + Quote Pill + Rounded Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="https://wa.me/919922868727?text=Hello%20Adivari%20Pharma%2C%20I%20am%20interested%20in%20inquiring%20about%20your%20pharmaceutical%20formulations."
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.83C9.36 7.83 9.09 7.89 8.87 8.13C8.65 8.38 8.02 8.97 8.02 10.17C8.02 11.38 8.9 12.54 9.02 12.71C9.15 12.87 10.74 15.33 13.18 16.38C13.76 16.63 14.21 16.78 14.57 16.89C15.15 17.08 15.68 17.05 16.1 16.99C16.57 16.92 17.54 16.4 17.74 15.83C17.95 15.26 17.95 14.77 17.89 14.67C17.82 14.57 17.66 14.51 17.41 14.39C17.16 14.26 15.94 13.66 15.71 13.58C15.49 13.49 15.32 13.45 15.16 13.7C15 13.94 14.53 14.51 14.39 14.67C14.24 14.83 14.1 14.85 13.85 14.72C13.6 14.6 12.79 14.33 11.84 13.49C11.1 12.83 10.6 12.02 10.46 11.77C10.31 11.53 10.44 11.39 10.57 11.27C10.68 11.16 10.81 10.98 10.94 10.83C11.06 10.69 11.11 10.58 11.19 10.42C11.27 10.25 11.23 10.11 11.17 9.99C11.11 9.86 10.64 8.71 10.44 8.24C10.25 7.78 10.06 7.84 9.91 7.83C9.77 7.83 9.62 7.83 9.53 7.83Z"/>
            </svg>
          </a>

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
              Facility
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EAE6DC] text-xs font-bold text-[#141414] hover:bg-[#F0ECE2] transition-colors"
            >
              FAQ
            </a>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <a
              href="https://wa.me/919922868727?text=Hello%20Adivari%20Pharma%2C%20I%20am%20interested%20in%20inquiring%20about%20your%20pharmaceutical%20formulations."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full justify-center py-2.5 px-4 rounded-full bg-[#25D366] text-white font-semibold text-xs flex items-center gap-2 shadow-xs hover:bg-[#20BD5A] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.83C9.36 7.83 9.09 7.89 8.87 8.13C8.65 8.38 8.02 8.97 8.02 10.17C8.02 11.38 8.9 12.54 9.02 12.71C9.15 12.87 10.74 15.33 13.18 16.38C13.76 16.63 14.21 16.78 14.57 16.89C15.15 17.08 15.68 17.05 16.1 16.99C16.57 16.92 17.54 16.4 17.74 15.83C17.95 15.26 17.95 14.77 17.89 14.67C17.82 14.57 17.66 14.51 17.41 14.39C17.16 14.26 15.94 13.66 15.71 13.58C15.49 13.49 15.32 13.45 15.16 13.7C15 13.94 14.53 14.51 14.39 14.67C14.24 14.83 14.1 14.85 13.85 14.72C13.6 14.6 12.79 14.33 11.84 13.49C11.1 12.83 10.6 12.02 10.46 11.77C10.31 11.53 10.44 11.39 10.57 11.27C10.68 11.16 10.81 10.98 10.94 10.83C11.06 10.69 11.11 10.58 11.19 10.42C11.27 10.25 11.23 10.11 11.17 9.99C11.11 9.86 10.64 8.71 10.44 8.24C10.25 7.78 10.06 7.84 9.91 7.83C9.77 7.83 9.62 7.83 9.53 7.83Z"/>
              </svg>
              <span>Chat on WhatsApp (+91 99228 68727)</span>
            </a>

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
