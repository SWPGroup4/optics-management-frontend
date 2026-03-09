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

export interface ProductImage {
  id: string;
  imageUrl: string;
}

export default function ProductForm({ productId }: { productId: string }) {
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [isLensSelectionOpen, setIsLensSelectionOpen] = useState(true);
  const [expandedLensId, setExpandedLensId] = useState<string | null>(null);
  
  // Phân trang tròng kính
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { data: product, isLoading: isProductLoading } = useProduct(productId);
  const { lenses, isLoading: isLensesLoading } = useLenses();
  
  // Logic phân trang
  const totalLenses = lenses?.length || 0;
  const totalPages = Math.ceil(totalLenses / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPaginatedLenses = lenses?.slice(startIndex, startIndex + itemsPerPage) || [];

  const { selectedLensId, setLensId, prescription, resetPrescription, orderType, setOrderType } =
    usePrescriptionStore();

  const { addToCart } = useCartStore();
  const currentLens = lenses?.find((l: LensProduct) => l.id === selectedLensId);

  const handlePreAddToCart = () => {
    if (!product) return;
    if (!selectedLensId) {
      alert('Vui lòng chọn tròng kính trước khi thêm vào giỏ hàng!');
      return;
    }
  
    
    setIsVariantModalOpen(true);
  };

  const handleConfirmVariant = (variant: ProductVariant) => {
    if (!product) return;
    
    const basePrice = variant.price || 0;
    const finalPrice = basePrice + (currentLens?.price || 0);

    const images = Array.isArray(product.imageUrl) ? product.imageUrl.map((imgObj: ProductImage) => imgObj.imageUrl) : [];
    const safeProductImage = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800';

    // KIỂM TRA DỮ LIỆU ĐƠN KÍNH ĐỂ QUYẾT ĐỊNH NULL
    const isOdHasData = Object.values(prescription.od || {}).some(val => val !== '');
    const isOsHasData = Object.values(prescription.os || {}).some(val => val !== '');
    const hasPrescriptionData = Boolean(prescription.imageUrl || isOdHasData || isOsHasData || prescription.notes);

    // Nếu không có bất kỳ dữ liệu nào, set là null để sạch Store
    const prescriptionToSave = hasPrescriptionData ? {
      imageUrl: prescription.imageUrl || null,
      notes: prescription.notes || "",
      od: { ...prescription.od },
      os: { ...prescription.os }
    } : null;

    const cartPayload = {
      productId: variant.id,
      name: `${product.name} - ${variant.colorName || 'Mặc định'} (${variant.sizeLabel || ''})`,
      price: finalPrice,
      image: safeProductImage,
      quantity: 1,
      lensId: currentLens?.id, 
      orderType: orderType,
      prescription: prescriptionToSave,
    };

    addToCart(cartPayload);
    setIsVariantModalOpen(false);
    
    setTimeout(() => {
      resetPrescription();
      setIsLensSelectionOpen(true);
    }, 200);
    
    alert('Đã thêm vào giỏ hàng!');
  };

  if (isProductLoading) return <div className="p-10 text-center animate-pulse text-gray-400">Đang tải...</div>;

  return (
    <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 space-y-8 mt-8">
      {/* 1. Order Type */}
      <div>
        <h3 className="text-sm font-bold text-[#4A8795] uppercase mb-3">1. Order Type</h3>
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
        <h3 className="text-sm font-bold text-[#4A8795] uppercase mb-3">2. Prescription</h3>
        <PrescriptionWidget />
      </div>

      {/* 3. Lens Selection */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-[#4A8795] uppercase">3. Lens Selection</h3>
          {isLensSelectionOpen && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded bg-white border border-gray-200 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium text-gray-500">{currentPage}/{totalPages}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded bg-white border border-gray-200 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {isLensesLoading ? (
          <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />
        ) : (
          <div className="relative">
            {!isLensSelectionOpen && currentLens && (
              <div className="bg-white border-2 border-[#4A8795] rounded-xl p-4 flex justify-between items-center animate-in fade-in slide-in-from-top-2 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#4A8795]" />
                  <div>
                    <p className="text-gray-900 font-bold">{currentLens.name}</p>
                    <p className="text-[#4A8795] text-sm font-medium">
                      {currentLens.price === 0 ? 'Miễn phí' : `+ ${currentLens.price.toLocaleString('vi-VN')} ₫`}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsLensSelectionOpen(true)} 
                  className="text-sm font-medium text-gray-500 hover:text-[#4A8795] transition-colors"
                >
                  Thay đổi
                </button>
              </div>
            )}

            {isLensSelectionOpen && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-300">
                {currentPaginatedLenses.map((lens: LensProduct) => (
                  <div 
                    key={lens.id} 
                    className={`border rounded-xl bg-white cursor-pointer transition-all ${selectedLensId === lens.id ? 'border-[#4A8795] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="p-4 flex items-start gap-3" onClick={() => { setLensId(lens.id); setIsLensSelectionOpen(false); }}>
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedLensId === lens.id ? 'border-[#4A8795]' : 'border-gray-300'}`}>
                        {selectedLensId === lens.id && <div className="w-2.5 h-2.5 bg-[#4A8795] rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={`font-bold ${selectedLensId === lens.id ? 'text-[#4A8795]' : 'text-gray-900'}`}>{lens.name}</h4>
                          <span className="font-bold text-gray-900 whitespace-nowrap ml-2">
                            {lens.price === 0 ? 'Included' : `+${lens.price.toLocaleString('vi-VN')}đ`}
                          </span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setExpandedLensId(expandedLensId === lens.id ? null : lens.id); }}
                          className="mt-2 text-xs font-medium text-gray-500 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md"
                        >
                          <Info className="w-3.5 h-3.5" /> {expandedLensId === lens.id ? 'Đóng' : 'Thông số'}
                        </button>
                      </div>
                    </div>
                    {expandedLensId === lens.id && (
                      <div className="p-4 bg-gray-50 border-t text-sm text-gray-600 ml-8 animate-in slide-in-from-top-1">
                        <p className="mb-1"><span className="font-semibold text-gray-900">Chất liệu:</span> {lens.material || 'Tiêu chuẩn'}</p>
                        <p>{lens.description || 'Không có mô tả chi tiết.'}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Button 
        onClick={handlePreAddToCart} 
        className="w-full h-14 text-lg font-bold bg-[#1e2575] hover:bg-[#151b54] shadow-lg transition-all active:scale-[0.98] mt-6"
      >
        <ShoppingBag className="w-5 h-5 mr-2" /> 
        Select Variant & Add to Cart
      </Button>

      <ProductVariantsModal 
        productId={productId} 
        isOpen={isVariantModalOpen} 
        onClose={() => setIsVariantModalOpen(false)} 
        onSelectVariant={handleConfirmVariant} 
      />
    </div>
  );
}