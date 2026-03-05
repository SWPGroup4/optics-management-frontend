import { useCheckoutStore } from "../store/useCheckoutStore";
import { MapPin, CreditCard, Truck, Mail, Phone, CalendarDays, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ReviewOrder = ({ onEdit }: { onEdit: (step: number) => void }) => {
  // Lấy thêm paymentMethod từ store
  const { shippingData, paymentMethod } = useCheckoutStore();

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700">

      {/* --- BLOCK 1: SHIPPING INFO --- */}
      <Card className="shadow-sm border-gray-200 overflow-hidden bg-white">
        <CardHeader className="flex flex-row items-center justify-between px-5 bg-gray-50/80 border-b border-gray-100">
          <CardTitle className="text-sm font-bold flex items-center gap-2.5 text-gray-800">
            <div className="p-1.5 bg-blue-100/80 text-[#1e2575] rounded-md">
              <MapPin className="w-4 h-4" />
            </div>
            Shipping Information
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(1)} 
            className="text-[#1e2575] hover:bg-blue-50 h-8 px-3 text-xs font-bold uppercase tracking-wider"
          >
            Edit
          </Button>
        </CardHeader>
        
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CỘT 1: ĐỊA CHỈ */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Deliver To</p>
              
              <div className="pt-0.5">
                <p className="font-bold text-gray-900 text-[17px] leading-tight mb-1.5">
                  {shippingData.firstName || "Guest"} {shippingData.lastName}
                </p>
                <div className="text-gray-700 text-[15px] leading-snug space-y-0.5">
                  <p>{shippingData.address || "No address provided"}</p>
                  <p>
                    {shippingData.city}
                    {shippingData.city && shippingData.state ? ", " : ""}
                    {shippingData.state?.toUpperCase()} {shippingData.zip}
                  </p>
                </div>
              </div>
            </div>

            {/* CỘT 2: LIÊN HỆ */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Contact Info</p>
              
              <div className="grid gap-2.5 pt-0.5">
                <div className="flex items-center gap-3 p-2.5 rounded-md bg-gray-50 border border-gray-100 group hover:border-gray-200 transition-colors">
                  <Mail className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700 truncate">
                    {shippingData.email || "No email provided"}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-md bg-gray-50 border border-gray-100 group hover:border-gray-200 transition-colors">
                  <Phone className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    {shippingData.phone || "No phone provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- BLOCK 2: PAYMENT & DELIVERY --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Payment Method */}
        <Card className="shadow-sm border-gray-200 flex flex-col h-full bg-white">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-5 border-b border-gray-100 bg-gray-50/30">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-gray-800">
              <CreditCard className="w-4 h-4 text-[#1e2575]" /> Payment Method
            </CardTitle>
            <Button variant="link" size="sm" onClick={() => onEdit(2)} className="text-[#1e2575] p-0 h-auto text-[11px] font-bold uppercase">
              Change
            </Button>
          </CardHeader>
          <CardContent className="p-5 flex items-center h-full">
            
            {/* Hiển thị dựa trên state paymentMethod */}
            {paymentMethod === "VNPAY" ? (
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[38px] bg-blue-50 rounded-md flex items-center justify-center shrink-0 border border-blue-100">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-[15px]">Cổng thanh toán VNPay</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Thanh toán qua QR, Thẻ ATM/Visa</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[38px] bg-orange-50 rounded-md flex items-center justify-center shrink-0 border border-orange-100">
                  <Wallet className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-[15px]">Thanh toán tiền mặt</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Thanh toán khi nhận hàng (COD)</p>
                </div>
              </div>
            )}

          </CardContent>
        </Card>

        {/* Delivery Method */}
        <Card className="shadow-sm border-gray-200 flex flex-col h-full bg-white">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-5 border-b border-gray-100 bg-gray-50/30">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-gray-800">
              <Truck className="w-4 h-4 text-[#1e2575]" /> Delivery Method
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex items-center h-full">
            <div className="flex items-center gap-4">
              <div className="w-[60px] h-[38px] bg-green-50 rounded-md flex items-center justify-center shrink-0 border border-green-100">
                <CalendarDays className="w-5 h-5 text-green-700" />
              </div>
              
              <div>
                <p className="font-bold text-gray-900 text-[15px]">Standard Shipping</p>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  3 - 5 ngày làm việc
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};