import type { ApiResponse } from "@/features/auth/types";
import { api } from "@/lib/axios";
import type { Product } from "../types/product-type";

export const productApi = {
  getAllProducts: async () => {
    // Trả về một Promise với kiểu dữ liệu là ApiResponse chứa mảng Product
    const response = await api.get< ApiResponse<Product[]>>('/products');
    return response;
  },
  getProductById: async (id: string) => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response;
  },
};