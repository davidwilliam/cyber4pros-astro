// src/lib/session.ts
import { parse } from 'cookie';

export async function getSession(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const cookies = parse(cookieHeader);
  // e.g. you might verify a JWT in cookies.sessionToken
  if (cookies.sessionToken === 'YOUR_SIGNED_VALUE') {
    return { userId: 'admin' };
  }
  return null;
}