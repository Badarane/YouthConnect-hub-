"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  MapPin,
  Ticket,
} from "lucide-react";
import { StatCard } from "@/components/core/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { VisitorDashboardStats } from "@/types";
import { analyticsService, emptyVisitorStats } from "@/services/analytics";
import Link from "next/link";

export function VisitorDashboard() {
  const [stats, setStats] = useState<VisitorDashboardStats>(emptyVisitorStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await analyticsService.getVisitorDashboard();
        setStats(data);
      } catch {
        // Use empty stats on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge variant="default">Payé</Badge>;
      case "PENDING":
        return <Badge variant="secondary">En attente</Badge>;
      case "FAILED":
        return <Badge variant="destructive">Échoué</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mon Dashboard</h1>
        <p className="text-muted-foreground">
          Suivez vos inscriptions et vos activités
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Mes inscriptions"
          value={stats.registeredEvents}
          description="Événements inscrits"
          icon={Ticket}
        />
        <StatCard
          title="À venir"
          value={stats.upcomingRegisteredEvents}
          description="Événements prochains"
          icon={Clock}
        />
        <StatCard
          title="Participés"
          value={stats.pastAttendedEvents}
          description="Événements passés"
          icon={CheckCircle}
        />
        <StatCard
          title="Paiements"
          value={stats.totalPayments}
          description={`${stats.pendingPayments} en attente`}
          icon={CreditCard}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Mes prochains événements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              {stats.myUpcomingEvents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Vous n&apos;êtes inscrit à aucun événement
                  </p>
                  <Link href="/events">
                    <Button>Découvrir les événements</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.myUpcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 rounded-lg border p-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{event.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDate(event.startDate)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
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
              Mes paiements récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              {stats.myRecentPayments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucun paiement effectué
                </p>
              ) : (
                <div className="space-y-4">
                  {stats.myRecentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center gap-4 rounded-lg border p-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <CreditCard className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {payment.eventTitle || "Cotisation"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(payment.createdAt)}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium">
                          {formatCurrency(payment.amount)}
                        </p>
                        {getPaymentStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Découvrir plus d'événements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Explorez les événements disponibles et inscrivez-vous pour
            participer à des activités passionnantes.
          </p>
          <Link href="/events">
            <Button>Voir tous les événements</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
