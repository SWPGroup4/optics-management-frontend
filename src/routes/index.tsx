import { createBrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "@/features/auth/page/LoginPage"
import RegisterPage from "@/features/auth/page/RegisterPage"
import { ProfileLayout } from "@/features/profile/layout/ProfileLayout"
import ProfilePage from "@/features/profile/page/ProfilePage"
import ProductDetailPage from "@/features/home/page/ProductDetailPage"
import CheckoutPage from "@/features/checkout/pages/CheckoutPage"
import HomePage from "@/features/home/page/HomePage"
import { MainLayout } from "@/components/layout/MainLayout"
import { PaymentFailurePage } from "@/features/checkout/pages/PaymentFailurePage"
import { SearchResults } from "@/features/home/page/SearchResults"
//import { ProtectedRoute } from "./protected-route" // Giả sử bạn vẫn giữ file này từ bước trước

// Giả lập trang Dashboard cho có chỗ để chuyển hướng

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // ===== PUBLIC / HOME =====
      {
        index: true,
        element: <HomePage />,
      },

      // ===== PRODUCTS =====
      {
        path: "products",
        children: [
          {
            path: ":productId",
            element: <ProductDetailPage />,
          },
        ],
      },

      // ===== CHECKOUT / PAYMENT =====
      {
        path: "checkout",
        children: [
          {
            index: true,
            element: <CheckoutPage />,
          },
          {
            path: "failure",
            element: <PaymentFailurePage />,
          },
        ],
      },
      {
        path: "test-catalog",
        children: [
          {
            index: true,
            element: <SearchResults />,
          },
        ],
      }
    ],
  },

  // ===== AUTH =====
  {
    path: "/auth",
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },

  // ===== USER =====
  {
    path: "/profile",
    element: <ProfileLayout />,
    children: [
      { index: true, element: <ProfilePage /> },
    ],
  },

  // ===== FALLBACK =====
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
