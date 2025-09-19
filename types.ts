
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'customer';
}

export interface Customer extends User {
  role: 'customer';
  email?: string;
  phone?: string;
  accumulatedValue: number;
  hasRewardPending: boolean;
}

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  price?: number;
  imageUrl?: string;
}
