import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col selection:bg-gray-200 selection:text-black">

      <main className="flex-grow">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="w-full bg-[#FAFAFA] pt-10 md:pt-0 min-h-[600px] md:h-[80vh] flex items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[55%] h-full bg-[#F3F3F3] skew-x-12 translate-x-20 z-0 hidden md:block"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            
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
                {/* Updated Button Radius */}
                <Button className="h-12 md:h-14 px-8 md:px-10 bg-gray-900 hover:bg-black text-white rounded-[15px] transition-all duration-300 shadow-lg hover:shadow-xl text-xs md:text-sm font-bold tracking-widest uppercase">
                  Shop Collection
                </Button>
                <Button variant="ghost" className="h-12 md:h-14 px-6 md:px-8 text-gray-900 hover:bg-gray-100 rounded-[15px] text-xs md:text-sm font-bold tracking-widest uppercase border-b border-gray-900 hover:border-transparent transition-all">
                  Book Exam
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] md:h-full w-full order-1 md:order-2">
              {/* Updated Image Radius */}
              <img 
                src="https://i.pinimg.com/1200x/fc/70/4d/fc704d779033c6dd94e1c8288776204d.jpg" 
                alt="Hero Eyewear Model" 
                className="w-full h-full object-cover object-top md:object-center rounded-[15px]"
              />
            </div>
          </div>
        </section>
        {/* --- NEW SECTION: AUDIENCE CATEGORIES --- */}
<section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
  <div className="flex justify-between items-end mb-8">
    <h2 className="text-2xl font-serif text-gray-900 tracking-tight">Browse by Category</h2>
    <a href="#" className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1">
      View All Categories <ArrowUpRight className="w-3 h-3" />
    </a>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      { 
        name: 'Men', 
        img: 'https://i.pinimg.com/1200x/50/55/27/5055273a781891a955eeab54b7148bcb.jpg'
      },
      { 
        name: 'Women', 
        img :'https://i.pinimg.com/736x/83/fc/04/83fc0432ef91b53cbe8b2ba534c36856.jpg'
      },
      { 
        name: 'Kids', 
        img: 'https://i.pinimg.com/1200x/a4/b0/ce/a4b0ce9e445b99c0d950f99e56303307.jpg'
      }
    ].map((item, idx) => (
      <div key={idx} className="group relative h-[400px] overflow-hidden rounded-[15px] cursor-pointer">
        {/* Image */}
        <img 
          src={item.img} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay để nổi bật chữ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        
        {/* Label */}
        <div className="absolute bottom-8 left-8">
          <h3 className="text-3xl font-serif text-white tracking-wide">{item.name}</h3>
        </div>
        
        {/* Hover Effect: Border nhẹ */}
        <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-[15px]" />
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
                  {/* Updated Category Image Radius */}
                  <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden bg-gray-100 mb-4 rounded-[15px]">
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

          {/* --- 4. FEATURED PRODUCTS --- */}
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
                  {/* Updated Product Card Radius */}
                  <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden mb-4 border border-transparent group-hover:border-gray-200 transition-all rounded-[15px]">
                     <img 
                       src={product.img} 
                       alt={product.name} 
                       className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                     />
                     <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Updated Cart Button Radius */}
                        <Button className="w-full bg-white/90 backdrop-blur-sm text-black hover:bg-black hover:text-white shadow-sm h-10 rounded-[15px] uppercase text-[10px] font-bold tracking-widest transition-colors">
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
          {/* Updated Section Radius */}
          <section className="relative rounded-[15px] bg-gray-50 border border-gray-100 overflow-hidden px-6 py-12 md:px-16 md:py-14 text-center">
             <div className="relative z-10 max-w-2xl mx-auto space-y-3">
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase block">Professional Eye Exam</span>
                <h2 className="text-2xl md:text-3xl font-serif text-gray-900 leading-tight">
                   Đặt lịch kiểm tra thị lực <br/> <span className="text-gray-400 italic">chuẩn quốc tế.</span>
                </h2>
                <p className="text-gray-500 text-sm font-light leading-relaxed max-w-lg mx-auto">
                   Trải nghiệm quy trình đo mắt 12 bước với trang thiết bị tối tân. Tư vấn phong cách bởi stylist chuyên nghiệp.
                </p>
                <div className="pt-3">
                   {/* Updated Booking Button Radius */}
                   <Button className="h-11 px-8 bg-gray-900 text-white hover:bg-black rounded-[15px] text-[10px] font-bold tracking-widest uppercase shadow-md transition-all">
                      Đặt Lịch Ngay
                   </Button>
                </div>
             </div>
             
             <div className="absolute top-[-50%] left-[-20%] w-[400px] h-[400px] bg-gray-200/40 rounded-full blur-[80px] pointer-events-none"></div>
             <div className="absolute bottom-[-50%] right-[-20%] w-[400px] h-[400px] bg-gray-200/40 rounded-full blur-[80px] pointer-events-none"></div>
          </section>

        </div>
      </main>
    </div>
  );
};