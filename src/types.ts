export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  price: number;
  weight: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  ingredients: string[];
  benefits: string[];
  storageInstructions: string;
  cookingSuggestions: string;
  rating: number;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ActivePage = 'home' | 'products' | 'product-details' | 'cart' | 'checkout';

export interface Review {
  id: string;
  author: string;
  location: string;
  text: string;
  rating: number;
  date: string;
  reviewImage?: string;
  headline?: string;
  helpfulVotes?: number;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  addressLines: string;
  city: string;
  postalCode: string;
  paymentMethod: 'upi' | 'cod';
  upiId?: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

