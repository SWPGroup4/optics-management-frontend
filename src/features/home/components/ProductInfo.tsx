import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function ProductInfo({ productId }: { productId: string }) {
    console.log("Đang xem sản phẩm:", productId);
  return (
    <div className="space-y-6">
      {/* Badges & Title */}
      <div>
        <div className="flex gap-2 mb-3">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md px-2.5">IN STOCK</Badge>
          <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-md px-2.5">LIMITED RELEASE</Badge>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">L'Artiste Series 01</h1>
        <p className="text-gray-500 italic">Dark Tortoise & Brushed Gold</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-[#4A8795]">$345.00</span>
        <span className="text-lg text-gray-400 line-through decoration-gray-300">$420.00</span>
      </div>

      {/* Order Type Selector */}
      <div className="space-y-3 pt-2">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Order Type</p>
        
        {/* Option 1: Buy Now */}
        <div className="relative border-2 border-[#4A8795]/30 bg-[#4A8795]/5 rounded-xl p-4 cursor-pointer transition-all">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900">Buy Now</span>
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">READY TO SHIP</span>
              </div>
              <p className="text-sm text-gray-600">Full payment of <span className="font-bold">$345.00</span></p>
              <p className="text-xs text-gray-400 mt-1">Estimated delivery: 3-5 business days</p>
            </div>
            <div className="bg-[#4A8795] text-white rounded-full p-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Option 2: Pre-Order */}
        <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-gray-300 transition-all opacity-70 hover:opacity-100">
           <div className="flex justify-between items-start">
             <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">Pre-Order</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">50% DEPOSIT</span>
                </div>
                <p className="text-sm text-gray-600">Secure your pair for <span className="font-bold">$172.50</span></p>
                <p className="text-xs text-orange-400 italic mt-1">Shipping expected: late next month</p>
             </div>
             <div className="h-5 w-5 rounded-full border border-gray-300"></div>
           </div>
        </div>

        {/* Option 3: Custom */}
        <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-gray-300 transition-all">
           <div className="flex justify-between items-center">
             <div>
                <span className="font-bold text-gray-900 block mb-1">Custom Prescription</span>
                <p className="text-xs text-gray-500">Frame + Single Vision or Progressive lenses</p>
                <p className="text-xs text-gray-900 font-medium mt-1">Starting at $440.00</p>
             </div>
             <div className="h-5 w-5 rounded-full border border-gray-300"></div>
           </div>
        </div>
      </div>
    </div>
  );
};