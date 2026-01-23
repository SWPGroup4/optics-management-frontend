import { createBrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "@/features/auth/page/LoginPage"
import { HomePage } from "@/features/home"
import RegisterPage from "@/features/auth/page/RegisterPage"
//import { ProtectedRoute } from "./protected-route" // Giả sử bạn vẫn giữ file này từ bước trước

// Giả lập trang Dashboard cho có chỗ để chuyển hướng

export const router = createBrowserRouter([
  {
    path: "/",
 // Dùng Layout có Header
    children: [
      {
        index: true, // Đây là trang chủ (path="/")
        element: <HomePage />,
      },
      // Sau này thêm các trang khác: /products, /cart...
    ],
  },
  // --- NHÓM 1: PUBLIC ROUTES (Login, Register...) ---
  {
    path: "/auth",
    // Không có path -> Layout này bọc tất cả các route con bên trong
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      }
      // Sau này thêm register thì viết:
      // { path: "/register", element: <RegisterPage /> }
    ],
  },

  // --- NHÓM 2: PROTECTED ROUTES (Phải đăng nhập mới vào) ---
  // {
  //   element: <ProtectedRoute />, // Cái "Cổng bảo vệ" chúng ta đã viết
  //   children: [
  //     {
  //       path: "/",
  //       element: <Dashboard />,
  //     },
  //     // { path: "/products", element: <ProductPage /> }
  //   ],
  // },

  // --- NHÓM 3: CATCH ALL (404) ---
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
])