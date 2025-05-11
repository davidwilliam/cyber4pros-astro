export function getSession(cookies: Headers) {
  const cookieHeader = cookies.get('cookie') || '';
  console.log('Cookie header:', cookieHeader ? 'Present' : 'Empty');
  
  const cookiesArray = cookieHeader.split(';').map(cookie => cookie.trim());
  console.log('Number of cookies:', cookiesArray.length);

  for (const cookie of cookiesArray) {
    const [name, value] = cookie.split('=');
    if (name === 'session') {
      console.log('Found session cookie');
      try {
        const session = JSON.parse(decodeURIComponent(value));
        console.log('Session data:', { userId: session?.id, email: session?.email });
        return session;
      } catch (e) {
        console.error('Failed to parse session cookie', e);
        return null;
      }
    }
  }

  console.log('No session cookie found');
  return null;
}
