import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function createDb() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'postgres', // connect to default db
  });

  try {
    await client.connect();
    const dbName = process.env.DB_NAME || 'desana_coffee';
    
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`);
    if (res.rowCount === 0) {
      console.log(`Database "${dbName}" not found, creating it...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log('Database created successfully.');
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDb();
