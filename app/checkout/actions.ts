"use server"

import pool from "@/lib/db"

export async function createOrderAction(orderData: any) {
  const id = 'ord_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  try {
    await pool.execute(
      'INSERT INTO orders (id, customerEmail, customerName, phone, address, items, subtotal, discount, shipping, total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        orderData.phone, // Using phone as unique identifier for clients view
        `${orderData.firstName} ${orderData.lastName}`,
        orderData.phone,
        orderData.address,
        JSON.stringify(orderData.items),
        orderData.subtotal,
        orderData.discount,
        orderData.shippingCost,
        orderData.total,
        'pending'
      ]
    )
    return { success: true, id }
  } catch (error) {
    console.error("Order creation error:", error)
    return { success: false, error: "Impossible de créer la commande" }
  }
}
