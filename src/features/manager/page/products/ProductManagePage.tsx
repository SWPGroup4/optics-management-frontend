import { useState, useMemo, useRef, useEffect } from 'react';
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
    Check,
    AlertCircle,
    Loader2,
    ImageIcon,
    Package,
    ArrowUpDown,
} from 'lucide-react';
import { useDeleteProduct, useProducts, useCreateProduct, useUpdateProduct } from '../../hooks/useProducts';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';
import ProductModal from './ProductModal';

const ProductManagePage = () => {
    // 1. DATA FETCHING
    const { 
        data: products = [], 
        isLoading, 
        isError, 
    } = useProducts();

    const deleteMutation = useDeleteProduct();
    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();

    const navigate = useNavigate();

    // 2. UI STATES
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [openActionId, setOpenActionId] = useState<string | null>(null);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    const filterRef = useRef<HTMLDivElement>(null);
    useClickOutside(filterRef, () => setIsFilterOpen(false));

    useEffect(() => {
        const handleClickGlobal = () => setOpenActionId(null);
        window.addEventListener('click', handleClickGlobal);
        return () => window.removeEventListener('click', handleClickGlobal);
    }, []);

    // 3. LOGIC LỌC
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter((product) => {
            const term = searchTerm.toLowerCase();
            const matchesSearch =
                product.name.toLowerCase().includes(term) ||
                (product.brand?.toLowerCase() || '').includes(term) ||
                (product.frameMaterial?.toLowerCase() || '').includes(term);
            const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, filterCategory]);

    // 4. HANDLERS
    const handleDeleteProduct = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteMutation.mutate(id, {
                onSuccess: () => setOpenActionId(null)
            });
        }
    };

    const handleOpenAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (product: any) => {
        setEditingProduct(product);
        setIsModalOpen(true);
        setOpenActionId(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

   const handleSubmit = (form: any) => {
        if (editingProduct) {
            updateMutation.mutate(
                { 
                    id: editingProduct.id, 
                    productData: form.productData, 
                    file: form.file 
                },
                { onSuccess: handleCloseModal }
            );
        } else {
            createMutation.mutate(form, { onSuccess: handleCloseModal });
        }
    };

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    // --- STYLING HELPERS (Đã phóng to badge) ---
    const getCategoryBadge = (category: string) => {
        const cat = category?.toUpperCase() || '';
        // Style: Dùng text-xs chuẩn và padding rộng hơn (px-3 py-1)
        if (cat === 'FRAME') return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        if (cat === 'LENS') return 'bg-sky-50 text-sky-700 border-sky-200';
        if (cat === 'CONTACT') return 'bg-rose-50 text-rose-700 border-rose-200';
        return 'bg-slate-50 text-slate-600 border-slate-200';
    };

    const getStatusBadge = (status: string) => {
        const s = status?.toUpperCase() || '';
        if (s === 'ACTIVE') return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-4 ring-emerald-500/10';
        return 'bg-slate-100 text-slate-500 border-slate-200';
    };

    return (
        // BALANCED SPACING: Tăng padding tổng lên p-8
        <div className="min-h-screen bg-slate-50/50 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white p-8 font-sans text-slate-800 animate-in fade-in duration-700">
            
            {/* --- HEADER SECTION --- */}
            {/* BALANCED SPACING: Tăng margin bottom lên mb-8 */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Product Management</h1>
                    </div>
                    <p className="text-slate-500 text-base max-w-lg">
                        Manage your inventory efficiently. Track stock, update details, and organize your optical catalog.
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <button className="relative p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-all active:scale-95 group">
                        <Bell className="w-5 h-5 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>
                    </button>
                    <button className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-all active:scale-95 group">
                        <Settings className="w-5 h-5 text-slate-500 group-hover:text-slate-800 transition-colors" />
                    </button>
                </div>
            </div>

            {/* --- MAIN CARD --- */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col min-h-[600px]">
                
                {/* TOOLBAR */}
                {/* BALANCED SPACING: Tăng padding toolbar lên px-8 py-5 */}
                <div className="px-8 py-5 border-b border-slate-100 bg-white/50 backdrop-blur-xl flex flex-col lg:flex-row justify-between items-center gap-5 sticky top-0 z-10">
                    {/* Search Input: Tăng py-2.5 */}
                    <div className="relative w-full lg:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                        />
                    </div>
                    
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative" ref={filterRef}>
                            {/* Filter Button: Tăng padding px-4 py-2.5 */}
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all shadow-sm ${
                                    filterCategory !== 'all' 
                                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    <span className="capitalize">{filterCategory === 'all' ? 'All Categories' : filterCategory.toLowerCase()}</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isFilterOpen && (
                                <div className="absolute top-full right-0 mt-2 w-60 bg-white border border-slate-100 rounded-xl shadow-xl z-50 p-1.5 animate-in fade-in zoom-in-95">
                                    <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Type</div>
                                    {['all', 'FRAME', 'LENS', 'CONTACT'].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setFilterCategory(cat);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all ${
                                                filterCategory === cat ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            <span className="capitalize">{cat.toLowerCase()}</span>
                                            {filterCategory === cat && <Check className="w-4 h-4 text-indigo-600" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* Add Button: Tăng padding */}
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold shadow-lg hover:bg-slate-800 transition-all active:scale-95" onClick={handleOpenAdd}>
                            <Plus className="w-4 h-4" /> 
                            <span>Add New</span>
                        </button>
                    </div>
                </div>

                {/* TABLE CONTENT */}
                <div className="flex-1 overflow-x-auto">
                    {isError && (
                        <div className="flex flex-col items-center justify-center h-80 bg-red-50/30 animate-in fade-in">
                            <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
                            <p className="text-slate-900 font-semibold text-lg">Failed to load products</p>
                        </div>
                    )}

                    {isLoading ? (
                         <div className="flex flex-col items-center justify-center h-80">
                            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-3" />
                            <p className="text-sm font-medium text-slate-500">Syncing catalog...</p>
                         </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    {/* BALANCED SPACING: Header dùng py-4, text-sm */}
                                    <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider w-[100px]">Preview</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider cursor-pointer group hover:text-indigo-600 transition-colors">
                                        <div className="flex items-center gap-1">Product Info <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
                                    </th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Specifications</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider text-center">Category</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 bg-white">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product, index) => (
                                        <tr 
                                            key={product.id}
                                            style={{ animationDelay: `${index * 50}ms` }} 
                                            className="group hover:bg-slate-50/80 transition-all duration-200 animate-in slide-in-from-bottom-2 fade-in fill-mode-backwards"
                                        >
                                            {/* BALANCED SPACING: Row dùng py-5 cho thoáng */}
                                            {/* 1. Image: Phóng to lên w-14 h-14 */}
                                            <td className="px-6 py-5 align-middle">
                                                <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                                    {product.imageUrl && product.imageUrl.length > 0 ? (
                                                        <img 
                                                            src={typeof product.imageUrl[0] === 'string' ? product.imageUrl[0] : product.imageUrl[0].imageUrl}
                                                            alt={product.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <ImageIcon className="w-6 h-6 text-slate-300" />
                                                    )}
                                                </div>
                                            </td>

                                            {/* 2. Info: Tăng gap */}
                                            <td className="px-6 py-5 align-middle">
                                                <div className="flex flex-col gap-2">
                                                    <span className="font-bold text-slate-800 text-[15px] group-hover:text-indigo-600 transition-colors cursor-pointer leading-tight">{product.name}</span>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        {/* Badge brand/sku dùng text-xs */}
                                                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200/60">{product.brand}</span>
                                                        {product.sku && (
                                                            <span className="text-xs text-slate-400 font-mono border border-slate-200 px-2 py-1 rounded-md">{product.sku}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            {/* 3. Specs: Dùng text-sm */}
                                            <td className="px-6 py-5 align-middle">
                                                <div className="flex flex-col gap-1.5 text-sm">
                                                    {product.gender && (
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                                            <span>User: <span className="font-semibold text-slate-900">{product.gender}</span></span>
                                                        </div>
                                                    )}
                                                    {product.frameMaterial && (
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                                            <span>Mat: <span className="font-semibold text-slate-900">{product.frameMaterial}</span></span>
                                                        </div>
                                                    )}
                                                    {!product.gender && !product.frameMaterial && <span className="text-sm text-slate-300 italic">No specs</span>}
                                                </div>
                                            </td>

                                            {/* 4. Category: Badge dùng text-xs, padding lớn hơn */}
                                            <td className="px-6 py-5 align-middle text-center">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold tracking-wide uppercase border shadow-sm ${getCategoryBadge(product.category)}`}>
                                                    {product.category}
                                                </span>
                                            </td>

                                            {/* 5. Status: Badge dùng text-xs, padding lớn hơn */}
                                            <td className="px-6 py-5 align-middle text-center">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border gap-1.5 ${getStatusBadge(product.status)}`}>
                                                    {product.status === 'ACTIVE' && <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>}
                                                    {product.status}
                                                </span>
                                            </td>

                                            {/* 6. ACTIONS: Căn giữa hoàn toàn */}
{/* Thêm text-center để căn giữa nội dung trong ô */}
<td className="px-6 py-5 align-middle text-center">
    
    {/* Dùng flex justify-center để icon nằm chính giữa ô */}
    <div className="flex items-center justify-center">
        
        {/* Wrapper relative giữ menu dropdown neo vào nút này */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
                onClick={() => setOpenActionId(openActionId === product.id ? null : product.id)}
                // w-9 h-9: Giữ nút vuông vắn
                // mx-auto: Đảm bảo nút không bị lệch margin
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 ${
                    openActionId === product.id 
                    ? 'bg-indigo-50 text-indigo-600 ring-2 ring-indigo-100 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                }`}
            >
                <MoreHorizontal className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {openActionId === product.id && (
                // VỊ TRÍ DROPDOWN:
                // right-0: Căn mép phải menu bằng mép phải nút (để không bị tràn ra ngoài màn hình bên phải)
                // origin-top-right: Hiệu ứng mở ra từ góc phải
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 z-50 py-1.5 text-left animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Manage</p>
                    </div>
                    <button
                    onClick={() => navigate(`/manager/products/${product.id}/variants`)}
                     className="w-full px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 transition-colors font-medium">
                        <Eye className="w-4 h-4" /> View Details
                    </button>
                    <button onClick={() => handleOpenEdit(product)} className="w-full px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 transition-colors font-medium">
                        <Edit className="w-4 h-4" /> Edit Info
                    </button>
                    <div className="h-px bg-slate-100 my-1 mx-2"></div>
                    <button
                        onClick={() => handleDeleteProduct(product.id)}
                        disabled={deleteMutation.isPending}
                        className="w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors font-medium disabled:opacity-50"
                    >
                        {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin"/> : <Trash2 className="w-4 h-4" />}
                        Delete Product
                    </button>
                </div>
            )}
        </div>
    </div>
</td>
                                        </tr>
                                    ))
                                ) : (
                                    !isError && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-24 text-center">
                                                <div className="flex flex-col items-center justify-center max-w-sm mx-auto animate-in fade-in zoom-in-95 duration-500">
                                                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
                                                        <Package className="w-10 h-10 text-slate-300" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                                                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                                        We couldn't find any products matching your search terms.
                                                    </p>
                                                    <button 
                                                        onClick={() => {
                                                            setSearchTerm('');
                                                            setFilterCategory('all');
                                                        }}
                                                        className="px-6 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
                                                    >
                                                        Clear filters
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* PAGINATION */}
                {/* BALANCED SPACING: Tăng padding py-5 */}
                <div className="bg-white px-6 py-5 border-t border-slate-100 flex items-center justify-between gap-4 text-sm sticky bottom-0 z-10">
                    <span className="text-slate-500 font-medium">
                        Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> entries
                    </span>
                    <div className="flex gap-2.5">
                        <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm" disabled>Previous</button>
                        <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm" disabled>Next</button>
                    </div>
                </div>
            </div>

            <ProductModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                product={editingProduct}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};

export default ProductManagePage;