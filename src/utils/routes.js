import { db } from '~/utils/db';

/**
 * Get available routes for navigation
 * For use in Astro components (server-side)
 */
export async function getAvailableRoutes() {
  try {
    const result = await db.query('SELECT name, slug FROM pages ORDER BY sort_order ASC');
    
    const routes = result.rows.map((row) => ({
      label: row.name,
      path: row.slug === 'home' ? '/' : `/${row.slug}`
    }));
    
    return { routes };
  } catch (err) {
    console.error('Error fetching routes:', err);
    return { routes: [] };
  }
} 