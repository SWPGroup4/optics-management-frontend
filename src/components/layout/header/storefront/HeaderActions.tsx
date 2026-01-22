import { Link } from "react-router-dom";
import { ShoppingBag, Bell, LogOut, User, FileText, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // ✅ Đã được sử dụng bên dưới
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
export default function HeaderActions() {
  const { user, logout } = useAuthStore();
  const cartItemCount = 2; // Số lượng trong giỏ
  const unreadNotifications = 1; // Giả lập số thông báo

  return (
    <div className="flex items-center gap-2 md:gap-4">
      
      {/* 1. GIỎ HÀNG */}
      <Link to="/cart">
        <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-black">
          <ShoppingBag className="w-5 h-5" />
          {cartItemCount > 0 && (
            // ✅ SỬA: Dùng Badge thay cho span
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full bg-emerald-600 text-white text-[10px] border-2 border-white">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </Link>

      {/* 2. PHÂN CHIA TRẠNG THÁI LOGIN */}
      {!user ? (
        // --- GUEST ---
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
        // --- LOGGED IN USER ---
        <div className="flex items-center gap-2 animate-in fade-in">
           {/* Notification Bell */}
           <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-black hidden sm:flex">
             <Bell className="w-5 h-5" />
             {unreadNotifications > 0 && (
                // ✅ SỬA: Thêm Badge cho thông báo luôn
                <Badge className="absolute top-1.5 right-1.5 h-2 w-2 p-0 rounded-full bg-red-500 border border-white" />
             )}
           </Button>

           {/* User Dropdown */}
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