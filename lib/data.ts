export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  categorySlug: string
  image: string
  images: string[]
  stock: number
  rating: number
  reviews: number
  featured: boolean
  new: boolean
  bestseller: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Parfums",
    slug: "parfums",
    description: "Fragrances exquises pour femme",
    image: "/images/categories/parfums.jpg",
    productCount: 2,
  },
  {
    id: "2",
    name: "Déodorants",
    slug: "deodorants",
    description: "Protection fraîcheur longue durée",
    image: "/images/categories/deodorants.jpg",
    productCount: 1,
  },
  {
    id: "3",
    name: "Laits Corporels",
    slug: "laits-corporels",
    description: "Hydratation intense pour le corps",
    image: "/images/categories/laits.jpg",
    productCount: 2,
  },
  {
    id: "4",
    name: "Crèmes Expert",
    slug: "cremes-expert",
    description: "Soins ciblés haute performance",
    image: "/images/categories/cremes.jpg",
    productCount: 2,
  },
  {
    id: "5",
    name: "Sérums",
    slug: "serums",
    description: "Concentrés de beauté premium",
    image: "/images/categories/serums.jpg",
    productCount: 1,
  },
  {
    id: "6",
    name: "Soins Réparateurs",
    slug: "soins-reparateurs",
    description: "Réparation et protection intense",
    image: "/images/categories/soins.jpg",
    productCount: 1,
  },
  {
    id: "7",
    name: "Huiles Corporelles",
    slug: "huiles-corporelles",
    description: "Nutrition et éclat pour la peau",
    image: "/images/categories/huiles.jpg",
    productCount: 1,
  },
]

export const products: Product[] = [
  // Parfums
  {
    id: "p1",
    name: "Suddenly Femelle",
    description: "Un parfum envoûtant aux notes florales et sensuelles. Cette fragrance captivante allie la douceur des fleurs blanches à la chaleur des bois précieux, créant une signature olfactive inoubliable.",
    price: 5000,
    category: "Parfums",
    categorySlug: "parfums",
    image: "/images/products/suddenly-femelle.jpg",
    images: ["/images/products/suddenly-femelle.jpg"],
    stock: 25,
    rating: 4.8,
    reviews: 124,
    featured: true,
    new: false,
    bestseller: true,
  },
  {
    id: "p2",
    name: "Suddenly Mystique Original",
    description: "Une essence mystérieuse qui révèle votre beauté intérieure. Notes de tête fraîches, coeur floral intense et fond boisé ambré pour une présence magnétique.",
    price: 5000,
    category: "Parfums",
    categorySlug: "parfums",
    image: "/images/products/suddenly-mystique.jpg",
    images: ["/images/products/suddenly-mystique.jpg"],
    stock: 18,
    rating: 4.9,
    reviews: 89,
    featured: true,
    new: true,
    bestseller: false,
  },
  // Déodorants
  {
    id: "p3",
    name: "Dove Déodorant Spray Femme",
    description: "Protection 48h avec soin hydratant. Formule douce enrichie en 1/4 de crème hydratante pour des aisselles douces et protégées toute la journée.",
    price: 2000,
    category: "Déodorants",
    categorySlug: "deodorants",
    image: "/images/products/dove-deodorant.jpg",
    images: ["/images/products/dove-deodorant.jpg"],
    stock: 50,
    rating: 4.6,
    reviews: 256,
    featured: false,
    new: false,
    bestseller: true,
  },
  // Laits Corporels
  {
    id: "p4",
    name: "Mixa Urea Cica Repair+",
    description: "Lait corporel réparateur intensif à l'urée et au panthénol. Apaise, répare et hydrate les peaux très sèches et irritées. Résultats visibles dès la première application.",
    price: 6000,
    category: "Laits Corporels",
    categorySlug: "laits-corporels",
    image: "/images/products/mixa-urea-lait.jpg",
    images: ["/images/products/mixa-urea-lait.jpg"],
    stock: 35,
    rating: 4.7,
    reviews: 178,
    featured: true,
    new: false,
    bestseller: false,
  },
  {
    id: "p5",
    name: "Mixa Niacinamide Bright",
    description: "Lait corporel éclat à la niacinamide. Unifie le teint, réduit les taches et révèle l'éclat naturel de votre peau. Texture légère non grasse.",
    price: 6000,
    category: "Laits Corporels",
    categorySlug: "laits-corporels",
    image: "/images/products/mixa-niacinamide-lait.jpg",
    images: ["/images/products/mixa-niacinamide-lait.jpg"],
    stock: 42,
    rating: 4.8,
    reviews: 143,
    featured: false,
    new: true,
    bestseller: false,
  },
  // Crèmes Expert
  {
    id: "p6",
    name: "Niacinamide Correction Éclat",
    description: "Crème expert anti-taches à la niacinamide pure. Corrige les imperfections, unifie le teint et booste l'éclat. Résultats cliniquement prouvés.",
    price: 8500,
    category: "Crèmes Expert",
    categorySlug: "cremes-expert",
    image: "/images/products/creme-niacinamide.jpg",
    images: ["/images/products/creme-niacinamide.jpg"],
    stock: 28,
    rating: 4.9,
    reviews: 92,
    featured: true,
    new: false,
    bestseller: true,
  },
  {
    id: "p7",
    name: "Urea Cica Repair+ Crème",
    description: "Crème expert réparatrice intense. Formule concentrée en urée et Cica pour les zones très sèches et abîmées. Réparation visible en 3 jours.",
    price: 8500,
    category: "Crèmes Expert",
    categorySlug: "cremes-expert",
    image: "/images/products/creme-urea-cica.jpg",
    images: ["/images/products/creme-urea-cica.jpg"],
    stock: 22,
    rating: 4.7,
    reviews: 67,
    featured: false,
    new: false,
    bestseller: false,
  },
  // Sérums
  {
    id: "p8",
    name: "Sérum Anti-Imperfections Mixa Expert",
    description: "Sérum concentré anti-imperfections à la niacinamide et zinc. Réduit les pores, matifie et clarifie la peau. Texture ultra-légère à absorption rapide.",
    price: 9000,
    category: "Sérums",
    categorySlug: "serums",
    image: "/images/products/serum-mixa.jpg",
    images: ["/images/products/serum-mixa.jpg"],
    stock: 15,
    rating: 4.9,
    reviews: 203,
    featured: true,
    new: true,
    bestseller: true,
  },
  // Soins Réparateurs
  {
    id: "p9",
    name: "Pommade Ultra-Réparatrice Mixa Cica 10-en-1",
    description: "Pommade multi-usage réparatrice intense. 10 bénéfices en un seul soin: répare, apaise, protège, nourrit. Idéale pour toute la famille.",
    price: 10000,
    category: "Soins Réparateurs",
    categorySlug: "soins-reparateurs",
    image: "/images/products/pommade-mixa.jpg",
    images: ["/images/products/pommade-mixa.jpg"],
    stock: 20,
    rating: 4.8,
    reviews: 156,
    featured: true,
    new: false,
    bestseller: false,
  },
  // Huiles Corporelles
  {
    id: "p10",
    name: "Vaseline Cocoa Radiant Huile en Gel",
    description: "Huile corporelle en gel au beurre de cacao. Nourrit intensément et sublime la peau d'un éclat satiné. Absorption rapide, fini non gras.",
    price: 6000,
    category: "Huiles Corporelles",
    categorySlug: "huiles-corporelles",
    image: "/images/products/vaseline-cocoa.jpg",
    images: ["/images/products/vaseline-cocoa.jpg"],
    stock: 38,
    rating: 4.6,
    reviews: 189,
    featured: false,
    new: false,
    bestseller: true,
  },
]

export const promoCodes = [
  {
    code: "BIENVENUE20",
    discount: 20,
    type: "percentage" as const,
    minOrder: 10000,
    active: true,
  },
  {
    code: "LUXE10",
    discount: 10,
    type: "percentage" as const,
    minOrder: 15000,
    active: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.new)
}

export function getBestsellerProducts(): Product[] {
  return products.filter(p => p.bestseller)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery)
  )
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
}
