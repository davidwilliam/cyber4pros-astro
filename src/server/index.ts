// src/server/index.ts
import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

let vite: ViteDevServer;

// API route with correct typing
app.get('/api/pages/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;

  if (slug === 'home') {
    res.json({
      page: { name: 'Home', slug: 'home' },
      sections: [],
    });
  } else {
    res.status(404).json({ page: null });
  }
});

// Start dev server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const start = async () => {
    vite = (await createViteServer({
      root: resolve(__dirname, '../../'),
      server: { middlewareMode: true },
      appType: 'custom',
    })) as ViteDevServer;

    app.use(vite.middlewares);

    // Catch-all: render index.html
    app.use(async (req: Request, res: Response) => {
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(resolve(__dirname, '../../index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        console.error(e);
        res.status(500).end(e instanceof Error ? e.message : String(e));
      }
    });

    app.listen(5173, () => {
      console.log('🚀 Server listening at http://localhost:5173');
    });
  };

  start();
}

export default app;
