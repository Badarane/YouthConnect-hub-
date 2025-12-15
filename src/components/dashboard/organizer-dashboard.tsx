"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import { StatCard } from "@/components/core/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency, formatDate } from "@/lib/utils";
import { OrganizerDashboardStats } from "@/types";
import { analyticsService, emptyOrganizerStats } from "@/services/analytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function OrganizerDashboard() {
  const [stats, setStats] =
    useState<OrganizerDashboardStats>(emptyOrganizerStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await analyticsService.getOrganizerDashboard();
        setStats(data);
      } catch {
        // Use empty stats on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return <Badge variant="default">Publié</Badge>;
      case "DRAFT":
        return <Badge variant="secondary">Brouillon</Badge>;
      case "COMPLETED":
        return <Badge variant="outline">Terminé</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Organisateur
        </h1>
        <p className="text-muted-foreground">
          Gérez vos événements et suivez vos performances
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Mes Événements"
          value={stats.myEvents}
          description={`${stats.myUpcomingEvents} à venir`}
          icon={Calendar}
        />
        <StatCard
          title="Événements à venir"
          value={stats.myUpcomingEvents}
          description="Prochainement"
          icon={Clock}
        />
        <StatCard
          title="Événements terminés"
          value={stats.myCompletedEvents}
          description="Passés"
          icon={CheckCircle}
        />
        <StatCard
          title="Total Participants"
          value={stats.totalParticipants}
          description={`Moy: ${stats.avgParticipantsPerEvent.toFixed(1)}/événement`}
          icon={Users}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Participants par événement
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.participantsByEvent.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucune donnée disponible
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.participantsByEvent} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="eventTitle" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenus par événement
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.revenueByEvent.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucune donnée disponible
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.revenueByEvent} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="eventTitle" type="category" width={150} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="amount" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Mes événements récents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {stats.myRecentEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Vous n'avez pas encore créé d'événement
              </p>
            ) : (
              <div className="space-y-4">
                {stats.myRecentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 rounded-lg border p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(event.startDate)}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-4 w-4" />
                        {event.participantCount}
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
