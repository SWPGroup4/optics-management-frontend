import { useState } from 'react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useCheckoutStore } from '@/features/checkout/store/useCheckoutStore';
import { api } from '@/lib/axios';

export const useCheckoutFlow = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lấy toàn bộ state và action từ các Store
  const { step, setStep, nextStep, prevStep, shippingData } = useCheckoutStore();
  const { items, clearCart } = useCartStore();

  const submitOrder = async () => {
    try {
      setIsSubmitting(true);

      // --- BƯỚC 1: TẠO ĐƠN HÀNG ---
      const deliveryAddress = `${shippingData.address}, ${shippingData.city}, ${shippingData.state} ${shippingData.zip}`;

      const orderItems = items.map((item) => ({
        productVariantId: item.productId,
        quantity: item.quantity,
      }));

      const orderInfo = {
        deliveryAddress: deliveryAddress,
        phoneNumber: shippingData.phone,
        items: orderItems,
      };

      const formData = new FormData();
      formData.append('orderInfo', JSON.stringify(orderInfo));

      const itemWithImage = items.find((item) => item.prescription?.imageUrl);
      if (itemWithImage && itemWithImage.prescription?.imageUrl) {
        formData.append('prescriptionImage', itemWithImage.prescription.imageUrl);
      }

      // 1.1 Gọi API tạo đơn hàng
      const orderResponse = await api.post('/orders/create', formData, {
        params: {
          OrderItemType: 'IN_STOCK',
          PaymentMethod: 'VNPAY', // Nếu muốn thanh toán VNPay, có thể BE bạn cần đổi field này thành VNPAY, hãy hỏi lại BE nhé
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Kết quả tạo đơn:', orderResponse.data);

      // 1.2 Lấy Order ID thực tế từ Backend trả về
      // (Tùy cấu trúc BE mà trường này có thể là id, orderId, hoặc result.id)
      const actualOrderId = orderResponse.data?.result?.orderId || orderResponse.data?.orderId;

      if (!actualOrderId) {
        throw new Error('Không lấy được mã đơn hàng từ hệ thống.');
      }

      // --- BƯỚC 2: GỌI API THANH TOÁN LẤY LINK VNPAY ---
      // Lưu ý: API yêu cầu POST nhưng body rỗng (-d ''), và truyền orderId qua params
      const paymentResponse = await api.post('/payment/checkout', null, {
        params: {
          orderId: actualOrderId,
        },
      });

      console.log('Kết quả lấy link thanh toán:', paymentResponse.data);

      const paymentUrl = paymentResponse.data?.result;

      if (paymentUrl) {
        // Đặt hàng & Lấy link thành công -> Xóa giỏ hàng
        clearCart();

        // --- BƯỚC 3: MỞ POPUP THANH TOÁN ---
        const width = 800;
        const height = 700;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        const popup = window.open(
          paymentUrl,
          'VNPayCheckout',
          `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`,
        );

        // Fallback: Trình duyệt chặn popup (Adblock / Browser settings)
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          alert(
            'Trình duyệt của bạn đã chặn Popup. Hệ thống sẽ chuyển hướng trực tiếp đến trang thanh toán.',
          );
          window.location.href = paymentUrl; // Chuyển thẳng trang hiện tại sang VNPay
        }
      } else {
        alert('Không lấy được đường dẫn thanh toán VNPay.');
      }
    } catch (error) {
      console.error('Lỗi khi xử lý đơn hàng/thanh toán:', error);
      alert('Có lỗi xảy ra, vui lòng kiểm tra lại thông tin!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    if (step < 3) {
      nextStep();
    } else {
      submitOrder();
    }
  };

  return {
    step,
    setStep,
    handleContinue,
    handleBack: prevStep,
    isSubmitting,
  };
};
