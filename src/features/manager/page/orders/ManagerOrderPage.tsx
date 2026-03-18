'use client';

import { useState } from 'react';
import { useOrders } from '@/features/manager/hooks/useOrders';
import type { Order } from '@/features/manager/api/order-api';

// ─── helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  PENDING: { label: 'Chờ xử lý', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  ON_HOLD: { label: 'Tạm giữ', bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
  CONFIRMED: { label: 'Đã xác nhận', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
  PROCESSING: {
    label: 'Đang xử lý',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    dot: 'bg-indigo-400',
  },
  PRODUCED: { label: 'Đã sản xuất', bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-400' },
  SHIPPED: { label: 'Đã gửi hàng', bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-400' },
  COMPLETED: {
    label: 'Hoàn thành',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  CANCELLED: { label: 'Đã huỷ', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-400' },
};

const ITEM_STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  IN_PRODUCTION: { label: 'Đang sản xuất', bg: 'bg-violet-100', text: 'text-violet-700' },
  COMPLETED: { label: 'Hoàn thành', bg: 'bg-teal-100', text: 'text-teal-700' },
  PENDING: { label: 'Chờ xử lý', bg: 'bg-amber-100', text: 'text-amber-700' },
};

// Format tiền Việt Nam: 1.500.000 ₫
const fmt = (n: number | null | undefined): string => {
  if (n == null) return '—';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(n);
};

// ─── StatusBadge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? {
    label: status,
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── OrderDetailModal ─────────────────────────────────────────────────────────

function OrderDetailModal({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
              Chi tiết đơn hàng
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5 font-mono truncate max-w-xs">
              #{order.orderId}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.orderStatus} />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* thông tin đơn hàng */}
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ['Địa chỉ giao hàng', order.deliveryAddress || '—'],
                ['Số điện thoại', order.phoneNumber || '—'],
                ['Tổng tiền', fmt(order.totalAmount)],
                ['Tiền đặt cọc', fmt(order.depositAmount)],
              ] as [string, string][]
            ).map(([nhanDe, giaTri]) => (
              <div key={nhanDe} className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                  {nhanDe}
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 break-words">{giaTri}</p>
              </div>
            ))}
          </div>

          {/* danh sách sản phẩm */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">
              Danh sách sản phẩm ({order.items.length})
            </p>
            <div className="space-y-3">
              {order.items.length === 0 && (
                <p className="text-sm text-gray-400 italic">Không có sản phẩm.</p>
              )}
              {order.items.map((item, idx) => {
                const itemCfg = ITEM_STATUS_CONFIG[item.status] ?? {
                  label: item.status,
                  bg: 'bg-gray-100',
                  text: 'text-gray-600',
                };
                return (
                  <div
                    key={item.productVariantId ?? idx}
                    className="border border-gray-100 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wide ${
                              item.orderItemType === 'PREORDER'
                                ? 'bg-violet-100 text-violet-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {item.orderItemType === 'PREORDER' ? 'Đặt trước' : 'Hàng có sẵn'}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wide ${itemCfg.bg} ${itemCfg.text}`}
                          >
                            {itemCfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 font-mono truncate">
                          Mã biến thể: {item.productVariantId || '—'}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-gray-800">{fmt(item.totalPrice)}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.quantity} cái × {fmt(item.unitPrice)}
                        </p>
                      </div>
                    </div>

                    {/* đơn kính */}
                    {item.prescription && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-[11px] text-blue-600 font-semibold uppercase tracking-wide mb-2">
                          Thông số đơn kính
                        </p>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-gray-600">
                          {(
                            [
                              ['Cầu mắt phải (Sphere)', item.prescription.odSphere],
                              ['Cầu mắt trái (Sphere)', item.prescription.osSphere],
                              ['Trụ mắt phải (Cylinder)', item.prescription.odCylinder],
                              ['Trụ mắt trái (Cylinder)', item.prescription.osCylinder],
                              ['Trục mắt phải (Axis)', item.prescription.odAxis],
                              ['Trục mắt trái (Axis)', item.prescription.osAxis],
                              ['Cộng mắt phải (Add)', item.prescription.odAdd],
                              ['Cộng mắt trái (Add)', item.prescription.osAdd],
                              ['PD mắt phải', item.prescription.odPd],
                              ['PD mắt trái', item.prescription.osPd],
                            ] as [string, number][]
                          ).map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-2">
                              <span className="text-gray-400 truncate">{k}:</span>
                              <span className="font-medium shrink-0">{v}</span>
                            </div>
                          ))}
                        </div>
                        {item.prescription.note && (
                          <p className="mt-2 text-xs text-blue-700 italic">
                            Ghi chú: "{item.prescription.note}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── OrdersTable ──────────────────────────────────────────────────────────────

const ALL_STATUSES = Object.keys(STATUS_CONFIG);
const PAGE_SIZE = 10;

export default function ManagerOrderPage() {
  const { orders, loading, error, refetch } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      o.orderId.toLowerCase().includes(q) ||
      o.phoneNumber.includes(q) ||
      o.deliveryAddress.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'ALL' || o.orderStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const resetPage = () => setCurrentPage(1);

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* tiêu đề trang */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quản lý đơn hàng</h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Đang tải dữ liệu...' : `Tổng cộng ${filtered.length} đơn hàng`}
          </p>
        </div>

        {/* thanh công cụ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 mb-4 flex flex-col sm:flex-row gap-3">
          {/* tìm kiếm */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Tìm theo mã đơn, số điện thoại, địa chỉ..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                resetPage();
              }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-gray-50"
            />
          </div>

          {/* lọc trạng thái */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              resetPage();
            }}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700"
          >
            <option value="ALL">Tất cả trạng thái</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_CONFIG[s].label}
              </option>
            ))}
          </select>

          {/* làm mới */}
          <button
            onClick={() => {
              refetch();
              resetPage();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Làm mới
          </button>
        </div>

        {/* bảng đơn hàng */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {error && (
            <div className="px-6 py-4 bg-rose-50 border-b border-rose-100 text-sm text-rose-700">
              ⚠️ Lỗi tải dữ liệu: {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {[
                    'Mã đơn hàng',
                    'Số điện thoại',
                    'Địa chỉ giao hàng',
                    'Số sản phẩm',
                    'Tổng tiền',
                    'Trạng thái',
                    'Thao tác',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-sm text-gray-400">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-7 h-7 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
                        Đang tải danh sách đơn hàng...
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && paginated.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-sm text-gray-400">
                      Không tìm thấy đơn hàng nào.
                    </td>
                  </tr>
                )}
                {!loading &&
                  paginated.map((order, idx) => (
                    <tr
                      key={order.orderId}
                      className={`border-b border-gray-50 hover:bg-indigo-50/30 transition-colors ${idx % 2 !== 0 ? 'bg-gray-50/30' : ''}`}
                    >
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-xs text-gray-500">
                          #{order.orderId.slice(0, 8)}...
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap">
                        {order.phoneNumber || '—'}
                      </td>
                      <td className="px-5 py-3.5">
                        <p
                          className="text-sm text-gray-700 max-w-[200px] truncate"
                          title={order.deliveryAddress}
                        >
                          {order.deliveryAddress || '—'}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-500">
                        {order.items.length} sản phẩm
                      </td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-gray-800 whitespace-nowrap">
                        {fmt(order.totalAmount)}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={order.orderStatus} />
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors whitespace-nowrap"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* phân trang */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Trang {currentPage} / {totalPages} &nbsp;·&nbsp; {filtered.length} đơn hàng
              </p>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Trang trước
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 text-xs font-medium rounded-lg transition-colors ${
                        page === currentPage
                          ? 'bg-indigo-600 text-white'
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Trang sau →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
