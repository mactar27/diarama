require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

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
  // Connect without specifying database first, to create it
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306'),
    ssl: process.env.DB_SSL === 'true' ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined,
  });

  const dbName = process.env.DB_NAME || 'diarama_db';
  await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await connection.execute(`USE \`${dbName}\``);
  console.log(`Connected and using database: ${dbName}`);

  try {
    // Create tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        image VARCHAR(255),
        productCount INT DEFAULT 0
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        price INT NOT NULL,
        category VARCHAR(100),
        categorySlug VARCHAR(100),
        image VARCHAR(255),
        images JSON,
        stock INT DEFAULT 0,
        rating DECIMAL(2, 1) DEFAULT 0.0,
        reviews INT DEFAULT 0,
        featured BOOLEAN DEFAULT FALSE,
        new BOOLEAN DEFAULT FALSE,
        bestseller BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categorySlug) REFERENCES categories(slug) ON DELETE SET NULL
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS promo_codes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        discount INT NOT NULL,
        type VARCHAR(20) DEFAULT 'percentage',
        minOrder INT DEFAULT 0,
        active BOOLEAN DEFAULT TRUE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        customerEmail VARCHAR(255) NOT NULL,
        customerName VARCHAR(255),
        items JSON NOT NULL,
        subtotal INT NOT NULL,
        discount INT DEFAULT 0,
        shipping INT DEFAULT 2500,
        total INT NOT NULL,
        status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Schema created successfully.');
    // Seed Admin
    const adminPasswordHash = await bcrypt.hash('D1ar@ma_2026_SecuR!ty', 10);
    await connection.execute(
      'INSERT IGNORE INTO admins (email, password_hash) VALUES (?, ?)',
      ['admin@diarama.com', adminPasswordHash]
    );
    console.log('Admin user seeded.');

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
