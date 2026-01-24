import { useState } from 'react';

// Dữ liệu mẫu (Giả lập có nhiều trang)
const products = [
  { id: 1, name: 'Aero Titanium 01', price: 189, tag: 'IN-STOCK', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300' },
  { id: 2, name: 'Luna Circular', price: 245, tag: 'PRE-ORDER', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300' },
  { id: 3, name: 'Vista Arches', price: 155, tag: 'IN-STOCK', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=300' },
  { id: 4, name: 'Crystal Clear 02', price: 210, tag: 'IN-STOCK', image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=300' },
  { id: 5, name: 'Carbon Flight', price: 320, tag: 'PRE-ORDER', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=300' },
  { id: 6, name: 'Zoe Oversized', price: 175, tag: 'IN-STOCK', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300' },
];

export const SearchResults = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12; // Giả định tổng số trang

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-8 animate-in fade-in duration-500">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Filters</h2>
          <button className="text-xs text-teal-600 font-medium hover:underline">CLEAR ALL</button>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Brand</h3>
            <div className="space-y-2 text-sm">
              {['Luxora Premium', 'Vista Carbon', 'AeroFrame'].map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-teal-600" />
                  <span className="text-gray-600 group-hover:text-black transition-colors">{brand}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Frame Shape</h3>
            <div className="grid grid-cols-2 gap-2">
              {['ROUND', 'SQUARE', 'CAT EYE', 'AVIATOR'].map(shape => (
                <button key={shape} className={`border p-3 text-[10px] rounded flex flex-col items-center gap-2 transition-all hover:border-teal-600 ${shape === 'SQUARE' ? 'border-teal-600 bg-teal-50' : 'bg-white border-gray-200'}`}>
                  <div className="w-6 h-4 border-2 border-gray-500 rounded-sm"></div>
                  <span className="font-medium">{shape}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {/* Product Content Area */}
      <section className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <p className="text-gray-500 italic">Showing {products.length} of 152 items</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Sort by:</span>
            <select className="font-bold bg-transparent outline-none cursor-pointer">
              <option>Popularity</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group relative border border-gray-100">
              <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-2 py-1 rounded ${product.tag === 'PRE-ORDER' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {product.tag}
              </span>
              <div className="aspect-[4/3] bg-gray-50 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                 <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800">{product.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">Modern Classic Square</p>
                </div>
                <span className="text-teal-600 font-bold text-lg">${product.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - Bộ chuyển trang */}
        <div className="mt-auto border-t pt-8 flex items-center justify-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-30"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          
          {[1, 2, 3, '...', totalPages].map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              className={`w-10 h-10 rounded text-sm font-medium transition-colors ${
                currentPage === page 
                ? 'bg-teal-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
              } ${page === '...' ? 'cursor-default' : ''}`}
            >
              {page}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-30"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </section>
    </main>
  );
};