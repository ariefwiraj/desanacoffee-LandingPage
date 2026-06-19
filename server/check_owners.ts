import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'desana_coffee',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

async function checkOwners() {
  const result = await pool.query('SELECT id, email, password, name FROM owners');
  console.log('Total owners:', result.rowCount);
  console.log(result.rows);
  pool.end();
}

checkOwners();
