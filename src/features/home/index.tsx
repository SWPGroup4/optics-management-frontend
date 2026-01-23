import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer/Footer"; 
import Header from "@/components/layout/header";
import { Ruler, ShieldCheck, Clock, ArrowUpRight } from "lucide-react";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col selection:bg-gray-200 selection:text-black">
      
      <Header />

      <main className="flex-grow">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="w-full bg-[#FAFAFA] pt-10 md:pt-0 min-h-[600px] md:h-[80vh] flex items-center relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[55%] h-full bg-[#F3F3F3] skew-x-12 translate-x-20 z-0 hidden md:block"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 animate-in slide-in-from-bottom-10 duration-1000 fade-in order-2 md:order-1 pb-10 md:pb-0">
              <div className="inline-flex items-center gap-3">
                 <div className="h-[1px] w-12 bg-gray-400"></div>
                 <span className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">Est. 2026</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-[1.15]">
                Vision <br />
                <span className="italic font-light text-gray-400">Crafted.</span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 max-w-md font-light leading-relaxed">
                Sự cân bằng hoàn hảo giữa kỹ thuật thủ công và công nghệ quang học hiện đại. Nhẹ nhàng, bền bỉ và tinh tế.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button className="h-12 md:h-14 px-8 md:px-10 bg-gray-900 hover:bg-black text-white rounded-none transition-all duration-300 shadow-lg hover:shadow-xl text-xs md:text-sm font-bold tracking-widest uppercase">
                  Shop Collection
                </Button>
                <Button variant="ghost" className="h-12 md:h-14 px-6 md:px-8 text-gray-900 hover:bg-gray-100 rounded-none text-xs md:text-sm font-bold tracking-widest uppercase border-b border-gray-900 hover:border-transparent transition-all">
                  Book Exam
                </Button>
              </div>
            </div>

            {/* Right Image - Đã thay link mới (Cô gái đeo kính) */}
            <div className="relative h-[400px] md:h-full w-full order-1 md:order-2">
              <img 
                src="https://matkinhlb.com.vn/wp-content/uploads/2022/09/2-2.webp" 
                alt="Hero Eyewear Model" 
                className="w-full h-full object-cover object-top md:object-center"
              />
            </div>
          </div>
        </section>

        {/* --- 2. SERVICES --- */}
        <section className="bg-white py-16 border-b border-gray-100">
           <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {[
                { icon: <Ruler className="w-6 h-6" />, title: "Precision Fit", desc: "Đo đạc tỉ lệ khuôn mặt kỹ thuật số." },
                { icon: <ShieldCheck className="w-6 h-6" />, title: "Lifetime Care", desc: "Bảo hành kỹ thuật trọn đời sản phẩm." },
                { icon: <Clock className="w-6 h-6" />, title: "Express Service", desc: "Hoàn thiện kính thuốc trong 20 phút." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center px-4 pt-6 md:pt-0 group cursor-default">
                   <div className="mb-4 p-3 rounded-full bg-gray-50 text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all duration-500">
                     {item.icon}
                   </div>
                   <h3 className="font-serif text-lg text-gray-900 mb-2">{item.title}</h3>
                   <p className="text-sm text-gray-500 max-w-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20 py-16 md:py-24">

          {/* --- 3. CATEGORIES --- */}
          <section>
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Catalogue</span>
                <h2 className="text-3xl font-serif text-gray-900">Danh Mục Sản Phẩm</h2>
              </div>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 hover:border-gray-900 transition-all pb-1">
                Xem Tất Cả
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Optical Frames', vn: 'Gọng Kính Thuốc', img: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop' },
                { name: 'Sunglasses', vn: 'Kính Mát Thời Trang', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop' },
                { name: 'Accessories', vn: 'Phụ Kiện Kính', img: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop' }
              ].map((cat, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden bg-gray-100 mb-4">
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                    <div className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                       <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.vn}</p>
                </div>
              ))}
            </div>
          </section>

          {/* --- 4. FEATURED PRODUCTS (Đã thay ảnh chết) --- */}
          <section>
            <h2 className="text-3xl font-serif text-gray-900 mb-10 text-center">New Arrivals</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {[
                { name: 'The Architect', price: '2.400.000₫', img: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop' },
                { name: 'Midnight Sun', price: '3.850.000₫', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop' },
                { name: 'Oxford Oval', price: '1.950.000₫', img: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=800&auto=format&fit=crop' },
                { name: 'Tokyo Tortoise', price: '2.950.000₫', img: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=800&auto=format&fit=crop' },
              ].map((product, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden mb-4 border border-transparent group-hover:border-gray-200 transition-all rounded-lg md:rounded-none">
                     <img 
                       src={product.img} 
                       alt={product.name} 
                       className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                     />
                     <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button className="w-full bg-white/90 backdrop-blur-sm text-black hover:bg-black hover:text-white shadow-sm h-10 rounded-none uppercase text-[10px] font-bold tracking-widest transition-colors">
                           Add to Cart
                        </Button>
                     </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-0.5">Titanium</p>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- 5. BOOKING / CTA --- */}
          <section className="relative rounded-xl bg-gray-50 border border-gray-100 overflow-hidden px-6 py-12 md:px-16 md:py-14 text-center">
             <div className="relative z-10 max-w-2xl mx-auto space-y-3">
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase block">Professional Eye Exam</span>
                <h2 className="text-2xl md:text-3xl font-serif text-gray-900 leading-tight">
                   Đặt lịch kiểm tra thị lực <br/> <span className="text-gray-400 italic">chuẩn quốc tế.</span>
                </h2>
                <p className="text-gray-500 text-sm font-light leading-relaxed max-w-lg mx-auto">
                   Trải nghiệm quy trình đo mắt 12 bước với trang thiết bị tối tân. Tư vấn phong cách bởi stylist chuyên nghiệp.
                </p>
                <div className="pt-3">
                   <Button className="h-11 px-8 bg-gray-900 text-white hover:bg-black rounded-none text-[10px] font-bold tracking-widest uppercase shadow-md transition-all">
                      Đặt Lịch Ngay
                   </Button>
                </div>
             </div>
             
             {/* Decorative Circles */}
             <div className="absolute top-[-50%] left-[-20%] w-[400px] h-[400px] bg-gray-200/40 rounded-full blur-[80px] pointer-events-none"></div>
             <div className="absolute bottom-[-50%] right-[-20%] w-[400px] h-[400px] bg-gray-200/40 rounded-full blur-[80px] pointer-events-none"></div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};