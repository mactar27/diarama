import { getUniqueClients } from "@/lib/admin-data"
import { formatPrice } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function AdminClientsPage() {
  const clients = await getUniqueClients()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gestion des Clients</h1>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Nom</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium text-center">Commandes</th>
                <th className="px-6 py-3 font-medium">Dépense Totale</th>
                <th className="px-6 py-3 font-medium">Dernière commande</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Aucun client trouvé.
                  </td>
                </tr>
              ) : (
                clients.map(client => (
                  <tr key={client.customerEmail || client.customerName} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{client.customerName || "Inconnu"}</td>
                    <td className="px-6 py-4 text-muted-foreground">{client.customerEmail || "-"}</td>
                    <td className="px-6 py-4 text-center">{client.orderCount}</td>
                    <td className="px-6 py-4 font-medium text-primary">{formatPrice(Number(client.totalSpent))}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(client.lastOrder).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
