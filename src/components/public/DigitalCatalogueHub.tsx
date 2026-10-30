import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Globe, 
  ShieldCheck, 
  FileCheck2, 
  Boxes, 
  Download, 
  ArrowRight, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import toast from 'react-hot-toast';

interface DigitalCatalogueHubProps {
  onOpenRfq: (productId?: string) => void;
}

export const DigitalCatalogueHub: React.FC<DigitalCatalogueHubProps> = ({ onOpenRfq }) => {
  const { products } = useData();
  const [selectedRegion, setSelectedRegion] = useState<number>(0);

  // International export markets & client regions
  const targetRegions = [
    {
      id: 'latam',
      name: 'Latin America',
      shortCode: 'LATAM',
      badge: 'Spanish Bilingual Packaging',
      countries: 'Mexico, Brazil, Colombia, Peru, Chile, Argentina',
      dossier: 'Full CTD Dossiers (Modules 1–5) with Spanish summaries',
      packaging: 'Spanish / English dual-language cartons & inserts',
      shipping: 'Sea freight (CIF) & expedited air cargo',
      description: 'We help distributors and hospital suppliers across Central and South America navigate local Ministry of Health registrations with complete technical dossiers, legal COPP certificates, and stability studies suitable for warm climates.'
    },
    {
      id: 'gcc',
      name: 'Middle East & GCC',
      shortCode: 'Middle East',
      badge: 'Arabic & English Packaging',
      countries: 'UAE, Saudi Arabia, Oman, Kuwait, Qatar, Bahrain',
      dossier: 'Dossiers prepared for SFDA and regional health authorities',
      packaging: 'Arabic & English bilingual packaging & serialization',
      shipping: 'Temperature-controlled air freight from Mumbai hub',
      description: 'Supplying hospital tenders and licensed pharmaceutical distributors throughout the Gulf region. We offer fast air cargo dispatch with continuous temperature monitoring for critical hospital antibiotics.'
    },
    {
      id: 'asean',
      name: 'Southeast Asia',
      shortCode: 'Southeast Asia',
      badge: 'ASEAN Dossier Alignment',
      countries: 'Vietnam, Philippines, Malaysia, Thailand, Indonesia',
      dossier: 'ACTD and CTD formats aligned with drug control authorities',
      packaging: 'Bilingual packaging & tropical moisture protection',
      shipping: 'Direct ocean container (FCL/LCL) and air freight',
      description: 'Trusted partner for hospital formularies and national tender suppliers across Southeast Asia. We provide batch-wise Certificates of Analysis, legalized GMP certificates, and prompt regulatory guidance.'
    },
    {
      id: 'africa',
      name: 'Africa',
      shortCode: 'Africa',
      badge: 'Essential Hospital Medicines',
      countries: 'Kenya, Nigeria, Ghana, Tanzania, South Africa, Egypt',
      dossier: 'Complete national registration dossiers & COPP documentation',
      packaging: 'Durable hospital packaging with security seals',
      shipping: 'Ocean container shipments to major commercial ports',
      description: 'Supplying high-demand sterile antibiotics (such as Meropenem and Tigecycline) and emergency injectables to national procurement agencies and established private importers with flexible commercial terms.'
    },
    {
      id: 'cis',
      name: 'Central Asia & CIS',
      shortCode: 'Central Asia',
      badge: 'Russian Bilingual Packaging',
      countries: 'Uzbekistan, Kazakhstan, Azerbaijan, Georgia',
      dossier: 'CTD registration files with Russian translation assistance',
      packaging: 'Russian & English packaging conforming to local standards',
      shipping: 'Air cargo and consolidated overland transport',
      description: 'Comprehensive registration support and supply continuity for licensed distributors in Eurasian markets, backed by WHO-GMP credentials, official COPPs, and localized packaging.'
    }
  ];

  // Export full live catalogue to CSV for foreign buyers
  const handleDownloadCatalogue = () => {
    if (products.length === 0) {
      toast.error('No products in catalog yet. Please add products first.');
      return;
    }

    const headers = [
      'Product Name', 
      'Generic Molecule (API)', 
      'Category', 
      'Strength', 
      'Pharmacopeia', 
      'Dosage Form', 
      'Packaging Format', 
      'Shelf Life', 
      'Storage Condition', 
      'Registration Dossier', 
      'Export Markets'
    ];

    const rows = products.map(p => [
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.genericName.replace(/"/g, '""')}"`,
      `"${p.category.replace(/"/g, '""')}"`,
      `"${p.strength.replace(/"/g, '""')}"`,
      p.pharmacopeia || 'USP',
      `"${p.dosageForm.replace(/"/g, '""')}"`,
      `"${p.packaging.replace(/"/g, '""')}"`,
      p.shelfLife || '24 Months',
      `"${(p.storage || '').replace(/"/g, '""')}"`,
      p.dossierAvailable ? 'Available (CTD Mod 1-5)' : 'In Preparation',
      `"${(p.exportMarkets || []).join('; ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ADIVARI_PHARMA_EXPORT_CATALOGUE_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Product catalogue downloaded successfully!');
  };

  const activeReg = targetRegions[selectedRegion];

  return (
    <section id="digital-catalogue" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-20">
      <span id="export" className="scroll-mt-24 pointer-events-none opacity-0" />
      <div className="bg-white rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 lg:p-12 border border-[#DFDCD4] shadow-sm space-y-10">
        
        {/* Section Header: Human, Clear & Professional */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#EFECE5]">
          <div className="space-y-3 max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3EC] border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#4A463B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
              <Globe className="w-3.5 h-3.5 text-[#4A463B]" />
              <span>GLOBAL EXPORT &amp; SUPPLY DESK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">
              Supplying Quality Formulations to <br className="hidden sm:inline" />
              <span className="text-[#3B5244]">Hospitals &amp; Distributors Worldwide</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#5D594F] leading-relaxed max-w-2xl">
              We partner with licensed importers, hospital procurement groups, and pharmaceutical distributors across more than 25 countries—providing complete registration support, batch-wise testing certificates, and dependable temperature-controlled shipping.
            </p>
          </div>

          {/* Quick Action Buttons for Overseas Buyers */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleDownloadCatalogue}
              className="btn-sensiq-white py-3 px-5 text-xs font-bold flex items-center justify-center gap-2 border border-[#D5CFC2] hover:border-[#141414] transition-all"
              title="Download live product portfolio spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-[#D96B43]" />
              <span>Download Product List (.CSV)</span>
            </button>

            <button
              onClick={() => onOpenRfq()}
              className="btn-sensiq-black py-3 px-6 text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Request Proforma &amp; Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Core Value Pillars for Foreign Buyers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Regulatory & MOH Support */}
          <div className="p-6 rounded-[28px] bg-[#FAF8F4] border border-[#E4DDD0] space-y-3.5 text-left flex flex-col justify-between hover:border-[#3B5244]/40 transition-colors">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EBE4D5] text-[#344B3D] flex items-center justify-center">
                <FileCheck2 className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-bold text-[#141414] text-base font-['Plus_Jakarta_Sans']">
                Registration &amp; Regulatory Support
              </h3>
              <p className="text-xs text-[#5D594F] leading-relaxed">
                We provide complete technical documentation in CTD and ACTD formats to ensure smooth approval with your local Ministry of Health.
              </p>
              <ul className="space-y-1.5 text-[11px] text-[#4A463B] font-medium pt-1">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>CTD Modules 1 to 5 available</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Certificate of Pharmaceutical Product (COPP)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Real-time stability data for warm climates</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenRfq()}
              className="text-xs font-bold text-[#D96B43] hover:text-[#B5522C] inline-flex items-center gap-1 pt-2"
            >
              <span>Inquire about dossier files</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 2: Batch Testing & Quality */}
          <div className="p-6 rounded-[28px] bg-[#FAF8F4] border border-[#E4DDD0] space-y-3.5 text-left flex flex-col justify-between hover:border-[#3B5244]/40 transition-colors">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EBE4D5] text-[#344B3D] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-bold text-[#141414] text-base font-['Plus_Jakarta_Sans']">
                Tested to International Standards
              </h3>
              <p className="text-xs text-[#5D594F] leading-relaxed">
                Every commercial batch is tested in-house and accompanied by an official Certificate of Analysis (COA) complying with USP, BP, or IP.
              </p>
              <ul className="space-y-1.5 text-[11px] text-[#4A463B] font-medium pt-1">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Full analytical assay &amp; purity checks</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Sterility and bacterial endotoxin testing</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Batch-to-batch release documentation</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenRfq()}
              className="text-xs font-bold text-[#D96B43] hover:text-[#B5522C] inline-flex items-center gap-1 pt-2"
            >
              <span>Request sample COA specifications</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 3: Packaging & Custom Branding */}
          <div className="p-6 rounded-[28px] bg-[#FAF8F4] border border-[#E4DDD0] space-y-3.5 text-left flex flex-col justify-between hover:border-[#3B5244]/40 transition-colors">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EBE4D5] text-[#344B3D] flex items-center justify-center">
                <Boxes className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-bold text-[#141414] text-base font-['Plus_Jakarta_Sans']">
                Custom Packaging &amp; Private Label
              </h3>
              <p className="text-xs text-[#5D594F] leading-relaxed">
                We produce formulations under your brand name or supply our standard hospital packs with local language labeling and barcode serialization.
              </p>
              <ul className="space-y-1.5 text-[11px] text-[#4A463B] font-medium pt-1">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Multilingual cartons (Spanish, Arabic, French)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Barcoding &amp; 2D DataMatrix serialization</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Flexible batch sizes &amp; hospital pack formats</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenRfq()}
              className="text-xs font-bold text-[#D96B43] hover:text-[#B5522C] inline-flex items-center gap-1 pt-2"
            >
              <span>Discuss private label manufacturing</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Regional Markets & Export Experience */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-[#FAF9F5] border border-[#DFDCD4] space-y-6 text-left">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E7E2D6]">
            <div>
              <h3 className="text-lg font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                Export Markets &amp; Regional Support
              </h3>
              <p className="text-xs text-[#6F6A5E]">
                Select your region to see our documentation readiness, packaging capabilities, and shipping routes.
              </p>
            </div>

            <span className="text-[11px] text-[#3B5244] bg-white px-3 py-1 rounded-full border border-[#DFDCD4] w-fit font-bold">
              Fast Response Within 24 Hours
            </span>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {targetRegions.map((region, idx) => {
              const isSelected = selectedRegion === idx;
              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(idx)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isSelected
                      ? 'bg-[#141414] text-white shadow-sm'
                      : 'bg-white text-[#58554D] hover:bg-[#EAE6DC] border border-[#DFDCD4]'
                  }`}
                >
                  {region.name}
                </button>
              );
            })}
          </div>

          {/* Active Region Display Card */}
          <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-[#DFDCD4] space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E8EFEA] text-[#2F5A3E] border border-[#CFE1D5] mb-1.5">
                  {activeReg.badge}
                </div>
                <h4 className="text-xl font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                  {activeReg.name}
                </h4>
                <p className="text-xs text-[#666255] mt-0.5">
                  Key Countries: <strong>{activeReg.countries}</strong>
                </p>
              </div>

              <button
                onClick={() => onOpenRfq()}
                className="btn-sensiq-black text-xs py-2.5 px-5 font-bold shrink-0 inline-flex items-center gap-1.5"
              >
                <span>Request Pricing for {activeReg.shortCode}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-[#4A463B] leading-relaxed">
              {activeReg.description}
            </p>

            {/* Clear, Human Practical Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#EFECE5] text-xs">
              <div className="bg-[#FAF8F4] p-3.5 rounded-xl border border-[#E9E3D6]">
                <p className="font-mono text-[10px] text-[#7A7569] uppercase font-bold">Registration Dossier</p>
                <p className="font-bold text-[#141414] mt-1">{activeReg.dossier}</p>
              </div>

              <div className="bg-[#FAF8F4] p-3.5 rounded-xl border border-[#E9E3D6]">
                <p className="font-mono text-[10px] text-[#7A7569] uppercase font-bold">Packaging &amp; Language</p>
                <p className="font-bold text-[#141414] mt-1">{activeReg.packaging}</p>
              </div>

              <div className="bg-[#FAF8F4] p-3.5 rounded-xl border border-[#E9E3D6]">
                <p className="font-mono text-[10px] text-[#7A7569] uppercase font-bold">Shipping &amp; Logistics</p>
                <p className="font-bold text-[#141414] mt-1">{activeReg.shipping}</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Step Process: Straightforward & Human */}
        <div className="space-y-6 text-left">
          <div className="pb-2 border-b border-[#EFECE5]">
            <h3 className="text-lg font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
              How We Work With Global Partners
            </h3>
            <p className="text-xs text-[#6F6A5E]">
              A transparent, straightforward process from initial formulation selection to delivery at your port.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E6E0D3] space-y-2">
              <span className="text-xs font-mono font-bold text-[#D96B43]">STEP 01</span>
              <h4 className="font-bold text-[#141414] text-xs font-['Plus_Jakarta_Sans']">
                Product &amp; Volume Selection
              </h4>
              <p className="text-[11px] text-[#615D52] leading-relaxed">
                Choose the required formulations, strengths, packaging preferences, and estimated quantities from our catalogue.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E6E0D3] space-y-2">
              <span className="text-xs font-mono font-bold text-[#D96B43]">STEP 02</span>
              <h4 className="font-bold text-[#141414] text-xs font-['Plus_Jakarta_Sans']">
                Quotation &amp; Documentation
              </h4>
              <p className="text-[11px] text-[#615D52] leading-relaxed">
                We share an official proforma invoice (CIF or FOB), sample Certificates of Analysis, and registration dossier summaries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E6E0D3] space-y-2">
              <span className="text-xs font-mono font-bold text-[#D96B43]">STEP 03</span>
              <h4 className="font-bold text-[#141414] text-xs font-['Plus_Jakarta_Sans']">
                Registration &amp; Approvals
              </h4>
              <p className="text-[11px] text-[#615D52] leading-relaxed">
                Submit the technical documentation to your health authority with our active support, then confirm production schedules.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E6E0D3] space-y-2">
              <span className="text-xs font-mono font-bold text-[#D96B43]">STEP 04</span>
              <h4 className="font-bold text-[#141414] text-xs font-['Plus_Jakarta_Sans']">
                Production &amp; Global Dispatch
              </h4>
              <p className="text-[11px] text-[#615D52] leading-relaxed">
                Your order is manufactured under WHO-GMP conditions, quality-inspected, and dispatched with full temperature monitoring.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
