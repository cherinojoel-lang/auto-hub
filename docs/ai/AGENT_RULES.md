# Agent Rules: Automobile Quick / AutoHub

These rules are binding for any agent (Claude, Gemini, Codex, or other)
working in this repository. They consolidate the guardrails from
`AGENTS.md` with the operational rules established during the 2026-06-07
audit (`docs/ai/PROJECT_STATUS.md`, `docs/ai/CURRENT_HANDOFF.md`).

## Allowed without extra confirmation
- `npm run check`, `npm run test:run`, `npm run build`, `npm run deploy:dry-run`
- `npm audit --audit-level=low`
- `git status`, `git log`, `git diff`
- `curl` for live verification of public data
- Surgical code edits (small, scoped diffs — keep chunks under ~50 lines)

## Never do without explicit user approval
- Blind/destructive actions: `rm`, `git reset --hard`, force-push
- Installing new MCP servers or global skills
- Logging or exposing credentials/secrets
- Adding unverified trust claims (see current verified numbers below)
- Adding self-serving `review`, `aggregateRating`, or `reviewCount` to
  LocalBusiness/AutoDealer JSON-LD for this dealer's own site
- Changing contact email, opening hours, or review counts without
  re-checking `docs/ai/SOURCES.md`

## Current verified facts (do not alter without re-verification)
- Saturday hours: `09:00–13:00`
- Contact email: `auto-quick@t-online.de`
- Review counts: mobile.de `157`, AutoScout24 `48`, combined visible total
  `205`, weighted rating `4.98` — sourced per `docs/ai/SOURCES.md`

## Verification before any commit
1. `npm run check`
2. `npm run test:run`
3. `npm run build`
4. Search the diff for regressions of past mistakes: `info@automobilequick`,
   `Sa: 10:00`, `Sa: 10:00 - 16:00`, self-serving `aggregateRating`/`review`
   in schema context.

## Handover protocol
Before closing a session, update `docs/ai/CURRENT_HANDOFF.md` with what
changed and why, and commit all changes. If sources or business facts were
re-checked or changed, update `docs/ai/SOURCES.md` too.

## Repo scope
- `auto-hub` is the single source of truth for this project. Do not create
  or rely on parallel copies.
- `auto-hub1` is a separate, currently **empty** GitHub repository (no
  commits). It is not a mirror or backup of this project — never copy
  content into it as if it were, and never treat anything found there as
  authoritative.
