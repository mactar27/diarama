"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { addProductAction, editProductAction } from "./actions"
import { toast } from "sonner"
import Link from "next/link"

export function ProductForm({ initialData }: { initialData?: Product }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageBase64, setImageBase64] = useState<string>(initialData?.image || "")
  const isEditing = !!initialData

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageBase64(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const CATEGORIES = [
    "Parfums",
    "Déodorants",
    "Laits Corporels",
    "Crèmes Expert",
    "Sérums",
    "Soins Réparateurs",
    "Huiles Corporelles"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    
    const categoryStr = formData.get("category") as string
    const categorySlugStr = categoryStr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
    
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      category: categoryStr,
      categorySlug: categorySlugStr,
      image: formData.get("image") as string,
      stock: Number(formData.get("stock")),
      featured: formData.get("featured") === "on",
      new: formData.get("new") === "on",
      bestseller: formData.get("bestseller") === "on",
    }

    try {
      let res;
      if (isEditing) {
        res = await editProductAction(initialData.id, productData)
      } else {
        res = await addProductAction(productData as any)
      }

      if (res.success) {
        toast.success(isEditing ? "Produit modifié avec succès" : "Produit ajouté avec succès")
        router.push("/admin/produits")
      } else {
        toast.error("Erreur: " + res.error)
        setIsSubmitting(false)
      }
    } catch (error) {
      toast.error("Une erreur est survenue")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl bg-card p-6 rounded-xl border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field>
          <FieldLabel htmlFor="name">Nom du produit</FieldLabel>
          <Input id="name" name="name" defaultValue={initialData?.name} required />
        </Field>
        
        <Field>
          <FieldLabel htmlFor="price">Prix (FCFA)</FieldLabel>
          <Input id="price" name="price" type="number" defaultValue={initialData?.price} required />
        </Field>

        <Field className="md:col-span-2">
          <FieldLabel htmlFor="category">Catégorie</FieldLabel>
          <select 
            id="category" 
            name="category" 
            defaultValue={initialData?.category || CATEGORIES[0]} 
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </Field>

        <Field className="md:col-span-2">
          <FieldLabel htmlFor="imageFile">Image principale</FieldLabel>
          <Input 
            id="imageFile" 
            name="imageFile" 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            required={!initialData?.image} 
          />
          {imageBase64 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Aperçu :</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageBase64} alt="Aperçu" className="h-32 w-auto rounded object-cover border" />
            </div>
          )}
          <input type="hidden" name="image" value={imageBase64} />
        </Field>

        <Field className="md:col-span-2">
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea id="description" name="description" rows={4} defaultValue={initialData?.description} required />
        </Field>
        
        <Field>
          <FieldLabel htmlFor="stock">Stock disponible</FieldLabel>
          <Input id="stock" name="stock" type="number" defaultValue={initialData?.stock ?? 0} required />
        </Field>
      </div>

      <div className="flex gap-6 pt-4 border-t">
        <div className="flex items-center space-x-2">
          <Checkbox id="featured" name="featured" defaultChecked={initialData?.featured} />
          <Label htmlFor="featured">Mis en avant (Accueil)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="new" name="new" defaultChecked={initialData?.new} />
          <Label htmlFor="new">Nouveauté</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="bestseller" name="bestseller" defaultChecked={initialData?.bestseller} />
          <Label htmlFor="bestseller">Bestseller</Label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t">
        <Button variant="outline" type="button" asChild>
          <Link href="/admin/produits">Annuler</Link>
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  )
}
