import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../api/api";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-700";
    case "PROCESSING":
      return "bg-blue-100 text-blue-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "AWAITING_VERIFICATION":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function MyOrders() {
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const response = await profileApi.getOrders();
      return response.data.result; // 🔥 QUAN TRỌNG
    },
  });

  if (isLoading) {
    return <div className="p-6">Loading orders...</div>;
  }

  if (isError) {
    return <div className="p-6">Failed to load orders</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="p-6">You have no orders yet.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order: any) => (
        <div
          key={order.orderId}
          className="border rounded-xl p-5 mb-6 shadow-sm bg-white"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-semibold">
                Order ID: {order.orderId.slice(0, 8)}
              </p>

              <p className="text-sm text-gray-500">
                {order.deliveryAddress}
              </p>

              <p className="text-xs text-gray-400">
                {order.phoneNumber}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.orderStatus
              )}`}
            >
              {order.orderStatus}
            </span>
          </div>

          {/* ITEMS */}
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div
                key={item.orderItemId}
                className="border rounded-lg p-4 flex gap-4"
              >
                {/* IMAGE */}
                {item.prescription?.imageUrl ? (
                  <img
                    src={item.prescription.imageUrl}
                    alt="Prescription"
                    className="w-28 h-28 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center bg-gray-100 text-sm text-gray-400 rounded-lg">
                    No Image
                  </div>
                )}

                {/* ITEM INFO */}
                <div className="flex-1">
                  <p className="font-medium">
                    Product Variant: {item.productVariantId.slice(0, 8)}
                  </p>

                  <p className="text-sm text-gray-500">
                    Type: {item.orderItemType}
                  </p>

                  <p className="text-sm">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-sm">
                    Unit Price: {formatPrice(item.unitPrice)}
                  </p>

                  <p className="font-semibold mt-1">
                    Total: {formatPrice(item.totalPrice)}
                  </p>

                  {/* PRESCRIPTION INFO */}
                  {item.prescription && (
                    <div className="mt-2 text-xs text-gray-600">
                      <p>
                        OD: {item.prescription.odSphere} /{" "}
                        {item.prescription.odCylinder} /{" "}
                        {item.prescription.odAxis}
                      </p>

                      <p>
                        OS: {item.prescription.osSphere} /{" "}
                        {item.prescription.osCylinder} /{" "}
                        {item.prescription.osAxis}
                      </p>

                      {item.prescription.note && (
                        <p className="italic">
                          Note: {item.prescription.note}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-4 flex justify-end text-lg font-bold">
            Total: {formatPrice(order.totalAmount)}
          </div>
        </div>
      ))}
    </div>
  );
}