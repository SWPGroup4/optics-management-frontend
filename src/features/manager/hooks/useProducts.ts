// src/features/products/hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/product-api';

// Key để quản lý cache
const QUERY_KEYS = {
  all: ['products'] as const,
};

// --- Hook 1: Lấy danh sách ---
export const useProducts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: async () => {
      const data = await productApi.getAll();
      return (data.result || []) as any[]; // Cast để tránh lỗi never[]
    },
    staleTime: 1000 * 60 * 5,
  });
};

// --- Hook 2: Tạo sản phẩm ---
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => productApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
    onError: (error) => {
      console.error('Failed to create:', error);
    },
  });
};

// --- Hook 3: Cập nhật sản phẩm ---
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => productApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
    onError: (error) => {
      console.error('Failed to update:', error);
    },
  });
};

// --- Hook 4: Xóa sản phẩm ---
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
    onError: (error) => {
      console.error('Failed to delete:', error);
    },
  });
};
