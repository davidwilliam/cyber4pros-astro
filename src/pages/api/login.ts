export const prerender = false;

import 'dotenv/config';

import type { APIRoute } from 'astro';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const db = new Pool({
  connectionString: import.meta.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const POST: APIRoute = async ({ request }) => {
  let email = '';
  let password = '';
  let remember = false;

  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    email = body.email || '';
    password = body.password || '';
    remember = body.remember === 'true';
  } else {
    const formData = await request.formData();
    email = formData.get('email')?.toString() || '';
    password = formData.get('password')?.toString() || '';
    remember = formData.get('remember') === 'true';
  }

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: 'Missing email or password' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const result = await db.query('SELECT "id", "name", "email", "encrypted_password" FROM public.users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.encrypted_password);

    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create session cookie
    const sessionValue = JSON.stringify({ id: user.id, email: user.email });
    const headers = new Headers();
    const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day

    headers.append(
      'Set-Cookie',
      `session=${encodeURIComponent(sessionValue)}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Strict; Secure`
    );

    if (!contentType.includes('application/json')) {
      headers.append('Location', '/admin');
      return new Response(null, { status: 302, headers });
    }

    headers.append('Content-Type', 'application/json');
    return new Response(JSON.stringify({
      message: 'Authentication successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
