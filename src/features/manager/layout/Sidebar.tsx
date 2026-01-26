import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tag,
    // Settings,
    Glasses,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/manager", icon: LayoutDashboard },
    { name: "Products", href: "/manager/products", icon: Package },
    { name: "Orders", href: "/manager/orders", icon: ShoppingCart },
    { name: "Pricing", href: "/manager/pricing", icon: Tag },
    { name: "Staff", href: "/manager/staff", icon: Users },
    // { name: "Settings", href: "/manager/settings", icon: Settings },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50 flex flex-col",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <Glasses className="w-6 h-6 text-sidebar-primary" />
                        <span className="font-semibold text-sidebar-primary tracking-tight">
              OptiVision
            </span>
                    </div>
                )}
                {collapsed && <Glasses className="w-6 h-6 text-sidebar-primary mx-auto" />}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn(
                        "p-1.5 rounded-lg text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                        collapsed && "mx-auto"
                    )}
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <ChevronLeft className="w-4 h-4" />
                    )}
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
                                "nav-item",
                                isActive && "nav-item-active",
                                collapsed && "justify-center px-2"
                            )}
                            title={collapsed ? item.name : undefined}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && <span>{item.name}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="p-3 border-t border-sidebar-border">
                <div
                    className={cn(
                        "flex items-center gap-3",
                        collapsed && "justify-center"
                    )}
                >
                    <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground font-medium text-sm">
                        JD
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-sidebar-foreground truncate">
                                John Doe
                            </p>
                            <p className="text-xs text-sidebar-muted truncate">
                                Store Manager
                            </p>
                        </div>
                    )}
                    {!collapsed && (
                        <button className="p-1.5 rounded-lg text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}