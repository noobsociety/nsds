# Contributing

NSDS is the NoobSociety Design System. Changes should keep the package small, reusable, and direct.

## Local Setup

```bash
npm install
npm run check
```

## Change Guidelines

- Keep package exports stable unless the release is intentionally breaking.
- Prefer CSS tokens and shared primitives over one-off styles.
- Keep React components small and framework-light.
- Add or update smoke coverage when changing component behavior.
- Use patch versions for metadata, docs, small fixes, and compatibility work.
- Use minor versions for new components, tokens, or larger additive behavior.

## Release Checks

Before publishing:

```bash
npm run check
npm run release:dry-run
```

Publish with an npm one-time password when required:

```bash
npm publish --otp=123456
```
