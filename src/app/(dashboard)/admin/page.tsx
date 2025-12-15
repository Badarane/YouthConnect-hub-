"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Shield,
  Calendar,
  CreditCard,
  Settings,
  Activity,
  Eye,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatCard } from "@/components/core/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

interface AdminStats {
  totalUsers: number;
  totalOrganizers: number;
  totalVisitors: number;
  totalMembers: number;
  totalEvents: number;
  totalPayments: number;
  pendingPayments: number;
  totalRevenue: number;
}

interface RecentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}

const emptyStats: AdminStats = {
  totalUsers: 0,
  totalOrganizers: 0,
  totalVisitors: 0,
  totalMembers: 0,
  totalEvents: 0,
  totalPayments: 0,
  pendingPayments: 0,
  totalRevenue: 0,
};

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>(emptyStats);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
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
        const [dashboardRes, usersRes] = await Promise.all([
          api.get("/analytics/admin/dashboard").catch(() => ({ data: {} })),
          api.get("/users?limit=10&sort=createdAt:desc").catch(() => ({ data: [] })),
        ]);

        setStats({
          totalUsers: dashboardRes.data.totalUsers || 0,
          totalOrganizers: dashboardRes.data.totalOrganizers || 0,
          totalVisitors: dashboardRes.data.totalVisitors || 0,
          totalMembers: dashboardRes.data.totalMembers || 0,
          totalEvents: dashboardRes.data.totalEvents || 0,
          totalPayments: dashboardRes.data.totalPayments || 0,
          pendingPayments: dashboardRes.data.pendingPayments || 0,
          totalRevenue: dashboardRes.data.totalRevenue || 0,
        });

        if (Array.isArray(usersRes.data)) {
          setRecentUsers(usersRes.data);
        } else if (usersRes.data?.data) {
          setRecentUsers(usersRes.data.data);
        }
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

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return <Badge variant="destructive">Super Admin</Badge>;
      case "ADMIN":
        return <Badge variant="destructive">Admin</Badge>;
      case "ORGANIZER":
        return <Badge variant="default">Organisateur</Badge>;
      case "MEMBER":
        return <Badge variant="secondary">Membre</Badge>;
      case "VISITOR":
        return <Badge variant="outline">Visiteur</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gestion de la Plateforme
        </h1>
        <p className="text-muted-foreground">
          Administration et supervision de YouthConnect Hub
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Utilisateurs"
          value={stats.totalUsers}
          description="Tous les comptes"
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
          description="Utilisateurs standards"
          icon={Eye}
        />
        <StatCard
          title="Revenus"
          value={formatCurrency(stats.totalRevenue)}
          description={`${stats.pendingPayments} paiements en attente`}
          icon={CreditCard}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/members">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Gérer les membres
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Gérer les événements
                  </Button>
                </Link>
                <Link href="/cotisations">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Gérer les paiements
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="mr-2 h-4 w-4" />
                    Voir les statistiques
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Statut du système
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Base de données</span>
                  <Badge variant="default">Connectée</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>API Backend</span>
                  <Badge variant="default">En ligne</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Événements actifs</span>
                  <Badge variant="secondary">{stats.totalEvents}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Paiements en attente</span>
                  <Badge variant={stats.pendingPayments > 0 ? "destructive" : "default"}>
                    {stats.pendingPayments}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs récents</CardTitle>
              <CardDescription>
                Les derniers utilisateurs inscrits sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {recentUsers.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Aucun utilisateur trouvé
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentUsers.map((recentUser) => (
                      <div
                        key={recentUser.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <span className="text-sm font-medium">
                              {recentUser.firstName?.[0]}{recentUser.lastName?.[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">
                              {recentUser.firstName} {recentUser.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {recentUser.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getRoleBadge(recentUser.role)}
                          <span className="text-xs text-muted-foreground">
                            {formatDate(recentUser.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de la plateforme</CardTitle>
              <CardDescription>
                Configuration générale de YouthConnect Hub
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les paramètres de la plateforme sont accessibles dans la section{" "}
                <Link href="/settings" className="text-primary underline">
                  Paramètres
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
