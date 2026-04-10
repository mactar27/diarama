"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Package, Heart, LogOut, Settings } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { cn } from "@/lib/utils"

const accountLinks = [
  {
    href: "/compte",
    label: "Mon profil",
    icon: User,
  },
  {
    href: "/compte/commandes",
    label: "Mes commandes",
    icon: Package,
  },
  {
    href: "/compte/wishlist",
    label: "Ma liste de souhaits",
    icon: Heart,
  },
  {
    href: "/compte/parametres",
    label: "Paramètres",
    icon: Settings,
  },
]

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
            Mon Compte
          </h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <nav className="space-y-1">
                {accountLinks.map(link => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  )
                })}
                <button className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-muted w-full text-left text-muted-foreground">
                  <LogOut className="h-5 w-5" />
                  Déconnexion
                </button>
              </nav>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
