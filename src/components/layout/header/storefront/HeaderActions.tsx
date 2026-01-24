import { Link } from "react-router-dom";
import { ShoppingBag, Bell, LogOut, User, FileText, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { useCartStore } from "@/features/cart/store/useCartStore"; 

export default function HeaderActions() {
  const { user, logout } = useAuthStore();
  
  // 👇 1. Lấy thêm isOpen và closeCart
  const { openCart, closeCart, isOpen, items } = useCartStore();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  const unreadNotifications = 1;

  // 👇 2. Tạo hàm xử lý Toggle
  const handleToggleCart = () => {
    if (isOpen) {
      closeCart();
    } else {
      openCart();
    }
  };

  return (
    <div className="flex items-center gap-2 md:gap-4">
      
      {/* --- GIỎ HÀNG --- */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleToggleCart} // 👈 3. Gắn hàm toggle vào đây
        className={`relative text-gray-600 hover:text-black cursor-pointer transition-colors ${isOpen ? 'bg-gray-100 text-black' : ''}`}
      >
        <ShoppingBag className="w-5 h-5" />
        
        {cartItemCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full bg-emerald-600 text-white text-[10px] border-2 border-white">
            {cartItemCount}
          </Badge>
        )}
      </Button>

      {/* ... Phần User (Giữ nguyên) ... */}
      {!user ? (
        <div className="flex items-center gap-2 animate-in fade-in">
           <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
           <Link to="/auth/login">
             <Button variant="ghost" size="sm" className="font-semibold text-gray-600 hover:text-black">
               Đăng nhập
             </Button>
           </Link>
           <Link to="/auth/register">
             <Button size="sm" className="rounded-full bg-zinc-900 hover:bg-black text-white px-5 shadow-sm">
               Đăng ký
             </Button>
           </Link>
        </div>
      ) : (
        <div className="flex items-center gap-2 animate-in fade-in">
           {/* ... Notification & Avatar ... */}
           {/* (Giữ nguyên phần code User/Avatar của bạn ở đây) */}
           <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-black hidden sm:flex">
             <Bell className="w-5 h-5" />
             {unreadNotifications > 0 && (
                <Badge className="absolute top-1.5 right-1.5 h-2 w-2 p-0 rounded-full bg-red-500 border border-white" />
             )}
           </Button>

           <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1 ring-2 ring-transparent hover:ring-gray-200 transition-all">
                 <Avatar className="h-9 w-9 border border-gray-100">
                   <AvatarImage src={user.avatar} alt={user.name} />
                   <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                   </AvatarFallback>
                 </Avatar>
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent className="w-60" align="end">
               <DropdownMenuLabel>
                 <div className="flex flex-col space-y-1">
                   <p className="text-sm font-medium">{user.name}</p>
                   <p className="text-xs text-muted-foreground">{user.email}</p>
                 </div>
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                 <Link to="/account/profile" className="cursor-pointer w-full flex"><User className="mr-2 h-4 w-4" /> Tài khoản của tôi</Link>
               </DropdownMenuItem>
               <DropdownMenuItem asChild>
                  <Link to="/account/orders" className="cursor-pointer w-full flex"><History className="mr-2 h-4 w-4" /> Lịch sử đơn hàng</Link>
               </DropdownMenuItem>
               <DropdownMenuItem asChild>
                  <Link to="/account/prescriptions" className="cursor-pointer w-full flex"><FileText className="mr-2 h-4 w-4" /> Sổ đo mắt</Link>
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer focus:text-red-600">
                 <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
        </div>
      )}
    </div>
  );
}