
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  description: string;
  material: string;
  image: string;
  color: string;
  rating: number;
  benefits: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum View {
  Home = 'home',
  Catalog = 'catalog',
  ProductDetail = 'detail',
  Stylist = 'stylist',
  Admin = 'admin',
  Checkout = 'checkout'
}

export interface CategoryHierarchy {
  [key: string]: string[];
}
