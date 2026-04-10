import Link from "next/link"
import { Package, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/data"

const orders = [
  {
    id: "DR12345678",
    date: "15 mars 2024",
    status: "delivered",
    statusLabel: "Livré",
    total: 23000,
    items: 3,
  },
  {
    id: "DR12345677",
    date: "10 mars 2024",
    status: "shipped",
    statusLabel: "Expédié",
    total: 15000,
    items: 2,
  },
  {
    id: "DR12345676",
    date: "5 mars 2024",
    status: "processing",
    statusLabel: "En préparation",
    total: 8500,
    items: 1,
  },
]

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function OrdersPage() {
  if (orders.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-12 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-semibold text-lg mb-2">Aucune commande</h2>
        <p className="text-muted-foreground mb-6">
          Vous n&apos;avez pas encore passé de commande.
        </p>
        <Button asChild>
          <Link href="/boutique">Découvrir la boutique</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg mb-6">Historique des commandes</h2>

      {orders.map(order => (
        <div
          key={order.id}
          className="bg-card rounded-lg border p-6 hover:border-primary/50 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-medium">{order.id}</h3>
                <Badge className={statusColors[order.status]}>
                  {order.statusLabel}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Commandé le {order.date} • {order.items} article
                {order.items > 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold text-primary">
                {formatPrice(order.total)}
              </p>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/compte/commandes/${order.id}`}>
                  Détails
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
