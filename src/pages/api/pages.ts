// /src/pages/api/pages.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { db } from '~/utils/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, slug: rawSlug } = await request.json();

    if (!name) {
      return new Response(JSON.stringify({ message: 'Missing page name' }), { status: 400 });
    }

    // Sanitize the slug to ensure it's a valid string
    let slug = rawSlug;
    if (!slug || typeof slug !== 'string' || slug === '[object Object]') {
      slug = name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    } else {
      // Ensure existing slug is properly sanitized
      slug = slug.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    console.log(`Creating page "${name}" with slug "${slug}"`);

    await db.query(
      'INSERT INTO public.pages (name, slug, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())',
      [name, slug]
    );

    return new Response(JSON.stringify({ success: true, slug }), { status: 200 });
  } catch (err) {
    console.error('Error creating page:', err);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
};
