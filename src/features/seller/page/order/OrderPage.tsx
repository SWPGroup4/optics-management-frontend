import { useState } from "react";
import {
  Search,
  Filter,
  RotateCcw,
  Download
} from "lucide-react";

type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPING"
  | "COMPLETED"
  | "CANCELLED";

interface Order {
  id: string;
  code: string;
  customerName: string;
  phone: string;
  orderType: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    code: "#ORD-1023",
    customerName: "Nguyễn Văn A",
    phone: "0901234567",
    orderType: "Kính cận",
    total: 1500000,
    status: "PENDING",
    createdAt: "Today, 09:41",
  },
  {
    id: "2",
    code: "#ORD-1022",
    customerName: "Trần Thị B",
    phone: "0909876543",
    orderType: "Kính râm",
    total: 2300000,
    status: "PAID",
    createdAt: "Yesterday, 14:20",
  },
  {
    id: "3",
    code: "#ORD-1021",
    customerName: "Lê Văn C",
    phone: "0912345678",
    orderType: "Gọng kính",
    total: 890000,
    status: "SHIPPING",
    createdAt: "23 Oct, 09:00",
  },
  {
    id: "4",
    code: "#ORD-1020",
    customerName: "Phạm Thị D",
    phone: "0987654321",
    orderType: "Kính thuốc",
    total: 1200000,
    status: "COMPLETED",
    createdAt: "22 Oct, 18:30",
  },
  {
    id: "5",
    code: "#ORD-1019",
    customerName: "Hoàng Văn E",
    phone: "0934567890",
    orderType: "Áp tròng",
    total: 450000,
    status: "CANCELLED",
    createdAt: "21 Oct, 11:15",
  },
];

const statusStyle: Record<OrderStatus, string> = {
  PENDING: "bg-orange-100 text-orange-700",
  PAID: "bg-green-100 text-green-700",
  SHIPPING: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const statusLabel: Record<OrderStatus, string> = {
  PENDING: "Chờ xử lý",
  PAID: "Đã thanh toán",
  SHIPPING: "Đang giao",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
};

export default function OrderPage() {
  const [orders] = useState<Order[]>(MOCK_ORDERS);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Quản lý Đơn hàng</h1>
        <p className="text-gray-500 text-sm">
          Theo dõi, xử lý và quản lý tất cả đơn đặt hàng từ khách hàng.
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search anything..."
              className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64"
            />
          </div>

          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
            <Filter className="w-4 h-4" />
            Filter status...
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 border rounded-lg">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="p-2 border rounded-lg">
            <Download className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
            + Tạo đơn mới
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">MÃ ĐƠN</th>
              <th className="px-4 py-3 text-left">KHÁCH HÀNG</th>
              <th className="px-4 py-3 text-left">LOẠI ĐƠN</th>
              <th className="px-4 py-3 text-left">TỔNG TIỀN</th>
              <th className="px-4 py-3 text-left">TRẠNG THÁI</th>
              <th className="px-4 py-3 text-right">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium">{order.code}</div>
                  <div className="text-xs text-gray-500">
                    {order.createdAt}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-xs text-gray-500">{order.phone}</div>
                </td>

                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                    {order.orderType}
                  </span>
                </td>

                <td className="px-4 py-3 font-medium">
                  {order.total.toLocaleString()}đ
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[order.status]}`}
                  >
                    {statusLabel[order.status]}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1 border rounded-full text-xs">
                    Xử lý
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="px-4 py-3 text-sm text-gray-500">
          Showing 1 to {orders.length} of {orders.length} results
        </div>
      </div>
    </div>
  );
}