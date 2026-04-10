import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { getBestsellerProducts } from "@/lib/data"

export const metadata = {
  title: "Bestsellers | Dia'Rama",
  description: "Découvrez nos produits les plus populaires, les favoris de nos clients.",
}

export default function BestsellersPage() {
  const bestsellerProducts = getBestsellerProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="mb-12 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Bestsellers
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nos produits les plus appréciés par notre communauté. 
              Des valeurs sûres plébiscitées par des milliers de clients satisfaits.
            </p>
          </div>

          {/* Products grid */}
          {bestsellerProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestsellerProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                Nos bestsellers arrivent bientôt...
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
