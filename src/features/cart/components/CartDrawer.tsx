import { useState } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Eye, ChevronDown, FileText, ExternalLink } from "lucide-react";
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
import type { CartItem } from "../types/cart.types";

// --- COMPONENT XỬ LÝ TỪNG SẢN PHẨM ---
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
  
  const hasImage = !!item.prescription?.imageUrl;
  const hasManualInput = !!(
    item.prescription?.od?.sphere?.trim() || 
    item.prescription?.os?.sphere?.trim()
  );
  const hasPrescription = hasImage || hasManualInput;

  // Handler mở ảnh an toàn với TypeScript
  const handleViewImage = () => {
    if (item.prescription?.imageUrl) {
      window.open(item.prescription.imageUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col border-b border-gray-100 pb-6 last:border-0 group/item animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex gap-4">
        {/* Ảnh sản phẩm */}
        <div className="w-24 h-28 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0 relative">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" />
          {item.orderType === 'pre-order' && (
             <span className="absolute top-1 left-1 bg-amber-500 text-[8px] text-white px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider shadow-sm">Pre-order</span>
          )}
        </div>
        
        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="space-y-1.5">
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 group-hover/item:text-[#4A8795] transition-colors">
                  {item.name}
                </h3>
                <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {item.lensId && (
                <span className="text-[9px] font-black uppercase tracking-tight text-[#4A8795] bg-[#4A8795]/10 px-2 py-0.5 rounded border border-[#4A8795]/20">
                  Custom Lens
                </span>
              )}
              {hasPrescription && (
                <button 
                  onClick={() => setShowRx(!showRx)}
                  className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-md transition-all shadow-sm ${
                    showRx ? 'bg-zinc-900 text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  {showRx ? "Hide Rx" : "View Rx"}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showRx ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 border border-gray-200 shadow-sm">
              <button 
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white disabled:opacity-20 transition-all active:scale-90"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-7 text-center text-xs font-black text-zinc-800">{item.quantity}</span>
              <button 
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-all active:scale-90"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <p className="font-black text-gray-900 text-sm">
                ${(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* VÙNG CHI TIẾT ĐƠN KÍNH */}
      {hasPrescription && showRx && (
        <div className="mt-3 p-3 bg-zinc-50 rounded-xl border border-dashed border-zinc-200 animate-in slide-in-from-top-2 duration-300">
           {hasManualInput && (
             <div className="overflow-x-auto">
                <table className="w-full text-[10px] text-center border-separate border-spacing-1">
                  <thead>
                    <tr className="text-zinc-400 font-bold uppercase tracking-tighter">
                      <th className="w-6 text-left">Eye</th>
                      <th className="bg-zinc-100/50 rounded p-1">Sph</th>
                      <th className="bg-zinc-100/50 rounded p-1">Cyl</th>
                      <th className="bg-zinc-100/50 rounded p-1">Axis</th>
                      <th className="bg-zinc-100/50 rounded p-1">Add</th>
                    </tr>
                  </thead>
                  <tbody className="font-black text-zinc-700">
                    <tr>
                      <td className="text-blue-500 text-left font-black">OD</td>
                      <td className="bg-white rounded border border-zinc-200">{item.prescription?.od?.sphere || '0'}</td>
                      <td className="bg-white rounded border border-zinc-200">{item.prescription?.od?.cylinder || '0'}</td>
                      <td className="bg-white rounded border border-zinc-200">{item.prescription?.od?.axis || '0'}</td>
                      <td className="bg-white rounded border border-zinc-200">{item.prescription?.od?.add || '0'}</td>
                    </tr>
                    <tr>
                      <td className="text-pink-500 text-left font-black">OS</td>
                      <td className="bg-white rounded border border-zinc-200">{item.prescription?.os?.sphere || '0'}</td>
                      <td className="bg-white rounded border border-zinc-200">{item.prescription?.os?.cylinder || '0'}</td>
                      <td className="bg-white rounded border border-zinc-200">{item.prescription?.os?.axis || '0'}</td>
                      <td className="bg-white rounded border border-zinc-200">{item.prescription?.os?.add || '0'}</td>
                    </tr>
                  </tbody>
                </table>
             </div>
           )}
           
           <div className="mt-2.5 pt-2 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2">
              {hasImage && (
                <button 
                  type="button"
                  onClick={handleViewImage}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 hover:text-black transition-colors"
                >
                  <FileText className="w-3 h-3" />
                  View Rx Scan
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              )}
              {item.prescription?.notes && (
                <span className="text-[10px] italic text-zinc-400 truncate max-w-[150px]" title={item.prescription.notes}>
                  Note: {item.prescription.notes}
                </span>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export const CartDrawer = () => {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
  const navigate = useNavigate();
  
  const totalAmount = getCartTotal();
  const FREE_SHIPPING_THRESHOLD = 200; 
  const progress = Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col gap-0 border-l shadow-2xl [&>button]:hidden bg-white">
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
                <ShoppingBag className="w-6 h-6 text-zinc-800" />
                <span className="absolute -top-2 -right-2 bg-[#4A8795] text-white text-[10px] min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full font-black border-2 border-white shadow-sm">
                    {items.length}
                </span>
            </div>
            <SheetHeader>
              <SheetTitle className="text-xl font-black uppercase tracking-tighter text-zinc-900">
                Cart
              </SheetTitle>
            </SheetHeader>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 transition-transform active:scale-90">
              <X className="w-5 h-5 text-zinc-500" />
            </Button>
          </SheetClose>
        </div>

        {/* PROGRESS BAR */}
        {items.length > 0 && (
            <div className="px-5 py-3 bg-zinc-50 border-b shrink-0">
                <p className="text-[11px] font-bold text-zinc-600 mb-2 tracking-tight">
                    {totalAmount >= FREE_SHIPPING_THRESHOLD 
                        ? "🎉 FREE SHIPPING UNLOCKED" 
                        : `ADD $${(FREE_SHIPPING_THRESHOLD - totalAmount).toFixed(2)} FOR FREE SHIPPING`}
                </p>
                <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-[#4A8795] transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(74,135,149,0.5)]" 
                         style={{ width: `${progress}%` }} />
                </div>
            </div>
        )}

        {/* BODY LIST */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-zinc-200">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-10">
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-zinc-200" />
              </div>
              <h4 className="text-lg font-black text-zinc-900 tracking-tight mb-2 uppercase">Cart is empty</h4>
              <p className="text-sm text-zinc-500 mb-6">Looks like you haven't added anything yet.</p>
              <SheetClose asChild>
                <Button className="bg-zinc-900 hover:bg-zinc-800 rounded-xl px-8 font-bold">Start Shopping</Button>
              </SheetClose>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow key={item.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
            ))
          )}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-white shrink-0 space-y-4 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.1)]">
            <div className="space-y-2">
                <div className="flex justify-between text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-zinc-900">{totalAmount >= FREE_SHIPPING_THRESHOLD ? "FREE" : "$15.00"}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-black text-zinc-900 uppercase tracking-tighter">Total Estimate</span>
                    <span className="text-2xl font-black text-zinc-900 tracking-tighter">${totalAmount.toLocaleString()}</span>
                </div>
            </div>
            
            <Button 
                onClick={() => { closeCart(); navigate("/checkout"); }}
                className="w-full h-14 bg-zinc-900 hover:bg-black text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 group tracking-widest text-sm"
            >
              PROCEED TO CHECKOUT 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};