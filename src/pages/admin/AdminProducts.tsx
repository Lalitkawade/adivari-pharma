import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../lib/types';
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  Upload, 
  Check, 
  FileCheck,
  FolderTree,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

const PRESET_IMAGES = [
  { name: 'Tigastin 50mg', url: '/images/products/tigastin.jpg' },
  { name: 'Tigajet 50mg', url: '/images/products/tigajet.jpg' },
  { name: 'Threptohepa 5000', url: '/images/products/threptohepa.jpg' },
  { name: 'Esorior 40mg', url: '/images/products/esorior.jpg' },
  { name: 'Meroxcess 1g', url: '/images/products/meroxcess.jpg' }
];

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [category, setCategory] = useState<string>('Critical Care & Antibiotics');
  const [strength, setStrength] = useState('');
  const [dosageForm, setDosageForm] = useState('Lyophilized Powder for Injection');
  const [pharmacopeia, setPharmacopeia] = useState<'USP' | 'BP' | 'IP' | 'EP'>('USP');
  const [packaging, setPackaging] = useState('10ml USP Type I vial with flip-off seal');
  const [shelfLife, setShelfLife] = useState('24 Months');
  const [storage, setStorage] = useState('Store below 25°C. Zone IVb stability compliant.');
  const [indications, setIndications] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [exportMarketsStr, setExportMarketsStr] = useState('Latin America, Southeast Asia, Middle East');
  const [dossierAvailable, setDossierAvailable] = useState(true);

  const openAddModal = (initialCat?: string) => {
    setEditingProduct(null);
    setName('');
    setGenericName('');
    setCategory(initialCat || (categories[0]?.name || 'Critical Care & Antibiotics'));
    setStrength('');
    setDosageForm('Lyophilized Powder for Injection');
    setPharmacopeia('USP');
    setPackaging('10ml USP Type I vial with flip-off seal');
    setShelfLife('24 Months');
    setStorage('Store below 25°C. Zone IVb stability compliant.');
    setIndications('');
    setDescription('');
    setImage(PRESET_IMAGES[0].url);
    setExportMarketsStr('Latin America, Southeast Asia, Middle East');
    setDossierAvailable(true);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setGenericName(p.genericName);
    setCategory(p.category);
    setStrength(p.strength);
    setDosageForm(p.dosageForm);
    setPharmacopeia(p.pharmacopeia || 'USP');
    setPackaging(p.packaging);
    setShelfLife(p.shelfLife);
    setStorage(p.storage);
    setIndications(p.indications);
    setDescription(p.description);
    setImage(p.image);
    setExportMarketsStr(p.exportMarkets ? p.exportMarkets.join(', ') : '');
    setDossierAvailable(p.dossierAvailable);
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        toast.success('Packaging photo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !genericName.trim() || !strength.trim()) {
      toast.error('Please enter brand name, API molecule, and strength.');
      return;
    }

    const exportMarkets = exportMarketsStr.split(',').map(s => s.trim()).filter(Boolean);

    const productPayload = {
      name: name.trim(),
      genericName: genericName.trim(),
      category,
      strength: strength.trim(),
      dosageForm,
      pharmacopeia,
      packaging,
      shelfLife,
      storage,
      indications,
      description,
      image,
      status: 'active' as const,
      exportMarkets,
      dossierAvailable
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productPayload);
    } else {
      await addProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, prodName: string) => {
    if (window.confirm(`Are you sure you want to delete "${prodName}" from the catalog?`)) {
      await deleteProduct(id);
    }
  };

  const filtered = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.genericName.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D7]">
        <div>
          <h1 className="text-2xl font-bold text-[#1C221E] font-['Outfit']">
            Pharmaceutical Product Catalog
          </h1>
          <p className="text-xs text-[#738278]">
            Manage WHO-GMP certified sterile formulations organized by category. Formulations sync in real-time to the public website.
          </p>
        </div>

        <button
          onClick={() => openAddModal()}
          className="btn-terracotta text-xs py-2.5 px-5 font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Formulation</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D7] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8C9B92] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by brand name or active molecule..."
            className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-full pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#6E8E7C]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#738278]" />
          <span className="text-[#738278] font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-full px-3 py-2 text-xs focus:outline-none focus:border-[#6E8E7C] font-semibold"
          >
            <option value="All">All Categories ({products.length})</option>
            {categories.map((cat) => {
              const count = products.filter(p => p.category === cat.name).length;
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2D7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFEBE4] bg-[#F7F5EE] text-[#6E7C73]">
                <th className="py-3.5 px-4 font-semibold">Formulation</th>
                <th className="py-3.5 px-4 font-semibold">Molecule / Active API</th>
                <th className="py-3.5 px-4 font-semibold">Therapeutic Category</th>
                <th className="py-3.5 px-4 font-semibold">Strength &amp; Packaging</th>
                <th className="py-3.5 px-4 font-semibold">CTD Dossier</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE8]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-[#738278]">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#F4F1EA] text-[#8C9B92] flex items-center justify-center">
                        <Package className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <p className="font-bold text-sm text-[#1C221E] font-['Outfit']">No Formulations in Catalog</p>
                      <p className="text-xs text-[#738278] max-w-sm">
                        Products are dynamic. Click &quot;Add New Formulation&quot; above to add your WHO-GMP certified parenterals.
                      </p>
                      <button
                        onClick={() => openAddModal()}
                        className="btn-terracotta text-xs py-2 px-4 mt-2 font-bold inline-flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add First Formulation</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#FAF8F4] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 object-contain bg-[#FAF8F4] rounded-xl p-1 border border-[#EAE3D6] shrink-0"
                        />
                        <div>
                          <p className="font-bold text-[#1C221E] text-sm font-['Outfit']">{prod.name}</p>
                          <span className="text-[10px] text-[#6E8E7C] font-semibold">{prod.pharmacopeia || 'USP'} Grade</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#3E4F44]">
                      <p className="font-semibold text-[#1C221E]">{prod.genericName}</p>
                      <p className="text-[10px] text-[#738278]">{prod.dosageForm}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="pill-badge text-[10px]">
                        {prod.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#3E4F44]">
                      <p className="font-bold text-[#1C221E]">{prod.strength}</p>
                      <p className="text-[10px] text-[#738278]">{prod.packaging}</p>
                    </td>
                    <td className="py-3 px-4">
                      {prod.dossierAvailable ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E5EEE8] text-[#344B3D]">
                          CTD Ready (Mod 1-5)
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EFECE5] text-[#7F8D85]">
                          In Progress
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 rounded-full bg-[#EFECE5] text-[#3B4D41] hover:text-[#D96B43] hover:bg-[#E2DBD0] transition-colors"
                          title="Edit Formulation"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id, prod.name)}
                          className="p-1.5 rounded-full bg-[#FAF0EB] text-[#D96B43] hover:bg-[#F5DFD6] transition-colors"
                          title="Delete Formulation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Formulation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C2520]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white border border-[#E4DDD1] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 border-b border-[#EFEBE2] flex items-center justify-between bg-[#F7F5EE]">
              <div className="flex items-center gap-2.5">
                <Package className="w-5 h-5 text-[#3B5244]" />
                <h3 className="text-base font-bold text-[#1C221E] font-['Outfit']">
                  {editingProduct ? 'Edit Formulation Details' : 'Add New Formulation as per Category'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-[#738278] hover:text-[#1C221E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-4 text-xs">
              
              {/* Category Selection (Primary Focus) */}
              <div className="p-4 rounded-2xl bg-[#F7F5EE] border border-[#E4DDD1] space-y-2">
                <label className="block text-[#1C221E] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <FolderTree className="w-3.5 h-3.5 text-[#3B5244]" />
                  <span>Assigned Category *</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#6E8E7C]"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#748278]">
                  Product will be indexed under this category and show up when visitors filter by &ldquo;{category}&rdquo;.
                </p>
              </div>

              {/* Brand & API Molecule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#3B4940] font-semibold mb-1">
                    Brand Name * (e.g. TIGASTIN 50mg)
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. CEFTAZID 1gm"
                    className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#6E8E7C]"
                  />
                </div>
                <div>
                  <label className="block text-[#3B4940] font-semibold mb-1">
                    Active Molecule (API) *
                  </label>
                  <input
                    type="text"
                    required
                    value={genericName}
                    onChange={(e) => setGenericName(e.target.value)}
                    placeholder="e.g. Ceftazidime for Injection USP 1gm"
                    className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#6E8E7C]"
                  />
                </div>
              </div>

              {/* Strength, Pharmacopeia & Dosage Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#3B4940] font-semibold mb-1">
                    Strength / Potency *
                  </label>
                  <input
                    type="text"
                    required
                    value={strength}
                    onChange={(e) => setStrength(e.target.value)}
                    placeholder="e.g. 50mg per vial"
                    className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#6E8E7C]"
                  />
                </div>
                <div>
                  <label className="block text-[#3B4940] font-semibold mb-1">
                    Pharmacopoeia Standard
                  </label>
                  <select
                    value={pharmacopeia}
                    onChange={(e) => setPharmacopeia(e.target.value as any)}
                    className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#6E8E7C]"
                  >
                    <option value="USP">USP (US Pharmacopeia)</option>
                    <option value="IP">IP (Indian Pharmacopoeia)</option>
                    <option value="BP">BP (British Pharmacopoeia)</option>
                    <option value="EP">EP (European Pharmacopoeia)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#3B4940] font-semibold mb-1">
                    Dosage Form
                  </label>
                  <input
                    type="text"
                    value={dosageForm}
                    onChange={(e) => setDosageForm(e.target.value)}
                    placeholder="e.g. Lyophilized Powder for Infusion"
                    className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#6E8E7C]"
                  />
                </div>
              </div>

              {/* Packaging & Storage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#3B4940] font-semibold mb-1">
                    Packaging &amp; Primary Container
                  </label>
                  <input
                    type="text"
                    value={packaging}
                    onChange={(e) => setPackaging(e.target.value)}
                    placeholder="e.g. 10ml USP Type I vial with flip-off seal"
                    className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#6E8E7C]"
                  />
                </div>
                <div>
                  <label className="block text-[#3B4940] font-semibold mb-1">
                    Shelf Life &amp; Storage Conditions
                  </label>
                  <input
                    type="text"
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                    placeholder="e.g. Store below 25°C. Zone IVb stability compliant."
                    className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#6E8E7C]"
                  />
                </div>
              </div>

              {/* Product Packaging Image Selection */}
              <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE5D9] space-y-3">
                <label className="block text-[#1C221E] font-bold uppercase tracking-wider">
                  Product Packaging Image
                </label>

                <div className="flex flex-wrap items-center gap-2">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      type="button"
                      key={preset.url}
                      onClick={() => setImage(preset.url)}
                      className={`p-2 rounded-xl border flex items-center gap-2 transition-all ${
                        image === preset.url 
                          ? 'border-[#6E8E7C] bg-[#EAF2ED] text-[#2F4A39] font-bold' 
                          : 'border-[#DDD5C7] bg-white text-[#55645A]'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-8 h-8 object-contain rounded" />
                      <span className="text-[11px]">{preset.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <label className="btn-cream py-2 px-4 text-xs cursor-pointer flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-[#D96B43]" />
                    <span>Upload Image from Disk</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/products/custom.jpg"
                    className="flex-1 bg-white border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2 text-xs focus:outline-none focus:border-[#6E8E7C]"
                  />
                </div>
              </div>

              {/* Indications & CTD Ready Toggle */}
              <div>
                <label className="block text-[#3B4940] font-semibold mb-1">
                  Clinical Indications / Hospital Applications
                </label>
                <textarea
                  rows={2}
                  value={indications}
                  onChange={(e) => setIndications(e.target.value)}
                  placeholder="Intra-abdominal infections, hospital-acquired pneumonia, acute thrombosis prophylaxis..."
                  className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#6E8E7C]"
                />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F4] border border-[#EAE3D6]">
                <input
                  type="checkbox"
                  id="dossierReady"
                  checked={dossierAvailable}
                  onChange={(e) => setDossierAvailable(e.target.checked)}
                  className="w-4 h-4 text-[#3B5244] rounded"
                />
                <label htmlFor="dossierReady" className="text-xs font-semibold text-[#1C221E] cursor-pointer">
                  CTD Registration Dossier Ready (Modules 1–5 available for overseas regulatory filing)
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-[#EFEBE4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-cream py-2 px-5 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-terracotta py-2 px-7 text-xs font-bold"
                >
                  {editingProduct ? 'Save Formulation Changes' : 'Publish Formulation'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
