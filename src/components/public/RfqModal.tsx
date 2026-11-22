import React, { useState, useEffect } from 'react';
import { Product, QuotationItem } from '../../lib/types';
import { useData } from '../../context/DataContext';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building2, 
  Globe2, 
  Mail, 
  Phone, 
  Ship, 
  FileText,
  Copy,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { COMPANY_DETAILS } from '../../lib/companyDetails';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProductId?: string;
}

const COUNTRIES = [
  'Mexico', 'Brazil', 'Colombia', 'Peru', 'Chile', 'Argentina',
  'United Arab Emirates', 'Saudi Arabia', 'Egypt', 'Kuwait', 'Oman', 'Qatar',
  'Vietnam', 'Philippines', 'Malaysia', 'Thailand', 'Indonesia', 'Cambodia',
  'Kenya', 'Nigeria', 'South Africa', 'Tanzania', 'Ghana', 'Uganda',
  'Uzbekistan', 'Kazakhstan', 'Azerbaijan', 'Georgia',
  'United Kingdom', 'Germany', 'France', 'Other International'
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{6,20}$/;

export const RfqModal: React.FC<RfqModalProps> = ({ 
  isOpen, 
  onClose, 
  preSelectedProductId 
}) => {
  const { products, addQuotation } = useData();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Mexico');
  const [portOfEntry, setPortOfEntry] = useState('');
  const [organizationType, setOrganizationType] = useState<string>('Licensed Importer');
  const [incoterms, setIncoterms] = useState<string>('CIF');
  const [message, setMessage] = useState('');
  
  // Selected items
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(10000);
  const [unit, setUnit] = useState<string>('vials');
  
  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRfqId, setSubmittedRfqId] = useState<string | null>(null);

  useEffect(() => {
    if (preSelectedProductId) {
      setSelectedProductId(preSelectedProductId);
    } else if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
    }
  }, [preSelectedProductId, products]);

  if (!isOpen) return null;

  const validateField = (field: string, val: any): string | null => {
    switch (field) {
      case 'companyName':
        if (!val || !val.trim()) return 'Company or Importer name is required.';
        if (val.trim().length < 2) return 'Company name must be at least 2 characters.';
        return null;
      case 'contactPerson':
        if (!val || !val.trim()) return 'Contact person name and title are required.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return null;
      case 'email':
        if (!val || !val.trim()) return 'Corporate email address is required.';
        if (!EMAIL_REGEX.test(val.trim())) return 'Please enter a valid email address (e.g. name@company.com).';
        return null;
      case 'phone':
        if (!val || !val.trim()) return 'Phone or WhatsApp contact number is required.';
        if ((val.match(/\d/g) || []).length < 7 || !PHONE_REGEX.test(val.trim())) {
          return 'Please enter a valid phone number with country code.';
        }
        return null;
      case 'quantity':
        if (val === '' || val === null || isNaN(Number(val)) || Number(val) <= 0) {
          return 'Quantity must be greater than zero.';
        }
        return null;
      default:
        return null;
    }
  };

  const validateAll = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    const cErr = validateField('companyName', companyName);
    if (cErr) newErrors.companyName = cErr;

    const pErr = validateField('contactPerson', contactPerson);
    if (pErr) newErrors.contactPerson = pErr;

    const eErr = validateField('email', email);
    if (eErr) newErrors.email = eErr;

    const phErr = validateField('phone', phone);
    if (phErr) newErrors.phone = phErr;

    const qErr = validateField('quantity', quantity);
    if (qErr) newErrors.quantity = qErr;

    return newErrors;
  };

  const handleBlur = (field: string, value: any) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setErrors(prev => {
      const next = { ...prev };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleChange = (field: string, value: any, setter: (val: any) => void) => {
    setter(value);
    if (touched[field] || errors[field]) {
      const error = validateField(field, value);
      setErrors(prev => {
        const next = { ...prev };
        if (error) {
          next[field] = error;
        } else {
          delete next[field];
        }
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({
      companyName: true,
      contactPerson: true,
      email: true,
      phone: true,
      quantity: true
    });

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please correct the highlighted fields with red borders.');
      return;
    }

    const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

    setIsSubmitting(true);
    try {
      const items: QuotationItem[] = [
        {
          productId: selectedProduct?.id || 'prod-custom',
          productName: selectedProduct?.name || 'Custom Pharmaceutical Injections',
          quantity: Number(quantity) || 5000,
          unit: unit || 'vials'
        }
      ];

      const newRfq = await addQuotation({
        companyName: companyName.trim(),
        contactPerson: contactPerson.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country,
        portOfEntry: portOfEntry.trim(),
        organizationType,
        incoterms,
        items,
        message: message.trim()
      });

      setSubmittedRfqId(newRfq.referenceNumber);
      toast.success(`Quotation request ${newRfq.referenceNumber} submitted successfully!`);
    } catch (err) {
      console.error(err);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedRfqId(null);
    setCompanyName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setPortOfEntry('');
    setMessage('');
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141414]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white border border-[#DFDCD4] rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EFECE5] flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#141414] text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
                Request for Quotation (RFQ)
              </h3>
              <p className="text-xs text-[#635F55] font-mono">
                Export Division • {COMPANY_DETAILS.legalName}
              </p>
              <p className="text-[10px] text-[#8A857A] font-mono">
                CIN: {COMPANY_DETAILS.cin} • Drug Lic: {COMPANY_DETAILS.drugLicenceDisplay}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full text-[#8A857A] hover:text-[#141414] hover:bg-[#F3F0EA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {submittedRfqId ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E5EEE7] text-[#3B5244] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-[#1C221E] font-['Outfit']">
                Quotation Request Registered!
              </h4>
              <p className="text-sm text-[#526057] max-w-md mx-auto">
                Dear <strong className="text-[#1C221E]">{contactPerson}</strong>, our international export desk has received your inquiry on behalf of <strong className="text-[#3B5244]">{companyName}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E2D5] max-w-xs mx-auto space-y-1">
              <p className="text-xs text-[#7F8D85] uppercase tracking-wider font-semibold">Your Tracking Reference</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-mono font-bold text-[#D96B43]">{submittedRfqId}</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(submittedRfqId);
                    toast.success('Copied to clipboard!');
                  }}
                  className="p-1 text-[#7F8D85] hover:text-[#1C221E]"
                  title="Copy reference"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-[#6A7870] max-w-md mx-auto">
              A comprehensive commercial quotation with wholesale CIF/FOB pricing and Certificate of Analysis (COA) will be dispatched from <strong className="text-[#141414]">{COMPANY_DETAILS.contact.email}</strong> within <strong className="text-[#3B5244]">12 business hours</strong>.
            </p>

            <div className="text-[10px] text-[#8A857A] font-mono text-center">
              Official issuer: {COMPANY_DETAILS.legalName} • GSTIN: {COMPANY_DETAILS.gstin}
            </div>

            <button
              onClick={handleResetAndClose}
              className="btn-sensiq-black px-8 py-2.5 mx-auto text-sm"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-5 text-xs">
            
            {/* Product selection banner */}
            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE5D9] space-y-3">
              <label className="block text-xs font-bold text-[#1C221E] uppercase tracking-wider">
                Select Formulation &amp; Batch Volume
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-[#141414]"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.genericName}) — {p.strength}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-4 flex gap-2">
                  <div className="w-2/3">
                    <input
                      type="number"
                      min="1"
                      step="100"
                      value={quantity}
                      onChange={(e) => handleChange('quantity', Number(e.target.value), setQuantity)}
                      onBlur={() => handleBlur('quantity', quantity)}
                      aria-invalid={Boolean(errors.quantity)}
                      className={`w-full bg-white text-[#1C221E] rounded-xl p-2.5 text-xs font-medium transition-all focus:outline-none ${
                        errors.quantity
                          ? 'border-2 border-red-500 focus:border-red-600 ring-2 ring-red-100 bg-red-50/25'
                          : 'border border-[#D5CDC0] focus:border-[#141414]'
                      }`}
                      placeholder="Quantity"
                    />
                  </div>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-1/3 bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#141414]"
                  >
                    <option value="vials">Vials</option>
                    <option value="packs">Packs</option>
                    <option value="cartons">Cartons</option>
                  </select>
                </div>
              </div>

              {errors.quantity && (
                <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.quantity}</span>
                </p>
              )}
            </div>

            {/* Buyer Company & Country Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#3B4840] font-semibold mb-1">
                  Company / Importer Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className={`w-4 h-4 absolute left-3 top-3 ${errors.companyName ? 'text-red-500' : 'text-[#8C9B92]'}`} />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => handleChange('companyName', e.target.value, setCompanyName)}
                    onBlur={() => handleBlur('companyName', companyName)}
                    placeholder="e.g. MedGlobal Distribuidora S.A."
                    aria-invalid={Boolean(errors.companyName)}
                    className={`w-full bg-white text-[#1C221E] rounded-xl p-2.5 pl-9 transition-all focus:outline-none ${
                      errors.companyName
                        ? 'border-2 border-red-500 focus:border-red-600 ring-2 ring-red-100 bg-red-50/25'
                        : 'border border-[#D5CDC0] focus:border-[#141414]'
                    }`}
                  />
                </div>
                {errors.companyName && (
                  <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.companyName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#3B4840] font-semibold mb-1">
                  Destination Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Globe2 className="w-4 h-4 text-[#8C9B92] absolute left-3 top-3" />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-2.5 pl-9 focus:outline-none focus:border-[#141414]"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Person & Corporate Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#3B4840] font-semibold mb-1">
                  Contact Person (Name &amp; Title) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => handleChange('contactPerson', e.target.value, setContactPerson)}
                  onBlur={() => handleBlur('contactPerson', contactPerson)}
                  placeholder="e.g. Dr. Carlos Mendoza (Procurement Dir.)"
                  aria-invalid={Boolean(errors.contactPerson)}
                  className={`w-full bg-white text-[#1C221E] rounded-xl p-2.5 transition-all focus:outline-none ${
                    errors.contactPerson
                      ? 'border-2 border-red-500 focus:border-red-600 ring-2 ring-red-100 bg-red-50/25'
                      : 'border border-[#D5CDC0] focus:border-[#141414]'
                  }`}
                />
                {errors.contactPerson && (
                  <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.contactPerson}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#3B4840] font-semibold mb-1">
                  Corporate Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className={`w-4 h-4 absolute left-3 top-3 ${errors.email ? 'text-red-500' : 'text-[#8C9B92]'}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleChange('email', e.target.value, setEmail)}
                    onBlur={() => handleBlur('email', email)}
                    placeholder="procurement@yourcompany.com"
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full bg-white text-[#1C221E] rounded-xl p-2.5 pl-9 transition-all focus:outline-none ${
                      errors.email
                        ? 'border-2 border-red-500 focus:border-red-600 ring-2 ring-red-100 bg-red-50/25'
                        : 'border border-[#D5CDC0] focus:border-[#141414]'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Phone & Port */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#3B4840] font-semibold mb-1">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className={`w-4 h-4 absolute left-3 top-3 ${errors.phone ? 'text-red-500' : 'text-[#8C9B92]'}`} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handleChange('phone', e.target.value, setPhone)}
                    onBlur={() => handleBlur('phone', phone)}
                    placeholder="+52 55 1234 5678"
                    aria-invalid={Boolean(errors.phone)}
                    className={`w-full bg-white text-[#1C221E] rounded-xl p-2.5 pl-9 transition-all focus:outline-none ${
                      errors.phone
                        ? 'border-2 border-red-500 focus:border-red-600 ring-2 ring-red-100 bg-red-50/25'
                        : 'border border-[#D5CDC0] focus:border-[#141414]'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#3B4840] font-semibold mb-1">
                  Destination Port (Airport / Ocean Port)
                </label>
                <div className="relative">
                  <Ship className="w-4 h-4 text-[#8C9B92] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={portOfEntry}
                    onChange={(e) => setPortOfEntry(e.target.value)}
                    placeholder="e.g. Veracruz Port / Mexico City Airport"
                    className="w-full bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-2.5 pl-9 focus:outline-none focus:border-[#141414]"
                  >
                  </input>
                </div>
              </div>
            </div>

            {/* Organization Type & Incoterms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#3B4840] font-semibold mb-1">
                  Organization Type
                </label>
                <select
                  value={organizationType}
                  onChange={(e) => setOrganizationType(e.target.value)}
                  className="w-full bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#141414]"
                >
                  <option value="Licensed Importer">Licensed Pharmaceutical Importer</option>
                  <option value="Hospital Network">Hospital Network / Healthcare Provider</option>
                  <option value="Government Tender">Government Tender / Ministry of Health</option>
                  <option value="Distributor">Wholesale Distributor</option>
                  <option value="Other">Other Organization</option>
                </select>
              </div>

              <div>
                <label className="block text-[#3B4840] font-semibold mb-1">
                  Incoterms (Delivery Basis)
                </label>
                <select
                  value={incoterms}
                  onChange={(e) => setIncoterms(e.target.value)}
                  className="w-full bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#141414]"
                >
                  <option value="CIF">CIF (Cost, Insurance and Freight)</option>
                  <option value="FOB">FOB (Free on Board / Mumbai Port)</option>
                  <option value="CFR">CFR (Cost and Freight)</option>
                  <option value="EXW">EXW (Ex Works / Factory Gate)</option>
                </select>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-[#3B4840] font-semibold mb-1">
                Specific Requirements (CTD Dossier, Packaging Language, Schedule)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Indicate requirement for CTD dossier, custom multilingual packaging (English/Spanish/French), or delivery schedule..."
                className="w-full bg-white border border-[#D5CDC0] text-[#1C221E] rounded-xl p-2.5 focus:outline-none focus:border-[#141414]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#EFECE5]">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn-sensiq-white py-2.5 px-6 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-sensiq-black py-2.5 px-7 text-xs font-medium disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Commercial RFQ'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
