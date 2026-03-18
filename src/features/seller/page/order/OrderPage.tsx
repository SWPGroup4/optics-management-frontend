import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderApi, type Order } from '@/features/seller/api/order-api';

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderApi.getAwaitingVerificationOrders();
        setOrders(data);
      } catch (error) {
        console.error('Lỗi tải đơn hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6">Đang tải đơn hàng...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Đơn chờ xác minh</h1>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">MÃ ĐƠN</th>
              <th className="px-4 py-3 text-left">SĐT</th>
              <th className="px-4 py-3 text-left">TỔNG TIỀN</th>
              <th className="px-4 py-3 text-left">TRẠNG THÁI</th>
              <th className="px-4 py-3 text-right">HÀNH ĐỘNG</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{order.orderId}</td>

                <td className="px-4 py-3">{order.phoneNumber}</td>

                <td className="px-4 py-3 font-medium">{order.totalAmount.toLocaleString()}đ</td>

                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
                    {order.orderStatus}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => navigate(`/seller/orders/${order.orderId}`)}
                    className="px-3 py-1 border rounded-full text-xs hover:bg-gray-100"
                  >
                    Xử lý
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-6 text-center text-gray-500">Không có đơn nào chờ xác minh</div>
        )}
      </div>
    </div>
  );
}
