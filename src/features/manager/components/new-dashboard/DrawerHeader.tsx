import React from 'react';
import { Glasses, X } from 'lucide-react';
import type { OrderDetail } from '@/features/manager/types/dashboard';

interface DrawerHeaderProps {
    order: OrderDetail;
    onClose: () => void;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ order, onClose }) => {
    const isUrgent = order.slaHours <= 2;

    return (
        <header className="flex-none bg-white dark:bg-[#1a2e22] border-b border-slate-200 dark:border-slate-700 z-30">
            {/* Order ID & Close Button Row */}
            <div className="flex items-center justify-between px-8 py-5">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/20 text-green-700 dark:text-primary rounded-full flex items-center justify-center">
                        <Glasses className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                            {order.orderCode} <span className="text-slate-400 font-light mx-2">|</span> {order.customerName}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">Tiếp nhận: {order.receivedTime}</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500 hover:text-slate-800"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Urgent SLA Banner */}
            {isUrgent && (
                <div className="bg-red-50 dark:bg-red-900/30 border-y border-red-100 dark:border-red-900/50 px-8 py-3 flex items-center gap-3 animate-pulse">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
                    <p className="text-red-700 dark:text-red-300 font-bold uppercase tracking-wider text-sm md:text-base">
                        SLA: CẦN XONG TRONG {order.sla.toUpperCase()}
                    </p>
                </div>
            )}
        </header>
    );
};

export default DrawerHeader;