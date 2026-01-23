import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderActions from "./HeaderActions";
import Logo from "@/components/common/Logo"; // ✅ Import Logo mới tách

export default function StorefrontHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO - Đã được tách riêng */}
        <Logo />

        {/* NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-gray-600">
          <Link to="/products?cat=frames" className="hover:text-black transition-colors">Kính Gọng</Link>
          <Link to="/products?cat=lenses" className="hover:text-black transition-colors">Tròng Kính</Link>
          <Link to="/services" className="hover:text-black transition-colors">Dịch vụ đo mắt</Link>
        </nav>

        {/* SEARCH & ACTIONS */}
        <div className="flex items-center gap-3">
           <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-[200px] focus-within:ring-1 ring-gray-300 transition-all">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="bg-transparent border-none text-sm w-full focus:outline-none" 
              />
           </div>
           
           <HeaderActions />
        </div>
      </div>
    </header>
  );
}