import { useEffect } from 'react';
import { useProductStore } from '../store/useProductStore';
import { Link } from 'react-router-dom';
import { usePrescriptionStore } from '../store/usePrescriptionStore';

export const SearchResults = () => {
  // Lấy data và actions từ Store bạn đã viết
  const { products, isLoading, error, fetchProducts } = useProductStore();
  const { orderType, setOrderType } = usePrescriptionStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-20 text-center animate-pulse text-xl text-gray-400">
        Đang tìm kiếm bộ sưu tập phù hợp...
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-20 text-center text-red-500">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-8 animate-in fade-in duration-500">
      
      {/* SIDEBAR FILTERS - Đã đưa trở lại giao diện đầy đủ */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Bộ lọc</h2>
          <button className="text-xs text-teal-600 font-bold hover:underline">XÓA TẤT CẢ</button>
        </div>

        <div className="space-y-8">
          {/* Section: Loại đơn hàng (Kết nối trực tiếp orderType từ Store) */}
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
        // Lúc này type.id đã là kiểu "buy-now" | "pre-order" | "custom"
        onChange={() => setOrderType(type.id)} 
        className="w-4 h-4 text-teal-600"
      />
      <span>{type.label}</span>
    </label>
  ))}
</div>
          </section>

          {/* Section: Thương hiệu (UI Cứng) */}
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

          {/* Section: Hình dáng gọng (UI Cứng) */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Dáng gọng</h3>
            <div className="grid grid-cols-2 gap-2">
              {['ROUND', 'SQUARE', 'CAT EYE', 'AVIATOR'].map(shape => (
                <button 
                  key={shape} 
                  className={`border p-3 text-[10px] rounded flex flex-col items-center gap-2 transition-all hover:border-teal-600 bg-white border-gray-200`}
                >
                  <div className="w-6 h-4 border-2 border-gray-400 rounded-sm"></div>
                  <span className="font-bold">{shape}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {/* PRODUCT CONTENT AREA */}
      <section className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <p className="text-gray-500 italic">Hiển thị {products.length} sản phẩm</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Sắp xếp:</span>
            <select className="font-bold bg-transparent outline-none cursor-pointer text-teal-700">
              <option>Mới nhất</option>
              <option>Giá: Thấp đến Cao</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center text-gray-400 border-2 border-dashed rounded-xl">
            Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map((product) => (
              <Link 
          key={product.id} 
          to={`/products/${product.id}`} // Đường dẫn tới trang chi tiết
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group block"
        >
          {/* Badge Status */}
          <div className="mb-4">
            <span className={`text-[10px] font-bold px-2 py-1 rounded ${
              product.status === 'PRE-ORDER' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
            }`}>
              {product.status || 'IN-STOCK'}
            </span>
          </div>
          
          {/* Image */}
          <div className="aspect-[4/3] bg-gray-50 rounded-md overflow-hidden mb-4">
             <img 
                src={product.imageUrl?.[0] || 'https://via.placeholder.com/300'} 
                alt={product.name} 
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
             />
          </div>

          {/* Details */}
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-2">
              <h4 className="font-bold text-gray-800 line-clamp-1">{product.name}</h4>
              <p className="text-[10px] text-gray-400 uppercase mt-1 font-semibold">
                {product.brand} • {product.shape}
              </p>
            </div>
            <span className="text-teal-600 font-black text-lg">${product.weightGram || '199'}</span>
          </div>
        </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};