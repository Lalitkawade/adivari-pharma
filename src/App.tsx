import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { CareersPage } from './pages/public/CareersPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminDownloads } from './pages/admin/AdminDownloads';
import { useAuth } from './context/AuthContext';
import { ScrollToTop } from './components/public/ScrollToTop';

// Protected Route wrapper for Admin with session check
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5EE] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#D96B43] border-t-transparent animate-spin" />
        <p className="text-xs text-[#738278] font-medium font-mono">Verifying Supabase Session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Storefront Routes with Proper Nomenclature */}
        <Route path="/" element={<HomePage />} />
        
        {/* About Us Page & Aliases */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about-us" element={<Navigate to="/about" replace />} />

        {/* Careers Page & Aliases */}
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/career" element={<Navigate to="/careers" replace />} />

        {/* Formulations & Catalog Redirects */}
        <Route path="/products" element={<Navigate to="/#catalog" replace />} />
        <Route path="/catalog" element={<Navigate to="/#catalog" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />

        {/* Admin Auth Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Suite */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          
          {/* Section 1: Dashboard */}
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Section 2: Categories */}
          <Route path="categories" element={<AdminCategories />} />

          {/* Section 3: Products Catalog */}
          <Route path="products" element={<AdminProducts />} />

          {/* Section 4: Website Leads */}
          <Route path="leads" element={<AdminLeads />} />
          <Route path="quotations" element={<Navigate to="/admin/leads" replace />} />

          {/* Section 5: Download Files */}
          <Route path="downloads" element={<AdminDownloads />} />
          <Route path="settings" element={<Navigate to="/admin/downloads" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
