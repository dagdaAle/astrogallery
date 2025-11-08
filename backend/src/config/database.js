import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Crea pool di connessioni MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'astrogallery',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connessione
pool.getConnection()
  .then(connection => {
    console.log('✅ Connesso al database MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Errore connessione MySQL:', err.message);
  });

// Helper per query (compatibilità con codice PostgreSQL)
const query = async (sql, params) => {
  const [rows] = await pool.execute(sql, params);
  return { rows };
};

export default { query };
export { pool };
