import { Sidebar } from '@/features/manager/layout/Sidebar';
import Header from '@/components/layout/header';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/features/manager/layout/SidebarContext';
import { useSidebar } from '@/features/manager/hooks/useSidebar';

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

export function ManagerDashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}
