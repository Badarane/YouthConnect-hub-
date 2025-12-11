"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Drum } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  events: {
    title: "Événements",
    links: [
      { name: "Festival Vodoun", href: "#" },
      { name: "FITHEB", href: "#" },
      { name: "Quintessence", href: "#" },
      { name: "Concerts", href: "#" },
      { name: "Tous les événements", href: "#events" },
    ],
  },
  regions: {
    title: "Départements",
    links: [
      { name: "Cotonou (Littoral)", href: "#" },
      { name: "Porto-Novo (Ouémé)", href: "#" },
      { name: "Ouidah (Atlantique)", href: "#" },
      { name: "Abomey (Zou)", href: "#" },
      { name: "Parakou (Borgou)", href: "#" },
    ],
  },
  organizers: {
    title: "Organisateurs",
    links: [
      { name: "Créer un événement", href: "#" },
      { name: "Tarifs", href: "#pricing" },
      { name: "Guide organisateur", href: "#" },
      { name: "Support", href: "#" },
    ],
  },
  about: {
    title: "À propos",
    links: [
      { name: "Notre mission", href: "#" },
      { name: "L'équipe", href: "#" },
      { name: "Blog culturel", href: "#" },
      { name: "Contact", href: "#contact" },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-orange-100 bg-gradient-to-b from-background to-orange-50/50 dark:border-orange-900/50 dark:to-orange-950/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 shadow-lg">
                <Drum className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">YouthConnect</span>
                <span className="text-xs font-medium text-orange-500">Culture Hub Bénin 🇧🇯</span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              La plateforme qui connecte les passionnés aux événements culturels
              les plus vibrants du Bénin. Festival Vodoun, FITHEB, Quintessence,
              Gèlèdè et bien plus encore.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:contact@youthconnecthub.bj"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-orange-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/50">
                  <Mail className="h-4 w-4 text-orange-500" />
                </div>
                contact@youthconnecthub.bj
              </a>
              <a
                href="tel:+22990000000"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-orange-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/50">
                  <Phone className="h-4 w-4 text-orange-500" />
                </div>
                +229 90 XX XX XX
              </a>
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/50">
                  <MapPin className="h-4 w-4 text-orange-500" />
                </span>
                Cotonou, Bénin
              </span>
            </div>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-all hover:bg-gradient-to-br hover:from-orange-500 hover:to-yellow-500 hover:text-white dark:bg-orange-900/50"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 font-semibold text-orange-600">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-orange-600"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-orange-200 dark:bg-orange-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            © {new Date().getFullYear()} YouthConnect Hub. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-orange-600">Confidentialité</a>
            <span>•</span>
            <a href="#" className="hover:text-orange-600">CGU</a>
            <span>•</span>
            <span>Fait avec 🧡 au Bénin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
