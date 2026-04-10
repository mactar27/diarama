"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Filter, SlidersHorizontal, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { products, categories, formatPrice } from "@/lib/data"

type SortOption = "newest" | "price-asc" | "price-desc" | "popular" | "rating"

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Nouveautés" },
  { value: "popular", label: "Popularité" },
  { value: "rating", label: "Meilleures notes" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
]

const priceRanges = [
  { min: 0, max: 3000, label: "Moins de 3 000 FCFA" },
  { min: 3000, max: 6000, label: "3 000 - 6 000 FCFA" },
  { min: 6000, max: 9000, label: "6 000 - 9 000 FCFA" },
  { min: 9000, max: Infinity, label: "Plus de 9 000 FCFA" },
]

function BoutiqueContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || ""
  const initialSearch = searchParams.get("search") || ""

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000])
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [inStockOnly, setInStockOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p =>
        selectedCategories.includes(p.categorySlug)
      )
    }

    // Price filter
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(p => p.stock > 0)
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
        break
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    return filtered
  }, [searchQuery, selectedCategories, priceRange, sortBy, inStockOnly])

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(c => c !== slug)
        : [...prev, slug]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setPriceRange([0, 15000])
    setInStockOnly(false)
  }

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 15000 ||
    inStockOnly

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          Catégories
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {categories.map(category => (
            <div key={category.slug} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${category.slug}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => toggleCategory(category.slug)}
              />
              <Label
                htmlFor={`cat-${category.slug}`}
                className="text-sm cursor-pointer flex-1"
              >
                {category.name}
              </Label>
              <span className="text-xs text-muted-foreground">
                ({category.productCount})
              </span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          Prix
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <Slider
            value={priceRange}
            onValueChange={value => setPriceRange(value as [number, number])}
            min={0}
            max={15000}
            step={500}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Stock */}
      <div className="flex items-center gap-2 py-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={checked => setInStockOnly(checked as boolean)}
        />
        <Label htmlFor="in-stock" className="cursor-pointer">
          En stock uniquement
        </Label>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Effacer les filtres
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">
              Boutique
            </h1>
            <p className="text-muted-foreground">
              Découvrez notre collection de cosmétiques haut de gamme
            </p>
          </div>

          {/* Search and controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile filter button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres
                    {hasActiveFilters && (
                      <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5" />
                      Filtres
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select
                value={sortBy}
                onValueChange={value => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32">
                <h2 className="font-medium mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres
                </h2>
                <FilterContent />
              </div>
            </aside>

            {/* Product grid */}
            <div className="flex-1">
              {/* Results count */}
              <p className="text-sm text-muted-foreground mb-6">
                {filteredProducts.length} produit
                {filteredProducts.length !== 1 ? "s" : ""} trouvé
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    Aucun produit trouvé
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement de la boutique...</div>}>
      <BoutiqueContent />
    </Suspense>
  )
}
