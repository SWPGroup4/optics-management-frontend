import { useNavigate } from 'react-router-dom';
import { useCheckoutStore } from './useCheckoutStore';

export const useCheckoutFlow = () => {
  const navigate = useNavigate();
  const { step, setStep, nextStep, prevStep, shippingData } = useCheckoutStore();

  // Logic xử lý khi bấm nút "Continue"
  const handleContinue = () => {
    if (step < 3) {
      nextStep();
    } else {
      // === LOGIC SUBMIT ORDER TẠI ĐÂY ===
      // 1. Gọi API (nếu có)
      // 2. Tạo mã đơn hàng giả lập
      const mockOrderId = `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`;
      
      // 3. Điều hướng sang trang Success
      // Truyền data qua URL params để trang sau hiển thị
      const params = new URLSearchParams({
        orderId: mockOrderId,
        email: shippingData.email || 'customer@example.com'
      }).toString();

      navigate(`/checkout/success?${params}`);
    }
  };

  return {
    step,
    setStep,
    handleContinue, // Hàm xử lý chính đã gói gọn logic
    handleBack: prevStep
  };
};