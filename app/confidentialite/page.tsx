import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl font-semibold mb-8">
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Collecte des données</h2>
              <p>
                Dans le cadre de votre navigation et de vos achats sur le site Dia'Rama, nous collectons certaines données personnelles (nom, prénom, adresse, numéro de téléphone, email) indispensables au traitement de vos commandes et à l'amélioration de nos services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Utilisation des données</h2>
              <p>
                Vos données sont strictement utilisées pour :
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Le traitement et le suivi de vos commandes.</li>
                <li>La gestion de la relation client et du service après-vente.</li>
                <li>L'envoi de communications ou d'offres promotionnelles (si vous y avez consenti).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Protection et Sécurité</h2>
              <p>
                Nous mettons en œuvre toutes les mesures de sécurité techniques et organisationnelles nécessaires pour protéger vos données contre toute perte, accès non autorisé, modification ou divulgation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Partage des données</h2>
              <p>
                Dia'Rama s'engage à ne jamais vendre, louer ou céder vos données personnelles à des tiers à des fins commerciales. Elles peuvent uniquement être transmises à nos prestataires logistiques strictement pour assurer la livraison de vos commandes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Vos droits</h2>
              <p>
                Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ce droit à tout moment en nous contactant via notre adresse email : contact@diarama.com.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
