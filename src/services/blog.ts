import api from "@/lib/api";
import { Article, PaginatedResponse } from "@/types";

export const blogService = {
  getAll: async (category?: string): Promise<PaginatedResponse<Article>> => {
    const response = await api.get("/articles", { params: { category } });
    return response.data;
  },

  getById: async (id: string): Promise<Article> => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },

  create: async (data: Partial<Article>): Promise<Article> => {
    const response = await api.post("/articles", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Article>): Promise<Article> => {
    const response = await api.patch(`/articles/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/articles/${id}`);
  },

  publish: async (id: string): Promise<Article> => {
    const response = await api.patch(`/articles/${id}/publish`);
    return response.data;
  },
};

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Bienvenue dans notre nouvelle plateforme",
    content: `Nous sommes heureux de vous présenter YouthConnect Hub, notre nouvelle plateforme de gestion communautaire.

Cette plateforme a été conçue pour faciliter la communication et l'organisation au sein de notre communauté. Elle vous permettra de:

- Suivre les événements à venir
- Gérer vos cotisations
- Accéder aux ressources partagées
- Rester connecté avec les autres membres

N'hésitez pas à explorer toutes les fonctionnalités et à nous faire part de vos retours!`,
    excerpt: "Découvrez notre nouvelle plateforme de gestion communautaire...",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
    authorId: "1",
    author: {
      id: "1",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "YouthConnect",
      role: "admin",
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    category: "article",
    isPublished: true,
    publishedAt: "2024-01-10",
    comments: [],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Compte-rendu de la réunion du 15 janvier",
    content: `Chers membres,

Voici le compte-rendu de notre réunion mensuelle qui s'est tenue le 15 janvier 2024.

## Points abordés

1. **Bilan financier du mois**
   - Cotisations collectées: 450 000 FCFA
   - Dépenses: 120 000 FCFA
   - Solde: 330 000 FCFA

2. **Événements à venir**
   - Concert de louange prévu pour le 25 janvier
   - Formation leadership en février

3. **Projets communautaires**
   - Discussion sur le projet d'aide aux orphelins
   - Collecte de fonds prévue pour mars

La prochaine réunion aura lieu le 15 février 2024.`,
    excerpt: "Résumé des décisions prises lors de notre dernière réunion...",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    authorId: "2",
    author: {
      id: "2",
      email: "responsable@example.com",
      firstName: "Jean",
      lastName: "Kamga",
      role: "responsable",
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    category: "compte-rendu",
    isPublished: true,
    publishedAt: "2024-01-16",
    comments: [],
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
  {
    id: "3",
    title: "Communiqué: Changement d'horaire des réunions",
    content: `À l'attention de tous les membres,

Nous vous informons que les réunions hebdomadaires de prière se tiendront désormais les vendredis soirs à 18h00 au lieu des mercredis.

Ce changement prend effet à partir du vendredi 2 février 2024.

Merci de votre compréhension.

La Direction`,
    excerpt: "Information importante concernant nos horaires de réunion...",
    authorId: "1",
    author: {
      id: "1",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "YouthConnect",
      role: "admin",
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    category: "communique",
    isPublished: true,
    publishedAt: "2024-01-20",
    comments: [],
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
];
