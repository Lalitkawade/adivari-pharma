export interface DrugLicence {
  no: string;
  form: string;
  validity: string;
}

export const COMPANY_DETAILS = {
  legalName: 'ADIVARI PHARMACEUTICALS PRIVATE LIMITED',
  brandName: 'Adivari Pharmaceuticals',
  cin: 'U46497MR2026PTC478419',
  pan: 'ABGCA1438G',
  tan: 'NSKA18910D',
  gstin: '27ABGCA1438G1ZU',
  drugLicences: [
    { form: 'Form 20B', no: '20B-647243', validity: '07/09/2031' },
    { form: 'Form 21B', no: '21B-647244', validity: '07/09/2031' }
  ] as DrugLicence[],
  drugLicenceDisplay: '20B-647243 & 21B-647244 (Validity: 07/09/2031)',
  registeredOffice: {
    line1: '265 Kharadkar Galli, Paithan',
    line2: 'Aurangabad Bidkin, Bidkingaon, Paithan',
    city: 'Aurangabad',
    pincode: '431105',
    state: 'Maharashtra',
    country: 'India',
    full: '265 Kharadkar Galli, Paithan, Aurangabad Bidkin, Bidkingaon, Paithan, Aurangabad – 431105, Maharashtra, India',
    short: '265 Kharadkar Galli, Paithan, Aurangabad – 431105, Maharashtra'
  },
  logisticsGateway: {
    seaport: 'JNPT Nhava Sheva (Mumbai Seaport)',
    airHub: 'BOM (Mumbai International Airport)',
    corridor: 'JNPT Seaport & Mumbai BOM Air Hub'
  },
  contact: {
    email: 'info@adivaripharma.com',
    exportEmail: 'export@adivaripharma.com',
    careersEmail: 'careers@adivaripharma.com',
    phone: '+91 80104 84563',
    phoneRaw: '+918010484563',
    whatsappUrl: 'https://wa.me/918010484563?text=Hello%20Adivari%20Pharmaceuticals%2C%20I%20am%20inquiring%20about%20your%20pharmaceutical%20products.'
  }
};
