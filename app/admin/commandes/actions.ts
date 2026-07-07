"use server"

import { updateOrderStatus } from "@/lib/admin-data"
import { revalidatePath } from "next/cache"

export async function updateOrderStatusAction(id: string, status: string) {
  try {
    await updateOrderStatus(id, status)
    revalidatePath("/admin")
    revalidatePath("/admin/commandes")
    revalidatePath(`/admin/commandes/${id}`)
    return { success: true }
  } catch (error) {
    return { success: false, error: "Erreur lors de la mise à jour" }
  }
}
