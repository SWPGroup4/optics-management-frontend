// src/features/products/api/product-api.ts
import { api } from "@/lib/axios";
import type { Product } from "../types/types";

export const productApi = {
  // Lấy danh sách
  getAll: async () => {
    const response = await api.get("/products");
    // Giả sử API trả về structure: { result: Product[], ... }
    // Nếu dùng axios interceptor trả về data rồi thì response chính là data
    return response.data as { result: Product[] }; 
  },

  // Xóa sản phẩm
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};