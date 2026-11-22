import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowUp, MapPin, Phone, Plane, Ship, Globe2, Briefcase, ShieldCheck, FileText } from 'lucide-react';
import { COMPANY_DETAILS } from '../../lib/companyDetails';

interface FooterProps {
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRfq }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 sm:mt-16 bg-[#4A463B] text-white pt-10 sm:pt-14 pb-8 sm:pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Top Directory Grid (Optimized for Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-white/10 text-xs">
          
          {/* Column 1: Brand & Bio (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4 text-left">
            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  Adivari
                </span>
                <span className="text-sm font-semibold tracking-normal text-[#E2CA40] font-['Plus_Jakarta_Sans']">
                  Pharmaceuticals
                </span>
              </div>
              <p className="text-[11px] font-mono tracking-wider text-[#E2CA40] font-bold uppercase">
                {COMPANY_DETAILS.legalName}
              </p>
              <p className="text-[10px] font-mono text-[#CBC7BB]">
                CIN: {COMPANY_DETAILS.cin}
              </p>
            </div>

            <p className="text-[12px] text-[#CBC7BB] leading-relaxed max-w-sm">
              Quality-focused pharmaceutical solutions provider and international exporter of diverse therapeutic products including tablets, capsules, injectables, and critical care medicines across 25+ countries.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold">
                WHO-GMP
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold">
                ISO 9001:2015
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#E2CA40]/20 text-[#E2CA40] text-[10px] font-mono font-bold">
                DRUG LIC. 20B/21B
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold">
                CTD READY
              </span>
            </div>
          </div>

          {/* Columns 2 & 3: Navigation & Formulations (Side-by-side in 2 cols on mobile) */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:gap-8">
            {/* Column 2: Navigation Links */}
            <div className="space-y-2">
              <h4 className="font-bold text-white font-mono text-[11px] uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-1.5 text-[11px] text-[#CBC7BB]">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="/#catalog" className="hover:text-white transition-colors">
                    Catalog
                  </a>
                </li>
                <li>
                  <a href="/#export" className="hover:text-white transition-colors">
                    Exports
                  </a>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-[#E2CA40] transition-colors font-semibold flex items-center gap-1">
                    <span>Careers</span>
                    <span className="text-[8px] px-1 py-0.2 bg-[#E2CA40] text-[#141414] rounded-full font-mono font-bold">HIRING</span>
                  </Link>
                </li>
                <li>
                  <a href="/#showcase" className="hover:text-white transition-colors">
                    Standards
                  </a>
                </li>
                <li>
                  <a href="/#faq" className="hover:text-white transition-colors">
                    Trade FAQ
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Formulations */}
            <div className="space-y-2">
              <h4 className="font-bold text-white font-mono text-[11px] uppercase tracking-wider">
                Formulations
              </h4>
              <ul className="space-y-1.5 text-[11px] text-[#CBC7BB]">
                <li>
                  <a href="/#catalog" className="hover:text-white transition-colors">
                    • Tigecycline 50mg
                  </a>
                </li>
                <li>
                  <a href="/#catalog" className="hover:text-white transition-colors">
                    • Meropenem 1000mg
                  </a>
                </li>
                <li>
                  <a href="/#catalog" className="hover:text-white transition-colors">
                    • Heparin 5000 IU
                  </a>
                </li>
                <li>
                  <a href="/#catalog" className="hover:text-white transition-colors">
                    • Esomeprazole 40mg
                  </a>
                </li>
                <li>
                  <a href="/#catalog" className="hover:text-white transition-colors">
                    • Contract OEM
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Registered Office & Export Hub (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="font-bold text-white font-mono text-[11px] uppercase tracking-wider">
              Registered Office &amp; Export
            </h4>
            <div className="space-y-2 text-[11px] text-[#CBC7BB]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E2CA40] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {COMPANY_DETAILS.registeredOffice.full}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="w-3.5 h-3.5 text-[#E2CA40] shrink-0" />
                <span>Port: {COMPANY_DETAILS.logisticsGateway.seaport}</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-3.5 h-3.5 text-[#E2CA40] shrink-0" />
                <span>Air Hub: {COMPANY_DETAILS.logisticsGateway.airHub}</span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="w-3.5 h-3.5 text-[#25D366] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.83C9.36 7.83 9.09 7.89 8.87 8.13C8.65 8.38 8.02 8.97 8.02 10.17C8.02 11.38 8.9 12.54 9.02 12.71C9.15 12.87 10.74 15.33 13.18 16.38C13.76 16.63 14.21 16.78 14.57 16.89C15.15 17.08 15.68 17.05 16.1 16.99C16.57 16.92 17.54 16.4 17.74 15.83C17.95 15.26 17.95 14.77 17.89 14.67C17.82 14.57 17.66 14.51 17.41 14.39C17.16 14.26 15.94 13.66 15.71 13.58C15.49 13.49 15.32 13.45 15.16 13.7C15 13.94 14.53 14.51 14.39 14.67C14.24 14.83 14.1 14.85 13.85 14.72C13.6 14.6 12.79 14.33 11.84 13.49C11.1 12.83 10.6 12.02 10.46 11.77C10.31 11.53 10.44 11.39 10.57 11.27C10.68 11.16 10.81 10.98 10.94 10.83C11.06 10.69 11.11 10.58 11.19 10.42C11.27 10.25 11.23 10.11 11.17 9.99C11.11 9.86 10.64 8.71 10.44 8.24C10.25 7.78 10.06 7.84 9.91 7.83C9.77 7.83 9.62 7.83 9.53 7.83Z"/>
                  </svg>
                </span>
                <a
                  href={COMPANY_DETAILS.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {COMPANY_DETAILS.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E2CA40] shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E2CA40] shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.contact.phoneRaw}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.contact.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Corporate Statutory & Government Identification Strip (2 cols on mobile, 4 on desktop) */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-[#A8A497] block uppercase font-bold tracking-wider">
                CIN
              </span>
              <span className="font-mono font-bold text-white text-[11px] sm:text-[12px] tracking-wide block truncate" title={COMPANY_DETAILS.cin}>
                {COMPANY_DETAILS.cin}
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-[#A8A497] block uppercase font-bold tracking-wider">
                GSTIN
              </span>
              <span className="font-mono font-bold text-white text-[11px] sm:text-[12px] tracking-wide block truncate" title={COMPANY_DETAILS.gstin}>
                {COMPANY_DETAILS.gstin}
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-[#A8A497] block uppercase font-bold tracking-wider">
                Drug Licences (FDA MH)
              </span>
              <span className="font-mono font-bold text-[#E2CA40] text-[11px] sm:text-[12px] tracking-wide block">
                20B-647243 &amp; 21B-647244
              </span>
              <span className="text-[9px] text-[#CBC7BB] block font-mono">
                Validity: 07/09/2031
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-[#A8A497] block uppercase font-bold tracking-wider">
                PAN &amp; TAN
              </span>
              <div className="font-mono text-white text-[11px] flex items-center gap-1.5">
                <span>{COMPANY_DETAILS.pan}</span>
                <span>•</span>
                <span>{COMPANY_DETAILS.tan}</span>
              </div>
              <span className="text-[9px] text-[#CBC7BB] block truncate">
                {COMPANY_DETAILS.contact.email}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#A8A497]">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/careers" className="hover:text-white transition-colors">
              Careers
            </Link>
            <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors ml-1"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
