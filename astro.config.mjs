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
        pt: { label: 'Português', lang: 'pt-BR' },
        es: { label: 'Español', lang: 'es' },
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
          label: 'Live demo',
          translations: { 'pt-BR': 'Demo ao vivo', es: 'Demo en vivo' },
          slug: 'demo',
        },
        {
          label: 'Start here',
          translations: { 'pt-BR': 'Comece aqui', es: 'Empieza aquí' },
          items: [
            {
              label: 'Overview',
              translations: { 'pt-BR': 'Visão geral', es: 'Resumen' },
              slug: 'guides/overview',
            },
            {
              label: 'Features',
              translations: { 'pt-BR': 'Recursos', es: 'Funcionalidades' },
              slug: 'guides/features',
            },
            {
              label: 'Getting started',
              translations: { 'pt-BR': 'Primeiros passos', es: 'Primeros pasos' },
              slug: 'guides/getting-started',
            },
          ],
        },
        {
          label: 'Using the editor',
          translations: { 'pt-BR': 'Usando o editor', es: 'Usar el editor' },
          items: [
            {
              label: 'Tools',
              translations: { 'pt-BR': 'Ferramentas', es: 'Herramientas' },
              slug: 'using/tools',
            },
            {
              label: 'Keyboard shortcuts',
              translations: { 'pt-BR': 'Atalhos de teclado', es: 'Atajos de teclado' },
              slug: 'using/keyboard-shortcuts',
            },
          ],
        },
        {
          label: 'For developers',
          translations: { 'pt-BR': 'Para desenvolvedores', es: 'Para desarrolladores' },
          items: [
            {
              label: 'Architecture',
              translations: { 'pt-BR': 'Arquitetura', es: 'Arquitectura' },
              slug: 'guides/architecture',
            },
            {
              label: 'Entry points',
              translations: { 'pt-BR': 'Entry points', es: 'Entry points' },
              slug: 'reference/entry-points',
            },
            {
              label: 'Plugins',
              translations: { 'pt-BR': 'Plugins', es: 'Plugins' },
              slug: 'guides/plugins',
            },
          ],
        },
      ],
    }),
  ],
});
