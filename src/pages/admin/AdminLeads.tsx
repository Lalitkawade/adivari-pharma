import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { QuotationRequest, LeadStatus } from '../../lib/types';
import { 
  Inbox, 
  Search, 
  Eye, 
  X, 
  Mail, 
  Phone, 
  Building2, 
  Globe2, 
  Download, 
  Trash2, 
  Save,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminLeads: React.FC = () => {
  const { quotations, updateQuotationStatus, deleteQuotation } = useData();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all');
  const [selectedLead, setSelectedLead] = useState<QuotationRequest | null>(null);

  // Modal Editing State
  const [activeStatus, setActiveStatus] = useState<LeadStatus>('open');
  const [adminNotes, setAdminNotes] = useState('');

  const normalizeStatus = (status: any): LeadStatus => {
    if (status === 'new') return 'open';
    if (status === 'in_review' || status === 'quoted') return 'pending';
    if (status === 'closed') return 'closed';
    if (status === 'open' || status === 'pending') return status;
    return 'open';
  };

  const openDetails = (lead: QuotationRequest) => {
    setSelectedLead(lead);
    setActiveStatus(normalizeStatus(lead.status));
    setAdminNotes(lead.adminNotes || '');
  };

  const handleRowStatusChange = async (id: string, newStatus: LeadStatus) => {
    await updateQuotationStatus(id, newStatus);
  };

  const handleSaveModalStatusAndNotes = async () => {
    if (!selectedLead) return;
    await updateQuotationStatus(selectedLead.id, activeStatus, adminNotes);
    setSelectedLead(prev => prev ? { ...prev, status: activeStatus, adminNotes } : null);
  };

  const handleDelete = async (id: string, refNum: string) => {
    if (window.confirm(`Are you sure you want to delete lead ${refNum}?`)) {
      await deleteQuotation(id);
      if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const exportLeadsToCSV = () => {
    const headers = ['RefNumber', 'Company', 'ContactPerson', 'Email', 'Phone', 'Country', 'PortOfEntry', 'Incoterms', 'Status', 'Date', 'AdminNotes'];
    const rows = quotations.map(q => [
      q.referenceNumber,
      `"${q.companyName.replace(/"/g, '""')}"`,
      `"${q.contactPerson.replace(/"/g, '""')}"`,
      q.email,
      q.phone || '',
      `"${q.country.replace(/"/g, '""')}"`,
      `"${(q.portOfEntry || '').replace(/"/g, '""')}"`,
      q.incoterms || 'CIF',
      normalizeStatus(q.status),
      q.createdAt,
      `"${(q.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `adivari_website_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Website leads exported to CSV!');
  };

  const filtered = quotations.filter(q => {
    const query = search.toLowerCase();
    const currentStatus = normalizeStatus(q.status);

    const matchesSearch = 
      q.referenceNumber.toLowerCase().includes(query) ||
      q.companyName.toLowerCase().includes(query) ||
      q.contactPerson.toLowerCase().includes(query) ||
      q.email.toLowerCase().includes(query) ||
      q.country.toLowerCase().includes(query);
    
    const matchesStatus = statusFilter === 'all' || currentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCount = quotations.filter(q => normalizeStatus(q.status) === 'open').length;
  const pendingCount = quotations.filter(q => normalizeStatus(q.status) === 'pending').length;
  const closedCount = quotations.filter(q => normalizeStatus(q.status) === 'closed').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D7]">
        <div>
          <h1 className="text-2xl font-bold text-[#1C221E] font-['Outfit']">
            Website Leads &amp; Quotation Inquiries
          </h1>
          <p className="text-xs text-[#738278]">
            Capture and process wholesale inquiries, hospital tenders, and express sample requests submitted from the website.
          </p>
        </div>

        <button
          onClick={exportLeadsToCSV}
          className="btn-cream text-xs py-2 px-4 font-bold flex items-center gap-2"
        >
          <Download className="w-3.5 h-3.5 text-[#D96B43]" />
          <span>Export Leads CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D7] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              statusFilter === 'all'
                ? 'bg-[#1C221E] text-white shadow-sm'
                : 'bg-[#F2EFE8] text-[#55645A] hover:bg-[#E6E2D8]'
            }`}
          >
            <span>All Leads</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">{quotations.length}</span>
          </button>

          <button
            onClick={() => setStatusFilter('open')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              statusFilter === 'open'
                ? 'bg-[#D96B43] text-white shadow-sm'
                : 'bg-[#FBF0EB] text-[#C45A34] hover:bg-[#F7E1D7]'
            }`}
          >
            <AlertCircle className="w-3 h-3" />
            <span>Open (New)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/25">{openCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              statusFilter === 'pending'
                ? 'bg-[#D97706] text-white shadow-sm'
                : 'bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A]'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Pending</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/25">{pendingCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter('closed')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              statusFilter === 'closed'
                ? 'bg-[#2E7D32] text-white shadow-sm'
                : 'bg-[#E5EEE8] text-[#2E7D32] hover:bg-[#D5E5DA]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Closed</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/25">{closedCount}</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8C9B92] absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, person, country..."
            className="w-full bg-[#FAF8F4] border border-[#DDD5C7] text-[#1C221E] rounded-full pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#6E8E7C]"
          />
        </div>

      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2D7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFEBE4] bg-[#F7F5EE] text-[#6E7C73]">
                <th className="py-3.5 px-4 font-semibold">Track #</th>
                <th className="py-3.5 px-4 font-semibold">Importer / Company</th>
                <th className="py-3.5 px-4 font-semibold">Country &amp; Port</th>
                <th className="py-3.5 px-4 font-semibold">Requested Formulations</th>
                <th className="py-3.5 px-4 font-semibold">Incoterms</th>
                <th className="py-3.5 px-4 font-semibold text-center">Status Action</th>
                <th className="py-3.5 px-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE8]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#738278]">
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => {
                  const status = normalizeStatus(lead.status);
                  return (
                    <tr key={lead.id} className="hover:bg-[#FAF8F4] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#D96B43] whitespace-nowrap">
                        {lead.referenceNumber}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-[#1C221E]">{lead.companyName}</p>
                        <p className="text-[10px] text-[#738278]">{lead.contactPerson}</p>
                        <p className="text-[10px] text-[#6E8E7C] font-semibold">{lead.email}</p>
                      </td>
                      <td className="py-3 px-4 text-[#3E4F44]">
                        <p className="font-bold text-[#1C221E]">{lead.country}</p>
                        <p className="text-[10px] text-[#738278]">{lead.portOfEntry || 'Direct Airport'}</p>
                      </td>
                      <td className="py-3 px-4 text-[#3E4F44] max-w-xs">
                        {lead.items.map((i, idx) => (
                          <div key={idx} className="truncate">
                            <span className="font-semibold text-[#1C221E]">{i.productName}</span>: {i.quantity.toLocaleString()} {i.unit}
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-[#EFEBE4] text-[#3B4D41] font-mono font-bold text-[10px]">
                          {lead.incoterms}
                        </span>
                      </td>
                      
                      {/* One-Click Status Selector Action */}
                      <td className="py-3 px-4 text-center">
                        <select
                          value={status}
                          onChange={(e) => handleRowStatusChange(lead.id, e.target.value as LeadStatus)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider cursor-pointer border focus:outline-none transition-all ${
                            status === 'open'
                              ? 'bg-[#FBF0EB] text-[#D96B43] border-[#F5D5C6]'
                              : status === 'pending'
                              ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                              : 'bg-[#E5EEE8] text-[#2E7D32] border-[#CDE0D3]'
                          }`}
                        >
                          <option value="open">● Open (New)</option>
                          <option value="pending">● Pending (Quoting)</option>
                          <option value="closed">● Closed (Completed)</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openDetails(lead)}
                            className="btn-cream py-1 px-3 text-xs font-bold"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#3B5244]" />
                            <span>View Details</span>
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id, lead.referenceNumber)}
                            className="p-1 rounded-full text-[#9CA7A0] hover:text-[#D96B43] transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C2520]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white border border-[#E4DDD1] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#EFEBE2] flex items-center justify-between bg-[#F7F5EE]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#3B5244] text-white flex items-center justify-center">
                  <Inbox className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1C221E] font-['Outfit']">
                    Lead Inquiry #{selectedLead.referenceNumber}
                  </h3>
                  <p className="text-xs text-[#6E8E7C] font-medium">
                    Received on {new Date(selectedLead.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-full text-[#738278] hover:text-[#1C221E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-4 text-xs">
              
              {/* Importer Overview Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF8F4] border border-[#EAE3D6]">
                <div>
                  <span className="text-[#7F8D85] block mb-0.5">Company / Organization:</span>
                  <p className="text-[#1C221E] font-bold text-sm">{selectedLead.companyName}</p>
                </div>
                <div>
                  <span className="text-[#7F8D85] block mb-0.5">Contact Person:</span>
                  <p className="text-[#1C221E] font-semibold">{selectedLead.contactPerson}</p>
                </div>
                <div>
                  <span className="text-[#7F8D85] block mb-0.5">Corporate Email:</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-[#D96B43] font-bold hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#7F8D85] block mb-0.5">Phone / WhatsApp:</span>
                  <p className="text-[#1C221E] font-semibold">{selectedLead.phone || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-[#7F8D85] block mb-0.5">Country &amp; Incoterms:</span>
                  <p className="text-[#1C221E] font-bold">
                    {selectedLead.country} ({selectedLead.incoterms})
                  </p>
                </div>
                <div>
                  <span className="text-[#7F8D85] block mb-0.5">Buyer Classification:</span>
                  <p className="text-[#1C221E] font-semibold">{selectedLead.organizationType}</p>
                </div>
              </div>

              {/* Formulations Requested */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#1C221E] uppercase tracking-wider">
                  Requested Formulations &amp; Volume
                </h4>
                {selectedLead.items.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF8F4] border border-[#EAE3D6] flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#1C221E]">{item.productName}</p>
                      {item.notes && <p className="text-[11px] text-[#738278]">{item.notes}</p>}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#D96B43] bg-white px-3 py-1 rounded-full border border-[#EAE3D6]">
                      {item.quantity.toLocaleString()} {item.unit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Message */}
              {selectedLead.message && (
                <div className="space-y-1">
                  <h4 className="font-bold text-[#1C221E] uppercase tracking-wider">
                    Client Requirements / Message
                  </h4>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#EAE3D6] text-[#4D5A52] leading-relaxed">
                    {selectedLead.message}
                  </div>
                </div>
              )}

              {/* Status Action & Internal Notes */}
              <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#E2DBD0] space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <label className="block text-[#1C221E] font-bold mb-1">
                      Lead Status Action (Open, Pending, Closed)
                    </label>
                    <select
                      value={activeStatus}
                      onChange={(e) => setActiveStatus(e.target.value as LeadStatus)}
                      className="bg-white border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2 text-xs font-semibold focus:outline-none focus:border-[#6E8E7C]"
                    >
                      <option value="open">Open (New Inquiry - Action Needed)</option>
                      <option value="pending">Pending (In Review - Quoting)</option>
                      <option value="closed">Closed (Quotation Finalized / Deal Closed)</option>
                    </select>
                  </div>

                  <a
                    href={`mailto:${selectedLead.email}?subject=Commercial Quotation - ${selectedLead.referenceNumber} - Adivari Pharmaceuticals`}
                    className="btn-terracotta py-2 px-4 text-xs font-bold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply to Importer</span>
                  </a>
                </div>

                <div>
                  <label className="block text-[#4A574E] font-semibold mb-1">
                    Internal Sales Manager Notes (Only visible inside admin panel)
                  </label>
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Enter FOB/CIF quote rates, dispatch timelines, regulatory COA notes..."
                    className="w-full bg-white border border-[#DDD5C7] text-[#1C221E] rounded-xl p-2 text-xs focus:outline-none focus:border-[#6E8E7C]"
                  />
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#F7F5EE] border-t border-[#EAE3D5] flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedLead.id, selectedLead.referenceNumber)}
                className="text-[#D96B43] hover:underline text-xs flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="btn-cream py-2 px-4 text-xs"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveModalStatusAndNotes}
                  className="btn-terracotta py-2 px-5 text-xs font-bold"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Status &amp; Notes</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
