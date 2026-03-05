import { useState } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Eye, ChevronDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetClose 
} from "@/components/ui/sheet";
import type { CartItem } from "../store/useCartStore";

// --- COMPONENT XỬ LÝ TỪNG SẢN PHẨM TRONG GIỎ HÀNG ---
const CartItemRow = ({ 
  item, 
  updateQuantity, 
  removeFromCart 
}: { 
  item: CartItem, 
  updateQuantity: (id: string, quantity: number) => void, 
  removeFromCart: (id: string) => void 
}) => {
  const [showRx, setShowRx] = useState(false);
  
  // Kiểm tra cẩn thận xem có THỰC SỰ có dữ liệu ảnh hoặc dữ liệu nhập tay hay không
  const hasImage = !!item.prescription?.imageUrl;
  
  // Kiểm tra xem SPH có được nhập và khác chuỗi rỗng không
  const hasManualInput = !!(
    (item.prescription?.od?.sphere && item.prescription.od.sphere.trim() !== "") || 
    (item.prescription?.os?.sphere && item.prescription.os.sphere.trim() !== "")
  );

  // Chỉ đánh dấu là CÓ prescription nếu có ít nhất 1 trong 2 loại dữ liệu trên
  const hasPrescription = hasImage || hasManualInput;
  return (
    <div className="flex flex-col border-b border-gray-100 pb-6 last:border-0 group/item">
      {/* 1. THÔNG TIN CƠ BẢN CỦA SẢN PHẨM */}
      <div className="flex gap-4">
        <div className="w-24 h-28 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
        </div>
        
        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="space-y-2">
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-gray-900 text-sm leading-tight hover:text-[#4A8795] cursor-pointer line-clamp-2">
                  {item.name}
                </h3>
                <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            
            {/* Vùng hiển thị Lens và Nút mở Prescription */}
            <div className="flex flex-wrap items-center gap-2">
              {item.lensType && (
                <span className="text-[10px] font-bold text-[#4A8795] bg-[#4A8795]/10 px-2 py-1 rounded-md">
                  {item.lensType}
                </span>
              )}
              {hasPrescription && (
                <button 
                  onClick={() => setShowRx(!showRx)}
                  className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-md transition-colors ${
                    showRx 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  {showRx ? "Hide Rx" : "View Rx"}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showRx ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-end mt-2">
            <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
              <button 
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-gray-800">{item.quantity}</span>
              <button 
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <p className="font-black text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* 2. VÙNG HIỂN THỊ CHI TIẾT ĐƠN KÍNH (Kéo dãn) */}
      {hasPrescription && showRx && (
        <div className="mt-4 p-4 bg-gray-50/80 rounded-xl border border-gray-200 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-bold text-gray-700">PRESCRIPTION DETAILS</span>
          </div>

          {/* Grid thông minh tự đổi layout dựa vào dữ liệu */}
          <div className={`grid gap-4 items-start ${hasImage && hasManualInput ? 'grid-cols-[80px_1fr]' : 'grid-cols-1'}`}>
            
            {/* Khối hiển thị hình ảnh */}
            {hasImage && (
              <div className="relative group cursor-zoom-in rounded-lg overflow-hidden border border-gray-200 bg-white">
                <img 
                  src={item.prescription?.imageUrl || ''} 
                  alt="Rx Upload" 
                  className={`${hasImage && hasManualInput ? 'w-20 h-20' : 'w-full h-32'} object-cover`}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-[9px] font-bold px-1 text-center leading-tight">Click to enlarge</span>
                </div>
              </div>
            )}

            {/* Khối hiển thị bảng số đo */}
            {hasManualInput && (
              <div className="bg-white rounded-lg border border-gray-100 p-2 overflow-hidden">
                <table className="w-full text-[10px] sm:text-[11px]">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-50">
                      <th className="text-left font-medium pb-1">EYE</th>
                      <th className="font-medium text-center pb-1">SPH</th>
                      <th className="font-medium text-center pb-1">CYL</th>
                      <th className="font-medium text-center pb-1">AXIS</th>
                      <th className="font-medium text-center pb-1">ADD</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold text-gray-700">
                    <tr className="border-b border-gray-50/50">
                      <td className="py-1.5 text-blue-600/80">OD (R)</td>
                      <td className="text-center">{item.prescription?.od?.sphere || '-'}</td>
                      <td className="text-center">{item.prescription?.od?.cylinder || '-'}</td>
                      <td className="text-center">{item.prescription?.od?.axis || '-'}</td>
                      <td className="text-center">{item.prescription?.od?.add || '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-pink-600/80">OS (L)</td>
                      <td className="text-center">{item.prescription?.os?.sphere || '-'}</td>
                      <td className="text-center">{item.prescription?.os?.cylinder || '-'}</td>
                      <td className="text-center">{item.prescription?.os?.axis || '-'}</td>
                      <td className="text-center">{item.prescription?.os?.add || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Khối PD và Notes */}
          <div className="mt-3 flex flex-wrap gap-2 items-center justify-between">
            {hasManualInput && (item.prescription?.od?.pd || item.prescription?.os?.pd) && (
              <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-gray-200 text-gray-600">
                PD: <span className="text-black">{item.prescription.od?.pd || item.prescription.os?.pd}mm</span>
              </span>
            )}
            
            {item.prescription?.notes && (
              <span className="text-[10px] italic text-gray-500 flex-1 text-right">
                Note: {item.prescription.notes}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- CART DRAWER CHÍNH ---
export const CartDrawer = () => {
  const { 
    items, isOpen, closeCart, 
    removeFromCart, updateQuantity, getCartTotal 
  } = useCartStore();
  
  const navigate = useNavigate();
  const totalAmount = getCartTotal();
  const FREE_SHIPPING_THRESHOLD = 200; 
  const progress = Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md p-0 flex flex-col gap-0 border-l shadow-2xl [&>button]:hidden"
      >
        <div className="flex items-center justify-between p-5 border-b shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="relative">
                <ShoppingBag className="w-6 h-6 text-gray-800" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                    {items.length}
                </span>
            </div>
            <SheetHeader>
              <SheetTitle className="text-xl font-extrabold tracking-tight text-gray-900">
                Your Cart
              </SheetTitle>
            </SheetHeader>
          </div>

          <SheetClose asChild>
            <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full w-10 h-10 p-0 hover:bg-gray-100 transition-all active:scale-90 group"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </SheetClose>
        </div>

        {items.length > 0 && (
            <div className="px-5 py-3 bg-gray-50 border-b shrink-0">
                <p className="text-xs font-medium text-gray-600 mb-2">
                    {totalAmount >= FREE_SHIPPING_THRESHOLD 
                        ? "🎉 You've got Free Shipping!" 
                        : `Buy $${(FREE_SHIPPING_THRESHOLD - totalAmount).toFixed(2)} more for Free Shipping`}
                </p>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-black transition-all duration-500 ease-out" 
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        )}

        {/* DANH SÁCH SẢN PHẨM */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-none">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-60">
              <ShoppingBag className="w-16 h-16 text-gray-300 stroke-[1px]" />
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <SheetClose asChild>
                <Button variant="link" className="text-black underline font-bold">Continue Shopping</Button>
              </SheetClose>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow 
                key={item.id} 
                item={item} 
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))
          )}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-white shrink-0 space-y-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.08)] z-10">
            <div className="space-y-1.5">
                <div className="flex justify-between text-gray-500 text-sm">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">{totalAmount >= FREE_SHIPPING_THRESHOLD ? "FREE" : "$15.00"}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-black text-black">${totalAmount.toLocaleString()}</span>
                </div>
            </div>
            
            <Button 
                onClick={handleCheckout}
                className="w-full h-14 bg-black hover:bg-zinc-800 text-white font-black text-base rounded-2xl shadow-xl transition-all active:scale-[0.97] flex items-center justify-center gap-3 group"
            >
              CHECKOUT NOW 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};