// src/features/products/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../api/product-api';

// Định nghĩa Key cho Query để quản lý Cache
export const productKeys = {
  all: ['products'] as const,
  detail: (id: string) => ['products', id] as const,
};

// --- HOOK 1: Lấy danh sách sản phẩm ---
export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: async () => {
      // productApi.getAllProducts() của bạn đã trả về { code, result }
      // Chúng ta chỉ cần lấy mảng result để trả về cho UI
      const data = await productApi.getAllProducts();
      return data.result; 
    },
    staleTime: 1000 * 60 * 5, // Dữ liệu được coi là "tươi" trong 5 phút (không gọi lại API)
  });
};

// --- HOOK 2: Lấy chi tiết sản phẩm ---
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const data = await productApi.getProductById(id);
      return data.result;
    },
    enabled: !!id, // Chỉ chạy khi có id
  });
};