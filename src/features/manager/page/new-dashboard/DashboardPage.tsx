import React from 'react';
import KPISection from '@/features/manager/components/new-dashboard/KPISection';
import OrdersSection from '@/features/manager/components/new-dashboard/OrdersSection';

const DashboardPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 h-full">
            <KPISection />
            <OrdersSection />
        </div>
    );
};

export default DashboardPage;