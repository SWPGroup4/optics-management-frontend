// src/features/products/api/product-api.ts
import { api } from "@/lib/axios";
import type { Product } from "../types/types";

export const productApi = {
  // Lấy danh sách
  getAll: async () => {
    const response = await api.get("/products");
    return response.data as { result: Product[] }; 
  },

  create: async ({ productData, file }: { productData: any, file: File | null }) => {
    const formData = new FormData();
    
    // 1. Ép kiểu weightGram về số (đề phòng form input trả về string)
    const formattedProduct = {
      ...productData,
      weightGram: Number(productData.weightGram)
    };

    // 2. Append JSON string như CURL yêu cầu
    formData.append("product", JSON.stringify(formattedProduct));

    // 3. Append file nếu có
    if (file) {
      formData.append("files", file);
    }

    // 4. Gửi request (Header tự động ghi đè multipart/form-data)
    const response = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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