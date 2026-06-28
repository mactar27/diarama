export const dynamic = "force-dynamic"
import { notFound } from "next/navigation"
import { getProductById, getProductsByCategory } from "@/lib/data"
import { ProductDetails } from "./product-details"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  const allSimilarProducts = await getProductsByCategory(product.categorySlug)
  const similarProducts = allSimilarProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  return <ProductDetails product={product} similarProducts={similarProducts} />
}
