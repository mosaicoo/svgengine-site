# svg-engine website

Source code for the official **svg-engine** website — landing page and
documentation portal.

> This repository contains the **website**, not the library itself.
> The svg-engine library lives at
> [github.com/mosaicoo/svg-engine](https://github.com/mosaicoo/svg-engine)
> and is published on npm as
> [`@mosaicoo/svg-engine`](https://www.npmjs.com/package/@mosaicoo/svg-engine).

Built with [Astro](https://astro.build) and
[Starlight](https://starlight.astro.build) — a static site, optimized for
performance and SEO, framework-agnostic so the Angular-based product demo can be
embedded later without coupling the whole site to Angular.

## Prerequisites

- Node.js `18.20.8+`, `20.3.0+` or `22.0.0+`
- npm

## Develop

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:4321
npm run build      # production build into dist/
npm run preview    # preview the production build locally
npm run check      # type-check the project
```

## Project structure

```text
src/
  content/
    docs/              # documentation & landing pages (Markdown/MDX)
  content.config.ts    # Starlight content collection
astro.config.mjs       # site + Starlight configuration
public/                # static assets served as-is
```

Documentation pages live under `src/content/docs/`. Adding a `.md`/`.mdx` file
there creates a new route; register it in the sidebar in `astro.config.mjs`.

## Content guidelines

- All repository content is written in **English**.
- Product facts (version, test counts, entry points, performance numbers) must
  be **verified against the library source** before release — do not hardcode
  volatile figures without a fresh check.
- Never commit secrets, tokens, credentials or machine-local absolute paths.

## Contributing

Issues and pull requests are welcome. Commit messages follow
[Conventional Commits](https://www.conventionalcommits.org/)
(`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`, `chore:`).

## License

Licensed under the [Apache License 2.0](LICENSE).
