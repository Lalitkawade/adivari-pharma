-- ==============================================================================
-- Adivari Pharmaceuticals - Production Supabase Database Schema
-- Project: https://cdhpgfsxarxdymicmohk.supabase.co
-- 
-- How to apply:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/cdhpgfsxarxdymicmohk
-- 2. Click "SQL Editor" on the left menu -> "New query"
-- 3. Paste this entire script and click "Run" (green button)
-- ==============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. THERAPEUTIC CATEGORIES TABLE
-- Used by: Admin Section 2 (Categories), Admin Section 3 (Product Additions),
-- and Public Catalog filters
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 2. PRODUCTS / INJECTABLE FORMULATIONS TABLE
-- Used by: Admin Section 1 (Dashboard metrics), Admin Section 3 (Products Catalog),
-- Admin Section 5 (CSV & JSON exports), and Public Storefront Catalog
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "genericName" TEXT NOT NULL,
  category TEXT NOT NULL,
  "dosageForm" TEXT,
  strength TEXT NOT NULL,
  packaging TEXT,
  indications TEXT,
  "shelfLife" TEXT,
  storage TEXT,
  image TEXT,
  status TEXT DEFAULT 'active',
  "exportMarkets" TEXT[],
  "dossierAvailable" BOOLEAN DEFAULT true,
  description TEXT,
  pharmacopeia TEXT DEFAULT 'USP',
  "casNumber" TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. COMMERCIAL QUOTATIONS & WEBSITE LEADS TABLE
-- Used by: Admin Section 1 (Lead metrics & chart), Admin Section 4 (Website Leads),
-- Admin Section 5 (Leads CSV export), and Website RFQ / Contact Inquiry forms
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quotations (
  id TEXT PRIMARY KEY,
  "referenceNumber" TEXT NOT NULL,
  "companyName" TEXT NOT NULL,
  "contactPerson" TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  "portOfEntry" TEXT,
  "organizationType" TEXT,
  incoterms TEXT,
  items JSONB,
  message TEXT,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'normal',
  "adminNotes" TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

-- Category policies
DROP POLICY IF EXISTS "Public Read Categories" ON public.categories;
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin All Categories" ON public.categories;
CREATE POLICY "Admin All Categories" ON public.categories FOR ALL USING (true);

-- Product policies
DROP POLICY IF EXISTS "Public Read Products" ON public.products;
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin All Products" ON public.products;
CREATE POLICY "Admin All Products" ON public.products FOR ALL USING (true);

-- Lead / Quotation policies
DROP POLICY IF EXISTS "Public Insert Quotations" ON public.quotations;
CREATE POLICY "Public Insert Quotations" ON public.quotations FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Quotations" ON public.quotations;
CREATE POLICY "Public Read Quotations" ON public.quotations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin All Quotations" ON public.quotations;
CREATE POLICY "Admin All Quotations" ON public.quotations FOR ALL USING (true);

-- ==============================================================================
-- REALTIME LIVE SYNCHRONIZATION
-- Safe idempotent activation so running the script multiple times never throws an error
-- ==============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'categories'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'quotations'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.quotations;
  END IF;
END $$;

-- ==============================================================================
-- INITIAL THERAPEUTIC CATEGORIES
-- Pre-configures standard therapeutic categories so products can be categorized immediately.
-- Products themselves are 100% DYNAMIC: add, update, and delete anytime via Admin Suite.
-- ==============================================================================
INSERT INTO public.categories (id, name, slug, description)
VALUES
  ('cat-1', 'Critical Care & Antibiotics', 'critical-care-antibiotics', 'Advanced broad-spectrum antibiotics, carbapenems, and glycylcyclines formulated for ICU and multidrug-resistant infections.'),
  ('cat-2', 'Anticoagulants', 'anticoagulants', 'High-purity unfractionated heparins and emergency cardiovascular antithrombotic parenterals for hemodialysis and surgical bypass.'),
  ('cat-3', 'Gastroenterology', 'gastroenterology', 'Targeted lyophilized proton pump inhibitors (PPIs) for hospital-grade acute GI bleeding and severe acid reflux management.'),
  ('cat-4', 'Emergency Injectables', 'emergency-injectables', 'Rapid-onset parenteral formulations for emergency resuscitation, acute anesthesia, and critical care units.'),
  ('cat-5', 'General Formulations', 'general-formulations', 'Standard hospital parenterals, electrolyte balancers, and secondary supportive therapies manufactured under WHO-GMP compliance.')
ON CONFLICT (id) DO NOTHING;

-- NOTE: Products table is left empty by default.
-- All products are managed dynamically through the Admin Portal (/admin/products) or Supabase Table Editor.

