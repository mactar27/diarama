"use server"

import { updateOrderStatus, deleteAllOrders } from "@/lib/admin-data"
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

export async function deleteAllOrdersAction() {
  try {
    await deleteAllOrders()
    revalidatePath("/admin")
    revalidatePath("/admin/commandes")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Erreur lors de la suppression de toutes les commandes" }
  }
}
