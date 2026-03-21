'use client';

import { useState } from 'react';
import { useOrders } from '@/features/manager/hooks/useOrders';
import { fmt } from '@/lib/utils';
import { Loader2, Package, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { STATUS_CONFIG, type Order } from '../../types/order-type';
import { OrderDetailModal } from '../../components/oder/OrderDetailModal';

// ─── CONFIG & TYPES ─────────────────────────────────────────

const MAIN_TABS = ['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'];

// ─── COMPONENTS ─────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CONFIG[status] ?? { label: status, bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' };
    return (
        <span className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm w-[130px] ${cfg.bg} ${cfg.text} border-black/5`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${cfg.dot}`} />
            {cfg.label}
        </span>
    );
}



// ─── PAGE ───────────────────────────────────────────────────

export default function ManagerOrderPage() {
    const [queryParams, setQueryParams] = useState({ page: 0, size: 10, status: 'ALL', sortDir: 'desc' as 'asc' | 'desc', sortBy: 'createdAt' });
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const { orders, totalPages, loading } = useOrders({
        page: queryParams.page,
        size: queryParams.size,
        status: queryParams.status === 'ALL' ? undefined : queryParams.status,
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}

            <div className="max-w-6xl mx-auto px-6 py-10">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 text-white"><Package size={24}/></div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Orders</h1>
                        </div>
                        <p className="text-slate-500 font-medium text-sm">Quản lý và theo dõi tiến độ đơn hàng hệ thống</p>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar">
                        {MAIN_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setQueryParams(p => ({ ...p, status: tab, page: 0 }))}
                                className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                    queryParams.status === tab 
                                    ? 'bg-slate-900 text-white shadow-md' 
                                    : 'text-slate-500 hover:bg-slate-50'
                                }`}
                            >
                                {tab === 'ALL' ? 'Tất cả' : STATUS_CONFIG[tab]?.label || tab}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="bg-white rounded-[32px] shadow-sm border border-slate-200/60 overflow-hidden relative">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="pl-8 pr-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mã đơn</th>
                                    <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Khách hàng</th>
                                    <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Giá trị</th>
                                    <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Trạng thái</th>
                                    <th className="pl-4 pr-8 py-5"></th>
                                </tr>
                            </thead>

                            <tbody className={`divide-y divide-slate-50 transition-opacity duration-300 ${loading ? 'opacity-40' : 'opacity-100'}`}>
                                {orders.map((o) => (
                                    <tr 
                                        key={o.orderId} 
                                        className="group hover:bg-blue-50/30 transition-all cursor-pointer"
                                        onClick={() => setSelectedOrder(o)}
                                    >
                                        <td className="pl-8 pr-4 py-5 font-bold text-slate-900 text-sm">#{o.orderId.slice(0, 8)}</td>
                                        <td className="px-4 py-5">
                                            <div className="font-bold text-slate-700 text-sm">{o.recipientName || 'N/A'}</div>
                                            <div className="text-xs text-slate-400 font-medium">{o.phoneNumber}</div>
                                        </td>
                                        <td className="px-4 py-5 text-right font-black text-slate-900 text-sm">{fmt(o.totalAmount)}</td>
                                        <td className="px-4 py-5 text-center"><StatusBadge status={o.orderStatus} /></td>
                                        <td className="pl-4 pr-8 py-5 text-right">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <Eye size={16} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl shadow-xl flex items-center gap-3 border border-slate-100">
                                <Loader2 className="animate-spin text-blue-600" size={20} />
                                <span className="text-sm font-bold text-slate-700">Đang tải...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modern Pagination */}
                <div className="mt-8 flex items-center justify-between px-2">
                    <span className="text-sm font-bold text-slate-400">Trang {queryParams.page + 1} / {totalPages || 1}</span>
                    <div className="flex gap-3">
                        <button 
                            disabled={queryParams.page === 0 || loading}
                            onClick={() => setQueryParams(p => ({ ...p, page: p.page - 1 }))}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            disabled={queryParams.page + 1 >= totalPages || loading}
                            onClick={() => setQueryParams(p => ({ ...p, page: p.page + 1 }))}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}