"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { user } = useAuth()

  if (!user) return null

  const nameParts = user.name.split(" ")
  const firstName = nameParts[0] || ""
  const lastName = nameParts.slice(1).join(" ") || ""
  const initials = firstName.charAt(0) + (lastName.charAt(0) || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    toast.success("Profil mis à jour avec succès")
  }

  return (
    <div className="space-y-8">
      {/* Profile header */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {initials.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Membre depuis aujourd'hui
            </p>
          </div>
        </div>
      </div>

      {/* Profile form */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Informations personnelles</h2>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Modifier
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="firstName">Prénom</FieldLabel>
                <Input
                  id="firstName"
                  defaultValue={firstName}
                  disabled={!isEditing}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Nom</FieldLabel>
                <Input
                  id="lastName"
                  defaultValue={lastName}
                  disabled={!isEditing}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                disabled={!isEditing}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
              <Input
                id="phone"
                type="tel"
                defaultValue={user.phone || ""}
                disabled={!isEditing}
              />
            </Field>
          </FieldGroup>

          {isEditing && (
            <div className="flex gap-4 mt-6">
              <Button type="submit">Enregistrer</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </Button>
            </div>
          )}
        </form>
      </div>

      {/* Addresses */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Adresses de livraison</h2>
          <Button variant="outline">Ajouter une adresse</Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                Par défaut
              </span>
            </div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">
              123 Rue de la Paix
              <br />
              Dakar, Sénégal
              <br />
              {user.phone || "+221 77 000 00 00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
