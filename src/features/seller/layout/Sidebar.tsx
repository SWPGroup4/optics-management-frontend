import { NavLink } from "react-router-dom";
import { ClipboardList } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-bold mb-6">Seller</h2>

      <NavLink
        to="/seller"
        end
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg text-sm
          ${isActive ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
        }
      >
        <ClipboardList className="w-4 h-4" />
        Quản lý đơn hàng
      </NavLink>
    </aside>
  );
}