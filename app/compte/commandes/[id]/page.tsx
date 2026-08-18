import Link from "next/link"
export const dynamic = "force-dynamic"
import { notFound } from "next/navigation"
import { ChevronLeft, Package, MapPin, CreditCard, CheckCircle2, Clock, Truck, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"

// Mock data — à remplacer par une vraie requête DB
const orders = [
  {
    id: "DR12345678",
    date: "15 mars 2024",
    status: "delivered",
    statusLabel: "Livré",
    total: 23000,
    subtotal: 20500,
    shipping: 2500,
    discount: 0,
    items: [
      { id: "p1", name: "Suddenly Femelle", price: 5000, quantity: 2, image: "/images/products/suddenly-femelle.jpg" },
      { id: "p2", name: "Suddenly Mystique Original", price: 10500, quantity: 1, image: "/images/products/suddenly-mystique.jpg" },
    ],
    address: {
      name: "John Doe",
      street: "123 Rue de la Paix",
      city: "Dakar",
      region: "Dakar",
      country: "Sénégal",
      phone: "+221 77 123 45 67",
    },
    paymentMethod: "Mobile Money (Wave)",
  },
  {
    id: "DR12345677",
    date: "10 mars 2024",
    status: "shipped",
    statusLabel: "Expédié",
    total: 15000,
    subtotal: 12500,
    shipping: 2500,
    discount: 0,
    items: [
      { id: "p2", name: "Suddenly Mystique Original", price: 5000, quantity: 2, image: "/images/products/suddenly-mystique.jpg" },
      { id: "p3", name: "Lait Corporel Karite", price: 2500, quantity: 1, image: "/images/products/lait.jpg" },
    ],
    address: {
      name: "John Doe",
      street: "123 Rue de la Paix",
      city: "Dakar",
      region: "Dakar",
      country: "Sénégal",
      phone: "+221 77 123 45 67",
    },
    paymentMethod: "Paiement à la livraison",
  },
  {
    id: "DR12345676",
    date: "5 mars 2024",
    status: "processing",
    statusLabel: "En préparation",
    total: 8500,
    subtotal: 6000,
    shipping: 2500,
    discount: 0,
    items: [
      { id: "p1", name: "Suddenly Femelle", price: 6000, quantity: 1, image: "/images/products/suddenly-femelle.jpg" },
    ],
    address: {
      name: "John Doe",
      street: "123 Rue de la Paix",
      city: "Dakar",
      region: "Dakar",
      country: "Sénégal",
      phone: "+221 77 123 45 67",
    },
    paymentMethod: "Carte bancaire",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending:    { label: "En attente",      color: "bg-yellow-100 text-yellow-800", icon: Clock },
  processing: { label: "En préparation",  color: "bg-blue-100 text-blue-800",    icon: Package },
  shipped:    { label: "Expédié",          color: "bg-purple-100 text-purple-800",icon: Truck },
  delivered:  { label: "Livré",            color: "bg-green-100 text-green-800",  icon: CheckCircle2 },
  cancelled:  { label: "Annulé",           color: "bg-red-100 text-red-800",      icon: XCircle },
}

const statusSteps = ["pending", "processing", "shipped", "delivered"]

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = orders.find(o => o.id === id)

  if (!order) notFound()

  const status = statusConfig[order.status] ?? statusConfig.pending
  const StatusIcon = status.icon
  const currentStepIndex = statusSteps.indexOf(order.status)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/compte/commandes">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Mes commandes
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-xl">{order.id}</h2>
          <p className="text-sm text-muted-foreground">Commandé le {order.date}</p>
        </div>
        <Badge className={`${status.color} flex items-center gap-1.5 px-3 py-1.5 text-sm`}>
          <StatusIcon className="h-4 w-4" />
          {status.label}
        </Badge>
      </div>

      {/* Progress tracker (hidden for cancelled) */}
      {order.status !== "cancelled" && (
        <div className="bg-card rounded-lg border p-6">
          <h3 className="font-medium mb-6">Suivi de commande</h3>
          <div className="relative flex justify-between">
            {/* Progress bar */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-primary transition-all"
              style={{
                width: currentStepIndex === -1 ? "0%" :
                  `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
              }}
            />

            {statusSteps.map((step, index) => {
              const cfg = statusConfig[step]
              const Icon = cfg.icon
              const done = index <= currentStepIndex
              return (
                <div key={step} className="relative flex flex-col items-center gap-2 z-10">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                      done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`text-xs text-center max-w-16 ${done ? "text-primary font-medium" : "text-muted-foreground"}`}>
                    {cfg.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Items */}
        <div className="md:col-span-2 bg-card rounded-lg border p-6">
          <h3 className="font-medium mb-4">Articles commandés</h3>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-muted shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qté : {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-semibold text-primary shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Réduction</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Livraison</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-base pt-1">
              <span>Total</span>
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          {/* Shipping address */}
          <div className="bg-card rounded-lg border p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Adresse de livraison</h3>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="text-foreground font-medium">{order.address.name}</p>
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.region}</p>
              <p>{order.address.country}</p>
              <p>{order.address.phone}</p>
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-card rounded-lg border p-5">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Mode de paiement</h3>
            </div>
            <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
          </div>

          {/* Actions */}
          {(order.status === "delivered") && (
            <Button variant="outline" className="w-full">
              Demander un retour
            </Button>
          )}
          {(order.status === "pending" || order.status === "processing") && (
            <Button variant="outline" className="w-full text-destructive hover:text-destructive">
              Annuler la commande
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
