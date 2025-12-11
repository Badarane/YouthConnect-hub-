"use client";

import { useState } from "react";
import {
  Bell,
  Calendar,
  FileText,
  CreditCard,
  Users,
  CheckCheck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    title: "Nouvel événement",
    message: "Un nouveau concert de louange a été programmé pour le 25 janvier",
    type: "event",
    isRead: false,
    link: "/events/2",
    createdAt: "2024-01-18T10:30:00",
  },
  {
    id: "2",
    userId: "1",
    title: "Paiement en retard",
    message: "Votre cotisation de janvier n'a pas encore été réglée",
    type: "payment",
    isRead: false,
    link: "/cotisations",
    createdAt: "2024-01-17T09:00:00",
  },
  {
    id: "3",
    userId: "1",
    title: "Nouveau document",
    message: "Le rapport financier 2023 est maintenant disponible",
    type: "document",
    isRead: true,
    link: "/resources",
    createdAt: "2024-01-16T14:15:00",
  },
  {
    id: "4",
    userId: "1",
    title: "Nouveau membre",
    message: "Sarah Ngono a rejoint l'organisation",
    type: "member",
    isRead: true,
    link: "/members/4",
    createdAt: "2024-01-15T11:45:00",
  },
  {
    id: "5",
    userId: "1",
    title: "Rappel événement",
    message: "N'oubliez pas la réunion de prière demain à 18h",
    type: "event",
    isRead: true,
    link: "/events/1",
    createdAt: "2024-01-14T16:00:00",
  },
];

const typeConfig = {
  event: {
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  document: {
    icon: FileText,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  payment: {
    icon: CreditCard,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  member: {
    icon: Users,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  system: {
    icon: Bell,
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
  },
};

export default function NotificationsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast({
      title: "Notifications lues",
      description: "Toutes les notifications ont été marquées comme lues",
    });
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast({
      title: "Notification supprimée",
    });
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast({
      title: "Notifications effacées",
      description: "Toutes les notifications ont été supprimées",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} notification(s) non lue(s)`
              : "Toutes vos notifications sont à jour"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Tout marquer comme lu
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" onClick={handleClearAll}>
              <Trash2 className="mr-2 h-4 w-4" />
              Tout effacer
            </Button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">
              Aucune notification
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Vous n&apos;avez pas de nouvelles notifications
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Toutes les notifications</CardTitle>
            <CardDescription>
              Cliquez sur une notification pour la voir en détail
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {notifications.map((notification) => {
                  const config = typeConfig[notification.type];
                  const Icon = config.icon;

                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent",
                        !notification.isRead && "bg-accent/50"
                      )}
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          config.bgColor
                        )}
                      >
                        <Icon className={cn("h-5 w-5", config.color)} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <Badge variant="default" className="ml-2">
                              Nouveau
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(notification.createdAt)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
