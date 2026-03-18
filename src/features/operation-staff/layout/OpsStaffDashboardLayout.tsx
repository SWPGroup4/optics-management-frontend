import { Sidebar } from '@/features/operation-staff/layout/Sidebar';
import { Header } from '@/features/operation-staff/layout/Header';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/features/operation-staff/layout/SidebarContext';
import { useSidebar } from '@/features/operation-staff/hooks/useSidebar';

function DashboardContent() {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn('transition-all duration-300', collapsed ? 'pl-16' : 'pl-64')}>
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function OpsStaffDashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}
