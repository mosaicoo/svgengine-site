// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Official website for svg-engine (Astro + Starlight).
// Product facts must be cross-checked against the library source before release.
export default defineConfig({
  // TODO: set the final production domain before publishing (affects sitemap/OG/canonical).
  site: 'https://mosaicoo.github.io',
  integrations: [
    starlight({
      title: 'svg-engine',
      description:
        'Embeddable, headless-first SVG editor for Angular v21. Render, manipulate and optimize SVG — import only what you need.',
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
            { label: 'Getting started', slug: 'guides/getting-started' },
          ],
        },
        {
          label: 'Concepts',
          items: [{ label: 'Entry points', slug: 'reference/entry-points' }],
        },
      ],
    }),
  ],
});
