import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dia'Rama - Cosmétiques Haut de Gamme",
  description: "Découvrez Dia'Rama, votre destination pour des cosmétiques de luxe inspirés de la beauté africaine. Parfums, soins corporels, crèmes et sérums haut de gamme.",
  keywords: ["cosmétiques", "luxe", "beauté africaine", "parfums", "soins corporels", "crèmes", "sérums"],
  generator: 'v0.app',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: "Dia'Rama - Cosmétiques Haut de Gamme",
    description: "Découvrez Dia'Rama, votre destination pour des cosmétiques de luxe inspirés de la beauté africaine.",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased bg-background text-foreground">
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
