import { ShoppingBag, Info, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrescriptionStore } from '../store/usePrescriptionStore';
import { useCartStore } from '@/features/cart/store/useCartStore';
import PrescriptionWidget from './PrescriptionModal';
import { useProduct } from '../hooks/useProducts';
import { useState } from 'react';
import ProductVariantsModal, { type ProductVariant } from './ProductVariantsModal';
import { useLenses } from '@/features/manager/hooks/useLense';
import type { LensProduct } from '@/features/manager/types/lens';

// Mình khai báo lại ở đây để file này chạy độc lập không báo lỗi
export interface ProductImage {
  id: string;
  imageUrl: string;
}

export default function ProductForm({ productId }: { productId: string }) {
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  // --- STATE CHO UI CHỌN TRÒNG KÍNH ---
  const [isLensSelectionOpen, setIsLensSelectionOpen] = useState(true);
  const [expandedLensId, setExpandedLensId] = useState<string | null>(null);
  
  // STATE MỚI: Phân trang cho tròng kính
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Lấy data sản phẩm (Gọng)
  const { data: product, isLoading: isProductLoading } = useProduct(productId);
  
  // Lấy data Tròng kính từ API
  const { lenses, isLoading: isLensesLoading } = useLenses();
  
  // LOGIC PHÂN TRANG
  const totalLenses = lenses?.length || 0;
  const totalPages = Math.ceil(totalLenses / itemsPerPage);
  
  // Cắt mảng lenses ra theo trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPaginatedLenses = lenses?.slice(startIndex, endIndex) || [];

  const { selectedLensId, setLensId, prescription, resetPrescription, orderType, setOrderType } =
    usePrescriptionStore();

  const { addToCart } = useCartStore();

  // Tìm data của tròng kính đang được chọn từ API
  const currentLens = lenses?.find((l: LensProduct) => l.id === selectedLensId);

  const handlePreAddToCart = () => {
    if (!product) return;

    if (!selectedLensId) {
      alert('Vui lòng chọn tròng kính trước khi thêm vào giỏ hàng!');
      return;
    }

    // Giả định: Tròng tính phí (> 0đ) thì bắt buộc nhập thông tin độ cận
    const requiresPrescription = currentLens && currentLens.price > 0;
    
    const isOdHasData = Object.values(prescription.od || {}).some(val => val !== '');
    const isOsHasData = Object.values(prescription.os || {}).some(val => val !== '');
    const hasPrescriptionData = Boolean(
      prescription.imageUrl || isOdHasData || isOsHasData || prescription.notes
    );

    if (requiresPrescription && !hasPrescriptionData) {
      alert('Vui lòng nhập độ cận hoặc tải ảnh đơn kính cho loại tròng này!');
      return;
    }
    
    setIsVariantModalOpen(true);
  };

  const handleConfirmVariant = (variant: ProductVariant) => {
    const basePrice = variant.price || 0;
    // Lấy giá từ currentLens (API)
    const finalPrice = basePrice + (currentLens?.price || 0);

    if (!product) return;

    // 1. LẤY ẢNH SẢN PHẨM AN TOÀN (Dùng ProductImage thay vì any)
    const images = Array.isArray(product.imageUrl) ? product.imageUrl.map((imgObj: ProductImage) => imgObj.imageUrl) : [];
    const fallbackImg = 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800';
    const safeProductImage = images.length > 0 ? images[0] : fallbackImg;

    // 2. KIỂM TRA ĐIỀU KIỆN ĐƠN KÍNH
    const isOdHasData = Object.values(prescription.od || {}).some(val => val !== '');
    const isOsHasData = Object.values(prescription.os || {}).some(val => val !== '');
    const hasPrescriptionData = Boolean(
      prescription.imageUrl || isOdHasData || isOsHasData || prescription.notes
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
      image: safeProductImage,
      quantity: 1,
      // Đã cập nhật chuẩn theo Type
      lensType: currentLens?.name || 'Tròng mặc định',
      orderType: orderType,
      prescription: prescriptionToSave,
    };

    console.log("=== DỮ LIỆU ĐẨY VÀO GIỎ HÀNG ===", cartPayload);
    addToCart(cartPayload);
    setIsVariantModalOpen(false);
    
    setTimeout(() => {
      resetPrescription();
      setIsLensSelectionOpen(true); // <--- Mở lại list tròng kính cho lần mua sau
    }, 200);
    
    alert('Đã thêm vào giỏ hàng!');
  };

  if (isProductLoading)
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
              className={`flex-1 capitalize ${orderType === type ? 'bg-[#4A8795] text-white hover:bg-[#3a6b77]' : ''}`}
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
        {/* TIÊU ĐỀ KÈM THEO PANGINATION ĐIỀU HƯỚNG */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-[#4A8795] uppercase tracking-wide">
            3. Lens Selection
          </h3>
          
          {/* NÚT ĐIỀU HƯỚNG (Chỉ hiện khi đang mở danh sách và có nhiều hơn 1 trang) */}
          {isLensSelectionOpen && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-md bg-white border border-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium text-gray-500">
                {currentPage} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded-md bg-white border border-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {isLensesLoading ? (
          <div className="animate-pulse h-24 bg-gray-200 rounded-xl"></div>
        ) : lenses?.length === 0 ? (
          <div className="text-sm text-red-500">Chưa có dữ liệu tròng kính từ hệ thống.</div>
        ) : (
          <div className="relative">
            {/* TRẠNG THÁI 1: THẺ THU GỌN (KHI ĐÃ CHỌN) */}
            {!isLensSelectionOpen && currentLens && (
              <div className="bg-white border-2 border-[#4A8795] rounded-xl p-4 flex justify-between items-center shadow-sm animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#4A8795]" />
                  <div>
                    {/* Đã cập nhật chuẩn theo Type */}
                    <p className="text-gray-900 font-bold">{currentLens.name}</p>
                    <p className="text-[#4A8795] font-medium text-sm">
                      {currentLens.price === 0 ? 'Miễn phí' : `+ ${currentLens.price.toLocaleString('vi-VN')} ₫`}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsLensSelectionOpen(true)}
                  className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-[#4A8795] hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Thay đổi
                </button>
              </div>
            )}

            {/* TRẠNG THÁI 2: DANH SÁCH MỞ RỘNG (Với 3 item mỗi trang) */}
            {isLensSelectionOpen && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-300">
                {/* Thay thế topLenses bằng currentPaginatedLenses */}
                {currentPaginatedLenses.map((lens: LensProduct) => {
                  const isExpanded = expandedLensId === lens.id;
                  const isSelected = selectedLensId === lens.id;

                  return (
                    <div 
                      key={lens.id} 
                      className={`border rounded-xl transition-all duration-300 overflow-hidden bg-white cursor-pointer ${
                        isSelected ? 'border-[#4A8795] shadow-sm' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {/* Bề mặt Card */}
                      <div 
                        className="p-4 flex items-start gap-3"
                        onClick={() => {
                          setLensId(lens.id);               // 1. Lưu ID tròng kính
                          setIsLensSelectionOpen(false);    // 2. Tự động thu gọn Card ngay lập tức
                        }}
                      >
                        {/* Radio Button Ảo */}
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-[#4A8795]' : 'border-gray-300'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#4A8795] rounded-full" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            {/* Đã cập nhật chuẩn theo Type */}
                            <h4 className={`font-bold ${isSelected ? 'text-[#4A8795]' : 'text-gray-900'}`}>
                              {lens.name}
                            </h4>
                            <span className="font-bold text-gray-900 whitespace-nowrap ml-2">
                              {lens.price === 0 ? 'Included' : `+${lens.price.toLocaleString('vi-VN')}đ`}
                            </span>
                          </div>
                          
                          {/* Nút Xem chi tiết */}
                          <div className="mt-2 inline-flex">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedLensId(isExpanded ? null : lens.id);
                              }}
                              className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md transition-colors"
                            >
                              <Info className="w-3.5 h-3.5" />
                              {isExpanded ? 'Đóng thông số' : 'Xem thông số'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Phần Accordion trượt xuống */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${
                          isExpanded ? 'max-h-40 opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="p-4 text-sm text-gray-600 space-y-1.5 ml-8">
                          {/* Đã cập nhật chuẩn theo Type: material và description */}
                          <p><span className="font-semibold text-gray-900">Chất liệu:</span> {lens.material || 'Tiêu chuẩn'}</p>
                          <p>{lens.description || 'Không có mô tả chi tiết.'}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Nút mua hàng */}
      <Button
        onClick={handlePreAddToCart}
        className="w-full h-14 text-lg font-bold bg-[#1e2575] hover:bg-[#151b54] shadow-xl transition-all active:scale-[0.98] mt-6"
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