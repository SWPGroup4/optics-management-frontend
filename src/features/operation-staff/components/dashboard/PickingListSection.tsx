import React from 'react';
import { Package2, MapPin } from 'lucide-react';
import type { PickingItem } from '@/features/operation-staff/types/types';

interface PickingListSectionProps {
    items: PickingItem[];
}

const PickingListSection: React.FC<PickingListSectionProps> = ({ items }) => {
    const getLocationIcon = () => {
        return <MapPin className="w-4 h-4" />;
    };

    const getLocationColor = (type: 'shelf' | 'cabinet') => {
        return type === 'shelf'
            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800'
            : 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800';
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
                        key={item.id}
                        className="group flex flex-col md:flex-row bg-white dark:bg-[#1a2e22] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="w-full md:w-32 h-32 md:h-auto bg-slate-100 relative shrink-0">
                            {item.imageUrl && (
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                                />
                            )}
                        </div>

                        <div className="flex-1 p-5 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                  {item.type === 'frame' ? 'Gọng kính' : 'Tròng kính'}
                                </span>
                                <span className={`inline-flex items-center gap-1.5 rounded-full ${getLocationColor(item.locationType)} px-3 py-1 text-sm font-bold border`}>
                                  {getLocationIcon()} {item.location}
                                </span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.name}</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                SKU: {item.sku} | Số lượng: {item.quantity} {item.type === 'lens' ? 'cặp' : ''}
                            </p>
                        </div>

                        <div className="w-2 bg-slate-200 dark:bg-slate-600 group-hover:bg-primary transition-colors"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PickingListSection;