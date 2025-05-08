import { useState, useEffect } from 'react';

export function useAvailableRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const res = await fetch('/api/routes');
        if (!res.ok) throw new Error('Failed to fetch routes');
        const data = await res.json();
        setRoutes(data);
      } catch (err) {
        console.error('Error fetching routes:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRoutes();
  }, []);

  return { routes, loading, error };
}
