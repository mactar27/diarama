"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { updateOrderStatusAction } from "../actions"
import { toast } from "sonner"

export function StatusForm({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const res = await updateOrderStatusAction(orderId, status)
    
    if (res.success) {
      toast.success("Statut mis à jour avec succès")
    } else {
      toast.error(res.error || "Une erreur est survenue")
    }
    
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <select 
        value={status} 
        onChange={(e) => setStatus(e.target.value)} 
        className="border rounded-md px-3 py-1 text-sm bg-background"
        disabled={isPending}
      >
        <option value="pending">En attente</option>
        <option value="processing">En préparation</option>
        <option value="shipped">Expédié</option>
        <option value="delivered">Livré</option>
        <option value="cancelled">Annulé</option>
      </select>
      <Button type="submit" size="sm" disabled={isPending || status === currentStatus}>
        {isPending ? "..." : "Mettre à jour"}
      </Button>
    </form>
  )
}
