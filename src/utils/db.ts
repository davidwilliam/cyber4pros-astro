// src/utils/db.ts
import { Pool } from 'pg';

export const db = new Pool({
  connectionString: import.meta.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});
