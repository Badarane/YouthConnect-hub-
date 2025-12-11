"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { eventSchema, type EventFormData } from "@/lib/validations/event";
import { Event } from "@/types";

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: Event | null;
  onSubmit: (data: EventFormData) => Promise<void>;
  isLoading?: boolean;
}

export function EventForm({
  open,
  onOpenChange,
  event,
  onSubmit,
  isLoading,
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: event
      ? {
          title: event.title,
          description: event.description,
          location: event.location,
          startDate: event.startDate.slice(0, 16),
          endDate: event.endDate.slice(0, 16),
          isPublic: event.isPublic,
        }
      : {
          isPublic: true,
        },
  });

  const handleFormSubmit = async (data: EventFormData) => {
    await onSubmit(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {event ? "Modifier l'événement" : "Créer un événement"}
          </DialogTitle>
          <DialogDescription>
            {event
              ? "Modifiez les détails de l'événement"
              : "Remplissez les informations pour créer un nouvel événement"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              placeholder="Nom de l'événement"
              {...register("title")}
              error={errors.title?.message}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description de l'événement..."
              rows={4}
              {...register("description")}
              error={errors.description?.message}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lieu</Label>
            <Input
              id="location"
              placeholder="Lieu de l'événement"
              {...register("location")}
              error={errors.location?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date et heure de début</Label>
              <Input
                id="startDate"
                type="datetime-local"
                {...register("startDate")}
                error={errors.startDate?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date et heure de fin</Label>
              <Input
                id="endDate"
                type="datetime-local"
                {...register("endDate")}
                error={errors.endDate?.message}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="isPublic">Événement public</Label>
              <p className="text-sm text-muted-foreground">
                Visible par tous les visiteurs
              </p>
            </div>
            <Switch
              id="isPublic"
              checked={watch("isPublic")}
              onCheckedChange={(checked) => setValue("isPublic", checked)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {event ? "Modifier" : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
