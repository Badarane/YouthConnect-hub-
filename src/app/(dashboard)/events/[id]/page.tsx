"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Share2,
  Send,
  CheckCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  formatDateTime,
  formatDate,
  getInitials,
  generateWhatsAppLink,
} from "@/lib/utils";
import { mockEvents } from "@/services/events";
import { commentSchema, type CommentFormData } from "@/lib/validations/event";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth-store";

const mockParticipants = [
  { id: "1", name: "Marie Dupont", avatar: null, confirmedAt: "2024-01-10" },
  { id: "2", name: "Jean Kamga", avatar: null, confirmedAt: "2024-01-11" },
  { id: "3", name: "Paul Nkoulou", avatar: null, confirmedAt: "2024-01-12" },
];

const mockComments = [
  {
    id: "1",
    content: "Super événement, j'ai hâte d'y être!",
    author: { name: "Marie Dupont", avatar: null },
    createdAt: "2024-01-15T10:30:00",
  },
  {
    id: "2",
    content: "Est-ce qu'il y aura un repas après?",
    author: { name: "Jean Kamga", avatar: null },
    createdAt: "2024-01-15T14:20:00",
  },
];

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [comments, setComments] = useState(mockComments);
  const [isParticipating, setIsParticipating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const event = mockEvents.find((e) => e.id === params.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">Événement non trouvé</h2>
        <Button variant="link" onClick={() => router.push("/events")}>
          Retour à la liste
        </Button>
      </div>
    );
  }

  const handleConfirmParticipation = async () => {
    setIsSubmitting(true);
    try {
      setIsParticipating(true);
      toast({
        title: "Participation confirmée",
        description: "Vous êtes inscrit à cet événement",
        variant: "success",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    const message = `📅 *${event.title}*\n\n📍 ${event.location}\n🕐 ${formatDateTime(event.startDate)}\n\n${event.description}`;
    const url = generateWhatsAppLink(message);
    window.open(url, "_blank");
  };

  const onSubmitComment = async (data: CommentFormData) => {
    setIsSubmitting(true);
    try {
      const newComment = {
        id: Date.now().toString(),
        content: data.content,
        author: { name: user?.firstName + " " + user?.lastName || "Utilisateur", avatar: null },
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newComment]);
      reset();
      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été publié",
        variant: "success",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant={event.isPublic ? "default" : "secondary"}>
              {event.isPublic ? "Public" : "Privé"}
            </Badge>
          </div>
        </div>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Partager
        </Button>
        {!isParticipating ? (
          <Button onClick={handleConfirmParticipation} isLoading={isSubmitting}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirmer ma présence
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            <CheckCircle className="mr-2 h-4 w-4" />
            Inscrit
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {event.image && (
            <div className="overflow-hidden rounded-lg">
              <img
                src={event.image}
                alt={event.title}
                className="aspect-video w-full object-cover"
              />
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{event.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commentaires ({comments.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form
                onSubmit={handleSubmit(onSubmitComment)}
                className="flex gap-2"
              >
                <Textarea
                  placeholder="Ajouter un commentaire..."
                  className="min-h-[80px]"
                  {...register("content")}
                  error={errors.content?.message}
                />
                <Button type="submit" size="icon" isLoading={isSubmitting}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>

              <Separator />

              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={comment.author.avatar || undefined} />
                        <AvatarFallback>
                          {getInitials(comment.author.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {comment.author.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(comment.createdAt)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event.startDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Horaire</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.startDate).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(event.endDate).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Lieu</p>
                  <p className="text-sm text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Participants ({mockParticipants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {mockParticipants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center gap-3"
                    >
                      <Avatar>
                        <AvatarImage src={participant.avatar || undefined} />
                        <AvatarFallback>
                          {getInitials(participant.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {participant.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Inscrit le {formatDate(participant.confirmedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
