export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  genericName: string;
  category: string;
  dosageForm: string;
  strength: string;
  packaging: string;
  indications: string;
  shelfLife: string;
  storage: string;
  image: string;
  status: 'active' | 'draft';
  exportMarkets: string[];
  dossierAvailable: boolean;
  description: string;
  casNumber?: string;
  pharmacopeia?: 'USP' | 'BP' | 'IP' | 'EP';
  createdAt: string;
}

export interface QuotationItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export type LeadStatus = 'open' | 'pending' | 'closed';

export interface QuotationRequest {
  id: string;
  referenceNumber: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  portOfEntry?: string;
  organizationType: 'Licensed Importer' | 'Hospital Network' | 'Government Tender' | 'Distributor' | 'Other' | string;
  incoterms: 'CIF' | 'FOB' | 'CFR' | 'EXW' | string;
  items: QuotationItem[];
  message?: string;
  status: LeadStatus | 'new' | 'in_review' | 'quoted';
  priority?: 'normal' | 'high' | 'urgent';
  adminNotes?: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'sales_manager';
}

export interface DashboardMetrics {
  totalProducts: number;
  totalCategories: number;
  totalQuotations: number;
  openQuotations: number;
  pendingQuotations: number;
  closedQuotations: number;
  totalCountries: number;
  monthlyGrowthRate: number;
}
