import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PrescriptionData } from '@/types/prescription'; // Import từ file chung
 // Import từ file chung

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string; // Nếu sản phẩm có màu
  lensType?: string;
  prescription?: PrescriptionData; 
  orderType: 'buy-now' | 'pre-order' | 'custom';
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  clearCart: () => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getCartTotal: () => number;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addToCart: (newItem) => set((state) => {
        // Tạo ID duy nhất dựa trên SP + Lens + Độ cận
        const uniqueId = `${newItem.productId}-${newItem.lensType}-${JSON.stringify(newItem.prescription)}`;
        
        const existingItem = state.items.find(item => item.id === uniqueId);

        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === uniqueId ? { ...item, quantity: item.quantity + newItem.quantity } : item
            ),
            isOpen: true
          };
        }

        return {
          items: [...state.items, { ...newItem, id: uniqueId }],
          isOpen: true
        };
      }),
      clearCart: () => set({ items: [], isOpen: false }),

      removeFromCart: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: 'vision-cart-storage' }
  )
);