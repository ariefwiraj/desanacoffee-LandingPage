import fs from 'fs';
import path from 'path';
import pool from '../config/db';

async function runMigrations(): Promise<void> {
  console.log('🔄 Running database migrations...\n');

  const migrationsDir = path.join(__dirname);
  const sqlFiles = fs.readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  if (sqlFiles.length === 0) {
    console.log('No SQL migration files found.');
    return;
  }

  const client = await pool.connect();

  try {
    for (const file of sqlFiles) {
      console.log(`📄 Executing: ${file}`);
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');

      await client.query(sql);
      console.log(`✅ Completed: ${file}\n`);
    }

    console.log('🎉 All migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();
