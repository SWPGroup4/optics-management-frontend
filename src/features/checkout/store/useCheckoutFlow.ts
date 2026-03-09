import { useState } from 'react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useCheckoutStore } from '@/features/checkout/store/useCheckoutStore';
import { api } from '@/lib/axios';
import { toast } from 'sonner'; // Import Sonner
import axios from 'axios';

export const useCheckoutFlow = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { step, setStep, nextStep, prevStep, shippingData, paymentMethod } = useCheckoutStore();
  const { items, clearCart } = useCartStore();

  const submitOrder = async () => {
    // Tạo một toastId duy nhất để có thể update trạng thái sau này
    const toastId = toast.loading('Đang khởi tạo đơn hàng...');

    try {
      setIsSubmitting(true);

      // --- VALIDATION NHANH ---
      if (!shippingData.phone || !shippingData.address) {
        toast.error('Thiếu thông tin giao hàng', {
          id: toastId,
          description: 'Vui lòng kiểm tra lại số điện thoại và địa chỉ.',
        });
        setIsSubmitting(false);
        setStep(1);
        return;
      }

      // --- BƯỚC 1: CHUẨN BỊ DATA ---
      const deliveryAddress =
        `${shippingData.address || ''}, ${shippingData.city || ''}, ${shippingData.state || ''} ${shippingData.zip || ''}`.trim();

      const orderItems = items.map((item) => {
        let mappedPrescription = undefined;
        if (item.prescription) {
          const p = item.prescription;
          mappedPrescription = {
            odSphere: parseFloat(p.od?.sphere) || 0,
            odCylinder: parseFloat(p.od?.cylinder) || 0,
            odAxis: parseFloat(p.od?.axis) || 0,
            odAdd: parseFloat(p.od?.add) || 0,
            odPd: parseFloat(p.od?.pd) || 0,
            osSphere: parseFloat(p.os?.sphere) || 0,
            osCylinder: parseFloat(p.os?.cylinder) || 0,
            osAxis: parseFloat(p.os?.axis) || 0,
            osAdd: parseFloat(p.os?.add) || 0,
            osPd: parseFloat(p.os?.pd) || 0,
            note: p.notes || '',
          };
        }
        return {
          productVariantId: item.productId,
          quantity: item.quantity,
          lensId: item.lensId || null,
          ...(mappedPrescription ? { prescription: mappedPrescription } : {}),
        };
      });

      const orderInfo = {
        deliveryAddress,
        phoneNumber: shippingData.phone,
        items: orderItems,
      };

      const formData = new FormData();
      formData.append('orderInfo', JSON.stringify(orderInfo));

      // Xử lý ảnh prescription
      const itemWithImage = items.find((item) => item.prescription?.imageUrl);
      if (itemWithImage?.prescription?.imageUrl?.startsWith('blob:')) {
        const response = await fetch(itemWithImage.prescription.imageUrl);
        const blobData = await response.blob();
        formData.append('prescriptionImage', blobData, 'prescription.jpg');
      } else {
        formData.append('prescriptionImage', '');
      }

      const hasPrescription = items.some((item) => item.lensId !== null);
      const currentOrderItemType = hasPrescription ? 'PRESCRIPTION' : 'IN_STOCK';

      // --- BƯỚC 2: TẠO ĐƠN HÀNG ---
      const orderResponse = await api.post('/orders/create', formData, {
        params: {
          OrderItemType: currentOrderItemType,
          PaymentMethod: paymentMethod,
        },
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const actualOrderId = orderResponse.data?.result?.orderId || orderResponse.data?.orderId;
      if (!actualOrderId) throw new Error('Không lấy được mã đơn hàng.');

      // --- BƯỚC 3: XỬ LÝ THANH TOÁN ---
      if (paymentMethod === 'VNPAY') {
        toast.loading('Đang kết nối cổng thanh toán VNPay...', { id: toastId });

        const paymentResponse = await api.post('/payment/checkout', null, {
          params: { orderId: actualOrderId },
        });

        const paymentUrl = paymentResponse.data?.result || paymentResponse.data;

        if (paymentUrl && typeof paymentUrl === 'string') {
          clearCart();
          // Chuyển hướng sau một khoảng nghỉ ngắn để user kịp thấy thông báo
          setTimeout(() => {
            window.location.href = paymentUrl;
          }, 1000);
        } else {
          toast.error('Lỗi cổng thanh toán VNPay', { id: toastId });
          setIsSubmitting(false);
        }
      } else {
        // Trường hợp COD hoặc phương thức khác
        clearCart();
        toast.success('Đặt hàng thành công!', {
          id: toastId,
          description: 'Cảm ơn bạn đã mua hàng. Chúng tôi sẽ sớm liên hệ!',
        });

        setTimeout(() => {
          setIsSubmitting(false);
          window.location.href = '/';
        }, 2000);
      }
    } catch (error: unknown) {
      // Dùng unknown thay cho any
      console.error('Checkout Error:', error);

      let errorMessage = 'Có lỗi xảy ra, vui lòng thử lại sau.';

      // Kiểm tra nếu là lỗi từ Axios để lấy message từ Server
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error('Đặt hàng thất bại', {
        id: toastId,
        description: errorMessage,
      });
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
