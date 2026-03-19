import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { profileApi } from "../api/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Prescription {
  id: string;
  imageUrl: string | null;
  odSphere: number;
  odCylinder: number;
  odAxis: number;
  odAdd: number;
  odPd: number;
  osSphere: number;
  osCylinder: number;
  osAxis: number;
  osAdd: number;
  osPd: number;
  note: string;
}

interface OrderItem {
  orderItemId: string;
  productVariantId: string | null;
  itemName: string | null;
  productName: string | null;
  variantName: string | null;
  orderItemType: "IN_STOCK" | "PRE_ORDER";
  quantity: number;
  unitPrice: number;
  lensId: string | null;
  lensName: string | null;
  lensPrice: number | null;
  lensPriceTotal: number;
  totalPrice: number;
  status: string | null;
  prescription: Prescription | null;
}

interface Order {
  customerId: string;
  orderId: string;
  orderName: string | null;
  deliveryAddress: string;
  phoneNumber: string;
  orderStatus: string;
  totalAmount: number;
  depositAmount: number | null;
  items: OrderItem[];
  comboId: string | null;
  comboName: string | null;
  comboDiscountAmount: number | null;
  refundedAmount: number;
  finalTotalAfterRefund: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatPrice = (price: number | null | undefined) => {
  if (price == null) return "—";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};

const STATUS_CONFIG: Record<string, { color: string; label: string; dot: string; tab: string }> = {
  PENDING:               { color: "bg-amber-50 text-amber-700 border-amber-200",     label: "Chờ xử lý",      dot: "bg-amber-500",   tab: "text-amber-600 border-amber-500 bg-amber-50"   },
  ON_HOLD:               { color: "bg-gray-100 text-gray-600 border-gray-200",       label: "Tạm giữ",        dot: "bg-gray-400",    tab: "text-gray-600 border-gray-400 bg-gray-100"     },
  CONFIRMED:             { color: "bg-emerald-50 text-emerald-700 border-emerald-200",label: "Đã xác nhận",   dot: "bg-emerald-500", tab: "text-emerald-600 border-emerald-500 bg-emerald-50"},
  PROCESSING:            { color: "bg-blue-50 text-blue-700 border-blue-200",        label: "Đang xử lý",     dot: "bg-blue-500",    tab: "text-blue-600 border-blue-500 bg-blue-50"      },
  PREPARING:             { color: "bg-violet-50 text-violet-700 border-violet-200",  label: "Đang chuẩn bị",  dot: "bg-violet-500",  tab: "text-violet-600 border-violet-500 bg-violet-50" },
  PRODUCED:              { color: "bg-teal-50 text-teal-700 border-teal-200",        label: "Đã sản xuất",    dot: "bg-teal-500",    tab: "text-teal-600 border-teal-500 bg-teal-50"      },
  DELIVERING:            { color: "bg-cyan-50 text-cyan-700 border-cyan-200",        label: "Đang giao hàng", dot: "bg-cyan-500",    tab: "text-cyan-600 border-cyan-500 bg-cyan-50"      },
  SHIPPED:               { color: "bg-sky-50 text-sky-700 border-sky-200",           label: "Đã gửi hàng",    dot: "bg-sky-500",     tab: "text-sky-600 border-sky-500 bg-sky-50"         },
  COMPLETED:             { color: "bg-emerald-50 text-emerald-700 border-emerald-200",label: "Hoàn thành",    dot: "bg-emerald-500", tab: "text-emerald-600 border-emerald-500 bg-emerald-50"},
  CANCELLED:             { color: "bg-rose-50 text-rose-700 border-rose-200",        label: "Đã huỷ",         dot: "bg-rose-500",    tab: "text-rose-600 border-rose-500 bg-rose-50"      },
  REFUNDED:              { color: "bg-orange-50 text-orange-700 border-orange-200",  label: "Đã hoàn tiền",   dot: "bg-orange-500",  tab: "text-orange-600 border-orange-500 bg-orange-50" },
  AWAITING_VERIFICATION: { color: "bg-yellow-50 text-yellow-700 border-yellow-200",  label: "Chờ xác minh",   dot: "bg-yellow-500",  tab: "text-yellow-600 border-yellow-500 bg-yellow-50" },
};

const ITEM_STATUS: Record<string, string> = {
  IN_PRODUCTION: "Đang sản xuất",
  PRODUCED:      "Đã sản xuất",
  PENDING:       "Chờ xử lý",
  COMPLETED:     "Hoàn thành",
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG);

// ─── PrescriptionImage ────────────────────────────────────────────────────────

function PrescriptionImage({ imageUrl }: { imageUrl: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-2 flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Xem ảnh đơn kính
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setOpen(false)}>
          <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-gray-500 hover:text-gray-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={imageUrl}
              alt="Ảnh đơn kính"
              className="w-full rounded-2xl shadow-2xl object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </>
  );
}

// ─── OrderItem Card ───────────────────────────────────────────────────────────

function OrderItemCard({ item, orderName }: { item: OrderItem; index: number; total: number; orderName?: string | null }) {
  const productLabel = item.productName || item.itemName || orderName || (item.orderItemType === "PRE_ORDER" ? "Sản phẩm đặt trước" : "Sản phẩm có sẵn");

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
              item.orderItemType === "PRE_ORDER"
                ? "bg-violet-100 text-violet-700"
                : "bg-emerald-100 text-emerald-700"
            }`}>
              {item.orderItemType === "PRE_ORDER" ? "Đặt trước" : "Hàng có sẵn"}
            </span>
            {item.status && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-semibold">
                {ITEM_STATUS[item.status] ?? item.status}
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-gray-800">{productLabel}</p>
          {item.variantName && (
            <p className="text-xs text-gray-500 mt-0.5">🏷️ {item.variantName}</p>
          )}
          {item.lensName && item.lensPrice != null && (
            <p className="text-xs text-indigo-500 mt-0.5">🔭 {item.lensName} &nbsp;+&nbsp; {formatPrice(item.lensPrice)}</p>
          )}
          {item.productVariantId && (
            <p className="text-[11px] text-gray-400 font-mono mt-0.5 truncate">Mã: {item.productVariantId.slice(0, 12)}...</p>
          )}
        </div>
        <p className="text-sm font-bold text-gray-800 shrink-0">{formatPrice(item.totalPrice)}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-400 mb-0.5">Số lượng</p>
          <p className="font-semibold text-gray-700">{item.quantity}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-400 mb-0.5">Đơn giá</p>
          <p className="font-semibold text-gray-700 text-xs">{formatPrice(item.unitPrice)}</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-indigo-400 mb-0.5">Thành tiền</p>
          <p className="font-bold text-indigo-700 text-xs">{formatPrice(item.totalPrice)}</p>
        </div>
      </div>

      {item.prescription && (
        <div className="pt-3 border-t border-dashed border-gray-100 space-y-2">
          <p className="text-xs font-semibold text-gray-500">📋 Thông số đơn kính</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-blue-50 rounded-lg p-2.5">
              <p className="text-blue-500 font-semibold mb-1.5">Mắt phải (OD)</p>
              {[
                ["Cầu (Sphere)",   item.prescription.odSphere],
                ["Trụ (Cylinder)", item.prescription.odCylinder],
                ["Trục (Axis)",    item.prescription.odAxis],
                ["PD",             item.prescription.odPd],
              ].map(([k, v]) => (
                <div key={k as string} className="flex justify-between text-gray-600">
                  <span className="text-gray-400">{k}:</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-purple-50 rounded-lg p-2.5">
              <p className="text-purple-500 font-semibold mb-1.5">Mắt trái (OS)</p>
              {[
                ["Cầu (Sphere)",   item.prescription.osSphere],
                ["Trụ (Cylinder)", item.prescription.osCylinder],
                ["Trục (Axis)",    item.prescription.osAxis],
                ["PD",             item.prescription.osPd],
              ].map(([k, v]) => (
                <div key={k as string} className="flex justify-between text-gray-600">
                  <span className="text-gray-400">{k}:</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
          {item.prescription.note && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2">
              <p className="text-[10px] text-yellow-600 font-semibold mb-0.5">Ghi chú</p>
              <p className="text-xs text-gray-600 italic">{item.prescription.note}</p>
            </div>
          )}
          {item.prescription.imageUrl && <PrescriptionImage imageUrl={item.prescription.imageUrl} />}
        </div>
      )}
    </div>
  );
}

// ─── OrderCard ────────────────────────────────────────────────────────────────

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIG[order.orderStatus] ?? {
    color: "bg-gray-50 text-gray-600 border-gray-200",
    label: order.orderStatus,
    dot: 'bg-gray-400',
  };

  const hasDiscount = !!order.comboName && !!order.comboDiscountAmount;
  const hasRefund = order.refundedAmount > 0;

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-gray-800 text-sm">
                {order.orderName || `Đơn #${order.orderId.slice(0, 8).toUpperCase()}`}
              </p>
              <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {order.items.length} sản phẩm
              </span>
            </div>
            <p className="text-xs text-gray-400 truncate max-w-xs mt-0.5">{order.deliveryAddress}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border hidden sm:flex items-center gap-1.5 ${statusCfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
            {statusCfg.label}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-gray-800 text-sm">{formatPrice(order.finalTotalAfterRefund)}</span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/40 space-y-4">
          <div className="flex gap-3 items-start bg-white rounded-xl border border-gray-100 px-4 py-3">
            <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">Địa chỉ & SĐT</p>
              <p className="text-sm text-gray-700">{order.deliveryAddress}</p>
              <p className="text-xs text-gray-500 mt-0.5">{order.phoneNumber}</p>
            </div>
          </div>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <OrderItemCard key={item.orderItemId} item={item} index={idx} total={order.items.length} orderName={order.orderName} />
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 space-y-1.5">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Chi tiết thanh toán</p>

            {/* Tổng giá sản phẩm */}
            <div className="flex justify-between text-sm text-gray-500">
              <span>Tổng giá sản phẩm</span>
              <span className="font-medium text-gray-700">{formatPrice(order.totalAmount)}</span>
            </div>

            {/* Tổng tiền tròng kính */}
            {(() => {
              const totalLens = order.items.reduce((s, i) => s + (i.lensPriceTotal ?? 0), 0);
              return totalLens > 0 ? (
                <div className="flex justify-between text-sm text-indigo-500">
                  <span>Tổng tròng kính</span>
                  <span className="font-medium">+{formatPrice(totalLens)}</span>
                </div>
              ) : null;
            })()}

            {/* Giảm giá combo */}
            {hasDiscount && (
              <div className="flex justify-between text-sm text-violet-600">
                <span className="flex items-center gap-1.5">
                  <span>🎁</span>
                  <span>
                    Giảm combo
                    {order.totalAmount > 0 && order.comboDiscountAmount != null && (
                      <span className="ml-1.5 text-[11px] bg-violet-100 text-violet-600 font-bold px-1.5 py-0.5 rounded-full">
                        -{Math.round((order.comboDiscountAmount / order.totalAmount) * 100)}%
                      </span>
                    )}
                  </span>
                </span>
                <span className="font-semibold">-{formatPrice(order.comboDiscountAmount)}</span>
              </div>
            )}

            {/* Đã hoàn tiền */}
            {hasRefund && (
              <div className="flex justify-between text-sm text-orange-500">
                <span className="flex items-center gap-1.5">
                  <span>↩</span>
                  <span>Đã hoàn tiền</span>
                </span>
                <span className="font-semibold">-{formatPrice(order.refundedAmount)}</span>
              </div>
            )}

            <div className="border-t border-dashed border-gray-100 my-1" />

            {/* Đã đặt cọc */}
            {order.depositAmount != null && order.depositAmount > 0 && (
              <div className="flex justify-between text-sm text-emerald-600">
                <span className="flex items-center gap-1.5">
                  <span>✓</span>
                  <span>
                    Đã đặt cọc
                    {order.totalAmount > 0 && (
                      <span className="ml-1.5 text-[11px] bg-emerald-100 text-emerald-600 font-bold px-1.5 py-0.5 rounded-full">
                        {Math.round((order.depositAmount / order.totalAmount) * 100)}%
                      </span>
                    )}
                  </span>
                </span>
                <span className="font-semibold">{formatPrice(order.depositAmount)}</span>
              </div>
            )}

            {/* Còn lại phải trả */}
            {order.depositAmount != null && order.depositAmount > 0 && order.depositAmount < order.finalTotalAfterRefund && (
              <div className="flex justify-between text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span>⏳</span>
                  <span>Còn lại phải trả</span>
                </span>
                <span className="font-medium">{formatPrice(order.finalTotalAfterRefund - order.depositAmount)}</span>
              </div>
            )}

            {/* Thực thanh toán */}
            <div className="flex justify-between items-center pt-2.5 mt-1 border-t border-gray-200">
              <span className="text-sm font-semibold text-gray-700">Thực thanh toán</span>
              <span className="text-lg font-bold text-indigo-700">{formatPrice(order.finalTotalAfterRefund)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MyOrders ─────────────────────────────────────────────────────────────────

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState('ALL');
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["my-orders"] });
  }, [queryClient]);

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const response = await profileApi.getOrders();
      return response.data.result as Order[];
    },
    staleTime: 0,
  });

  if (isLoading) return <div className="p-12 text-center text-gray-400">Đang tải đơn hàng...</div>;
  if (isError) return <div className="p-12 text-center text-rose-400">Không thể tải đơn hàng</div>;
  if (!orders || orders.length === 0) return <div className="p-12 text-center text-gray-400">Bạn chưa có đơn hàng nào</div>;

  const countByStatus = (status: string) => orders.filter((o) => o.orderStatus === status).length;
  const filteredOrders = activeTab === "ALL" ? orders : orders.filter((o) => o.orderStatus === activeTab);
  const visibleStatuses = ["ALL", ...ALL_STATUSES.filter((s) => countByStatus(s) > 0)];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Đơn hàng của tôi</h1>
        <p className="text-sm text-gray-400 mt-1">{orders.length} đơn hàng</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide">
        {visibleStatuses.map((status) => {
          const cfg = STATUS_CONFIG[status];
          const isActive = activeTab === status;
          const count = status === 'ALL' ? orders.length : countByStatus(status);

          return (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isActive 
                  ? status === 'ALL' ? 'bg-indigo-600 text-white border-indigo-600' : `${cfg?.tab} border-current`
                  : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              {status === "ALL" ? "Tất cả" : cfg?.label}
              <span className="ml-1 text-xs opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
}