import pool from './db';

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

export interface PromoCode {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minOrder: number
  active: boolean
}

// Global categories for navigation (SSR optimized)
export async function getCategories(): Promise<Category[]> {
  const [rows] = await pool.execute('SELECT * FROM categories');
  return rows as Category[];
}

export async function getProducts(): Promise<Product[]> {
  const [rows] = await pool.execute('SELECT * FROM products');
  return (rows as any[]).map(row => ({
    ...row,
    images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
    featured: Boolean(row.featured),
    new: Boolean(row.new),
    bestseller: Boolean(row.bestseller)
  }));
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
  const product = (rows as any[])[0];
  if (!product) return undefined;
  
  return {
    ...product,
    images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
    featured: Boolean(product.featured),
    new: Boolean(product.new),
    bestseller: Boolean(product.bestseller)
  };
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const [rows] = await pool.execute('SELECT * FROM products WHERE categorySlug = ?', [categorySlug]);
  return (rows as any[]).map(row => ({
    ...row,
    images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
    featured: Boolean(row.featured),
    new: Boolean(row.new),
    bestseller: Boolean(row.bestseller)
  }));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const [rows] = await pool.execute('SELECT * FROM products WHERE featured = 1');
  return (rows as any[]).map(row => ({
    ...row,
    images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
    featured: Boolean(row.featured),
    new: Boolean(row.new),
    bestseller: Boolean(row.bestseller)
  }));
}

export async function getNewProducts(): Promise<Product[]> {
  const [rows] = await pool.execute('SELECT * FROM products WHERE new = 1');
  return (rows as any[]).map(row => ({
    ...row,
    images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
    featured: Boolean(row.featured),
    new: Boolean(row.new),
    bestseller: Boolean(row.bestseller)
  }));
}

export async function getBestsellerProducts(): Promise<Product[]> {
  const [rows] = await pool.execute('SELECT * FROM products WHERE bestseller = 1');
  return (rows as any[]).map(row => ({
    ...row,
    images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
    featured: Boolean(row.featured),
    new: Boolean(row.new),
    bestseller: Boolean(row.bestseller)
  }));
}

export async function searchProducts(query: string): Promise<Product[]> {
  const lowercaseQuery = `%${query.toLowerCase()}%`;
  const [rows] = await pool.execute(
    'SELECT * FROM products WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?',
    [lowercaseQuery, lowercaseQuery, lowercaseQuery]
  );
  return (rows as any[]).map(row => ({
    ...row,
    images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
    featured: Boolean(row.featured),
    new: Boolean(row.new),
    bestseller: Boolean(row.bestseller)
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const [rows] = await pool.execute('SELECT * FROM categories WHERE slug = ?', [slug]);
  return (rows as Category[])[0];
}

export async function getPromoCodes(): Promise<PromoCode[]> {
  const [rows] = await pool.execute('SELECT * FROM promo_codes WHERE active = 1');
  return rows as PromoCode[];
}

