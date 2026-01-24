import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/features/cart/store/useCartStore";

interface OrderSummaryProps {
  step: number;
  onContinue: () => void;
  onBack: () => void;
}

export const OrderSummary = ({ step, onContinue, onBack }: OrderSummaryProps) => {
  // Lấy dữ liệu từ Store
  const { items, getCartTotal } = useCartStore();
  
  // FIX: Ép kiểu Number() hoặc fallback về 0 để tránh lỗi 'never'
  const subtotal = Number(getCartTotal()) || 0;
  const shipping = 0; 
  const total = subtotal + shipping;

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
        <div className="max-h-[300px] overflow-y-auto pr-1 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
          {items.length === 0 ? (
            <div className="text-center py-4 text-gray-400 text-sm italic">
              Cart is empty
            </div>
          ) : (
            items.map((item) => {
              // FIX: Tính toán ra biến riêng để đảm bảo kiểu number trước khi gọi toFixed
              const itemTotal = (item.price || 0) * (item.quantity || 1);

              return (
                <div key={item.id} className="flex gap-4 group">
                  {/* Ảnh sản phẩm */}
                  <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200 shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform" 
                    />
                  </div>
                  
                  {/* Thông tin chi tiết */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                      <p className="font-medium text-sm whitespace-nowrap">
                        ${itemTotal.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      {item.color && <p>Color: {item.color}</p>}
                      {item.lensType && (
                        <p className="text-blue-600 font-medium flex items-center gap-1">
                          + {item.lensType}
                        </p>
                      )}
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <Separator />
        
        {/* --- PHẦN TÍNH TOÁN TIỀN --- */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Shipping</span>
            {shipping === 0 ? (
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">FREE</span>
            ) : (
              <span className="font-medium">${Number(shipping).toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-end">
          <div className="text-sm text-muted-foreground">Total (USD)</div>
          <div className="text-3xl font-bold tracking-tight text-[#1e2575]">
            ${total.toFixed(2)}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 bg-gray-50/50 pt-6">
        <Button 
          onClick={onContinue}
          disabled={items.length === 0} 
          className="w-full h-12 text-base bg-[#1e2575] hover:bg-[#151b54] shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98]"
        >
          <Lock className="w-4 h-4 mr-2" />
          {step === 3 ? `Place Order ($${total.toFixed(2)})` : "Continue to Next Step"}
        </Button>
        
        {step > 1 && (
           <Button variant="ghost" onClick={onBack} className="w-full h-10 text-gray-500 hover:text-gray-900">
             Back to previous step
           </Button>
        )}

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
          Secure SSL Encryption
        </div>
      </CardFooter>
    </Card>
  );
};