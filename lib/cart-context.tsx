"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { Product } from "./data"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  promoCode: string | null
  promoDiscount: number
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_PROMO"; code: string; discount: number }
  | { type: "REMOVE_PROMO" }
  | { type: "LOAD_CART"; state: CartState }

const initialState: CartState = {
  items: [],
  promoCode: null,
  promoDiscount: 0,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        item => item.product.id === action.product.id
      )
      if (existingIndex >= 0) {
        const newItems = [...state.items]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + (action.quantity || 1),
        }
        return { ...state, items: newItems }
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: action.quantity || 1 }],
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.productId),
      }
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== action.productId),
        }
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      }
    }
    case "CLEAR_CART":
      return initialState
    case "APPLY_PROMO":
      return {
        ...state,
        promoCode: action.code,
        promoDiscount: action.discount,
      }
    case "REMOVE_PROMO":
      return {
        ...state,
        promoCode: null,
        promoDiscount: 0,
      }
    case "LOAD_CART":
      return action.state
    default:
      return state
  }
}

interface CartContextType {
  items: CartItem[]
  promoCode: string | null
  promoDiscount: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  applyPromo: (code: string, discount: number) => void
  removePromo: () => void
  subtotal: number
  discount: number
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("diarama-cart")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        dispatch({ type: "LOAD_CART", state: parsed })
      } catch (e) {
        console.error("Failed to load cart:", e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("diarama-cart", JSON.stringify(state))
  }, [state])

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const discount = state.promoDiscount > 0 ? (subtotal * state.promoDiscount) / 100 : 0
  const total = subtotal - discount
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const value: CartContextType = {
    items: state.items,
    promoCode: state.promoCode,
    promoDiscount: state.promoDiscount,
    addItem: (product, quantity) =>
      dispatch({ type: "ADD_ITEM", product, quantity }),
    removeItem: productId => dispatch({ type: "REMOVE_ITEM", productId }),
    updateQuantity: (productId, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    applyPromo: (code, discount) =>
      dispatch({ type: "APPLY_PROMO", code, discount }),
    removePromo: () => dispatch({ type: "REMOVE_PROMO" }),
    subtotal,
    discount,
    total,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
