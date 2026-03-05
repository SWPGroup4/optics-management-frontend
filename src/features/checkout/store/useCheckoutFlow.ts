import { useState } from 'react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useCheckoutStore } from '@/features/checkout/store/useCheckoutStore';
import { api } from '@/lib/axios';

export const useCheckoutFlow = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { step, setStep, nextStep, prevStep, shippingData, paymentMethod } = useCheckoutStore();
  const { items, clearCart } = useCartStore();

  const submitOrder = async () => {
    try {
      setIsSubmitting(true);

      // --- BƯỚC 1: TẠO ĐƠN HÀNG ---
      // Lưu ý nhỏ: Trong log của bạn, address đang là ", , ". Bạn có thể cần check lại validation ở form nhập địa chỉ nhé!
      const deliveryAddress = `${shippingData.address || ''}, ${shippingData.city || ''}, ${shippingData.state || ''} ${shippingData.zip || ''}`.trim();

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
            note: p.notes || ""
          };
        }

        return {
          productVariantId: item.productId, 
          quantity: item.quantity,
          ...(mappedPrescription ? { prescription: mappedPrescription } : {})
        };
      });

      const orderInfo = {
        deliveryAddress: deliveryAddress,
        phoneNumber: shippingData.phone,
        items: orderItems,
      };

      const formData = new FormData();
      formData.append('orderInfo', JSON.stringify(orderInfo));

      // 🔥 FIX: CHUYỂN ĐỔI BLOB URL THÀNH FILE THỰC TẾ 🔥
      const itemWithImage = items.find((item) => item.prescription?.imageUrl);
      if (itemWithImage && itemWithImage.prescription?.imageUrl) {
        const imageUrl = itemWithImage.prescription.imageUrl;
        
        // Kiểm tra xem nó có phải là chuỗi blob: không
        if (typeof imageUrl === 'string' && imageUrl.startsWith('blob:')) {
          // Fetch cái blob url đó để lấy dữ liệu nhị phân
          const response = await fetch(imageUrl);
          const blobData = await response.blob();
          
          // Append dữ liệu nhị phân (có gắn tên file giả lập để BE dễ đọc)
          formData.append('prescriptionImage', blobData, 'prescription.jpg');
        } else {
          // Trường hợp nó đã là File object sẵn rồi
          formData.append('prescriptionImage', imageUrl);
        }
      }

      const hasPrescription = items.some(
        (item) => item.prescription !== null && item.prescription !== undefined
      );
      const currentOrderItemType = hasPrescription ? 'PRESCRIPTION' : 'IN_STOCK';

      const orderResponse = await api.post('/orders/create', formData, {
        params: {
          OrderItemType: currentOrderItemType,
          PaymentMethod: paymentMethod, 
        },
        headers: {
          // Khai báo rõ để đè lại cấu hình mặc định application/json của @/lib/axios
          'Content-Type': 'multipart/form-data', 
        },
      });

      console.log('Kết quả tạo đơn:', orderResponse.data);

      const actualOrderId = orderResponse.data?.result?.orderId || orderResponse.data?.orderId;

      if (!actualOrderId) {
        throw new Error('Không lấy được mã đơn hàng từ hệ thống.');
      }

      // --- BƯỚC 2: XỬ LÝ THEO TỪNG LOẠI THANH TOÁN ---
      if (paymentMethod === 'VNPAY') {
        const paymentResponse = await api.post('/payment/checkout', null, {
          params: { orderId: actualOrderId },
        });

        const paymentUrl = paymentResponse.data?.result || paymentResponse.data; 

        if (paymentUrl && typeof paymentUrl === 'string') {
          clearCart();
          window.location.href = paymentUrl; 
        } else {
          alert('Không lấy được đường dẫn thanh toán VNPay.');
          setIsSubmitting(false);
        }

      } else {
        clearCart();
        alert('Đặt hàng thành công! Đơn hàng sẽ được giao đến bạn.');
        setIsSubmitting(false);
        window.location.href = '/'; 
      }

    } catch (error) {
      console.error('Lỗi khi xử lý đơn hàng/thanh toán:', error);
      alert('Có lỗi xảy ra, vui lòng kiểm tra lại thông tin!');
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