"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Store } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const adminLinks = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/produits", label: "Produits", icon: Package },
  { href: "/admin/commandes", label: "Commandes", icon: ShoppingCart },
  { href: "/admin/clients", label: "Clients", icon: Users },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      toast.success("Déconnexion réussie")
      router.push("/admin/login")
    } catch (error) {
      toast.error("Erreur lors de la déconnexion")
    }
  }

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Sidebar */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm md:hidden transition-opacity duration-300" onClick={() => setSidebarOpen(false)} />}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 backdrop-blur-md transition-transform duration-300 md:static md:translate-x-0", sidebarOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="h-16 flex items-center gap-3 border-b border-zinc-150 dark:border-zinc-800/80 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-bold tracking-wider text-zinc-805 dark:text-amber-500" style={{ fontFamily: "var(--font-cormorant)" }}>Dia&apos;Rama</p>
            <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500">Administration</p>
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1.5">
          {adminLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 border border-transparent",
                  isActive 
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15 shadow-[0_4px_12px_rgba(245,158,11,0.05)]" 
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-800 dark:hover:text-zinc-100"
                )}
              >
                <link.icon className="h-4.5 w-4.5" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-zinc-150 dark:border-zinc-800/80">
          <Link
            href="/"
            className="flex items-center gap-3.5 px-4 py-3 w-full rounded-xl text-sm font-semibold tracking-wide text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 hover:text-zinc-800 dark:hover:text-zinc-100 border border-transparent transition-all mb-2"
          >
            <Store className="h-4.5 w-4.5" />
            Aller à l&apos;accueil
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-4 py-3 w-full rounded-xl text-sm font-semibold tracking-wide text-zinc-500 dark:text-zinc-450 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-650 dark:hover:text-red-400 border border-transparent hover:border-red-200/30 transition-all"
          >
            <LogOut className="h-4.5 w-4.5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-between px-6 md:hidden">
          <Link href="/admin" className="font-bold text-lg text-amber-500 tracking-wider" style={{ fontFamily: "var(--font-cormorant)" }}>
            Dia&apos;Rama Admin
          </Link>
          <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 text-xs font-bold shadow-[0_0_8px_rgba(245,158,11,0.1)]">A</div>
        </header>
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto bg-zinc-50/50 dark:bg-zinc-950/50">
          {children}
        </div>
      </main>
    </div>
  )
}
