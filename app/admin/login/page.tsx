"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-950 via-black to-zinc-900 p-4 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[120px]" />
      </div>
      <div className="relative w-full max-w-md p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-14 w-14 bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center justify-center rounded-2xl mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-amber-500" style={{ fontFamily: "var(--font-cormorant)" }}>
            Dia&apos;Rama Admin
          </h1>
          <p className="mt-1 text-xs text-zinc-400 font-light tracking-wide">
            Espace d&apos;administration sécurisé
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="email" value="admin@diarama.com" />
          
          <div className="space-y-2">
            <FieldLabel htmlFor="password" className="text-xs text-zinc-300 tracking-wider uppercase font-bold">Mot de passe</FieldLabel>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="••••••••"
              required 
              className="bg-black/40 border-zinc-800 focus:border-amber-500/50 focus:ring-amber-500/20 text-white rounded-xl placeholder:text-zinc-600 h-11"
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-semibold tracking-wide rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.3)] transition-all duration-300 border-none h-11" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  )
}
