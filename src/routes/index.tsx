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
// import ManagerDashboardPage from "@/features/manager/page/dashboard/ManagerDashboardPage";
import { ManagerDashboardLayout } from "@/features/manager/layout/ManagerDashboardLayout";
import ManagerOrderPage from "@/features/manager/page/orders/ManagerOrderPage";
import ManagerPricingPage from "@/features/manager/page/pricing/ManagerPricingPage";
import ProductManagePage from "@/features/manager/page/products/ProductManagePage.tsx";
import StaffCustomerPage from "@/features/manager/page/staff/StaffCustomerPage";
import { PaymentSuccessPage } from "@/features/checkout/pages/PaymentSuccessPage"
import ProductVariantManagePage from "@/features/manager/page/products/ProductVariantManageage"
import ManageCustomerPage from "@/features/manager/page/Customer/ManagerCustomerPage"
import DashboardPage from "@/features/manager/page/new-dashboard/DashboardPage.tsx";

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
      {
        path: "shop", 
        element: <SearchResults />,
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
          {
            path: "success", 
            element: <PaymentSuccessPage />,
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

  // ===== MANAGER =====
  {
    path: "/manager",
    element: <ManagerDashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "orders", element: <ManagerOrderPage /> },
      { path: "pricing", element: <ManagerPricingPage /> },
      { path: "products", element: <ProductManagePage /> },
       { path: "customers", element: <ManageCustomerPage /> },
      { 
        // :productId là tham số động để trang Variant lấy được ID
        path: "products/:productId/variants", 
        element: <ProductVariantManagePage /> 
      },
      { path: "staff", element: <StaffCustomerPage /> },
    ],
  },


  // ===== FALLBACK =====
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
