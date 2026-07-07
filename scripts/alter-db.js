require('dotenv').config();
const mysql = require('mysql2/promise');

async function alterDb() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'diarama_db',
    port: parseInt(process.env.DB_PORT || '3306'),
    ssl: process.env.DB_SSL === 'true' ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined,
  });

  try {
    const [result] = await connection.execute('ALTER TABLE products MODIFY COLUMN image LONGTEXT');
    console.log('Database altered successfully:', result);
  } catch (error) {
    console.error('Error altering database:', error);
  } finally {
    await connection.end();
  }
}

alterDb();
