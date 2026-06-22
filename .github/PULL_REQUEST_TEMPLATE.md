## Summary

- [ ] Replace this line with a concrete package/repo change

## Verification

- [ ] Required package gate passed

```bash
npm run check
```

- [ ] Storybook build passed or is not applicable

```bash
npm run build:storybook
```

- [ ] Publish dry run passed

```bash
npm run release:dry-run
```

## Release Hygiene

- [ ] Package-impacting change has a Changeset, or this PR is explicitly docs/internal only
- [ ] Changelog `[Unreleased]` entry is current, or this PR has no user-facing package impact
- [ ] Release PR only: `npm run changeset:version` updated version, lockfile, and changelog
- [ ] Release tag timing declared: workflow after publish, repair after merge, or not applicable

## Merge Shape

- [ ] PR opens from a feature branch and merges before any release tag is created
- [ ] PR title is the intended squash commit subject
- [ ] Squash body is a contiguous bullet list of meaningful branch changes
- [ ] Generated API docs are committed with the source/config change that generated them

## Notes

-
