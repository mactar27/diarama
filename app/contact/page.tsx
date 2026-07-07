import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel } from "@/components/ui/field"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream/30">
      <Header />
      
      <main className="flex-1">
        {/* Elegant Hero Section */}
        <section className="relative py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-semibold mb-6 tracking-wide">
              Contactez-Nous
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light">
              Une question sur nos produits ? Besoin d'un conseil beauté ? 
              Notre équipe d'experts est à votre entière disposition.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 -mt-12 md:-mt-16 relative z-20 pb-24">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            
            {/* Contact Information Cards (Glassmorphism inspired) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-background/80 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2">Par Téléphone</h3>
                <p className="text-muted-foreground mb-4 font-light">Pour une assistance immédiate et personnalisée.</p>
                <p className="text-xl font-medium tracking-wide">+221 77 000 00 00</p>
              </div>

              <div className="bg-background/80 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2">Par Email</h3>
                <p className="text-muted-foreground mb-4 font-light">Nous vous répondrons dans les plus brefs délais.</p>
                <p className="text-lg font-medium">contact@diarama.com</p>
              </div>

              <div className="bg-background/80 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2">Notre Boutique</h3>
                <p className="text-muted-foreground mb-4 font-light">Venez découvrir nos senteurs et textures sur place.</p>
                <p className="font-medium">Dakar, Sénégal</p>
                <p className="text-sm text-muted-foreground mt-1">Lundi au Samedi, de 9h à 19h</p>
              </div>
            </div>

            {/* Premium Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border/50 h-full">
                <h2 className="text-3xl font-serif font-semibold mb-2">Écrivez-nous</h2>
                <p className="text-muted-foreground mb-8 font-light">Remplissez le formulaire ci-dessous et laissez la magie opérer.</p>
                
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field>
                      <FieldLabel htmlFor="firstName" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Prénom</FieldLabel>
                      <Input id="firstName" placeholder="Votre prénom" className="h-12 bg-muted/30 border-muted focus:border-primary transition-colors" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="lastName" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Nom</FieldLabel>
                      <Input id="lastName" placeholder="Votre nom" className="h-12 bg-muted/30 border-muted focus:border-primary transition-colors" />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="email" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Adresse Email</FieldLabel>
                    <Input id="email" type="email" placeholder="votre@email.com" className="h-12 bg-muted/30 border-muted focus:border-primary transition-colors" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="subject" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Sujet</FieldLabel>
                    <Input id="subject" placeholder="De quoi souhaitez-vous nous parler ?" className="h-12 bg-muted/30 border-muted focus:border-primary transition-colors" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="message" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Message</FieldLabel>
                    <Textarea id="message" placeholder="Votre message détaillé ici..." rows={6} className="bg-muted/30 border-muted focus:border-primary transition-colors resize-none" />
                  </Field>
                  <Button size="lg" className="w-full h-14 text-lg mt-4 group">
                    Envoyer le message
                    <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
