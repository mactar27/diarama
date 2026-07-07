import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-cream py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
              À propos de Dia'Rama
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              L'excellence au service de votre beauté. Découvrez l'histoire et les valeurs qui animent notre marque.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src="/images/logo.png"
                  alt="Notre Histoire"
                  fill
                  className="object-contain p-12"
                />
              </div>
              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-semibold">
                  Notre Histoire
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dia'Rama est née d'une passion profonde pour la beauté africaine et d'un engagement inébranlable envers l'excellence. Depuis nos débuts, notre mission a toujours été claire : vous offrir des produits cosmétiques haut de gamme qui révèlent et subliment votre beauté naturelle.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nous puisons notre inspiration dans les secrets de beauté ancestraux, que nous allions aux innovations cosmétiques modernes pour créer des formules uniques. Chaque produit de notre collection est le fruit d'une recherche minutieuse et d'une sélection rigoureuse d'ingrédients de première qualité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-semibold text-center mb-16">
              Nos Valeurs
            </h2>
            <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-2xl">
                  ✨
                </div>
                <h3 className="font-semibold text-xl">Excellence</h3>
                <p className="text-muted-foreground">
                  Nous ne faisons aucun compromis sur la qualité de nos produits. Chaque formule est testée et approuvée pour garantir des résultats optimaux.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-2xl">
                  🌿
                </div>
                <h3 className="font-semibold text-xl">Authenticité</h3>
                <p className="text-muted-foreground">
                  Nous valorisons les ingrédients naturels et les traditions de beauté qui ont traversé les générations, en les adaptant à vos besoins actuels.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-2xl">
                  💖
                </div>
                <h3 className="font-semibold text-xl">Bien-être</h3>
                <p className="text-muted-foreground">
                  Votre peau mérite le meilleur. Nos produits sont conçus pour la respecter, la nourrir et vous procurer une véritable sensation de bien-être.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
