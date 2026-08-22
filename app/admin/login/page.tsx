"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        toast.success("Connexion réussie")
        router.push("/admin")
      } else {
        toast.error("Identifiants incorrects")
        setIsLoading(false)
      }
    } catch (error) {
      toast.error("Une erreur est survenue")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 text-zinc-800 dark:text-zinc-200">
      <div className="relative w-full max-w-md p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-14 w-14 bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)] flex items-center justify-center rounded-2xl mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide text-zinc-850 dark:text-zinc-100" style={{ fontFamily: "var(--font-cormorant)" }}>
            Dia&apos;Rama Admin
          </h1>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500 font-light tracking-wide">
            Espace d&apos;administration sécurisé
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="email" value="admin@diarama.com" />
          
          <div className="space-y-2">
            <FieldLabel htmlFor="password" className="text-xs text-zinc-500 dark:text-zinc-400 tracking-wider uppercase font-bold">Mot de passe</FieldLabel>
            <div className="relative">
              <Input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                required 
                className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:border-amber-500/50 focus:ring-amber-500/10 text-zinc-800 dark:text-zinc-100 rounded-xl placeholder:text-zinc-300 dark:placeholder:text-zinc-700 h-11 pr-10 w-full"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold tracking-wide rounded-xl shadow-[0_4px_15px_rgba(245,158,11,0.15)] border-none h-11" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  )
}
