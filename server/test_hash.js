const bcrypt = require('bcryptjs');

async function fix() {
  const hash = await bcrypt.hash('desana2024', 10);
  console.log('Correct hash:', hash);
}

fix();
