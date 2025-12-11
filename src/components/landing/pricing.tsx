"use client";

import Link from "next/link";
import { Check, Sparkles, Crown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Visiteur",
    description: "Pour découvrir et participer aux événements",
    price: "Gratuit",
    currency: "",
    period: "",
    icon: Sparkles,
    color: "from-green-500 to-teal-500",
    features: [
      "Accès à tous les événements",
      "Réservation en ligne",
      "Notifications personnalisées",
      "Favoris et recommandations",
      "Partage WhatsApp",
      "Support par email",
    ],
    cta: "Commencer gratuitement",
    popular: false,
    forWho: "visitor",
  },
  {
    name: "Organisateur Starter",
    description: "Pour les petits organisateurs",
    price: "0",
    currency: "FCFA",
    period: "/ mois",
    icon: Rocket,
    color: "from-orange-500 to-yellow-500",
    features: [
      "Jusqu'à 3 événements/mois",
      "100 participants max/événement",
      "Page organisateur basique",
      "Statistiques de base",
      "Paiement Mobile Money",
      "Commission 5% sur les ventes",
    ],
    cta: "Créer mon espace",
    popular: true,
    forWho: "organizer",
  },
  {
    name: "Organisateur Pro",
    description: "Pour les organisateurs professionnels",
    price: "25 000",
    currency: "FCFA",
    period: "/ mois",
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    features: [
      "Événements illimités",
      "Participants illimités",
      "Page organisateur personnalisée",
      "Statistiques avancées",
      "Support prioritaire 24/7",
      "Commission réduite 2%",
      "Promotion mise en avant",
      "API personnalisée",
    ],
    cta: "Contacter les ventes",
    popular: false,
    forWho: "organizer",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-50/30 to-background dark:via-orange-950/10" />
      <div className="absolute inset-0 bg-kente-pattern opacity-20" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            💰 Tarifs
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Des tarifs <span className="text-gradient-culture">adaptés</span> à chacun
          </h2>
          <p className="text-lg text-muted-foreground">
            Que vous soyez passionné de culture ou organisateur d&apos;événements,
            trouvez le plan qui vous correspond.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                "relative flex flex-col overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
                plan.popular
                  ? "border-orange-500 shadow-lg"
                  : "border-orange-100 dark:border-orange-900/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-orange-500 to-yellow-500 px-12 py-1 text-xs font-bold text-white shadow-md">
                  Populaire
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.color} shadow-lg`}
                >
                  <plan.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.currency && (
                    <span className="text-muted-foreground">
                      {" "}
                      {plan.currency}
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Link
                  href={`/register?role=${plan.forWho}`}
                  className="w-full"
                >
                  <Button
                    className={cn(
                      "w-full",
                      plan.popular
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600"
                        : "border-orange-200 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-950/50"
                    )}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            Tous les prix sont en FCFA. Paiement sécurisé via Mobile Money, Orange Money ou carte bancaire.
            <br />
            <span className="text-orange-600">Questions ?</span>{" "}
            <a href="#contact" className="underline hover:text-orange-600">
              Contactez notre équipe
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
