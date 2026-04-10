import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { categories, getFeaturedProducts, getNewProducts, getBestsellerProducts } from "@/lib/data"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const newProducts = getNewProducts()
  const bestsellerProducts = getBestsellerProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="Dia'Rama Cosmétiques de Luxe"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-xl">
              <p className="text-primary font-medium mb-4 tracking-wider uppercase">
                Bienvenue chez Dia&apos;Rama
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-balance leading-tight">
                La beauté africaine sublimée
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Découvrez notre collection exclusive de cosmétiques haut de gamme, 
                inspirés des secrets de beauté africains.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/boutique">
                    Découvrir la collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/nouveautes">Nouveautés</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                Nos Catégories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explorez notre gamme complète de produits cosmétiques de luxe
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.slice(0, 8).map((category) => (
                <Link
                  key={category.id}
                  href={`/boutique?category=${category.slug}`}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-muted"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent z-10" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="font-medium text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-white/80">
                      {category.productCount} produit{category.productCount > 1 ? "s" : ""}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-2">
                  Produits Vedettes
                </h2>
                <p className="text-muted-foreground">
                  Nos produits les plus appréciés par nos clients
                </p>
              </div>
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link href="/boutique">
                  Voir tout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" asChild>
                <Link href="/boutique">
                  Voir tout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* New Products */}
        {newProducts.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-2">
                    Nouveautés
                  </h2>
                  <p className="text-muted-foreground">
                    Les dernières additions à notre collection
                  </p>
                </div>
                <Button variant="outline" asChild className="hidden sm:flex">
                  <Link href="/nouveautes">
                    Voir tout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {newProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bestsellers */}
        {bestsellerProducts.length > 0 && (
          <section className="py-16 md:py-24 bg-cream">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-2">
                    Bestsellers
                  </h2>
                  <p className="text-muted-foreground">
                    Les favoris de nos clients
                  </p>
                </div>
                <Button variant="outline" asChild className="hidden sm:flex">
                  <Link href="/bestsellers">
                    Voir tout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bestsellerProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Dia'Rama - Notre Histoire"
                  fill
                  className="object-contain p-8"
                />
              </div>
              <div>
                <p className="text-primary font-medium mb-4 tracking-wider uppercase">
                  Notre Histoire
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                  L&apos;excellence au service de votre beauté
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Dia&apos;Rama est née de la passion pour la beauté africaine et de 
                  l&apos;engagement envers l&apos;excellence. Notre mission est de vous offrir 
                  des produits cosmétiques haut de gamme qui révèlent votre beauté 
                  naturelle tout en respectant votre peau.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Chaque produit de notre collection est soigneusement sélectionné 
                  pour sa qualité exceptionnelle et son efficacité prouvée. Nous 
                  croyons que la beauté est un art, et nous sommes là pour vous 
                  accompagner dans votre voyage vers la perfection.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/a-propos">
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
