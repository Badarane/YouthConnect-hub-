"use client";

import Link from "next/link";
import { ArrowRight, Play, Music, Palette, Theater, Drum, Sparkles, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingIcons = [
  { icon: Music, className: "top-20 left-[10%] text-orange-500", delay: "0s" },
  { icon: Palette, className: "top-32 right-[15%] text-yellow-500", delay: "1s" },
  { icon: Theater, className: "bottom-40 left-[20%] text-green-500", delay: "2s" },
  { icon: Drum, className: "bottom-32 right-[10%] text-pink-500", delay: "0.5s" },
  { icon: Star, className: "top-40 left-[30%] text-yellow-400", delay: "1.5s" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-background to-yellow-50 pt-16 dark:from-orange-950/20 dark:via-background dark:to-yellow-950/20"
    >
      <div className="absolute inset-0 bg-african-pattern" />
      
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute hidden opacity-20 md:block ${item.className}`}
          style={{ animationDelay: item.delay }}
        >
          <item.icon className="h-12 w-12 animate-float" />
        </div>
      ))}

      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-gradient-to-br from-orange-400/20 to-yellow-400/20 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-gradient-to-br from-green-400/20 to-yellow-400/20 blur-3xl" />
      
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-2 text-sm backdrop-blur dark:border-orange-800 dark:from-orange-900/50 dark:to-yellow-900/50">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="font-medium text-orange-700 dark:text-orange-300">
              🇧🇯 La plateforme culturelle du Bénin
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Vivez la{" "}
            <span className="text-gradient-culture">
              richesse culturelle
            </span>{" "}
            du Bénin
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-lg text-muted-foreground md:text-xl">
            YouthConnect Hub connecte les passionnés de culture aux événements les plus 
            vibrants : <span className="font-semibold text-orange-600">Festival Vodoun</span>,{" "}
            <span className="font-semibold text-yellow-600">FITHEB</span>,{" "}
            <span className="font-semibold text-green-600">Quintessence</span>,{" "}
            <span className="font-semibold text-pink-600">danses traditionnelles</span> et bien plus encore.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="#events">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 px-8 text-white hover:from-orange-600 hover:to-yellow-600">
                <Calendar className="h-5 w-5" />
                Voir les événements
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#past-events">
              <Button size="lg" variant="outline" className="gap-2 border-orange-200 px-8 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-950/50">
                <Play className="h-4 w-4" />
                Événements passés
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3 rounded-full bg-white/80 px-5 py-3 shadow-lg backdrop-blur dark:bg-black/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
                <Music className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-orange-600">+150</p>
                <p className="text-xs text-muted-foreground">Événements/an</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-white/80 px-5 py-3 shadow-lg backdrop-blur dark:bg-black/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600">
                <Theater className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-yellow-600">+40</p>
                <p className="text-xs text-muted-foreground">Organisateurs</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-white/80 px-5 py-3 shadow-lg backdrop-blur dark:bg-black/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-green-600">12</p>
                <p className="text-xs text-muted-foreground">Départements</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Zangbeto_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg/640px-Zangbeto_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg"
              alt="Festival Vodoun - Zangbeto"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="mb-2 inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                Festival
              </span>
              <h3 className="text-xl font-bold text-white">Festival Vodoun</h3>
              <p className="text-sm text-white/80">10 Janvier - Ouidah</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"
              alt="FITHEB"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="mb-2 inline-block rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white">
                Théâtre
              </span>
              <h3 className="text-xl font-bold text-white">FITHEB</h3>
              <p className="text-sm text-white/80">Festival International de Théâtre</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600&h=400&fit=crop"
              alt="Quintessence"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="mb-2 inline-block rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                Cinéma
              </span>
              <h3 className="text-xl font-bold text-white">Quintessence</h3>
              <p className="text-sm text-white/80">Festival du Film</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
