"use client";

import { useState } from "react";
import {
  Plus,
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  Settings,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/core/data-table";
import { StatCard } from "@/components/core/stat-card";
import { CotisationsBarChart } from "@/components/core/charts";
import {
  mockCotisations,
  mockCategories,
} from "@/services/cotisations";
import { mockMembers } from "@/services/members";
import { Cotisation, CotisationCategory } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

const statusConfig = {
  paid: {
    label: "Payé",
    variant: "success" as const,
    icon: CheckCircle,
  },
  pending: {
    label: "En attente",
    variant: "warning" as const,
    icon: Clock,
  },
  overdue: {
    label: "En retard",
    variant: "destructive" as const,
    icon: AlertTriangle,
  },
};

export default function CotisationsPage() {
  const { toast } = useToast();
  const [cotisations, setCotisations] = useState<Cotisation[]>(mockCotisations);
  const [categories] = useState<CotisationCategory[]>(mockCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [selectedCotisation, setSelectedCotisation] =
    useState<Cotisation | null>(null);
  const [newCotisation, setNewCotisation] = useState({
    memberId: "",
    categoryId: "",
    dueDate: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalPaid = cotisations
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + c.amount, 0);
  const totalPending = cotisations
    .filter((c) => c.status === "pending" || c.status === "overdue")
    .reduce((sum, c) => sum + c.amount, 0);

  const monthlyData = [
    { name: "Jan", value: 450000 },
    { name: "Fév", value: 520000 },
    { name: "Mar", value: 380000 },
    { name: "Avr", value: 490000 },
    { name: "Mai", value: 560000 },
    { name: "Jun", value: 450000 },
  ];

  const handleAddCotisation = () => {
    const category = categories.find((c) => c.id === newCotisation.categoryId);
    if (!category) return;

    const newCot: Cotisation = {
      id: Date.now().toString(),
      memberId: newCotisation.memberId,
      categoryId: newCotisation.categoryId,
      amount: category.amount,
      dueDate: newCotisation.dueDate,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setCotisations((prev) => [newCot, ...prev]);
    setIsAddDialogOpen(false);
    setNewCotisation({ memberId: "", categoryId: "", dueDate: "" });
    toast({
      title: "Cotisation ajoutée",
      description: "La cotisation a été créée avec succès",
      variant: "success",
    });
  };

  const handleMarkAsPaid = () => {
    if (!selectedCotisation) return;

    setCotisations((prev) =>
      prev.map((c) =>
        c.id === selectedCotisation.id
          ? {
              ...c,
              status: "paid" as const,
              paidDate: new Date().toISOString().split("T")[0],
              paymentMethod: paymentMethod || undefined,
            }
          : c
      )
    );
    setIsPayDialogOpen(false);
    setSelectedCotisation(null);
    setPaymentMethod("");
    toast({
      title: "Paiement enregistré",
      description: "La cotisation a été marquée comme payée",
      variant: "success",
    });
  };

  const handleExport = () => {
    const data = cotisations.map((c) => {
      const member = mockMembers.find((m) => m.id === c.memberId);
      const category = categories.find((cat) => cat.id === c.categoryId);
      return {
        Membre: member ? `${member.firstName} ${member.lastName}` : "-",
        Catégorie: category?.name || "-",
        Montant: c.amount,
        Échéance: c.dueDate,
        Statut: statusConfig[c.status].label,
        "Date de paiement": c.paidDate || "-",
        "Méthode de paiement": c.paymentMethod || "-",
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cotisations");
    XLSX.writeFile(wb, `cotisations_${new Date().toISOString().split("T")[0]}.xlsx`);

    toast({
      title: "Export réussi",
      description: "Le fichier Excel a été téléchargé",
      variant: "success",
    });
  };

  const columns = [
    {
      key: "member",
      header: "Membre",
      cell: (cotisation: Cotisation) => {
        const member = mockMembers.find((m) => m.id === cotisation.memberId);
        return member ? `${member.firstName} ${member.lastName}` : "-";
      },
    },
    {
      key: "category",
      header: "Catégorie",
      cell: (cotisation: Cotisation) => {
        const category = categories.find((c) => c.id === cotisation.categoryId);
        return category?.name || "-";
      },
    },
    {
      key: "amount",
      header: "Montant",
      cell: (cotisation: Cotisation) => formatCurrency(cotisation.amount),
      sortable: true,
    },
    {
      key: "dueDate",
      header: "Échéance",
      cell: (cotisation: Cotisation) => formatDate(cotisation.dueDate),
      sortable: true,
    },
    {
      key: "status",
      header: "Statut",
      cell: (cotisation: Cotisation) => {
        const config = statusConfig[cotisation.status];
        return (
          <Badge variant={config.variant}>
            <config.icon className="mr-1 h-3 w-3" />
            {config.label}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "",
      cell: (cotisation: Cotisation) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {cotisation.status !== "paid" && (
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCotisation(cotisation);
                  setIsPayDialogOpen(true);
                }}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Marquer comme payé
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cotisations</h1>
          <p className="text-muted-foreground">
            Gérez les cotisations de votre organisation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exporter Excel
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un paiement
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total collecté"
          value={formatCurrency(totalPaid)}
          description="Montant total des cotisations payées"
          icon={CheckCircle}
        />
        <StatCard
          title="En attente"
          value={formatCurrency(totalPending)}
          description="Cotisations non réglées"
          icon={Clock}
        />
        <StatCard
          title="Taux de recouvrement"
          value={`${Math.round((totalPaid / (totalPaid + totalPending)) * 100)}%`}
          description="Pourcentage des cotisations payées"
          icon={CreditCard}
        />
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <DataTable
            data={cotisations}
            columns={columns}
            searchPlaceholder="Rechercher..."
            filterOptions={[
              {
                key: "status",
                label: "Statut",
                options: [
                  { value: "paid", label: "Payé" },
                  { value: "pending", label: "En attente" },
                  { value: "overdue", label: "En retard" },
                ],
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <CotisationsBarChart
            data={monthlyData}
            title="Évolution des cotisations"
            description="Montant des cotisations collectées par mois"
          />
        </TabsContent>

        <TabsContent value="categories" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge>
                      {category.type === "mensuelle"
                        ? "Mensuelle"
                        : category.type === "annuelle"
                        ? "Annuelle"
                        : "Spéciale"}
                    </Badge>
                    <span className="text-lg font-bold">
                      {formatCurrency(category.amount)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une cotisation</DialogTitle>
            <DialogDescription>
              Créez une nouvelle cotisation pour un membre
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Membre</Label>
              <Select
                value={newCotisation.memberId}
                onValueChange={(value) =>
                  setNewCotisation((prev) => ({ ...prev, memberId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un membre" />
                </SelectTrigger>
                <SelectContent>
                  {mockMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.firstName} {member.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select
                value={newCotisation.categoryId}
                onValueChange={(value) =>
                  setNewCotisation((prev) => ({ ...prev, categoryId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name} - {formatCurrency(cat.amount)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date d&apos;échéance</Label>
              <Input
                type="date"
                value={newCotisation.dueDate}
                onChange={(e) =>
                  setNewCotisation((prev) => ({
                    ...prev,
                    dueDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddCotisation}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPayDialogOpen} onOpenChange={setIsPayDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enregistrer le paiement</DialogTitle>
            <DialogDescription>
              Confirmez le paiement de cette cotisation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Montant</p>
              <p className="text-2xl font-bold">
                {selectedCotisation
                  ? formatCurrency(selectedCotisation.amount)
                  : "-"}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Méthode de paiement (optionnel)</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une méthode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  <SelectItem value="cash">Espèces</SelectItem>
                  <SelectItem value="bank">Virement bancaire</SelectItem>
                  <SelectItem value="card">Carte bancaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPayDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleMarkAsPaid}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirmer le paiement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
