import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface ProductVariant {
  id: string;
  productId: string;
  colorName: string;
  sizeLabel: string;
  price: number;
  frameFinish: string;
  status: string;
}

export interface GetVariantsResponse {
  code: number;
  result: {
    items: ProductVariant[];
    totalElements: number;
  };
}

const productApi = {
  getVariants: async (productId: string): Promise<ProductVariant[]> => {
    const response = await api.get<GetVariantsResponse>(`/products/${productId}/variants`, {
      params: {
        page: 0,
        size: 10,
        sortBy: 'id',
        sortDir: 'asc',
      },
    });
    return response.data?.result?.items ?? [];
  },
};

interface ProductVariantsModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectVariant: (variant: ProductVariant) => void;
}

export default function ProductVariantsModal({
  productId,
  isOpen,
  onClose,
  onSelectVariant,
}: ProductVariantsModalProps) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !productId) return;

    const fetchVariants = async () => {
      try {
        setIsLoading(true);
        const data = await productApi.getVariants(productId);
        setVariants(data);
      } catch (error) {
        console.error('Lỗi load variants:', error);
        setVariants([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVariants();
  }, [productId, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chọn phân loại sản phẩm</DialogTitle>
        </DialogHeader>

        <div className="mt-4 min-h-[100px]">
          {isLoading ? (
            <div className="text-center text-gray-500 py-4 animate-pulse">
              Đang tải phân loại...
            </div>
          ) : variants.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {/* 👇 JSX đã được dọn sạch comment dư thừa */}
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  onClick={() => onSelectVariant(variant)}
                  className="cursor-pointer border rounded-lg p-4 hover:border-[#4A8795] hover:shadow-md transition-all flex flex-col items-center gap-1 bg-white"
                >
                  <div className="text-sm font-bold text-gray-800 text-center">
                    {variant.colorName}
                  </div>

                  <div className="text-xs text-gray-500 uppercase">Size: {variant.sizeLabel}</div>

                  <div className="text-sm text-[#4A8795] font-bold mt-1">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      variant.price,
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm py-4">
              Sản phẩm này không có phân loại nào.
              <Button
                className="mt-4 w-full"
                // Type casting để vượt qua lỗi TS khi fallback
                onClick={() =>
                  onSelectVariant({
                    id: 'default',
                    colorName: 'Mặc định',
                    sizeLabel: 'Standard',
                    price: 0,
                  } as ProductVariant)
                }
              >
                Tiếp tục với bản mặc định
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
