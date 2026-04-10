"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Instagram, Facebook, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

// TikTok icon component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const footerLinks = {
  boutique: [
    { label: "Tous les produits", href: "/boutique" },
    { label: "Parfums", href: "/boutique?category=parfums" },
    { label: "Soins corporels", href: "/boutique?category=laits-corporels" },
    { label: "Nouveautés", href: "/nouveautes" },
    { label: "Bestsellers", href: "/bestsellers" },
  ],
  aide: [
    { label: "Mon compte", href: "/compte" },
    { label: "Suivi de commande", href: "/compte/commandes" },
    { label: "Livraison", href: "/livraison" },
    { label: "Retours", href: "/retours" },
    { label: "FAQ", href: "/faq" },
  ],
  informations: [
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
    { label: "CGV", href: "/cgv" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ],
}

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success("Merci pour votre inscription !")
      setEmail("")
    }
  }

  return (
    <footer className="bg-cream border-t border-border">
      {/* Newsletter Section */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-serif text-2xl md:text-3xl mb-3">
            Rejoignez le cercle Dia&apos;Rama
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Inscrivez-vous pour recevoir nos offres exclusives et conseils beauté
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              className="whitespace-nowrap"
            >
              {"S'inscrire"}
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Dia'Rama Logo"
                width={60}
                height={60}
                className="h-14 w-auto"
              />
              <div>
                <h2 className="font-serif text-xl text-primary font-semibold">
                  {"DIA'RAMA"}
                </h2>
                <p className="text-xs text-muted-foreground tracking-widest">
                  Haut de Gamme
                </p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Découvrez l&apos;excellence des cosmétiques inspirés de la beauté
              africaine. Des produits haut de gamme pour sublimer votre peau.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@diarama.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Boutique</h4>
            <ul className="space-y-2">
              {footerLinks.boutique.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Aide</h4>
            <ul className="space-y-2">
              {footerLinks.aide.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Informations</h4>
            <ul className="space-y-2">
              {footerLinks.informations.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Dia&apos;Rama. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Paiement sécurisé</span>
              <span>•</span>
              <span>Livraison rapide</span>
              <span>•</span>
              <span>Service client 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
