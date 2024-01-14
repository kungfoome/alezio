import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://alez.io',
    integrations: [
        tailwind(),
        mdx(),
        sitemap({
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date()
        })
    ]
});
