import React from 'react';
import { 
  Building2, 
  FlaskConical, 
  ShieldCheck, 
  Users, 
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-slate-950/40 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Facility Showcase */}
          <div className="lg:col-span-5 relative space-y-4">
            <div className="glass-panel p-6 rounded-2xl border border-sky-500/30 space-y-4 relative overflow-hidden">
              <div className="w-full h-48 rounded-xl bg-gradient-to-tr from-sky-950 via-slate-900 to-indigo-950 border border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-2">
                <Building2 className="w-12 h-12 text-sky-400" />
                <h4 className="text-lg font-bold text-white font-['Outfit']">Sterile Formulation Complex</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Automated vial washing, depyrogenation tunnel, aseptic filling & lyophilization units
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">Quality Head:</span>
                  <span className="text-white font-semibold">Ex-Multinational QA Leads</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">Stability Chambers:</span>
                  <span className="text-white font-semibold">ICH Climatic Zones I-IVb</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/40 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-300">
                100% compliant with International Pharmacopoeia (USP, BP, IP) release specifications.
              </p>
            </div>
          </div>

          {/* Right Column: Mission & Corporate Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glow-pill">
              <Users className="w-4 h-4 text-sky-400" />
              <span>About Adivari Pharmaceuticals</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pioneering Life-Saving Therapeutics with <br />
              <span className="gradient-text">Uncompromised Sterile Precision</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Founded on the pillars of scientific precision and international compliance, <strong>Adivari Pharmaceuticals</strong> specializes in critical care injectables, anti-infectives, and specialized therapeutic formulations. Our mission is to bridge global healthcare gaps by manufacturing high-quality, cost-effective injectable solutions that withstand rigorous regulatory scrutiny across foreign markets.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Dedicated Lyophilization Capacity:</strong> Engineered for heat-labile molecules like Tigecycline and Meropenem to guarantee long shelf stability in high-temperature export regions (Zone IVb).
                </span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Contract Manufacturing & Private Labeling:</strong> Supporting foreign distributors with custom multi-language primary and secondary packaging (Spanish, French, Arabic, English).
                </span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Complete Regulatory Dossier Archival:</strong> Pre-compiled technical dossiers in CTD format to fast-track your local registration process by up to 6 months.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
