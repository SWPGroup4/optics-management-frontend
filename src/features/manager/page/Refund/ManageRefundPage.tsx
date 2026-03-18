"use client";

import { useState, useCallback, useEffect } from "react";
import { refundApi, type RefundItem } from "@/features/manager/api/refund-api";
import type { Order } from "@/features/manager/api/order-api";

// ─── helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number | null | undefined) => {
    if (n == null) return "—";
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
};

const fmtDate = (d: string | null) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("vi-VN");
};

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
    return (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium ${
            type === "success" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
        }`}>
            <span>{type === "success" ? "✓" : "⚠"}</span>
            <span>{message}</span>
            <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100 text-lg leading-none">×</button>
        </div>
    );
}

// ─── Modal: Tạo batch hoàn tiền ───────────────────────────────────────────────

function CreateBatchModal({
    onClose,
    onSuccess,
}: {
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [step, setStep]                     = useState<1 | 2 | 3>(1);
    const [variantInput, setVariantInput]     = useState("");
    const [variantId, setVariantId]           = useState("");
    const [affectedOrders, setAffectedOrders] = useState<Order[]>([]);
    const [loading, setLoading]               = useState(false);
    const [toast, setToast]                   = useState<{ msg: string; type: "success" | "error" } | null>(null);

    const showToast = (msg: string, type: "success" | "error") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Step 1 → 2: vô hiệu hóa & load affected orders
    const handleInActivate = async () => {
        const id = variantInput.trim();
        if (!id) return;
        setLoading(true);
        try {
            await refundApi.inActivateVariant(id);
            setVariantId(id);
            const orders = await refundApi.getAffectedOrders(id);
            setAffectedOrders(orders);
            setStep(2);
        } catch (e: any) {
            showToast(e.message ?? "Lỗi khi xử lý variant", "error");
        } finally {
            setLoading(false);
        }
    };

    // Step 2 → 3: tạo batch
    const handleCreateBatch = async () => {
        setLoading(true);
        try {
            await refundApi.createBatch(variantId);
            showToast("Đã tạo batch hoàn tiền!", "success");
            setTimeout(() => { onSuccess(); onClose(); }, 800);
        } catch (e: any) {
            showToast(e.message ?? "Lỗi khi tạo batch", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                {toast && (
                    <div className={`absolute top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-xs font-semibold ${
                        toast.type === "success" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    }`}>{toast.msg}</div>
                )}

                {/* header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h3 className="text-base font-bold text-gray-900">Tạo đợt hoàn tiền</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Xử lý khi nhà sản xuất hủy pre-order</p>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>

                {/* step pills */}
                <div className="flex px-6 pt-4 gap-2">
                    {[
                        { n: 1, label: "Nhập Variant" },
                        { n: 2, label: "Xem đơn bị ảnh hưởng" },
                    ].map(s => (
                        <div key={s.n} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            step === s.n ? "bg-indigo-600 text-white" :
                            step > s.n  ? "bg-emerald-100 text-emerald-700" :
                                          "bg-gray-100 text-gray-400"
                        }`}>
                            <span>{step > s.n ? "✓" : s.n}</span>
                            <span>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* body */}
                <div className="px-6 py-5">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Tên sản phẩm / Variant ID
                                </label>
                                <input
                                    autoFocus
                                    type="text"
                                    value={variantInput}
                                    onChange={e => setVariantInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleInActivate()}
                                    placeholder="Nhập tên sản phẩm hoặc Variant ID..."
                                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50"
                                />
                                <p className="text-[11px] text-gray-400 mt-1.5">
                                    Ví dụ: "Gentle Monster Her 01" hoặc UUID của variant
                                </p>
                            </div>
                            <div className="flex gap-3 pt-1">
                                <button onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                    Hủy
                                </button>
                                <button
                                    onClick={handleInActivate}
                                    disabled={!variantInput.trim() || loading}
                                    className="flex-1 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    {loading ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : null}
                                    Vô hiệu hóa & Tiếp tục
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Tìm thấy <span className="font-bold text-rose-600">{affectedOrders.length} đơn hàng</span> bị ảnh hưởng
                                </p>
                                <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded">
                                    {variantId.slice(0, 12)}...
                                </span>
                            </div>

                            {affectedOrders.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <p className="text-2xl mb-1">📭</p>
                                    <p className="text-sm">Không có đơn nào bị ảnh hưởng</p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[240px] overflow-y-auto">
                                    {affectedOrders.map(order => {
                                        const name = (order.items ?? []).find(i => i.itemName || i.productName);
                                        return (
                                            <div key={order.orderId} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 text-sm">
                                                <div className="min-w-0">
                                                    <p className="font-medium text-gray-800 truncate">
                                                        {name ? (name.itemName || name.productName) : "Sản phẩm không xác định"}
                                                    </p>
                                                    <p className="text-xs text-gray-400 font-mono mt-0.5">#{(order.orderId ?? "").slice(0, 8)}...</p>
                                                </div>
                                                <div className="text-right shrink-0 ml-4">
                                                    <p className="font-bold text-gray-800">{fmt(order.paidAmount)}</p>
                                                    <p className="text-xs text-gray-400">đã thanh toán</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {affectedOrders.length > 0 && (
                                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex justify-between text-sm">
                                    <span className="text-amber-700 font-medium">Tổng tiền cần hoàn</span>
                                    <span className="font-bold text-amber-700">
                                        {fmt(affectedOrders.reduce((s, o) => s + (o.paidAmount ?? 0), 0))}
                                    </span>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                    ← Quay lại
                                </button>
                                <button
                                    onClick={handleCreateBatch}
                                    disabled={loading || affectedOrders.length === 0}
                                    className="flex-1 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    {loading ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : null}
                                    ⚡ Tạo batch hoàn tiền
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Modal: Chi tiết refund ───────────────────────────────────────────────────

function RefundDetailModal({ refund, onClose, onCheckout }: {
    refund: RefundItem;
    onClose: () => void;
    onCheckout: (id: string) => Promise<string | null | undefined>;
}) {
    const [loading, setLoading] = useState(false);
    const order = refund.order;
    const name = (order.items ?? []).find(i => i.itemName || i.productName);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const paymentUrl = await onCheckout(refund.refundId);
            // onCheckout đã xử lý redirect, chỉ đóng modal nếu không redirect
            if (!paymentUrl) onClose();
        } catch {}
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Chi tiết hoàn tiền</p>
                        <p className="text-sm font-bold text-gray-800 mt-0.5 font-mono">#{(refund.refundId ?? "").slice(0, 8)}...</p>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>
                <div className="px-6 py-5 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            ["Sản phẩm",        name ? (name.itemName || name.productName) : "—"],
                            ["Mã đơn hàng",     `#${(order.orderId ?? "").slice(0, 8)}...`],
                            ["SĐT khách",       order.phoneNumber || "—"],
                            ["Số tiền hoàn",    fmt(order.paidAmount)],
                            ["Đặt cọc",         fmt(order.depositAmount)],
                            ["Trạng thái đơn",  order.orderStatus],
                        ].map(([k, v]) => (
                            <div key={k} className="bg-gray-50 rounded-xl px-3 py-2.5">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide">{k}</p>
                                <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">{v}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 rounded-xl px-3 py-2.5">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Địa chỉ giao hàng</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">{order.deliveryAddress || "—"}</p>
                    </div>

                    {/* bank info */}
                    {order.bankInfo?.bankName && (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                            <p className="text-[10px] text-blue-600 uppercase tracking-wide font-semibold mb-1">Thông tin hoàn tiền</p>
                            <p className="text-sm text-gray-700"><span className="text-gray-400">Ngân hàng:</span> <span className="font-medium">{order.bankInfo.bankName}</span></p>
                            <p className="text-sm text-gray-700"><span className="text-gray-400">STK:</span> <span className="font-medium">{order.bankInfo.bankAccountNumber}</span></p>
                            <p className="text-sm text-gray-700"><span className="text-gray-400">Chủ TK:</span> <span className="font-medium">{order.bankInfo.accountHolderName}</span></p>
                        </div>
                    )}
                </div>
                <div className="px-6 pb-5 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                        Đóng
                    </button>
                    <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="flex-1 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : null}
                        ✓ Xác nhận hoàn tiền
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

export default function RefundManagePage() {
    const [refunds, setRefunds]               = useState<RefundItem[]>([]);
    const [loading, setLoading]               = useState(false);
    const [doneSet, setDoneSet]               = useState<Set<string>>(new Set());
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedRefund, setSelectedRefund] = useState<RefundItem | null>(null);
    const [searchQ, setSearchQ]               = useState("");
    const [statusTab, setStatusTab]           = useState<"ALL" | "PENDING" | "DONE">("ALL");
    const [currentPage, setCurrentPage]       = useState(1);
    const [toast, setToast]                   = useState<{ msg: string; type: "success" | "error" } | null>(null);
    const [checkingAll, setCheckingAll]       = useState(false);

    const showToast = (msg: string, type: "success" | "error") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const loadRefunds = useCallback(async () => {
        setLoading(true);
        try {
            const data = await refundApi.getReadyRefunds();
            setRefunds(data);
        } catch (e: any) {
            showToast(e.message ?? "Lỗi tải dữ liệu", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadRefunds(); }, [loadRefunds]);

    const handleCheckout = async (refundId: string): Promise<string | null | undefined> => {
        try {
            const paymentUrl = await refundApi.checkoutRefund(refundId);
            if (paymentUrl) {
                window.location.href = paymentUrl;
                return paymentUrl;
            } else {
                setDoneSet(prev => new Set([...prev, refundId]));
                showToast("Hoàn tiền thành công!", "success");
                return null;
            }
        } catch (e: any) {
            showToast(e.message ?? "Lỗi hoàn tiền", "error");
            return null;
        }
    };

    const handleCheckoutAll = async () => {
        setCheckingAll(true);
        const pending = filtered.filter(r => !doneSet.has(r.refundId));
        for (const r of pending) {
            try {
                await refundApi.checkoutRefund(r.refundId);
                setDoneSet(prev => new Set([...prev, r.refundId]));
            } catch {}
        }
        showToast("Đã hoàn tiền tất cả!", "success");
        setCheckingAll(false);
    };

    // filter
    const filtered = refunds.filter(r => {
        if (!r || !r.order) return false;
        const name = (r.order.items ?? []).find(i => i.itemName || i.productName);
        const displayName = name ? (name.itemName || name.productName || "") : "";
        const q = searchQ.toLowerCase();
        const matchSearch = !q ||
            (r.refundId ?? "").toLowerCase().includes(q) ||
            (r.order.orderId ?? "").toLowerCase().includes(q) ||
            (r.order.phoneNumber ?? "").includes(q) ||
            displayName.toLowerCase().includes(q);
        const isDone = doneSet.has(r.refundId);
        const matchTab = statusTab === "ALL" || (statusTab === "DONE" ? isDone : !isDone);
        return matchSearch && matchTab;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const pendingCount = refunds.filter(r => !doneSet.has(r.refundId)).length;

    return (
        <div className="min-h-screen bg-[#f7f8fa]">
            {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
            {showCreateModal && (
                <CreateBatchModal
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={() => { loadRefunds(); showToast("Batch tạo thành công, danh sách đã được cập nhật!", "success"); }}
                />
            )}
            {selectedRefund && (
                <RefundDetailModal
                    refund={selectedRefund}
                    onClose={() => setSelectedRefund(null)}
                    onCheckout={handleCheckout}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                {/* tiêu đề */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quản lý hoàn tiền</h1>
                        <p className="text-sm text-gray-500 mt-1">Xem xét và xử lý các yêu cầu hoàn tiền</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={loadRefunds}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg border border-gray-200 transition-colors"
                            title="Làm mới"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                        {pendingCount > 1 && (
                            <button
                                onClick={handleCheckoutAll}
                                disabled={checkingAll}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl transition-colors"
                            >
                                {checkingAll
                                    ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    : "✓"
                                }
                                Hoàn tiền tất cả ({pendingCount})
                            </button>
                        )}
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            Tạo đợt hoàn tiền
                        </button>
                    </div>
                </div>

                {/* toolbar: tabs + search */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    {/* tabs */}
                    <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                        {([
                            { key: "ALL",     label: "Tất cả",       count: refunds.length },
                            { key: "PENDING", label: "Chờ xử lý",    count: pendingCount },
                            { key: "DONE",    label: "Đã hoàn tiền", count: doneSet.size },
                        ] as const).map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => { setStatusTab(tab.key); setCurrentPage(1); }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    statusTab === tab.key
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {tab.label}
                                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    statusTab === tab.key ? "bg-indigo-100 text-indigo-600" : "bg-gray-200 text-gray-500"
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* search */}
                    <div className="relative flex-1 w-full">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Tìm theo mã hoàn tiền, tên sản phẩm, số điện thoại..."
                            value={searchQ}
                            onChange={e => { setSearchQ(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50"
                        />
                    </div>
                </div>

                {/* bảng */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70">
                                    {["Mã hoàn tiền", "Mã đơn hàng", "Sản phẩm", "Số điện thoại", "Số tiền", "Ngân hàng", "Trạng thái", "Thao tác"].map(h => (
                                        <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={8} className="text-center py-16 text-sm text-gray-400">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-7 h-7 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
                                                Đang tải...
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {!loading && paginated.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="text-center py-16 text-sm text-gray-400">
                                            Không có dữ liệu hoàn tiền.
                                        </td>
                                    </tr>
                                )}
                                {!loading && paginated.map((refund, idx) => {
                                    const order    = refund.order;
                                    const isDone   = doneSet.has(refund.refundId);
                                    const nameItem = (order.items ?? []).find(i => i.itemName || i.productName);
                                    const prodName = nameItem ? (nameItem.itemName || nameItem.productName) : null;
                                    const extraCnt = (order.items ?? []).length - 1;

                                    return (
                                        <tr
                                            key={refund.refundId}
                                            className={`border-b border-gray-50 hover:bg-indigo-50/20 transition-colors ${idx % 2 !== 0 ? "bg-gray-50/30" : ""}`}
                                        >
                                            {/* mã hoàn tiền */}
                                            <td className="px-5 py-3.5">
                                                <span className="font-mono text-xs text-gray-500">
                                                    #{(refund.refundId ?? "").slice(0, 8)}...
                                                </span>
                                            </td>

                                            {/* mã đơn */}
                                            <td className="px-5 py-3.5">
                                                <span className="font-mono text-xs text-gray-500">
                                                    #{(order.orderId ?? "").slice(0, 8)}...
                                                </span>
                                            </td>

                                            {/* tên sản phẩm */}
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-2">
                                                    {nameItem?.productImage && (
                                                        <img src={nameItem.productImage} alt="" className="w-8 h-8 rounded-lg object-cover border border-gray-100 shrink-0" />
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-gray-800 max-w-[160px] truncate">
                                                            {prodName ?? <span className="text-gray-400 italic text-xs">Không xác định</span>}
                                                        </p>
                                                        {extraCnt > 0 && (
                                                            <p className="text-xs text-gray-400">+{extraCnt} sản phẩm khác</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* sdt */}
                                            <td className="px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap">
                                                {order.phoneNumber || "—"}
                                            </td>

                                            {/* số tiền */}
                                            <td className="px-5 py-3.5">
                                                <p className="text-sm font-bold text-gray-800 whitespace-nowrap">{fmt(order.paidAmount)}</p>
                                                <p className="text-xs text-gray-400">đã thanh toán</p>
                                            </td>

                                            {/* ngân hàng */}
                                            <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                                                {order.bankInfo?.bankName || <span className="text-gray-300">—</span>}
                                            </td>

                                            {/* trạng thái */}
                                            <td className="px-5 py-3.5">
                                                {isDone ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                        Đã hoàn tiền
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                        Chờ xử lý
                                                    </span>
                                                )}
                                            </td>

                                            {/* thao tác */}
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setSelectedRefund(refund)}
                                                        className="text-xs px-3 py-1.5 rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-semibold transition-colors whitespace-nowrap"
                                                    >
                                                        Xem chi tiết
                                                    </button>
                                                    {!isDone && (
                                                        <button
                                                            onClick={() => handleCheckout(refund.refundId)}
                                                            className="text-xs px-3 py-1.5 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 font-semibold transition-colors whitespace-nowrap"
                                                        >
                                                            Hoàn tiền
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* phân trang */}
                    {!loading && totalPages > 1 && (
                        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                {`Hiển thị ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} trong ${filtered.length} kết quả`}
                            </p>
                            <div className="flex gap-1.5">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    ←
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-8 h-8 text-xs font-medium rounded-lg transition-colors ${
                                                page === currentPage ? "bg-indigo-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}