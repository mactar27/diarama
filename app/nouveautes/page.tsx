import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { getNewProducts } from "@/lib/data"

export const metadata = {
  title: "Nouveautés | Dia'Rama",
  description: "Découvrez les dernières nouveautés de notre collection de cosmétiques haut de gamme.",
}

export default function NouveautesPage() {
  const newProducts = getNewProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="mb-12 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Nouveautés
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les dernières additions à notre collection de cosmétiques 
              haut de gamme. Des produits innovants pour sublimer votre beauté.
            </p>
          </div>

          {/* Products grid */}
          {newProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                De nouvelles merveilles arrivent bientôt...
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
