import React from 'react';
import { Product } from '../../lib/types';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface CoreFormulationsSageProps {
  products: Product[];
  onSelect: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
  onViewAll: () => void;
}

export const CoreFormulationsSage: React.FC<CoreFormulationsSageProps> = ({
  products,
  onSelect,
  onRequestQuote,
  onViewAll
}) => {
  const coreProducts = [
    products.find(p => p.name.toLowerCase().includes('tigastin')) || products[0],
    products.find(p => p.name.toLowerCase().includes('threptohepa')) || products[2] || products[0],
    products.find(p => p.name.toLowerCase().includes('meroxcess')) || products[4] || products[0]
  ].filter(Boolean) as Product[];

  return (
    <section id="core-products" className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Editorial Card Matching Section 2 in Reference Image */}
      <div className="bg-white rounded-[36px] sm:rounded-[44px] border border-[#DFDCD4] shadow-xs overflow-hidden">
        
        {/* Segmented Top Indicator Line (Yellow segment + subtle gray line from reference) */}
        <div className="grid grid-cols-3 w-full h-[3.5px]">
          <div className="bg-[#E2CA40]" />
          <div className="bg-[#DFDCD4]" />
          <div className="bg-[#DFDCD4]" />
        </div>

        <div className="p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headline & Action Button */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A857A]">
                CORE INJECTABLE THERAPEUTICS
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414] tracking-tight leading-[1.1] font-['Plus_Jakarta_Sans']">
                Precision purity <br />
                in real time
              </h2>

              <p className="text-xs sm:text-sm text-[#635F55] max-w-md leading-relaxed">
                Hospital antibiotics, emergency anticoagulants, and intensive care parenterals manufactured under Grade A aseptic cleanroom conditions with complete CTD registration dossiers.
              </p>

              <div>
                <button
                  onClick={onViewAll}
                  className="btn-sensiq-black px-6 py-3 text-xs"
                >
                  <span>Explore Product Catalogue</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Floating Mini Telemetry Card (Direct reference match!) */}
              <div className="p-4 rounded-2xl bg-[#F7F5EE] border border-[#E4E0D6] space-y-2 max-w-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#7A7569]">
                  <span className="font-bold">ASSAY SPECIFICATION</span>
                  <span className="text-[#141414] font-bold">98.0% – 102.0%</span>
                </div>
                {/* Yellow striped indicator bars (as shown in reference image!) */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((b) => (
                    <div 
                      key={b} 
                      className={`h-3 w-1.5 rounded-xs ${b <= 10 ? 'bg-[#E2CA40]' : 'bg-[#DDD8CB]'}`} 
                    />
                  ))}
                  <span className="text-[10px] font-mono text-[#58554D] ml-2 font-bold">PASS</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Clean Product Plates (Touch-swipe carousel on mobile, 3-col grid on tablet/desktop) */}
            <div className="lg:col-span-7">
              <div className="sm:hidden flex items-center justify-end gap-1 text-[10px] font-mono text-[#8A857A] mb-2">
                <span>Swipe formulations</span>
                <span>→</span>
              </div>
              <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
                {coreProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="product-plate p-5 min-w-[230px] sm:min-w-0 flex-1 snap-start flex flex-col justify-between group cursor-pointer"
                    onClick={() => onSelect(prod)}
                  >
                  {/* Circular Product Image Stage */}
                  <div className="product-circle-img mx-auto">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-[82%] max-w-[82%] object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Molecule */}
                  <div className="text-center my-2 space-y-1">
                    <h3 className="font-bold text-[#141414] text-sm tracking-tight font-['Plus_Jakarta_Sans'] group-hover:text-[#D96B43] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-[11px] text-[#7A7569] font-medium line-clamp-1">
                      {prod.genericName}
                    </p>
                    <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#F3F0EA] text-[#555146] mt-1">
                      {prod.strength}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestQuote(prod);
                    }}
                    className="w-full mt-2 py-2 px-3 rounded-full bg-[#141414] text-white hover:bg-[#2D2D2D] text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
