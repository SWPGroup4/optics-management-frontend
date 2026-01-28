// src/features/home/page/SearchResults.tsx
import { Link } from 'react-router-dom';
import { usePrescriptionStore } from '../store/usePrescriptionStore';
import { useProducts } from '../hooks/useProducts';
// 👇 Import Hook TanStack Query bạn vừa tạo

export const SearchResults = () => {
  // 1. Dùng Hook lấy data (Tự động loading, caching)
  const { data: products, isLoading, isError, error } = useProducts();
  
  // 2. Lấy state từ Prescription Store (cho bộ lọc Order Type)
  const { orderType, setOrderType } = usePrescriptionStore();

  // 3. Đảm bảo productList luôn là mảng (tránh crash app)
  const productList = Array.isArray(products) ? products : [];

  // --- UI Loading ---
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-20 text-center animate-pulse text-xl text-gray-400">
        Đang tìm kiếm bộ sưu tập phù hợp...
      </div>
    );
  }

  // --- UI Error ---
  if (isError) {
    return (
      <div className="max-w-7xl mx-auto p-20 text-center text-red-500 bg-red-50 rounded-xl">
        <p className="font-bold">Đã xảy ra lỗi tải dữ liệu</p>
        <p className="text-sm">⚠️ {error instanceof Error ? error.message : 'Lỗi không xác định'}</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-8 animate-in fade-in duration-500">
      
      {/* =========================================
          SIDEBAR FILTERS (GIỮ NGUYÊN HARDCODE)
         ========================================= */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Bộ lọc</h2>
          <button className="text-xs text-teal-600 font-bold hover:underline">XÓA TẤT CẢ</button>
        </div>

        <div className="space-y-8">
          {/* 1. Trạng thái (Kết nối Store) */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Trạng thái</h3>
            <div className="flex flex-col gap-2">
              {([
                { id: 'buy-now', label: 'Mua ngay' },
                { id: 'pre-order', label: 'Đặt trước' },
                { id: 'custom', label: 'Tùy chỉnh' }
              ] as const).map((type) => (
                <label key={type.id} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="orderType"
                    checked={orderType === type.id}
                    onChange={() => setOrderType(type.id)} 
                    className="w-4 h-4 text-teal-600"
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 2. Thương hiệu (CỨNG) */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Thương hiệu</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {['Luxora Premium', 'Vista Carbon', 'AeroFrame'].map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 3. Dáng gọng (CỨNG) */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Dáng gọng</h3>
            <div className="grid grid-cols-2 gap-2">
              {['ROUND', 'SQUARE', 'CAT EYE', 'AVIATOR'].map(shape => (
                <button 
                  key={shape} 
                  className="border p-3 text-[10px] rounded flex flex-col items-center gap-2 transition-all hover:border-teal-600 bg-white border-gray-200"
                >
                  <div className="w-6 h-4 border-2 border-gray-400 rounded-sm"></div>
                  <span className="font-bold">{shape}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {/* =========================================
          PRODUCT CONTENT AREA
         ========================================= */}
      <section className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <p className="text-gray-500 italic">Hiển thị {productList.length} sản phẩm</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Sắp xếp:</span>
            <select className="font-bold bg-transparent outline-none cursor-pointer text-teal-700">
              <option>Mới nhất</option>
              <option>Giá: Thấp đến Cao</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {productList.length === 0 ? (
          <div className="py-20 text-center text-gray-400 border-2 border-dashed rounded-xl">
            Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {productList.map((product) => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`} 
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group block relative"
              >
                {/* Badge Status */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded shadow-sm ${
                    product.status === 'PRE_ORDER' ? 'bg-orange-100 text-orange-700' : 
                    product.status === 'OUT_OF_STOCK' ? 'bg-gray-100 text-gray-500' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {product.status?.replace('_', ' ') || 'AVAILABLE'}
                  </span>
                </div>
                
                {/* Image + Fallback */}
                <div className="aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden mb-4 relative">
                   <img 
                      src={product.imageUrl?.[0] || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800'} 
                      alt={product.name} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
                   />
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-gray-900 line-clamp-1 flex-1" title={product.name}>
                        {product.name}
                    </h4>
                    
                    {/* 👇 ĐÃ FIX: Hiển thị giá tiền */}
                    <span className="text-teal-700 font-bold text-lg whitespace-nowrap">
                        ${product.weightGram ? product.weightGram.toLocaleString() : 'Contact'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-semibold tracking-wide">
                    <span>{product.brand}</span>
                    <span>•</span>
                    <span>{product.shape}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};