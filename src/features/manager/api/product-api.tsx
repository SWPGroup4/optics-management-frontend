// src/features/products/api/product-api.ts
import { api } from "@/lib/axios";
import type { Product } from "../types/types";

export const productApi = {
  // Lấy danh sách
  getAll: async () => {
    const response = await api.get("/products");
    return response.data as { result: Product[] }; 
  },

  // Tạo mới
  create: async (payload: any) => {
    const response = await api.post("/products", payload);
    return response.data;
  },

  // Cập nhật
  update: async (id: string, payload: any) => {
    const response = await api.put(`/products/${id}`, payload);
    return response.data;
  },

  // Xóa sản phẩm
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};