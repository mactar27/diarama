export const dynamic = "force-dynamic"
import { Suspense } from "react"
import { getProducts as fetchProducts, getCategories as fetchCategories } from "@/lib/data"
import { BoutiqueContent } from "./boutique-content"

export default async function BoutiquePage() {
  const initialProducts = await fetchProducts()
  const initialCategories = await fetchCategories()

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement de la boutique...</div>}>
      <BoutiqueContent initialProducts={initialProducts} initialCategories={initialCategories} />
    </Suspense>
  )
}
