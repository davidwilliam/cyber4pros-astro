import { db } from '~/utils/db';

export async function DELETE({ params }) {
  const pageId = parseInt(params.id, 10);
  if (isNaN(pageId)) {
    return new Response(JSON.stringify({ error: 'Invalid page ID' }), { status: 400 });
  }

  try {
    await db.query('BEGIN');
    await db.query('DELETE FROM sections WHERE page_id = $1', [pageId]);
    await db.query('DELETE FROM pages WHERE id = $1', [pageId]);
    await db.query('COMMIT');

    return new Response(null, { status: 204 });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error('Error deleting page:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete page' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
