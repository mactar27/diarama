import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function CGVPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/pattern-bg.png')] bg-fixed bg-cream/30">
      <Header />
      
      <main className="flex-1 py-16 md:py-24 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 -z-10" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase mb-4 text-sm">Informations Légales</p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">
              Conditions Générales de Vente
            </h1>
            <div className="h-1 w-24 bg-primary mx-auto mt-8 rounded-full" />
          </div>
          
          <div className="bg-card shadow-2xl rounded-2xl p-8 md:p-14 border border-border/50">
            <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-10">
              
              <div className="flex items-start gap-6 group">
                <div className="hidden sm:flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center text-primary font-serif font-bold text-xl shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">1</div>
                <div>
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Objet</h2>
                  <p className="leading-relaxed font-light">
                    Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits cosmétiques effectuées sur le site Dia'Rama. Elles définissent les droits et obligations des parties dans le cadre de la vente en ligne de nos collections prestigieuses.
                  </p>
                </div>
              </div>
              
              <div className="h-px w-full bg-border/50" />
              
              <div className="flex items-start gap-6 group">
                <div className="hidden sm:flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center text-primary font-serif font-bold text-xl shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">2</div>
                <div>
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Produits et Prix</h2>
                  <p className="leading-relaxed font-light">
                    Les caractéristiques essentielles de nos produits sont décrites sur chaque page produit avec le plus grand soin. Les prix sont indiqués en Francs CFA (FCFA) toutes taxes comprises (TTC), hors frais de livraison. Dia'Rama se réserve le droit de modifier ses prix à tout moment pour garantir l'excellence de ses ingrédients.
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-border/50" />

              <div className="flex items-start gap-6 group">
                <div className="hidden sm:flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center text-primary font-serif font-bold text-xl shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">3</div>
                <div>
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Commandes et Paiement</h2>
                  <p className="leading-relaxed font-light">
                    Toute commande validée constitue une acceptation irrévocable. Pour votre confort, le règlement des achats s'effectue soit par paiement à la livraison en espèces, soit via les solutions sécurisées Mobile Money disponibles lors du passage en caisse.
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-border/50" />

              <div className="flex items-start gap-6 group">
                <div className="hidden sm:flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center text-primary font-serif font-bold text-xl shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">4</div>
                <div>
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Livraison de Luxe</h2>
                  <p className="leading-relaxed font-light">
                    La livraison est effectuée à l'adresse indiquée par vos soins, avec un conditionnement protecteur garantissant l'intégrité de vos cosmétiques. Les délais de livraison sont fournis à titre indicatif. Les frais de livraison sont calculés de manière transparente lors du paiement.
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-border/50" />

              <div className="flex items-start gap-6 group">
                <div className="hidden sm:flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center text-primary font-serif font-bold text-xl shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">5</div>
                <div>
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Retours et Remboursements</h2>
                  <p className="leading-relaxed font-light">
                    En raison de la nature délicate de nos soins et pour des raisons strictes d'hygiène, les produits cosmétiques ouverts ou utilisés ne peuvent être ni repris ni échangés. En cas de produit défectueux à la réception, notre service client VIP est à votre écoute sous 48 heures.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
