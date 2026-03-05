import { createBrowserRouter, Navigate } from "react-router-dom"

import LoginPage from "@/features/auth/page/LoginPage"
import RegisterPage from "@/features/auth/page/RegisterPage"

import { ProfileLayout } from "@/features/profile/layout/ProfileLayout"
import ProfilePage from "@/features/profile/page/ProfilePage"

import ProductDetailPage from "@/features/home/page/ProductDetailPage"
import HomePage from "@/features/home/page/HomePage"
import { SearchResults } from "@/features/home/page/SearchResults"

import CheckoutPage from "@/features/checkout/pages/CheckoutPage"
import { PaymentFailurePage } from "@/features/checkout/pages/PaymentFailurePage"
import { PaymentSuccessPage } from "@/features/checkout/pages/PaymentSuccessPage"

import { MainLayout } from "@/components/layout/MainLayout"

import { ManagerDashboardLayout } from "@/features/manager/layout/ManagerDashboardLayout"
import ManagerDashboardPage from "@/features/manager/page/dashboard/ManagerDashboardPage";
import ManagerOrderPage from "@/features/manager/page/orders/ManagerOrderPage"
import ManagerPricingPage from "@/features/manager/page/pricing/ManagerPricingPage"
import ProductManagePage from "@/features/manager/page/products/ProductManagePage"
import ProductVariantManagePage from "@/features/manager/page/products/ProductVariantManageage"
import StaffCustomerPage from "@/features/manager/page/staff/StaffCustomerPage"
import ManageCustomerPage from "@/features/manager/page/Customer/ManagerCustomerPage"

import SellerLayout from "@/features/seller/layout/SellerLayout"
import OrderPage from "@/features/seller/page/order/OrderPage"
import OrderDetailPage from "@/features/seller/page/order/OrderDetailPage"
import { OpsStaffDashboardLayout } from "@/features/operation-staff/layout/OpsStaffDashboardLayout";
import OpsStaffDashboardPage from "@/features/operation-staff/page/dashboard/OpsStaffDashboardPage";


export const router = createBrowserRouter([
  {

    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "shop", element: <SearchResults /> },

          {
            path: "products",
            children: [
              { path: ":productId", element: <ProductDetailPage /> },
            ],
          },

          {
            path: "checkout",
            children: [
              { index: true, element: <CheckoutPage /> },
              { path: "failure", element: <PaymentFailurePage /> },
              { path: "success", element: <PaymentSuccessPage /> },
            ],
          },
        ],
      },

      {
        path: "auth",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },

      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <ProfilePage /> },
        ],
      },

      {
        path: "manager",
        element: <ManagerDashboardLayout />,
        children: [
          { index: true, element: <ManagerDashboardPage /> },
          { path: "orders", element: <ManagerOrderPage /> },
          { path: "pricing", element: <ManagerPricingPage /> },
          { path: "products", element: <ProductManagePage /> },
          { path: "customers", element: <ManageCustomerPage /> },
          { path: "products/:productId/variants", element: <ProductVariantManagePage /> },
          { path: "staff", element: <StaffCustomerPage /> },
        ],
      },

      {
        path: "seller",
        element: <SellerLayout />,
        children: [
          { index: true, element: <OrderPage /> },
          { path: "orders/:orderId", element: <OrderDetailPage /> },
        ],
      },
    ],
  },

  // ===== Operation Staff =====
  {
    path: "ops-staff",
    element: <OpsStaffDashboardLayout />,
    children: [
      { index: true, element: <OpsStaffDashboardPage /> },
    ],
  },

  // ===== FALLBACK =====
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])