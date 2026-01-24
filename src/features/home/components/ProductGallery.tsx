import { useState } from "react";
import { Camera } from "lucide-react";

const productImages = [
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2080&auto=format&fit=crop",
  "https://kavi.vn/upload/image/06(17).jpg",
];

export default function ProductGallery({ productId }: { productId: string }) {
    console.log("Đang xem sản phẩm:", productId);
  const [activeImage, setActiveImage] = useState(productImages[0]);

  return (
    <div className="space-y-8">
      {/* Định nghĩa Keyframes cho Animation ngay trong component hoặc file CSS toàn cục */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>

      {/* Main Image Area */}
      <div className="relative bg-[#F4F5F7] rounded-xl overflow-hidden aspect-square flex items-center justify-center group">
        <img 
          key={activeImage} // QUAN TRỌNG: key thay đổi sẽ kích hoạt lại animation
          src={activeImage} 
          alt="Product Detail" 
          className="w-3/4 object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 animate-fade-in" // Thêm class animate-fade-in
        />
        <button className="absolute bottom-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:bg-white transition text-sm font-medium text-gray-700 z-10">
          <Camera className="w-4 h-4" />
          Virtual Try-On
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {productImages.map((img, index) => (
          <div 
            key={index} 
            onClick={() => setActiveImage(img)}
            className={`aspect-square rounded-lg bg-[#F4F5F7] border-2 cursor-pointer flex items-center justify-center transition-all duration-300
              ${activeImage === img ? 'border-gray-900 ring-1 ring-gray-900/10' : 'border-transparent hover:border-gray-300'}`
            }
          >
            <img 
              src={img} 
              className="w-2/3 mix-blend-multiply object-contain" 
              alt={`thumb-${index}`} 
            />
          </div>
        ))}
      </div>

      {/* Technical Measurements */}
      <div className="pt-4">
        {/* ... (Phần thông số kỹ thuật giữ nguyên như cũ) ... */}
         <div className="flex items-center gap-2 mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500"><path d="M2 12H22M2 12L5 9M2 12L5 15M22 12L19 9M22 12L19 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="font-bold text-gray-900">Technical Measurements</h3>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Lens Width", val: "52", unit: "mm" },
            { label: "Bridge", val: "19", unit: "mm" },
            { label: "Temple", val: "145", unit: "mm" },
          ].map((m) => (
            <div key={m.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">{m.label}</p>
              <p className="text-xl font-bold text-gray-900">{m.val}<span className="text-xs font-normal text-gray-500 ml-0.5">{m.unit}</span></p>
            </div>
          ))}
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Frame Material</span>
            <span className="font-medium text-gray-900">Handcrafted Italian Acetate</span>
          </div>
        </div>
      </div>
    </div>
  );
};