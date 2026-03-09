// src/features/users/pages/StaffCustomerPage.tsx
import { useState } from 'react';
import { Search, Plus, Trash2, User as UserIcon, Loader2 } from 'lucide-react';
import { useDeleteUser, useUsers } from '../../hooks/useUsers';


const StaffView = () => {
    const { data: staffList = [], isLoading } = useUsers('SALE');
    const deleteMutation = useDeleteUser('SALE');

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this staff?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Staff Member</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Email</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {staffList.map((staff: any) => (
                        <tr key={staff.id} className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 font-medium text-slate-900">{staff.username}</td>
                            <td className="px-6 py-4 text-slate-600">{staff.email || 'N/A'}</td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={() => handleDelete(staff.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const CustomerView = () => {
    const { data: customerList = [], isLoading } = useUsers('CUSTOMER');

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Customer Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Email</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {customerList.map((customer: any) => (
                        <tr key={customer.id}>
                            <td className="px-6 py-4 font-medium text-slate-900">{customer.username}</td>
                            <td className="px-6 py-4 text-slate-600">{customer.email || 'N/A'}</td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">Customer</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const StaffCustomerPage = () => {
    const [activeTab, setActiveTab] = useState<'staff' | 'customer'>('staff');

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
                    <p className="text-slate-500 mt-1">Manage your team and view customer insights</p>
                </div>
                
                {/* Chỉ hiện nút Add khi ở tab Staff */}
                {activeTab === 'staff' && (
                    <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                        <Plus className="w-4 h-4" />
                        Add New Staff
                    </button>
                )}
            </div>

            <div className="mb-6 flex gap-1 bg-slate-200/50 p-1 rounded-xl w-fit">
                <button 
                    onClick={() => setActiveTab('staff')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'staff' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                >
                    Staff Members
                </button>
                <button 
                    onClick={() => setActiveTab('customer')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'customer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                >
                    Customers
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {activeTab === 'staff' ? <StaffView /> : <CustomerView />}
            </div>
        </div>
    );
};

export default StaffCustomerPage;