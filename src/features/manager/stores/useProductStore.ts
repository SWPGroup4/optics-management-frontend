import { create } from "zustand";
import { api } from "@/lib/axios"; // Import instance axios của bạn
import { AxiosError } from "axios";

/* ===== TYPES (Định nghĩa Type ngay đây hoặc chuyển sang file types chung) ===== */
export type ProductStatus = "ACTIVE" | "INACTIVE";
export type ProductCategory = "FRAME" | "LENS" | "CONTACT";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
}

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

/* ===== STORE ===== */
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  // 1. Fetch Products
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/products");

      // Ép kiểu dữ liệu trả về theo mẫu bạn cung cấp
      // Lưu ý: Nếu axios interceptor của bạn trả về data trực tiếp, hãy điều chỉnh
      const data = response.data as unknown as { result: Product[] };

      // Fallback: nếu data.result null thì dùng mảng rỗng
      set({ products: data?.result || [], isLoading: false });
    } catch (err: unknown) {
      let errorMessage = "Failed to fetch products";

      if (err instanceof AxiosError) {
        const serverData = err.response?.data;
        errorMessage = serverData?.message || serverData?.result || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      set({ error: errorMessage, isLoading: false });
    }
  },

  // 2. Delete Product
  deleteProduct: async (id: string) => {
    // Optimistic update hoặc xóa sau khi thành công
    // Ở đây ta làm cách an toàn: Gọi API xóa -> Nếu OK thì cập nhật State
    try {
      await api.delete(`/products/${id}`);
      
      // Cập nhật state local ngay lập tức để không cần fetch lại
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (err: unknown) {
        // Xử lý lỗi nếu cần (ví dụ: hiện Toast thông báo)
        console.error("Delete failed", err);
        // Có thể set error vào store nếu muốn hiển thị lỗi lên UI
    }
  },
}));