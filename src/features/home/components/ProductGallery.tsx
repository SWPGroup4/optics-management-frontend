import { useState } from "react";
import { Camera, Ruler, Info } from "lucide-react";
// 👇 Import Hook TanStack Query
import { useProduct } from "../hooks/useProducts";

export default function ProductGallery({ productId }: { productId: string }) {
  // 1. Lấy dữ liệu từ Hook
  const { data: product, isLoading } = useProduct(productId);
  
  // 2. State cho thumbnail
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 3. Loading Skeleton (Check isLoading thay vì !currentProduct)
  if (isLoading || !product) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-2xl" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // 4. Logic hiển thị ảnh
  const activeImage = selectedImage || product.imageUrl?.[0] || "";
  const images = product.imageUrl || [];

  return (
    <div className="space-y-8 lg:sticky lg:top-24">
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-product-in {
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* --- VÙNG HIỂN THỊ ẢNH CHÍNH --- */}
      <div className="relative bg-gradient-to-b from-[#F8FAFB] to-[#F1F4F6] rounded-3xl overflow-hidden aspect-square flex items-center justify-center group border border-white shadow-inner">
        {activeImage ? (
          <img 
            key={activeImage} 
            src={activeImage} 
            alt={product.name} 
            className="w-4/5 object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-110 animate-product-in" 
          />
        ) : (
          <div className="text-gray-300 italic">No image preview</div>
        )}
        
        {/* Nút Virtual Try-On */}
        <button className="absolute bottom-6 flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full shadow-xl hover:bg-[#4A8795] hover:text-white transition-all active:scale-95 text-sm font-bold text-[#4A8795] border border-white/50 group/btn">
          <Camera className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
          Virtual Try-On
        </button>
      </div>

      {/* --- DANH SÁCH ẢNH THUMBNAILS --- */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {images.map((img, index) => {
            const isActive = activeImage === img;
            return (
              <div 
                key={`${productId}-${index}`} 
                onClick={() => setSelectedImage(img)}
                className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-white border-2 cursor-pointer flex items-center justify-center transition-all duration-300 overflow-hidden
                  ${isActive 
                    ? 'border-[#4A8795] shadow-lg scale-105' 
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-200'}`
                }
              >
                <img 
                  src={img} 
                  className="w-5/6 object-contain mix-blend-multiply" 
                  alt={`Thumb ${index}`} 
                />
              </div>
            );
          })}
        </div>
      )}

      {/* --- THÔNG SỐ KỸ THUẬT --- */}
      <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#4A8795]/10 rounded-lg">
              <Ruler className="w-4 h-4 text-[#4A8795]" />
            </div>
            <h3 className="font-bold text-gray-900 tracking-tight">Technical Specs</h3>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Grid thông số chính */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Lens", val: "52", sub: "Width" },
            { label: "Bridge", val: "19", sub: "Dist." },
            { label: "Temple", val: "145", sub: "Length" },
          ].map((m) => (
            <div key={m.label} className="bg-[#F8FAFB] rounded-2xl p-3 text-center border border-gray-50 group hover:border-[#4A8795]/20 transition-colors">
              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-black mb-1">{m.label}</p>
              <p className="text-lg font-black text-gray-900 leading-none">
                {m.val}<span className="text-[10px] font-medium text-gray-500 ml-0.5">mm</span>
              </p>
              <p className="text-[8px] text-gray-400 mt-1">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Danh sách chi tiết */}
        <div className="space-y-3">
          {[
            { label: "Material", value: product.frameMaterial || "Premium Acetate", icon: "💎" },
            { label: "Frame Shape", value: product.shape, icon: "👓" },
            { label: "Face Fit", value: "Medium / Wide", icon: "👤" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 text-sm">
              <span className="text-gray-500 flex items-center gap-2">
                <span className="text-xs">{item.icon}</span> {item.label}
              </span>
              <span className="font-bold text-gray-900 capitalize">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}