"use client";

import {
  Calendar,
  MapPin,
  Bell,
  Share2,
  Smartphone,
  Ticket,
  Search,
  Heart,
  Globe,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Calendar,
    title: "Calendrier Culturel",
    description:
      "Découvrez tous les événements culturels du pays : festivals, concerts, expositions, théâtre et plus encore.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: MapPin,
    title: "Événements Géolocalisés",
    description:
      "Trouvez les événements près de chez vous ou explorez la culture des 10 régions du Cameroun.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Ticket,
    title: "Réservation Facile",
    description:
      "Réservez vos places en quelques clics. Paiement sécurisé via Mobile Money, Orange Money ou carte bancaire.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Bell,
    title: "Notifications Intelligentes",
    description:
      "Soyez alerté des nouveaux événements selon vos préférences : musique, art, danse, théâtre...",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Share2,
    title: "Partage WhatsApp",
    description:
      "Partagez vos événements préférés sur WhatsApp en un clic et invitez vos amis à vous rejoindre.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Heart,
    title: "Favoris & Recommandations",
    description:
      "Sauvegardez vos événements préférés et recevez des recommandations personnalisées.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Search,
    title: "Recherche Avancée",
    description:
      "Filtrez par type d'événement, date, lieu, prix, artiste ou organisateur pour trouver exactement ce que vous cherchez.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: BarChart3,
    title: "Pour les Organisateurs",
    description:
      "Créez et gérez vos événements, suivez les inscriptions, analysez vos statistiques en temps réel.",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
  {
    icon: Globe,
    title: "Multi-langues",
    description:
      "Interface disponible en français et en anglais pour toucher toutes les communautés du Cameroun.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Smartphone,
    title: "100% Mobile",
    description:
      "Application web progressive accessible sur mobile, tablette et ordinateur, même hors connexion.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description:
      "Transactions sécurisées avec Mobile Money, Orange Money et cartes bancaires. Vos données sont protégées.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Interface rapide et fluide même avec une connexion lente. Optimisé pour l'Afrique.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-background to-yellow-50/50 dark:from-orange-950/20 dark:via-background dark:to-yellow-950/20" />
      <div className="absolute inset-0 bg-african-pattern opacity-30" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            ✨ Fonctionnalités
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Tout pour vivre la <span className="text-gradient-culture">culture</span> intensément
          </h2>
          <p className="text-lg text-muted-foreground">
            Une plateforme complète conçue pour connecter les passionnés de culture
            aux événements les plus vibrants du Cameroun et d&apos;Afrique.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-0 bg-background/80 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <CardHeader className="pb-2">
                <div
                  className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bgColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
