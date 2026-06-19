const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function fixDb() {
  try {
    const hash = '$2a$10$s/Jfu2S.oyZSil8v7.Py3unAYuEsxiemqVBiL96PCn2n48G6Iz2ym';
    await pool.query('UPDATE owners SET password = $1 WHERE email = $2', [hash, 'admin@desana.com']);
    console.log('Admin password updated successfully.');
  } catch (err) {
    console.error('Error updating owners table:', err.message);
  } finally {
    pool.end();
  }
}

fixDb();
