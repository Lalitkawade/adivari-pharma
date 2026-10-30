import React from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  FlaskRound, 
  Microscope, 
  Award, 
  CheckCircle,
  Building,
  Sparkles
} from 'lucide-react';

export const ComplianceSection: React.FC = () => {
  return (
    <section id="compliance" className="py-24 relative bg-slate-950/60 border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="glow-pill mx-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>International Regulatory Rigor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            WHO-GMP Certified & <br />
            <span className="gradient-text">Export Regulatory Compliance</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Every vial produced at Adivari Pharmaceuticals undergoes stringent validation across state-of-the-art sterile formulation suites. We adhere to current Good Manufacturing Practices (cGMP) recognized worldwide.
          </p>
        </div>

        {/* 4 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-sky-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">Grade A Cleanrooms</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sterile core with positive pressure cascades, HEPA filtration (99.997%), and continuous airborne particle monitoring ensuring zero bioburden.
            </p>
            <div className="pt-2 text-xs text-sky-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> ISO 14644-1 Compliant
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">CTD / eCTD Dossiers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete Module 1 to 5 regulatory documentation ready for rapid submission to foreign Ministry of Health (MOH) and FDA authorities.
            </p>
            <div className="pt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Modules 1–5 Included
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <FlaskRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">Lyophilization Purity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated CIP/SIP freeze-drying cycles for sensitive antibiotics (Tigecycline, Meropenem), guaranteeing instantaneous reconstitution.
            </p>
            <div className="pt-2 text-xs text-purple-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Uniform Cake Structure
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">Endotoxin & Sterility</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% batch testing for bacterial endotoxins (LAL test) and 14-day membrane filtration sterility according to USP & EP monographs.
            </p>
            <div className="pt-2 text-xs text-amber-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Pyrogen-Free Assured
            </div>
          </div>

        </div>

        {/* Export Documentation Strip */}
        <div className="glass-panel-glow p-8 rounded-2xl border border-sky-500/30 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Need Certificate of Pharmaceutical Product (COPP) or Free Sale Certificate?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our regulatory affairs team prepares legalized, apostilled export certificates tailored to your country's health authority requirements.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 font-medium">
              COPP (WHO Format)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 font-medium">
              Free Sale Certificate (FSC)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 font-medium">
              Zone IVb Stability (30°C/75% RH)
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
