import { Monitor, RefreshCcw, ShoppingBag, Sparkles, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductStore } from "../store/useProductStore"; 
import { useCartStore } from "@/features/cart/store/useCartStore";
import PrescriptionWidget from "./PrescriptionModal";

const LENS_OPTIONS = [
  { id: "standard", icon: Sparkles, title: "Standard Clear", subtitle: "Included", price: 0 },
  { id: "transitions", icon: RefreshCcw, title: "Transitions", subtitle: "+$95.00", price: 95 },
  { id: "bluelight", icon: Monitor, title: "Blue Light Filter", subtitle: "+$45.00", price: 45 },
  { id: "sunglass", icon: Sun, title: "Sun Tints", subtitle: "+$60.00", price: 60 },
];

const BASE_PRODUCT = {
  name: "L'Artiste Series 01",
  basePrice: 145,
  image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800"
};

export default function ProductForm({ productId }: { productId: string }) {
  const { 
    selectedLensId, 
    setLensId, 
    prescription, 
    resetStore 
  } = useProductStore();
  
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    // 1. Kiểm tra dữ liệu
    // Logic: Nếu chọn Lens đắt tiền (khác standard) thì BẮT BUỘC phải nhập độ hoặc up ảnh.
    // Nếu chọn Standard thì có thể để trống (mua kính 0 độ).
    const requiresPrescription = selectedLensId !== 'standard';
    const hasPrescriptionData = prescription.imageUrl || (prescription.od.sphere || prescription.os.sphere);

    if (requiresPrescription && !hasPrescriptionData) {
      alert("Bạn đã chọn loại tròng kính đặc biệt. Vui lòng nhập độ cận hoặc tải ảnh đơn kính!");
      return;
    }

    // 2. Tính giá
    const selectedLens = LENS_OPTIONS.find(l => l.id === selectedLensId);
    const finalPrice = BASE_PRODUCT.basePrice + (selectedLens?.price || 0);

    // 3. Add to Cart
    addToCart({
      productId: productId || "unknown",
      name: BASE_PRODUCT.name,
      price: finalPrice,
      image: BASE_PRODUCT.image,
      quantity: 1,
      lensType: selectedLens?.title,
      // Luôn gửi kèm data prescription nếu người dùng có nhập (dù là lens standard)
      prescription: hasPrescriptionData ? prescription : undefined
    });

    resetStore(); 
  };

  return (
    <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 space-y-8 mt-8">
      
      {/* --- PHẦN 1: WIDGET NHẬP ĐỘ CẬN (LUÔN HIỆN) --- */}
      <div>
        <h3 className="text-sm font-bold text-[#4A8795] uppercase tracking-wide mb-3">
            1. Prescription (Độ cận)
        </h3>
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <PrescriptionWidget />
        </div>
      </div>

      {/* --- PHẦN 2: CHỌN LOẠI TRÒNG KÍNH (LENS) --- */}
      <div>
        <h3 className="text-sm font-bold text-[#4A8795] uppercase tracking-wide mb-3">
            2. Lens Selection
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {LENS_OPTIONS.map((lens) => {
            const isActive = selectedLensId === lens.id;
            return (
              <div 
                key={lens.id}
                onClick={() => setLensId(lens.id)} 
                className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all h-28 text-center
                  ${isActive 
                    ? 'bg-white border-[#4A8795] shadow-md ring-1 ring-[#4A8795]' 
                    : 'bg-white border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                  }`}
              >
                <lens.icon className={`w-5 h-5 mb-2 ${isActive ? 'text-[#4A8795]' : 'text-gray-400'}`} />
                <span className="text-sm font-bold text-gray-900">{lens.title}</span>
                <span className="text-xs text-gray-500 mt-1">{lens.subtitle}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- PHẦN 3: NÚT MUA HÀNG --- */}
      <Button 
        onClick={handleAddToCart}
        className="w-full h-14 text-lg font-bold bg-[#1e2575] hover:bg-[#151b54] shadow-xl shadow-blue-900/10 transition-all active:scale-[0.98]"
      >
        <ShoppingBag className="w-5 h-5 mr-2" />
        Add to Cart - ${(BASE_PRODUCT.basePrice + (LENS_OPTIONS.find(l=>l.id===selectedLensId)?.price || 0)).toFixed(2)}
      </Button>
    </div>
  );
}