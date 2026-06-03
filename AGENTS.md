# AGENTS.md — Universal Agent Standard

## Identity
AutoHub (Automobile Quick) — Premium-Gebrauchtwagenhändler Plattform (Astro + React + Cloudflare)

## Source of Truth (SSoT)
- **Primary:** `docs/ai/PROJECT_STATUS.md`
- **Context:** `docs/ai/PROJECT_CONTEXT.md`
- **Handover:** `docs/ai/CURRENT_HANDOFF.md`
- **Rules:** `docs/ai/AGENT_RULES.md`
- **Global:** `_AI_Memory/active_state.md`

## Governor Loop
This project enforces the **Autonomous AI System Governor (v1.1+)**.
All agents MUST run `ai-governor-check --quick` at session start.

## Execution Guardrails
### Allowed Actions
- `npm run check`, `npm run test:run`, `npm run build`
- `git status`, `git log`, `git diff`
- `curl` for live verification
- Surgical code edits with `replace` or `write_file` (chunks <50 lines)

### Denied Actions
- No blind deletions (`rm`, `git reset`) without user approval
- No installation of new MCPs or Global Skills
- No credential/secret logging or exposure
- No unverified trust claims (Current: 204 reviews, 4.96 rating)

## Verification Commands
- **Lint:** `npm run check`
- **Tests:** `npm run test:run`
- **Build:** `npm run build`
- **Audit:** `npm audit --audit-level=low`

## Handover Protocol
Before closing a session, update `docs/ai/CURRENT_HANDOFF.md` and commit all changes.
