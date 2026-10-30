import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Leaf, 
  Globe2 
} from 'lucide-react';
import toast from 'react-hot-toast';

import { useData } from '../../context/DataContext';

interface ContactInquiryCardProps {
  onOpenRfq: () => void;
}

export const ContactInquiryCard: React.FC<ContactInquiryCardProps> = ({ onOpenRfq }) => {
  const { addQuotation } = useData();
  const [quickContact, setQuickContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickContact.trim()) {
      toast.error('Please enter your work email or WhatsApp phone number.');
      return;
    }

    const isEmail = quickContact.includes('@');
    try {
      await addQuotation({
        companyName: 'Website Quick Lead',
        contactPerson: quickContact,
        email: isEmail ? quickContact : 'inquiry-lead@adivaripharma.com',
        phone: !isEmail ? quickContact : '',
        country: 'International Visitor',
        organizationType: 'Licensed Importer',
        incoterms: 'CIF',
        items: [
          { productId: 'general', productName: 'Express Export Catalog & Pricing Inquiry', quantity: 1, unit: 'request' }
        ],
        message: `Direct inquiry from website: ${quickContact}. Requesting wholesale export catalog, CTD dossier availability, and CIF/FOB pricing.`
      });
      setSubmitted(true);
      toast.success('Inquiry received! Our export team will reach out within 24 hours.');
    } catch (err) {
      console.error(err);
      toast.error('Submission failed. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-[40px] p-6 sm:p-10 border border-[#DFDCD4] shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Coordinates & Hours */}
          <div className="lg:col-span-5 space-y-4 text-xs text-left">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EC] border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#4A463B] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
              <Globe2 className="w-3.5 h-3.5 text-[#4A463B]" />
              <span>International Trade Desk</span>
            </div>

            <h3 className="text-xl font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
              Export Inquiries &amp; Quotations
            </h3>

            <div className="space-y-3 text-[#58554D]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#4A463B] shrink-0 mt-0.5" />
                <span>MIDC Pharmaceutical Zone, Andheri East, Mumbai, Maharashtra 400093, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#4A463B] shrink-0" />
                <span>Export Operations: Monday to Saturday (Quick response within 24h)</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-4 h-4 text-[#25D366] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.83C9.36 7.83 9.09 7.89 8.87 8.13C8.65 8.38 8.02 8.97 8.02 10.17C8.02 11.38 8.9 12.54 9.02 12.71C9.15 12.87 10.74 15.33 13.18 16.38C13.76 16.63 14.21 16.78 14.57 16.89C15.15 17.08 15.68 17.05 16.1 16.99C16.57 16.92 17.54 16.4 17.74 15.83C17.95 15.26 17.95 14.77 17.89 14.67C17.82 14.57 17.66 14.51 17.41 14.39C17.16 14.26 15.94 13.66 15.71 13.58C15.49 13.49 15.32 13.45 15.16 13.7C15 13.94 14.53 14.51 14.39 14.67C14.24 14.83 14.1 14.85 13.85 14.72C13.6 14.6 12.79 14.33 11.84 13.49C11.1 12.83 10.6 12.02 10.46 11.77C10.31 11.53 10.44 11.39 10.57 11.27C10.68 11.16 10.81 10.98 10.94 10.83C11.06 10.69 11.11 10.58 11.19 10.42C11.27 10.25 11.23 10.11 11.17 9.99C11.11 9.86 10.64 8.71 10.44 8.24C10.25 7.78 10.06 7.84 9.91 7.83C9.77 7.83 9.62 7.83 9.53 7.83Z"/>
                  </svg>
                </div>
                <a
                  href="https://wa.me/919922868727?text=Hello%20Adivari%20Pharma%2C%20I%20am%20interested%20in%20inquiring%20about%20your%20export%20formulations."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#141414] hover:text-[#25D366] text-left transition-colors flex items-center gap-2 group"
                >
                  <span>WhatsApp: +91 99228 68727</span>
                  <span className="text-[10px] font-mono font-semibold bg-[#E7F8ED] text-[#1E7E34] px-2 py-0.5 rounded-full border border-[#BDE8CB] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    Chat Live
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#4A463B] shrink-0" />
                <span className="font-semibold text-[#141414]">export@adivaripharma.com</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-[#58554D] font-mono">
              <span className="bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#DFDCD4]">
                JNPT Mumbai Port
              </span>
              <span className="bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#DFDCD4]">
                Air Cargo Mumbai (BOM)
              </span>
              <span className="bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#DFDCD4]">
                Incoterms: CIF / FOB
              </span>
            </div>
          </div>

          {/* Right Column: Quick Inquiry Form */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-[#FAF9F5] rounded-[28px] border border-[#DFDCD4]">
            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A857A]">
                Direct Commercial Inquiry
              </span>

              <h4 className="text-sm font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                Request Export Pricing &amp; Registration Files
              </h4>

              <p className="text-xs text-[#635F55] leading-relaxed">
                Enter your work email or WhatsApp contact to receive our full catalogue with wholesale proforma pricing, batch specifications, and dossier availability.
              </p>
              
              {submitted ? (
                <div className="pt-2 flex items-center gap-2 text-xs text-[#2E7D32] font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Inquiry received! Our export manager will contact you within 24 hours.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="text"
                    required
                    value={quickContact}
                    onChange={(e) => setQuickContact(e.target.value)}
                    placeholder="Work email or WhatsApp number..."
                    className="flex-1 bg-white border border-[#DFDCD4] text-[#141414] rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-[#141414]"
                  />
                  <button
                    type="submit"
                    className="btn-sensiq-black py-2.5 px-6 text-xs font-medium shrink-0"
                  >
                    Send Inquiry
                  </button>
                </form>
              )}

              <p className="text-[11px] text-[#7A7569] pt-1">
                Documentation available in English, Spanish, French, and Arabic.
              </p>
            </div>

            {/* Decorative Minimal Line Leaf Badge */}
            <div className="hidden md:flex w-20 h-20 rounded-2xl bg-[#F0EDE5] border border-[#DFDCD4] items-center justify-center text-[#4A463B] shrink-0">
              <Leaf className="w-9 h-9 stroke-[1.5]" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
