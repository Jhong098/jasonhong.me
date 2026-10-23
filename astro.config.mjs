import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

const secret = () => envField.string({ context: 'server', access: 'secret', optional: true });

export default defineConfig({
  site: 'https://jasonhong.me',
  // Pages stay static; only routes that opt out of prerendering (e.g. /api/now) run on Vercel.
  adapter: vercel(),
  integrations: [react(), mdx(), sitemap()],
  env: {
    schema: {
      SPOTIFY_CLIENT_ID: secret(),
      SPOTIFY_CLIENT_SECRET: secret(),
      SPOTIFY_REFRESH_TOKEN: secret(),
      LETTERBOXD_USERNAME: secret()
    }
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  },
});
