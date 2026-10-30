import React from 'react';

export const TrustBar: React.FC = () => {
  const features = [
    {
      code: 'QUALITY',
      title: 'International Standards',
      desc: 'Formulations manufactured to USP, BP, and IP specifications with batch-wise testing.'
    },
    {
      code: 'MANUFACTURING',
      title: 'WHO-GMP Certified Plant',
      desc: 'Modern sterile injectable facilities with automated filling and freeze-drying lines.'
    },
    {
      code: 'REGULATORY',
      title: 'Full CTD Dossiers & COPP',
      desc: 'Ready technical files and health authority certificates for fast registration overseas.'
    },
    {
      code: 'GLOBAL SUPPLY',
      title: 'Temperature-Safe Shipping',
      desc: 'Continuous cold-chain and ambient freight dispatched by air and sea to global ports.'
    }
  ];

  return (
    <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-[28px] border border-[#DFDCD4] shadow-xs overflow-hidden">
        
        {/* Segmented Top Indicator Line */}
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
