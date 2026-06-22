## Summary

- 

## Checks

- [ ] `npm run check`
- [ ] `npm run build:storybook`
- [ ] `npm run release:dry-run`

## Release Hygiene

- [ ] Package-impacting change has a Changeset, or this PR is explicitly docs/internal only
- [ ] Changelog `[Unreleased]` entry is current, or this PR has no user-facing package impact
- [ ] Release PR only: `npm run changeset:version` updated version, lockfile, and changelog

## Merge Shape

- [ ] PR opens from a feature branch and merges before any release tag is created
- [ ] PR title is the intended squash commit subject
- [ ] Squash body is a contiguous bullet list of meaningful branch changes
- [ ] Generated API docs are committed with the source/config change that generated them

## Notes

- 
