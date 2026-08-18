require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function updatePassword(newPassword) {
  if (!newPassword) {
    console.error("Please provide a new password");
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'diarama_db',
    port: parseInt(process.env.DB_PORT || '3306'),
    ssl: process.env.DB_SSL === 'true' ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined,
  });

  try {
    const adminPasswordHash = await bcrypt.hash(newPassword, 10);
    const [result] = await connection.execute(
      'UPDATE admins SET password_hash = ? WHERE email = ?',
      [adminPasswordHash, 'admin@diarama.com']
    );
    console.log(`Password updated successfully! Rows affected: ${result.affectedRows}`);
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await connection.end();
  }
}

updatePassword(process.argv[2]);
