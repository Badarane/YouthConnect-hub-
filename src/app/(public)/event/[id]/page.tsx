"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  Heart,
  Share2,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  Star,
  MessageCircle,
  Camera,
  Play,
  Check,
  Info,
  Navigation,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const eventsData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Festival International Vodoun",
    category: "festival",
    status: "upcoming",
    date: "10 Janvier 2025",
    time: "08:00 - 22:00",
    location: "Ouidah, Atlantique",
    address: "Place Chacha, Route des Esclaves, Ouidah",
    coordinates: { lat: 6.3628, lng: 2.0850 },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Zangbeto_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg/1280px-Zangbeto_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Zangbeto_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg/640px-Zangbeto_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Zangbeto_running_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg/640px-Zangbeto_running_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/A_dancing_Zangbeto.jpg/640px-A_dancing_Zangbeto.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Festival_Vodoun_days_2025_04.jpg/640px-Festival_Vodoun_days_2025_04.jpg",
    ],
    attendees: 10000,
    maxCapacity: 15000,
    price: "Gratuit",
    priceDetails: [
      { type: "Entrée générale", price: "Gratuit" },
      { type: "Zone VIP", price: "25 000 FCFA" },
      { type: "Accès cérémonies privées", price: "50 000 FCFA" },
    ],
    featured: true,
    description: `Le Festival International Vodoun est la célébration annuelle la plus importante du patrimoine spirituel béninois. Chaque 10 janvier, jour férié national, Ouidah devient le cœur battant de la culture vodoun.

Cette journée exceptionnelle rassemble des milliers de fidèles, de curieux et de touristes du monde entier pour assister aux rituels sacrés, aux danses traditionnelles et aux cérémonies sur la mythique Route des Esclaves.

Le festival met en lumière :
• Les cérémonies rituelles dirigées par les grands prêtres vodoun
• Les danses sacrées des couvents traditionnels  
• Les processions colorées à travers la ville historique
• Les marchés d'artisanat et d'objets rituels
• Les conférences sur l'histoire et la spiritualité vodoun`,
    tags: ["Vodoun", "Tradition", "Ouidah", "Patrimoine", "10 Janvier"],
    organizer: {
      name: "Ministère du Tourisme, de la Culture et des Arts",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      verified: true,
      events: 25,
      followers: 15000,
    },
    contact: {
      phone: "+229 21 30 XX XX",
      email: "culture@gouv.bj",
      website: "https://tourisme.gouv.bj",
    },
    schedule: [
      { time: "06:00", activity: "Lever du soleil - Offrandes sur la plage" },
      { time: "08:00", activity: "Ouverture officielle - Place Chacha" },
      { time: "10:00", activity: "Procession sur la Route des Esclaves" },
      { time: "12:00", activity: "Cérémonies aux temples vodoun" },
      { time: "14:00", activity: "Danses traditionnelles - Zangbeto, Egungun" },
      { time: "16:00", activity: "Conférences et débats" },
      { time: "18:00", activity: "Spectacles musicaux" },
      { time: "20:00", activity: "Grande cérémonie de clôture" },
    ],
    includes: [
      "Accès à toutes les cérémonies publiques",
      "Guide historique (zone VIP)",
      "Espace restauration traditionnelle",
      "Parking sécurisé",
    ],
    reviews: [
      {
        user: "Koffi A.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
        rating: 5,
        comment: "Une expérience spirituelle inoubliable. À vivre au moins une fois dans sa vie!",
        date: "Janvier 2024",
      },
      {
        user: "Marie D.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
        rating: 5,
        comment: "L'ambiance était magique. Les cérémonies sont impressionnantes et respectueuses.",
        date: "Janvier 2024",
      },
    ],
    relatedEvents: [2, 3],
  },
  "2": {
    id: 2,
    title: "FITHEB 2025",
    category: "theater",
    status: "upcoming",
    date: "15-22 Mars 2025",
    time: "18:00 - 23:00",
    location: "Palais des Congrès, Cotonou",
    address: "Boulevard de la Marina, Cotonou",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&h=400&fit=crop",
    ],
    attendees: 5000,
    maxCapacity: 6000,
    price: "5 000 FCFA",
    priceDetails: [
      { type: "Pass journée", price: "5 000 FCFA" },
      { type: "Pass semaine", price: "25 000 FCFA" },
      { type: "Pass VIP semaine", price: "75 000 FCFA" },
    ],
    featured: true,
    description: `Le Festival International de Théâtre du Bénin (FITHEB) est l'un des plus grands rendez-vous théâtraux d'Afrique. Depuis sa création, il réunit les meilleures troupes du continent et d'ailleurs pour une semaine de spectacles exceptionnels.

L'édition 2025 promet d'être mémorable avec des créations originales, des masterclasses et des rencontres avec les artistes.`,
    tags: ["Théâtre", "International", "FITHEB", "Arts vivants"],
    organizer: {
      name: "FITHEB Organisation",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      verified: true,
      events: 15,
      followers: 8000,
    },
    contact: {
      phone: "+229 97 XX XX XX",
      email: "contact@fitheb.org",
      website: "https://fitheb.org",
    },
    schedule: [
      { time: "18:00", activity: "Ouverture des portes" },
      { time: "19:00", activity: "Spectacle principal" },
      { time: "21:00", activity: "Entracte & échanges" },
      { time: "21:30", activity: "Deuxième spectacle" },
    ],
    includes: [
      "Accès aux spectacles",
      "Programme du festival",
      "Rencontres avec les artistes (VIP)",
    ],
    reviews: [],
    relatedEvents: [1, 3],
  },
  "7": {
    id: 7,
    title: "Welove Eya 2025",
    category: "concert",
    status: "upcoming",
    date: "25-27 Décembre 2025",
    time: "18:00 - 04:00",
    location: "Cotonou, Littoral",
    address: "Stade de l'Amitié Général Mathieu Kérékou, Cotonou",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
    ],
    attendees: 25000,
    maxCapacity: 30000,
    price: "5 000 FCFA",
    priceDetails: [
      { type: "Pass 1 jour", price: "5 000 FCFA" },
      { type: "Pass 3 jours", price: "12 000 FCFA" },
      { type: "Pass VIP 3 jours", price: "50 000 FCFA" },
      { type: "Carré Or (table)", price: "250 000 FCFA" },
    ],
    featured: true,
    description: `Welove Eya est LE rendez-vous musical incontournable du Bénin ! Chaque année, du 25 au 27 décembre, Cotonou vibre au rythme des plus grandes stars africaines et internationales.

Ce festival unique rassemble plus de 25 000 festivaliers pour 3 nuits de pure folie musicale au Stade de l'Amitié. L'ambiance est électrique, les performances légendaires.

🎤 PROGRAMMATION 2025 (à confirmer) :
• Têtes d'affiche internationales
• Stars de l'Afrobeat et de la musique africaine
• Artistes béninois les plus populaires
• DJ sets et animations

🎉 L'EXPÉRIENCE WELOVE EYA :
• 3 scènes avec son et lumière de niveau international
• Food court avec gastronomie locale et internationale
• Espace VIP avec vue privilégiée
• Animations et activations de marques
• Sécurité renforcée et services médicaux`,
    tags: ["Welove Eya", "Concert", "Festival", "Afrobeat", "Cotonou", "Musique"],
    organizer: {
      name: "Welove Eya Production",
      logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      verified: true,
      events: 8,
      followers: 50000,
    },
    contact: {
      phone: "+229 97 XX XX XX",
      email: "contact@weloveeya.com",
      website: "https://weloveeya.com",
    },
    schedule: [
      { time: "25 Déc - 18:00", activity: "Ouverture des portes - Jour 1" },
      { time: "25 Déc - 20:00", activity: "Artistes locaux & DJ sets" },
      { time: "25 Déc - 23:00", activity: "Têtes d'affiche Jour 1" },
      { time: "26 Déc - 18:00", activity: "Ouverture des portes - Jour 2" },
      { time: "26 Déc - 20:00", activity: "Performances & surprises" },
      { time: "26 Déc - 23:00", activity: "Stars internationales" },
      { time: "27 Déc - 18:00", activity: "Ouverture des portes - Jour 3" },
      { time: "27 Déc - 20:00", activity: "Grand final & all-stars" },
      { time: "27 Déc - 04:00", activity: "Clôture du festival" },
    ],
    includes: [
      "Accès au festival (selon pass)",
      "Bracelet festival",
      "Accès aux zones de restauration",
      "Parking gratuit (VIP uniquement)",
      "Accès backstage (Carré Or)",
    ],
    reviews: [
      {
        user: "Gérard T.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
        rating: 5,
        comment: "Meilleur festival du Bénin ! L'ambiance est incroyable, les artistes au top. J'y vais chaque année depuis 2019.",
        date: "Décembre 2024",
      },
      {
        user: "Estelle K.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
        rating: 5,
        comment: "3 jours de folie totale ! L'organisation est impeccable et la programmation toujours au rendez-vous.",
        date: "Décembre 2024",
      },
      {
        user: "Patrick A.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
        rating: 5,
        comment: "Le pass VIP vaut vraiment le coup. Vue parfaite sur la scène et service excellent.",
        date: "Décembre 2024",
      },
    ],
    relatedEvents: [4, 105],
  },
  "101": {
    id: 101,
    title: "Festival Vodoun 2024",
    category: "festival",
    status: "past",
    date: "10 Janvier 2024",
    location: "Ouidah, Atlantique",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Zangbeto_running_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg/1280px-Zangbeto_running_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Zangbeto_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg/640px-Zangbeto_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Zangbeto_running_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg/640px-Zangbeto_running_in_Vodoun_Festival_Grand_Popo_Benin_Jan_2018.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/A_dancing_Zangbeto.jpg/640px-A_dancing_Zangbeto.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Festival_Vodoun_days_2025_04.jpg/640px-Festival_Vodoun_days_2025_04.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Dancing_Zangbeto.jpg/640px-Dancing_Zangbeto.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dancing_Zangbeto_2.jpg/640px-Dancing_Zangbeto_2.jpg",
    ],
    attendees: 12000,
    description: `Retour sur l'édition 2024 du Festival Vodoun qui a rassemblé plus de 12 000 participants venus du monde entier.

Cette édition a été marquée par une couverture médiatique internationale exceptionnelle et la participation de délégations officielles de plusieurs pays.

Points forts de l'édition 2024 :
• Record de participation avec 12 000 visiteurs
• Présence de 50+ délégations internationales
• Couverture par CNN, France 24, TV5 Monde
• Inauguration du nouveau musée Vodoun`,
    tags: ["Vodoun", "2024", "Ouidah", "Rétrospective"],
    highlights: ["12 000 participants", "50+ cérémonies", "Couverture internationale", "Nouveau musée"],
    videos: [
      { title: "Cérémonie d'ouverture", thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop" },
      { title: "Procession Route des Esclaves", thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop" },
    ],
    pressLinks: [
      { source: "France 24", title: "Le Bénin célèbre le Vodoun", url: "#" },
      { source: "RFI", title: "10 janvier : fête du Vodoun au Bénin", url: "#" },
    ],
    reviews: [
      {
        user: "Jean-Pierre M.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
        rating: 5,
        comment: "Mon 5ème festival et toujours aussi impressionnant. L'organisation était parfaite cette année.",
        date: "Janvier 2024",
      },
    ],
  },
  "105": {
    id: 105,
    title: "Welove Eya 2024",
    category: "concert",
    status: "past",
    date: "25-27 Décembre 2024",
    location: "Cotonou, Littoral",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop",
    ],
    attendees: 22000,
    description: `L'édition 2024 de Welove Eya a été MONUMENTALE ! 3 nuits exceptionnelles au Stade de l'Amitié avec une programmation de rêve qui restera dans l'histoire.

🌟 LES ARTISTES QUI ONT ENFLAMMÉ COTONOU :
• Burna Boy - Le Grammy Award sur scène
• Asake - L'énergie Amapiano
• Wizkid - Le retour du roi
• Aya Nakamura - La star francophone
• Nikanor, Sessimè, Zeynab, Fanicko - La fierté béninoise

📊 CHIFFRES CLÉS :
• 22 000 festivaliers sur 3 jours (record battu!)
• 20+ artistes sur scène
• 3 scènes spectaculaires
• Couverture médiatique mondiale
• Retransmission en direct sur Canal+

Cette édition historique a confirmé Welove Eya comme LE plus grand festival musical d'Afrique de l'Ouest.`,
    tags: ["Welove Eya", "2024", "Concert", "Festival", "Afrobeat"],
    highlights: ["22 000 festivaliers", "20+ artistes", "Burna Boy", "Wizkid", "Aya Nakamura"],
    videos: [
      { title: "Aftermovie officiel 2024", thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=200&fit=crop" },
      { title: "Burna Boy - Performance complète", thumbnail: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=200&fit=crop" },
      { title: "Best moments - Nuit 3", thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop" },
      { title: "Ambiance du public", thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=200&fit=crop" },
    ],
    pressLinks: [
      { source: "La Nation Bénin", title: "Welove Eya 2024 : Record historique de 22 000 festivaliers", url: "#" },
      { source: "Canal+ Afrique", title: "Burna Boy enflamme Cotonou", url: "#" },
      { source: "RFI Musique", title: "Welove Eya s'impose comme référence africaine", url: "#" },
      { source: "Jeune Afrique", title: "Le Bénin au cœur de la fête musicale africaine", url: "#" },
    ],
    reviews: [
      {
        user: "Fabrice M.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
        rating: 5,
        comment: "Burna Boy a mis le stade à genoux ! 2h30 de show non-stop. La meilleure édition de tous les temps.",
        date: "Décembre 2024",
      },
      {
        user: "Nadège A.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
        rating: 5,
        comment: "Wizkid + Burna Boy le même soir... Je n'y croyais pas ! Vivement 2025 !",
        date: "Décembre 2024",
      },
      {
        user: "Kevin D.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
        rating: 5,
        comment: "Le Carré Or valait chaque franc. Service impeccable et vue parfaite sur la scène.",
        date: "Décembre 2024",
      },
    ],
  },
  "106": {
    id: 106,
    title: "Welove Eya 2023",
    category: "concert",
    status: "past",
    date: "25-27 Décembre 2023",
    location: "Cotonou, Littoral",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    ],
    attendees: 18000,
    description: `L'édition 2023 de Welove Eya restera dans les mémoires ! 3 nuits exceptionnelles au Stade de l'Amitié.

🌟 LES ARTISTES QUI ONT FAIT VIBRER COTONOU :
• Fally Ipupa - Performance légendaire
• Davido - Hits enchaînés
• Tayc - Romantisme et énergie
• Toofan - Ambiance togolaise
• Nikanor, Sessimè, Zeynab - Fierté béninoise

📊 CHIFFRES CLÉS :
• 18 000 festivaliers sur 3 jours
• 15+ artistes sur scène
• Couverture médiatique internationale`,
    tags: ["Welove Eya", "2023", "Concert", "Festival", "Afrobeat"],
    highlights: ["18 000 festivaliers", "15+ artistes", "Fally Ipupa", "Davido", "Tayc"],
    videos: [
      { title: "Aftermovie officiel 2023", thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=200&fit=crop" },
      { title: "Fally Ipupa - Live", thumbnail: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=200&fit=crop" },
    ],
    pressLinks: [
      { source: "La Nation Bénin", title: "Welove Eya 2023 : Un succès retentissant", url: "#" },
      { source: "Bénin Web TV", title: "18 000 personnes au Stade de l'Amitié", url: "#" },
    ],
    reviews: [
      {
        user: "Gérard T.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
        rating: 5,
        comment: "Fally Ipupa a mis le feu ! 3 heures de show non-stop. Inoubliable.",
        date: "Décembre 2023",
      },
    ],
  },
};

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = eventsData[eventId];
  const [isLiked, setIsLiked] = useState(false);

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Événement non trouvé</h1>
          <Link href="/#events">
            <Button>Retour aux événements</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isPast = event.status === "past";

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className={`h-full w-full object-cover ${isPast ? "grayscale-[20%]" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        <div className="absolute left-4 top-4 z-10">
          <Link href="/#events">
            <Button variant="secondary" size="sm" className="gap-2 bg-white/20 text-white backdrop-blur hover:bg-white/30">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={`${isPast ? "bg-gray-600" : "bg-gradient-to-r from-orange-500 to-yellow-500"} text-white`}>
                {isPast ? "Événement passé" : "À venir"}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur">
                {event.category === "festival" && "Festival"}
                {event.category === "theater" && "Théâtre"}
                {event.category === "concert" && "Concert"}
                {event.category === "expo" && "Exposition"}
                {event.category === "dance" && "Danse"}
                {event.category === "cinema" && "Cinéma"}
              </Badge>
              {event.featured && !isPast && (
                <Badge className="bg-yellow-500 text-white">
                  <Star className="mr-1 h-3 w-3 fill-white" />
                  À la une
                </Badge>
              )}
            </div>
            
            <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {event.date}
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {event.time}
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {event.location}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {event.attendees.toLocaleString()} {isPast ? "participants" : "attendus"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-4 bg-orange-100/50 dark:bg-orange-900/30">
                <TabsTrigger value="about" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  À propos
                </TabsTrigger>
                <TabsTrigger value="program" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  {isPast ? "Récap" : "Programme"}
                </TabsTrigger>
                <TabsTrigger value="gallery" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  <Camera className="mr-1 h-4 w-4" />
                  Photos
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  Avis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line text-muted-foreground">
                      {event.description}
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      {event.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {event.includes && !isPast && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        Ce qui est inclus
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {event.includes.map((item: string, index: number) => (
                          <li key={index} className="flex items-center gap-2 text-muted-foreground">
                            <Check className="h-4 w-4 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {event.address && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-orange-500" />
                        Lieu
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">{event.address}</p>
                      <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                        <img
                          src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&h=400&fit=crop"
                          alt="Carte"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Button variant="outline" className="mt-4 gap-2">
                        <Navigation className="h-4 w-4" />
                        Ouvrir dans Google Maps
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="program" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{isPast ? "Moments forts" : "Programme détaillé"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {event.schedule ? (
                      <div className="space-y-4">
                        {event.schedule.map((item: any, index: number) => (
                          <div key={index} className="flex gap-4 rounded-lg border p-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/50">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-orange-600">{item.time}</p>
                              <p className="text-muted-foreground">{item.activity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : event.highlights ? (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          {event.highlights.map((highlight: string, index: number) => (
                            <Badge key={index} className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-2 text-white">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                        
                        {event.videos && (
                          <div className="mt-6">
                            <h4 className="mb-4 font-semibold">Vidéos</h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {event.videos.map((video: any, index: number) => (
                                <div key={index} className="group relative cursor-pointer overflow-hidden rounded-lg">
                                  <img src={video.thumbnail} alt={video.title} className="aspect-video w-full object-cover transition-transform group-hover:scale-105" />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                                      <Play className="h-6 w-6 text-white" fill="white" />
                                    </div>
                                  </div>
                                  <p className="absolute bottom-2 left-2 text-sm font-medium text-white">{video.title}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {event.pressLinks && (
                          <div className="mt-6">
                            <h4 className="mb-4 font-semibold">Dans la presse</h4>
                            <div className="space-y-2">
                              {event.pressLinks.map((link: any, index: number) => (
                                <a key={index} href={link.url} className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted">
                                  <div>
                                    <p className="text-sm font-medium text-orange-600">{link.source}</p>
                                    <p className="text-muted-foreground">{link.title}</p>
                                  </div>
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Programme à venir...</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Galerie photos</span>
                      <Badge variant="secondary">{event.gallery?.length || 0} photos</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {event.gallery?.map((photo: string, index: number) => (
                        <div key={index} className="group cursor-pointer overflow-hidden rounded-lg">
                          <img
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Avis des participants</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">4.9</span>
                        <span className="text-muted-foreground">({event.reviews?.length || 0} avis)</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {event.reviews?.length > 0 ? (
                      <div className="space-y-4">
                        {event.reviews.map((review: any, index: number) => (
                          <div key={index} className="rounded-lg border p-4">
                            <div className="mb-3 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={review.avatar} />
                                  <AvatarFallback>{review.user[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold">{review.user}</p>
                                  <p className="text-sm text-muted-foreground">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">Aucun avis pour le moment.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {!isPast && (
              <Card className="sticky top-4 border-2 border-orange-200 dark:border-orange-800">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/50 dark:to-yellow-950/50">
                  <CardTitle className="flex items-center justify-between">
                    <span>Réservation</span>
                    <span className="text-2xl font-bold text-orange-600">{event.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {event.priceDetails && (
                    <div className="mb-6 space-y-3">
                      {event.priceDetails.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                          <span className="text-sm">{item.type}</span>
                          <span className="font-semibold text-orange-600">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Places restantes</span>
                    <span className="font-medium text-green-600">
                      {(event.maxCapacity - event.attendees).toLocaleString()} / {event.maxCapacity.toLocaleString()}
                    </span>
                  </div>

                  <div className="mb-6 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                      style={{ width: `${(event.attendees / event.maxCapacity) * 100}%` }}
                    />
                  </div>

                  <Button className="w-full gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600" size="lg">
                    <Ticket className="h-5 w-5" />
                    Réserver maintenant
                  </Button>

                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      {isLiked ? "Sauvegardé" : "Sauvegarder"}
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Share2 className="h-4 w-4" />
                      Partager
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {isPast && (
              <Card className="border-2 border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Événement terminé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    Cet événement s&apos;est déroulé le {event.date}. Découvrez les photos et vidéos de cette édition.
                  </p>
                  <Button className="w-full gap-2" variant="outline">
                    <Bell className="h-4 w-4" />
                    M&apos;alerter pour la prochaine édition
                  </Button>
                </CardContent>
              </Card>
            )}

            {event.organizer && (
              <Card>
                <CardHeader>
                  <CardTitle>Organisateur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={event.organizer.logo} />
                      <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="flex items-center gap-2 font-semibold">
                        {event.organizer.name}
                        {event.organizer.verified && (
                          <Badge className="bg-blue-500 text-white">
                            <Check className="mr-1 h-3 w-3" />
                            Vérifié
                          </Badge>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event.organizer.events} événements • {event.organizer.followers.toLocaleString()} followers
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {event.contact && (
                    <div className="space-y-3">
                      {event.contact.phone && (
                        <a href={`tel:${event.contact.phone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-orange-600">
                          <Phone className="h-4 w-4" />
                          {event.contact.phone}
                        </a>
                      )}
                      {event.contact.email && (
                        <a href={`mailto:${event.contact.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-orange-600">
                          <Mail className="h-4 w-4" />
                          {event.contact.email}
                        </a>
                      )}
                      {event.contact.website && (
                        <a href={event.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-orange-600">
                          <Globe className="h-4 w-4" />
                          Site web
                        </a>
                      )}
                    </div>
                  )}

                  <Button variant="outline" className="mt-4 w-full">
                    Voir tous les événements
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
