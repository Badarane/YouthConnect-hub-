"use client";

import { useEffect, useState } from "react";
import {
  Users,
  CreditCard,
  Calendar,
  UsersRound,
  TrendingUp,
  Clock,
} from "lucide-react";
import { StatCard } from "@/components/core/stat-card";
import {
  CotisationsBarChart,
  MembersPieChart,
} from "@/components/core/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { mockDashboardStats } from "@/services/dashboard";
import { DashboardStats } from "@/types";

const upcomingEvents = [
  {
    id: "1",
    title: "Réunion de prière",
    date: "2024-01-20",
    time: "18:00",
    location: "Salle principale",
  },
  {
    id: "2",
    title: "Concert de louange",
    date: "2024-01-25",
    time: "16:00",
    location: "Auditorium",
  },
  {
    id: "3",
    title: "Formation leadership",
    date: "2024-02-01",
    time: "09:00",
    location: "Salle de conférence",
  },
];

const recentMembers = [
  { id: "1", name: "Marie Dupont", role: "Membre", avatar: null, joinDate: "2024-01-15" },
  { id: "2", name: "Jean Kamga", role: "Responsable", avatar: null, joinDate: "2024-01-12" },
  { id: "3", name: "Paul Nkoulou", role: "Membre", avatar: null, joinDate: "2024-01-10" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(mockDashboardStats);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStats(mockDashboardStats);
  }, []);

  const chartData = stats.cotisationsByMonth.map((item) => ({
    name: item.month,
    value: item.amount,
  }));

  const pieData = stats.membersByGroup.map((item) => ({
    name: item.group,
    value: item.count,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble de votre organisation
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Membres"
          value={stats.totalMembers}
          description={`${stats.activeMembers} membres actifs`}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Cotisations"
          value={formatCurrency(stats.totalCotisations)}
          description={`${formatCurrency(stats.pendingCotisations)} en attente`}
          icon={CreditCard}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Événements à venir"
          value={stats.upcomingEvents}
          description="Dans les 30 prochains jours"
          icon={Calendar}
        />
        <StatCard
          title="Groupes"
          value={stats.totalGroups}
          description="Groupes actifs"
          icon={UsersRound}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CotisationsBarChart
          data={chartData}
          title="Cotisations par mois"
          description="Évolution des cotisations sur les 6 derniers mois"
        />
        <MembersPieChart
          data={pieData}
          title="Répartition par groupe"
          description="Distribution des membres par groupe"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Prochains événements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 rounded-lg border p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{event.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(event.date)} à {event.time}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Nouveaux membres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {recentMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 rounded-lg border p-3"
                  >
                    <Avatar>
                      <AvatarImage src={member.avatar || undefined} />
                      <AvatarFallback>
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Inscrit le {formatDate(member.joinDate)}
                      </p>
                    </div>
                    <Badge variant="secondary">{member.role}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
