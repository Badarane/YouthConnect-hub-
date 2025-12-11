"use client";

import { Quote, Star, Music, Palette, Theater } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Dah Aligbonon",
    role: "Chef Vodoun",
    organization: "Temple Vodoun Ouidah",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content:
      "YouthConnect Hub nous aide à partager notre patrimoine spirituel avec le monde entier. Les jeunes de la diaspora peuvent maintenant suivre nos cérémonies et rester connectés à leurs racines.",
    rating: 5,
    type: "organizer",
    icon: Theater,
  },
  {
    name: "Christelle Hounkpatin",
    role: "Artiste Plasticienne",
    organization: "Galerie Arts du Bénin",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content:
      "Grâce à la plateforme, mes expositions touchent un public bien plus large. J'ai pu connecter avec des collectionneurs de Cotonou, Paris et New York!",
    rating: 5,
    type: "artist",
    icon: Palette,
  },
  {
    name: "Florent Couao-Zotti",
    role: "Écrivain & Dramaturge",
    organization: "FITHEB",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content:
      "Le FITHEB a gagné en visibilité grâce à YouthConnect. Les réservations en ligne ont simplifié l'accès à nos spectacles pour tous les Béninois.",
    rating: 5,
    type: "organizer",
    icon: Theater,
  },
  {
    name: "Amandine Sossou",
    role: "Passionnée de Culture",
    organization: "Porto-Novo",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content:
      "Je ne rate plus aucun événement! La plateforme m'a fait découvrir le Festival Vodoun et le Gèlèdè. Des expériences inoubliables que je recommande à tous.",
    rating: 5,
    type: "visitor",
    icon: Music,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-50/30 to-background dark:via-orange-950/10" />
      <div className="absolute inset-0 bg-kente-pattern opacity-30" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            💬 Témoignages
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ils vivent la culture béninoise avec <span className="text-gradient-culture">YouthConnect</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Organisateurs, artistes et passionnés partagent leur expérience sur notre plateforme.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group border-2 border-orange-100 bg-background/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl dark:border-orange-900/50 dark:hover:border-orange-700"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${
                      testimonial.type === "organizer"
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
                        : testimonial.type === "artist"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    }`}
                  >
                    {testimonial.type === "organizer"
                      ? "Organisateur"
                      : testimonial.type === "artist"
                      ? "Artiste"
                      : "Visiteur"}
                  </Badge>
                </div>

                <div className="relative mb-6">
                  <Quote className="absolute -left-1 -top-1 h-8 w-8 text-orange-500/20" />
                  <p className="pl-6 text-muted-foreground">
                    {testimonial.content}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-14 w-14 border-2 border-orange-200">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-yellow-400 text-white">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-400">
                      <testimonial.icon className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-orange-600">
                      {testimonial.organization}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
