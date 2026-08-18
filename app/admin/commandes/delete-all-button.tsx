"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { deleteAllOrdersAction } from "./actions"

export function DeleteAllButton() {
  const [isPending, setIsPending] = useState(false)

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer TOUTES les commandes ? Cette action est irréversible.")
    if (!confirmDelete) return

    setIsPending(true)
    try {
      const res = await deleteAllOrdersAction()
      if (res.success) {
        toast.success("Toutes les commandes ont été supprimées.")
      } else {
        toast.error(res.error || "Une erreur est survenue.")
      }
    } catch (error) {
      toast.error("Erreur de connexion.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      className="gap-2"
      onClick={handleDeleteAll}
      disabled={isPending}
    >
      <Trash2 className="h-4 w-4" />
      {isPending ? "Suppression..." : "Tout supprimer"}
    </Button>
  )
}
