import { useState } from 'react';
import {
    Search,
    Bell,
    Settings,
    Filter,
    Plus,
    MoreHorizontal,
    ChevronDown,
    Trash2,
    Edit,
    Eye,
    Check
} from 'lucide-react';

// 1. Định nghĩa Type
type ProductStatus = 'active' | 'draft' | 'archived';
type ProductType = 'frame' | 'lens' | 'contact';

interface Product {
    id: string;
    sku: string;
    name: string;
    brand: string;
    type: ProductType;
    stock: number;
    price: number;
    status: ProductStatus;
}

// 2. Dữ liệu khởi tạo (Initial Data)
const INITIAL_DATA: Product[] = [
    { id: '1', sku: 'RB-3025-001', name: 'Ray-Ban Aviator Classic', brand: 'Ray-Ban', type: 'frame', stock: 5, price: 154, status: 'active' },
    { id: '2', sku: 'OO-9102-01', name: 'Oakley Holbrook', brand: 'Oakley', type: 'frame', stock: 3, price: 143, status: 'active' },
    { id: '3', sku: 'PR-SPR-57', name: 'Prada PR 57WS', brand: 'Prada', type: 'frame', stock: 12, price: 389, status: 'active' },
    { id: '4', sku: 'ESS-VX-167', name: 'Essilor Varilux X 1.67', brand: 'Essilor', type: 'lens', stock: 8, price: 299, status: 'active' },
    { id: '5', sku: 'ZE-SV-159', name: 'Zeiss Single Vision 1.59', brand: 'Zeiss', type: 'lens', stock: 45, price: 189, status: 'active' },
    { id: '6', sku: 'ACV-OAS-30', name: 'Acuvue Oasys Daily 30pk', brand: 'Acuvue', type: 'contact', stock: 12, price: 45, status: 'active' },
];

const ProductManagePage = () => {
    // --- STATES ---
    const [products, setProducts] = useState<Product[]>(INITIAL_DATA); // Quản lý danh sách sản phẩm
    const [searchTerm, setSearchTerm] = useState(''); // Quản lý từ khóa tìm kiếm
    const [filterType, setFilterType] = useState<ProductType | 'all'>('all'); // Quản lý bộ lọc loại
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Đóng/mở menu lọc
    const [openActionId, setOpenActionId] = useState<string | null>(null); // Quản lý ID đang mở menu hành động

    // --- LOGIC XỬ LÝ (HANDLERS) ---

    // 1. Logic Lọc & Tìm kiếm
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === 'all' || product.type === filterType;

        return matchesSearch && matchesType;
    });

    // 2. Thêm sản phẩm (Giả lập)
    const handleAddProduct = () => {
        const newProduct: Product = {
            id: Date.now().toString(),
            sku: `NEW-${Math.floor(Math.random() * 1000)}`,
            name: 'New Demo Product',
            brand: 'Demo Brand',
            type: 'frame',
            stock: 10,
            price: 99,
            status: 'draft',
        };
        setProducts([newProduct, ...products]); // Thêm vào đầu danh sách
    };

    // 3. Xóa sản phẩm
    const handleDeleteProduct = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
            setOpenActionId(null); // Đóng menu sau khi xóa
        }
    };

    // Helper render style
    const getTypeStyle = (type: ProductType) => {
        switch (type) {
            case 'frame': return 'bg-gray-900 text-white';
            case 'lens': return 'bg-blue-100 text-blue-700 border border-blue-200';
            case 'contact': return 'bg-green-100 text-green-700 border border-green-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-50 p-6 font-sans text-slate-800"
            onClick={() => {
                // Click ra ngoài thì đóng các menu
                if (isFilterOpen) setIsFilterOpen(false);
                if (openActionId) setOpenActionId(null);
            }}
        >
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your inventory</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Global Action Bar giữ nguyên */}
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Global search..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none w-64" />
                    </div>
                    <button className="p-2 bg-white border border-gray-200 rounded-lg"><Bell className="w-5 h-5 text-gray-600" /></button>
                    <button className="p-2 bg-white border border-gray-200 rounded-lg"><Settings className="w-5 h-5 text-gray-600" /></button>
                </div>
            </div>

            {/* MAIN CARD */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible pb-12">

                {/* TOOLBAR */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">

                    {/* Search Table */}
                    <div className="relative w-full sm:w-auto">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, sku..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 w-full sm:w-80"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto relative">
                        {/* Filter Button & Dropdown */}
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors ${filterType !== 'all' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-700'}`}
                            >
                                <Filter className="w-4 h-4" />
                                {filterType === 'all' ? 'All Types' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                                <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                            </button>

                            {isFilterOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                    {['all', 'frame', 'lens', 'contact'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setFilterType(type as any);
                                                setIsFilterOpen(false);
                                            }}
                                            className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 capitalize"
                                        >
                                            {type}
                                            {filterType === type && <Check className="w-4 h-4 text-blue-600" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={handleAddProduct}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            Add Product
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider bg-gray-50/50">
                            <th className="px-6 py-4">SKU</th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{product.sku}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-900 text-sm">{product.name}</span>
                                            <span className="text-xs text-gray-500">{product.brand}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(product.type)}`}>
                        {product.type}
                      </span>
                                    </td>
                                    <td className={`px-6 py-4 text-sm font-medium ${product.stock <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">${product.price}</td>
                                    <td className="px-6 py-4">
                      <span className={`text-sm capitalize px-2 py-0.5 rounded ${product.status === 'active' ? 'text-green-700 bg-green-50' : 'text-gray-600 bg-gray-100'}`}>
                        {product.status}
                      </span>
                                    </td>

                                    {/* ACTION COLUMN */}
                                    <td className="px-6 py-4 text-right relative">
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => setOpenActionId(openActionId === product.id ? null : product.id)}
                                                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${openActionId === product.id ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}
                                            >
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>

                                            {/* DROPDOWN MENU */}
                                            {openActionId === product.id && (
                                                <div className="absolute right-8 top-8 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 text-left">
                                                    <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                                        <Eye className="w-4 h-4 text-gray-400" /> View Details
                                                    </button>
                                                    <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                                        <Edit className="w-4 h-4 text-gray-400" /> Edit Info
                                                    </button>
                                                    <div className="border-t border-gray-100 my-1"></div>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <Search className="w-8 h-8 mb-2 opacity-20" />
                                        <p>No products found matching "{searchTerm}"</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <span>Showing {filteredProducts.length} entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50" disabled>Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductManagePage;