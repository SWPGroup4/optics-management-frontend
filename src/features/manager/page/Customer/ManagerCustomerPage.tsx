import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axios";
import {
  Search,
  Bell,
  Settings,
  MoreHorizontal,
  Eye,
  Trash2,
} from "lucide-react";

type User = {
  id: string;
  username: string;
  dob: string; // "2026-01-29"
  email: string;
  phone: string;
};

type ApiResponse<T> = {
  code: number;
  message: string;
  result: T;
};

const ManageCustomerPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  // GET /users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      // axios.ts của bạn đang return response.data luôn => data chính là {code,message,result}
      const data = await api.get<ApiResponse<User[]>>("/users");
      setUsers(data.data.result || []);
    } catch (error) {
      console.error("Fetch users failed:", error);
      alert("Failed to load users");
    } finally {     
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchTerm.toLowerCase().trim();
      if (!q) return true;

      return (
        u.username?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q)
      );
    });
  }, [users, searchTerm]);

  const formatDob = (dob: string) => {
    if (!dob) return "-";
    // nếu dob là ISO date => show yyyy-mm-dd
    return dob.slice(0, 10);
  };

  const handleView = (user: User) => {
    alert(
      `User:\n${user.username}\nDOB: ${formatDob(user.dob)}\nEmail: ${user.email}\nPhone: ${user.phone}`
    );
    setOpenActionId(null);
  };

  const handleDelete = (user: User) => {
    // nếu backend bạn có DELETE /users/{id} thì mình có thể nối tiếp
    if (window.confirm(`Delete user "${user.username}" ?`)) {
      alert("Currently only UI demo. Provide DELETE endpoint to connect.");
      setOpenActionId(null);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 p-6 font-sans text-slate-800"
      onClick={() => {
        if (openActionId) setOpenActionId(null);
      }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage customers and view customer insights
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none w-64"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 bg-white border border-gray-200 rounded-lg">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible pb-12">
        {/* TOOLBAR */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by username, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 w-full sm:w-96"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors active:scale-95"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto min-h-[420px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider bg-gray-50/50">
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">DOB</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900 text-sm">
                        {user.username}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDob(user.dob)}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.phone}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-right relative">
                      <div onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() =>
                            setOpenActionId(openActionId === user.id ? null : user.id)
                          }
                          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                            openActionId === user.id
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>

                        {openActionId === user.id && (
                          <div className="absolute right-8 top-8 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 text-left">
                            <button
                              onClick={() => handleView(user)}
                              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4 text-gray-400" /> View Details
                            </button>

                            <div className="border-t border-gray-100 my-1"></div>

                            <button
                              onClick={() => handleDelete(user)}
                              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-8 h-8 mb-2 opacity-20" />
                      <p>No users found matching "{searchTerm}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <span>Showing {filteredUsers.length} entries</span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCustomerPage;
