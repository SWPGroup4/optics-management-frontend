import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:text-purple-600"
      >
        ← Quay lại danh sách
      </button>

      <h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>

      <div className="bg-white border rounded-xl p-6 space-y-4">
        <div>
          <span className="text-gray-500 text-sm">Mã đơn</span>
          <div className="font-medium">#{id}</div>
        </div>

        <div>
          <span className="text-gray-500 text-sm">Khách hàng</span>
          <div className="font-medium">Nguyễn Văn A</div>
        </div>

        <div>
          <span className="text-gray-500 text-sm">Số điện thoại</span>
          <div className="font-medium">0901234567</div>
        </div>

        <div>
          <span className="text-gray-500 text-sm">Trạng thái</span>
          <div className="font-medium text-orange-600">Chờ xử lý</div>
        </div>
      </div>
    </div>
  );
}