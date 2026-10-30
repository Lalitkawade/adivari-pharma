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
                <Phone className="w-4 h-4 text-[#4A463B] shrink-0" />
                <button
                  onClick={onOpenRfq}
                  className="font-bold text-[#141414] hover:text-[#4A463B] text-left cursor-pointer transition-colors"
                >
                  Direct Inquiry &amp; RFQ Desk
                </button>
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
