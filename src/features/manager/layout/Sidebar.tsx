import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Glasses,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/features/manager/hooks/useSidebar.ts';
import Logo from '@/components/common/Logo';

// Import store lấy user và hàm logout của bạn
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const navigation = [
  { name: 'Bảng điều khiển', href: '/manager', icon: LayoutDashboard },
  { name: 'Sản phẩm', href: '/manager/products', icon: Package },
  { name: 'Đơn hàng', href: '/manager/orders', icon: ShoppingCart },
  { name: 'Nhân viên', href: '/manager/staff', icon: Users },
  { name: 'Tròng kính', href: '/manager/lenses', icon: Glasses },
  { name: 'Hoàn tiền', href: '/manager/refunds', icon: Tag },
];

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy data thật từ store
  const { user, logout } = useAuthStore();

  // Hàm xử lý đăng xuất giống hệt WorkspaceUserMenu
  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  // Hàm tạo avatar chữ (Lấy từ user.name)
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50 flex flex-col',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* Logo */}
      <div className="h-16 md:h-20 flex items-center justify-between px-4 border-sidebar-border">
        {!collapsed && <Logo />}
        <button
          onClick={toggleCollapsed}
          className={cn(
            'p-1.5 rounded-lg text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors',
            collapsed && 'mx-auto',
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'nav-item',
                isActive && 'nav-item-active',
                collapsed && 'justify-center px-2',
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section (Đã gắn API/Data động từ useAuthStore) */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          {/* Avatar Initials */}
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground font-medium text-sm shrink-0 uppercase">
            {getInitials(user?.name)}
          </div>
          
          {/* Tên & Role */}
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name || 'Nhân viên'}
              </p>
              <p className="text-xs text-sidebar-muted truncate uppercase">
                {user?.role || 'STAFF'}
              </p>
            </div>
          )}
          
          {/* Nút Đăng xuất */}
          {!collapsed && (
            <button 
              onClick={handleLogout}
              title="Đăng xuất"
              className="p-1.5 rounded-lg text-sidebar-muted hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}