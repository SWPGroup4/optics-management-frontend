import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { MoreHorizontal, Trash2, Eye } from "lucide-react";

/* ===== TYPES ===== */
type ProductStatus = "ACTIVE" | "INACTIVE";
type ProductCategory = "FRAME" | "LENS" | "CONTACT";

interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
}

/* ===== COMPONENT ===== */
export default function ProductManagePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  /* ===== FETCH PRODUCTS ===== */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      console.log("Fetched products:", res);
      setProducts(res.result); 
    } catch (error) {
      console.error("Fetch products failed", error);
    } finally {
      setLoading(false);
    }
  };

  /* ===== DELETE ===== */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ===== UI ===== */
  return (
    <div className="p-6 bg-white rounded-xl border">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
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
                      onClick={() => handleDelete(p.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
