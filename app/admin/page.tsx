export const dynamic = "force-dynamic"
import { getDashboardStats, getRecentOrders } from "@/lib/admin-data"
import { formatPrice } from "@/lib/utils"
import { Package, ShoppingCart, Users, Banknote, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  processing: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  delivered: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
}

const statusLabels: Record<string, string> = {
  pending: "En attente",
  processing: "En préparation",
  shipped: "Expédié",
  delivered: "Livré",
  cancelled: "Annulé",
}

interface KpiProps {
  label: string
  value: string
  sub: string
  icon: React.ElementType
  color: "amber" | "blue" | "emerald" | "violet"
  href?: string
}

function KpiCard({ label, value, sub, icon: Icon, color, href }: KpiProps) {
  const colorMap = {
    amber: { bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", glow: "shadow-[0_0_15px_rgba(245,158,11,0.08)]" },
    blue: { bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", glow: "shadow-[0_0_15px_rgba(59,130,246,0.08)]" },
    emerald: { bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", glow: "shadow-[0_0_15px_rgba(16,185,129,0.08)]" },
    violet: { bg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20", glow: "shadow-[0_0_15px_rgba(139,92,246,0.08)]" },
  }
  const theme = colorMap[color]

  const content = (
    <>
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-amber-500/5 to-transparent blur-md group-hover:scale-150 transition-transform duration-500" />
      <div className="flex items-center gap-3.5">
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105", theme.bg, theme.glow)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase truncate">{label}</p>
          <p className="mt-0.5 text-lg font-extrabold tracking-tight text-zinc-850 dark:text-zinc-100 truncate">{value}</p>
        </div>
      </div>
      <div className="mt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 pt-2.5">
        <span className="text-[11px] font-medium text-zinc-450 dark:text-zinc-500 truncate">{sub}</span>
      </div>
    </>
  )

  const classes = "relative block overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(245,158,11,0.05)] dark:hover:shadow-[0_8px_30px_rgba(245,158,11,0.05)] hover:border-amber-500/20 dark:hover:border-amber-500/30 transition-all duration-300 group hover:-translate-y-0.5"

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return <div className={classes}>{content}</div>
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()
  const recentOrders = await getRecentOrders(5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold tracking-wide text-zinc-850 dark:text-zinc-100">Vue d&apos;ensemble</h1>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Données synchronisées avec la base de données.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Chiffre d'affaires" value={formatPrice(stats.totalRevenue)} sub="Revenu cumulé" icon={Banknote} color="amber" />
        <KpiCard label="Commandes" value={String(stats.totalOrders)} sub="Total des ventes" icon={ShoppingCart} color="blue" href="/admin/commandes" />
        <KpiCard label="Produits" value={String(stats.totalProducts)} sub="Références catalogue" icon={Package} color="emerald" href="/admin/produits" />
        <KpiCard label="Clients" value={String(stats.totalClients)} sub="Comptes enregistrés" icon={Users} color="violet" href="/admin/clients" />
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="px-6 py-4.5 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold tracking-wide text-zinc-850 dark:text-zinc-100">Commandes récentes</h2>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">Dernières 5</span>
          </div>
          <Link href="/admin/commandes" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
            Voir tout <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800/80">
              <tr>
                <th className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase">ID Commande</th>
                <th className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase">Client</th>
                <th className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase">Date</th>
                <th className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase">Statut</th>
                <th className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-zinc-400 dark:text-zinc-500 font-light">
                    Aucune commande pour le moment
                  </td>
                </tr>
              ) : (
                recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-zinc-700 dark:text-zinc-350">{order.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-zinc-800 dark:text-zinc-100">{order.customerName}</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{order.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-500 dark:text-zinc-400">{new Date(order.createdAt).toLocaleDateString("fr-FR")}</td>
                    <td className="px-6 py-4">
                      <Badge className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide border shadow-none", statusColors[order.status])}>
                        {statusLabels[order.status]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-zinc-800 dark:text-zinc-100">
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
