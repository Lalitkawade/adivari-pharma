import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Lock, 
  Mail, 
  Key, 
  Globe2, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Loader2,
  CheckCircle2
} from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin/dashboard');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const success = await resetPassword(email);
      if (success) {
        setResetSent(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EE] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="relative w-full max-w-md bg-white p-8 rounded-3xl border border-[#E5DFD4] shadow-xl space-y-6">
        
        {/* Logo and title */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white p-1 mx-auto flex items-center justify-center border border-[#E5DFD4] shadow-md overflow-hidden">
            <img 
              src="/images/Adivari Pharmaceutical Logo with Leaf and Capsule.png" 
              alt="Adivari Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#1C221E] font-['Outfit'] tracking-tight">
              ADIVARI ADMIN PORTAL
            </h2>
            <p className="text-xs text-[#738278] mt-0.5">
              Authorized Executive Access
            </p>
          </div>
        </div>

        {view === 'login' ? (
          /* Sign In Form */
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#3B4940] font-semibold mb-1">
                Admin Corporate Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8B9B91] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@adivaripharma.com"
                  className="w-full bg-[#FAF8F4] border border-[#DDD5C8] text-[#1C221E] rounded-xl p-2.5 pl-9 focus:outline-none focus:border-[#6E8E7C]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[#3B4940] font-semibold">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetSent(false);
                    setView('forgot');
                  }}
                  className="text-[11px] text-[#D96B43] hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-[#8B9B91] absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FAF8F4] border border-[#DDD5C8] text-[#1C221E] rounded-xl p-2.5 pl-9 pr-10 focus:outline-none focus:border-[#6E8E7C]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#8B9B91] hover:text-[#1C221E] p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-terracotta w-full py-2.5 text-xs font-bold justify-center disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In to Portal</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Forgot Password View */
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#1C221E] font-['Outfit']">
                Reset Password
              </h3>
              <p className="text-xs text-[#738278]">
                Enter your registered admin email and we will send you a password reset link.
              </p>
            </div>

            {resetSent ? (
              <div className="p-4 rounded-2xl bg-[#EBF3EE] border border-[#CDE1D4] text-[#2F5A3E] space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  <span>Reset Link Sent!</span>
                </div>
                <p className="text-xs leading-relaxed text-[#3B664B]">
                  We have sent instructions to <strong>{email}</strong>. Please check your inbox and click the link to choose a new password.
                </p>
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="btn-terracotta w-full py-2 text-xs font-bold justify-center mt-3"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-[#3B4940] font-semibold mb-1">
                    Corporate Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8B9B91] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@adivaripharma.com"
                      className="w-full bg-[#FAF8F4] border border-[#DDD5C8] text-[#1C221E] rounded-xl p-2.5 pl-9 focus:outline-none focus:border-[#6E8E7C]"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-terracotta w-full py-2.5 text-xs font-bold justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <span>Send Password Reset Link</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="w-full py-2 text-xs text-[#6F7D74] hover:text-[#1C221E] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Return to public website */}
        <div className="pt-2 border-t border-[#EFEBE3] text-center">
          <Link
            to="/"
            className="text-xs text-[#6F7D74] hover:text-[#D96B43] transition-colors inline-flex items-center gap-1 font-semibold"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Return to Public Storefront</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
