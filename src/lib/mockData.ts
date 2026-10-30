import { Product, QuotationRequest, Category } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Critical Care & Antibiotics',
    slug: 'critical-care-antibiotics',
    description: 'Advanced broad-spectrum antibiotics, carbapenems, and glycylcyclines formulated for ICU and multidrug-resistant infections.',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'cat-2',
    name: 'Anticoagulants',
    slug: 'anticoagulants',
    description: 'High-purity unfractionated heparins and emergency cardiovascular antithrombotic parenterals for hemodialysis and surgical bypass.',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'cat-3',
    name: 'Gastroenterology',
    slug: 'gastroenterology',
    description: 'Targeted lyophilized proton pump inhibitors (PPIs) for hospital-grade acute GI bleeding and severe acid reflux management.',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'cat-4',
    name: 'Emergency Injectables',
    slug: 'emergency-injectables',
    description: 'Rapid-onset parenteral formulations for emergency resuscitation, acute anesthesia, and critical care units.',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'cat-5',
    name: 'General Formulations',
    slug: 'general-formulations',
    description: 'Standard hospital parenterals, electrolyte balancers, and secondary supportive therapies manufactured under WHO-GMP compliance.',
    createdAt: '2026-01-01T00:00:00Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [];

export const INITIAL_QUOTATIONS: QuotationRequest[] = [];

