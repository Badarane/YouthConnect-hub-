"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  FileText,
  Megaphone,
  ClipboardList,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockArticles } from "@/services/blog";
import { Article } from "@/types";
import { formatDate, getInitials, truncateText } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const categoryConfig = {
  article: {
    label: "Article",
    icon: FileText,
    color: "bg-blue-500",
  },
  communique: {
    label: "Communiqué",
    icon: Megaphone,
    color: "bg-yellow-500",
  },
  "compte-rendu": {
    label: "Compte-rendu",
    icon: ClipboardList,
    color: "bg-green-500",
  },
};

export default function BlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "article" as "article" | "communique" | "compte-rendu",
    isPublished: false,
  });

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const articlesByCategory = {
    article: filteredArticles.filter((a) => a.category === "article"),
    communique: filteredArticles.filter((a) => a.category === "communique"),
    "compte-rendu": filteredArticles.filter(
      (a) => a.category === "compte-rendu"
    ),
  };

  const handleCreate = () => {
    setSelectedArticle(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "article",
      isPublished: false,
    });
    setIsFormOpen(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || "",
      category: article.category,
      isPublished: article.isPublished,
    });
    setIsFormOpen(true);
  };

  const handleDelete = () => {
    if (!articleToDelete) return;
    setArticles((prev) => prev.filter((a) => a.id !== articleToDelete.id));
    setArticleToDelete(null);
    toast({
      title: "Article supprimé",
      description: "L'article a été supprimé avec succès",
      variant: "success",
    });
  };

  const handleSubmit = () => {
    if (selectedArticle) {
      setArticles((prev) =>
        prev.map((a) =>
          a.id === selectedArticle.id
            ? { ...a, ...formData, updatedAt: new Date().toISOString() }
            : a
        )
      );
      toast({
        title: "Article modifié",
        description: "L'article a été mis à jour",
        variant: "success",
      });
    } else {
      const newArticle: Article = {
        id: Date.now().toString(),
        ...formData,
        authorId: "1",
        author: {
          id: "1",
          email: "user@example.com",
          firstName: "Utilisateur",
          lastName: "Actuel",
          role: "admin",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        comments: [],
        publishedAt: formData.isPublished ? new Date().toISOString() : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setArticles((prev) => [newArticle, ...prev]);
      toast({
        title: "Article créé",
        description: "Le nouvel article a été créé avec succès",
        variant: "success",
      });
    }
    setIsFormOpen(false);
  };

  const ArticleCard = ({ article }: { article: Article }) => {
    const config = categoryConfig[article.category];
    const Icon = config.icon;

    return (
      <Card className="flex flex-col">
        {article.coverImage && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <CardHeader className="flex-1">
          <div className="flex items-start justify-between">
            <Badge
              variant="outline"
              className="flex items-center gap-1"
            >
              <Icon className="h-3 w-3" />
              {config.label}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push(`/blog/${article.id}`)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Lire
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(article)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setArticleToDelete(article)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {article.excerpt || truncateText(article.content, 150)}
          </CardDescription>
        </CardHeader>
        <CardFooter className="border-t pt-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={article.author.avatar} />
                <AvatarFallback className="text-xs">
                  {getInitials(
                    `${article.author.firstName} ${article.author.lastName}`
                  )}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {article.author.firstName}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDate(article.publishedAt || article.createdAt)}
            </span>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog & Activités</h1>
          <p className="text-muted-foreground">
            Gérez les articles, communiqués et comptes-rendus
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel article
        </Button>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Rechercher un article..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Tous ({filteredArticles.length})</TabsTrigger>
          <TabsTrigger value="article">
            Articles ({articlesByCategory.article.length})
          </TabsTrigger>
          <TabsTrigger value="communique">
            Communiqués ({articlesByCategory.communique.length})
          </TabsTrigger>
          <TabsTrigger value="compte-rendu">
            Comptes-rendus ({articlesByCategory["compte-rendu"].length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>

        {(["article", "communique", "compte-rendu"] as const).map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-6">
            {articlesByCategory[cat].length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
                <FileText className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  Aucun {categoryConfig[cat].label.toLowerCase()}
                </h3>
                <Button className="mt-4" onClick={handleCreate}>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articlesByCategory[cat].map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedArticle ? "Modifier l'article" : "Nouvel article"}
            </DialogTitle>
            <DialogDescription>
              {selectedArticle
                ? "Modifiez les informations de l'article"
                : "Créez un nouvel article, communiqué ou compte-rendu"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label>Titre</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Titre de l'article"
              />
            </div>
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select
                value={formData.category}
                onValueChange={(value: typeof formData.category) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="communique">Communiqué</SelectItem>
                  <SelectItem value="compte-rendu">Compte-rendu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Résumé (optionnel)</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="Bref résumé de l'article..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Contenu</Label>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Contenu de l'article..."
                rows={10}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Publier</Label>
                <p className="text-sm text-muted-foreground">
                  Rendre l&apos;article visible aux membres
                </p>
              </div>
              <Switch
                checked={formData.isPublished}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isPublished: checked }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              {selectedArticle ? "Modifier" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!articleToDelete}
        onOpenChange={() => setArticleToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer &quot;{articleToDelete?.title}
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
