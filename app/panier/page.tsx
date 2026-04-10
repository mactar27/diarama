"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, Tag, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCart } from "@/lib/cart-context"
import { formatPrice, promoCodes } from "@/lib/data"
import { toast } from "sonner"

export default function CartPage() {
  const {
    items,
    promoCode,
    promoDiscount,
    updateQuantity,
    removeItem,
    applyPromo,
    removePromo,
    subtotal,
    discount,
    total,
  } = useCart()

  const [promoInput, setPromoInput] = useState("")

  const handleApplyPromo = () => {
    const code = promoCodes.find(
      c => c.code.toLowerCase() === promoInput.toLowerCase() && c.active
    )
    if (code) {
      if (subtotal < code.minOrder) {
        toast.error(
          `Commande minimum de ${formatPrice(code.minOrder)} requise pour ce code`
        )
        return
      }
      applyPromo(code.code, code.discount)
      toast.success(`Code promo appliqué: -${code.discount}%`)
      setPromoInput("")
    } else {
      toast.error("Code promo invalide")
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="font-serif text-2xl font-semibold mb-4">
                Votre panier est vide
              </h1>
              <p className="text-muted-foreground mb-8">
                Découvrez notre collection de cosmétiques haut de gamme et
                ajoutez vos produits préférés au panier.
              </p>
              <Button asChild>
                <Link href="/boutique">
                  Découvrir la boutique
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
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
            Votre Panier
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-card rounded-lg border"
                >
                  {/* Image */}
                  <Link
                    href={`/produit/${item.product.id}`}
                    className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted shrink-0"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          href={`/produit/${item.product.id}`}
                          className="font-medium hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {item.product.category}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive shrink-0"
                        onClick={() => {
                          removeItem(item.product.id)
                          toast.success("Produit retiré du panier")
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <p className="font-semibold text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-cream rounded-lg p-6 sticky top-32">
                <h2 className="font-semibold text-lg mb-6">
                  Récapitulatif de commande
                </h2>

                {/* Promo code */}
                <div className="mb-6">
                  {promoCode ? (
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{promoCode}</span>
                        <span className="text-sm text-primary">
                          (-{promoDiscount}%)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          removePromo()
                          toast.success("Code promo retiré")
                        }}
                      >
                        Retirer
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Code promo"
                        value={promoInput}
                        onChange={e => setPromoInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyPromo}
                        disabled={!promoInput}
                      >
                        Appliquer
                      </Button>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Réduction</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span>
                      {subtotal >= 25000 ? (
                        <span className="text-green-600">Gratuite</span>
                      ) : (
                        formatPrice(2500)
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(total + (subtotal >= 25000 ? 0 : 2500))}
                    </span>
                  </div>
                </div>

                {subtotal < 25000 && (
                  <p className="text-xs text-muted-foreground mt-4">
                    Plus que {formatPrice(25000 - subtotal)} pour la livraison
                    gratuite !
                  </p>
                )}

                <Button className="w-full mt-6" size="lg" asChild>
                  <Link href="/checkout">
                    Passer commande
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant="link"
                  className="w-full mt-2"
                  asChild
                >
                  <Link href="/boutique">Continuer mes achats</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
