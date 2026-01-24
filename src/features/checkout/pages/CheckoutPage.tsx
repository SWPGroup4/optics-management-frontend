import { CheckoutStepper } from '../components/CheckoutStepper';
import { PaymentForm } from '../components/PaymentForm';
import { ShippingForm } from '../components/ShippingForm';
import { ReviewOrder } from '../components/ReviewOrder';
import { OrderSummary } from '../components/OrderSummary';

import { useCheckoutStore } from '../store/useCheckoutStore';

export default function CheckoutPage() {
  // Lấy state và action từ store
  const { step, setStep, nextStep, prevStep } = useCheckoutStore();

  // Logic xử lý khi bấm nút Continue ở cột bên phải
  const handleContinueAction = () => {
    if (step < 3) {
      nextStep(); // Gọi action từ store
    } else {
      // Logic Submit đơn hàng
      alert("Order Placed Successfully!");
      // Có thể gọi resetCheckout() ở đây nếu muốn
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* --- Cột bên trái: Render theo step từ Store --- */}
            <div className="lg:col-span-7 xl:col-span-8">
              <CheckoutStepper currentStep={step} />
              
              <div className="min-h-[400px]">
                {step === 1 && <ShippingForm />}
                {step === 2 && <PaymentForm />}
                {/* Truyền hàm setStep vào ReviewOrder để nút Edit hoạt động */}
                {step === 3 && <ReviewOrder onEdit={(s) => setStep(s)} />}
              </div>
            </div>
            
            {/* --- Cột bên phải: Summary --- */}
            <div className="lg:col-span-5 xl:col-span-4">
              <OrderSummary 
                step={step} 
                onContinue={handleContinueAction} 
                onBack={prevStep} 
              />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}