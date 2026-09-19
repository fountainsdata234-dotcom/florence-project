export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: 'electronics' | 'fashion' | 'home' | 'beauty' | 'smart-tech' | 'accessories';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  soldCount: number;
  image: string;
  gallery: string[];
  badge?: string;
  stock: number;
  isFlashDeal?: boolean;
  isTrending?: boolean;
  freeShipping: boolean;
  description: string;
  specs: Record<string, string>;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  twoFactorVerified?: boolean;
  phone?: string;
  address?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'discount' | 'security' | 'deal';
}
