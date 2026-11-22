import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Globe2, 
  Send, 
  AlertCircle, 
  FileText, 
  Building2,
  ShieldCheck,
  TrendingUp,
  Link as LinkIcon,
  Mail,
  Phone,
  Sparkles,
  Award
} from 'lucide-react';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import { RfqModal } from '../../components/public/RfqModal';
import { StickyContactWidget } from '../../components/public/StickyContactWidget';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

const DEPARTMENTS = [
  'Regulatory Affairs & CTD Dossiers',
  'Quality Assurance & Quality Control (QA/QC)',
  'International Business Development & Exports',
  'Formulation R&D & Sterile Manufacturing',
  'Supply Chain & Cold-Chain Logistics',
  'Finance, Trade Operations & Administration',
  'General / Other Department'
];

const EXPERIENCE_LEVELS = [
  'Fresher / Entry-Level (0–1 Years)',
  'Junior Associate (1–3 Years)',
  'Mid-Level Specialist (3–5 Years)',
  'Senior Lead / Executive (5–8 Years)',
  'Managerial / Directorate (8+ Years)'
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{6,20}$/;

export const CareersPage: React.FC = () => {
  const { addQuotation } = useData();
  
  // Quotation Modal state
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const handleOpenRfq = () => setIsRfqOpen(true);

  // Application Form Fields
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [desiredRole, setDesiredRole] = useState('');
  const [experience, setExperience] = useState(EXPERIENCE_LEVELS[1]);
  const [currentCompany, setCurrentCompany] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [coverNote, setCoverNote] = useState('');

  // Validation State for Application Form
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (field: string, val: string): string | null => {
    const trimmed = val.trim();
    switch (field) {
      case 'applicantName':
        if (!trimmed) return 'Full name is required.';
        if (trimmed.length < 2) return 'Full name must be at least 2 characters.';
        return null;
      case 'applicantEmail':
        if (!trimmed) return 'Email address is required.';
        if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address (e.g. name@domain.com).';
        return null;
      case 'applicantPhone':
        if (!trimmed) return 'Phone or WhatsApp contact number is required.';
        if ((trimmed.match(/\d/g) || []).length < 7 || !PHONE_REGEX.test(trimmed)) {
          return 'Please enter a valid phone number with country code.';
        }
        return null;
      case 'desiredRole':
        if (!trimmed) return 'Desired role or position title is required.';
        if (trimmed.length < 2) return 'Position title must be at least 2 characters.';
        return null;
      case 'portfolioLink':
        if (!trimmed) return 'Resume link or LinkedIn profile URL is required.';
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.includes('linkedin.com')) {
          return 'Please enter a valid web URL (e.g. https://linkedin.com/in/username or Google Drive CV link).';
        }
        return null;
      default:
        return null;
    }
  };

  const handleBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors(prev => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  };

  const handleChange = (field: string, value: string, setter: (v: string) => void) => {
    setter(value);
    if (touched[field] || errors[field]) {
      const err = validateField(field, value);
      setErrors(prev => {
        const next = { ...prev };
        if (err) next[field] = err;
        else delete next[field];
        return next;
      });
    }
  };

  const scrollToApply = (e: React.MouseEvent) => {
    e.preventDefault();
    const applyEl = document.getElementById('apply-form');
    if (applyEl) {
      applyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      applicantName: true,
      applicantEmail: true,
      applicantPhone: true,
      desiredRole: true,
      portfolioLink: true
    });

    const newErrors: Record<string, string> = {};
    const nErr = validateField('applicantName', applicantName);
    if (nErr) newErrors.applicantName = nErr;

    const eErr = validateField('applicantEmail', applicantEmail);
    if (eErr) newErrors.applicantEmail = eErr;

    const pErr = validateField('applicantPhone', applicantPhone);
    if (pErr) newErrors.applicantPhone = pErr;

    const rErr = validateField('desiredRole', desiredRole);
    if (rErr) newErrors.desiredRole = rErr;

    const lErr = validateField('portfolioLink', portfolioLink);
    if (lErr) newErrors.portfolioLink = lErr;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please correct the highlighted fields with red borders.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addQuotation({
        companyName: `Career Application: ${desiredRole.trim()}`,
        contactPerson: applicantName.trim(),
        email: applicantEmail.trim(),
        phone: applicantPhone.trim(),
        country: 'India / International Candidate',
        organizationType: 'Job Applicant',
        incoterms: 'N/A',
        items: [
          {
            productId: 'career-submission',
            productName: `Job Application: ${desiredRole.trim()} (${department})`,
            quantity: 1,
            unit: experience
          }
        ],
        message: `Candidate Name: ${applicantName.trim()} | Desired Position: ${desiredRole.trim()} | Department: ${department} | Experience: ${experience} | Current Organization: ${currentCompany.trim() || 'N/A'} | Resume/LinkedIn Link: ${portfolioLink.trim()} | Notes: ${coverNote.trim() || 'No cover note provided.'}`
      });

      setIsSubmitted(true);
      toast.success('Application submitted successfully! Our HR desk will review your profile.');
    } catch (err) {
      console.error(err);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setDesiredRole('');
    setCurrentCompany('');
    setPortfolioLink('');
    setCoverNote('');
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#ECEAE4] text-[#141414] flex flex-col font-sans">
      {/* Top Header */}
      <Navbar onOpenRfq={handleOpenRfq} />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-xs text-[#7A7569]">
            <Link to="/" className="hover:text-[#141414] transition-colors font-medium">Home</Link>
            <span>/</span>
            <span className="text-[#141414] font-semibold">Careers</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 md:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DFDCD4] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E2CA40] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#58554D]">
              TALENT &amp; CAREERS • ADIVARI PHARMACEUTICALS PRIVATE LIMITED
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#141414] font-['Plus_Jakarta_Sans'] leading-[1.14] max-w-4xl mx-auto">
            Build Your Career with a Global Pharmaceutical Exporter
          </h1>

          <p className="text-sm sm:text-base text-[#58554D] leading-relaxed max-w-2xl mx-auto">
            At <strong>ADIVARI PHARMACEUTICALS PRIVATE LIMITED</strong>, our team drives high-quality sterile injectables and therapeutic solutions to international healthcare networks across 25+ countries. We welcome passionate pharmaceutical professionals across diverse functional disciplines.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={scrollToApply}
              className="btn-sensiq-black"
            >
              <span>Submit Online Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="mailto:careers@adivaripharma.com?subject=Job%20Application%20-%20Adivari%20Pharmaceuticals"
              className="btn-sensiq-white"
            >
              <Mail className="w-3.5 h-3.5 text-[#58554D]" />
              <span>Email CV Directly</span>
            </a>
          </div>
        </section>

        {/* Core Pillars / Workplace Culture */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                WHO-GMP Cleanroom Standards
              </h3>
              <p className="text-xs text-[#635F55] leading-relaxed">
                Work closely with aseptic filling lines, lyophilization technologies, and international pharmacopoeial standards (USP/BP/IP).
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                Global Regulatory Exposure
              </h3>
              <p className="text-xs text-[#635F55] leading-relaxed">
                Engage in cross-border registrations, CTD dossier submissions, and health authority liaison across Latin America, MENA, Africa, and CIS.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                Merit-Based Progression
              </h3>
              <p className="text-xs text-[#635F55] leading-relaxed">
                We foster a culture where initiative, technical acumen, and operational excellence are recognized and rewarded with clear career advancement.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DFDCD4] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-[#DFDCD4] flex items-center justify-center text-[#141414]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                Inclusive &amp; Collaborative
              </h3>
              <p className="text-xs text-[#635F55] leading-relaxed">
                A respectful, transparent workplace bringing together formulation scientists, QA professionals, trade specialists, and logisticians.
              </p>
            </div>
          </div>
        </section>

        {/* Hiring Focus Areas & Functional Disciplines */}
        <section className="py-12 bg-white border-y border-[#DFDCD4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A857A]">
                TALENT INTAKE &amp; FUNCTIONAL DIVISIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight font-['Plus_Jakarta_Sans']">
                Functional Areas We Actively Hire &amp; Welcome Talent For
              </h2>
              <p className="text-xs sm:text-sm text-[#58554D] leading-relaxed">
                Whether you are an experienced pharmaceutical specialist or a driven graduate, we accept applications on an ongoing basis across our core corporate, formulation, and commercial divisions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              <div className="p-6 rounded-3xl bg-[#FAF9F5] border border-[#DFDCD4] space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E2CA40]" />
                  <h4 className="font-bold text-[#141414] text-sm font-['Plus_Jakarta_Sans']">
                    Regulatory Affairs &amp; Dossiers
                  </h4>
                </div>
                <p className="text-xs text-[#635F55] leading-relaxed">
                  Compilation and technical evaluation of CTD / ACTD Modules 1 to 5, response to foreign MOH deficiency queries, and regulatory life-cycle maintenance.
                </p>
                <div className="text-[11px] font-mono text-[#8A857A]">
                  Location: Mumbai HQ • Full-Time
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF9F5] border border-[#DFDCD4] space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E2CA40]" />
                  <h4 className="font-bold text-[#141414] text-sm font-['Plus_Jakarta_Sans']">
                    Quality Assurance &amp; QC
                  </h4>
                </div>
                <p className="text-xs text-[#635F55] leading-relaxed">
                  Aseptic process validation, cleanroom environmental monitoring, batch record review, deviations/CAPA handling, and WHO-GMP audit readiness.
                </p>
                <div className="text-[11px] font-mono text-[#8A857A]">
                  Location: Mumbai Manufacturing Facility • Full-Time
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF9F5] border border-[#DFDCD4] space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E2CA40]" />
                  <h4 className="font-bold text-[#141414] text-sm font-['Plus_Jakarta_Sans']">
                    International Business Development
                  </h4>
                </div>
                <p className="text-xs text-[#635F55] leading-relaxed">
                  Overseas distributor onboarding, international tender bidding, wholesale CIF/FOB proforma pricing, and overseas market expansion.
                </p>
                <div className="text-[11px] font-mono text-[#8A857A]">
                  Location: Mumbai / International Desk • Full-Time
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF9F5] border border-[#DFDCD4] space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E2CA40]" />
                  <h4 className="font-bold text-[#141414] text-sm font-['Plus_Jakarta_Sans']">
                    Formulation R&amp;D &amp; Lyophilization
                  </h4>
                </div>
                <p className="text-xs text-[#635F55] leading-relaxed">
                  Lyophilization cycle optimization, thermodynamic stabilization of heat-labile antibiotics, and scale-up tech transfers.
                </p>
                <div className="text-[11px] font-mono text-[#8A857A]">
                  Location: Mumbai Formulation Labs • Full-Time
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF9F5] border border-[#DFDCD4] space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E2CA40]" />
                  <h4 className="font-bold text-[#141414] text-sm font-['Plus_Jakarta_Sans']">
                    Supply Chain &amp; Cold-Chain Logistics
                  </h4>
                </div>
                <p className="text-xs text-[#635F55] leading-relaxed">
                  Temperature-controlled ocean and air freight coordination via JNPT Seaport and Mumbai Airport (BOM), shipping documentation, and customs clearance.
                </p>
                <div className="text-[11px] font-mono text-[#8A857A]">
                  Location: Mumbai Logistics Hub • Full-Time
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF9F5] border border-[#DFDCD4] space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E2CA40]" />
                  <h4 className="font-bold text-[#141414] text-sm font-['Plus_Jakarta_Sans']">
                    Finance &amp; Commercial Trade Operations
                  </h4>
                </div>
                <p className="text-xs text-[#635F55] leading-relaxed">
                  Letters of Credit (LC) execution, export invoicing, consular legalization, and trade contract documentation.
                </p>
                <div className="text-[11px] font-mono text-[#8A857A]">
                  Location: Mumbai Corporate Office • Full-Time
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Application Form Section (Anyone Can Apply with RED BORDER Validation) */}
        <section id="apply-form" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[40px] p-6 sm:p-10 border border-[#DFDCD4] shadow-sm">
            
            <div className="space-y-3 pb-6 border-b border-[#EFECE5] text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EC] border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#4A463B]">
                <Briefcase className="w-3.5 h-3.5" />
                <span>DIRECT TALENT APPLICATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
                Submit Your Application to Adivari Pharmaceuticals
              </h2>
              <p className="text-xs sm:text-sm text-[#58554D] leading-relaxed">
                Interested in joining our team? Fill out the application form below. Our HR and technical hiring panel reviews all submissions and contacts qualified candidates within 3–5 business days.
              </p>
            </div>

            {/* Application Success Screen */}
            {isSubmitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#E5EEE7] text-[#2E7D32] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#141414] font-['Plus_Jakarta_Sans']">
                    Application Successfully Submitted!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#58554D] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#141414]">{applicantName}</strong>. Your profile for <strong className="text-[#141414]">{desiredRole}</strong> in <strong className="text-[#141414]">{department}</strong> has been transmitted to our talent acquisition desk.
                  </p>
                </div>
                <p className="text-xs text-[#7A7569]">
                  A confirmation has been recorded and our team will get in touch with you at <strong className="text-[#141414]">{applicantEmail}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetForm}
                    className="btn-sensiq-black px-8 py-2.5 text-xs"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              /* Application Form with RED BORDER Validation */
              <form onSubmit={handleApplicationSubmit} noValidate className="pt-6 space-y-5 text-xs text-left">
                
                {/* Candidate Full Name */}
                <div>
                  <label className="block text-[#3B4840] font-semibold mb-1">
                    Candidate Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => handleChange('applicantName', e.target.value, setApplicantName)}
                    onBlur={() => handleBlur('applicantName', applicantName)}
                    placeholder="e.g. Rahul Sharma"
                    aria-invalid={Boolean(errors.applicantName)}
                    className={`w-full bg-white text-[#1C221E] rounded-xl p-3 transition-all focus:outline-none ${
                      errors.applicantName
                        ? 'border-2 border-red-500 focus:border-red-600 ring-2 ring-red-100 bg-red-50/25'
                        : 'border border-[#D5CDC0] focus:border-[#141414]'
                    }`}
                  />
                  {errors.applicantName && (
                    <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.applicantName}</span>
                    </p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3B4840] font-semibold mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={applicantEmail}
                      onChange={(e) => handleChange('applicantEmail', e.target.value, setApplicantEmail)}
                      onBlur={() => handleBlur('applicantEmail', applicantEmail)}
                      placeholder="e.g. rahul.sharma@example.com"
                      aria-invalid={Boolean(errors.applicantEmail)}
                      className={`w-full bg-white text-[#1C221E] rounded-xl p-3 transition-all focus:outline-none ${
                        errors.applicantEmail
                          ? 'border-2 border-red-500 focus:border-red-600 ring-2 ring-red-100 bg-red-50/25'
                          : 'border border-[#D5CDC0] focus:border-[#141414]'
                      }`}
                    />
                    {errors.applicantEmail && (
                      <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.applicantEmail}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#3B4840] font-semibold mb-1">
                      Phone / WhatsApp Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={applicantPhone}
                      onChange={(e) => handleChange('applicantPhone', e.target.value, setApplicantPhone)}
                      onBlur={() => handleBlur('applicantPhone', applicantPhone)}
                      placeholder="e.g. +91 98765 43210"
                      aria-invalid={Boolean(errors.applicantPhone)}
                      className={`w-full bg-white text-[#1C221E] rounded-xl p-3 transition-all focus:outline-none ${
                        errors.applicantPhone
                          ? 'border-2 border-red-500 focus:border-red-600 ring-2 ring-red-100 bg-red-50/25'
                          : 'border border-[#D5CDC0] focus:border-[#141414]'
                      }`}
                    />
                    {errors.applicantPhone && (
                      <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.applicantPhone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Department & Desired Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3B4840] font-semibold mb-1">
                      Division / Department of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-3 focus:outline-none focus:border-[#141414]"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#3B4840] font-semibold mb-1">
                      Desired Position / Role Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={desiredRole}
                      onChange={(e) => handleChange('desiredRole', e.target.value, setDesiredRole)}
                      onBlur={() => handleBlur('desiredRole', desiredRole)}
                      placeholder="e.g. Regulatory Affairs Executive or QA Lead"
                      aria-invalid={Boolean(errors.desiredRole)}
                      className={`w-full bg-white text-[#1C221E] rounded-xl p-3 transition-all focus:outline-none ${
                        errors.desiredRole
                          ? 'border-2 border-red-500 focus:border-red-600 ring-2 ring-red-100 bg-red-50/25'
                          : 'border border-[#D5CDC0] focus:border-[#141414]'
                      }`}
                    />
                    {errors.desiredRole && (
                      <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.desiredRole}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Total Experience & Current Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3B4840] font-semibold mb-1">
                      Total Relevant Experience
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-3 focus:outline-none focus:border-[#141414]"
                    >
                      {EXPERIENCE_LEVELS.map((exp) => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#3B4840] font-semibold mb-1">
                      Current Organization &amp; Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={currentCompany}
                      onChange={(e) => setCurrentCompany(e.target.value)}
                      placeholder="e.g. Cipla / Senior Officer QA"
                      className="w-full bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-3 focus:outline-none focus:border-[#141414]"
                    />
                  </div>
                </div>

                {/* Resume Link / LinkedIn Profile */}
                <div>
                  <label className="block text-[#3B4840] font-semibold mb-1">
                    Resume Link or LinkedIn Profile URL <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <LinkIcon className={`w-4 h-4 absolute left-3 top-3.5 ${errors.portfolioLink ? 'text-red-500' : 'text-[#8C9B92]'}`} />
                    <input
                      type="url"
                      value={portfolioLink}
                      onChange={(e) => handleChange('portfolioLink', e.target.value, setPortfolioLink)}
                      onBlur={() => handleBlur('portfolioLink', portfolioLink)}
                      placeholder="https://linkedin.com/in/yourname or Google Drive / Cloud CV share link"
                      aria-invalid={Boolean(errors.portfolioLink)}
                      className={`w-full bg-white text-[#1C221E] rounded-xl p-3 pl-10 transition-all focus:outline-none ${
                        errors.portfolioLink
                          ? 'border-2 border-red-500 focus:border-red-600 ring-2 ring-red-100 bg-red-50/25'
                          : 'border border-[#D5CDC0] focus:border-[#141414]'
                      }`}
                    />
                  </div>
                  {errors.portfolioLink && (
                    <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.portfolioLink}</span>
                    </p>
                  )}
                  <p className="text-[11px] text-[#7A7569] mt-1">
                    Provide a public link to your Google Drive, Dropbox, OneDrive, or LinkedIn profile.
                  </p>
                </div>

                {/* Cover Note / Brief Introduction */}
                <div>
                  <label className="block text-[#3B4840] font-semibold mb-1">
                    Cover Note / Brief Introduction (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Summarize your key achievements, therapeutic area experience, notice period, and career objectives..."
                    className="w-full bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-3 focus:outline-none focus:border-[#141414]"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EFECE5]">
                  <p className="text-[11px] text-[#7A7569]">
                    All submissions are processed confidentially by Adivari HR.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-sensiq-black w-full sm:w-auto px-8 py-3 text-xs font-semibold disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application Now'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </section>

        {/* Alternative Application Methods (Direct Email & HR WhatsApp) */}
        <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#4A463B] rounded-[36px] p-8 sm:p-12 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E2CA40]">
                ALTERNATIVE APPLICATION OPTIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] tracking-tight">
                Direct Contact with the Talent Acquisition Desk
              </h3>
              <p className="text-xs sm:text-sm text-[#CBC7BB] leading-relaxed">
                If you prefer to email your resume directly with attachments, or want to discuss lateral opportunities in confidence, reach out to our talent team:
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href="mailto:careers@adivaripharma.com?subject=Direct%20Job%20Application%20-%20Adivari%20Pharmaceuticals"
                className="btn-sensiq-white w-full sm:w-auto justify-center"
              >
                <Mail className="w-4 h-4 text-[#141414]" />
                <span>careers@adivaripharma.com</span>
              </a>

              <a
                href="https://wa.me/918010484563?text=Hello%20Adivari%20HR%20Desk%2C%20I%20am%20interested%20in%20career%20opportunities%20at%20Adivari%20Pharmaceuticals."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all w-full sm:w-auto shadow-xs"
              >
                <span>WhatsApp HR (+91 80104 84563)</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer onOpenRfq={handleOpenRfq} />

      {/* Interactive Quotation Modal */}
      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
      />

      {/* Refined Executive Sticky Contact Hub (Calling + WhatsApp) */}
      <StickyContactWidget />
    </div>
  );
};

export default CareersPage;
