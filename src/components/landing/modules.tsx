"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  MapPin,
  Bell,
  Heart,
  Share2,
  BarChart3,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const modules = [
  {
    id: "discover",
    icon: LayoutDashboard,
    title: "Découvrir",
    description: "Explorez tous les événements culturels",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
    features: [
      "Calendrier culturel complet",
      "Filtres par catégorie et région",
      "Événements recommandés",
      "Artistes et organisateurs",
      "Recherche avancée",
    ],
  },
  {
    id: "events",
    icon: Calendar,
    title: "Événements",
    description: "Festivals, concerts, expositions...",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop",
    features: [
      "Festivals traditionnels",
      "Concerts et spectacles",
      "Expositions d'art",
      "Théâtre et danse",
      "Événements communautaires",
    ],
  },
  {
    id: "booking",
    icon: Ticket,
    title: "Réservation",
    description: "Réservez vos places facilement",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    features: [
      "Réservation en ligne",
      "Paiement Mobile Money",
      "Billets électroniques",
      "Confirmation instantanée",
      "Historique des réservations",
    ],
  },
  {
    id: "map",
    icon: MapPin,
    title: "Carte Interactive",
    description: "Trouvez les événements près de vous",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&h=500&fit=crop",
    features: [
      "Géolocalisation",
      "10 régions du Cameroun",
      "Itinéraires et transport",
      "Points d'intérêt culturels",
      "Événements à proximité",
    ],
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    description: "Ne ratez aucun événement",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop",
    features: [
      "Alertes personnalisées",
      "Rappels d'événements",
      "Nouveautés selon vos goûts",
      "Offres et promotions",
      "Notifications WhatsApp",
    ],
  },
  {
    id: "organizer",
    icon: BarChart3,
    title: "Espace Organisateur",
    description: "Gérez vos événements",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=500&fit=crop",
    features: [
      "Création d'événements",
      "Gestion des inscriptions",
      "Statistiques détaillées",
      "Promotion intégrée",
      "Export des données",
    ],
  },
];

export function Modules() {
  const [activeModule, setActiveModule] = useState(modules[0]);

  return (
    <section id="modules" className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-50/30 to-background dark:via-orange-950/10" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            📱 Modules
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Découvrez nos <span className="text-gradient-culture">modules</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Chaque module est conçu pour vous offrir la meilleure expérience culturelle.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-2">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-300",
                  activeModule.id === module.id
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/50 dark:to-yellow-950/50"
                    : "border-transparent hover:border-orange-200 hover:bg-orange-50/50 dark:hover:border-orange-800 dark:hover:bg-orange-950/30"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all",
                    activeModule.id === module.id
                      ? "bg-gradient-to-br from-orange-500 to-yellow-500 text-white shadow-lg"
                      : "bg-orange-100 text-orange-600 dark:bg-orange-900/50"
                  )}
                >
                  <module.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{module.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6 overflow-hidden rounded-2xl border-2 border-orange-200 bg-card p-6 shadow-xl dark:border-orange-800">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={activeModule.image}
                  alt={activeModule.title}
                  className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                    <activeModule.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold">{activeModule.title}</h3>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {activeModule.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
