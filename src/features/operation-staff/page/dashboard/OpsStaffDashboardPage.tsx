import React from 'react';
import KPISection from '@/features/operation-staff/components/dashboard/KPISection';
import OrdersSection from '@/features/operation-staff/components/dashboard/OrdersSection';

const DashboardPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 h-full">
            <KPISection />
            <OrdersSection />
        </div>
    );
};

export default DashboardPage;