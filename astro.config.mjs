// @ts-check
import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';


// https://astro.build/config
export default defineConfig({
    site: import.meta.env.SITE,
    output: 'server',
    integrations: [db()],

    adapter: vercel(),

    vite: {
        plugins: [tailwindcss()]
    }
});
