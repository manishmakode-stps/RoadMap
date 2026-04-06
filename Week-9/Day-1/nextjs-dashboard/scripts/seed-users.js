const fs = require('fs');
const path = require('path');
const postgres = require('postgres');
const bcrypt = require('bcryptjs');

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;
  const env = fs.readFileSync(envPath, 'utf8');
  for (const line of env.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue;
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[match[1]]) {
      process.env[match[1]] = value;
    }
  }
}

async function main() {
  loadEnv();
  if (!process.env.POSTGRES_URL) {
    console.error('POSTGRES_URL is not set.');
    process.exit(1);
  }
  const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

  const users = [
    {
      id: '5f2a7b51-4d8c-4c3a-9c1e-9d8c2c9d0c11',
      name: 'Admin',
      email: 'admin@acme.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      id: '0b1b6b14-9f7f-4b1e-8f8d-5f1b34d3b3a2',
      name: 'Customer',
      email: 'customer@acme.com',
      password: 'customer123',
      role: 'customer',
    },
  ];

  try {
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'customer'`;
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await sql`
        INSERT INTO users (id, name, email, password, role)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
        ON CONFLICT (email) DO UPDATE
        SET name = EXCLUDED.name,
            password = EXCLUDED.password,
            role = EXCLUDED.role;
      `;
    }
    console.log('Users seeded/updated successfully.');
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
