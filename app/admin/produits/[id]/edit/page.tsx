import { ProductForm } from "../../product-form"
import { getProductById } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function EditProduitPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Modifier le produit</h1>
      <ProductForm initialData={product} />
    </div>
  )
}
