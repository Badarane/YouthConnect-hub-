"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Calendar,
  MapPin,
  Clock,
  Users,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventForm } from "@/components/forms/event-form";
import { mockEvents } from "@/services/events";
import { Event } from "@/types";
import { formatDateTime, generateWhatsAppLink } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { EventFormData } from "@/lib/validations/event";

export default function EventsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const now = new Date();
  const upcomingEvents = events.filter(
    (e) => new Date(e.startDate) >= now
  );
  const pastEvents = events.filter(
    (e) => new Date(e.startDate) < now
  );

  const filteredUpcoming = upcomingEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredPast = pastEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;

    setIsLoading(true);
    try {
      setEvents((prev) => prev.filter((e) => e.id !== eventToDelete.id));
      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé avec succès",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'événement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setEventToDelete(null);
    }
  };

  const handleSubmit = async (data: EventFormData) => {
    setIsLoading(true);
    try {
      if (selectedEvent) {
        setEvents((prev) =>
          prev.map((e) =>
            e.id === selectedEvent.id ? { ...e, ...data } : e
          )
        );
        toast({
          title: "Événement modifié",
          description: "L'événement a été mis à jour",
          variant: "success",
        });
      } else {
        const newEvent: Event = {
          id: Date.now().toString(),
          ...data,
          createdById: "1",
          participants: [],
          comments: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setEvents((prev) => [newEvent, ...prev]);
        toast({
          title: "Événement créé",
          description: "Le nouvel événement a été créé avec succès",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (event: Event) => {
    const message = `📅 *${event.title}*\n\n📍 ${event.location}\n🕐 ${formatDateTime(event.startDate)}\n\n${event.description}`;
    const url = generateWhatsAppLink(message);
    window.open(url, "_blank");
  };

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="overflow-hidden">
      {event.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1">{event.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {event.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push(`/events/${event.id}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Voir les détails
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(event)}>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare(event)}>
                <Share2 className="mr-2 h-4 w-4" />
                Partager sur WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setEventToDelete(event)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatDateTime(event.startDate)}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {event.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {event.participants.length} participant(s)
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Badge variant={event.isPublic ? "default" : "secondary"}>
          {event.isPublic ? "Public" : "Privé"}
        </Badge>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Événements</h1>
          <p className="text-muted-foreground">
            Gérez les événements de votre organisation
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Créer un événement
        </Button>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Rechercher un événement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            À venir ({filteredUpcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Passés ({filteredPast.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {filteredUpcoming.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
              <Calendar className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Aucun événement à venir
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Créez votre premier événement pour commencer
              </p>
              <Button className="mt-4" onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Créer un événement
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredUpcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {filteredPast.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
              <Clock className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Aucun événement passé
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                L&apos;historique de vos événements apparaîtra ici
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPast.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <EventForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        event={selectedEvent}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <AlertDialog
        open={!!eventToDelete}
        onOpenChange={() => setEventToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l&apos;événement &quot;
              {eventToDelete?.title}&quot;? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
