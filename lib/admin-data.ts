import pool from './db';
import { Product, Category } from './data';

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  items: any;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export async function getDashboardStats() {
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
}

export async function getRecentOrders(limit: number = 5): Promise<Order[]> {
  const [rows] = await pool.execute('SELECT * FROM orders ORDER BY createdAt DESC LIMIT ?', [limit]);
  return (rows as any[]).map(row => ({
    ...row,
    items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items
  }));
}

export async function getAllOrders(): Promise<Order[]> {
  const [rows] = await pool.execute('SELECT * FROM orders ORDER BY createdAt DESC');
  return (rows as any[]).map(row => ({
    ...row,
    items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items
  }));
}

export async function getUniqueClients() {
  const [rows] = await pool.execute('SELECT customerName, customerEmail, COUNT(*) as orderCount, SUM(total) as totalSpent, MAX(createdAt) as lastOrder FROM orders GROUP BY customerEmail, customerName ORDER BY lastOrder DESC');
  return rows as any[];
}
