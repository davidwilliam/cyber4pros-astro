import { db } from '~/utils/db';

export async function POST({ request }: { request: Request }) {
  try {
    const { order } = await request.json();

    for (let i = 0; i < order.length; i++) {
      const id = order[i];
      await db.query(`UPDATE public.pages SET sort_order = $1 WHERE id = $2`, [i, id]);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
