import React from 'react';
import { Product } from '../../lib/types';
import { Plus, ArrowRight } from 'lucide-react';

interface RecommendedStripProps {
  products: Product[];
  onSelect: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}

export const RecommendedStrip: React.FC<RecommendedStripProps> = ({
  products,
  onSelect,
  onRequestQuote
}) => {
  const recommended = [
    products.find(p => p.name.toLowerCase().includes('tigajet')) || products[1] || products[0],
    products.find(p => p.name.toLowerCase().includes('esorior')) || products[3] || products[0],
    products.find(p => p.name.toLowerCase().includes('threptohepa')) || products[2] || products[0]
  ].filter(Boolean) as Product[];

  return (
    <section id="recommended" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      
      {/* Title */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#DFDCD4]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#8A857A] uppercase block">
            FORMULATION PORTFOLIO
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
            Recommended for Hospital Procurement
          </h3>
        </div>
        <span className="text-xs font-mono text-[#635F55]">
          USP / IP Grade
        </span>
      </div>

      {/* 3 White Cards (Touch-swipe carousel on mobile, 3-col grid on desktop) */}
      <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
        {recommended.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-[32px] p-5 sm:p-6 border border-[#DFDCD4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group min-w-[275px] sm:min-w-[320px] md:min-w-0 flex-1 snap-start"
          >
            <div 
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => onSelect(prod)}
            >
              {/* Product Thumbnail in Minimal Canvas */}
              <div className="w-22 h-22 rounded-2xl bg-[#F6F4ED] p-2 flex items-center justify-center border border-[#E8E4D8] shrink-0 group-hover:scale-104 transition-transform">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                />
              </div>

              {/* Title & Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
                  <span className="text-[10px] font-mono text-[#8A857A] uppercase">
                    {prod.category.split('&')[0]}
                  </span>
                </div>
                <h4 className="font-bold text-[#141414] text-base font-['Plus_Jakarta_Sans'] group-hover:text-[#D96B43] transition-colors truncate">
                  {prod.name}
                </h4>
                <p className="text-xs text-[#635F55] font-medium mt-0.5 line-clamp-1">
                  {prod.genericName}
                </p>
                <p className="text-[11px] text-[#8E897D] mt-1 line-clamp-2 leading-snug">
                  {prod.description}
                </p>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-4 mt-3 border-t border-[#EFECE5] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#141414] px-2.5 py-1 rounded-full bg-[#F3F0EA]">
                {prod.strength}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRequestQuote(prod);
                }}
                className="btn-sensiq-black py-1.5 px-3.5 text-xs"
                title="Request Quotation"
              >
                <span>Quote</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
