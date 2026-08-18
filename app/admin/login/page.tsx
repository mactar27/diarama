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
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="bg-card w-full max-w-md p-8 rounded-xl border shadow-sm">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-16 w-16 bg-primary/10 flex items-center justify-center rounded-full mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-semibold mb-2">
            Administration Dia'Rama
          </h1>
          <p className="text-sm text-muted-foreground">
            Connectez-vous pour accéder au tableau de bord
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="email" value="admin@diarama.com" />
          
          <Field>
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="••••••••"
              required 
            />
          </Field>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  )
}
