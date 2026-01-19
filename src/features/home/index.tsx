// src/features/storefront/pages/HomePage.tsx
import { Button } from "@/components/ui/button";

export const HomePage = () => {
  return (
    <div className="space-y-10 pb-10">
      
      {/* Hero Section (Banner) */}
      <section className="relative bg-zinc-900 text-white py-20 px-4 md:px-10 rounded-b-3xl">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Summer Collection 2024
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the latest trends in fashion with our exclusive summer collection.
          </p>
          <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-100">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products (Ví dụ) */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Sau này map data sản phẩm ở đây */}
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
      </section>

    </div>
  );
};