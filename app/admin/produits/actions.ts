"use server"

import { revalidatePath } from "next/cache"
import { createProduct, updateProduct, deleteProduct } from "@/lib/admin-data"
import { Product } from "@/lib/data"

export async function addProductAction(productData: Omit<Product, "id">) {
  try {
    await createProduct(productData)
    revalidatePath("/admin/produits")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to add product" }
  }
}

export async function editProductAction(id: string, productData: Partial<Product>) {
  try {
    await updateProduct(id, productData)
    revalidatePath("/admin/produits")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update product" }
  }
}

export async function deleteProductAction(id: string) {
  try {
    await deleteProduct(id)
    revalidatePath("/admin/produits")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete product" }
  }
}
