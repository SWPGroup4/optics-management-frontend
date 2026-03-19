export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT';
export type ProductCategory = 'FRAME' | 'LENS' | 'CONTACT';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  frameType?: string; // Có trong JSON
  gender?: string; // Có trong JSON
  shape?: string; // Có trong JSON
  frameMaterial?: string; // Có trong JSON
  imageUrl?: string[]; // JSON trả về mảng string url
  status: ProductStatus;

  // Các trường này không thấy trong JSON mẫu bạn gửi,
  // nhưng UI cũ có dùng. Ta để optional (?) để tránh lỗi nếu API chưa trả về.
  sku?: string;
  stock?: number;
  price?: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}
