import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetClose // Thêm cái này để tự tạo nút đóng
} from "@/components/ui/sheet";

export const CartDrawer = () => {
  const { 
    items, isOpen, closeCart, 
    removeFromCart, updateQuantity, getCartTotal 
  } = useCartStore();
  
  const navigate = useNavigate();
  const totalAmount = getCartTotal();
  const FREE_SHIPPING_THRESHOLD = 200; // Ví dụ ngưỡng freeship
  const progress = Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      {/* Thêm class [&>button]:hidden để ẩn cái nút X mặc định của Shadcn */}
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md p-0 flex flex-col gap-0 border-l shadow-2xl [&>button]:hidden"
      >
        {/* --- CUSTOM HEADER --- */}
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

          {/* Nút Close tự chế - Xịn hơn */}
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

        {/* --- THANH FREESHIP (Bonus cho đẹp) --- */}
        {items.length > 0 && (
            <div className="px-5 py-3 bg-gray-50 border-b">
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

        {/* --- LIST ITEMS --- */}
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
              <div key={item.id} className="flex gap-4 group">
                <div className="w-24 h-28 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight hover:text-blue-700 cursor-pointer">{item.name}</h3>
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    {item.color && <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded uppercase font-semibold italic">{item.color}</span>}
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                      <button 
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* --- FOOTER --- */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-white shrink-0 space-y-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.08)]">
            <div className="space-y-1.5">
                <div className="flex justify-between text-gray-500 text-sm">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">{totalAmount >= FREE_SHIPPING_THRESHOLD ? "FREE" : "$15.00"}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-black text-black">${totalAmount.toFixed(2)}</span>
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