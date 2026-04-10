"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/data"

// Demo wishlist - in a real app this would come from user data
const wishlistProductIds = ["p1", "p6", "p8"]
const wishlistProducts = products.filter(p => wishlistProductIds.includes(p.id))

export default function WishlistPage() {
  if (wishlistProducts.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-12 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-semibold text-lg mb-2">
          Votre liste de souhaits est vide
        </h2>
        <p className="text-muted-foreground mb-6">
          Parcourez notre boutique et ajoutez vos produits préférés à votre
          liste de souhaits.
        </p>
        <Button asChild>
          <Link href="/boutique">Découvrir la boutique</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">
          Ma liste de souhaits ({wishlistProducts.length})
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
