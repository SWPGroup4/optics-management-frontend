import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderApi, type Order } from "../../api/order-api";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchDetail = async () => {
      const data = await orderApi.getOrderDetail(orderId);
      setOrder(data);
    };

    fetchDetail();
  }, [orderId]);

  if (!order) {
    return <div className="p-6">Đang tải chi tiết đơn...</div>;
  }

  const item = order.items[0];
  const p = item?.prescription;
 console.log("🚀 ~ file: OrderDetailPage.tsx:17 ~ fetchDetail ~ p:", p)
  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:underline"
      >
        ← Quay lại
      </button>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-xl border">
            <h3 className="font-semibold mb-3">Khách hàng</h3>
            <p className="font-medium">{order.phoneNumber}</p>
            <p className="text-sm text-gray-500">{order.deliveryAddress}</p>
          </div>
        </div>

      {/* RIGHT */}
<div className="col-span-8 bg-white p-6 rounded-xl border">
  <h3 className="font-semibold mb-4">Order Items</h3>

  {order.items.map((item) => {
    const p = item.prescription;

    return (
      <div
        key={item.orderItemId}
        className="border rounded-lg p-4 mb-6 space-y-4"
      >
        {/* ITEM INFO */}
        <div>
          <p className="font-medium">
            Variant ID: {item.productVariantId}
          </p>
          <p className="text-sm text-gray-500">
            Quantity: {item.quantity}
          </p>
          <p className="text-sm text-gray-500">
            Unit Price: {item.unitPrice}
          </p>
          <p className="text-sm text-gray-500">
            Total: {item.totalPrice}
          </p>
        </div>

        {/* PRESCRIPTION */}
        {p && (
          <>
            {p.imageUrl && (
              <div>
                <p className="font-medium mb-2">Prescription Image</p>
                <img
                  src={p.imageUrl}
                  alt="Prescription"
                  className="w-full max-w-md rounded-lg border"
                />
              </div>
            )}

            <div>
              <h4 className="font-medium mt-2">Mắt phải (OD)</h4>
              <p>
                SPH: {p.odSphere} | CYL: {p.odCylinder} | AXIS: {p.odAxis}
              </p>

              <h4 className="font-medium mt-2">Mắt trái (OS)</h4>
              <p>
                SPH: {p.osSphere} | CYL: {p.osCylinder} | AXIS: {p.osAxis}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Note: {p.note}
              </p>
            </div>
          </>
        )}
      </div>
    );
  })}

  <div className="flex gap-3 mt-6">
    <button className="flex-1 py-2 border rounded-lg">
      Yêu cầu gửi lại
    </button>

    <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg font-medium">
      Xác nhận & Chuyển vận hành
    </button>
  </div>
</div>
      </div>
    </div>
  );
}