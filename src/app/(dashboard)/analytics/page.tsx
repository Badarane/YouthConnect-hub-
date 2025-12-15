"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/core/stat-card";
import { formatCurrency } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import api from "@/lib/api";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

interface AnalyticsData {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  totalEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  totalRevenue: number;
  revenueThisMonth: number;
  membersByRole: { role: string; count: number }[];
  eventsByStatus: { status: string; count: number }[];
  revenueByMonth: { month: string; amount: number }[];
  monthlyPerformance: { monthName: string; newMembers: number; newEvents: number; revenue: number }[];
}

const emptyData: AnalyticsData = {
  totalMembers: 0,
  activeMembers: 0,
  newMembersThisMonth: 0,
  totalEvents: 0,
  upcomingEvents: 0,
  completedEvents: 0,
  totalRevenue: 0,
  revenueThisMonth: 0,
  membersByRole: [],
  eventsByStatus: [],
  revenueByMonth: [],
  monthlyPerformance: [],
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>(emptyData);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user && !["SUPER_ADMIN", "ADMIN"].includes(user.role)) {
      router.push("/dashboard");
      return;
    }

    const fetchData = async () => {
      if (USE_MOCK_API) {
        setIsLoading(false);
        return;
      }
      
      try {
        const [dashboardRes, membersRes, eventsRes, paymentsRes, monthlyRes] = await Promise.all([
          api.get("/analytics/dashboard").catch(() => ({ data: {} })),
          api.get("/analytics/members").catch(() => ({ data: { byRole: [] } })),
          api.get("/analytics/events").catch(() => ({ data: { byStatus: [] } })),
          api.get("/analytics/payments").catch(() => ({ data: { byMonth: [] } })),
          api.get(`/analytics/monthly/${new Date().getFullYear()}`).catch(() => ({ data: { data: [] } })),
        ]);

        setData({
          totalMembers: dashboardRes.data.totalMembers || 0,
          activeMembers: dashboardRes.data.activeMembers || 0,
          newMembersThisMonth: dashboardRes.data.newMembersThisMonth || 0,
          totalEvents: dashboardRes.data.totalEvents || 0,
          upcomingEvents: dashboardRes.data.upcomingEvents || 0,
          completedEvents: dashboardRes.data.completedEvents || 0,
          totalRevenue: dashboardRes.data.totalRevenue || 0,
          revenueThisMonth: dashboardRes.data.revenueThisMonth || 0,
          membersByRole: membersRes.data.byRole || [],
          eventsByStatus: eventsRes.data.byStatus || [],
          revenueByMonth: paymentsRes.data.byMonth || [],
          monthlyPerformance: monthlyRes.data.data || [],
        });
      } catch {
        // Use empty data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, router]);

  if (user && !["SUPER_ADMIN", "ADMIN"].includes(user.role)) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground">
          Analyse détaillée de la plateforme
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Membres"
          value={data.totalMembers}
          description={`${data.activeMembers} actifs`}
          icon={Users}
        />
        <StatCard
          title="Nouveaux ce mois"
          value={data.newMembersThisMonth}
          description="Inscriptions"
          icon={TrendingUp}
        />
        <StatCard
          title="Événements"
          value={data.totalEvents}
          description={`${data.upcomingEvents} à venir`}
          icon={Calendar}
        />
        <StatCard
          title="Revenus Totaux"
          value={formatCurrency(data.totalRevenue)}
          description={`${formatCurrency(data.revenueThisMonth)} ce mois`}
          icon={CreditCard}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenus par mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.revenueByMonth.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucune donnée disponible
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="amount" fill="#8884d8" name="Revenus" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Utilisateurs par rôle
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.membersByRole.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucune donnée disponible
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={data.membersByRole}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="role"
                    label={({ role, count }) => `${role}: ${count}`}
                  >
                    {data.membersByRole.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Événements par statut
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.eventsByStatus.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucune donnée disponible
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.eventsByStatus} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="status" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00C49F" name="Nombre" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance mensuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.monthlyPerformance.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucune donnée disponible
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="newMembers" stroke="#8884d8" name="Nouveaux membres" />
                  <Line type="monotone" dataKey="newEvents" stroke="#82ca9d" name="Événements" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
