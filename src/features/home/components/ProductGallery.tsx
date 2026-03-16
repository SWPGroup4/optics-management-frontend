import { useState, lazy, Suspense, useEffect } from 'react';
import { Camera, Tag, Box, Glasses, Layout, User, Target, Wrench, Scale } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { api } from '@/lib/axios';

const VirtualTryOn = lazy(() => import('@/components/common/VirtualTryOn'));

// Interface cho state của VirtualTryOn
interface VariantForTryOn {
  id: string;
  variantName?: string;
  color?: string;
  imageUrl: string;
}

// Thêm interface cho dữ liệu Variant trả về từ API
interface ApiVariant {
  id: string;
  colorName?: string;
}

// Thêm interface cho object hình ảnh của Product
interface ProductImage {
  imageUrl: string;
}

export default function ProductGallery({ productId }: { productId: string }) {
  // 1. Lấy dữ liệu từ Hook
  const { data: product, isLoading } = useProduct(productId);

  // 2. State cho thumbnail (lưu trữ URL string)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tryOnOpen, setTryOnOpen] = useState(false);
  const [variantImages, setVariantImages] = useState<VariantForTryOn[]>([]);

  // Fetch variants for Virtual Try-On
  useEffect(() => {
    if (!productId) return;
    const fetchVariants = async () => {
      try {
        const res = await api.get(`/products/${productId}/variants`, {
          params: { page: 0, size: 10, sortBy: 'id', sortDir: 'asc' },
        });
        const items = res.data?.result?.items ?? [];
        
        // Build variant images: use product images as fallback per variant
        const mapped: VariantForTryOn[] = items
          .map((v: ApiVariant) => ({
            id: v.id,
            variantName: v.colorName || undefined,
            color: v.colorName || undefined,
            imageUrl: '', // will be filled below
          }));
          
        // If product has images, assign first image to each variant as try-on image
        if (mapped.length > 0 && product?.imageUrl?.length) {
          mapped.forEach((m: VariantForTryOn, idx: number) => {
            m.imageUrl = product.imageUrl[idx % product.imageUrl.length]?.imageUrl || '';
          });
          setVariantImages(mapped.filter((m: VariantForTryOn) => m.imageUrl));
        } else if (product?.imageUrl?.length) {
          // No variants — use product images directly
          setVariantImages(
            product.imageUrl.map((img: ProductImage, idx: number) => ({
              id: `img-${idx}`,
              imageUrl: img.imageUrl,
            }))
          );
        }
      } catch {
        // Fallback: use product images if variant fetch fails
        if (product?.imageUrl?.length) {
          setVariantImages(
            product.imageUrl.map((img: ProductImage, idx: number) => ({
              id: `img-${idx}`,
              imageUrl: img.imageUrl,
            }))
          );
        }
      }
    };
    fetchVariants();
  }, [productId, product]);

  // 3. Loading Skeleton
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

  // 👇 FIX LOGIC HIỂN THỊ ẢNH
  // 4a. Bóc tách mảng object thành mảng các đường link (string)
  const images = product.imageUrl?.map((imgObj: ProductImage) => imgObj.imageUrl) || [];

  // 4b. Link dự phòng an toàn
  const fallbackImg =
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800';

  // 4c. Xác định ảnh active (ưu tiên ảnh đã click -> ảnh đầu tiên -> ảnh dự phòng)
  const activeImage = selectedImage || (images.length > 0 ? images[0] : fallbackImg);

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
        <img
          key={activeImage}
          src={activeImage}
          alt={product.name}
          className="w-4/5 object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-110 animate-product-in"
          // Chống lỗi link S3 chết
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
            e.currentTarget.onerror = null;
          }}
        />

        {/* Nút Virtual Try-On */}
        <button
          onClick={() => setTryOnOpen(true)}
          className="absolute bottom-6 flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full shadow-xl hover:bg-[#4A8795] hover:text-white transition-all active:scale-95 text-sm font-bold text-[#4A8795] border border-white/50 group/btn"
        >
          <Camera className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
          Virtual Try-On
        </button>
      </div>

      {/* --- DANH SÁCH ẢNH THUMBNAILS --- */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {images.map((imgStr: string, index: number) => {
            const isActive = activeImage === imgStr;
            return (
              <div
                key={`${productId}-${index}`}
                onClick={() => setSelectedImage(imgStr)}
                className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-white border-2 cursor-pointer flex items-center justify-center transition-all duration-300 overflow-hidden
                  ${
                    isActive
                      ? 'border-[#4A8795] shadow-lg scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-200'
                  }`}
              >
                <img
                  src={imgStr}
                  className="w-5/6 object-contain mix-blend-multiply"
                  alt={`Thumb ${index}`}
                  onError={(e) => {
                    e.currentTarget.src = fallbackImg;
                    e.currentTarget.onerror = null;
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* --- THÔNG SỐ KỸ THUẬT (BENTO GRID UI) --- */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">
              Thông số chi tiết
            </h3>
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold tracking-widest rounded-full">
              Specs
            </span>
          </div>
        </div>

        {/* Lưới Grid 2 cột (Tự động xuống 1 cột trên điện thoại nhỏ) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            { label: 'Thương hiệu', value: product.brand, icon: Tag },
            { label: 'Chất liệu', value: product.frameMaterial, icon: Box },
            { label: 'Kiểu dáng', value: product.shape, icon: Glasses },
            { label: 'Loại gọng', value: product.frameType, icon: Layout },
            { label: 'Giới tính', value: product.gender, icon: User },
            { label: 'Đệm mũi', value: product.nosePadType, icon: Target },
            { label: 'Bản lề', value: product.hingeType, icon: Wrench },
            { label: 'Trọng lượng', value: product.weightGram ? `${product.weightGram}g` : null, icon: Scale },
          ]
            .filter((item) => item.value)
            .map((item) => {
              const Icon = item.icon;
              
              return (
                <div 
                  key={item.label} 
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFB] border border-transparent hover:border-[#4A8795]/20 hover:bg-white hover:shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300"
                >
                  {/* Cột trái: Icon */}
                  <div className="w-10 h-10 flex shrink-0 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm group-hover:text-[#4A8795] group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  
                  {/* Cột phải: Text */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-gray-900 capitalize truncate">
                      {item.value?.toString().replace(/_/g, ' ').toLowerCase()}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* Virtual Try-On Overlay */}
      {tryOnOpen && (
        <Suspense fallback={null}>
          <VirtualTryOn
            open={tryOnOpen}
            onClose={() => setTryOnOpen(false)}
            productName={product.name}
            variantImages={variantImages}
          />
        </Suspense>
      )}
    </div>
  );
}