"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  UserCheck,
  Eye,
  Activity,
  DollarSign,
} from "lucide-react";
import { StatCard } from "@/components/core/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency, formatDate } from "@/lib/utils";
import { AdminDashboardStats } from "@/types";
import { analyticsService, emptyAdminStats } from "@/services/analytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminDashboardStats>(emptyAdminStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await analyticsService.getAdminDashboard();
        setStats(data);
      } catch {
        // Use empty stats on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default";
      case "PENDING":
        return "secondary";
      case "FAILED":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Administrateur
        </h1>
        <p className="text-muted-foreground">
          Vue globale de la plateforme en temps réel
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Utilisateurs"
          value={stats.totalUsers}
          description="Tous les utilisateurs"
          icon={Users}
        />
        <StatCard
          title="Organisateurs"
          value={stats.totalOrganizers}
          description="Créateurs d'événements"
          icon={UserCheck}
        />
        <StatCard
          title="Visiteurs"
          value={stats.totalVisitors}
          description="Participants potentiels"
          icon={Eye}
        />
        <StatCard
          title="Événements"
          value={stats.totalEvents}
          description={`${stats.upcomingEvents} à venir`}
          icon={Calendar}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenus Totaux"
          value={formatCurrency(stats.totalRevenue)}
          description="Depuis le début"
          icon={DollarSign}
        />
        <StatCard
          title="Revenus ce mois"
          value={formatCurrency(stats.revenueThisMonth)}
          description="Mois en cours"
          icon={TrendingUp}
        />
        <StatCard
          title="Paiements"
          value={stats.totalPayments}
          description={`${stats.pendingPayments} en attente`}
          icon={CreditCard}
        />
        <StatCard
          title="Événements terminés"
          value={stats.completedEvents}
          description="Événements passés"
          icon={Activity}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenus par mois</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs par rôle</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.usersByRole}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="role"
                  label={({ role, count }) => `${role}: ${count}`}
                >
                  {stats.usersByRole.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Inscriptions récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {stats.recentRegistrations.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune inscription récente
                </p>
              ) : (
                <div className="space-y-4">
                  {stats.recentRegistrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="flex items-start gap-4 rounded-lg border p-3"
                    >
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{registration.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          S'est inscrit à: {registration.eventTitle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(registration.registeredAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Paiements récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {stats.recentPayments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucun paiement récent
                </p>
              ) : (
                <div className="space-y-4">
                  {stats.recentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center gap-4 rounded-lg border p-3"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{payment.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.eventTitle || "Cotisation"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(payment.amount)}
                        </p>
                        <Badge variant={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
