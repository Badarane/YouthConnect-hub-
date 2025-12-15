"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  FileText,
  FolderOpen,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/stores/auth-store";
import { useState, useMemo } from "react";
import { UserRole } from "@/types";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: UserRole[];
}

const allNavigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Gestion Plateforme",
    href: "/admin",
    icon: Shield,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Statistiques",
    href: "/analytics",
    icon: BarChart3,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Membres",
    href: "/members",
    icon: Users,
    roles: ["SUPER_ADMIN", "ADMIN", "ORGANIZER"],
  },
  { name: "Événements", href: "/events", icon: Calendar },
  {
    name: "Cotisations",
    href: "/cotisations",
    icon: CreditCard,
    roles: ["SUPER_ADMIN", "ADMIN", "ORGANIZER", "MEMBER"],
  },
  {
    name: "Blog",
    href: "/blog",
    icon: FileText,
  },
  {
    name: "Ressources",
    href: "/resources",
    icon: FolderOpen,
  },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const navigation = useMemo(() => {
    if (!user) return [];

    return allNavigation.filter((item) => {
      if (!item.roles) return true;
      return item.roles.includes(user.role);
    });
  }, [user]);

  const getRoleBadge = (role?: UserRole) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "Super Admin";
      case "ADMIN":
        return "Admin";
      case "ORGANIZER":
        return "Organisateur";
      case "MEMBER":
        return "Membre";
      case "VISITOR":
        return "Visiteur";
      default:
        return "Utilisateur";
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  Y
                </span>
              </div>
              <span className="text-lg font-semibold">YouthConnect</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(collapsed && "mx-auto")}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="border-t p-4">
          {!collapsed && user && (
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                <span className="text-sm font-medium">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {getRoleBadge(user.role)}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-3", collapsed && "px-3")}
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Déconnexion</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
