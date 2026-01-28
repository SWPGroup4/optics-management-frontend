import { api } from "@/lib/axios";
import type { ApiResponse } from "@/features/auth/types";
import type { Product } from "../types/product-type";

export const productApi = {
  getAllProducts: async () => {
    // 👇 Destructuring: Chỉ lấy phần 'data' từ Axios Response
    const { data } = await api.get<ApiResponse<Product[]>>('/products');
    
    // Trả về đúng object: { code: number, result: Product[] }
    return data; 
  },

  getProductById: async (id: string) => {
    // 👇 Tương tự cho chi tiết sản phẩm
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
    
    // Trả về đúng object: { code: number, result: Product }
    return data;
  },
};