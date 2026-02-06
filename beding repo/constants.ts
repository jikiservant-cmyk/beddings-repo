
import { Product, CategoryHierarchy } from './types';

export const CATALOG_HIERARCHY: CategoryHierarchy = {
  'Bedding': ['Fitted Sheets', 'Flat Sheets', 'Sheet Sets'],
  'Pillows': ['Sleeping Pillows', 'Decorative Pillows', 'Pillowcases'],
  'Duvets': ['Comforters', 'Duvet Covers', 'Inserts'],
  'Accessories': ['Mattress Toppers', 'Blankets', 'Throws']
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cloud Cotton Fitted Sheet',
    category: 'Bedding',
    subcategory: 'Fitted Sheets',
    price: 329300,
    description: 'Deep-pocket fitted sheet made from organic long-staple cotton.',
    material: 'Organic Long-Staple Cotton',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    color: 'Snow White',
    rating: 4.9,
    benefits: ['Snug Fit', 'Breathable', 'Sustainably Sourced']
  },
  {
    id: '2',
    name: 'French Flax Linen Duvet Cover',
    category: 'Duvets',
    subcategory: 'Duvet Covers',
    price: 777000,
    description: 'Woven from premium French flax, this duvet cover gets softer with every wash.',
    material: '100% French Linen',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800',
    color: 'Dusty Sage',
    rating: 4.8,
    benefits: ['Temperature Regulating', 'Durable', 'Timeless Texture']
  },
  {
    id: '3',
    name: 'Eucalyptus Silk Pillowcase',
    category: 'Pillows',
    subcategory: 'Pillowcases',
    price: 166500,
    description: 'The ultimate luxury for skin and hair. Our cooling eucalyptus silk prevents friction.',
    material: 'Tencel Eucalyptus Silk',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800',
    color: 'Oyster',
    rating: 5.0,
    benefits: ['Skin Friendly', 'Cooling', 'Anti-Static']
  },
  {
    id: '4',
    name: 'Weighted Knitted Blanket',
    category: 'Accessories',
    subcategory: 'Blankets',
    price: 921300,
    description: 'Hand-knitted from organic cotton, providing soothing pressure for deeper rest.',
    material: 'Organic Cotton Yarn',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
    color: 'Charcoal',
    rating: 4.7,
    benefits: ['Anxiety Relief', 'Highly Breathable', 'Plastic-Free']
  },
  {
    id: '5',
    name: 'Memory Foam Mattress Topper',
    category: 'Accessories',
    subcategory: 'Mattress Toppers',
    price: 684500,
    description: 'Revitalize your mattress with 3 inches of cooling gel-infused memory foam.',
    material: 'Gel Memory Foam',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800',
    color: 'Cloud White',
    rating: 4.6,
    benefits: ['Pressure Relief', 'Motion Isolation', 'Cooling']
  },
  {
    id: '6',
    name: 'Plush Down Comforter',
    category: 'Duvets',
    subcategory: 'Comforters',
    price: 1295000,
    description: 'Experience hotel-grade luxury with our ethically sourced 700-fill power down comforter.',
    material: 'Ethical White Goose Down',
    image: 'https://images.unsplash.com/photo-1505693419173-42b9218a5c81?auto=format&fit=crop&q=80&w=800',
    color: 'Arctic White',
    rating: 4.9,
    benefits: ['Ultra-Lofty', 'Baffle Box Construction', 'Year-Round Warmth']
  },
  {
    id: '7',
    name: 'Heritage Cotton Flat Sheet',
    category: 'Bedding',
    subcategory: 'Flat Sheets',
    price: 277500,
    description: 'A classic percale flat sheet that stays cool to the touch all night.',
    material: 'Pima Cotton Percale',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    color: 'Soft Sand',
    rating: 4.7,
    benefits: ['Crisp Feel', 'Durable', 'Easy Care']
  },
  {
    id: '8',
    name: 'Goose Down Sleeping Pillow',
    category: 'Pillows',
    subcategory: 'Sleeping Pillows',
    price: 444000,
    description: 'Perfectly balanced support for side and back sleepers.',
    material: 'White Goose Down & Feathers',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800',
    color: 'White',
    rating: 4.8,
    benefits: ['Adjustable Loft', 'Machine Washable', 'Breathable Shell']
  }
];

export const SIZES = ['Twin', 'Full', 'Queen', 'King', 'Cal King'];
