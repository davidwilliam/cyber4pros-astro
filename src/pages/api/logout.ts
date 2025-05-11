// src/pages/api/logout.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
  const headers = new Headers();
  headers.append('Set-Cookie', 'session=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict; Secure');
  headers.append('Location', '/login');
  return new Response(null, {
    status: 302,
    headers,
  });
};
