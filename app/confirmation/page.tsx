import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Commande confirmée | Dia'Rama",
  description: "Votre commande a été confirmée avec succès.",
}

export default function ConfirmationPage() {
  const orderNumber = `DR${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            {/* Success icon */}
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="font-serif text-3xl font-semibold mb-4">
              Commande confirmée !
            </h1>
            <p className="text-muted-foreground mb-8">
              Merci pour votre commande. Vous recevrez un email de confirmation
              avec les détails de votre commande.
            </p>

            {/* Order number */}
            <div className="bg-cream rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                Numéro de commande
              </p>
              <p className="text-2xl font-semibold text-primary">
                {orderNumber}
              </p>
            </div>

            {/* Next steps */}
            <div className="text-left bg-card rounded-lg border p-6 mb-8">
              <h2 className="font-semibold mb-4">Prochaines étapes</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-medium text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Confirmation par email</p>
                    <p className="text-sm text-muted-foreground">
                      Vous recevrez un email avec le récapitulatif de votre
                      commande
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-medium text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Préparation</p>
                    <p className="text-sm text-muted-foreground">
                      Notre équipe prépare votre colis avec soin
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Livraison</p>
                    <p className="text-sm text-muted-foreground">
                      Votre commande sera livrée sous 2-5 jours ouvrables
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/compte/commandes">
                  Suivre ma commande
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/boutique">Continuer mes achats</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
