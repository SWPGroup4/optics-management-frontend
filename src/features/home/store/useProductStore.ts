import { create } from 'zustand';
import { productApi } from '../api/product-api';
import type { Product } from '../types/product-type';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await productApi.getAllProducts();
      const data = response as unknown as { result: Product[] };
      set({ products: data.result, isLoading: false });
    } catch  {
      set({ error: "Lỗi tải danh sách", isLoading: false });
    }
  },

  fetchProductById: async (id: string) => {
    const existing = get().products.find(p => p.id === id);
    if (existing) {
      set({ currentProduct: existing });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await productApi.getProductById(id);
      const data = response as unknown as { result: Product };
      set({ currentProduct: data.result, isLoading: false });
    } catch {
      set({ error: "Không tìm thấy sản phẩm", isLoading: false });
    }
  },
}));