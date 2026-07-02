import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: change to your real domain before deploying
  site: 'https://fulltime.example.com',
  integrations: [sitemap()],
});
