// src/pages/api/pages/[slug].ts
import { db } from '~/utils/db';

export async function GET({ params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const pageRes = await db.query('SELECT * FROM pages WHERE slug = $1 LIMIT 1', [slug]);
    const sectionsRes = await db.query(
      'SELECT * FROM sections WHERE page_slug = $1 ORDER BY sort_order ASC',
      [slug]
    );

    if (pageRes.rowCount === 0) {
      return new Response(JSON.stringify({ page: null }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        page: pageRes.rows[0],
        sections: sectionsRes.rows,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching page data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch page data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
