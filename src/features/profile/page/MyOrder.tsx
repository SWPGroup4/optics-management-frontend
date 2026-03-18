import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { profileApi } from '../api/api';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const STATUS_CONFIG: Record<
  string,
  { color: string; label: string; dot: string; tab: string; icon: string }
> = {
  CONFIRMED: {
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    label: 'Đã xác nhận',
    dot: 'bg-emerald-500',
    tab: 'text-emerald-600 border-emerald-500 bg-emerald-50',
    icon: '✓',
  },
  PROCESSING: {
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    label: 'Đang xử lý',
    dot: 'bg-blue-500',
    tab: 'text-blue-600 border-blue-500 bg-blue-50',
    icon: '⟳',
  },
  PENDING: {
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    label: 'Chờ xử lý',
    dot: 'bg-amber-500',
    tab: 'text-amber-600 border-amber-500 bg-amber-50',
    icon: '○',
  },
  AWAITING_VERIFICATION: {
    color: 'bg-violet-50 text-violet-700 border-violet-200',
    label: 'Chờ xác minh',
    dot: 'bg-violet-500',
    tab: 'text-violet-600 border-violet-500 bg-violet-50',
    icon: '?',
  },
};

const ALL_STATUSES = ['ALL', 'CONFIRMED', 'PROCESSING', 'PENDING', 'AWAITING_VERIFICATION'];

function OrderCard({ order }: { order: any }) {
  const [expanded, setExpanded] = useState(false);
  const statusConfig = STATUS_CONFIG[order.orderStatus] ?? {
    color: 'bg-gray-50 text-gray-600 border-gray-200',
    label: order.orderStatus,
    dot: 'bg-gray-400',
  };
  const itemCount = order.items?.length ?? 0;

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-800 text-sm">
                Đơn #{order.orderId?.slice(0, 8).toUpperCase() ?? 'N/A'}
              </p>
              {/* Badge số lượng item */}
              <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                {itemCount} sản phẩm
              </span>
            </div>
            <p className="text-xs text-gray-400 truncate max-w-xs mt-0.5">
              {order.deliveryAddress}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 ml-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color} items-center gap-1.5 hidden sm:flex`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}></span>
            {statusConfig.label}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800 text-sm">
              {formatPrice(order.totalAmount)}
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50">
          {/* Thông tin giao hàng */}
          <div className="mb-4 p-3 bg-white rounded-xl border border-gray-100 flex gap-3 items-start">
            <svg
              className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Địa chỉ giao hàng</p>
              <p className="text-sm text-gray-700">{order.deliveryAddress}</p>
              <p className="text-xs text-gray-500 mt-0.5">{order.phoneNumber}</p>
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="space-y-3">
            {order.items.map((item: any, idx: number) => (
              <div
                key={item.orderItemId}
                className="bg-white border border-gray-100 rounded-xl p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">
                      Sản phẩm {idx + 1} / {itemCount}
                    </p>
                    <p className="font-medium text-gray-700 text-sm">
                      Mã SP: {item.productVariantId?.slice(0, 8).toUpperCase() ?? 'N/A'}
                    </p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {item.orderItemType}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm mt-3">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-400">Số lượng</p>
                    <p className="font-semibold text-gray-700">{item.quantity}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-400">Đơn giá</p>
                    <p className="font-semibold text-gray-700 text-xs">
                      {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-indigo-400">Thành tiền</p>
                    <p className="font-bold text-indigo-700 text-xs">
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                </div>

                {item.prescription && (
                  <div className="mt-3 pt-3 border-t border-dashed border-gray-100">
                    <p className="text-xs text-gray-400 mb-2 font-medium">📋 Thông tin toa thuốc</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <p className="text-blue-400 font-medium mb-1">Mắt phải (OD)</p>
                        <p>Cầu: {item.prescription.odSphere}</p>
                        <p>Trụ: {item.prescription.odCylinder}</p>
                        <p>Trục: {item.prescription.odAxis}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <p className="text-purple-400 font-medium mb-1">Mắt trái (OS)</p>
                        <p>Cầu: {item.prescription.osSphere}</p>
                        <p>Trụ: {item.prescription.osCylinder}</p>
                        <p>Trục: {item.prescription.osAxis}</p>
                      </div>
                    </div>
                    {item.prescription.note && (
                      <p className="mt-2 text-xs text-gray-500 italic bg-yellow-50 rounded-lg px-3 py-2">
                        Ghi chú: {item.prescription.note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tổng cộng */}
          <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-sm text-gray-500">{itemCount} sản phẩm</span>
            <div className="text-right">
              <p className="text-xs text-gray-400">Tổng thanh toán</p>
              <p className="text-lg font-bold text-indigo-700">{formatPrice(order.totalAmount)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState('ALL');

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['my-orders'],
    queryFn: async () => {
      const response = await profileApi.getOrders();
      return response.data.result;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-400">
        <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        Đang tải đơn hàng...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center p-12 text-red-400">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Không thể tải đơn hàng
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-400">
        <svg
          className="w-12 h-12 mb-3 text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-sm">Bạn chưa có đơn hàng nào</p>
      </div>
    );
  }

  // Đếm số đơn theo từng trạng thái
  const countByStatus = (status: string) =>
    orders.filter((o: any) => o.orderStatus === status).length;

  const filteredOrders =
    activeTab === 'ALL' ? orders : orders.filter((o: any) => o.orderStatus === activeTab);

  // Chỉ hiện tab nếu có đơn thuộc trạng thái đó
  const visibleStatuses = ALL_STATUSES.filter((s) => s === 'ALL' || countByStatus(s) > 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Tiêu đề */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Đơn hàng của tôi</h1>
        <p className="text-sm text-gray-400 mt-1">{orders.length} đơn hàng</p>
      </div>

      {/* Tabs trạng thái */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide">
        {visibleStatuses.map((status) => {
          const cfg = STATUS_CONFIG[status];
          const count = status === 'ALL' ? orders.length : countByStatus(status);
          const isActive = activeTab === status;

          return (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                isActive
                  ? status === 'ALL'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : `${cfg?.tab} border-current shadow-sm`
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status === 'ALL' ? (
                <>Tất cả</>
              ) : (
                <>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isActive ? cfg?.dot : 'bg-gray-300'}`}
                  ></span>
                  {cfg?.label}
                </>
              )}
              <span
                className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  isActive
                    ? status === 'ALL'
                      ? 'bg-white/20 text-white'
                      : 'bg-white/60'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Danh sách đơn */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <svg
            className="w-10 h-10 mb-3 text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-sm">Không có đơn hàng nào trong trạng thái này</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order: any) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
