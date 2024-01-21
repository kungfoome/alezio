import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { remarkReadingTime } from './src/lib/remark/remark-reading-time.mjs';

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
    ],
    markdown: {
        remarkPlugins: [remarkReadingTime],
    },
});
