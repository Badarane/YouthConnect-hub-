"use client";

import { useAuthStore } from "@/stores/auth-store";
import {
  AdminDashboard,
  OrganizerDashboard,
  VisitorDashboard,
} from "@/components/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  switch (user.role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return <AdminDashboard />;
    case "ORGANIZER":
      return <OrganizerDashboard />;
    case "MEMBER":
    case "VISITOR":
    default:
      return <VisitorDashboard />;
  }
}
