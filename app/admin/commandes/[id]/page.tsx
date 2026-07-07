import { getOrderById } from "@/lib/admin-data"
import { formatPrice } from "@/lib/utils"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Phone, MessageCircle } from "lucide-react"
import { StatusForm } from "./status-form"

export default async function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrderById(id)

  if (!order) {
    notFound()
  }

  const cleanPhone = (order.phone || "").replace(/\s+/g, '')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/commandes" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Commande #{order.id.slice(0, 8)}</h1>
          <span className="capitalize px-3 py-1 rounded-full text-sm bg-primary/10 text-primary font-medium">
            {order.status}
          </span>
        </div>
        
        <StatusForm orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Articles commandés</h2>
            <div className="space-y-4">
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 items-center p-3 rounded-lg border bg-muted/20">
                  <div className="h-16 w-16 bg-muted rounded overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {item.product?.image && (
                      <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product?.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(item.product?.price)} x {item.quantity}</p>
                  </div>
                  <div className="font-medium">
                    {formatPrice(item.product?.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Résumé financier</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frais de livraison</span>
                <span>{formatPrice(order.shipping)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Réduction</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="pt-3 border-t flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Informations Client</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Nom complet</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Téléphone</p>
                <p className="font-medium">{order.phone || order.customerEmail || "Non renseigné"}</p>
              </div>
              
              {cleanPhone && (
                <div className="flex gap-3 pt-4 border-t">
                  <a href={`https://wa.me/${cleanPhone.startsWith('221') ? cleanPhone : '221' + cleanPhone}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition-colors">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                  <a href={`tel:${cleanPhone}`} className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition-colors">
                    <Phone className="h-4 w-4" /> Appeler
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Adresse de livraison</h2>
            <p className="text-sm leading-relaxed">{order.address || "Non renseignée"}</p>
          </div>
          
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Date de commande</h2>
            <p className="text-sm">
              {new Date(order.createdAt).toLocaleString('fr-FR', { 
                dateStyle: 'full', 
                timeStyle: 'short' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
