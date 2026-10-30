import React from 'react';
import { Product } from '../../lib/types';
import { 
  FileText, 
  Eye, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onSelect, 
  onRequestQuote 
}) => {
  return (
    <div className="bg-white rounded-[32px] p-6 border border-[#DFDCD4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      
      {/* Product Image Stage */}
      <div className="relative h-60 w-full bg-[#FAF8F3] rounded-[24px] overflow-hidden flex items-center justify-center p-4 border border-[#ECE5D8] mb-5">
        
        {/* Badges on Image */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#4A463B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
            <span>{product.category}</span>
          </div>
          {product.pharmacopeia && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#F3EFE6] text-[#635F55] text-[10px] font-mono border border-[#E0DACE]">
              {product.pharmacopeia} Grade
            </span>
          )}
        </div>

        {product.dossierAvailable && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#141414] text-[10px] font-mono font-semibold border border-[#DFDCD4] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#4A463B]" />
              <span>CTD Ready</span>
            </span>
          </div>
        )}

        {/* Product Box Image with hover scale */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full max-w-[85%] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 z-20 bg-[#141414]/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onSelect(product)}
            className="p-3 rounded-full bg-white text-[#141414] border border-[#DFDCD4] hover:bg-[#141414] hover:text-white transition-all transform hover:scale-110 shadow-lg"
            title="Technical Dossier"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRequestQuote(product)}
            className="p-3 rounded-full bg-[#141414] text-white hover:bg-[#2A2A2A] transition-all transform hover:scale-110 shadow-lg"
            title="Request Quotation"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-[#141414] group-hover:text-[#4A463B] transition-colors font-['Plus_Jakarta_Sans'] tracking-tight">
                {product.name}
              </h3>
              <p className="text-xs text-[#635F55] font-medium tracking-wide">
                {product.genericName}
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#F3F0EA] text-[#141414] whitespace-nowrap border border-[#DFDCD4]">
              {product.strength}
            </span>
          </div>

          <p className="text-xs text-[#7A756B] line-clamp-2 leading-relaxed mt-2.5">
            {product.description}
          </p>
        </div>

        {/* Shelf life & export info */}
        <div className="pt-3 border-t border-[#EFECE5] flex items-center justify-between text-[11px] text-[#8A857A]">
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-[#4A463B]" />
            Shelf Life: {product.shelfLife}
          </span>
          <span className="truncate max-w-[140px] font-mono text-[#58554D]">
            {product.exportMarkets.join(', ')}
          </span>
        </div>

        {/* Action Button Row - Sleek Pill styling matching reference */}
        <div className="pt-2 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onSelect(product)}
            className="btn-sensiq-white py-2 text-xs justify-center font-medium"
          >
            <Eye className="w-3.5 h-3.5 text-[#58554D]" />
            <span>Specification</span>
          </button>
          
          <button
            onClick={() => onRequestQuote(product)}
            className="btn-sensiq-black py-2 text-xs justify-center font-medium"
          >
            <span>Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};

