"use client";

import Link from "next/link";
import {
  Calendar,
  BarChart3,
  Settings,
  Users,
  Megaphone,
  CreditCard,
  Eye,
  Heart,
  Bell,
  Ticket,
  Share2,
  Star,
  ArrowRight,
  Sparkles,
  Music,
  Palette,
} from "lucide-react";
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

const userTypes = [
  {
    id: "organizer",
    title: "Organisateur",
    subtitle: "Créez & promouvez vos événements",
    description:
      "Vous êtes artiste, producteur, association culturelle ou promoteur d'événements ? Créez votre espace et atteignez des milliers de passionnés de culture.",
    icon: Megaphone,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30 hover:border-orange-500",
    accentColor: "text-orange-500",
    features: [
      { icon: Calendar, text: "Créer et publier des événements culturels" },
      { icon: Users, text: "Gérer les inscriptions et participants" },
      { icon: CreditCard, text: "Vendre des billets (Mobile Money, CB)" },
      { icon: BarChart3, text: "Statistiques et analytics en temps réel" },
      { icon: Share2, text: "Promotion sur WhatsApp et réseaux sociaux" },
      { icon: Settings, text: "Personnaliser votre page organisateur" },
    ],
    ctaText: "Créer mon espace organisateur",
    ctaLink: "/register?role=organizer",
    loginText: "Se connecter en tant qu'organisateur",
    loginLink: "/login?role=organizer",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
  },
  {
    id: "visitor",
    title: "Visiteur / Passionné",
    subtitle: "Découvrez & participez aux événements",
    description:
      "Vous êtes passionné de culture, de musique, d'art ou de traditions ? Découvrez les meilleurs événements et ne ratez plus aucun moment culturel.",
    icon: Heart,
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30 hover:border-green-500",
    accentColor: "text-green-500",
    features: [
      { icon: Eye, text: "Explorer tous les événements culturels" },
      { icon: Ticket, text: "Réserver et payer en ligne facilement" },
      { icon: Bell, text: "Alertes personnalisées selon vos goûts" },
      { icon: Heart, text: "Sauvegarder vos événements favoris" },
      { icon: Star, text: "Noter et commenter les événements" },
      { icon: Share2, text: "Partager et inviter vos amis" },
    ],
    ctaText: "Découvrir les événements",
    ctaLink: "/register?role=member",
    loginText: "Se connecter",
    loginLink: "/login?role=member",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop",
  },
];

export function UserTypes() {
  return (
    <section id="user-types" className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-50/20 to-background dark:via-orange-950/10" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            <Sparkles className="mr-1 h-3 w-3" />
            Rejoignez-nous
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Deux façons de vivre la <span className="text-gradient-culture">culture</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Que vous souhaitiez organiser des événements culturels ou simplement
            y participer, YouthConnect Hub a l&apos;interface adaptée à vos besoins.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {userTypes.map((type) => (
            <Card
              key={type.id}
              className={`group relative flex flex-col overflow-hidden border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${type.borderColor}`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${type.color}`}
              />

              <div className="relative h-48 overflow-hidden">
                <img
                  src={type.image}
                  alt={type.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${type.color} shadow-lg`}
                  >
                    <type.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{type.title}</h3>
                    <p className={`text-sm font-medium ${type.accentColor}`}>
                      {type.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="flex-1 space-y-6 p-6">
                <p className="text-muted-foreground">{type.description}</p>

                <div className="space-y-3">
                  <p className="text-sm font-semibold">Ce que vous pouvez faire :</p>
                  <ul className="grid gap-2">
                    {type.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <div className={`rounded-lg p-1.5 ${type.bgColor}`}>
                          <feature.icon className={`h-4 w-4 ${type.accentColor}`} />
                        </div>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 border-t bg-muted/30 p-6">
                <Link href={type.ctaLink} className="w-full">
                  <Button
                    size="lg"
                    className={`w-full gap-2 bg-gradient-to-r ${type.color} text-white shadow-lg hover:opacity-90`}
                  >
                    {type.ctaText}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={type.loginLink} className="w-full">
                  <Button variant="ghost" className="w-full text-sm">
                    {type.loginText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-orange-200 bg-orange-50/50 px-6 py-3 dark:border-orange-800 dark:bg-orange-950/30">
            <div className="flex -space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 ring-2 ring-background">
                <Music className="h-4 w-4 text-white" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 ring-2 ring-background">
                <Palette className="h-4 w-4 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-orange-600">+500</span> organisateurs et{" "}
              <span className="font-semibold text-orange-600">+10 000</span> passionnés de culture
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
