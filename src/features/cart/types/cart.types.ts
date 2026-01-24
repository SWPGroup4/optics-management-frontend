// src/features/cart/types/cart.types.ts
export interface CartItem {
  id: string; // Unique ID (thường là productId + options)
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string; // Ví dụ về option
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed (tính toán)
  getCartTotal: () => number;
  getCartCount: () => number;
}