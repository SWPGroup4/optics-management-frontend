import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOrderSuccess } from "../store/useOrderSuccess";

export const PaymentSuccessPage = () => {
  // Chỉ cần gọi hook, mọi logic cleanup và lấy data đã được xử lý bên trong
  const { orderId, email, deliveryDate } = useOrderSuccess();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 animate-in fade-in duration-500">
      <Card className="max-w-lg w-full bg-white shadow-none border-0 sm:border sm:shadow-lg sm:rounded-2xl overflow-hidden">
        <div className="p-8 md:p-12 text-center">
          
          <div className="mx-auto mb-8 w-24 h-24 bg-green-50 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-sm text-green-600">
              <Check className="w-10 h-10" strokeWidth={4} />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8 leading-relaxed max-w-sm mx-auto">
            Thank you for your purchase. We've emailed your receipt to <span className="font-semibold text-gray-900">{email}</span>.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left grid grid-cols-2 gap-6">
             <div>
                <span className="block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1">Order ID</span>
                <span className="block text-sm font-bold text-gray-900 font-mono">{orderId}</span>
             </div>
             <div className="text-right">
                <span className="block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1">Est. Delivery</span>
                <span className="block text-sm font-bold text-gray-900">{deliveryDate}</span>
             </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full h-12 text-base bg-[#1e2575] hover:bg-[#151b5e] font-bold shadow-md transition-all">
              View Order Details <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Link to="/" className="block">
                <Button variant="ghost" className="w-full h-12 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                   Continue Shopping
                </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-50/50 p-6 text-center border-t border-gray-100">
            <p className="text-sm text-gray-500 font-medium">
                Need help? <a href="#" className="underline decoration-gray-300 hover:decoration-gray-500 hover:text-gray-800 transition-all">Contact Support</a>
            </p>
        </div>
      </Card>
    </div>
  );
};