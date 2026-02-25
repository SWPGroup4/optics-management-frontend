// src/features/seller/page/order/OrderDetailPage.tsx

import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:underline"
      >
        ← Quay lại danh sách
      </button>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-xl border">
            <h3 className="font-semibold mb-3">Thông tin khách hàng</h3>
            <p className="font-medium">Nguyễn Văn A</p>
            <p className="text-sm text-gray-500">0901234567</p>
            <p className="text-sm text-gray-500">
              123 Lê Lợi, Quận 1, TP.HCM
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <h3 className="font-semibold mb-3">Sản phẩm</h3>
            <p className="font-medium">Ray-Ban Aviator</p>
            <p className="text-sm text-gray-500">Giá: 2.500.000đ</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-8 bg-white p-6 rounded-xl border">
          <h3 className="font-semibold mb-4">Ảnh chụp đơn thuốc</h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="border rounded-lg h-64 flex items-center justify-center text-gray-400">
              Image Preview
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Mắt phải (OD)</h4>
              <div className="flex gap-2">
                <input className="input" placeholder="SPH -2.50" />
                <input className="input" placeholder="CYL -0.50" />
                <input className="input" placeholder="AXIS 180" />
              </div>

              <h4 className="font-medium">Mắt trái (OS)</h4>
              <div className="flex gap-2">
                <input className="input" placeholder="SPH -3.00" />
                <input className="input" placeholder="CYL 0.00" />
                <input className="input" placeholder="AXIS 0" />
              </div>

              <button className="w-full mt-6 py-2 bg-purple-600 text-white rounded-lg font-medium">
                Xác nhận & Chuyển vận hành
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}