import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ShieldCheck, Sparkles, Gem } from "lucide-react";
// 👇 Import hook gọi API của bạn vào đây
import { useProducts } from "../hooks/useProducts";

export default function HomePage() {
  // Lấy 4 sản phẩm mới nhất
  const { data, isLoading } = useProducts({
    size: 4,
    sortBy: "id",
    sortDir: "desc",
  });

  const newArrivals = data?.items || [];

  // 🌟 Hàm lấy màu sắc và nhãn đồng bộ từ trang Search
  const getGenderBadge = (gender: string) => {
    switch (gender) {
      case "MALE":
        return { label: "Nam", style: "bg-blue-100/80 text-blue-700 border-blue-200" };
      case "FEMALE":
        return { label: "Nữ", style: "bg-rose-100/80 text-rose-700 border-rose-200" };
      case "UNISEX":
      default:
        return { label: "Unisex", style: "bg-purple-100/80 text-purple-700 border-purple-200" };
    }
  };

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
                 <span className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">Est. 2024</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-[1.15]">
                Tuyệt Tác <br />
                <span className="italic font-light text-gray-400">Thị Giác.</span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 max-w-md font-light leading-relaxed">
                Sự cân bằng hoàn hảo giữa nghệ thuật chế tác thủ công và công nghệ quang học hiện đại. Nhẹ nhàng, bền bỉ và tinh tế trong từng đường nét.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/shop">
                  <Button className="h-12 md:h-14 px-8 md:px-10 bg-gray-900 hover:bg-black text-white rounded-[15px] transition-all duration-300 shadow-lg hover:shadow-xl text-xs md:text-sm font-bold tracking-widest uppercase">
                    Khám phá bộ sưu tập
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[400px] md:h-full w-full order-1 md:order-2">
              <img 
                src="https://i.pinimg.com/1200x/fc/70/4d/fc704d779033c6dd94e1c8288776204d.jpg" 
                alt="Người mẫu đeo kính cao cấp" 
                className="w-full h-full object-cover object-top md:object-center rounded-[15px]"
              />
            </div>
          </div>
        </section>

        {/* --- 2. AUDIENCE CATEGORIES --- */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-serif text-gray-900 tracking-tight">Mua Sắm Theo Đối Tượng</h2>
            <Link to="/shop" className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1">
              Xem tất cả <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Kính Nam', img: 'https://i.pinimg.com/1200x/50/55/27/5055273a781891a955eeab54b7148bcb.jpg', query: 'MALE' },
              { name: 'Kính Nữ', img :'https://i.pinimg.com/736x/83/fc/04/83fc0432ef91b53cbe8b2ba534c36856.jpg', query: 'FEMALE' },
              { name: 'Gọng Unisex', img: 'https://i.pinimg.com/1200x/a4/b0/ce/a4b0ce9e445b99c0d950f99e56303307.jpg', query: 'UNISEX' }
            ].map((item, idx) => (
              <Link to={`/shop?gender=${item.query}`} key={idx} className="group relative h-[400px] overflow-hidden rounded-[15px] cursor-pointer block">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-serif text-white tracking-wide">{item.name}</h3>
                </div>
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-[15px]" />
              </Link>
            ))}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 md:space-y-20 py-12 md:py-24">

          {/* --- 3. FEATURED PRODUCTS (NEW ARRIVALS TỪ API) --- */}
          <section>
            <div className="flex justify-between items-end mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900">Sản Phẩm Mới Nhất</h2>
              <Link to="/shop" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 hover:border-gray-900 transition-all pb-1">
                Xem Thêm
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-[4/5] bg-gray-100 animate-pulse rounded-[15px]"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                {newArrivals.map((product) => {
                  const genderBadge = product.gender ? getGenderBadge(product.gender) : null;

                  return (
                    <Link to={`/products/${product.id}`} key={product.id} className="group cursor-pointer block">
                      <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden mb-4 border border-transparent group-hover:border-gray-200 transition-all rounded-[15px]">
                        
                        {/* 🌟 Hiển thị Badge Giới tính tinh tế giống trang Shop */}
                        {genderBadge && (
                          <span className={`absolute top-3 left-3 z-10 backdrop-blur-md text-[9px] md:text-[10px] font-bold px-2 md:px-2.5 py-1 md:py-1.5 rounded-md shadow-sm border uppercase tracking-wider ${genderBadge.style}`}>
                            {genderBadge.label}
                          </span>
                        )}

                        <img 
                          src={product.imageUrl?.[0]?.imageUrl || "https://images.unsplash.com/photo-1572635196237-14b3f281503f"} 
                          alt={product.name} 
                          className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                        />
                        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button className="w-full bg-white/90 backdrop-blur-sm text-black hover:bg-black hover:text-white shadow-sm h-10 rounded-[15px] uppercase text-[10px] font-bold tracking-widest transition-colors pointer-events-none">
                            Xem Chi Tiết
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <h3 className="font-serif text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-teal-600 transition-colors">{product.name}</h3>
                        <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1 mb-2">
                          {product.brand || "Thương hiệu cao cấp"}
                        </p>
                        <span className="font-medium text-teal-700 text-sm">
                          {product.minPrice ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.minPrice) : "Liên hệ"}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* --- 4. BRANDING / SLOGAN SECTION --- */}
          {/* 🌟 Đã thu nhỏ py-10 trên mobile, giảm kích thước text */}
          <section className="relative rounded-[15px] md:rounded-[20px] bg-zinc-950 text-white overflow-hidden px-4 py-10 md:px-16 md:py-24 text-center group">
             {/* Hiệu ứng ánh sáng */}
             <div className="absolute top-[-50%] left-[50%] -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none group-hover:bg-white/10 transition-colors duration-1000"></div>
             
             <div className="relative z-10 max-w-3xl mx-auto space-y-4 md:space-y-6">
                <div className="flex justify-center items-center gap-2 mb-2 md:mb-4">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                  <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase block">Cam Kết Kiệt Tác</span>
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
                   Định hình phong cách. <br className="hidden sm:block"/> 
                   <span className="text-gray-400 italic font-light sm:ml-2">Tôn vinh khí chất.</span>
                </h2>
                
                <p className="text-gray-400 text-xs md:text-base font-light leading-relaxed max-w-2xl mx-auto pt-2 md:pt-4 px-2">
                   Mỗi thiết kế gọng kính đều là sự giao thoa hoàn mỹ giữa nghệ thuật chế tác thủ công và công nghệ vật liệu tiên tiến bậc nhất.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto pt-4 md:pt-8">
                  <div className="flex items-center justify-center gap-2 md:gap-3 bg-white/5 rounded-[12px] md:rounded-[15px] p-3 md:p-4 border border-white/10">
                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                    <span className="text-[10px] md:text-xs font-medium tracking-wide uppercase text-gray-300">Bảo hành chính hãng</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 md:gap-3 bg-white/5 rounded-[12px] md:rounded-[15px] p-3 md:p-4 border border-white/10">
                    <Gem className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                    <span className="text-[10px] md:text-xs font-medium tracking-wide uppercase text-gray-300">Titanium siêu nhẹ</span>
                  </div>
                </div>
             </div>
          </section>

        </div>
      </main>
    </div>
  );
}