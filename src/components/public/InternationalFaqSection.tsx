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
  keywords: string[];
}

interface InternationalFaqSectionProps {
  onOpenRfq: () => void;
}

export const InternationalFaqSection: React.FC<InternationalFaqSectionProps> = ({ onOpenRfq }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "How do foreign distributors and importers buy pharmaceuticals from India through Adivari?",
      answer: "International pharmaceutical distributors, hospital procurement committees, and licensed importers can initiate orders by submitting a Request for Quotation (RFQ). Our dedicated Global Export Desk provides competitive CIF (Cost, Insurance & Freight), FOB (Free on Board), or CFR pricing within 12 hours. We furnish complete commercial invoices, Certificates of Origin, analytical COAs, and technical support to ensure seamless customs clearance at destination ports.",
      category: "Export & Ordering",
      keywords: ["CIF", "FOB", "Pharmaceutical Exporter India", "Wholesale Pricing"]
    },
    {
      question: "What regulatory dossiers (CTD / eCTD) and health authority certificates do you provide?",
      answer: "We supply pre-compiled Common Technical Document (CTD) and electronic CTD (eCTD) dossiers covering Modules 1 through 5, including Quality Overall Summary (Module 2) and detailed Quality documentation (Module 3). Additionally, we provide WHO-format Certificates of Pharmaceutical Product (COPP) issued by the Indian CDSCO/FDA, Free Sale Certificates (FSC), Legalized/Apostilled batch COAs, and real-time ICH Zone IVb stability studies (tested at 30°C / 75% RH).",
      category: "Regulatory & Dossiers",
      keywords: ["CTD Dossier", "eCTD Modules 1-5", "COPP WHO format", "Free Sale Certificate"]
    },
    {
      question: "Do you offer third-party contract manufacturing and private labeling (OEM) for international brands?",
      answer: "Yes. Adivari Pharmaceuticals is a trusted contract manufacturing partner for global pharmaceutical marketing companies and hospital chains. We offer end-to-end custom formulation manufacturing under your private label, including customized bilingual vial labels and folding cartons (English, Spanish, French, Arabic, Russian), custom tamper-evident seals, and GS1 2D DataMatrix track-and-trace serialization.",
      category: "Contract Manufacturing",
      keywords: ["Third Party Manufacturing India", "Private Label Injectables", "OEM Pharma"]
    },
    {
      question: "Which international sea ports and air cargo hubs are used for export consignments?",
      answer: "Ocean freight consignments are dispatched via JNPT Nhava Sheva Port, Mumbai (India's premier modern container seaport) utilizing certified refrigerated reefer containers (FCL and LCL) with uninterrupted power plug-in. High-urgency hospital supplies and biological injectables are air-shipped via Chhatrapati Shivaji Maharaj International Airport (BOM), Mumbai, with priority customs bonded clearance and delivery within 72 to 96 hours globally.",
      category: "Logistics & Ports",
      keywords: ["JNPT Nhava Sheva", "Mumbai Airport BOM", "Reefer Container", "Cold Chain"]
    },
    {
      question: "What temperature monitoring protocols are in place for cold-chain and room-temperature injectables?",
      answer: "Every export shipment includes multi-sensor, USB-downloadable calibrated digital data-loggers placed strategically within shippers and pallets. Cold-chain formulations (2°C to 8°C) are packed inside validated high-density EPS/VIP thermal shippers with vacuum-insulated panels and conditioned phase-change materials (PCM) providing up to 120 hours of thermal holdover without external power.",
      category: "Cold-Chain Integrity",
      keywords: ["2°C–8°C Cold Chain", "Temperature Datalogger", "Thermal Shippers"]
    },
    {
      question: "What are your standard payment terms, minimum order quantities (MOQ), and delivery lead times?",
      answer: "We accommodate international commercial standards including Confirmed Irrevocable Letter of Credit (L/C at sight), Telegraphic Transfer (T/T Advance), and Cash Against Documents (CAD) for established partners. MOQs are flexible depending on standard commercial batch sizes or customized private-label runs. Standard catalog formulations ship within 10–14 business days, while customized contract packaging dispatches in 21–30 days.",
      category: "Commercial Terms",
      keywords: ["Letter of Credit L/C", "T/T Advance", "MOQ", "Fast Dispatch"]
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
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EC] border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#4A463B] w-fit mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
              <HelpCircle className="w-3.5 h-3.5 text-[#4A463B]" />
              <span>International Trade &amp; Importer Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
              Frequently Asked Questions by <br />
              <span className="text-[#4A463B]">Global Pharma Buyers &amp; Importers</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#635F55] leading-relaxed">
              Essential answers regarding international drug registration, CTD dossiers, WHO-GMP certification, Incoterms, and global cold-chain pharmaceutical shipping from India.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenRfq}
              className="btn-sensiq-black text-xs py-2.5 px-6 font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ask Our Export Desk</span>
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
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#58554D] leading-relaxed border-t border-[#EAE4D7] mt-1 space-y-3">
                    <p>{faq.answer}</p>
                    
                    {/* Keyword Tags Pill Row */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-[#8A857A] font-semibold uppercase tracking-wider mr-1">
                        Keywords:
                      </span>
                      {faq.keywords.map((kw, kidx) => (
                        <span 
                          key={kidx} 
                          className="px-2.5 py-0.5 rounded-full bg-[#F3F0EA] text-[#4A463B] text-[10px] font-mono border border-[#DFDCD4]"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
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
                Looking for exclusive country agency rights or hospital tender partnership?
              </p>
              <p className="text-[11px] text-[#635F55]">
                Connect with our International Business Development Directors for immediate CIF quotations and sample shipments.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRfq}
            className="btn-sensiq-black text-xs py-2.5 px-6 font-medium shrink-0"
          >
            Connect with Export Team
          </button>
        </div>

      </div>
    </section>
  );
};
