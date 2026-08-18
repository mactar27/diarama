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
    // Make customerEmail nullable
    await connection.execute('ALTER TABLE orders MODIFY COLUMN customerEmail VARCHAR(255) NULL');
    
    // Add phone and address columns if they don't exist
    try {
      await connection.execute('ALTER TABLE orders ADD COLUMN phone VARCHAR(50) NULL');
    } catch (e) { console.log('phone column might already exist'); }
    
    try {
      await connection.execute('ALTER TABLE orders ADD COLUMN address TEXT NULL');
    } catch (e) { console.log('address column might already exist'); }
    
    console.log('Orders table altered successfully');
  } catch (error) {
    console.error('Error altering database:', error);
  } finally {
    await connection.end();
  }
}

alterDb();
