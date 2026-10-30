import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  LayoutDashboard, 
  FolderTree,
  Package, 
  Inbox, 
  DownloadCloud, 
  LogOut, 
  Globe, 
  Menu, 
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { quotations } = useData();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Count open leads needing action
  const openLeadsCount = quotations.filter(q => q.status === 'open' || (q.status as any) === 'new').length;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // The 5 clean, production admin sections requested by the user
  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      to: '/admin/categories',
      label: 'Categories',
      icon: FolderTree
    },
    {
      to: '/admin/products',
      label: 'Products Catalog',
      icon: Package
    },
    {
      to: '/admin/leads',
      label: 'Website Leads',
      icon: Inbox,
      badge: openLeadsCount > 0 ? openLeadsCount : undefined
    },
    {
      to: '/admin/downloads',
      label: 'Download Files',
      icon: DownloadCloud
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5EE] text-[#1C221E] flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white px-4 py-3 flex items-center justify-between border-b border-[#E8E2D7]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-[#E2DDD2] flex items-center justify-center overflow-hidden shadow-xs">
            <img 
              src="/images/Adivari Pharmaceutical Logo with Leaf and Capsule.png" 
              alt="Adivari Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-bold text-[#1C221E] font-['Outfit']">ADIVARI ADMIN</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-[#EFECE3] text-[#334237]"
          aria-label="Toggle navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#F2EFE8] border-r border-[#E3DDD1] p-5 flex flex-col justify-between transition-transform duration-300
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-6">
          
          {/* Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E2DBD0]">
            <Link to="/" className="flex items-center gap-3 text-decoration-none group">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-[#E2DDD2] shadow-xs group-hover:border-[#3B5244] transition-all overflow-hidden">
                <img 
                  src="/images/Adivari Pharmaceutical Logo with Leaf and Capsule.png" 
                  alt="Adivari Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-[#1C221E] font-['Outfit'] text-sm tracking-wide">
                  Adivari Pharma
                </h3>
                <p className="text-[10px] text-[#6E8E7C] uppercase tracking-widest font-extrabold">
                  Admin Operations
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold transition-all
                    ${isActive 
                      ? 'bg-[#3B5244] text-white shadow-sm' 
                      : 'text-[#4A574E] hover:text-[#1C221E] hover:bg-[#E8E4DA]'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D96B43] text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer Actions */}
        <div className="pt-4 border-t border-[#E2DBD0] space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-full bg-white hover:bg-[#FAF8F3] text-xs text-[#3B5244] border border-[#DDD5C7] font-semibold transition-colors shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Open Public Storefront</span>
          </Link>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="truncate">
              <p className="text-[#1C221E] font-bold truncate">{user?.name || 'Operations Lead'}</p>
              <p className="text-[10px] text-[#748278] truncate">{user?.email || 'admin@adivaripharma.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-[#7F8D85] hover:text-[#D96B43] hover:bg-[#FBECE6] rounded-full transition-colors"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
        <Outlet />
      </main>

    </div>
  );
};
