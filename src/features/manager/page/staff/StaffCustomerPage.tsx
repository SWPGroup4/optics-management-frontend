import { useState } from 'react';
import {
    Search, Bell, Settings, Plus,
    Trash2, Star, ChevronDown
} from 'lucide-react';

// ================= TYPES =================
interface Staff {
    id: string;
    name: string;
    email: string;
    role: 'Sales' | 'Operations' | 'Support' | 'Admin';
    status: 'active' | 'inactive';
    performance: string;
    rating: number;
    joinedDate: string;
}

interface Customer {
    id: string;
    name: string;
    email: string;
    orders: number;
    totalSpent: number;
    lastOrder: string;
    // isVip: boolean; -> Đã bỏ dòng này nếu không dùng data nữa
}

// ================= MOCK DATA =================
const STAFF_DATA: Staff[] = [
    { id: '1', name: 'Sarah Mitchell', email: 'sarah.m@optivision.com', role: 'Sales', status: 'active', performance: '234 Rx verified', rating: 4.8, joinedDate: '2023-03-15' },
    { id: '2', name: 'Mike Thompson', email: 'mike.t@optivision.com', role: 'Operations', status: 'active', performance: '567 orders', rating: 4.9, joinedDate: '2023-06-20' },
    { id: '3', name: 'Emily Chen', email: 'emily.c@optivision.com', role: 'Sales', status: 'active', performance: '189 Rx verified', rating: 4.7, joinedDate: '2023-09-01' },
    { id: '4', name: 'James Wilson', email: 'james.w@optivision.com', role: 'Operations', status: 'active', performance: '123 orders', rating: 4.5, joinedDate: '2024-01-10' },
    { id: '5', name: 'Lisa Brown', email: 'lisa.b@optivision.com', role: 'Sales', status: 'inactive', performance: '412 Rx verified', rating: 4.6, joinedDate: '2022-11-05' },
];

const CUSTOMER_DATA: Customer[] = [
    { id: '1', name: 'Robert Anderson', email: 'r.anderson@email.com', orders: 12, totalSpent: 3245, lastOrder: '2024-01-14' },
    { id: '2', name: 'Jennifer Martinez', email: 'j.martinez@email.com', orders: 8, totalSpent: 2890, lastOrder: '2024-01-12' },
    { id: '3', name: 'William Taylor', email: 'w.taylor@email.com', orders: 6, totalSpent: 1876, lastOrder: '2024-01-10' },
    { id: '4', name: 'Amanda Johnson', email: 'a.johnson@email.com', orders: 5, totalSpent: 1654, lastOrder: '2024-01-08' },
    { id: '5', name: 'David Lee', email: 'd.lee@email.com', orders: 4, totalSpent: 1245, lastOrder: '2024-01-05' },
];

// ================= COMPONENT CON: STAFF VIEW =================
const StaffView = () => {
    const [staffList, setStaffList] = useState<Staff[]>(STAFF_DATA);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<string>('All Roles');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter Logic
    const filteredStaff = staffList.filter(staff => {
        const matchSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || staff.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchRole = filterRole === 'All Roles' || staff.role === filterRole;
        return matchSearch && matchRole;
    });

    // Add Logic
    const handleAddStaff = () => {
        const newStaff: Staff = {
            id: Date.now().toString(),
            name: 'New Employee',
            email: 'new.emp@optivision.com',
            role: 'Sales',
            status: 'active',
            performance: '0 orders',
            rating: 5.0,
            joinedDate: new Date().toISOString().split('T')[0]
        };
        setStaffList([newStaff, ...staffList]);
    };

    // Delete Logic
    const handleDelete = (id: string) => {
        if(window.confirm('Remove this staff member?')) {
            setStaffList(staffList.filter(s => s.id !== id));
        }
    };

    return (
        <div className="animate-in fade-in duration-300">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-auto">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search staff..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 w-full sm:w-80"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto relative">
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white"
                        >
                            {filterRole} <ChevronDown className="w-3 h-3 opacity-50" />
                        </button>
                        {isFilterOpen && (
                            <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                                {['All Roles', 'Sales', 'Operations'].map(role => (
                                    <button key={role} onClick={() => { setFilterRole(role); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">{role}</button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={handleAddStaff} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
                        <Plus className="w-4 h-4" /> Add Staff
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold bg-gray-50/50">
                        <th className="px-6 py-4">Staff Member</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Performance</th>
                        <th className="px-6 py-4">Rating</th>
                        <th className="px-6 py-4">Joined</th>
                        <th className="px-6 py-4"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {filteredStaff.map((staff) => (
                        <tr key={staff.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
                                        {staff.name.charAt(0)}{staff.name.split(' ')[1]?.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">{staff.name}</div>
                                        <div className="text-xs text-gray-500">{staff.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-700">
                    {staff.role}
                  </span>
                            </td>
                            <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${staff.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {staff.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{staff.performance}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {staff.rating}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{staff.joinedDate}</td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => handleDelete(staff.id)} className="text-gray-400 hover:text-red-600 p-2 rounded-full hover:bg-gray-100">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ================= COMPONENT CON: CUSTOMER VIEW (Đã bỏ VIP) =================
const CustomerView = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6 pb-2">
                <h3 className="text-lg font-semibold text-gray-900">Top Customers</h3>
                <p className="text-sm text-gray-500">High-value customers and VIP members</p>
            </div>

            <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold bg-gray-50/50">
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Orders</th>
                        <th className="px-6 py-4">Total Spent</th>
                        <th className="px-6 py-4">Last Order</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {CUSTOMER_DATA.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {/* Bỏ logic màu vàng cho VIP, chuyển hết về xám hoặc giữ logic nếu muốn */}
                                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-medium">
                                        {customer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">{customer.name}</div>
                                        <div className="text-xs text-gray-500">{customer.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{customer.orders}</td>
                            <td className="px-6 py-4 text-sm font-bold text-gray-900">${customer.totalSpent.toLocaleString()}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{customer.lastOrder}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ================= PAGE CHÍNH =================
const StaffCustomerPage = () => {
    const [activeTab, setActiveTab] = useState<'staff' | 'customer'>('staff');

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans text-slate-800">
            {/* HEADER PAGE */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Staff & Customers</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage team members and view customer insights
                    </p>
                </div>

                {/* Global Action (Search/Noti) */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search products, orders..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-sm w-64 focus:outline-none" />
                    </div>
                    <button className="relative p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* TAB SWITCHER */}
            <div className="mb-6 flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                    onClick={() => setActiveTab('staff')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === 'staff'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Staff Management
                </button>
                <button
                    onClick={() => setActiveTab('customer')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === 'customer'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Customer Insights
                </button>
            </div>

            {/* CONTENT CARD */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
                {activeTab === 'staff' ? <StaffView /> : <CustomerView />}
            </div>
        </div>
    );
};

export default StaffCustomerPage;