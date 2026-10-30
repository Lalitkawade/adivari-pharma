import React from 'react';
import { Product } from '../../lib/types';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Package, 
  Thermometer, 
  Clock, 
  Globe, 
  FileCheck
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  onClose, 
  onRequestQuote 
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141414]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white border border-[#DFDCD4] rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#EFECE5] flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-full bg-[#141414] text-white">
              <FileCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
                Technical Specifications &amp; CTD Dossier
              </h3>
              <p className="text-xs text-[#635F55] font-mono">
                Regulatory Dossier &amp; Quality Standards • Adivari Pharmaceuticals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8A857A] hover:text-[#141414] hover:bg-[#F3F0EA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6 text-xs">
          
          {/* Top Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 bg-[#FAF9F5] p-6 rounded-[24px] border border-[#DFDCD4] flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-52 object-contain filter drop-shadow-md"
              />
            </div>
            
            <div className="md:col-span-7 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EC] border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#4A463B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
                  <span>{product.category}</span>
                </div>
                {product.pharmacopeia && (
                  <span className="px-2.5 py-1 rounded-full bg-[#F3F0EA] text-[#58554D] text-[10px] font-mono border border-[#DFDCD4]">
                    {product.pharmacopeia} Grade
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#141414] text-white">
                  WHO-GMP
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
                {product.name}
              </h2>
              <p className="text-sm font-semibold text-[#58554D]">
                {product.genericName}
              </p>
              <p className="text-xs text-[#635F55] leading-relaxed">
                {product.description}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] text-xs text-[#4A463B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#141414] shrink-0" />
                <span className="font-medium">Full CTD Format Dossier (Modules 1–5) ready for rapid health authority registration.</span>
              </div>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#141414] uppercase tracking-wider flex items-center gap-2">
              <Package className="w-4 h-4 text-[#4A463B]" />
              Specifications &amp; Dosage Form
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4]">
                <span className="text-[#8A857A] font-mono text-[10px] block mb-1">Dosage Form:</span>
                <span className="text-[#141414] font-semibold">{product.dosageForm}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4]">
                <span className="text-[#8A857A] font-mono text-[10px] block mb-1">Strength / Potency:</span>
                <span className="text-[#141414] font-semibold">{product.strength}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4]">
                <span className="text-[#8A857A] font-mono text-[10px] block mb-1">Primary Packaging:</span>
                <span className="text-[#141414] font-semibold">{product.packaging}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4]">
                <span className="text-[#8A857A] font-mono text-[10px] block mb-1">Shelf Life:</span>
                <span className="text-[#141414] font-semibold flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#4A463B]" /> {product.shelfLife}
                </span>
              </div>
              {product.casNumber && (
                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4]">
                  <span className="text-[#8A857A] font-mono text-[10px] block mb-1">CAS Registry Number:</span>
                  <span className="text-[#141414] font-semibold font-mono">{product.casNumber}</span>
                </div>
              )}
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4]">
                <span className="text-[#8A857A] font-mono text-[10px] block mb-1">Export Dossier Status:</span>
                <span className="text-[#141414] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#141414]" /> CTD Modules 1–5 Available
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] sm:col-span-2">
                <span className="text-[#8A857A] font-mono text-[10px] block mb-1">Storage Conditions:</span>
                <span className="text-[#141414] font-semibold flex items-center gap-1 font-mono">
                  <Thermometer className="w-3.5 h-3.5 text-[#4A463B]" /> {product.storage}
                </span>
              </div>
            </div>
          </div>

          {/* Clinical Indications */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-[#141414] uppercase tracking-wider">
              Clinical Indications
            </h4>
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] text-[#58554D] leading-relaxed">
              {product.indications}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-5 bg-[#FAF9F5] border-t border-[#EFECE5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono text-[#8A857A]">
            Export Markets: <span className="text-[#141414] font-semibold">{product.exportMarkets.join(', ')}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="btn-sensiq-white py-2.5 px-6 text-xs w-full sm:w-auto justify-center font-medium"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestQuote(product);
              }}
              className="btn-sensiq-black py-2.5 px-6 text-xs w-full sm:w-auto justify-center font-medium"
            >
              <FileText className="w-4 h-4" />
              <span>Request Quotation for {product.name}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
