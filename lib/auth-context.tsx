"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface UserSession {
  name: string
  email: string
  phone?: string
}

interface AuthContextType {
  user: UserSession | null
  isLoading: boolean
  login: (user: UserSession) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("diarama-user")
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch (e) {}
    }
    setIsLoading(false)
  }, [])

  const login = (userData: UserSession) => {
    localStorage.setItem("diarama-user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("diarama-user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
