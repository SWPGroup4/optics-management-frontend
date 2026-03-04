import React, { useState, useMemo } from 'react';
import OrdersToolbar from '@/features/operation-staff/components/dashboard/OrdersToolbar';
import OrdersTable from '@/features/operation-staff/components/dashboard/OrdersTable';
import Pagination from '@/features/operation-staff/components/dashboard/Pagination';
import OrderProcessingDrawer from "@/features/operation-staff/components/dashboard/OrderProcessingDrawer.tsx";
import { mockDashboardOrders } from '@/features/operation-staff/data/mockDashboardOrders.ts';
import type { TabItem, PaginationInfo } from '@/features/operation-staff/types/types';

const ITEMS_PER_PAGE = 10;

const OrdersSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);

    const tabs: TabItem[] = [
        { id: 'all', label: 'Tất cả', isActive: activeTab === 'all' },
        { id: 'waiting_cutting', label: 'Chờ cắt tròng', count: 12, isActive: activeTab === 'waiting_cutting' },
        { id: 'waiting_packaging', label: 'Chờ đóng gói', count: 5, isActive: activeTab === 'waiting_packaging' },
        { id: 'shipping', label: 'Giao hàng', isActive: activeTab === 'shipping' }
    ];

    const filteredOrders = useMemo(() => {
        if (activeTab === 'all') return mockDashboardOrders;
        return mockDashboardOrders.filter(order => order.status === activeTab);
    }, [activeTab]);

    const pagination: PaginationInfo = useMemo(() => {
        const totalItems = filteredOrders.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
        const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

        return {
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage: ITEMS_PER_PAGE,
            startIndex,
            endIndex
        };
    }, [filteredOrders, currentPage]);

    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredOrders, currentPage]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setCurrentPage(1);
    };

    const handleSelectionChange = (orderId: string, selected: boolean) => {
        setSelectedOrders(prev => {
            const newSet = new Set(prev);
            if (selected) {
                newSet.add(orderId);
            } else {
                newSet.delete(orderId);
            }
            return newSet;
        });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilterClick = () => {
        console.log('Filter clicked');
    };

    const handleExportClick = () => {
        console.log('Export clicked');
    };

    return (
        <section className="bg-white dark:bg-[#1a262d] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col">
            <OrdersToolbar
                tabs={tabs}
                onTabChange={handleTabChange}
                onFilterClick={handleFilterClick}
                onExportClick={handleExportClick}
            />

            <OrdersTable
                orders={paginatedOrders}
                selectedOrders={selectedOrders}
                onSelectionChange={handleSelectionChange}
            />

            <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
            />

            <OrderProcessingDrawer />
        </section>
    );
};

export default OrdersSection;