// src/features/products/api/product-api.ts
import { api } from '@/lib/axios';
import type { PaginatedResponse, Product, ProductQueryParams } from '../types/types';
export const productApi = {
  // Lấy danh sách
  getAll: async () => {
    const response = await api.get('/products');
    return response.data as { result: Product[] };
  },

  create: async ({ productData, file }: { productData: any; file: File | null }) => {
    const formData = new FormData();

    // 1. Ép kiểu weightGram về số (đề phòng form input trả về string)
    const formattedProduct = {
      ...productData,
      weightGram: Number(productData.weightGram),
    };

    // 2. Append JSON string như CURL yêu cầu
    formData.append('product', JSON.stringify(formattedProduct));

    // 3. Append file nếu có
    if (file) {
      formData.append('files', file);
    }

    // 4. Gửi request (Header tự động ghi đè multipart/form-data)
    const response = await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: string, { productData }: { productData: any }) => {
    const formattedProduct = {
      name: productData.name,
      brand: productData.brand,
      category: productData.category,
      frameType: productData.frameType,
      gender: productData.gender,
      shape: productData.shape,
      frameMaterial: productData.frameMaterial,
      hingeType: productData.hingeType,
      nosePadType: productData.nosePadType,
      weightGram: Number(productData.weightGram),
      status: productData.status,
      imageUrl: Array.isArray(productData.imageUrl) 
        ? productData.imageUrl.map((img: any) => typeof img === 'string' ? img : (img.imageUrl ?? ''))
        : []
    };

    // Không cần truyền headers nữa vì axios.ts đã lo vụ application/json rồi
    const response = await api.put(`/products/${id}`, formattedProduct);
    return response.data;
  },
  // Xóa sản phẩm
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  getFiltered: async (params: ProductQueryParams) => {
    const response = await api.get<PaginatedResponse<Product>>('/products/filter', {
      params: {
        ...params,
        // Đảm bảo default values nếu cần
        page: params.page ?? 0,
        size: params.size ?? 10,
      },
    });
    return response.data.result; // Trả về object chứa { items, totalPages, ... }
  },
};
