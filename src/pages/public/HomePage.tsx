import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../lib/types';
import { Navbar } from '../../components/public/Navbar';
import { Hero } from '../../components/public/Hero';
import { TrustBar } from '../../components/public/TrustBar';
import { UnifiedFormulationsCatalog } from '../../components/public/UnifiedFormulationsCatalog';
import { DigitalCatalogueHub } from '../../components/public/DigitalCatalogueHub';
import { InternationalFaqSection } from '../../components/public/InternationalFaqSection';
import { ShowcaseSage } from '../../components/public/ShowcaseSage';
import { ContactInquiryCard } from '../../components/public/ContactInquiryCard';
import { Footer } from '../../components/public/Footer';
import { ProductModal } from '../../components/public/ProductModal';
import { RfqModal } from '../../components/public/RfqModal';

export const HomePage: React.FC = () => {
  const { products, categories } = useData();

  // Modals state
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [rfqProductId, setRfqProductId] = useState<string | undefined>(undefined);

  const handleExploreCatalog = () => {
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRfq = (productId?: string) => {
    setRfqProductId(productId);
    setIsRfqOpen(true);
  };

  const handleProductSelect = (product: Product) => {
    setActiveProduct(product);
  };

  const handleProductQuote = (product: Product) => {
    handleOpenRfq(product.id);
  };

  return (
    <div className="min-h-screen bg-[#ECEAE4] text-[#141414] flex flex-col font-sans">
      {/* Top Header */}
      <Navbar onOpenRfq={handleOpenRfq} />

      {/* 1. Hero Section */}
      <Hero 
        onOpenRfq={handleOpenRfq} 
        onExploreCatalog={handleExploreCatalog}
      />

      {/* 2. Four Feature / Trust Pillars Bar */}
      <TrustBar />

      {/* 3. Single Consolidated Section with Filter, Search & Sort */}
      <UnifiedFormulationsCatalog
        products={products}
        categories={categories}
        onSelect={handleProductSelect}
        onRequestQuote={handleProductQuote}
        onOpenBulkRfq={() => handleOpenRfq()}
      />

      {/* 4. B2B Digital Export Catalogue & International Regulatory Hub */}
      <DigitalCatalogueHub onOpenRfq={handleOpenRfq} />

      {/* 6. WHO-GMP Cleanroom Standards Showcase */}
      <ShowcaseSage onOpenRfq={handleOpenRfq} />

      {/* 7. International Pharma Importer & Trade FAQ Section */}
      <InternationalFaqSection onOpenRfq={handleOpenRfq} />

      {/* 8. Contact Coordinates & Quick Express Lead Inquiry Form */}
      <ContactInquiryCard onOpenRfq={handleOpenRfq} />

      {/* 9. Minimalist Footer */}
      <Footer onOpenRfq={handleOpenRfq} />

      {/* Interactive Modals */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onRequestQuote={handleProductQuote}
      />

      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        preSelectedProductId={rfqProductId}
      />
    </div>
  );
};
