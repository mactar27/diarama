"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { type Product, formatPrice } from "@/lib/data"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.name} ajouté au panier`)
  }

  return (
    <div className={cn("group relative", className)}>
      <Link href={`/produit/${product.id}`} className="block">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.new && (
              <Badge className="bg-primary text-primary-foreground">
                Nouveau
              </Badge>
            )}
            {product.bestseller && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Bestseller
              </Badge>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full shadow-lg"
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                toast.success("Ajouté à la liste de souhaits")
              }}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Ajouter aux favoris</span>
            </Button>
          </div>

          {/* Add to cart overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={handleAddToCart}
              className="w-full gap-2"
              disabled={product.stock === 0}
            >
              <ShoppingBag className="h-4 w-4" />
              {product.stock > 0 ? "Ajouter au panier" : "Rupture de stock"}
            </Button>
          </div>
        </div>

        {/* Product info */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <p className="font-semibold text-primary">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </div>
  )
}
