import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import Resend from 'resend';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    preact({
      include: ['**/preact/*'],
    }),
    react({
      include: ['**/react/*'],
    }),
  ],
  vite: {
    ssr: {
      external: [Resend],
    },
  },
  optimizeDeps: {
    include: ['resend'], // Agrega aquí los nombres de los paquetes que deseas incluir
  },
  output: 'server',
  adapter: vercel(),
});
