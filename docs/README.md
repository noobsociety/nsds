# NoobSociety Design System Docs

NSDS documentation follows the Diataxis model:

- Tutorials help new users complete a first working setup.
- How-to guides solve common integration tasks.
- Reference pages define exports, tokens, classes, and generated API details.
- Explanation pages capture design and release decisions.

## Start Here

- [Getting started](tutorials/getting-started.md)
- [Use with Tailwind](how-to/use-with-tailwind.md)
- [Use React components](how-to/use-react-components.md)
- [Customize tokens](how-to/customize-tokens.md)
- [Package exports](reference/exports.md)
- [Generated API reference](reference/api/README.md)

## Live Examples

Run Storybook locally for interactive component examples:

```bash
npm run storybook
```

Build static Storybook documentation with:

```bash
npm run build:storybook
```

## Public Landing

The static landing page lives in [`site/index.html`](../site/index.html). It is a
plain HTML entry point for package overview, install commands, docs links, and
component specimens.
