import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, QuotationRequest, Category, DashboardMetrics, LeadStatus } from '../lib/types';
import { INITIAL_PRODUCTS, INITIAL_QUOTATIONS, INITIAL_CATEGORIES } from '../lib/mockData';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import toast from 'react-hot-toast';

interface DataContextType {
  // Categories
  categories: Category[];
  addCategory: (categoryData: Omit<Category, 'id' | 'createdAt'>) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<{ success: boolean; message?: string }>;

  // Products
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'createdAt'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Website Leads / Quotations
  quotations: QuotationRequest[];
  addQuotation: (rfqData: Omit<QuotationRequest, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => Promise<QuotationRequest>;
  updateQuotationStatus: (id: string, status: LeadStatus, adminNotes?: string) => Promise<void>;
  deleteQuotation: (id: string) => Promise<void>;

  // System & Metrics
  loading: boolean;
  isCloudConnected: boolean;
  resetToSampleData: () => void;
  metrics: DashboardMetrics;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to normalize legacy statuses
const normalizeStatus = (status: any): LeadStatus => {
  if (status === 'new') return 'open';
  if (status === 'in_review' || status === 'quoted') return 'pending';
  if (status === 'closed') return 'closed';
  if (status === 'open' || status === 'pending') return status;
  return 'open';
};

// Safe Product mapper for Supabase rows (handles both camelCase and snake_case)
const mapSupabaseProduct = (row: any): Product => ({
  id: String(row.id),
  name: row.name || 'Unnamed Formulation',
  genericName: row.genericName || row.generic_name || '',
  category: row.category || 'General Formulations',
  dosageForm: row.dosageForm || row.dosage_form || 'Sterile Lyophilized Powder',
  strength: row.strength || '',
  packaging: row.packaging || '10ml USP Type I vial with flip-off seal',
  indications: row.indications || '',
  shelfLife: row.shelfLife || row.shelf_life || '24 Months',
  storage: row.storage || 'Store below 25°C',
  image: row.image || '/images/products/tigastin.jpg',
  status: row.status || 'active',
  exportMarkets: Array.isArray(row.exportMarkets) 
    ? row.exportMarkets 
    : (Array.isArray(row.export_markets) ? row.export_markets : ['Latin America', 'Southeast Asia', 'Middle East']),
  dossierAvailable: row.dossierAvailable !== undefined ? Boolean(row.dossierAvailable) : (row.dossier_available !== undefined ? Boolean(row.dossier_available) : true),
  description: row.description || '',
  pharmacopeia: row.pharmacopeia || 'USP',
  casNumber: row.casNumber || row.cas_number || '',
  createdAt: row.createdAt || row.created_at || new Date().toISOString()
});

// Safe Quotation / Lead mapper for Supabase rows
const mapSupabaseQuotation = (row: any): QuotationRequest => {
  let parsedItems = [];
  if (Array.isArray(row.items)) {
    parsedItems = row.items;
  } else if (typeof row.items === 'string') {
    try {
      parsedItems = JSON.parse(row.items);
    } catch {
      parsedItems = [];
    }
  }

  return {
    id: String(row.id),
    referenceNumber: row.referenceNumber || row.reference_number || `RFQ-${Date.now().toString().slice(-4)}`,
    companyName: row.companyName || row.company_name || 'Website Importer',
    contactPerson: row.contactPerson || row.contact_person || 'Procurement Officer',
    email: row.email || '',
    phone: row.phone || '',
    country: row.country || 'International',
    portOfEntry: row.portOfEntry || row.port_of_entry || '',
    organizationType: row.organizationType || row.organization_type || 'Licensed Importer',
    incoterms: row.incoterms || 'CIF',
    items: parsedItems,
    message: row.message || '',
    status: normalizeStatus(row.status),
    priority: row.priority || 'normal',
    adminNotes: row.adminNotes || row.admin_notes || '',
    createdAt: row.createdAt || row.created_at || new Date().toISOString()
  };
};

// Safe Category mapper for Supabase rows
const mapSupabaseCategory = (row: any): Category => ({
  id: String(row.id),
  name: row.name || '',
  slug: row.slug || (row.name ? row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''),
  description: row.description || '',
  createdAt: row.createdAt || row.created_at || new Date().toISOString()
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Categories State
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('adivari_categories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse saved categories:', e);
      }
    }
    return INITIAL_CATEGORIES;
  });

  // Products State - 100% dynamic, never auto-seeds static data
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('adivari_products');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Failed to parse saved products:', e);
      }
    }
    return [];
  });

  // Website Leads / Quotations State
  const [quotations, setQuotations] = useState<QuotationRequest[]>(() => {
    const saved = localStorage.getItem('adivari_quotations');
    if (saved) {
      try {
        const parsed: QuotationRequest[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(q => ({
            ...q,
            status: normalizeStatus(q.status)
          }));
        }
      } catch (e) {
        console.error('Failed to parse saved quotations:', e);
      }
    }
    return [];
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(isSupabaseConfigured());

  // Persistence to localStorage for instant hydration & offline resilience
  useEffect(() => {
    localStorage.setItem('adivari_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('adivari_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('adivari_quotations', JSON.stringify(quotations));
  }, [quotations]);

  // Load from Supabase if configured in .env / Vercel
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsCloudConnected(false);
      return;
    }

    let isMounted = true;

    const fetchFromSupabase = async () => {
      setLoading(true);
      try {
        // 1. Fetch Categories
        const { data: dbCategories, error: catErr } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });
        if (!catErr && dbCategories && dbCategories.length > 0) {
          const mappedCategories = dbCategories.map(mapSupabaseCategory);
          if (isMounted) setCategories(mappedCategories);
        }

        // 2. Fetch Products (100% dynamic from database, never auto-insert static data)
        const { data: dbProducts, error: prodErr } = await supabase
          .from('products')
          .select('*')
          .order('name', { ascending: true });
        if (!prodErr && dbProducts) {
          const mapped = dbProducts.map(mapSupabaseProduct);
          if (isMounted) {
            setProducts(mapped);
            localStorage.setItem('adivari_products', JSON.stringify(mapped));
          }
        }

        // 3. Fetch Quotations / Leads
        const { data: dbQuotes, error: quoteErr } = await supabase
          .from('quotations')
          .select('*')
          .order('createdAt', { ascending: false });
        if (!quoteErr && dbQuotes) {
          const mappedQuotes = dbQuotes.map(mapSupabaseQuotation);
          if (isMounted) {
            setQuotations(mappedQuotes);
            localStorage.setItem('adivari_quotations', JSON.stringify(mappedQuotes));
          }
        }

        if (isMounted) setIsCloudConnected(true);
      } catch (err) {
        console.warn('Supabase synchronization fallback to local cache:', err);
        if (isMounted) setIsCloudConnected(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFromSupabase();

    // 4. Supabase Realtime Subscription for Live Updates
    const channel = supabase
      .channel('adivari_live_sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quotations' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const newQuote = mapSupabaseQuotation(payload.new);
          setQuotations(prev => [newQuote, ...prev.filter(q => q.id !== newQuote.id)]);
        } else if (payload.eventType === 'UPDATE') {
          const updatedQuote = mapSupabaseQuotation(payload.new);
          setQuotations(prev => prev.map(q => q.id === updatedQuote.id ? updatedQuote : q));
        } else if (payload.eventType === 'DELETE') {
          setQuotations(prev => prev.filter(q => q.id !== String(payload.old.id)));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const newProd = mapSupabaseProduct(payload.new);
          setProducts(prev => [newProd, ...prev.filter(p => p.id !== newProd.id)]);
        } else if (payload.eventType === 'UPDATE') {
          const updatedProd = mapSupabaseProduct(payload.new);
          setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
        } else if (payload.eventType === 'DELETE') {
          const deletedId = String(payload.old.id);
          setProducts(prev => {
            const updated = prev.filter(p => p.id !== deletedId);
            localStorage.setItem('adivari_products', JSON.stringify(updated));
            return updated;
          });
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const newCat = mapSupabaseCategory(payload.new);
          setCategories(prev => [...prev.filter(c => c.id !== newCat.id), newCat]);
        } else if (payload.eventType === 'UPDATE') {
          const updatedCat = mapSupabaseCategory(payload.new);
          setCategories(prev => prev.map(c => c.id === updatedCat.id ? updatedCat : c));
        } else if (payload.eventType === 'DELETE') {
          setCategories(prev => prev.filter(c => c.id !== String(payload.old.id)));
        }
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // --- Category Actions ---
  const addCategory = async (categoryData: Omit<Category, 'id' | 'createdAt'>): Promise<Category> => {
    const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newCategory: Category = {
      ...categoryData,
      slug,
      id: `cat-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const supabase = getSupabaseClient();
    if (supabase && isCloudConnected) {
      try {
        await supabase.from('categories').insert([newCategory]);
      } catch (err) {
        console.warn('Supabase category insert failed:', err);
      }
    }

    setCategories(prev => [...prev, newCategory]);
    toast.success(`Category "${newCategory.name}" created!`);
    return newCategory;
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    const supabase = getSupabaseClient();
    if (supabase && isCloudConnected) {
      try {
        await supabase.from('categories').update(updates).eq('id', id);
      } catch (err) {
        console.warn('Supabase category update failed:', err);
      }
    }

    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    toast.success('Category updated successfully!');
  };

  const deleteCategory = async (id: string): Promise<{ success: boolean; message?: string }> => {
    const categoryToDelete = categories.find(c => c.id === id);
    if (!categoryToDelete) return { success: false, message: 'Category not found' };

    // Check if products exist in this category
    const linkedProducts = products.filter(p => p.category === categoryToDelete.name);
    if (linkedProducts.length > 0) {
      toast.error(`Cannot delete category "${categoryToDelete.name}" because ${linkedProducts.length} product(s) are assigned to it. Please reassign products first.`);
      return { 
        success: false, 
        message: `Contains ${linkedProducts.length} assigned products.` 
      };
    }

    const supabase = getSupabaseClient();
    if (supabase && isCloudConnected) {
      try {
        await supabase.from('categories').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase category delete failed:', err);
      }
    }

    setCategories(prev => prev.filter(c => c.id !== id));
    toast.success(`Category "${categoryToDelete.name}" deleted.`);
    return { success: true };
  };

  // --- Product Actions ---
  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const supabase = getSupabaseClient();
    if (supabase && isCloudConnected) {
      try {
        await supabase.from('products').insert([newProduct]);
      } catch (err) {
        console.warn('Supabase product insert failed:', err);
      }
    }

    setProducts(prev => [newProduct, ...prev]);
    toast.success(`Product "${newProduct.name}" added to catalog!`);
    return newProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const supabase = getSupabaseClient();
    if (supabase && isCloudConnected) {
      try {
        await supabase.from('products').update(updates).eq('id', id);
      } catch (err) {
        console.warn('Supabase product update failed:', err);
      }
    }

    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    toast.success('Product updated successfully!');
  };

  const deleteProduct = async (id: string) => {
    const supabase = getSupabaseClient();
    if (supabase && isCloudConnected) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
          console.error('Supabase product delete failed:', error);
          toast.error('Could not delete product from database.');
          return;
        }
      } catch (err) {
        console.warn('Supabase product delete failed:', err);
      }
    }

    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('adivari_products', JSON.stringify(updated));
      return updated;
    });
    toast.success('Product permanently deleted from catalog.');
  };

  // --- Website Leads Actions ---
  const addQuotation = async (rfqData: Omit<QuotationRequest, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): Promise<QuotationRequest> => {
    const randomRefNum = Math.floor(1000 + Math.random() * 9000);
    const newQuotation: QuotationRequest = {
      ...rfqData,
      id: `lead-${Date.now()}`,
      referenceNumber: `RFQ-2026-${randomRefNum}`,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    const supabase = getSupabaseClient();
    if (supabase && isCloudConnected) {
      try {
        await supabase.from('quotations').insert([newQuotation]);
      } catch (err) {
        console.warn('Supabase quotation insert failed:', err);
      }
    }

    setQuotations(prev => [newQuotation, ...prev]);
    return newQuotation;
  };

  const updateQuotationStatus = async (id: string, status: LeadStatus, adminNotes?: string) => {
    const updates: Partial<QuotationRequest> = { status };
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;

    const supabase = getSupabaseClient();
    if (supabase && isCloudConnected) {
      try {
        await supabase.from('quotations').update(updates).eq('id', id);
      } catch (err) {
        console.warn('Supabase quotation status update failed:', err);
      }
    }

    setQuotations(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
    toast.success(`Lead marked as: ${status.toUpperCase()}`);
  };

  const deleteQuotation = async (id: string) => {
    const supabase = getSupabaseClient();
    if (supabase && isCloudConnected) {
      try {
        await supabase.from('quotations').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase quotation delete failed:', err);
      }
    }

    setQuotations(prev => prev.filter(q => q.id !== id));
    toast.success('Lead inquiry deleted.');
  };

  // Reset default categories
  const resetToSampleData = async () => {
    const supabase = getSupabaseClient();
    if (supabase && isCloudConnected) {
      try {
        await supabase.from('categories').upsert(INITIAL_CATEGORIES);
      } catch (err) {
        console.warn('Supabase categories restore failed:', err);
      }
    }

    setCategories(INITIAL_CATEGORIES);
    localStorage.setItem('adivari_categories', JSON.stringify(INITIAL_CATEGORIES));
    toast.success('Restored default therapeutic categories.');
  };

  // Metrics computation
  const uniqueCountries = new Set(quotations.map(q => q.country)).size;
  const openCount = quotations.filter(q => normalizeStatus(q.status) === 'open').length;
  const pendingCount = quotations.filter(q => normalizeStatus(q.status) === 'pending').length;
  const closedCount = quotations.filter(q => normalizeStatus(q.status) === 'closed').length;

  const metrics: DashboardMetrics = {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalQuotations: quotations.length,
    openQuotations: openCount,
    pendingQuotations: pendingCount,
    closedQuotations: closedCount,
    totalCountries: uniqueCountries || 4,
    monthlyGrowthRate: 18.5
  };

  return (
    <DataContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        quotations,
        addQuotation,
        updateQuotationStatus,
        deleteQuotation,
        resetToSampleData,
        loading,
        isCloudConnected,
        metrics
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
