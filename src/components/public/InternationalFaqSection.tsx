import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Globe2, 
  FileText
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

interface InternationalFaqSectionProps {
  onOpenRfq: () => void;
}

export const InternationalFaqSection: React.FC<InternationalFaqSectionProps> = ({ onOpenRfq }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "How can foreign distributors and hospitals start importing from Adivari?",
      answer: "You can start by submitting an inquiry or Request for Quotation (RFQ) through our website with your target products and estimated order volumes. Our export team responds within 24 hours with a comprehensive commercial quotation (CIF or FOB terms), product specifications, and documentation samples to help you begin your evaluation.",
      category: "Ordering & Inquiries"
    },
    {
      question: "What registration dossiers and certificates do you supply for Ministry of Health approval?",
      answer: "We supply complete technical dossiers in CTD format (Modules 1 through 5), along with WHO-format Certificates of Pharmaceutical Product (COPP) issued by the Indian drug control authority, Free Sale Certificates (FSC), and batch-specific Certificates of Analysis (COA). We also provide real-time stability data to support drug registration in tropical and warm climates.",
      category: "Regulatory & Dossiers"
    },
    {
      question: "Do you offer private label manufacturing (contract manufacturing) under our own brand?",
      answer: "Yes, we regularly partner with overseas pharmaceutical marketing companies and hospital chains for contract manufacturing. We can produce formulations under your private brand, complete with custom bilingual cartons, ampoule/vial labeling, package inserts (in English, Spanish, French, or Arabic), and serialized 2D barcodes.",
      category: "Contract Manufacturing"
    },
    {
      question: "How are products shipped and how do you ensure temperature integrity?",
      answer: "Depending on your urgency and order size, consignments are shipped via air cargo from Mumbai International Airport (BOM) or by ocean freight in refrigerated containers from JNPT Port (Mumbai). For temperature-sensitive injectables (such as 2°C to 8°C cold-chain products), we use validated insulated thermal shippers with digital temperature data-loggers so you can verify temperature integrity upon arrival.",
      category: "Logistics & Cold Chain"
    },
    {
      question: "What are your typical order quantities (MOQ) and production lead times?",
      answer: "Minimum order quantities depend on whether you are purchasing standard catalog packaging or requesting custom private-label runs. For standard catalog formulations, orders typically ship within 10 to 14 working days. Customized packaging or private label batches generally dispatch within 3 to 4 weeks following artwork and registration sign-off.",
      category: "Commercial & Timing"
    },
    {
      question: "What payment terms and commercial arrangements do you accept?",
      answer: "We work with standard international commercial banking instruments, including Irrevocable Letters of Credit (L/C at sight) and Telegraphic Transfer (T/T). For long-term distribution partners and institutional tenders, our commercial team can discuss flexible milestone payment terms.",
      category: "Payment Terms"
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-[40px] p-6 sm:p-10 border border-[#DFDCD4] shadow-sm space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EFECE5]">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EC] border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#4A463B] w-fit mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
              <HelpCircle className="w-3.5 h-3.5 text-[#4A463B]" />
              <span>EXPORT INFORMATION &amp; FAQS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
              Frequently Asked Questions by <br />
              <span className="text-[#3B5244]">International Buyers &amp; Distributors</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#635F55] leading-relaxed">
              Common questions about international registrations, CTD dossiers, batch releases, and global shipping from India.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenRfq}
              className="btn-sensiq-black text-xs py-2.5 px-6 font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Contact Export Desk</span>
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-[24px] border transition-all duration-300 ${
                  isOpen 
                    ? 'bg-[#FAF9F5] border-[#141414]/30 shadow-xs' 
                    : 'bg-white border-[#DFDCD4] hover:border-[#CDC8BC]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3.5">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 transition-colors ${
                      isOpen ? 'bg-[#141414] text-white' : 'bg-[#F3F0EA] text-[#58554D]'
                    }`}>
                      0{index + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#8A857A] block mb-0.5">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#141414] text-white rotate-180' : 'bg-[#F5F3EC] text-[#58554D]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#58554D] leading-relaxed border-t border-[#EAE4D7] mt-1 text-left">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Assistance Card */}
        <div className="p-5 sm:p-7 rounded-[28px] bg-[#FAF9F5] border border-[#DFDCD4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#141414] text-white flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                Have specific country registration requirements or tender questions?
              </p>
              <p className="text-[11px] text-[#635F55]">
                Our international business team is ready to provide country-specific guidance and proforma pricing.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRfq}
            className="btn-sensiq-black text-xs py-2.5 px-6 font-medium shrink-0"
          >
            Inquire with Export Desk
          </button>
        </div>

      </div>
    </section>
  );
};
