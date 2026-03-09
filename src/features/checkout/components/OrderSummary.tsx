import { Lock, ShieldCheck, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { usePaymentRequirement } from "../hooks/usePaymentRequirement";

interface OrderSummaryProps {
  step: number;
  onContinue: () => void;
  onBack: () => void;
}

export const OrderSummary = ({ step, onContinue, onBack }: OrderSummaryProps) => {
  const { items } = useCartStore();
  
  // Gọi Hook TanStack Query để lấy dữ liệu tính toán từ API
  const { data: response, isLoading, isError } = usePaymentRequirement();
  
  // Rút trích result từ response API
  const result = response?.result;

  // Trạng thái Loading
  if (isLoading && items.length > 0) {
    return (
      <Card className="sticky top-8 border-gray-100 p-8 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#4A8795]" />
        <p className="text-sm text-muted-foreground animate-pulse">Calculating order details...</p>
      </Card>
    );
  }

  return (
    <Card className="sticky top-8 border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-700">
      <CardHeader className="bg-gray-50/50 pb-4">
        <CardTitle className="text-lg flex justify-between items-center">
          Order Summary
          <span className="text-xs font-normal text-muted-foreground bg-white px-2 py-1 rounded-full border border-gray-200">
            {items.length} items
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        {/* --- DANH SÁCH SẢN PHẨM --- */}
        <div className="max-h-[300px] overflow-y-auto pr-1 space-y-4 scrollbar-thin">
          {items.length === 0 ? (
            <div className="text-center py-4 text-gray-400 text-sm italic">Cart is empty</div>
          ) : (
            items.map((item) => {
              // Tìm dữ liệu tính toán chi tiết cho item này từ API
              const itemDetail = result?.itemRequirements.find(req => req.orderItemId === item.productId);
              
              return (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-16 h-16 bg-gray-100 rounded-md border shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                      <p className="font-medium text-sm whitespace-nowrap">
                        {/* Dùng itemTotal từ API */}
                        ₫{(itemDetail?.itemTotal || 0).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="text-[11px] text-muted-foreground mt-1 space-y-0.5">
                      <p>Gọng: ₫{(itemDetail?.unitPrice || 0).toLocaleString()}</p>
                      {itemDetail && itemDetail.lensPrice > 0 && (
                        <p className="text-[#4A8795] font-medium italic">
                          Tròng: +₫{itemDetail.lensPrice.toLocaleString()}
                        </p>
                      )}
                      <p>Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <Separator />
        
        {/* --- PHẦN TÍNH TOÁN TIỀN THEO BUSINESS RULE --- */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tổng giá trị sản phẩm</span>
            <span className="font-medium">₫{(result?.orderTotal || 0).toLocaleString()}</span>
          </div>

          {/* Hiển thị phí cọc nếu có hàng PRE-ORDER */}
          {result && result.depositPercentage > 0 && (
            <div className="flex justify-between items-center text-orange-600 bg-orange-50 p-2 rounded-lg text-[12px]">
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3" /> 
                Yêu cầu cọc ({result.depositPercentage}%)
              </span>
              <span className="font-bold">₫{result.requiredAmount.toLocaleString()}</span>
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* SỐ TIỀN CẦN THANH TOÁN NGAY */}
        <div className="bg-[#1e2575]/5 p-4 rounded-xl space-y-2 border border-[#1e2575]/10">
          <div className="flex justify-between items-end">
            <div className="text-sm font-semibold text-[#1e2575]">Thanh toán ngay</div>
            <div className="text-2xl font-bold tracking-tight text-[#1e2575]">
              ₫{(result?.requiredAmount || 0).toLocaleString()}
            </div>
          </div>
          
          {result && result.remainingPaymentTotal > 0 && (
             <div className="flex justify-between text-[11px] text-gray-500 italic border-t border-[#1e2575]/10 pt-2">
                <span>Còn lại (COD)</span>
                <span>{result.remainingPaymentTotal.toLocaleString()}₫</span>
             </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 bg-gray-50/50 pt-6">
        <Button 
          onClick={onContinue}
          disabled={items.length === 0 || isError} 
          className="w-full h-12 text-base bg-[#1e2575] hover:bg-[#151b54] shadow-lg transition-all active:scale-[0.98]"
        >
          {isError ? "Error Calculating" : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              {step === 3 ? `Thanh toán ₫${(result?.requiredAmount || 0).toLocaleString()}` : "Tiếp theo"}
            </>
          )}
        </Button>
        
        {step > 1 && (
           <Button variant="ghost" onClick={onBack} className="w-full h-10 text-gray-500 hover:text-gray-900">
             Quay lại
           </Button>
        )}

        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-medium pt-2 uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3 text-green-600" />
          Bảo mật thanh toán SSL
        </div>
      </CardFooter>
    </Card>
  );
};