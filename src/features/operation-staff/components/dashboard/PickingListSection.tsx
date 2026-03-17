import React, { useState } from 'react';
import { Package2, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import type { BEOrderItem, BEOrderItemStatus } from '@/features/operation-staff/types/types';
import { useProductionStore } from "@/features/operation-staff/store/productionStore";

interface PickingListSectionProps {
    items: BEOrderItem[];
}

const PickingListSection: React.FC<PickingListSectionProps> = ({ items }) => {
    const { updateItemStatus, loading } = useProductionStore();
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const getStatusText = (status: BEOrderItemStatus) => {
        switch (status) {
            case 'IN_PRODUCTION':
                return 'Đang sản xuất';
            case 'PRODUCED':
                return 'Đã hoàn thành';
            default:
                return "Đang sản xuất";
        }
    };

    const availableStatuses: BEOrderItemStatus[] = ['IN_PRODUCTION', 'PRODUCED'];

    const handleStatusChange = async (orderItemId: string, newStatus: BEOrderItemStatus) => {
        await updateItemStatus(orderItemId, newStatus);
    };

    const toggleExpanded = (orderItemId: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(orderItemId)) {
            newExpanded.delete(orderItemId);
        } else {
            newExpanded.add(orderItemId);
        }
        setExpandedItems(newExpanded);
    };

    const formatCurrency = (amount: number | null | undefined) => {
        if (!amount || amount === 0) {
            return '0 ₫';
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const displayValue = (value: number | null | undefined) => {
        return formatCurrency(value);
    };

    return (
        <section>
            <div className="flex items-center gap-2 mb-4">
                <Package2 className="w-5 h-5 text-slate-400" />
                <h3 className="text-slate-900 dark:text-white text-lg font-bold uppercase tracking-wide">
                    Danh sách hàng
                </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {items?.map((item) => (
                    <div
                        key={item.orderItemId}
                        className="group bg-white dark:bg-[#1a2e22] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        {/* Main item content */}
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-32 h-32 md:h-auto bg-slate-100 relative shrink-0">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuA5DKaYtinaxneCfbfJ4nTl44qyrd1mylVFsGtLRRM2iZl11ABhQaHiQ0dVrMROnfy-4ilYN2hidwHRmIsmcP37qVGUl-cIFDG_wVcS2GoLRBO2ciOPZzRHK9ZFH1aScYnrRGCwA5k2THqi9wmZHWmYyU426Rh6Fsw84P7d5qEDMsxxa2Vpkn6lrJhdbO49B625jTZJrc3e30_8hez6Hb9IZW2j4cDvSncHN-ea-DX79rN-Tub42VjPvO78nvleh4io6lWUg2X4BTU)` }}
                                />
                            </div>

                            <div className="flex-1 p-5 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Tròng kính
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.lensName}</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    Số lượng: {item.quantity}
                                </p>
                            </div>

                            <div className="w-48 p-3 flex items-center relative">
                                <select
                                    value={item.status}
                                    onChange={(e) => handleStatusChange(item.orderItemId, e.target.value as BEOrderItemStatus)}
                                    disabled={loading}
                                    className="w-full px-3 py-2 pr-10 text-sm font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer appearance-none"
                                >
                                    {availableStatuses.map((status) => (
                                        <option key={status} value={status}>
                                            {getStatusText(status)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Expand/Collapse button */}
                        <div className="border-t border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => toggleExpanded(item.orderItemId)}
                                className="w-full px-5 py-3 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <span className="font-medium">Chi tiết giá</span>
                                {expandedItems.has(item.orderItemId) ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        {/* Expanded content */}
                        {expandedItems.has(item.orderItemId) && (
                            <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <DollarSign className="w-4 h-4 text-slate-400" />
                                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                        Chi tiết giá cả
                                    </h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Đơn giá:</span>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                            {displayValue(item.unitPrice)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Giá tròng kính:</span>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                            {displayValue(item.lensPrice)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Tổng giá tròng kính:</span>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                            {displayValue(item.lensPriceTotal)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Tổng giá:</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white text-lg">
                                            {displayValue(item.totalPrice)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PickingListSection;