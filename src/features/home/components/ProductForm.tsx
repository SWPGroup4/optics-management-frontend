import { useEffect } from "react";
import { Monitor, RefreshCcw, ShoppingBag, Sparkles, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductStore } from "../store/useProductStore"; 
import { usePrescriptionStore } from "../store/usePrescriptionStore"; // Store mới
import { useCartStore } from "@/features/cart/store/useCartStore";
import PrescriptionWidget from "./PrescriptionModal";

const LENS_OPTIONS = [
  { id: "standard", icon: Sparkles, title: "Standard Clear", subtitle: "Included", price: 0 },
  { id: "transitions", icon: RefreshCcw, title: "Transitions", subtitle: "+$95.00", price: 95 },
  { id: "bluelight", icon: Monitor, title: "Blue Light Filter", subtitle: "+$45.00", price: 45 },
  { id: "sunglass", icon: Sun, title: "Sun Tints", subtitle: "+$60.00", price: 60 },
] as const;

export default function ProductForm({ productId }: { productId: string }) {
  // 1. Lấy dữ liệu sản phẩm từ ProductStore
  const { currentProduct, fetchProductById } = useProductStore();
  
  // 2. Lấy logic form từ PrescriptionStore
  const { 
    selectedLensId, 
    setLensId, 
    prescription, 
    resetPrescription,
    orderType,
    setOrderType 
  } = usePrescriptionStore();
  
  const { addToCart } = useCartStore();

  // Load sản phẩm khi productId thay đổi
  useEffect(() => {
    if (productId) fetchProductById(productId);
  }, [productId, fetchProductById]);

  const handleAddToCart = () => {
    if (!currentProduct) return;

    // Logic kiểm tra Prescription
    const requiresPrescription = selectedLensId !== 'standard';
    const hasPrescriptionData = 
      prescription.imageUrl || 
      (prescription.od.sphere && prescription.os.sphere);

    if (requiresPrescription && !hasPrescriptionData) {
      alert("Vui lòng nhập độ cận hoặc tải ảnh đơn kính cho loại tròng này!");
      return;
    }

    const selectedLens = LENS_OPTIONS.find(l => l.id === selectedLensId);
    // Tính giá: weightGram (giá gốc) + lens price
    const basePrice = currentProduct.weightGram || 0;
    const finalPrice = basePrice + (selectedLens?.price || 0);

    addToCart({
      productId: currentProduct.id,
      name: currentProduct.name,
      price: finalPrice,
      image: currentProduct.imageUrl[0],
      quantity: 1,
      lensType: selectedLens?.title,
      orderType: orderType, // Thêm orderType vào giỏ hàng
      prescription: hasPrescriptionData ? prescription : undefined
    });

    resetPrescription(); 
    alert("Đã thêm vào giỏ hàng thành công!");
  };

  if (!currentProduct) return <div className="p-10 text-center text-gray-400">Đang tải form...</div>;

  const currentLensPrice = LENS_OPTIONS.find(l => l.id === selectedLensId)?.price || 0;
  const totalPrice = (currentProduct.weightGram || 0) + currentLensPrice;

  return (
    <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 space-y-8 mt-8">
      
      {/* --- PHẦN 1: ORDER TYPE (Dùng orderType từ Store) --- */}
      <div>
        <h3 className="text-sm font-bold text-[#4A8795] uppercase tracking-wide mb-3">
            1. Order Type
        </h3>
        <div className="flex gap-2">
            {(['buy-now', 'pre-order'] as const).map((type) => (
                <Button
                    key={type}
                    variant={orderType === type ? "default" : "outline"}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 capitalize ${orderType === type ? 'bg-[#4A8795]' : ''}`}
                >
                    {type.replace('-', ' ')}
                </Button>
            ))}
        </div>
      </div>

      {/* --- PHẦN 2: PRESCRIPTION --- */}
      <div>
        <h3 className="text-sm font-bold text-[#4A8795] uppercase tracking-wide mb-3">
            2. Prescription
        </h3>
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <PrescriptionWidget />
        </div>
      </div>

      {/* --- PHẦN 3: LENS SELECTION --- */}
      <div>
        <h3 className="text-sm font-bold text-[#4A8795] uppercase tracking-wide mb-3">
            3. Lens Selection
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

      {/* --- PHẦN 4: NÚT MUA HÀNG --- */}
      <Button 
        onClick={handleAddToCart}
        className="w-full h-14 text-lg font-bold bg-[#1e2575] hover:bg-[#151b54] shadow-xl transition-all active:scale-[0.98]"
      >
        <ShoppingBag className="w-5 h-5 mr-2" />
        Add to Cart - ${totalPrice.toFixed(2)}
      </Button>
    </div>
  );
}