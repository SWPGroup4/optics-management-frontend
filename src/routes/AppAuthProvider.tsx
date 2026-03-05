// src/components/auth/AppAuthProvider.tsx
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const AppAuthProvider = () => {
  const { isAuthenticated, refreshAction } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Chạy ngay lập tức khi app load để kiểm tra token cũ trong storage
    refreshAction();

    // Thiết lập chạy định kỳ mỗi 1 phút
    const interval = setInterval(() => {
      console.log("🔄 [System] Khởi chạy làm mới token định kỳ...");
      refreshAction();
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated, refreshAction]);

  // Trả về Outlet để các route con (MainLayout, ManagerLayout...) hiển thị bên dưới nó
  return <Outlet />;
};