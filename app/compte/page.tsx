"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

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
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-muted-foreground">john.doe@example.com</p>
            <p className="text-sm text-muted-foreground mt-1">
              Membre depuis janvier 2024
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
                  defaultValue="John"
                  disabled={!isEditing}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Nom</FieldLabel>
                <Input
                  id="lastName"
                  defaultValue="Doe"
                  disabled={!isEditing}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@example.com"
                disabled={!isEditing}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
              <Input
                id="phone"
                type="tel"
                defaultValue="+221 77 123 45 67"
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
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground">
              123 Rue de la Paix
              <br />
              Dakar, Sénégal
              <br />
              +221 77 123 45 67
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
