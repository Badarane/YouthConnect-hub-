"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Quels types d'événements culturels puis-je trouver au Bénin ?",
    answer:
      "Vous trouverez une grande variété d'événements : le Festival Vodoun (10 janvier à Ouidah), le FITHEB (Festival International de Théâtre), Quintessence (Festival du Film), les cérémonies Gèlèdè (patrimoine UNESCO), les concerts (Afrobeat, Tchink System), les expositions d'art à la Fondation Zinsou, et bien d'autres événements dans les 12 départements du Bénin.",
  },
  {
    question: "Comment voir les détails complets d'un événement ?",
    answer:
      "Cliquez sur n'importe quel événement dans la liste pour accéder à sa page détaillée. Vous y trouverez : la description complète, le programme horaire, la galerie photos, le lieu avec carte, les tarifs, les avis des participants, et les informations de l'organisateur. Pour les événements passés, vous pouvez voir le récapitulatif, les photos et vidéos.",
  },
  {
    question: "Quelle est la différence entre un Organisateur et un Visiteur ?",
    answer:
      "Un Visiteur découvre et participe aux événements culturels. Il peut réserver des places, recevoir des alertes personnalisées et partager les événements. Un Organisateur crée et promeut ses propres événements sur la plateforme, avec accès aux statistiques, à la gestion des inscriptions et aux outils de promotion.",
  },
  {
    question: "Comment puis-je voir les événements passés ?",
    answer:
      "Dans la section Événements, utilisez les onglets 'À venir' et 'Passés' pour naviguer entre les événements futurs et les éditions précédentes. Les événements passés incluent des galeries photos, des vidéos récapitulatives et des articles de presse pour revivre les moments forts.",
  },
  {
    question: "Comment fonctionne le paiement des billets ?",
    answer:
      "Nous acceptons Mobile Money (MTN Mobile Money, Moov Money), les cartes bancaires (Visa, Mastercard) et le paiement sur place pour certains événements. Tous les paiements sont sécurisés et vous recevez votre billet électronique par email et SMS.",
  },
  {
    question: "La plateforme couvre-t-elle tout le Bénin ?",
    answer:
      "Oui ! Nous couvrons les 12 départements du Bénin : Alibori, Atacora, Atlantique, Borgou, Collines, Couffo, Donga, Littoral, Mono, Ouémé, Plateau et Zou. Les principales villes comme Cotonou, Porto-Novo, Ouidah, Abomey, Parakou et Natitingou sont bien représentées.",
  },
  {
    question: "Comment être alerté des nouveaux événements ?",
    answer:
      "Créez un compte et personnalisez vos préférences (festivals, concerts, art, théâtre...). Vous recevrez des notifications par email, SMS ou WhatsApp selon vos choix. Vous pouvez aussi sauvegarder vos événements favoris et demander une alerte pour les prochaines éditions.",
  },
  {
    question: "Puis-je partager un événement avec mes amis ?",
    answer:
      "Absolument ! Chaque événement peut être partagé en un clic sur WhatsApp, Facebook ou par lien direct. Un message pré-formaté avec l'affiche, la date, le lieu et le lien de réservation est généré automatiquement pour faciliter le partage.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-background to-orange-50/50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/20" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            <HelpCircle className="mr-1 h-3 w-3" />
            FAQ
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Questions <span className="text-gradient-culture">fréquentes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tout ce que vous devez savoir sur YouthConnect Culture Hub Bénin.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "overflow-hidden rounded-2xl border-2 bg-card transition-all duration-300",
                openIndex === index
                  ? "border-orange-500 shadow-lg"
                  : "border-orange-100 hover:border-orange-300 dark:border-orange-900/50 dark:hover:border-orange-700"
              )}
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="pr-4 font-semibold">{faq.question}</span>
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    openIndex === index
                      ? "bg-gradient-to-br from-orange-500 to-yellow-500 text-white"
                      : "bg-orange-100 text-orange-600 dark:bg-orange-900/50"
                  )}
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </div>
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center">
          <p className="text-muted-foreground">
            Vous ne trouvez pas la réponse à votre question ?{" "}
            <a
              href="#contact"
              className="font-semibold text-orange-600 underline-offset-2 hover:underline"
            >
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
