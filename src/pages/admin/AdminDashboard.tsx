import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { LeadStatus } from '../../lib/types';
import { 
  Package, 
  Inbox, 
  FolderTree, 
  Clock, 
  Globe2, 
  ArrowUpRight, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  TrendingUp,
  Download,
  Layers
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const COLORS = ['#D96B43', '#D97706', '#2E7D32', '#6E8E7C', '#3B5244'];

export const AdminDashboard: React.FC = () => {
  const { products, categories, quotations, metrics, updateQuotationStatus } = useData();

  const normalizeStatus = (status: any): LeadStatus => {
    if (status === 'new') return 'open';
    if (status === 'in_review' || status === 'quoted') return 'pending';
    if (status === 'closed') return 'closed';
    if (status === 'open' || status === 'pending') return status;
    return 'open';
  };

  // Aggregate inquiries by country for BarChart
  const countryCounts: { [key: string]: number } = {};
  quotations.forEach(q => {
    countryCounts[q.country] = (countryCounts[q.country] || 0) + 1;
  });
  const countryChartData = Object.entries(countryCounts).map(([country, count]) => ({
    country,
    count
  }));

  // Aggregate inquiries by status for PieChart
  const statusCounts = {
    'Open (New)': quotations.filter(q => normalizeStatus(q.status) === 'open').length,
    'Pending (Quoting)': quotations.filter(q => normalizeStatus(q.status) === 'pending').length,
    'Closed (Completed)': quotations.filter(q => normalizeStatus(q.status) === 'closed').length
  };
  const statusChartData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  const recentQuotations = quotations.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D7]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C221E] font-['Outfit']">
            Operations &amp; Leads Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#6A7870]">
            Monitor wholesale inquiries, manage formulation categories, and track international orders.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/products"
            className="btn-terracotta text-xs py-2.5 px-4 font-bold flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Formulation</span>
          </Link>
          <Link
            to="/admin/downloads"
            className="btn-cream text-xs py-2.5 px-4 font-bold flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-[#3B5244]" />
            <span>Downloads</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Active Products */}
        <Link 
          to="/admin/products"
          className="bg-white p-5 rounded-2xl border border-[#E8E2D7] shadow-sm space-y-2 hover:border-[#1C221E] transition-all block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#738278]">Catalog Formulations</span>
            <div className="w-8 h-8 rounded-full bg-[#EBF2ED] text-[#3B5244] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1C221E] font-['Outfit']">{metrics.totalProducts}</span>
            <span className="text-xs text-[#2E7D32] font-semibold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> In Catalog
            </span>
          </div>
          <p className="text-[11px] text-[#8A9890]">WHO-GMP parenterals active</p>
        </Link>

        {/* KPI 2: Active Categories */}
        <Link 
          to="/admin/categories"
          className="bg-white p-5 rounded-2xl border border-[#E8E2D7] shadow-sm space-y-2 hover:border-[#1C221E] transition-all block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#738278]">Therapeutic Classes</span>
            <div className="w-8 h-8 rounded-full bg-[#F4F1EA] text-[#4A574E] flex items-center justify-center group-hover:scale-105 transition-transform">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1C221E] font-['Outfit']">{metrics.totalCategories}</span>
            <span className="text-xs text-[#6E8E7C] font-semibold">Categories</span>
          </div>
          <p className="text-[11px] text-[#8A9890]">Active therapeutic categories</p>
        </Link>

        {/* KPI 3: Open Leads (Requiring Action) */}
        <Link 
          to="/admin/leads"
          className="bg-white p-5 rounded-2xl border border-[#E8E2D7] shadow-sm space-y-2 hover:border-[#D96B43] transition-all block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#738278]">Open Leads (Action Needed)</span>
            <div className="w-8 h-8 rounded-full bg-[#FBF0EB] text-[#D96B43] flex items-center justify-center group-hover:scale-105 transition-transform">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#D96B43] font-['Outfit']">{metrics.openQuotations}</span>
            <span className="text-xs text-[#D96B43] font-semibold">New</span>
          </div>
          <p className="text-[11px] text-[#8A9890]">Inquiries awaiting initial response</p>
        </Link>

        {/* KPI 4: Total Leads Captured */}
        <Link 
          to="/admin/leads"
          className="bg-white p-5 rounded-2xl border border-[#E8E2D7] shadow-sm space-y-2 hover:border-[#1C221E] transition-all block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#738278]">Total Website Leads</span>
            <div className="w-8 h-8 rounded-full bg-[#E5EEE8] text-[#2E7D32] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1C221E] font-['Outfit']">{metrics.totalQuotations}</span>
            <span className="text-xs text-[#2E7D32] font-semibold">Captured</span>
          </div>
          <p className="text-[11px] text-[#8A9890]">Across {metrics.totalCountries} countries</p>
        </Link>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Country Breakdown (Col 1-7) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E8E2D7] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1C221E] font-['Outfit']">
                Inquiries by Destination Country
              </h3>
              <p className="text-xs text-[#738278]">Geographic distribution of captured leads</p>
            </div>
            <span className="pill-badge text-[10px]">
              Active Export
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryChartData}>
                <XAxis dataKey="country" stroke="#8C9B92" fontSize={11} />
                <YAxis stroke="#8C9B92" fontSize={11} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FAF8F4', borderColor: '#DDD5C8', borderRadius: '12px', color: '#1C221E' }}
                  itemStyle={{ color: '#D96B43' }}
                />
                <Bar dataKey="count" fill="#3B5244" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Status Breakdown (Col 8-12) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E8E2D7] shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#1C221E] font-['Outfit']">
              Lead Fulfillment Pipeline
            </h3>
            <p className="text-xs text-[#738278]">Open, Pending, and Closed status distribution</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name.split(' ')[0]}: ${value}`}
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FAF8F4', borderColor: '#DDD5C8', borderRadius: '12px', color: '#1C221E' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Leads Table with Instant Status Action */}
      <div className="bg-white rounded-3xl border border-[#E8E2D7] shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#EFEBE4]">
          <div>
            <h3 className="text-base font-bold text-[#1C221E] font-['Outfit']">
              Recent Website Leads &amp; RFQs
            </h3>
            <p className="text-xs text-[#738278]">Latest commercial inquiries submitted by importers</p>
          </div>
          <Link
            to="/admin/leads"
            className="text-xs text-[#D96B43] hover:text-[#C45A34] font-bold flex items-center gap-1"
          >
            <span>View All Leads ({quotations.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFEBE4] text-[#738278]">
                <th className="pb-3 font-semibold">Track #</th>
                <th className="pb-3 font-semibold">Importer / Buyer</th>
                <th className="pb-3 font-semibold">Country</th>
                <th className="pb-3 font-semibold">Requested Formulations</th>
                <th className="pb-3 font-semibold text-center">Status Action</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE8]">
              {recentQuotations.map((rfq) => {
                const status = normalizeStatus(rfq.status);
                return (
                  <tr key={rfq.id} className="hover:bg-[#FAF8F3] transition-colors">
                    <td className="py-3 font-mono font-bold text-[#D96B43]">
                      {rfq.referenceNumber}
                    </td>
                    <td className="py-3">
                      <p className="font-bold text-[#1C221E]">{rfq.companyName}</p>
                      <p className="text-[10px] text-[#738278]">{rfq.contactPerson}</p>
                    </td>
                    <td className="py-3 text-[#3E4F44] font-medium">
                      {rfq.country}
                    </td>
                    <td className="py-3 text-[#3E4F44] max-w-xs truncate">
                      {rfq.items.map(i => `${i.productName} (${i.quantity.toLocaleString()} ${i.unit})`).join(', ')}
                    </td>
                    
                    {/* Instant Status Action Selector */}
                    <td className="py-3 text-center">
                      <select
                        value={status}
                        onChange={(e) => updateQuotationStatus(rfq.id, e.target.value as LeadStatus)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border focus:outline-none transition-all ${
                          status === 'open'
                            ? 'bg-[#FBF0EB] text-[#D96B43] border-[#F5D5C6]'
                            : status === 'pending'
                            ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                            : 'bg-[#E5EEE8] text-[#2E7D32] border-[#CDE0D3]'
                        }`}
                      >
                        <option value="open">● Open</option>
                        <option value="pending">● Pending</option>
                        <option value="closed">● Closed</option>
                      </select>
                    </td>

                    <td className="py-3 text-right">
                      <Link
                        to="/admin/leads"
                        className="inline-flex items-center gap-1 text-xs text-[#3B5244] hover:text-[#D96B43] font-bold bg-[#F2EFE8] px-3 py-1 rounded-full border border-[#DDD5C7]"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Details</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
