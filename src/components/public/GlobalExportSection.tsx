import React from 'react';
import { 
  Globe2, 
  Plane, 
  Ship, 
  ThermometerSnowflake, 
  FileCheck2, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Boxes,
  ShieldCheck,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { ColdChainRouteMotion } from '../motion/ColdChainRouteMotion';

interface GlobalExportSectionProps {
  onOpenRfq: () => void;
}

export const GlobalExportSection: React.FC<GlobalExportSectionProps> = ({ onOpenRfq }) => {
  const exportCapabilities = [
    {
      name: 'Latin America (LATAM)',
      targetCountries: 'Mexico, Brazil, Colombia, Peru, Chile',
      focus: 'Hospital Formularies & Importers',
      badge: 'Spanish Text Packaging',
      desc: 'Technical dossier support in CTD format, stability studies under tropical Zone IVb conditions, and bilingual labeling capabilities.'
    },
    {
      name: 'Middle East & Gulf (GCC)',
      targetCountries: 'UAE, Saudi Arabia, Oman, Kuwait, Qatar',
      focus: 'Institutional Health Inquiries',
      badge: 'Arabic / English Labeling',
      desc: 'Expedited air cargo dispatch via Mumbai International Airport (BOM) with cold-chain monitoring for critical care parenterals.'
    },
    {
      name: 'Southeast Asia (ASEAN)',
      targetCountries: 'Vietnam, Philippines, Malaysia, Thailand, Indonesia',
      focus: 'Distributor Partnerships',
      badge: 'Zone IVb Validated',
      desc: 'Tested formulations with real-time stability at 30°C / 75% RH, complete Module 1-5 dossiers, and batch-wise analytical COAs.'
    },
    {
      name: 'Africa (East, West & Southern)',
      targetCountries: 'Kenya, Nigeria, Ghana, Tanzania, South Africa',
      focus: 'Central Medical Supplies & Procurement',
      badge: 'Essential Antibiotics',
      desc: 'Bulk supply capability for critical care injectable antibiotics (Tigecycline, Meropenem) and emergency anticoagulants (Heparin Sodium).'
    },
    {
      name: 'Central Asia & CIS',
      targetCountries: 'Uzbekistan, Kazakhstan, Azerbaijan, Georgia',
      focus: 'Wholesale Import Agencies',
      badge: 'Russian Text Capabilities',
      desc: 'Complete technical dossiers, Certificate of Pharmaceutical Product (COPP) assistance, and customized secondary packaging.'
    },
    {
      name: 'Contract Manufacturing (OEM)',
      targetCountries: 'International Brand Owners & Distributors',
      focus: 'Third-Party Production',
      badge: 'Private Labeling',
      desc: 'Custom formulation and filling under your brand, including custom artwork, vial crimps, tamper-evident seals, and GS1 2D DataMatrix.'
    }
  ];

  return (
    <section id="export" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-[40px] p-6 sm:p-10 border border-[#DFDCD4] shadow-sm space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EFECE5]">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EC] border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#4A463B] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
              <Globe2 className="w-3.5 h-3.5 text-[#4A463B]" />
              <span>International Trade &amp; Manufacturing Division</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
              Global Pharmaceutical Export Capabilities &amp; <br />
              <span className="text-[#4A463B]">International B2B Supply from India</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#635F55] leading-relaxed">
              Adivari Pharmaceuticals offers export-oriented sterile manufacturing compliant with WHO-GMP guidelines. We assist international pharmaceutical distributors, hospital groups, and licensed importers with complete regulatory dossiers, verified analytical batch releases, and temperature-controlled logistics.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onOpenRfq}
              className="btn-sensiq-black text-xs py-2.5 px-6 font-medium w-full sm:w-auto"
            >
              <span>Submit Export Quotation Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Logistics & Quality Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-5 rounded-[24px] bg-[#FAF9F5] border border-[#DFDCD4] space-y-3 hover:border-[#141414]/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#F0EDE5] text-[#141414] flex items-center justify-center">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#141414] text-sm font-['Plus_Jakarta_Sans']">
              Cold Chain Management
            </h3>
            <p className="text-xs text-[#5E6D64] leading-relaxed">
              Standard operating procedures for +2°C to +8°C biologics and controlled room temperature (15°C–25°C) injectables with calibrated USB data-loggers.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#3B5244]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#6E8E7C]" />
              <span>Calibrated Thermal Shippers</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EAE4D7] space-y-3 hover:border-[#3B5244]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#EBF2ED] text-[#3B5244] flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1C221E] text-sm font-['Outfit']">
              Air Cargo Hub (Mumbai BOM)
            </h3>
            <p className="text-xs text-[#5E6D64] leading-relaxed">
              Proximity to Chhatrapati Shivaji Maharaj International Airport (BOM) allows expedited dispatch of sensitive hospital antibiotic consignments.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#3B5244]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#6E8E7C]" />
              <span>Direct Airport Terminal Access</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EAE4D7] space-y-3 hover:border-[#3B5244]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#EBF2ED] text-[#3B5244] flex items-center justify-center">
              <Ship className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1C221E] text-sm font-['Outfit']">
              Ocean Freight (JNPT Seaport)
            </h3>
            <p className="text-xs text-[#5E6D64] leading-relaxed">
              Full container load (FCL) and consolidated (LCL) reefer sea freight through Jawaharlal Nehru Port (Nhava Sheva) for high-volume commercial orders.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#3B5244]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#6E8E7C]" />
              <span>Standard Incoterms: CIF / FOB / CFR</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EAE4D7] space-y-3 hover:border-[#3B5244]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#EBF2ED] text-[#3B5244] flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1C221E] text-sm font-['Outfit']">
              CTD Regulatory Dossiers
            </h3>
            <p className="text-xs text-[#5E6D64] leading-relaxed">
              Pre-compiled technical dossiers in CTD format (Modules 1 through 5), Certificate of Pharmaceutical Product (COPP), and stability data.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#3B5244]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#6E8E7C]" />
              <span>CTD Modules 1 to 5 Prepared</span>
            </div>
          </div>

        </div>

        {/* Interactive Cold-Chain Motion Simulator */}
        <ColdChainRouteMotion />

        {/* Target Export Capabilities Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#EFECE5]">
            <div>
              <h3 className="text-lg font-bold text-[#1C221E] font-['Outfit']">
                Target International Regions &amp; Packaging Capabilities
              </h3>
              <p className="text-xs text-[#6F7D74]">
                Supporting authorized pharmaceutical distributors, hospital groups, and licensed medical importers.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#EBF2ED] border border-[#D5E3D9] text-[#3B5244] font-semibold self-start sm:self-auto">
              Export Desk GMT +5:30
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exportCapabilities.map((region, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D7] hover:border-[#3B5244]/40 hover:bg-white transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-[#1C221E] font-['Outfit'] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D96B43]" />
                    {region.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5EEE8] text-[#344D3D] font-bold border border-[#CFDFD4]">
                    {region.badge}
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#3B5244]">
                  {region.targetCountries}
                </p>

                <p className="text-[11px] text-[#69796F] leading-relaxed">
                  {region.desc}
                </p>

                <div className="pt-1 flex items-center justify-between text-[10px] text-[#839188] border-t border-[#EAE4D7]">
                  <span>Scope: <strong className="text-[#1C221E]">{region.focus}</strong></span>
                  <span className="text-[#3B5244] font-semibold">Documentation Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Third-Party Contract Manufacturing (OEM/ODM) Banner */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-[#4A463B] text-white space-y-4 shadow-lg border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-mono uppercase font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
                <Boxes className="w-3.5 h-3.5 text-[#E2CA40]" />
                <span>Third-Party &amp; Contract Manufacturing (OEM/ODM)</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-white tracking-tight">
                Contract Manufacturing &amp; Private Label Formulations
              </h3>

              <p className="text-xs sm:text-sm text-[#DFDBD1] leading-relaxed">
                We provide contract manufacturing services for international brand owners, hospital networks, and pharmaceutical marketing entities. Leverage our Grade A cleanrooms, dedicated lyophilization lines, and multi-language secondary packaging (English, Spanish, French, Arabic, Russian) with GS1 2D DataMatrix serialization.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono font-medium text-white border border-white/10">
                  ✓ Custom Artwork &amp; Cartons
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono font-medium text-white border border-white/10">
                  ✓ GS1 2D DataMatrix Serialization
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono font-medium text-white border border-white/10">
                  ✓ Zone IVb Stability (30°C/75% RH)
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono font-medium text-white border border-white/10">
                  ✓ Analytical COA Released per Batch
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={onOpenRfq}
                className="btn-sensiq-black py-3 px-6 text-xs font-medium text-center justify-center w-full shadow-lg"
              >
                Inquire for Contract Manufacturing
              </button>
              <a
                href="#contact"
                className="btn-sensiq-white py-3 px-6 text-xs font-medium text-center justify-center w-full bg-white text-[#141414] hover:bg-[#FAF8F3]"
              >
                Contact Export Desk
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
