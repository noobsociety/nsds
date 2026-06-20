# Versioning

NSDS follows Semantic Versioning and uses Changesets for release intent.

## Patch

Use a patch release for fixes that do not change public behavior:

- documentation corrections
- test updates
- bug fixes with the same API

## Minor

Use a minor release for compatible public additions:

- new components
- new tokens
- new package exports
- stronger generated declarations
- new public docs

Before `1.0.0`, minor releases may also carry larger cleanup work when the
public API remains coherent.

## Major

Use a major release for breaking changes:

- removed exports
- renamed props or classes
- changed runtime requirements
- incompatible CSS token changes

## Release Flow

1. Add a changeset with the intended version bump.
2. Run `npm run check`.
3. Run `npm run release:dry-run`.
4. Merge the release pull request.
5. Publish from the release workflow or with maintainer credentials.
