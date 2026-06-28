require('dotenv').config();
const mysql = require('mysql2/promise');

const categories = [
  { id: "1", name: "Parfums", slug: "parfums", description: "Fragrances exquises pour femme", image: "/images/categories/parfums.jpg", productCount: 2 },
  { id: "2", name: "Déodorants", slug: "deodorants", description: "Protection fraîcheur longue durée", image: "/images/categories/deodorants.jpg", productCount: 1 },
  { id: "3", name: "Laits Corporels", slug: "laits-corporels", description: "Hydratation intense pour le corps", image: "/images/categories/laits.jpg", productCount: 2 },
  { id: "4", name: "Crèmes Expert", slug: "cremes-expert", description: "Soins ciblés haute performance", image: "/images/categories/cremes.jpg", productCount: 2 },
  { id: "5", name: "Sérums", slug: "serums", description: "Concentrés de beauté premium", image: "/images/categories/serums.jpg", productCount: 1 },
  { id: "6", name: "Soins Réparateurs", slug: "soins-reparateurs", description: "Réparation et protection intense", image: "/images/categories/soins.jpg", productCount: 1 },
  { id: "7", name: "Huiles Corporelles", slug: "huiles-corporelles", description: "Nutrition et éclat pour la peau", image: "/images/categories/huiles.jpg", productCount: 1 },
];

const products = [
  { id: "p1", name: "Suddenly Femelle", description: "Un parfum envoûtant aux notes florales et sensuelles.", price: 5000, category: "Parfums", categorySlug: "parfums", image: "/images/products/suddenly-femelle.jpg", images: ["/images/products/suddenly-femelle.jpg"], stock: 25, rating: 4.8, reviews: 124, featured: true, new: false, bestseller: true },
  { id: "p2", name: "Suddenly Mystique Original", description: "Une essence mystérieuse qui révèle votre beauté intérieure.", price: 5000, category: "Parfums", categorySlug: "parfums", image: "/images/products/suddenly-mystique.jpg", images: ["/images/products/suddenly-mystique.jpg"], stock: 18, rating: 4.9, reviews: 89, featured: true, new: true, bestseller: false },
  // ... more products can be added here
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'diarama_db',
  });

  console.log('Connected to MySQL. Seeding data...');

  try {
    // Seed Categories
    for (const cat of categories) {
      await connection.execute(
        'INSERT IGNORE INTO categories (id, name, slug, description, image, productCount) VALUES (?, ?, ?, ?, ?, ?)',
        [cat.id, cat.name, cat.slug, cat.description, cat.image, cat.productCount]
      );
    }
    console.log('Categories seeded.');

    // Seed Products
    for (const prod of products) {
      await connection.execute(
        'INSERT IGNORE INTO products (id, name, description, price, category, categorySlug, image, images, stock, rating, reviews, featured, new, bestseller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [prod.id, prod.name, prod.description, prod.price, prod.category, prod.categorySlug, prod.image, JSON.stringify(prod.images), prod.stock, prod.rating, prod.reviews, prod.featured, prod.new, prod.bestseller]
      );
    }
    console.log('Products seeded.');

    // Seed Promo Codes
    await connection.execute(
      'INSERT IGNORE INTO promo_codes (code, discount, type, minOrder, active) VALUES (?, ?, ?, ?, ?)',
      ['BIENVENUE20', 20, 'percentage', 10000, true]
    );
    await connection.execute(
      'INSERT IGNORE INTO promo_codes (code, discount, type, minOrder, active) VALUES (?, ?, ?, ?, ?)',
      ['LUXE10', 10, 'percentage', 15000, true]
    );
    console.log('Promo codes seeded.');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await connection.end();
  }
}

seed();
