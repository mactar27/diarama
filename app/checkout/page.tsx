"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, CreditCard, Banknote, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"
import { createOrderAction } from "./actions"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, discount, total, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const shippingCost = 0
  const finalTotal = total + shippingCost

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const orderData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      items,
      subtotal,
      discount,
      shippingCost,
      total: finalTotal
    }

    const res = await createOrderAction(orderData)

    if (res.success) {
      clearCart()
      toast.success("Commande confirmée !")
      router.push("/confirmation")
    } else {
      toast.error("Erreur lors de la création de la commande")
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (items.length === 0) {
      router.push("/panier")
    }
  }, [items.length, router])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            href="/panier"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour au panier
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
            Finaliser la commande
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact info */}
                <section className="bg-card rounded-lg border p-6">
                  <h2 className="font-semibold text-lg mb-6">
                    Informations de contact
                  </h2>
                  <FieldGroup>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="firstName">Prénom</FieldLabel>
                        <Input id="firstName" name="firstName" required />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="lastName">Nom</FieldLabel>
                        <Input id="lastName" name="lastName" required />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+221 XX XXX XX XX"
                        required
                      />
                    </Field>
                  </FieldGroup>
                </section>

                {/* Shipping address */}
                <section className="bg-card rounded-lg border p-6">
                  <h2 className="font-semibold text-lg mb-6">
                    Adresse de livraison
                  </h2>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="address">Adresse complète</FieldLabel>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Quartier, numéro et nom de rue..."
                        required
                      />
                    </Field>
                  </FieldGroup>
                </section>

                {/* Payment method */}
                <section className="bg-card rounded-lg border p-6">
                  <h2 className="font-semibold text-lg mb-6">
                    Mode de paiement
                  </h2>
                  <div className="flex items-start gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-full text-primary mt-1">
                      <Banknote className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Paiement à la livraison</p>
                      <p className="text-muted-foreground mt-1">
                        Afin de vous faciliter la vie, le paiement s'effectuera uniquement en espèces au moment de la réception de votre commande.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    {"J'accepte les"}{" "}
                    <Link href="/cgv" className="text-primary hover:underline">
                      conditions générales de vente
                    </Link>{" "}
                    et la{" "}
                    <Link
                      href="/confidentialite"
                      className="text-primary hover:underline"
                    >
                      politique de confidentialité
                    </Link>
                  </Label>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-cream rounded-lg p-6 sticky top-32">
                  <h2 className="font-semibold text-lg mb-6">
                    Votre commande
                  </h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map(item => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded bg-muted shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded"
                          />
                          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

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
                      <span className="text-muted-foreground font-medium text-right">
                        Calculée à la livraison
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Traitement en cours..."
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Confirmer la commande
                      </>
                    )}
                  </Button>


                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
