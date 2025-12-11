"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Music, Drum } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Accueil", href: "#hero" },
  { name: "Événements", href: "#events" },
  { name: "Catégories", href: "#categories" },
  { name: "Organisateur / Visiteur", href: "#user-types" },
  { name: "Fonctionnalités", href: "#features" },
  { name: "Tarifs", href: "#pricing" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-orange-100 bg-background/80 backdrop-blur-md dark:border-orange-900/50">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 shadow-lg">
            <Drum className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight">YouthConnect</span>
            <span className="text-xs font-medium text-orange-500">Culture Hub</span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-orange-600"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-orange-600">
              Se connecter
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600">
              Découvrir
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-orange-100 bg-background dark:border-orange-900/50 lg:hidden">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-orange-100 pt-4 dark:border-orange-900/50">
              <Link href="/login">
                <Button variant="outline" className="w-full border-orange-200 hover:bg-orange-50 dark:border-orange-800">
                  Se connecter
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600">
                  Découvrir
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
