import { useCartStore } from '@/features/cart/store/useCartStore';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCheckoutStore } from './useCheckoutStore';


export const useOrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);
  const resetCheckout = useCheckoutStore((state) => state.resetCheckout);

  // 1. Logic Cleanup: Chạy 1 lần khi hook được gọi (Component mount)
  useEffect(() => {
    clearCart();
    resetCheckout();
  }, [clearCart, resetCheckout]);

  // 2. Logic lấy dữ liệu hiển thị
  const orderId = searchParams.get('orderId') || '#UNKNOWN';
  const email = searchParams.get('email') || 'customer@example.com';

  // 3. Logic tính toán ngày giao hàng (Pure logic)
  const deliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3); // Cộng thêm 3 ngày
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }, []);

  return {
    orderId,
    email,
    deliveryDate
  };
};