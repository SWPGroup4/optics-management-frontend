import React, { useState, useEffect } from 'react';
import { Package, Truck } from 'lucide-react';
import Pagination from '@/features/operation-staff/components/dashboard/Pagination';
import type { PaginationInfo } from '@/features/shipper/types';
import { useShipperStore } from "@/features/shipper/store/shipperStore.ts";
import ShipperOrderTable from "@/features/shipper/components/dashboard/ShipperOrderTable";

const ITEMS_PER_PAGE = 10;

const ShipperDashboardPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const readyToShipOrders = useShipperStore(state => state.readyToShipOrders);
    const loading = useShipperStore(state => state.loading);
    const error = useShipperStore(state => state.error);
    const fetchReadyToShipOrders = useShipperStore(state => state.fetchReadyToShipOrders);
    const startDelivery = useShipperStore(state => state.startDelivery);
    const clearError = useShipperStore(state => state.clearError);

    useEffect(() => {
        fetchReadyToShipOrders();
    }, [fetchReadyToShipOrders]);

    const pagination: PaginationInfo = {
        currentPage,
        totalPages: Math.ceil((readyToShipOrders?.length || 0) / ITEMS_PER_PAGE),
        totalItems: readyToShipOrders?.length || 0,
        itemsPerPage: ITEMS_PER_PAGE,
        startIndex: (currentPage - 1) * ITEMS_PER_PAGE + 1,
        endIndex: Math.min(currentPage * ITEMS_PER_PAGE, readyToShipOrders?.length || 0)
    };

    const paginatedOrders = readyToShipOrders?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    ) || [];

    const handleStartDelivery = async (orderId: string) => {
        // Get shipperId from auth store or context
        // This would need to be adapted based on your auth implementation
        const shipperId = 'current-shipper-id'; // Replace with actual shipper ID from auth

        try {
            await startDelivery(orderId, shipperId);
        } catch (error) {
            console.error('Failed to start delivery:', error);
        }
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <Truck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Bảng điều khiển Vận chuyển
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Quản lý các đơn hàng sẵn sàng để vận chuyển
                        </p>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-red-700 dark:text-red-300">{error}</span>
                        <button
                            onClick={clearError}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {/* Orders Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Danh sách đơn hàng sẵn sàng giao ({readyToShipOrders?.length || 0})
                    </h2>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-slate-500">Đang tải...</div>
                    </div>
                ) : paginatedOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Package className="w-12 h-12 text-slate-400 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                            Không có đơn hàng nào
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            Hiện tại không có đơn hàng nào sẵn sàng để vận chuyển.
                        </p>
                    </div>
                ) : (
                    <ShipperOrderTable
                        orders={paginatedOrders}
                        onStartDelivery={handleStartDelivery}
                        loading={loading}
                    />
                )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <Pagination pagination={pagination} onPageChange={setCurrentPage} />
            )}
        </div>
    );
};

export default ShipperDashboardPage;