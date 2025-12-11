"use client";

import { useState } from "react";
import {
  Plus,
  Download,
  Trash2,
  FileText,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  File,
  Upload,
  Globe,
  Lock,
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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import { mockDocuments, documentCategories } from "@/services/resources";
import { Document } from "@/types";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const getFileIcon = (fileType: string) => {
  if (fileType.includes("pdf")) return FileText;
  if (fileType.includes("image")) return FileImage;
  if (fileType.includes("spreadsheet") || fileType.includes("excel"))
    return FileSpreadsheet;
  if (fileType.includes("zip") || fileType.includes("archive"))
    return FileArchive;
  return File;
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

export default function ResourcesPage() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [search, setSearch] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<Document | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: "",
    visibility: "membres" as "public" | "membres",
  });

  const filteredDocuments = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
  );

  const publicDocs = filteredDocuments.filter((d) => d.visibility === "public");
  const memberDocs = filteredDocuments.filter(
    (d) => d.visibility === "membres"
  );

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier",
        variant: "destructive",
      });
      return;
    }

    const newDoc: Document = {
      id: Date.now().toString(),
      title: uploadData.title || selectedFile.name,
      description: uploadData.description,
      fileUrl: URL.createObjectURL(selectedFile),
      fileType: selectedFile.type,
      fileSize: selectedFile.size,
      category: uploadData.category || "Autres",
      visibility: uploadData.visibility,
      uploadedById: "1",
      uploadedBy: {
        id: "1",
        email: "user@example.com",
        firstName: "Utilisateur",
        lastName: "Actuel",
        role: "admin",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      downloads: 0,
      createdAt: new Date().toISOString(),
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setIsUploadOpen(false);
    setSelectedFile(null);
    setUploadData({
      title: "",
      description: "",
      category: "",
      visibility: "membres",
    });
    toast({
      title: "Document ajouté",
      description: "Le fichier a été téléversé avec succès",
      variant: "success",
    });
  };

  const handleDelete = () => {
    if (!docToDelete) return;
    setDocuments((prev) => prev.filter((d) => d.id !== docToDelete.id));
    setDocToDelete(null);
    toast({
      title: "Document supprimé",
      description: "Le fichier a été supprimé",
      variant: "success",
    });
  };

  const handleDownload = (doc: Document) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === doc.id ? { ...d, downloads: d.downloads + 1 } : d
      )
    );
    toast({
      title: "Téléchargement",
      description: `${doc.title} - Téléchargement en cours...`,
    });
  };

  const DocumentCard = ({ doc }: { doc: Document }) => {
    const Icon = getFileIcon(doc.fileType);

    return (
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-1">
              <CardTitle className="line-clamp-1 text-base">
                {doc.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {doc.description || "Aucune description"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{doc.category}</Badge>
            <Badge variant={doc.visibility === "public" ? "default" : "secondary"}>
              {doc.visibility === "public" ? (
                <>
                  <Globe className="mr-1 h-3 w-3" />
                  Public
                </>
              ) : (
                <>
                  <Lock className="mr-1 h-3 w-3" />
                  Membres
                </>
              )}
            </Badge>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatFileSize(doc.fileSize)}</span>
            <span>{doc.downloads} téléchargements</span>
          </div>
        </CardContent>
        <CardFooter className="gap-2 border-t pt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleDownload(doc)}
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDocToDelete(doc)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ressources</h1>
          <p className="text-muted-foreground">
            Gérez et partagez les documents de l&apos;organisation
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Ajouter un document
        </Button>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Rechercher un document..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            Tous ({filteredDocuments.length})
          </TabsTrigger>
          <TabsTrigger value="public">
            Publics ({publicDocs.length})
          </TabsTrigger>
          <TabsTrigger value="members">
            Membres ({memberDocs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
              <File className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Aucun document</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Commencez par ajouter vos premiers documents
              </p>
              <Button className="mt-4" onClick={() => setIsUploadOpen(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Ajouter un document
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="public" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {publicDocs.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {memberDocs.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un document</DialogTitle>
            <DialogDescription>
              Téléversez un nouveau document à partager
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Fichier</Label>
              <Input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </div>
            <div className="space-y-2">
              <Label>Titre</Label>
              <Input
                value={uploadData.title}
                onChange={(e) =>
                  setUploadData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Nom du document"
              />
            </div>
            <div className="space-y-2">
              <Label>Description (optionnel)</Label>
              <Textarea
                value={uploadData.description}
                onChange={(e) =>
                  setUploadData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Description du document..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select
                  value={uploadData.category}
                  onValueChange={(value) =>
                    setUploadData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Visibilité</Label>
                <Select
                  value={uploadData.visibility}
                  onValueChange={(value: "public" | "membres") =>
                    setUploadData((prev) => ({ ...prev, visibility: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="membres">Membres uniquement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Téléverser
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!docToDelete} onOpenChange={() => setDocToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer &quot;{docToDelete?.title}
              &quot;? Cette action est irréversible.
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
