export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  frameType: string;
  gender: string;
  shape: string;
  frameMaterial: string;
  status: string;
  // Thêm minPrice, maxPrice theo chuẩn JSON API
  minPrice: number;
  maxPrice: number;

  // Sửa lại kiểu dữ liệu của imageUrl
  imageUrl: ProductImage[];
  weightGram: number;
}
export interface ProductImage {
  id: string;
  imageUrl: string;
}
export interface ProductVariant {
  id: string; // (Hoặc number tùy thuộc vào kiểu ID mà Backend trả về)
  price?: number;
  colorName?: string;
  sizeLabel?: string;
}
