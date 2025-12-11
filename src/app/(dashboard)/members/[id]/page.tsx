"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Pencil,
  Camera,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatCurrency, getInitials } from "@/lib/utils";
import { mockMembers } from "@/services/members";
import { MemberForm } from "@/components/forms/member-form";
import { MemberFormData } from "@/lib/validations/member";
import { useToast } from "@/hooks/use-toast";

const mockCotisations = [
  {
    id: "1",
    type: "Mensuelle",
    amount: 15000,
    dueDate: "2024-01-15",
    status: "paid",
    paidDate: "2024-01-10",
  },
  {
    id: "2",
    type: "Mensuelle",
    amount: 15000,
    dueDate: "2024-02-15",
    status: "pending",
    paidDate: null,
  },
];

const mockActivities = [
  { id: "1", event: "Réunion de prière", date: "2024-01-10", status: "present" },
  { id: "2", event: "Concert de louange", date: "2024-01-05", status: "present" },
  { id: "3", event: "Formation leadership", date: "2023-12-20", status: "absent" },
];

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const member = mockMembers.find((m) => m.id === params.id);

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">Membre non trouvé</h2>
        <Button variant="link" onClick={() => router.push("/members")}>
          Retour à la liste
        </Button>
      </div>
    );
  }

  const handleUpdate = async (data: MemberFormData) => {
    toast({
      title: "Profil mis à jour",
      description: "Les informations ont été modifiées avec succès",
      variant: "success",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Profil membre</h1>
          <p className="text-muted-foreground">
            Détails et historique du membre
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)}>
          <Pencil className="mr-2 h-4 w-4" />
          Modifier
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(`${member.firstName} ${member.lastName}`)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="mt-4 text-xl font-semibold">
                {member.firstName} {member.lastName}
              </h2>
              <Badge className="mt-2">
                {member.role === "admin"
                  ? "Administrateur"
                  : member.role === "responsable"
                  ? "Responsable"
                  : "Membre"}
              </Badge>
              <Badge
                variant={member.isActive ? "success" : "secondary"}
                className="mt-2"
              >
                {member.isActive ? "Actif" : "Inactif"}
              </Badge>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{member.email}</span>
              </div>
              {member.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{member.phone}</span>
                </div>
              )}
              {member.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{member.address}</span>
                </div>
              )}
              {member.birthDate && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(member.birthDate)}</span>
                </div>
              )}
              {member.profession && (
                <div className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{member.profession}</span>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <div className="text-sm text-muted-foreground">
              <p>Membre depuis le {formatDate(member.joinDate)}</p>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="cotisations">
            <TabsList>
              <TabsTrigger value="cotisations">Cotisations</TabsTrigger>
              <TabsTrigger value="activities">Activités</TabsTrigger>
            </TabsList>

            <TabsContent value="cotisations" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des cotisations</CardTitle>
                  <CardDescription>
                    Suivi des paiements du membre
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCotisations.map((cot) => (
                      <div
                        key={cot.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <p className="font-medium">{cot.type}</p>
                          <p className="text-sm text-muted-foreground">
                            Échéance: {formatDate(cot.dueDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(cot.amount)}
                          </p>
                          <Badge
                            variant={
                              cot.status === "paid" ? "success" : "warning"
                            }
                          >
                            {cot.status === "paid" ? "Payé" : "En attente"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Participation aux événements</CardTitle>
                  <CardDescription>
                    Historique de présence aux activités
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <p className="font-medium">{activity.event}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(activity.date)}
                          </p>
                        </div>
                        <Badge
                          variant={
                            activity.status === "present"
                              ? "success"
                              : "destructive"
                          }
                        >
                          {activity.status === "present" ? "Présent" : "Absent"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <MemberForm
        open={isEditing}
        onOpenChange={setIsEditing}
        member={member}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
