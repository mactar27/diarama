import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ShieldCheck, Lock, EyeOff, Share2 } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream/30">
      <Header />
      
      <main className="flex-1">
        {/* Elegant Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24 border-b border-primary/10">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6 text-primary">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6 text-foreground">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Chez Dia'Rama, la protection de votre vie privée est aussi précieuse que votre beauté. Découvrez comment nous protégeons vos données.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12">
              
              <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <EyeOff className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">1. Collecte des Données</h2>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Dans le cadre de votre navigation et de vos achats exclusifs sur le site Dia'Rama, nous collectons avec votre accord des données personnelles essentielles (nom, prénom, adresse, contact) pour assurer un service sur-mesure et irréprochable.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Lock className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">2. Sécurité Maximale</h2>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Nous déployons des protocoles de sécurité de pointe (chiffrement, serveurs sécurisés) pour garantir que vos informations restent strictement confidentielles et à l'abri de toute intrusion malveillante.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow md:col-span-2">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Share2 className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">3. Utilisation et Partage</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                  <div>
                    <h3 className="font-semibold mb-3">Comment nous les utilisons :</h3>
                    <ul className="space-y-3 text-muted-foreground font-light">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span> Le traitement et le suivi de vos commandes.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span> Un service après-vente personnalisé.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span> L'envoi de nos offres privilèges (avec votre accord).
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Notre promesse :</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      Dia'Rama s'engage formellement à <strong>ne jamais vendre ni céder</strong> vos données personnelles à des tiers à des fins commerciales. Vos informations ne sont partagées qu'avec nos partenaires logistiques de confiance, uniquement pour assurer la livraison de vos trésors.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-16 text-center bg-primary text-primary-foreground p-10 rounded-2xl shadow-xl bg-[url('/images/pattern-bg.png')] bg-cover bg-blend-overlay">
              <h2 className="text-2xl font-serif font-semibold mb-4">Vos Droits</h2>
              <p className="max-w-2xl mx-auto opacity-90 font-light mb-6">
                Vous restez maître de vos informations. Vous disposez d'un droit total d'accès, de rectification et de suppression de vos données personnelles à tout instant.
              </p>
              <p className="font-medium">
                Contactez notre responsable de la confidentialité à : <br/>
                <a href="mailto:contact@diarama.com" className="text-xl underline underline-offset-4 mt-2 inline-block">contact@diarama.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
