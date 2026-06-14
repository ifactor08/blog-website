// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from "@astrojs/cloudflare";

// Update `site` to your live URL (e.g. https://your-blog.pages.dev or a custom domain).
// This drives canonical URLs, the sitemap, and absolute RSS links.
export default defineConfig({
  site: 'https://ishan-writes.pages.dev',
  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      // Dual themes: Astro emits both and CSS swaps via the `data-theme` attribute.
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: false,
    },
  },

  adapter: cloudflare()
});