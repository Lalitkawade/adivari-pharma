import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Category } from '../../lib/types';
import { 
  FolderTree, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  Package, 
  Layers, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminCategories: React.FC = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useData();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter category name.');
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (editingCategory) {
      await updateCategory(editingCategory.id, { name, description, slug });
    } else {
      await addCategory({ name, description, slug });
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (cat: Category) => {
    const productCount = products.filter(p => p.category === cat.name).length;
    if (productCount > 0) {
      toast.error(`Cannot delete "${cat.name}". ${productCount} formulation(s) are assigned to this category. Please reassign them first.`);
      return;
    }

    if (window.confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
      await deleteCategory(cat.id);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D7]">
        <div>
          <h1 className="text-2xl font-bold text-[#1C221E] font-['Outfit']">
            Therapeutic Categories Management
          </h1>
          <p className="text-xs text-[#738278]">
            Organize injectable therapeutics by therapeutic class. Categories directly power public catalog filters and product additions.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-terracotta text-xs py-2.5 px-5 font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Search Bar & Summary Card */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D7] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C9B92] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-full pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#6E8E7C]"
          />
        </div>

        <div className="text-xs font-mono text-[#738278] flex items-center gap-2">
          <span>Total Categories: <strong className="text-[#1C221E]">{categories.length}</strong></span>
          <span>•</span>
          <span>Assigned Products: <strong className="text-[#1C221E]">{products.length}</strong></span>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2D7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFEBE4] bg-[#F7F5EE] text-[#6E7C73]">
                <th className="py-3.5 px-4 font-semibold">Category Name</th>
                <th className="py-3.5 px-4 font-semibold">Description / Scope</th>
                <th className="py-3.5 px-4 font-semibold text-center">Assigned Products</th>
                <th className="py-3.5 px-4 font-semibold">Slug / Key</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE8]">
              {filteredCategories.map((cat) => {
                const count = products.filter(p => p.category === cat.name).length;
                return (
                  <tr key={cat.id} className="hover:bg-[#FAF8F4] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#EBF2ED] text-[#3B5244] flex items-center justify-center font-bold shrink-0">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-[#1C221E] text-sm font-['Outfit']">{cat.name}</p>
                          <span className="text-[10px] text-[#6E8E7C] font-semibold">Active Class</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#4A574E] max-w-md">
                      <p className="line-clamp-2 leading-relaxed">{cat.description || 'No description provided.'}</p>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                        count > 0 
                          ? 'bg-[#E5EEE8] text-[#344B3D]' 
                          : 'bg-[#F2ECE1] text-[#7A644D]'
                      }`}>
                        {count} {count === 1 ? 'Product' : 'Products'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#748278]">
                      {cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 rounded-full bg-[#EFECE5] text-[#3B4D41] hover:text-[#D96B43] hover:bg-[#E2DBD0] transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat)}
                          className="p-1.5 rounded-full bg-[#FAF0EB] text-[#D96B43] hover:bg-[#F5DFD6] transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C2520]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white border border-[#E4DDD1] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 border-b border-[#EFEBE2] flex items-center justify-between bg-[#F7F5EE]">
              <div className="flex items-center gap-2.5">
                <FolderTree className="w-5 h-5 text-[#3B5244]" />
                <h3 className="text-base font-bold text-[#1C221E] font-['Outfit']">
                  {editingCategory ? 'Edit Therapeutic Category' : 'Add New Therapeutic Category'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-[#738278] hover:text-[#1C221E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[#3B4940] font-semibold mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Critical Care & Antibiotics, Oncology Parenterals"
                  className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#6E8E7C]"
                />
              </div>

              <div>
                <label className="block text-[#3B4940] font-semibold mb-1">
                  Description / Therapeutic Focus
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline the clinical indications, active formulations, or hospital care level under this category..."
                  className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#6E8E7C]"
                />
              </div>

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
                  className="btn-terracotta py-2 px-6 text-xs font-bold"
                >
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
