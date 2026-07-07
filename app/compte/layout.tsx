"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { User, Package, Heart, LogOut, Settings } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  const router = useRouter()
  const { user, isLoading, login, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success("Vous avez été déconnecté")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Chargement...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16 flex items-center justify-center bg-muted/30">
          <div className="max-w-md w-full bg-card p-8 rounded-xl border shadow-sm">
            <h1 className="font-serif text-3xl font-semibold mb-6 text-center">Connexion</h1>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              login({
                name: (formData.get("email") as string).split("@")[0] || "Client",
                email: formData.get("email") as string,
                phone: "+221 77 000 00 00"
              });
              toast.success("Connexion réussie");
            }} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input required type="email" name="email" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Mot de passe</label>
                <Input required type="password" name="password" placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full">Se connecter</Button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-muted w-full text-left text-muted-foreground hover:text-foreground"
                >
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
