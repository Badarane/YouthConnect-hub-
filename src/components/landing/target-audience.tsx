"use client";

import { Drum, Music2, Palette, Theater, Mic2, BookOpen, Camera, Shirt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const audiences = [
  {
    icon: Drum,
    title: "Festival Vodoun",
    description:
      "Chaque 10 janvier, célébrez la fête nationale du Vodoun à Ouidah. Rituels, danses sacrées et cérémonies ancestrales.",
    color: "text-orange-500",
    bgColor: "bg-gradient-to-br from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/20",
  },
  {
    icon: Music2,
    title: "Concerts & Musique",
    description:
      "Afrobeat, Tchink System, Gospel... Vibrez au rythme des artistes béninois comme Angélique Kidjo et Gnonnas Pedro.",
    color: "text-yellow-500",
    bgColor: "bg-gradient-to-br from-yellow-500/20 to-yellow-600/10",
    borderColor: "border-yellow-500/20",
  },
  {
    icon: Theater,
    title: "FITHEB - Théâtre",
    description:
      "Le Festival International de Théâtre du Bénin réunit les meilleures troupes d'Afrique et du monde.",
    color: "text-pink-500",
    bgColor: "bg-gradient-to-br from-pink-500/20 to-pink-600/10",
    borderColor: "border-pink-500/20",
  },
  {
    icon: Palette,
    title: "Arts & Expositions",
    description:
      "Fondation Zinsou, galeries d'art contemporain... Découvrez le talent des artistes béninois.",
    color: "text-green-500",
    bgColor: "bg-gradient-to-br from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/20",
  },
  {
    icon: Camera,
    title: "Quintessence - Cinéma",
    description:
      "Festival panafricain du film à Ouidah. Projections, masterclasses et rencontres avec les réalisateurs.",
    color: "text-blue-500",
    bgColor: "bg-gradient-to-br from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Mic2,
    title: "Gèlèdè - UNESCO",
    description:
      "Patrimoine immatériel de l'UNESCO. Masques, chants et danses du peuple Yoruba-Nago.",
    color: "text-purple-500",
    bgColor: "bg-gradient-to-br from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/20",
  },
  {
    icon: Shirt,
    title: "Mode & Fashion",
    description:
      "Défilés de mode africaine, créateurs émergents et stylistes béninois sur la scène internationale.",
    color: "text-red-500",
    bgColor: "bg-gradient-to-br from-red-500/20 to-red-600/10",
    borderColor: "border-red-500/20",
  },
  {
    icon: BookOpen,
    title: "Littérature & Poésie",
    description:
      "Salons du livre, rencontres littéraires et slam. L'héritage des grands auteurs béninois.",
    color: "text-teal-500",
    bgColor: "bg-gradient-to-br from-teal-500/20 to-teal-600/10",
    borderColor: "border-teal-500/20",
  },
];

export function TargetAudience() {
  return (
    <section id="categories" className="relative overflow-hidden bg-gradient-to-b from-background via-orange-50/30 to-background py-20 dark:via-orange-950/10 md:py-32">
      <div className="absolute inset-0 bg-kente-pattern opacity-50" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-1 text-sm font-semibold text-orange-600 dark:from-orange-900/50 dark:to-yellow-900/50 dark:text-orange-400">
            🇧🇯 Patrimoine Culturel Béninois
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Toute la <span className="text-gradient-culture">culture béninoise</span> en un seul endroit
          </h2>
          <p className="text-lg text-muted-foreground">
            Du Vodoun ancestral aux festivals internationaux, découvrez la richesse des{" "}
            <span className="font-semibold">12 départements</span> du Bénin : Cotonou, Porto-Novo, Ouidah, Abomey et bien plus.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, index) => (
            <Card
              key={index}
              className={`group border-2 ${audience.borderColor} bg-background/80 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
            >
              <CardHeader className="pb-2">
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${audience.bgColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  <audience.icon className={`h-8 w-8 ${audience.color}`} />
                </div>
                <CardTitle className="text-center text-lg">{audience.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-muted-foreground">{audience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
