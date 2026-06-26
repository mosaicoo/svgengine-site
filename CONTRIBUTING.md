# Contributing

Thanks for your interest in improving the **svg-engine website**! This guide
covers how to set up the project and the conventions we follow.

> This repository is the **website**, not the library. Changes to svg-engine
> itself belong in [github.com/mosaicoo/svg-engine](https://github.com/mosaicoo/svg-engine).

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
```

Useful scripts:

```bash
npm run build      # production build into dist/
npm run preview    # preview the production build
npm run check      # type-check
```

## Workflow

1. Create a branch from `main` (`feat/…`, `fix/…`, `docs/…`).
2. Make focused, incremental changes.
3. Run `npm run build` (and `npm run check`) before opening a pull request.
4. Open a pull request describing **what** changed and **why**.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat:  fix:  docs:  refactor:  perf:  test:  chore:
```

## Content guidelines

- All content is written in **English**.
- Keep product details accurate; link to the
  [library repository](https://github.com/mosaicoo/svg-engine) for version-specific
  numbers rather than copying them.
- Prefer clear, technical, developer-focused writing over marketing language.

## Code style

- Keep components small and single-purpose.
- Use CSS variables / modular styles; avoid inline styles and `!important`.
- Mind accessibility (WCAG AA): contrast, keyboard navigation, semantic HTML.

## Reporting security issues

Please do **not** open public issues for vulnerabilities — see
[`SECURITY.md`](SECURITY.md).
