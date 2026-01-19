import { type ReactNode } from "react";
import { ScanFace, Glasses } from "lucide-react";
import Header from "@/components/layout/header"; // 👈 1. Import Header tổng (Switcher)

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // 👈 2. Sửa container ngoài cùng: flex-col để xếp dọc Header và Content
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* 🟢 Header nằm ở đây. Nó sẽ tự hiện StorefrontHeader vì User chưa login */}
      <Header />

      {/* 🟢 Phần thân trang: dùng flex-1 để chiếm hết khoảng trống còn lại và căn giữa Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        
        {/* --- GIỮ NGUYÊN CODE CŨ CỦA BẠN TỪ ĐÂY --- */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[650px] border border-gray-100 transition-all hover:shadow-zinc-200/50">
          
          {/* LEFT SIDE (CỐ ĐỊNH - KHÔNG ĐỔI) */}
          <div className="relative hidden md:flex flex-col justify-between p-12 bg-zinc-950 text-white">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" 
                alt="Background" 
                className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center gap-3 opacity-90">
              <ScanFace className="w-6 h-6 text-white" />
              <span className="text-lg font-bold tracking-[0.2em] uppercase">OpticStore</span>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                 <Glasses className="w-5 h-5" />
                 <span className="text-xs font-bold tracking-widest uppercase">New Season</span>
              </div>
              <h1 className="text-5xl font-serif leading-tight mb-4">
                Vision <br/> 
                <span className="italic text-gray-400">Redefined.</span>
              </h1>
              <p className="text-gray-300 text-sm max-w-xs font-light leading-relaxed opacity-80">
                Premium eyewear designed for the modern visionary. Experience the clarity.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE (CHỨA FORM - KHÔNG ĐỔI) */}
          <div className="flex flex-col justify-center items-center p-8 md:p-16 bg-white relative h-full">
             <div className="w-full max-w-[380px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                {children} 
             </div>
          </div>

        </div>
        {/* --- HẾT PHẦN CODE CŨ --- */}

      </div>
    </div>
  );
}