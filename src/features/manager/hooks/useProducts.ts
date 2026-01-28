// src/features/products/hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../api/product-api";

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
      return data.result || []; // Trả về mảng rỗng nếu null
    },
    // Giữ cache 5 phút, không refetch khi focus cửa sổ nếu muốn
    staleTime: 1000 * 60 * 5, 
  });
};

// --- Hook 2: Xóa sản phẩm ---
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productApi.delete(id),
    
    // Khi xóa thành công:
    onSuccess: () => {
      // Báo cho React Query biết data cũ đã lỗi thời -> Tự động gọi API lấy list mới
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      // Bạn có thể thêm Toast notification ở đây
      // toast.success("Deleted successfully");
    },
    onError: (error) => {
        console.error("Failed to delete:", error);
        // toast.error("Failed to delete");
    }
  });
};