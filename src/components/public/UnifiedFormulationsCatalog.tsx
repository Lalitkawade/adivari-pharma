import React, { useState, useMemo } from 'react';
import { Product, Category } from '../../lib/types';
import { 
  Search, 
  ArrowUpDown, 
  X, 
  FileText, 
  Sparkles, 
  PackageCheck, 
  ArrowRight, 
  Eye, 
  FlaskConical,
  CheckCircle2,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface UnifiedFormulationsCatalogProps {
  products: Product[];
  categories: Category[];
  onSelect: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
  onOpenBulkRfq: () => void;
}

export const UnifiedFormulationsCatalog: React.FC<UnifiedFormulationsCatalogProps> = ({
  products,
  categories,
  onSelect,
  onRequestQuote,
  onOpenBulkRfq
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'name-asc' | 'name-desc' | 'strength' | 'category'>('recommended');

  // Extract category names list (with 'All' at the beginning)
  const categoryNames = useMemo(() => {
    const names = ['All'];
    categories.forEach(cat => {
      if (!names.includes(cat.name)) {
        names.push(cat.name);
      }
    });
    // Also include any categories present in products that might not be in categories list
    products.forEach(p => {
      if (p.category && !names.includes(p.category)) {
        names.push(p.category);
      }
    });
    return names;
  }, [categories, products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // 1. Filter
    const filtered = products.filter(product => {
      const matchesCategory = 
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesSearch = 
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.genericName.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.strength.toLowerCase().includes(query) ||
        product.indications.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.pharmacopeia && product.pharmacopeia.toLowerCase().includes(query)) ||
        product.exportMarkets.some(m => m.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    // 2. Sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'strength':
          return a.strength.localeCompare(b.strength);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'recommended':
        default:
          return 0; // maintain original curated order
      }
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('recommended');
  };

  return (
    <section 
      id="catalog" 
      className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-20"
      aria-label="Formulations Portfolio and Product Catalog"
    >
      {/* Anchor targets to cleanly redirect legacy links to this unified section */}
      <span id="core-products" className="scroll-mt-24 pointer-events-none opacity-0" />
      <span id="recommended" className="scroll-mt-24 pointer-events-none opacity-0" />
      <span id="formulations" className="scroll-mt-24 pointer-events-none opacity-0" />

      {/* Main Container Card matching SensIQ Editorial Aesthetic */}
      <div className="bg-white rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 lg:p-12 border border-[#DFDCD4] shadow-sm space-y-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#EFECE5]">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3EC] border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#4A463B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
              <FlaskConical className="w-3.5 h-3.5 text-[#4A463B]" />
              <span>STERILE INJECTABLES CATALOGUE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">
              Hospital Formulations &amp; Injectables
            </h2>

            <p className="text-xs sm:text-sm text-[#635F55] leading-relaxed">
              Explore our hospital-grade antibiotics, emergency injectables, and critical care formulations—manufactured under strict WHO-GMP compliance with complete registration dossiers and batch-wise release COAs.
            </p>
          </div>

          {/* Top Right Action & Quality Assurance Note */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
            <div className="px-3.5 py-2.5 rounded-2xl bg-[#F7F5EE] border border-[#E4E0D6] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] shrink-0" />
              <div className="text-[11px] text-[#4A463B] text-left">
                <span className="font-bold text-[#141414] block leading-tight">Batch COA with Every Order</span>
                <span className="text-[#6F6A5E] text-[10px]">USP / BP / IP Monograph Tested</span>
              </div>
            </div>

            <button
              onClick={onOpenBulkRfq}
              className="btn-sensiq-black text-xs py-3 px-6 font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Submit Bulk RFQ</span>
            </button>
          </div>
        </div>

        {/* Filter, Search & Sort Control Toolbar */}
        <div className="space-y-4">
          
          {/* Row 1: Search & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8A857A] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand name, active molecule, indication, USP..."
                className="w-full bg-[#FAF9F5] border border-[#DFDCD4] text-[#141414] rounded-full pl-9 pr-8 py-2.5 text-xs focus:outline-none focus:border-[#141414] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#8A857A] hover:text-[#141414]"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Counter Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs font-mono text-[#7A7569] hidden md:inline-block">
                Showing <strong className="text-[#141414]">{filteredAndSortedProducts.length}</strong> of {products.length} formulations
              </span>

              {/* Sort Dropdown */}
              <div className="relative flex items-center gap-2 bg-[#FAF9F5] border border-[#DFDCD4] rounded-full px-3 py-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8A857A]" />
                <span className="text-[#7A7569] font-medium hidden xs:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[#141414] font-semibold text-xs focus:outline-none cursor-pointer pr-1"
                >
                  <option value="recommended">Recommended</option>
                  <option value="name-asc">Product Name (A → Z)</option>
                  <option value="name-desc">Product Name (Z → A)</option>
                  <option value="strength">Strength / Potency</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>

          </div>

          {/* Row 2: Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
            {categoryNames.map((catName) => {
              const isSelected = selectedCategory === catName;
              return (
                <button
                  key={catName}
                  onClick={() => setSelectedCategory(catName)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isSelected
                      ? 'bg-[#141414] text-white shadow-sm'
                      : 'bg-[#F6F4ED] text-[#58554D] hover:bg-[#EAE6DC] border border-[#DFDCD4]'
                  }`}
                >
                  {catName === 'All' ? 'All Formulations' : catName}
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Cards Grid */}
        {products.length === 0 ? (
          <div className="p-14 text-center rounded-[32px] bg-[#FAF8F4] border border-[#EAE3D6] space-y-3">
            <PackageCheck className="w-12 h-12 text-[#98A69E] mx-auto stroke-[1.5]" />
            <h3 className="text-lg font-bold text-[#1C221E] font-['Plus_Jakarta_Sans']">
              WHO-GMP Formulation Registry
            </h3>
            <p className="text-xs text-[#6F7D74] max-w-md mx-auto">
              Our injectable formulations catalog is dynamically synced with our administrative portal. For immediate custom manufacturing or dossier availability inquiries, please reach out directly.
            </p>
            <button
              onClick={onOpenBulkRfq}
              className="btn-sensiq-black text-xs py-2.5 px-6 mx-auto mt-3 font-semibold"
            >
              Request Custom Procurement Quote
            </button>
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="p-12 text-center rounded-[28px] bg-[#FAF8F4] border border-[#EAE3D6] space-y-3">
            <PackageCheck className="w-12 h-12 text-[#98A69E] mx-auto stroke-[1.5]" />
            <h3 className="text-base font-bold text-[#1C221E] font-['Plus_Jakarta_Sans']">
              No Formulations Found
            </h3>
            <p className="text-xs text-[#6F7D74] max-w-sm mx-auto">
              No product matched your current search &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn-sensiq-black text-xs py-2 px-6 mx-auto mt-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#FAF9F5] rounded-[32px] p-6 border border-[#DFDCD4] hover:border-[#141414] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-lg"
              >
                <div>
                  
                  {/* Top Tags Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E4E0D6] text-[10px] font-mono font-bold text-[#4A463B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
                      <span className="truncate max-w-[150px]">{prod.category}</span>
                    </span>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ECEAE4] text-[#141414] border border-[#DCD9D0]">
                      {prod.pharmacopeia || 'USP'} Grade
                    </span>
                  </div>

                  {/* Circular Product Image Plate */}
                  <div 
                    onClick={() => onSelect(prod)}
                    className="w-full h-44 rounded-2xl bg-white border border-[#E8E4D8] p-3 flex items-center justify-center cursor-pointer overflow-hidden group-hover:border-[#141414] transition-all"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-106 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Title & API Generic */}
                  <div className="mt-5 space-y-1 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <h3 
                        onClick={() => onSelect(prod)}
                        className="text-lg font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight group-hover:text-[#D96B43] cursor-pointer transition-colors"
                      >
                        {prod.name}
                      </h3>
                      <span className="text-xs font-mono font-bold text-[#141414] bg-white px-2 py-0.5 rounded-full border border-[#DFDCD4] shrink-0">
                        {prod.strength}
                      </span>
                    </div>

                    <p className="text-xs text-[#58554D] font-medium line-clamp-1">
                      {prod.genericName}
                    </p>

                    <p className="text-[11px] text-[#7A7569] line-clamp-2 pt-1 leading-snug">
                      {prod.indications || prod.description}
                    </p>
                  </div>

                  {/* Quality & Dossier Chips */}
                  <div className="mt-4 pt-3 border-t border-[#EAE6DC] grid grid-cols-2 gap-2 text-[10px] font-mono text-[#58554D]">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#2E7D32]" />
                      <span>Sterile Injectable</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#2E7D32]" />
                      <span>Dossier Available</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Actions Row */}
                <div className="pt-4 mt-4 border-t border-[#EAE6DC] grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelect(prod)}
                    className="btn-sensiq-white py-2 px-3 text-xs font-semibold justify-center gap-1"
                    title="View Technical Dossier & Specifications"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Specs</span>
                  </button>

                  <button
                    onClick={() => onRequestQuote(prod)}
                    className="btn-sensiq-black py-2 px-3 text-xs font-semibold justify-center gap-1"
                    title="Request Commercial Price Quote"
                  >
                    <span>Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
