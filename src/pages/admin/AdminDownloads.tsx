import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  DownloadCloud, 
  FileSpreadsheet, 
  FileJson, 
  FileText, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  Copy, 
  Code2, 
  RefreshCw,
  Award,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminDownloads: React.FC = () => {
  const { products, categories, quotations } = useData();
  const [showSql, setShowSql] = useState(false);

  // 1. Export Leads to CSV
  const downloadLeadsCSV = () => {
    const headers = ['RefNumber', 'Company', 'ContactPerson', 'Email', 'Phone', 'Country', 'PortOfEntry', 'Incoterms', 'Status', 'CreatedAt', 'AdminNotes'];
    const rows = quotations.map(q => [
      q.referenceNumber,
      `"${q.companyName.replace(/"/g, '""')}"`,
      `"${q.contactPerson.replace(/"/g, '""')}"`,
      q.email,
      q.phone || '',
      `"${q.country.replace(/"/g, '""')}"`,
      `"${(q.portOfEntry || '').replace(/"/g, '""')}"`,
      q.incoterms || 'CIF',
      q.status,
      q.createdAt,
      `"${(q.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `adivari_leads_rfqs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Website Leads exported to CSV!');
  };

  // 2. Export Products to CSV
  const downloadProductsCSV = () => {
    const headers = ['Name', 'MoleculeAPI', 'Category', 'Strength', 'Pharmacopeia', 'DosageForm', 'Packaging', 'ShelfLife', 'Storage', 'CTDDossierReady', 'Indications'];
    const rows = products.map(p => [
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.genericName.replace(/"/g, '""')}"`,
      `"${p.category.replace(/"/g, '""')}"`,
      `"${p.strength.replace(/"/g, '""')}"`,
      p.pharmacopeia || 'USP',
      `"${p.dosageForm.replace(/"/g, '""')}"`,
      `"${p.packaging.replace(/"/g, '""')}"`,
      p.shelfLife,
      `"${p.storage.replace(/"/g, '""')}"`,
      p.dossierAvailable ? 'YES' : 'NO',
      `"${(p.indications || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `adivari_products_catalog_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Product Catalog exported to CSV!');
  };

  // 3. Export Products to JSON
  const downloadProductsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `adivari_products_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Product Catalog exported to JSON!');
  };

  // 4. Download Complete Database Backup
  const downloadFullBackup = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      organization: 'Adivari Pharmaceuticals Private Limited',
      version: '2.0-production',
      categories,
      products,
      leads: quotations
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `adivari_pharma_complete_backup_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Full system backup downloaded!');
  };

  // 5. Download CTD Regulatory Dossier Checklist (.md)
  const downloadCtdDossierChecklist = () => {
    const ctdContent = `# COMMON TECHNICAL DOCUMENT (CTD) REGULATORY DOSSIER CHECKLIST
**Manufacturer:** Adivari Pharmaceuticals Pvt. Ltd., Maharashtra, India
**Facility:** WHO-GMP Certified Grade A Sterile Injectables Facility
**Standards:** ICH / WHO / US FDA aligned CTD Format (Modules 1 to 5)

---

## MODULE 1: ADMINISTRATIVE INFORMATION AND PRESCRIBING INFORMATION
- [x] 1.1 Table of Contents of Module 1
- [x] 1.2 Administrative Application Form for Drug Registration
- [x] 1.3 Prescribing Information (Summary of Product Characteristics - SmPC)
- [x] 1.4 Patient Information Leaflet (PIL) & Packaging Artwork (Vial label, Outer carton)
- [x] 1.5 Legal Status / Certificate of Pharmaceutical Product (CPP / WHO-GMP Certificate)
- [x] 1.6 Good Manufacturing Practice (GMP) Audit Reports & Plant Site Master File (SMF)
- [x] 1.7 Free Sale Certificate (FSC) & Letters of Authorization for Local Agent

---

## MODULE 2: CTD SUMMARIES (OVERALL BIOLOGICAL & CHEMICAL REVIEWS)
- [x] 2.1 CTD Introduction
- [x] 2.2 Overall Quality Summary (QOS)
- [x] 2.3 Nonclinical Overview
- [x] 2.4 Clinical Overview
- [x] 2.5 Nonclinical Written and Tabulated Summaries
- [x] 2.6 Clinical Written and Tabulated Summaries

---

## MODULE 3: QUALITY (CHEMISTRY, MANUFACTURING, AND CONTROLS - CMC)
- [x] 3.1 Table of Contents of Module 3
- [x] 3.2.S DRUG SUBSTANCE (Active Pharmaceutical Ingredient - API)
  - General Information, Nomenclature, Structure, Physicochemical Characteristics
  - Manufacturer & Synthesis Route
  - Impurity Profile & Residual Solvents (ICH Q3A/B)
  - Control of Drug Substance (Specification, Analytical Procedures, Validation)
  - Reference Standards and Materials
  - Container Closure System & Stability Testing Data (Zone IVb: 30°C / 75% RH)
- [x] 3.2.P DRUG PRODUCT (Finished Sterile Parenteral Formulation)
  - Description and Composition of the Sterile Drug Product
  - Pharmaceutical Development (Formulation, Overages, Physicochemical and Biological Properties)
  - Manufacturing Process (Automated Lyophilization, Depyrogenation, Terminal Filtration 0.22µm)
  - In-Process Quality Controls (IPC) and Critical Process Parameters (CPP)
  - Process Validation & Aseptic Media Fill Qualification Reports
  - Control of Excipients (USP/IP Grades)
  - Finished Product Specifications (Assay 98.0%–102.0%, Sterility USP <71>, Endotoxins USP <85>)
  - Analytical Procedures and Complete Method Validation (ICH Q2 R1)
  - Batch Analyses (3 Commercial Batches COA)
  - Container Closure System (Type I Flint Glass Tubular Vials, FluroTec Stopper, Flip-Off Seals)
  - Stability Data (Accelerated 40°C/75% RH 6 Months & Real Time 30°C/75% RH 36 Months)

---

## MODULE 4: NONCLINICAL STUDY REPORTS
- [x] 4.1 Pharmacology Studies (Primary and Secondary Pharmacodynamics)
- [x] 4.2 Pharmacokinetics (Absorption, Distribution, Metabolism, Excretion)
- [x] 4.3 Toxicology (Single-dose, Repeat-dose, Genotoxicity, Carcinogenicity)

---

## MODULE 5: CLINICAL STUDY REPORTS
- [x] 5.1 Biopharmaceutic Studies (Bioequivalence / In Vitro Dissolution / Reconstitution Time)
- [x] 5.2 Pharmacokinetic Studies in Humans
- [x] 5.3 Efficacy and Safety Studies in Hospitalized Patients
- [x] 5.4 Post-Marketing Surveillance and Pharmacovigilance Risk Management Plan (RMP)

---
*Generated by Adivari Pharmaceuticals Export Operations Suite.*
`;

    const blob = new Blob([ctdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ADIVARI_CTD_REGULATORY_DOSSIER_CHECKLIST_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('CTD Regulatory Dossier Checklist downloaded!');
  };

  // 6. Download Certificate of Analysis (COA) Template
  const downloadCoaTemplate = () => {
    const coaContent = `# CERTIFICATE OF ANALYSIS (COA) - FINISHED STERILE INJECTABLE
**Adivari Pharmaceuticals Pvt. Ltd.**
**Quality Control & Quality Assurance Laboratories**
*MIDC Pharmaceutical Zone, Andheri East, Mumbai, Maharashtra 400093, India*

---

### BATCH IDENTIFICATION
- **Product Name:** TIGASTIN 50mg (Tigecycline for Injection USP 50mg)
- **Batch Number:** AD-TIG-2026-08
- **Manufacturing Date:** FEB 2026
- **Expiry Date:** JAN 2028
- **Batch Size:** 35,000 Vials
- **Pharmacopeial Standard:** USP / IP Compliant
- **Packaging:** 10ml USP Type I Flint Tubular Glass Vial with Chlorobutyl Stopper & Flip-off Seal

---

### ANALYTICAL TEST SPECIFICATIONS & RESULTS

| # | Test Parameter | Pharmacopeia Specification | Observed Batch Result | Decision |
|---|----------------|----------------------------|------------------------|----------|
| 1 | Description | Orange-colored sterile lyophilized cake | Orange lyophilized cake | PASS |
| 2 | Identification (HPLC) | Retention time concordant with Tigecycline WS | Matches Reference Standard | PASS |
| 3 | Identification (UV/IR) | Conforms to USP Reference Spectrum | Conforms | PASS |
| 4 | Reconstitution Time | Reconstitutes with 5.3ml sterile diluent in < 90 sec | 42 seconds | PASS |
| 5 | pH (Reconstituted) | 7.0 to 8.0 | 7.42 | PASS |
| 6 | Water / Moisture Content (Karl Fischer) | Not more than 3.0% w/w | 1.18% w/w | PASS |
| 7 | Particulate Matter (USP <788>) | >= 10µm: <= 6000/vial; >= 25µm: <= 600/vial | >= 10µm: 142/vial; >= 25µm: 12/vial | PASS |
| 8 | Related Substances (HPLC) | Total Impurities: NMT 2.0%; Any single: NMT 0.5% | Total: 0.68%; Max Single: 0.22% | PASS |
| 9 | Bacterial Endotoxins (USP <85>) | Less than 0.5 EU / mg of Tigecycline | < 0.12 EU / mg | PASS |
| 10| Sterility Test (USP <71>) | Sterile after 14-day direct inoculation & filtration | Complies (Sterile - No growth) | PASS |
| 11| Assay (Tigecycline by HPLC) | 98.0% to 102.0% of declared content | 100.4% (50.2mg/vial) | PASS |

---

### RELEASE CERTIFICATION
The batch of product described above has been manufactured under validated Grade A cleanroom conditions in full compliance with current WHO-GMP standards. All in-process checks, analytical releases, and stability metrics comply with official monograph specifications.

**Approved By:**
- **Quality Control Manager:** Dr. S. Kulkarni, Ph.D.
- **Head of Quality Assurance (Q.P.):** Dr. R. V. Deshmukh, M.Pharm.
- **Date of Release:** 18-FEB-2026
`;

    const blob = new Blob([coaContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ADIVARI_BATCH_COA_SPECIFICATION_TEMPLATE.md`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Certificate of Analysis (COA) Protocol downloaded!');
  };

  const sqlSchema = `-- Supabase Table Schema for Adivari Pharmaceuticals
-- Run this in your Supabase SQL Editor if connecting a cloud database

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
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
  pharmacopeia TEXT,
  "casNumber" TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quotations (
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

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Insert Quotations" ON quotations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Quotations" ON quotations FOR SELECT USING (true);
CREATE POLICY "Admin All Categories" ON categories FOR ALL USING (true);
CREATE POLICY "Admin All Products" ON products FOR ALL USING (true);
CREATE POLICY "Admin All Quotations" ON quotations FOR ALL USING (true);

-- Enable Supabase Realtime live sync safely
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'categories') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE categories;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'products') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE products;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'quotations') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE quotations;
  END IF;
END $$;`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="pb-4 border-b border-[#E8E2D7]">
        <h1 className="text-2xl font-bold text-[#1C221E] font-['Outfit']">
          Download Files &amp; Export Data
        </h1>
        <p className="text-xs text-[#738278]">
          One-stop export center for commercial spreadsheets, regulatory CTD dossier checklists, certificate of analysis templates, and system backups.
        </p>
      </div>

      {/* Grid of Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Card 1: Website Leads CSV */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D7] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#FBF0EB] text-[#D96B43] flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1C221E] text-sm font-['Outfit']">
              Website Leads &amp; RFQs (.csv)
            </h3>
            <p className="text-xs text-[#738278] leading-relaxed">
              Complete spreadsheet of all commercial inquiries captured from the website with client emails, phone numbers, requested volumes, and statuses.
            </p>
          </div>
          <button
            onClick={downloadLeadsCSV}
            className="btn-sensiq-black text-xs py-2.5 px-4 justify-center w-full font-semibold flex items-center gap-2"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Download Leads CSV ({quotations.length})</span>
          </button>
        </div>

        {/* Card 2: Products Catalog CSV */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D7] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#E5EEE8] text-[#344B3D] flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1C221E] text-sm font-['Outfit']">
              Product Portfolio Catalog (.csv)
            </h3>
            <p className="text-xs text-[#738278] leading-relaxed">
              Export all {products.length} injectable formulations with brand names, active APIs, pharmacopeias, strengths, and primary packaging descriptions.
            </p>
          </div>
          <button
            onClick={downloadProductsCSV}
            className="btn-sensiq-white text-xs py-2.5 px-4 justify-center w-full font-semibold flex items-center gap-2 border border-[#DFDCD4]"
          >
            <DownloadCloud className="w-4 h-4 text-[#344B3D]" />
            <span>Download Catalog CSV ({products.length})</span>
          </button>
        </div>

        {/* Card 3: Product Catalog JSON */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D7] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#F4F1EA] text-[#4A574E] flex items-center justify-center font-bold">
              <FileJson className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1C221E] text-sm font-['Outfit']">
              Product Formulations Data (.json)
            </h3>
            <p className="text-xs text-[#738278] leading-relaxed">
              Standard JSON object array of all injectable formulations ready for API integrations, frontend imports, or partner databases.
            </p>
          </div>
          <button
            onClick={downloadProductsJSON}
            className="btn-cream text-xs py-2.5 px-4 justify-center w-full font-bold flex items-center gap-2"
          >
            <DownloadCloud className="w-4 h-4 text-[#4A574E]" />
            <span>Download Products JSON</span>
          </button>
        </div>

        {/* Card 4: CTD Regulatory Dossier Checklist */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D7] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF2ED] text-[#2E7D32] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1C221E] text-sm font-['Outfit']">
              CTD Regulatory Dossier Checklist (.md)
            </h3>
            <p className="text-xs text-[#738278] leading-relaxed">
              Complete Common Technical Document (Modules 1 to 5) registration filing index for health authorities and drug regulatory agencies.
            </p>
          </div>
          <button
            onClick={downloadCtdDossierChecklist}
            className="btn-sensiq-black text-xs py-2.5 px-4 justify-center w-full font-semibold flex items-center gap-2"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Download CTD Checklist</span>
          </button>
        </div>

        {/* Card 5: Certificate of Analysis (COA) Protocol */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D7] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1C221E] text-sm font-['Outfit']">
              Batch Release COA Template (.md)
            </h3>
            <p className="text-xs text-[#738278] leading-relaxed">
              Analytical certificate specification document with official testing protocols for Assay, Sterility, Endotoxins, Reconstitution, and Particulates.
            </p>
          </div>
          <button
            onClick={downloadCoaTemplate}
            className="btn-cream text-xs py-2.5 px-4 justify-center w-full font-bold flex items-center gap-2"
          >
            <DownloadCloud className="w-4 h-4 text-[#B45309]" />
            <span>Download COA Template</span>
          </button>
        </div>

        {/* Card 6: Full Database Backup */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D7] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#EFEBE4] text-[#1C221E] flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1C221E] text-sm font-['Outfit']">
              Complete System Backup (.json)
            </h3>
            <p className="text-xs text-[#738278] leading-relaxed">
              Snapshot of all system records including categories, products, customer leads, and administrative timestamps for archival.
            </p>
          </div>
          <button
            onClick={downloadFullBackup}
            className="btn-terracotta text-xs py-2.5 px-4 justify-center w-full font-bold flex items-center gap-2"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Export Full System Backup</span>
          </button>
        </div>

      </div>

      {/* Database Schema & Cloud Migration Reference */}
      <div className="bg-white p-6 rounded-3xl border border-[#E8E2D7] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#EFEBE4]">
          <div>
            <h3 className="text-sm font-bold text-[#1C221E] font-['Outfit'] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#3B5244]" />
              <span>Production Supabase SQL Schema</span>
            </h3>
            <p className="text-xs text-[#738278]">
              Credentials are fully managed via <code className="bg-[#FAF8F4] px-1.5 py-0.5 rounded text-[#D96B43] font-mono">.env</code> locally and Vercel Project Environment Variables in production.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSql(!showSql)}
              className="btn-cream py-1.5 px-3 text-xs flex items-center gap-1 font-bold"
            >
              <Code2 className="w-3.5 h-3.5 text-[#3B5244]" />
              <span>{showSql ? 'Hide SQL Script' : 'Show SQL Script'}</span>
            </button>
          </div>
        </div>

        {showSql && (
          <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E2D5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#55635B]">Execute in Supabase SQL Editor:</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sqlSchema);
                  toast.success('SQL script copied to clipboard!');
                }}
                className="btn-cream py-1 px-3 text-xs flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Script</span>
              </button>
            </div>
            <pre className="p-3 bg-white rounded-xl text-[11px] font-mono text-[#2B3E31] border border-[#E8E2D5] overflow-x-auto max-h-56">
              {sqlSchema}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
};
