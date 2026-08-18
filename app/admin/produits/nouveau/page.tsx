import { ProductForm } from "../product-form"

export default function NouveauProduitPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Ajouter un produit</h1>
      <ProductForm />
    </div>
  )
}
