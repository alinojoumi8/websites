import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

/** Image provenance sidecars stay in the repo and never ship to visitors. */
const dropSidecars = () => ({
  name: 'drop-image-sidecars',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const walk = async (d) => {
        for (const e of await readdir(d, { withFileTypes: true })) {
          const p = join(d, e.name);
          if (e.isDirectory()) await walk(p);
          else if (/\.(webp|avif|jpg|png)\.json$/.test(e.name)) await rm(p);
        }
      };
      await walk(fileURLToPath(dir));
    },
  },
});

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'always' },
  integrations: [react(), dropSidecars()],
  vite: { plugins: [tailwindcss()] },
});
