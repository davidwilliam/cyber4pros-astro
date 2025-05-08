// src/utils/session.ts
export function parseCookies(cookieHeader: string | null) {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(';').map(cookie => {
      const [key, ...v] = cookie.trim().split('=');
      return [key, decodeURIComponent(v.join('='))];
    })
  );
}

export function getSessionFromRequest(request: Request) {
  const cookies = parseCookies(request.headers.get('cookie'));
  if (!cookies.session) return null;
  try {
    return JSON.parse(cookies.session);
  } catch {
    return null;
  }
}
