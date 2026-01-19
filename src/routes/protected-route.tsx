import { Navigate, Outlet, useLocation } from "react-router-dom"

export const ProtectedRoute = () => {
  // Thực tế: Lấy token từ localStorage hoặc Zustand Store
  const isAuthenticated = !!localStorage.getItem("accessToken")
  const location = useLocation()

  if (!isAuthenticated) {
    // Đá về login, nhưng nhớ lưu lại trang họ định vào (state: from)
    // để login xong redirect lại đúng chỗ đó cho trải nghiệm tốt.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}