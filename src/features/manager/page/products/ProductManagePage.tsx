import { useEffect } from "react";
import { Trash2, Eye } from "lucide-react"; // Đã bỏ MoreHorizontal thừa
import { useProductStore } from "../../stores/useProductStore";

export default function ProductManagePage() {
  // Lấy state và actions từ Store
  const { products, isLoading, error, fetchProducts, deleteProduct } = useProductStore();

  // Gọi API khi component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Hàm xử lý sự kiện xóa
  const handleDeleteClick = async (id: string) => {
    if (confirm("Delete this product?")) {
      await deleteProduct(id);
    }
  };

  /* ===== UI ===== */
  return (
    <div className="p-6 bg-white rounded-xl border">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">
          Error: {error}
        </div>
      )}

      {isLoading ? (
        <div className="py-8 text-center text-gray-500">
            Loading products...
        </div>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-3">ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-mono">{p.id}</td>
                <td className="font-medium">{p.name}</td>
                <td>
                  <span className="px-2 py-1 rounded bg-gray-100 text-xs">
                    {p.category}
                  </span>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      p.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="text-right">
                  <div className="inline-flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(p.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!isLoading && products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}