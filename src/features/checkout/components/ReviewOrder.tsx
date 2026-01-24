import { useCheckoutStore } from "../store/useCheckoutStore";
import { MapPin, CreditCard, Truck, Mail, Phone, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ReviewOrder = ({ onEdit }: { onEdit: (step: number) => void }) => {
  const { shippingData } = useCheckoutStore();

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700">

      {/* --- BLOCK 1: SHIPPING INFO --- */}
      <Card className="shadow-sm border-gray-200 overflow-hidden bg-white">
        {/* Header mỏng hơn, icon có nền nhấn */}
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
            
            {/* CỘT 1: ĐỊA CHỈ - Chữ to, đậm, gom khối chặt */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Deliver To</p>
              
              <div className="pt-0.5">
                {/* Tên người nhận: Tăng size và độ đậm */}
                <p className="font-bold text-gray-900 text-[17px] leading-tight mb-1.5">
                  {shippingData.firstName || "Guest"} {shippingData.lastName}
                </p>
                {/* Địa chỉ: Màu tối hơn để dễ đọc, line-height vừa phải */}
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

            {/* CỘT 2: LIÊN HỆ - Box gọn, icon thẳng hàng */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Contact Info</p>
              
              <div className="grid gap-2.5 pt-0.5">
                {/* Email Item */}
                <div className="flex items-center gap-3 p-2.5 rounded-md bg-gray-50 border border-gray-100 group hover:border-gray-200 transition-colors">
                  <Mail className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700 truncate">
                    {shippingData.email || "No email provided"}
                  </span>
                </div>

                {/* Phone Item */}
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

      {/* --- BLOCK 2: PAYMENT & DELIVERY (Grid cân đối) --- */}
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
            <div className="flex items-center gap-4">
              {/* Visual VISA Card: To hơn, rõ ràng hơn */}
              <div className="w-[60px] h-[38px] bg-[#1e2575] rounded-md shadow-sm relative overflow-hidden flex flex-col justify-end p-2 shrink-0">
                 <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-full -mr-2 -mt-2"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-white/90 mb-auto"></div>
                 <span className="text-[9px] font-bold text-white tracking-widest leading-none italic font-mono">VISA</span>
              </div>
              
              <div>
                <p className="font-bold text-gray-900 text-[15px]">Visa ending in 4242</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Expires 12/29</p>
              </div>
            </div>
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
                  Arrives by <span className="text-gray-900 font-bold">Mon, Aug 24</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};