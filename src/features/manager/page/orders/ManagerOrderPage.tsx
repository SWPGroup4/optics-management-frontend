'use client';

import { useState } from 'react';
import { useOrders } from '@/features/manager/hooks/useOrders';
import type { Order } from '@/features/manager/api/order-api';

// ─── CONFIG ─────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, any> = {
    PENDING: { label: 'Chờ xử lý', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
    ON_HOLD: { label: 'Tạm giữ', bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
    CONFIRMED: { label: 'Đã xác nhận', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
    PREPARING: { label: 'Đang chuẩn bị', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-400' },
    PROCESSING: { label: 'Đang xử lý', bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-400' },
    PRODUCED: { label: 'Đã sản xuất', bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-400' },
    DELIVERING: { label: 'Đang giao', bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-400' },
    SHIPPED: { label: 'Đã gửi hàng', bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-400' },
    COMPLETED: { label: 'Hoàn thành', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    CANCELLED: { label: 'Đã huỷ', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-400' },
    REFUNDED: { label: 'Đã hoàn tiền', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-400' },
};

const PAGE_SIZE = 10;

// ─── HELPERS ────────────────────────────────────────────────

const fmt = (n?: number | null) =>
    n == null
        ? '—'
        : new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0,
        }).format(n);

// ─── COMPONENTS ─────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CONFIG[status] ?? {
        label: status,
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        dot: 'bg-gray-400',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${cfg.bg} ${cfg.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    );
}

function OrderDetailModal({ order, onClose }: { order: Order; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-white rounded-2xl w-full max-w-2xl p-6">
                <h2 className="font-bold mb-2">#{order.orderId}</h2>
                <StatusBadge status={order.orderStatus} />
                <p className="mt-2">Tổng tiền: {fmt(order.totalAmount)}</p>

                <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">
                    Đóng
                </button>
            </div>
        </div>
    );
}

// ─── PAGE ───────────────────────────────────────────────────

export default function ManagerOrderPage() {
    const { orders, loading, error, refetch } = useOrders();

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);

    // ✅ filter nâng cao (HEAD)
    const filtered = orders.filter((o) => {
        const q = searchQuery.toLowerCase();

        const matchSearch =
            !q ||
            o.orderId.toLowerCase().includes(q) ||
            (o.orderName ?? '').toLowerCase().includes(q) ||
            o.phoneNumber.includes(q) ||
            o.deliveryAddress.toLowerCase().includes(q) ||
            o.items.some(
                (item) =>
                    (item.itemName ?? '').toLowerCase().includes(q) ||
                    (item.productName ?? '').toLowerCase().includes(q)
            );

        const matchStatus = statusFilter === 'ALL' || o.orderStatus === statusFilter;

        return matchSearch && matchStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const resetPage = () => setCurrentPage(1);

    return (
        <div className="min-h-screen bg-[#f7f8fa]">
            {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>

                {/* search */}
                <input
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        resetPage();
                    }}
                    placeholder="Tìm kiếm..."
                    className="border px-3 py-2 mb-4 w-full"
                />

                {/* table */}
                <table className="w-full bg-white rounded-xl overflow-hidden">
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>SĐT</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginated.map((o) => (
                            <tr key={o.orderId}>
                                <td>#{o.orderId.slice(0, 8)}</td>
                                <td>{o.phoneNumber}</td>
                                <td>{fmt(o.totalAmount)}</td>
                                <td>
                                    <StatusBadge status={o.orderStatus} />
                                </td>
                                <td>
                                    <button onClick={() => setSelectedOrder(o)}>Xem</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* pagination */}
                <div className="mt-4 flex gap-2">
                    <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}>
                        Prev
                    </button>

                    <span>
                        {currentPage}/{totalPages}
                    </span>

                    <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}