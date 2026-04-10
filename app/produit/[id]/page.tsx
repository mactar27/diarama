"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Star,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/lib/cart-context"
import {
  getProductById,
  getProductsByCategory,
  formatPrice,
  type Product,
} from "@/lib/data"
import { toast } from "sonner"
import { cn } from "@/lib/utils"



export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}

function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const similarProducts = getProductsByCategory(product.categorySlug)
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`${product.name} ajouté au panier`)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(q => q + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Accueil</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/boutique">Boutique</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/boutique?category=${product.categorySlug}`}>
                    {product.category}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Product section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={product.images[selectedImage] || product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.new && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Nouveau
                  </Badge>
                )}
                {product.bestseller && (
                  <Badge
                    variant="secondary"
                    className="absolute top-4 left-4 bg-accent text-accent-foreground"
                  >
                    Bestseller
                  </Badge>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  {product.category}
                </p>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} avis)
                  </span>
                </div>

                {/* Price */}
                <p className="text-3xl font-semibold text-primary mb-6">
                  {formatPrice(product.price)}
                </p>

                {/* Stock status */}
                <div className="mb-6">
                  {product.stock > 0 ? (
                    <p className="text-sm text-green-600 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      En stock ({product.stock} disponibles)
                    </p>
                  ) : (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-destructive" />
                      Rupture de stock
                    </p>
                  )}
                </div>
              </div>

              {/* Quantity and actions */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Ajouter au panier
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => toast.success("Ajouté à la liste de souhaits")}
                >
                  <Heart className="h-5 w-5" />
                  Ajouter aux favoris
                </Button>
              </div>


            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Détails
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Avis ({product.reviews})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="max-w-3xl">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="pt-6">
              <div className="max-w-3xl">
                <dl className="space-y-4">
                  <div className="flex">
                    <dt className="w-40 font-medium">Catégorie</dt>
                    <dd className="text-muted-foreground">{product.category}</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-40 font-medium">Référence</dt>
                    <dd className="text-muted-foreground uppercase">
                      {product.id}
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-40 font-medium">Disponibilité</dt>
                    <dd className="text-muted-foreground">
                      {product.stock > 0 ? "En stock" : "Rupture de stock"}
                    </dd>
                  </div>
                </dl>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-center">
                    <p className="text-4xl font-semibold">{product.rating}</p>
                    <div className="flex items-center justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(product.rating)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.reviews} avis
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Les avis clients seront disponibles prochainement.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Similar products */}
          {similarProducts.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-semibold mb-8">
                Produits similaires
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {similarProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
