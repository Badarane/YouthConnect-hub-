"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Music, Palette, Theater, Drum } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 p-8 md:p-16">
          <div className="absolute inset-0 bg-african-pattern opacity-20" />
          
          <div className="absolute -right-10 top-10 opacity-20">
            <Music className="h-32 w-32 text-white" />
          </div>
          <div className="absolute -left-10 bottom-10 opacity-20">
            <Drum className="h-32 w-32 text-white" />
          </div>
          <div className="absolute right-1/4 top-1/4 opacity-20">
            <Palette className="h-20 w-20 text-white" />
          </div>
          <div className="absolute bottom-1/4 left-1/4 opacity-20">
            <Theater className="h-20 w-20 text-white" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span>🇧🇯 La culture béninoise à portée de main</span>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
              Prêt à vivre des moments culturels inoubliables ?
            </h2>

            <p className="mb-10 text-lg text-white/90">
              Rejoignez la plus grande communauté de passionnés de culture au Bénin.
              Découvrez des événements exceptionnels : Festival Vodoun, FITHEB,
              Quintessence, Gèlèdè et bien plus encore.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register?role=member">
                <Button
                  size="lg"
                  className="gap-2 bg-white px-8 text-orange-600 shadow-xl hover:bg-white/90"
                >
                  <Music className="h-5 w-5" />
                  Découvrir les événements
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register?role=organizer">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/30 bg-transparent px-8 text-white hover:bg-white/10"
                >
                  Je suis organisateur
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-white/70">
              🎭 +150 événements/an • 🌍 12 départements couverts • 💳 Paiement Mobile Money
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
