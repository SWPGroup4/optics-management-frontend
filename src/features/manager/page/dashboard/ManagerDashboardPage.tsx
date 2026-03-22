import { KPICard } from '../../components/dashboard/KPICard';
import { RevenueChart } from '../../components/dashboard/RevenueChart';
import { ActivityFeed } from '../../components/dashboard/ActivityFeed';
import { OrdersByType } from '../../components/dashboard/OrdersByType';
import { LowStockAlerts } from '../../components/dashboard/LowStockAlerts';
import { DollarSign, ShoppingCart, RotateCcw, AlertTriangle } from 'lucide-react';

export default function ManagerDashboardPage() {
  return (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Total Revenue"
          value="$284,392"
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          subtitle="vs last month"
        />
        <KPICard
          title="Active Orders"
          value="109"
          change="+8 today"
          trend="up"
          icon={ShoppingCart}
          subtitle="47 stock · 23 pre-order · 31 Rx"
        />
        <KPICard
          title="Returns Pending"
          value="8"
          change="-2"
          trend="down"
          icon={RotateCcw}
          subtitle="Awaiting inspection"
        />
        <KPICard
          title="Low Stock Items"
          value="4"
          change="+1"
          trend="up"
          icon={AlertTriangle}
          subtitle="Needs reordering"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Orders by Type */}
        <div>
          <OrdersByType />
        </div>

        {/* Activity Feed - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        {/* Low Stock Alerts */}
        <div>
          <LowStockAlerts />
        </div>
      </div>
    </>
  );
}
