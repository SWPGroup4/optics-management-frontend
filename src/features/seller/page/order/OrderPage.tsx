import { useState } from "react";
import { Link } from "react-router-dom";

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
      <div>
        <h1 className="text-2xl font-bold">Quản lý Đơn hàng</h1>
        <p className="text-gray-500 text-sm">
          Theo dõi, xử lý và quản lý tất cả đơn đặt hàng từ khách hàng.
        </p>
      </div>

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
                  <div className="text-xs text-gray-500">{order.createdAt}</div>
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
                  <Link
                    to={`/seller/orders/${order.id}`}
                    className="px-3 py-1 border rounded-full text-xs hover:bg-purple-50 text-purple-600"
                  >
                    Chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}