import { Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";

export function Header() {
    return (
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="h-full flex items-center justify-between px-6">
                {/* Actions */}
                <div className="flex items-center w-full justify-between">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Nhập mã đơn (#ORD), SĐT khách..."
                            className="w-128 pl-9 bg-background"
                        />
                    </div>

                    <div>
                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-5 h-5" />
                            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-2xs bg-destructive">
                                3
                            </Badge>
                        </Button>

                        {/* Settings */}
                        <Button variant="ghost" size="icon">
                            <Settings className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}