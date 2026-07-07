import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function CGVPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl font-semibold mb-8">
            Conditions Générales de Vente (CGV)
          </h1>
          
          <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Objet</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits cosmétiques effectuées sur le site Dia'Rama. Elles définissent les droits et obligations des parties dans le cadre de la vente en ligne.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Produits et Prix</h2>
              <p>
                Les caractéristiques essentielles de nos produits sont décrites sur chaque page produit. Les prix sont indiqués en Francs CFA (FCFA) toutes taxes comprises (TTC), hors frais de livraison. Dia'Rama se réserve le droit de modifier ses prix à tout moment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Commandes et Paiement</h2>
              <p>
                Toute commande validée constitue une acceptation irrévocable. Le règlement des achats s'effectue soit par paiement à la livraison, soit via les solutions Mobile Money disponibles au moment de la validation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Livraison</h2>
              <p>
                La livraison est effectuée à l'adresse indiquée par le client. Les délais de livraison sont fournis à titre indicatif. Un retard ne saurait donner lieu à des dommages et intérêts ou à l'annulation de la commande. Les frais de livraison sont calculés lors du passage en caisse.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Retours et Remboursements</h2>
              <p>
                Pour des raisons d'hygiène et de sécurité, les produits cosmétiques ouverts ou utilisés ne peuvent être ni repris ni échangés. En cas de produit défectueux à la réception, veuillez nous contacter sous 48 heures avec des preuves (photos).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Contact</h2>
              <p>
                Pour toute question relative aux présentes conditions, vous pouvez nous contacter via notre page de contact ou à l'adresse email contact@diarama.com.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
