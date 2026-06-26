// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Official website for svg-engine (Astro + Starlight).
export default defineConfig({
  // GitHub Pages project site: https://mosaicoo.github.io/svgengine-site/
  site: 'https://mosaicoo.github.io',
  base: '/svgengine-site',
  integrations: [
    starlight({
      title: 'svg-engine',
      description:
        'Embeddable, headless-first SVG editor for Angular v21. Render, manipulate and optimize SVG — import only what you need.',
      customCss: ['./src/styles/custom.css'],
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/mosaicoo/svg-engine',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/mosaicoo/svgengine-site/edit/main/',
      },
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Overview', slug: 'guides/overview' },
            { label: 'Features', slug: 'guides/features' },
            { label: 'Getting started', slug: 'guides/getting-started' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Architecture', slug: 'guides/architecture' },
            { label: 'Entry points', slug: 'reference/entry-points' },
            { label: 'Plugins', slug: 'guides/plugins' },
          ],
        },
      ],
    }),
  ],
});
