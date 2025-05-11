// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icons from 'astro-icon';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(), icons()],
  vite: {
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
      },
    },
  },
});
