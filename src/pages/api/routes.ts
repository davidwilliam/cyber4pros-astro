// src/pages/api/routes.ts
import { db } from '~/utils/db';

export async function GET() {
  try {
    const result = await db.query('SELECT name, slug FROM pages ORDER BY sort_order ASC');

    const routes = result.rows.map((row: { name: string; slug: string }) => ({
      label: row.name,
      path: row.slug === 'home' ? '/' : `/${row.slug}`
    }));

    return new Response(JSON.stringify(routes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Failed to fetch routes:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch routes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
