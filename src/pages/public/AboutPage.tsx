import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Globe2, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FlaskConical, 
  FileText, 
  Microscope, 
  Clock, 
  HeartHandshake,
  Layers,
  Thermometer,
  Truck,
  MapPin,
  Mail,
  Phone,
  FileCheck2,
  Receipt
} from 'lucide-react';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import { RfqModal } from '../../components/public/RfqModal';
import { StickyContactWidget } from '../../components/public/StickyContactWidget';
import { COMPANY_DETAILS } from '../../lib/companyDetails';

export const AboutPage: React.FC = () => {
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [rfqProductId, setRfqProductId] = useState<string | undefined>(undefined);

  const handleOpenRfq = (productId?: string) => {
    setRfqProductId(productId);
    setIsRfqOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#ECEAE4] text-[#141414] flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar onOpenRfq={handleOpenRfq} />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-xs text-[#7A7569]">
            <Link to="/" className="hover:text-[#141414] transition-colors font-medium">Home</Link>
            <span>/</span>
            <span className="text-[#141414] font-semibold">About Us</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DFDCD4] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E2CA40] animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#58554D]">
                WHO-GMP &amp; ISO 9001:2015 ACCREDITED • MUMBAI, INDIA
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#141414] font-['Plus_Jakarta_Sans'] leading-[1.12]">
              Sterile Precision in Formulation &amp; Global Healthcare Delivery
            </h1>

            <p className="text-sm sm:text-base text-[#58554D] leading-relaxed max-w-2xl mx-auto">
              <strong>ADIVARI PHARMACEUTICALS PRIVATE LIMITED</strong> is an established pharmaceutical enterprise committed to manufacturing and exporting premier quality critical care injectables, lyophilized antibiotics, and life-saving formulations to healthcare systems across 25+ countries worldwide.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
              <button
                onClick={() => handleOpenRfq()}
                className="btn-sensiq-black justify-center py-3 sm:py-3.5 text-xs font-semibold"
              >
                <span>Request Commercial Quotation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                to="/#catalog"
                className="btn-sensiq-white justify-center py-3 sm:py-3.5 text-xs font-semibold"
              >
                <span>Explore Products Catalog</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Key Metrics Strip (4 Pillars) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#141414] font-mono">25+</div>
              <div className="text-xs font-bold text-[#141414] font-['Plus_Jakarta_Sans']">Export Destinations</div>
              <div className="text-[11px] text-[#7A7569]">LATAM, MENA, Africa, CIS &amp; Asia</div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#141414] font-mono">100+</div>
              <div className="text-xs font-bold text-[#141414] font-['Plus_Jakarta_Sans']">Commercial Formulations</div>
              <div className="text-[11px] text-[#7A7569]">Lyophilized &amp; Sterile Liquid Vials</div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#141414] font-mono">100%</div>
              <div className="text-xs font-bold text-[#141414] font-['Plus_Jakarta_Sans']">CTD Dossier Readiness</div>
              <div className="text-[11px] text-[#7A7569]">Modules 1–5 for Fast Approvals</div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#141414] font-mono">Class A</div>
              <div className="text-xs font-bold text-[#141414] font-['Plus_Jakarta_Sans']">Cleanroom Grade 100</div>
              <div className="text-[11px] text-[#7A7569]">Zero-particulate Aseptic Filling</div>
            </div>
          </div>
        </section>

        {/* Corporate Overview & Manufacturing Capabilities */}
        <section className="py-12 bg-white border-y border-[#DFDCD4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Visual Facility Showcase Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-[32px] overflow-hidden border border-[#DFDCD4] bg-[#FAF9F5] shadow-md group">
                  <img
                    src="/images/facility-showcase.jpg"
                    alt="Adivari Sterile Manufacturing Facility"
                    className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E2CA40]">
                        Advanced Lyophilization Line
                      </span>
                      <h4 className="text-base font-bold font-['Plus_Jakarta_Sans']">
                        Sterile Formulation Cleanroom Complex
                      </h4>
                      <p className="text-xs text-white/80">
                        Automated vial washing, depyrogenation tunnel &amp; freeze-drying
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0" />
                  <p className="text-xs text-[#58554D] leading-tight">
                    Strict conformance with <strong>USP, BP, and IP</strong> pharmacopoeial monographs and international WHO release standards.
                  </p>
                </div>
              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#58554D]">
                  <Building2 className="w-3.5 h-3.5 text-[#141414]" />
                  <span>Corporate Legacy &amp; Infrastructure</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141414] tracking-tight font-['Plus_Jakarta_Sans']">
                  Engineering Pure, Safe, and Affordable Therapeutics for the Developing World
                </h2>

                <p className="text-sm text-[#58554D] leading-relaxed">
                  Founded with a clear mandate to bridge global healthcare disparities, <strong>ADIVARI PHARMACEUTICALS PRIVATE LIMITED</strong> has established robust manufacturing networks compliant with stringent World Health Organization Good Manufacturing Practices (WHO-GMP). Headquartered in Mumbai, India's premier commercial and logistics gateway, we specialize in high-potency sterile injectables, broad-spectrum anti-infectives, lyophilized formulations, and vital hospital products.
                </p>

                <p className="text-sm text-[#58554D] leading-relaxed">
                  Our qualified manufacturing lines are engineered with computerized isolator technology, class 100 laminar airflow units, automated depyrogenation tunnels, and industrial freeze-dryers. This guarantees that heat-sensitive molecules like <strong>Tigecycline, Meropenem, and Esomeprazole</strong> achieve peak thermodynamic stability, ensuring reliable shelf life even in tropical ICH Climatic Zone IVb conditions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-[#58554D]">
                    <CheckCircle2 className="w-4 h-4 text-[#141414] shrink-0 mt-0.5" />
                    <span><strong>Full CTD Dossiers:</strong> Complete Module 1–5 documentation for accelerated Ministry of Health registrations.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#58554D]">
                    <CheckCircle2 className="w-4 h-4 text-[#141414] shrink-0 mt-0.5" />
                    <span><strong>Multilingual Packaging:</strong> Secondary packaging customized in Spanish, French, Arabic, and English.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#58554D]">
                    <CheckCircle2 className="w-4 h-4 text-[#141414] shrink-0 mt-0.5" />
                    <span><strong>Cold-Chain Assurance:</strong> Continuous data logger temperature verification from plant to seaport/airport.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#58554D]">
                    <CheckCircle2 className="w-4 h-4 text-[#141414] shrink-0 mt-0.5" />
                    <span><strong>Tender &amp; OEM Support:</strong> Private label contract manufacturing for hospital chains and foreign ministries.</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Corporate Values (4 Cards) */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#8A857A]">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight font-['Plus_Jakarta_Sans']">
              The Four Pillars That Drive Our Scientific Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                Sterile Formulation Rigor
              </h3>
              <p className="text-xs text-[#635F55] leading-relaxed">
                Zero-compromise bacterial endotoxin testing, particle filtration, and aseptic cleanroom discipline matching the most stringent global standards.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                Regulatory Integrity
              </h3>
              <p className="text-xs text-[#635F55] leading-relaxed">
                Fully validated stability studies under real-time accelerated protocols, ready CTD dossiers, Certificate of Analysis (COA), and GMP certifications.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                Global Accessibility
              </h3>
              <p className="text-xs text-[#635F55] leading-relaxed">
                Empowering healthcare providers across developing nations with affordable, bio-equivalent life-saving medications without supply chain bottlenecks.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                Partnership Longevity
              </h3>
              <p className="text-xs text-[#635F55] leading-relaxed">
                We view international importers and distributors as long-term collaborators, providing dedicated country-exclusive commercial arrangements.
              </p>
            </div>

          </div>
        </section>

        {/* Global Logistics & Trade Gateway Section */}
        <section className="py-14 bg-[#4A463B] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E2CA40]">
                MUMBAI LOGISTICS ADVANTAGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
                Seamless Export Operations from India's Premier Shipping Corridor
              </h2>
              <p className="text-xs sm:text-sm text-[#CBC7BB] leading-relaxed">
                Strategically linked with India's principal maritime gateway, Adivari Pharmaceuticals leverages direct proximity to Jawaharlal Nehru Port Trust (JNPT Nhava Sheva) and Chhatrapati Shivaji Maharaj International Airport (BOM) for expedited dispatch under verified cold-chain conditions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <Truck className="w-5 h-5 text-[#E2CA40]" />
                <h4 className="font-bold text-white text-sm">Ocean Freight Dispatch</h4>
                <p className="text-[#CBC7BB]">
                  Refrigerated container (Reefer) bookings with active temperature loggers via JNPT Seaport for bulk pharmaceutical shipments.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <Thermometer className="w-5 h-5 text-[#E2CA40]" />
                <h4 className="font-bold text-white text-sm">Air Freight Express</h4>
                <p className="text-[#CBC7BB]">
                  Temperature-controlled air cargo palletizing via Mumbai BOM Airport for emergency hospital supplies and fast delivery.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <Award className="w-5 h-5 text-[#E2CA40]" />
                <h4 className="font-bold text-white text-sm">Custom IncoTerms Delivery</h4>
                <p className="text-[#CBC7BB]">
                  Flexible trading arrangements including CIF (Destination Port), FOB (Mumbai), CFR, and EXW with complete consular legalization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Identification & Statutory Governance Credentials */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#58554D]">
                <FileCheck2 className="w-3.5 h-3.5 text-[#141414]" />
                <span>Statutory Verification &amp; Corporate Identity</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141414] tracking-tight font-['Plus_Jakarta_Sans']">
                Institutional Transparency &amp; Government Licensing
              </h2>
              <p className="text-xs sm:text-sm text-[#58554D] leading-relaxed">
                Full statutory credentials, corporate registration, tax identification, and drug authority licensing details for <strong>{COMPANY_DETAILS.legalName}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Incorporation & CIN */}
              <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#8A857A] uppercase font-bold tracking-wider">
                    Corporate Identity
                  </span>
                  <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                    Company Registration
                  </h3>
                </div>
                <div className="space-y-2 text-xs pt-1 border-t border-[#EFECE5]">
                  <div>
                    <span className="text-[10px] text-[#7A7569] block font-mono">CIN NUMBER:</span>
                    <span className="font-mono font-bold text-[#141414] text-xs">{COMPANY_DETAILS.cin}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A7569] block font-mono">LEGAL ENTITY:</span>
                    <span className="font-semibold text-[#141414] text-[11px]">{COMPANY_DETAILS.legalName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A7569] block font-mono">INCORPORATION JURISDICTION:</span>
                    <span className="text-[#58554D] text-[11px]">RoC Mumbai / Maharashtra, India</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Drug Licences */}
              <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                  <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#8A857A] uppercase font-bold tracking-wider">
                    Drug Control Authority
                  </span>
                  <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                    Drug Licences (FDA MH)
                  </h3>
                </div>
                <div className="space-y-2 text-xs pt-1 border-t border-[#EFECE5]">
                  <div>
                    <span className="text-[10px] text-[#7A7569] block font-mono">FORM 20B LICENCE:</span>
                    <span className="font-mono font-bold text-[#141414] text-xs">20B-647243</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A7569] block font-mono">FORM 21B LICENCE:</span>
                    <span className="font-mono font-bold text-[#141414] text-xs">21B-647244</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A7569] block font-mono">REGULATORY VALIDITY:</span>
                    <span className="font-mono font-bold text-[#2E7D32] text-xs bg-[#E7F8ED] px-2 py-0.5 rounded-full inline-block border border-[#BDE8CB]">
                      Valid Up To 07/09/2031
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Taxation & Fiscal Registrations */}
              <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                  <Receipt className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#8A857A] uppercase font-bold tracking-wider">
                    Fiscal &amp; Tax Identifiers
                  </span>
                  <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                    Taxation &amp; Commerce
                  </h3>
                </div>
                <div className="space-y-2 text-xs pt-1 border-t border-[#EFECE5]">
                  <div>
                    <span className="text-[10px] text-[#7A7569] block font-mono">GSTIN IDENTIFIER:</span>
                    <span className="font-mono font-bold text-[#141414] text-xs">{COMPANY_DETAILS.gstin}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-[#7A7569] block font-mono">PAN:</span>
                      <span className="font-mono font-bold text-[#141414] text-xs">{COMPANY_DETAILS.pan}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7A7569] block font-mono">TAN:</span>
                      <span className="font-mono font-bold text-[#141414] text-xs">{COMPANY_DETAILS.tan}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A7569] block font-mono">OFFICIAL CORRESPONDENCE:</span>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="font-semibold text-[#141414] hover:underline text-xs">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 4: Registered Office Address */}
              <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                  <MapPin className="w-5 h-5 text-[#E2CA40]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#8A857A] uppercase font-bold tracking-wider">
                    Official Headquarters
                  </span>
                  <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                    Registered Office
                  </h3>
                </div>
                <div className="space-y-2 text-xs pt-1 border-t border-[#EFECE5]">
                  <p className="text-[#58554D] leading-snug text-xs">
                    {COMPANY_DETAILS.registeredOffice.full}
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-xs">
                    <Phone className="w-3.5 h-3.5 text-[#141414] shrink-0" />
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneRaw}`} className="font-semibold text-[#141414] hover:underline">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Call to Action Box */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[40px] p-8 sm:p-12 border border-[#DFDCD4] shadow-sm text-center space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
              Ready to Expand Your Pharmaceutical Supply Line?
            </h3>
            <p className="text-xs sm:text-sm text-[#58554D] max-w-xl mx-auto leading-relaxed">
              Connect with our international trade desk today to receive proforma export quotes, product stability dossiers, and sample analysis certificates for your territory.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleOpenRfq()}
                className="btn-sensiq-black"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                to="/careers"
                className="btn-sensiq-white"
              >
                <span>Explore Careers at Adivari</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer onOpenRfq={handleOpenRfq} />

      {/* Interactive Quotation Modal */}
      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        preSelectedProductId={rfqProductId}
      />

      {/* Refined Executive Sticky Contact Hub (Calling + WhatsApp) */}
      <StickyContactWidget />
    </div>
  );
};

export default AboutPage;
