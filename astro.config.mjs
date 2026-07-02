import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: change to your real domain before deploying
  site: 'https://fulltimefootball.net',
  integrations: [sitemap()],
});
