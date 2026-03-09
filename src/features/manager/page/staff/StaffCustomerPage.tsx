// src/features/users/pages/StaffCustomerPage.tsx
import { useState } from 'react';
import { Trash2, Loader2, ShieldCheck, X } from 'lucide-react';
import { useDeleteUser, useUsers, useAssignRole } from '../../hooks/useUsers';

type StaffRole = 'SALE' | 'OPERATION' | 'SHIPPER';

const STAFF_ROLES: { key: StaffRole; label: string; color: string }[] = [
    { key: 'SALE', label: 'Sale', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
    { key: 'OPERATION', label: 'Operation', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
    { key: 'SHIPPER', label: 'Shipper', color: 'bg-green-50 text-green-600 hover:bg-green-100' },
];

const StaffView = () => {
    const [activeRole, setActiveRole] = useState<StaffRole>('SALE');
    const { data: staffList = [], isLoading } = useUsers(activeRole);
    const deleteMutation = useDeleteUser(activeRole);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this staff?")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div>
            {/* Sub-tabs */}
            <div className="flex gap-1 px-6 pt-4 border-b border-slate-100">
                {STAFF_ROLES.map((role) => (
                    <button
                        key={role.key}
                        onClick={() => setActiveRole(role.key)}
                        className={`px-5 py-2 text-sm font-semibold rounded-t-lg transition-all border-b-2 -mb-px ${
                            activeRole === role.key
                                ? 'border-slate-900 text-slate-900 bg-white'
                                : 'border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        {role.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="flex justify-center p-20">
                    <Loader2 className="animate-spin" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Staff Member</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {staffList.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                        Không có nhân viên nào
                                    </td>
                                </tr>
                            ) : (
                                staffList.map((staff: any) => (
                                    <tr key={staff.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{staff.username}</td>
                                        <td className="px-6 py-4 text-slate-600">{staff.email || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                activeRole === 'SALE'
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : activeRole === 'OPERATION'
                                                    ? 'bg-purple-50 text-purple-600'
                                                    : 'bg-green-50 text-green-600'
                                            }`}>
                                                {activeRole}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(staff.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// Modal chọn role
const AssignRoleModal = ({
    customer,
    onClose,
}: {
    customer: any;
    onClose: () => void;
}) => {
    const assignMutation = useAssignRole();

    const handleAssign = (role: StaffRole) => {
        assignMutation.mutate(
            { userId: customer.id, newRole: role },
            { onSuccess: onClose }
        );
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Nâng quyền</h3>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Chọn role cho <span className="font-semibold text-slate-700">{customer.username}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <X className="w-4 h-4 text-slate-500" />
                    </button>
                </div>

                <div className="space-y-2">
                    {STAFF_ROLES.map((role) => (
                        <button
                            key={role.key}
                            onClick={() => handleAssign(role.key)}
                            disabled={assignMutation.isPending}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 ${role.color}`}
                        >
                            <span>{role.label}</span>
                            {assignMutation.isPending && assignMutation.variables?.newRole === role.key
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <ShieldCheck className="w-4 h-4" />
                            }
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                    Huỷ
                </button>
            </div>
        </div>
    );
};

const CustomerView = () => {
    const { data: customerList = [], isLoading } = useUsers('CUSTOMER');
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <>
            {selectedCustomer && (
                <AssignRoleModal
                    customer={selectedCustomer}
                    onClose={() => setSelectedCustomer(null)}
                />
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Customer Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Email</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {customerList.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                    Không có khách hàng nào
                                </td>
                            </tr>
                        ) : (
                            customerList.map((customer: any) => (
                                <tr key={customer.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-medium text-slate-900">{customer.username}</td>
                                    <td className="px-6 py-4 text-slate-600">{customer.email || 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">Customer</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedCustomer(customer)}
                                            className="flex items-center gap-1.5 ml-auto px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            Nâng quyền
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
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
            </div>

            {/* Main tabs */}
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