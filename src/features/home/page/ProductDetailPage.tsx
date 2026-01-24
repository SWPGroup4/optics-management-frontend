import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function ProductDetailPage() {
  // 1. Lấy ID từ URL
  // Lưu ý: productId có thể là undefined nếu URL không khớp, nên ta để fallback là ""
  const { productId } = useParams();
  const safeId = productId || ""; 

  // 2. Cập nhật Breadcrumb động theo ID
  const breadcrumbItems = [
    { label: "Eyewear", link: "/category/eyewear" },
    { label: `L'Artiste Series 01 ${safeId ? `(ID: ${safeId})` : ''}`, link: "" }
  ];

  return (
    <>
      <div className="min-h-screen bg-white pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <Breadcrumb items={breadcrumbItems} />
          
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Cột Trái */}
          <div className="lg:col-span-7">
            {/* 3. Truyền ID xuống Gallery (để load ảnh theo ID) */}
            <ProductGallery productId={safeId} />
          </div>

          {/* Cột Phải */}
          <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-8">
             {/* 3. Truyền ID xuống Info (để load tên, giá) */}
             <ProductInfo productId={safeId} />
             
             {/* 3. Truyền ID xuống Form (để khi Add to Cart biết add sản phẩm nào) */}
             <ProductForm productId={safeId} />
          </div>

        </div>
      </div>
    </div>

    </>
  );
}