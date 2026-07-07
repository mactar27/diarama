import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel } from "@/components/ui/field"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
              Contactez-nous
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions. N'hésitez pas à nous écrire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-semibold mb-6">Nos Coordonnées</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Téléphone</h3>
                      <p className="text-muted-foreground">+221 77 000 00 00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">contact@diarama.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Boutique</h3>
                      <p className="text-muted-foreground">Dakar, Sénégal<br/>Ouvert du lundi au samedi, de 9h à 19h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-serif font-semibold mb-6">Envoyez-nous un message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="firstName">Prénom</FieldLabel>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastName">Nom</FieldLabel>
                    <Input id="lastName" placeholder="Votre nom" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea id="message" placeholder="Comment pouvons-nous vous aider ?" rows={5} />
                </Field>
                <Button className="w-full">
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
