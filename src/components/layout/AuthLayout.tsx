import { type ReactNode } from "react";
import { ScanFace, Glasses } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "./footer/Footer";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        {/* THAY ĐỔI CHÍNH Ở ĐÂY:
            1. Thay max-w-5xl bằng w-[95%] hoặc w-[90%] để co giãn theo màn hình.
            2. Thêm max-w-[1400px] để nó không quá to trên màn hình cực lớn (giữ thẩm mỹ).
            3. min-h-[70vh] giúp chiều cao linh hoạt theo trình duyệt.
        */}
        <div className="w-[95%] max-w-[1400px] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[750px] lg:min-h-[80vh] border border-gray-100 transition-all hover:shadow-zinc-200/50">
          
          {/* LEFT SIDE (Sử dụng tỷ lệ linh hoạt) */}
          <div className="relative hidden md:flex flex-col justify-between p-12 lg:p-20 bg-zinc-950 text-white">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" 
                alt="Background" 
                className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center gap-3 opacity-90">
              <ScanFace className="w-8 h-8 text-white" />
              <span className="text-xl font-bold tracking-[0.2em] uppercase">OpticStore</span>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="flex items-center gap-2 mb-6 text-emerald-400">
                 <Glasses className="w-6 h-6" />
                 <span className="text-sm font-bold tracking-widest uppercase">New Season</span>
              </div>
              {/* Text size dùng đơn vị clamp hoặc 6xl để to hơn trên màn hình lớn */}
              <h1 className="text-5xl lg:text-7xl font-serif leading-tight mb-6">
                Vision <br/> 
                <span className="italic text-gray-400">Redefined.</span>
              </h1>
              <p className="text-gray-300 text-base lg:text-lg max-w-md font-light leading-relaxed opacity-80">
                Premium eyewear designed for the modern visionary. Experience the clarity.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE (Form giữ nguyên độ rộng đọc tốt nhất nhưng container giãn ra) */}
          <div className="flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 bg-white relative h-full">
             {/* max-w-[420px] là điểm ngọt (sweet spot) cho form để không bị quá loãng */}
             <div className="w-full max-w-[420px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                {children} 
             </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}