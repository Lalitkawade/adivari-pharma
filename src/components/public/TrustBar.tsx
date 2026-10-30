import React from 'react';
import { 
  FlaskConical, 
  ShieldCheck, 
  FileCheck2, 
  ThermometerSnowflake 
} from 'lucide-react';

export const TrustBar: React.FC = () => {
  const features = [
    {
      code: 'PHARMACOPOEIA',
      title: 'Compendial Grade APIs',
      desc: 'Active pharmaceutical ingredients complying with USP, BP, EP, and IP standards.'
    },
    {
      code: 'CLEANROOM',
      title: 'Grade A Aseptic Suites',
      desc: 'ISO Class 5 sterile filling lines with automated CIP/SIP freeze-drying.'
    },
    {
      code: 'REGULATORY',
      title: 'CTD Modules 1 to 5',
      desc: 'Pre-compiled technical dossiers ready for international regulatory submissions.'
    },
    {
      code: 'LOGISTICS',
      title: 'Cold-Chain Freight',
      desc: 'Validated +2°C to +8°C and CRT packaging with calibrated digital data-loggers.'
    }
  ];

  return (
    <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-[28px] border border-[#DFDCD4] shadow-xs overflow-hidden">
        
        {/* Segmented Top Indicator Line (Matching reference: yellow active segment + subtle gray line) */}
        <div className="grid grid-cols-4 w-full">
          <div className="border-t-2 border-[#E2CA40]" />
          <div className="border-t-2 border-[#E2CA40]" />
          <div className="border-t-2 border-[#E2CA40]" />
          <div className="border-t-2 border-[#DFDCD4]" />
        </div>

        <div className="p-4 sm:p-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((item, idx) => (
              <div key={idx} className="space-y-1 text-left border-l border-[#EFECE5] pl-3 sm:pl-4 first:border-l-0 first:pl-0 sm:first:border-l sm:first:pl-4 lg:first:border-l-0 lg:first:pl-0">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#8A857A] tracking-widest block uppercase">
                  {item.code}
                </span>
                <h4 className="font-bold text-[#141414] text-xs sm:text-sm tracking-tight font-['Plus_Jakarta_Sans']">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#635F55] leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
