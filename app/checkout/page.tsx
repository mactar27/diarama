"use client"

import { useState } from "react"
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
import { formatPrice } from "@/lib/data"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, discount, total, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const shippingCost = 2500
  const finalTotal = total + shippingCost

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    clearCart()
    toast.success("Commande confirmée !")
    router.push("/confirmation")
  }

  if (items.length === 0) {
    router.push("/panier")
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
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                      />
                    </Field>
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
                      <FieldLabel htmlFor="address">Adresse</FieldLabel>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Numéro et nom de rue"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="address2">
                        Complément d&apos;adresse (optionnel)
                      </FieldLabel>
                      <Input
                        id="address2"
                        name="address2"
                        placeholder="Appartement, bâtiment, étage..."
                      />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="city">Ville</FieldLabel>
                        <Input id="city" name="city" required />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="region">Région</FieldLabel>
                        <Input id="region" name="region" required />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="notes">
                        Instructions de livraison (optionnel)
                      </FieldLabel>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Instructions spéciales pour le livreur..."
                        rows={3}
                      />
                    </Field>
                  </FieldGroup>
                </section>

                {/* Payment method */}
                <section className="bg-card rounded-lg border p-6">
                  <h2 className="font-semibold text-lg mb-6">
                    Mode de paiement
                  </h2>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label
                        htmlFor="card"
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Carte bancaire</p>
                          <p className="text-sm text-muted-foreground">
                            Visa, Mastercard, etc.
                          </p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <RadioGroupItem value="mobile" id="mobile" />
                      <Label
                        htmlFor="mobile"
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <svg
                          className="h-5 w-5 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="5" y="2" width="14" height="20" rx="2" />
                          <line x1="12" y1="18" x2="12" y2="18" />
                        </svg>
                        <div>
                          <p className="font-medium">Mobile Money</p>
                          <p className="text-sm text-muted-foreground">
                            Orange Money, Wave, Free Money
                          </p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label
                        htmlFor="cash"
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <Banknote className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Paiement à la livraison</p>
                          <p className="text-sm text-muted-foreground">
                            Payez en espèces à la réception
                          </p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4">
                      <Field>
                        <FieldLabel htmlFor="cardNumber">
                          Numéro de carte
                        </FieldLabel>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field>
                          <FieldLabel htmlFor="expiry">Expiration</FieldLabel>
                          <Input id="expiry" placeholder="MM/AA" required />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                          <Input id="cvv" placeholder="123" required />
                        </Field>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "mobile" && (
                    <div className="mt-6">
                      <Field>
                        <FieldLabel htmlFor="mobileNumber">
                          Numéro Mobile Money
                        </FieldLabel>
                        <Input
                          id="mobileNumber"
                          type="tel"
                          placeholder="+221 XX XXX XX XX"
                          required
                        />
                      </Field>
                    </div>
                  )}
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
                      <span>
                        {formatPrice(shippingCost)}
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
