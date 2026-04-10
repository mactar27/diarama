"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promotions: true,
  })

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Mot de passe mis à jour avec succès")
  }

  return (
    <div className="space-y-8">
      {/* Password */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="font-semibold text-lg mb-6">Changer le mot de passe</h2>
        <form onSubmit={handlePasswordSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="currentPassword">
                Mot de passe actuel
              </FieldLabel>
              <Input id="currentPassword" type="password" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="newPassword">
                Nouveau mot de passe
              </FieldLabel>
              <Input id="newPassword" type="password" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirmer le mot de passe
              </FieldLabel>
              <Input id="confirmPassword" type="password" required />
            </Field>
          </FieldGroup>
          <Button type="submit" className="mt-6">
            Mettre à jour
          </Button>
        </form>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="font-semibold text-lg mb-6">Préférences de notification</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notif" className="font-medium">
                Notifications par email
              </Label>
              <p className="text-sm text-muted-foreground">
                Recevez des mises à jour sur vos commandes par email
              </p>
            </div>
            <Switch
              id="email-notif"
              checked={notifications.email}
              onCheckedChange={checked =>
                setNotifications(prev => ({ ...prev, email: checked }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notif" className="font-medium">
                Notifications SMS
              </Label>
              <p className="text-sm text-muted-foreground">
                Recevez des alertes par SMS
              </p>
            </div>
            <Switch
              id="sms-notif"
              checked={notifications.sms}
              onCheckedChange={checked =>
                setNotifications(prev => ({ ...prev, sms: checked }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="promo-notif" className="font-medium">
                Offres et promotions
              </Label>
              <p className="text-sm text-muted-foreground">
                Recevez nos offres exclusives et codes promo
              </p>
            </div>
            <Switch
              id="promo-notif"
              checked={notifications.promotions}
              onCheckedChange={checked =>
                setNotifications(prev => ({ ...prev, promotions: checked }))
              }
            />
          </div>
        </div>
      </div>

      {/* Delete account */}
      <div className="bg-card rounded-lg border border-destructive/20 p-6">
        <h2 className="font-semibold text-lg mb-2 text-destructive">
          Zone de danger
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          La suppression de votre compte est irréversible. Toutes vos données
          seront définitivement supprimées.
        </p>
        <Button
          variant="destructive"
          onClick={() =>
            toast.error("Fonctionnalité désactivée en mode démo")
          }
        >
          Supprimer mon compte
        </Button>
      </div>
    </div>
  )
}
