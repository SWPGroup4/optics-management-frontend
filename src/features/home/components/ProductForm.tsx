import { Monitor, RefreshCcw, ShoppingBag, Sparkles, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrescriptionStore } from '../store/usePrescriptionStore';
import { useCartStore } from '@/features/cart/store/useCartStore';
import PrescriptionWidget from './PrescriptionModal';
import { useProduct } from '../hooks/useProducts';
import { useState } from 'react';
import ProductVariantsModal, { type ProductVariant } from './ProductVariantsModal';

// Đã quy đổi giá LENS_OPTIONS sang VND (Tạm tính theo tỷ giá ~24k hoặc bạn tự chỉnh lại cho đúng giá shop)
const LENS_OPTIONS = [
  { id: 'standard', icon: Sparkles, title: 'Standard Clear', subtitle: 'Included', price: 0 },
  {
    id: 'transitions',
    icon: RefreshCcw,
    title: 'Transitions',
    subtitle: '+2,300,000đ',
    price: 2300000,
  },
  {
    id: 'bluelight',
    icon: Monitor,
    title: 'Blue Light Filter',
    subtitle: '+1,100,000đ',
    price: 1100000,
  },
  { id: 'sunglass', icon: Sun, title: 'Sun Tints', subtitle: '+1,450,000đ', price: 1450000 },
] as const;

export default function ProductForm({ productId }: { productId: string }) {
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  const { data: product, isLoading } = useProduct(productId);

  const { selectedLensId, setLensId, prescription, resetPrescription, orderType, setOrderType } =
    usePrescriptionStore();

  const { addToCart } = useCartStore();

  const handlePreAddToCart = () => {
    if (!product) return;

    const requiresPrescription = selectedLensId !== 'standard';
    const hasPrescriptionData =
      prescription.imageUrl || (prescription.od.sphere && prescription.os.sphere);

    if (requiresPrescription && !hasPrescriptionData) {
      alert('Vui lòng nhập độ cận hoặc tải ảnh đơn kính cho loại tròng này!');
      return;
    }
    setIsVariantModalOpen(true);
  };

  const handleConfirmVariant = (variant: ProductVariant) => {
    const selectedLens = LENS_OPTIONS.find((l) => l.id === selectedLensId);

    const basePrice = variant.price || 0;
    const finalPrice = basePrice + (selectedLens?.price || 0);

    if (!product) return;

    // 1. LẤY ẢNH SẢN PHẨM AN TOÀN (Kế thừa từ logic đã fix)
    const images = Array.isArray(product.imageUrl) ? product.imageUrl.map((imgObj) => imgObj.imageUrl) : [];
    const fallbackImg = 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800';
    const safeProductImage = images.length > 0 ? images[0] : fallbackImg;

    // 2. KIỂM TRA ĐIỀU KIỆN ĐƠN KÍNH (BẮT BỆNH Ở ĐÂY)
    // Dùng Object.values để quét xem có ô nào ở mắt OD/OS được nhập hay không
    const isOdHasData = Object.values(prescription.od || {}).some(val => val !== '');
    const isOsHasData = Object.values(prescription.os || {}).some(val => val !== '');

    // Gom điều kiện: Chỉ cần 1 trong 4 cái này có data là HỢP LỆ
    const hasPrescriptionData = Boolean(
      prescription.imageUrl || 
      isOdHasData || 
      isOsHasData || 
      prescription.notes
    );

    // 3. CLONE DỮ LIỆU
    let prescriptionToSave = undefined;
    
    if (hasPrescriptionData) {
      prescriptionToSave = {
        imageUrl: prescription.imageUrl || null,
        notes: prescription.notes || "",
        od: {
          sphere: prescription.od?.sphere || "",
          cylinder: prescription.od?.cylinder || "",
          axis: prescription.od?.axis || "",
          add: prescription.od?.add || "",
          pd: prescription.od?.pd || "",
        },
        os: {
          sphere: prescription.os?.sphere || "",
          cylinder: prescription.os?.cylinder || "",
          axis: prescription.os?.axis || "",
          add: prescription.os?.add || "",
          pd: prescription.os?.pd || "",
        }
      };
    }

    // 4. ĐÓNG GÓI PAYLOAD
    const cartPayload = {
      productId: variant.id,
      name: `${product.name} - ${variant.colorName || 'Mặc định'} (${variant.sizeLabel || ''})`,
      price: finalPrice,
      image: safeProductImage, // Truyền ảnh an toàn vào
      quantity: 1,
      lensType: selectedLens?.title,
      orderType: orderType,
      prescription: prescriptionToSave, // Đã hết undefined!
    };

    // LOG RA CONSOLE ĐỂ KIỂM TRA
    console.log("=== DỮ LIỆU ĐẨY VÀO GIỎ HÀNG ===", cartPayload);

    addToCart(cartPayload);

    setIsVariantModalOpen(false);
    
    // Đợi 200ms cho chắc chắn
    setTimeout(() => {
      resetPrescription();
    }, 200);
    
    alert('Đã thêm vào giỏ hàng!');
  };

  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-400 animate-pulse">
        Đang tải thông tin sản phẩm...
      </div>
    );
  if (!product) return <div className="p-10 text-center text-red-400">Không tìm thấy sản phẩm</div>;

  return (
    <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 space-y-8 mt-8">
      {/* 1. Order Type */}
      <div>
        <h3 className="text-sm font-bold text-[#4A8795] uppercase tracking-wide mb-3">
          1. Order Type
        </h3>
        <div className="flex gap-2">
          {(['buy-now', 'pre-order'] as const).map((type) => (
            <Button
              key={type}
              variant={orderType === type ? 'default' : 'outline'}
              onClick={() => setOrderType(type)}
              className={`flex-1 capitalize ${orderType === type ? 'bg-[#4A8795]' : ''}`}
            >
              {type.replace('-', ' ')}
            </Button>
          ))}
        </div>
      </div>

      {/* 2. Prescription */}
      <div>
        <h3 className="text-sm font-bold text-[#4A8795] uppercase tracking-wide mb-3">
          2. Prescription
        </h3>
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <PrescriptionWidget />
        </div>
      </div>

      {/* 3. Lens Selection */}
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
                  ${
                    isActive
                      ? 'bg-white border-[#4A8795] shadow-md ring-1 ring-[#4A8795]'
                      : 'bg-white border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                  }`}
              >
                <lens.icon
                  className={`w-5 h-5 mb-2 ${isActive ? 'text-[#4A8795]' : 'text-gray-400'}`}
                />
                <span className="text-sm font-bold text-gray-900">{lens.title}</span>
                <span className="text-xs text-gray-500 mt-1">{lens.subtitle}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Nút mua hàng */}
      <Button
        onClick={handlePreAddToCart}
        className="w-full h-14 text-lg font-bold bg-[#1e2575] hover:bg-[#151b54] shadow-xl transition-all active:scale-[0.98]"
      >
        <ShoppingBag className="w-5 h-5 mr-2" />
        Select Variant & Add to Cart
      </Button>

      {/* 5. Gắn Modal */}
      <ProductVariantsModal
        productId={productId}
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        onSelectVariant={handleConfirmVariant}
      />
    </div>
  );
}