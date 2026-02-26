import React from 'react';
import KPICard from './KPICard';
import { mockKpis } from '@/features/manager/data/mockKpis';

const KPISection: React.FC = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockKpis.map((kpi) => (
                <KPICard key={kpi.id} data={kpi} />
            ))}
        </section>
    );
};

export default KPISection;