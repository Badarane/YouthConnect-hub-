"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { DataTable } from "@/components/core/data-table";
import { MemberForm } from "@/components/forms/member-form";
import { mockMembers } from "@/services/members";
import { Member } from "@/types";
import { getInitials } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { MemberFormData } from "@/lib/validations/member";

const roleLabels: Record<string, string> = {
  admin: "Administrateur",
  responsable: "Responsable",
  membre: "Membre",
};

const roleVariants: Record<string, "default" | "secondary" | "outline"> = {
  admin: "default",
  responsable: "secondary",
  membre: "outline",
};

export default function MembersPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = () => {
    setSelectedMember(null);
    setIsFormOpen(true);
  };

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!memberToDelete) return;

    setIsLoading(true);
    try {
      setMembers((prev) => prev.filter((m) => m.id !== memberToDelete.id));
      toast({
        title: "Membre supprimé",
        description: "Le membre a été supprimé avec succès",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le membre",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setMemberToDelete(null);
    }
  };

  const handleSubmit = async (data: MemberFormData) => {
    setIsLoading(true);
    try {
      if (selectedMember) {
        setMembers((prev) =>
          prev.map((m) =>
            m.id === selectedMember.id ? { ...m, ...data } : m
          )
        );
        toast({
          title: "Membre modifié",
          description: "Les informations ont été mises à jour",
          variant: "success",
        });
      } else {
        const newMember: Member = {
          id: Date.now().toString(),
          ...data,
          isActive: true,
          joinDate: new Date().toISOString().split("T")[0],
          cotisations: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setMembers((prev) => [newMember, ...prev]);
        toast({
          title: "Membre ajouté",
          description: "Le nouveau membre a été créé avec succès",
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

  const columns = [
    {
      key: "name",
      header: "Membre",
      cell: (member: Member) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={member.avatar} />
            <AvatarFallback>
              {getInitials(`${member.firstName} ${member.lastName}`)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">
              {member.firstName} {member.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{member.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Téléphone",
      cell: (member: Member) => member.phone || "-",
    },
    {
      key: "role",
      header: "Rôle",
      cell: (member: Member) => (
        <Badge variant={roleVariants[member.role]}>
          {roleLabels[member.role]}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: "isActive",
      header: "Statut",
      cell: (member: Member) => (
        <Badge variant={member.isActive ? "success" : "secondary"}>
          {member.isActive ? "Actif" : "Inactif"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (member: Member) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/members/${member.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              Voir le profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(member)}>
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setMemberToDelete(member)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Membres</h1>
          <p className="text-muted-foreground">
            Gérez les membres de votre organisation
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un membre
        </Button>
      </div>

      <DataTable
        data={members}
        columns={columns}
        searchPlaceholder="Rechercher un membre..."
        filterOptions={[
          {
            key: "role",
            label: "Rôle",
            options: [
              { value: "admin", label: "Administrateur" },
              { value: "responsable", label: "Responsable" },
              { value: "membre", label: "Membre" },
            ],
          },
          {
            key: "isActive",
            label: "Statut",
            options: [
              { value: "true", label: "Actif" },
              { value: "false", label: "Inactif" },
            ],
          },
        ]}
      />

      <MemberForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        member={selectedMember}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <AlertDialog
        open={!!memberToDelete}
        onOpenChange={() => setMemberToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer {memberToDelete?.firstName}{" "}
              {memberToDelete?.lastName}? Cette action est irréversible.
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
