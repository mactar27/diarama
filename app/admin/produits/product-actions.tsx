"use client"

import { useState } from "react"
import { Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { deleteProductAction } from "./actions"
import Link from "next/link"

export function ProductActions({ productId }: { productId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ? Cette action est irréversible.")) return
    
    setIsDeleting(true)
    const res = await deleteProductAction(productId)
    if (res.success) {
      toast.success("Produit supprimé")
    } else {
      toast.error("Erreur: " + res.error)
    }
    setIsDeleting(false)
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600" asChild>
        <Link href={`/admin/produits/${productId}/edit`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-destructive hover:text-destructive"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
