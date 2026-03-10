import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useProduct } from "../hooks/useProducts";

export default function ProductInfo({ productId }: { productId: string }) {
  // 1. Gọi Hook để lấy dữ liệu
  const { data: product, isLoading, isError } = useProduct(productId);

  // 2. Xử lý trạng thái đang tải (Loading)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#4A8795]" />
        <p className="text-sm text-gray-500 mt-2">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  // 3. Xử lý trạng thái lỗi (Error)
  if (isError || !product) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.
      </div>
    );
  }

  // 4. Render dữ liệu thật từ API
  return (
    <div className="space-y-6">
      {/* Badges & Title */}
      <div>
        <div className="flex gap-2 mb-3">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md px-2.5 uppercase">
            {product.status || "IN STOCK"}
          </Badge>
          <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-md px-2.5 uppercase">
            {product.category}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
          {product.name}
        </h1>
        <p className="text-gray-500 italic">
          {product.brand} — {product.frameMaterial} & {product.shape}
        </p>
      </div>

      {/* Price - Hiển thị khoảng giá từ API */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-[#4A8795]">
          {product.minPrice.toLocaleString()}₫
        </span>
        {product.maxPrice > product.minPrice && (
          <span className="text-lg text-gray-400 line-through decoration-gray-300">
            {product.maxPrice.toLocaleString()}₫
          </span>
        )}
      </div>

      {/* Order Type Selector */}
      <div className="space-y-3 pt-2">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Order Type</p>
        
        {/* Option 1: Buy Now */}
        <div className="relative border-2 border-[#4A8795]/30 bg-[#4A8795]/5 rounded-xl p-4 cursor-pointer transition-all">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900">Buy Now</span>
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase">
                  {product.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">Full payment of <span className="font-bold">${product.minPrice}</span></p>
              <p className="text-xs text-gray-400 mt-1">Weight: {product.weightGram}g | Gender: {product.gender}</p>
            </div>
            <div className="bg-[#4A8795] text-white rounded-full p-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Option 2: Pre-Order (Ví dụ tính toán 50% deposit) */}
        <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-gray-300 transition-all opacity-70">
           <div className="flex justify-between items-start">
             <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">Pre-Order</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">50% DEPOSIT</span>
                </div>
                <p className="text-sm text-gray-600">Secure your pair for <span className="font-bold">${(product.minPrice / 2).toFixed(2)}</span></p>
                <p className="text-xs text-orange-400 italic mt-1">Shipping expected: late next month</p>
             </div>
             <div className="h-5 w-5 rounded-full border border-gray-300"></div>
           </div>
        </div>
      </div>
    </div>
  );
}