import React from 'react';
import { Package2, ChevronDown } from 'lucide-react';
import type { BEOrderItem, BEOrderItemStatus } from '@/features/operation-staff/types/types';
import { useProductionStore } from "@/features/operation-staff/store/productionStore";

interface PickingListSectionProps {
    items: BEOrderItem[];
}

const PickingListSection: React.FC<PickingListSectionProps> = ({ items }) => {
    const { updateItemStatus, loading } = useProductionStore();

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
                        className="group flex flex-col md:flex-row bg-white dark:bg-[#1a2e22] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
                    >
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
                ))}
            </div>
        </section>
    );
};

export default PickingListSection;