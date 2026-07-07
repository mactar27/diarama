import pool from './db';
import { Product, Category } from './data';

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  phone?: string;
  address?: string;
  items: any;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export async function getDashboardStats() {
  try {
    const [orders] = await pool.execute('SELECT COUNT(*) as count, SUM(total) as revenue FROM orders WHERE status != "cancelled"');
    const [products] = await pool.execute('SELECT COUNT(*) as count FROM products');
    const [clients] = await pool.execute('SELECT COUNT(DISTINCT customerEmail) as count FROM orders');
    
    const o = (orders as any[])[0];
    const p = (products as any[])[0];
    const c = (clients as any[])[0];

    return {
      totalOrders: o.count || 0,
      totalRevenue: o.revenue || 0,
      totalProducts: p.count || 0,
      totalClients: c.count || 0
    };
  } catch (e) {
    console.error('getDashboardStats error:', e);
    return { totalOrders: 0, totalRevenue: 0, totalProducts: 0, totalClients: 0 };
  }
}

export async function getRecentOrders(limit: number = 5): Promise<Order[]> {
  try {
    const [rows] = await pool.execute(`SELECT * FROM orders ORDER BY createdAt DESC LIMIT ${Number(limit)}`);
    return (rows as any[]).map(row => ({
      ...row,
      items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items
    }));
  } catch (e) {
    console.error('getRecentOrders error:', e);
    return [];
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const [rows] = await pool.execute('SELECT * FROM orders ORDER BY createdAt DESC');
    return (rows as any[]).map(row => ({
      ...row,
      items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items
    }));
  } catch (e) {
    console.error('getAllOrders error:', e);
    return [];
  }
}

export async function getUniqueClients() {
  try {
    const [rows] = await pool.execute('SELECT customerName, customerEmail, COUNT(*) as orderCount, SUM(total) as totalSpent, MAX(createdAt) as lastOrder FROM orders GROUP BY customerEmail, customerName ORDER BY lastOrder DESC');
    return rows as any[];
  } catch (e) {
    console.error('getUniqueClients error:', e);
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const [rows] = await pool.execute('SELECT * FROM orders WHERE id = ?', [id]);
    const row = (rows as any[])[0];
    if (!row) return null;
    return {
      ...row,
      items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items
    };
  } catch (e) {
    console.error('getOrderById error:', e);
    return null;
  }
}

export async function createProduct(product: Omit<Product, 'id'>) {
  const id = 'p' + Date.now();
  try {
    await pool.execute(
      'INSERT INTO products (id, name, description, price, category, categorySlug, image, images, stock, rating, reviews, featured, new, bestseller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        product.name,
        product.description,
        product.price,
        product.category,
        product.categorySlug,
        product.image,
        JSON.stringify(product.images || []),
        product.stock,
        product.rating || 0,
        product.reviews || 0,
        product.featured ? 1 : 0,
        product.new ? 1 : 0,
        product.bestseller ? 1 : 0
      ]
    );
    return id;
  } catch (e) {
    console.error('createProduct error:', e);
    throw e;
  }
}

export async function updateProduct(id: string, product: Partial<Product>) {
  try {
    const fields = Object.keys(product).filter(k => k !== 'id');
    const values = fields.map(k => {
      let val = (product as any)[k];
      if (k === 'images') return JSON.stringify(val);
      if (k === 'featured' || k === 'new' || k === 'bestseller') return val ? 1 : 0;
      return val;
    });
    
    if (fields.length === 0) return true;
    
    const setClause = fields.map(f => `\`${f}\` = ?`).join(', ');
    values.push(id);
    
    await pool.execute(`UPDATE products SET ${setClause} WHERE id = ?`, values);
    return true;
  } catch (e) {
    console.error('updateProduct error:', e);
    throw e;
  }
}

export async function deleteProduct(id: string) {
  try {
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    return true;
  } catch (e) {
    console.error('deleteProduct error:', e);
    throw e;
  }
}

