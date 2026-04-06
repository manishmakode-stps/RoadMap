const fs = require('fs');
const path = require('path');
const postgres = require('postgres');

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
  try {
    const users = await sql.unsafe('select id, email, role, password from users order by email');
    console.log(users);
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
