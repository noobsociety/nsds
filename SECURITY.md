# Security

NSDS is a design system package, but security issues can still happen through package metadata,
published assets, examples, or dependency changes.

## Scope

This policy covers the published `@noobsociety/nsds` npm package, repository automation, package
metadata, examples, and dependency changes.

## What to report

- Package contents that execute unintended code in consumer projects
- Dependency or workflow changes that create a supply-chain risk
- Published assets or examples that expose private information
- Security issues in package metadata or release automation

Not in scope: design opinions, missing components, visual regressions, or normal dependency
freshness requests without a vulnerability.

## How to report

Open a
[private security advisory](https://github.com/noobsociety/nsds/security/advisories/new)
on GitHub to report a vulnerability confidentially.

If you prefer email, write to **<ejelome@gmail.com>** with the subject line `[SECURITY] nsds`.

Avoid opening a public issue for a vulnerability until it has been reviewed.

Supported release line:

| Version | Supported |
| ------- | --------- |
| `0.x`   | Yes       |

## Response commitment

We will acknowledge your report within **5 business days** and keep you updated until the issue is
resolved or confirmed as a non-issue.

## Disclosure

Verified issues are fixed before public disclosure. Researchers who want to be credited will be
named in the changelog entry for the fix.
