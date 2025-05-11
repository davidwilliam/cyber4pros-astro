// src/utils/db.ts
import { Pool } from 'pg';

// Create a properly configured database pool
export const db = new Pool({
  connectionString: import.meta.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
  max: 20, // maximum number of clients the pool should contain
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // how long to wait when connecting a new client
});

// Add basic error handling to the pool
db.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
});
