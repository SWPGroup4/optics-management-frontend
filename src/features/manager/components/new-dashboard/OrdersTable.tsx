import React from 'react';
import OrderRow from './OrderRow';
import type { Order } from '@/features/manager/types/dashboard';

interface OrdersTableProps {
    orders: Order[];
    selectedOrders: Set<string>;
    onSelectionChange: (orderId: string, selected: boolean) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, selectedOrders, onSelectionChange }) => {
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        orders.forEach(order => {
            onSelectionChange(order.id, checked);
        });
    };

    const isAllSelected = orders.length > 0 && orders.every(order => selectedOrders.has(order.id));
    const isIndeterminate = selectedOrders.size > 0 && selectedOrders.size < orders.length;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 w-12">
                        <input
                            checked={isAllSelected}
                            ref={(el) => {
                                if (el) el.indeterminate = isIndeterminate;
                            }}
                            onChange={handleSelectAll}
                            className="rounded border-slate-300 text-primary focus:ring-primary/20 bg-white dark:bg-slate-700 dark:border-slate-600"
                            type="checkbox"
                        />
                    </th>
                    <th className="px-6 py-4">Mã đơn hàng</th>
                    <th className="px-6 py-4">SLA (Thời hạn)</th>
                    <th className="px-6 py-4 w-1/3">Sản phẩm / Loại tròng</th>
                    <th className="px-6 py-4">Thanh toán</th>
                    <th className="px-6 py-4 text-right">Hành động</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {orders.map((order) => (
                    <OrderRow
                        key={order.id}
                        order={order}
                        isSelected={selectedOrders.has(order.id)}
                        onSelectionChange={onSelectionChange}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;