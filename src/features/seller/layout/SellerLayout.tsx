import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function SellerLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}