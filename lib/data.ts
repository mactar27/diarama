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

function mapProduct(row: any): Product {
  return {
    ...row,
    images: typeof row.images === 'string' ? JSON.parse(row.images) : (row.images || []),
    featured: Boolean(row.featured),
    new: Boolean(row.new),
    bestseller: Boolean(row.bestseller)
  };
}

export async function getCategories(): Promise<Category[]> {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories');
    return rows as Category[];
  } catch (e) {
    console.error('getCategories error:', e);
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    return (rows as any[]).map(mapProduct);
  } catch (e) {
    console.error('getProducts error:', e);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    const product = (rows as any[])[0];
    if (!product) return undefined;
    return mapProduct(product);
  } catch (e) {
    console.error('getProductById error:', e);
    return undefined;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE categorySlug = ?', [categorySlug]);
    return (rows as any[]).map(mapProduct);
  } catch (e) {
    console.error('getProductsByCategory error:', e);
    return [];
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE featured = 1');
    return (rows as any[]).map(mapProduct);
  } catch (e) {
    console.error('getFeaturedProducts error:', e);
    return [];
  }
}

export async function getNewProducts(): Promise<Product[]> {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE `new` = 1');
    return (rows as any[]).map(mapProduct);
  } catch (e) {
    console.error('getNewProducts error:', e);
    return [];
  }
}

export async function getBestsellerProducts(): Promise<Product[]> {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE bestseller = 1');
    return (rows as any[]).map(mapProduct);
  } catch (e) {
    console.error('getBestsellerProducts error:', e);
    return [];
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const lowercaseQuery = `%${query.toLowerCase()}%`;
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?',
      [lowercaseQuery, lowercaseQuery, lowercaseQuery]
    );
    return (rows as any[]).map(mapProduct);
  } catch (e) {
    console.error('searchProducts error:', e);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories WHERE slug = ?', [slug]);
    return (rows as Category[])[0];
  } catch (e) {
    console.error('getCategoryBySlug error:', e);
    return undefined;
  }
}

export async function getPromoCodes(): Promise<PromoCode[]> {
  try {
    const [rows] = await pool.execute('SELECT * FROM promo_codes WHERE active = 1');
    return rows as PromoCode[];
  } catch (e) {
    console.error('getPromoCodes error:', e);
    return [];
  }
}
