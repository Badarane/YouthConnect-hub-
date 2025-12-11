"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Ticket,
  Heart,
  Share2,
  Clock,
  Star,
  Flame,
  Eye,
  ChevronRight,
  History,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "Tous", color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
  { id: "festival", name: "Festivals", color: "bg-orange-500" },
  { id: "concert", name: "Concerts", color: "bg-yellow-500" },
  { id: "theater", name: "Théâtre", color: "bg-pink-500" },
  { id: "expo", name: "Expositions", color: "bg-green-500" },
  { id: "dance", name: "Danse", color: "bg-purple-500" },
  { id: "cinema", name: "Cinéma", color: "bg-blue-500" },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Festival International Vodoun",
    category: "festival",
    date: "10 Janvier 2025",
    time: "08:00 - 22:00",
    location: "Ouidah, Atlantique",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Zangbeto_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg/640px-Zangbeto_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg",
    attendees: 10000,
    price: "Gratuit",
    featured: true,
    status: "upcoming",
    description: "La fête nationale du Vodoun, célébrant les traditions ancestrales du Bénin. Rituels, danses sacrées et cérémonies sur la Route des Esclaves.",
    tags: ["Vodoun", "Tradition", "Ouidah"],
    organizer: "Ministère de la Culture",
  },
  {
    id: 2,
    title: "FITHEB 2025",
    category: "theater",
    date: "15-22 Mars 2025",
    time: "18:00 - 23:00",
    location: "Palais des Congrès, Cotonou",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop",
    attendees: 5000,
    price: "5 000 FCFA",
    featured: true,
    status: "upcoming",
    description: "Le Festival International de Théâtre du Bénin réunit les meilleures troupes africaines et internationales pour une semaine de spectacles exceptionnels.",
    tags: ["Théâtre", "International", "FITHEB"],
    organizer: "FITHEB Organisation",
  },
  {
    id: 3,
    title: "Quintessence - Festival du Film",
    category: "cinema",
    date: "5-12 Janvier 2025",
    time: "14:00 - 00:00",
    location: "Ouidah & Cotonou",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop",
    attendees: 3000,
    price: "2 000 FCFA",
    featured: true,
    status: "upcoming",
    description: "Festival panafricain du cinéma mettant en lumière les talents du 7ème art africain. Projections, masterclasses et rencontres avec les réalisateurs.",
    tags: ["Cinéma", "Panafricain", "Film"],
    organizer: "Quintessence",
  },
  {
    id: 4,
    title: "Concert Angélique Kidjo",
    category: "concert",
    date: "28 Décembre 2024",
    time: "20:00 - 23:30",
    location: "Stade de l'Amitié, Cotonou",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
    attendees: 15000,
    price: "10 000 FCFA",
    featured: false,
    status: "upcoming",
    description: "La diva béninoise, lauréate de 5 Grammy Awards, revient au pays pour un concert exceptionnel célébrant la musique africaine.",
    tags: ["Afrobeat", "Grammy", "Live"],
    organizer: "Prod Bénin Events",
  },
  {
    id: 5,
    title: "Exposition Art Contemporain Béninois",
    category: "expo",
    date: "1-31 Janvier 2025",
    time: "10:00 - 18:00",
    location: "Fondation Zinsou, Cotonou",
    image: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600&h=400&fit=crop",
    attendees: 2000,
    price: "1 000 FCFA",
    featured: false,
    status: "upcoming",
    description: "Découvrez les œuvres des artistes contemporains béninois les plus prometteurs. Peintures, sculptures et installations.",
    tags: ["Art", "Contemporain", "Zinsou"],
    organizer: "Fondation Zinsou",
  },
  {
    id: 6,
    title: "Festival Nonvitcha",
    category: "festival",
    date: "Août 2025",
    time: "Toute la journée",
    location: "Grand-Popo, Mono",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop",
    attendees: 8000,
    price: "Gratuit",
    featured: false,
    status: "upcoming",
    description: "Festival traditionnel de la diaspora à Grand-Popo. Retrouvailles, cérémonies traditionnelles et célébration de l'identité culturelle.",
    tags: ["Tradition", "Grand-Popo", "Diaspora"],
    organizer: "Communauté Grand-Popo",
  },
  {
    id: 7,
    title: "Welove Eya 2025",
    category: "concert",
    date: "25-27 Décembre 2025",
    time: "18:00 - 04:00",
    location: "Cotonou, Littoral",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
    attendees: 25000,
    price: "5 000 FCFA",
    featured: true,
    status: "upcoming",
    description: "Le plus grand festival musical du Bénin revient ! 3 jours de concerts non-stop avec les plus grandes stars africaines et internationales. Ambiance garantie à Cotonou.",
    tags: ["Musique", "Festival", "Afrobeat", "Live"],
    organizer: "Welove Eya Production",
  },
];

const pastEvents = [
  {
    id: 101,
    title: "Festival Vodoun 2024",
    category: "festival",
    date: "10 Janvier 2024",
    location: "Ouidah, Atlantique",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Zangbeto_running_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg/640px-Zangbeto_running_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg",
    attendees: 12000,
    status: "past",
    description: "Édition 2024 du Festival Vodoun avec une participation record. Découvrez les photos et vidéos de l'événement.",
    tags: ["Vodoun", "2024", "Ouidah"],
    highlights: ["12 000 participants", "50+ cérémonies", "Couverture internationale"],
    gallery: 45,
  },
  {
    id: 102,
    title: "FITHEB 2024",
    category: "theater",
    date: "Mars 2024",
    location: "Cotonou",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&h=400&fit=crop",
    attendees: 4500,
    status: "past",
    description: "15ème édition du FITHEB avec 25 troupes de 18 pays. Retour sur les meilleurs moments du festival.",
    tags: ["Théâtre", "FITHEB", "2024"],
    highlights: ["25 troupes", "18 pays", "35 spectacles"],
    gallery: 120,
  },
  {
    id: 103,
    title: "Regard Bénin 2024",
    category: "expo",
    date: "Novembre 2024",
    location: "Cotonou",
    image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?w=600&h=400&fit=crop",
    attendees: 3000,
    status: "past",
    description: "Biennale photographique de Cotonou. Les meilleurs clichés des photographes africains.",
    tags: ["Photo", "Biennale", "Art"],
    highlights: ["200+ œuvres", "40 artistes", "5 lieux d'exposition"],
    gallery: 200,
  },
  {
    id: 104,
    title: "Festival des Masques Gèlèdè",
    category: "dance",
    date: "Avril 2024",
    location: "Kétou, Plateau",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop",
    attendees: 5000,
    status: "past",
    description: "Célébration du patrimoine Gèlèdè inscrit à l'UNESCO. Danses masquées et rituels traditionnels Yoruba.",
    tags: ["Gèlèdè", "UNESCO", "Yoruba"],
    highlights: ["Patrimoine UNESCO", "30+ masques", "Rituels nocturnes"],
    gallery: 85,
  },
  {
    id: 105,
    title: "Welove Eya 2024",
    category: "concert",
    date: "25-27 Décembre 2024",
    location: "Cotonou, Littoral",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop",
    attendees: 22000,
    status: "past",
    description: "Édition 2024 de Welove Eya avec une programmation exceptionnelle. Les plus grandes stars africaines ont enflammé Cotonou pendant 3 nuits mémorables.",
    tags: ["Welove Eya", "2024", "Concert"],
    highlights: ["22 000 festivaliers", "20+ artistes", "3 nuits de fête"],
    gallery: 200,
  },
  {
    id: 106,
    title: "Welove Eya 2023",
    category: "concert",
    date: "25-27 Décembre 2023",
    location: "Cotonou, Littoral",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop",
    attendees: 18000,
    status: "past",
    description: "Édition 2023 de Welove Eya avec Fally Ipupa, Davido, Tayc et les stars béninoises qui ont enflammé Cotonou pendant 3 nuits.",
    tags: ["Welove Eya", "2023", "Concert"],
    highlights: ["18 000 festivaliers", "15+ artistes", "Fally Ipupa"],
    gallery: 150,
  },
];

interface EventCardProps {
  event: typeof upcomingEvents[0] | typeof pastEvents[0];
  isPast?: boolean;
}

function EventCard({ event, isPast = false }: EventCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      {!isPast && 'featured' in event && event.featured && (
        <div className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
          <Star className="h-3 w-3 fill-white" />
          À la une
        </div>
      )}

      {isPast && (
        <div className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-gray-800/80 px-3 py-1 text-xs font-bold text-white shadow-lg">
          <History className="h-3 w-3" />
          Événement passé
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className={cn(
            "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-110",
            isPast && "grayscale-[30%] group-hover:grayscale-0"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute right-4 top-4 flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40">
            <Heart className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <Badge
            variant="secondary"
            className={cn(
              "text-white",
              event.category === "festival" && "bg-orange-500",
              event.category === "concert" && "bg-yellow-500",
              event.category === "expo" && "bg-green-500",
              event.category === "theater" && "bg-pink-500",
              event.category === "dance" && "bg-purple-500",
              event.category === "cinema" && "bg-blue-500"
            )}
          >
            {categories.find((c) => c.id === event.category)?.name}
          </Badge>
          {!isPast && 'price' in event && (
            <span className="text-sm font-semibold text-orange-600">
              {event.price}
            </span>
          )}
          {isPast && 'gallery' in event && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              {event.gallery} photos
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-orange-600">
          {event.title}
        </h3>
        
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>

        <div className="mb-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-orange-500" />
            {event.date}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange-500" />
            {event.location}
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-orange-500" />
            {event.attendees.toLocaleString()} {isPast ? "participants" : "attendus"}
          </div>
        </div>

        {isPast && 'highlights' in event && (
          <div className="mb-4 flex flex-wrap gap-2">
            {event.highlights.map((highlight, index) => (
              <span
                key={index}
                className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        <Link href={`/event/${event.id}`}>
          <Button 
            className={cn(
              "w-full gap-2",
              isPast 
                ? "border-orange-200 hover:bg-orange-50 dark:border-orange-800" 
                : "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600"
            )}
            variant={isPast ? "outline" : "default"}
          >
            {isPast ? (
              <>
                <Eye className="h-4 w-4" />
                Voir le récap
              </>
            ) : (
              <>
                <Ticket className="h-4 w-4" />
                Voir les détails
              </>
            )}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function EventsShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredUpcoming =
    activeCategory === "all"
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.category === activeCategory);

  const filteredPast =
    activeCategory === "all"
      ? pastEvents
      : pastEvents.filter((event) => event.category === activeCategory);

  return (
    <section id="events" className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-background to-yellow-50/50 dark:from-orange-950/20 dark:via-background dark:to-yellow-950/20" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            <Flame className="mr-1 h-3 w-3" />
            Événements Culturels du Bénin
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Découvrez les événements <span className="text-gradient-culture">incontournables</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explorez les événements à venir et revivez les moments forts des éditions passées.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
          <div className="mb-8 flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-orange-100/50 dark:bg-orange-900/30">
              <TabsTrigger 
                value="upcoming" 
                className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
              >
                <CalendarCheck className="h-4 w-4" />
                À venir
              </TabsTrigger>
              <TabsTrigger 
                value="past"
                id="past-events"
                className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
              >
                <History className="h-4 w-4" />
                Passés
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  activeCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          <TabsContent value="upcoming">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredUpcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            
            {filteredUpcoming.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">
                  Aucun événement à venir dans cette catégorie.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPast.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
            
            {filteredPast.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">
                  Aucun événement passé dans cette catégorie.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Link href="/events">
            <Button size="lg" variant="outline" className="gap-2 border-orange-200 px-8 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-950/50">
              Voir tous les événements
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
